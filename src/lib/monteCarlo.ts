import { Scenario, Control, ThreatControlMap } from './types';

export interface SimulationResult {
    meanEAL: number;
    p90EAL: number;
    p95EAL: number;
    probabilityOnePlusEvents: number;
    annualLosses: number[]; // For histogram/exceedance curve
}

// PERT Distribution Sample
function samplePERT(min: number, ml: number, max: number): number {
    if (min >= max) return min;

    const range = max - min;
    // Standard PERT Beta parameters
    // alpha = 1 + 4 * (ML - Min) / Range
    // beta = 1 + 4 * (Max - ML) / Range
    const a = 1 + 4 * ((ml - min) / range);
    const b = 1 + 4 * ((max - ml) / range);

    const u = sampleGamma(a);
    const v = sampleGamma(b);

    const betaSample = u / (u + v);
    return min + range * betaSample;
}

// Marsaglia and Tsang's method for Gamma(alpha)
function sampleGamma(alpha: number): number {
    if (alpha < 1) {
        return sampleGamma(1 + alpha) * Math.pow(Math.random(), 1 / alpha);
    }

    const d = alpha - 1 / 3;
    const c = 1 / Math.sqrt(9 * d);
    let v = 0;

    while (true) {
        let x = 0;
        let u = 0;
        do {
            x = generateGaussian();
            v = 1 + c * x;
        } while (v <= 0);

        v = v * v * v;
        u = Math.random();

        if (u < 1 - 0.0331 * x * x * x * x) return d * v;
        if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
    }
}

function generateGaussian(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Poisson Sample
function samplePoisson(lambda: number): number {
    // If lambda is large (> 30), use Normal approx match?
    // For now standard knuth/step method is fine for small < 20
    // But OT risk might have higher frequencies? (100 events/year?)
    // If lambda > 50, standard alg is slow.
    if (lambda > 50) {
        const k = Math.round(lambda + Math.sqrt(lambda) * generateGaussian());
        return k < 0 ? 0 : k;
    }

    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    return k - 1;
}

export const runSimulation = (
    selectedScenarios: Scenario[],
    selectedControls: Control[],
    threatControlMap: ThreatControlMap[],
    trials: number // e.g. 1000
): SimulationResult => {
    const annualLosses: number[] = [];
    let eventsWithLossCount = 0;

    // Pre-calculate adjusted frequencies for each scenario
    const scenarioConfigs = selectedScenarios.map(scenario => {
        const applicableControlIds = threatControlMap
            .filter(map => map.ThreatID === scenario.ThreatID)
            .map(map => map.ControlID);

        const activeControls = selectedControls.filter(c => applicableControlIds.includes(c.ID));

        const residualRiskFactor = activeControls.reduce((acc, control) => {
            const eff = control.Effectiveness || 0;
            return acc * (1 - eff);
        }, 1);

        const baseFreq = scenario.Frequency || 0;
        const adjustedFreq = baseFreq * residualRiskFactor;

        // Note: For simulation, we usually sample the Frequency first if it is a distribution?
        // Or do we just use the Mean Frequency?
        // Usually Poisson(MeanFrequency).
        // If Frequency is uncertain (PERT), we should sample the Lambda first for each trial?
        // "Aleatory vs Epistemic uncertainty".
        // Let's assume Frequency is a distribution (PERT).
        const freqMin = scenario.FrequencyMin !== undefined ? scenario.FrequencyMin : baseFreq;
        const freqMax = scenario.FrequencyMax !== undefined ? scenario.FrequencyMax : baseFreq;

        if (!scenario.Frequency) {
            // Prevent NaN if 0
        }

        return {
            ...scenario,
            residualRiskFactor,
            freqMin,
            freqML: baseFreq,
            freqMax
        };
    });

    for (let i = 0; i < trials; i++) {
        let trialLoss = 0;
        let eventCount = 0;

        scenarioConfigs.forEach(scenario => {
            // 1. Sample Frequency Lambda for this trial (Uncertainty in frequency)
            // If Min == Max, lambda is constant.
            // If Min != Max, sample lambda from PERT.
            const lambda = samplePERT(scenario.freqMin, scenario.freqML, scenario.freqMax);

            // 2. Determine number of events (Poisson based on sampled lambda)
            // Apply controls to lambda?
            // Yes, residualRiskFactor reduces the frequency of successful events.
            const adjustedLambda = lambda * scenario.residualRiskFactor;

            const numEvents = samplePoisson(adjustedLambda);
            eventCount += numEvents;

            // 3. For each event, sample loss (PERT)
            for (let k = 0; k < numEvents; k++) {
                const min = scenario.MinLoss || 0;
                const ml = scenario.MostLikelyLoss || 0;
                const max = scenario.MaxLoss || 0;

                const loss = samplePERT(min, ml, max);
                trialLoss += loss;
            }
        });

        annualLosses.push(trialLoss);
        if (eventCount > 0) eventsWithLossCount++;
    }

    // Calculate statistics
    annualLosses.sort((a, b) => a - b);

    const sumLoss = annualLosses.reduce((a, b) => a + b, 0);
    const meanEAL = trials > 0 ? sumLoss / trials : 0;

    const p90Index = Math.floor(trials * 0.90);
    const p95Index = Math.floor(trials * 0.95);

    const p90EAL = annualLosses[p90Index] || 0;
    const p95EAL = annualLosses[p95Index] || 0;

    const probabilityOnePlusEvents = trials > 0 ? eventsWithLossCount / trials : 0;

    return {
        meanEAL,
        p90EAL,
        p95EAL,
        probabilityOnePlusEvents,
        annualLosses
    };
};
