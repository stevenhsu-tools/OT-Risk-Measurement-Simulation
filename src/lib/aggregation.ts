import { Scenario, Control, ThreatControlMap } from './types';

// Pre-simulation calculated metrics
export interface AggregatedMetrics {
    tefMin: number;
    tefMostLikely: number;
    tefMax: number;
    avgLossMin: number;
    avgLossMostLikely: number;
    avgLossMax: number;
    expectedAnnualLossMin: number;
    expectedAnnualLossMostLikely: number;
    expectedAnnualLossMax: number;
}

// Helper to normalize IDs (Values): Uppercase, AlphaNumeric Only (removes - _ space)
const normalizeID = (id: any) => String(id || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export const calculateAggregatedMetrics = (
    selectedScenarios: Scenario[],
    selectedControls: Control[],
    threatControlMap: ThreatControlMap[]
): AggregatedMetrics => {
    // Logic: 
    // 1. For each scenario, calculate its specific TEF (Threat Event Frequency)
    //    TEF = Base Frequency * (1 - Combined Control Effectiveness)
    // 2. Sum up TEFs/Losses?
    //
    // NOTE: Requirement says "Calculated Summary (Pre-Simulation)". 
    // "Aggregated Adjusted TEF": Sum of frequencies of all selected scenarios (adjusted by controls).
    // "Average Loss per Event": Weighted average of losses.
    // "Expected Annual Loss": TEF * Loss.

    // Initialize totals
    let totalTefMin = 0;
    let totalTefML = 0;
    let totalTefMax = 0;

    let totalEALMin = 0;
    let totalEALML = 0;
    let totalEALMax = 0;

    let totalEventsMin = 0; // For weighting Avg Loss
    let totalEventsML = 0;
    let totalEventsMax = 0;

    selectedScenarios.forEach(scenario => {
        // Determine controls affecting this scenario (via ThreatID)
        // Normalize IDs for safe comparison
        const sThreatID = normalizeID(scenario.ThreatID);

        const applicableControlIds = threatControlMap
            .filter(map => normalizeID(map.ThreatID) === sThreatID)
            .map(map => normalizeID(map.ControlID));

        // Calculate Combined Effectiveness of SELECTED controls for this threat
        // Assumption: Effectiveness is reduction percentage (0-1). 
        // If independent: 1 - (1-e1)(1-e2)...
        // If additive: sum(e) (capped at 1)
        // The reference usually implies independent layers or simple sum. Detailed logic needed.
        // For now, let's assume Independent layers: P(fail) = product(1 - efficiency)

        // Filter controls that are both applicable and SELECTED
        const activeControls = selectedControls.filter(c => applicableControlIds.includes(normalizeID(c.ID)));

        // DEBUG: Trace Control Logic for first scenario
        if (selectedScenarios.indexOf(scenario) === 0 && selectedControls.length > 0) {
            console.log(`Debug Aggregation [${scenario.ID}]: ThreatID '${scenario.ThreatID}' (Norm: ${sThreatID})`);
            console.log(`Debug Aggregation [${scenario.ID}]: Mapped Control IDs:`, applicableControlIds);
            console.log(`Debug Aggregation [${scenario.ID}]: Active Controls (Selected & Mapped):`, activeControls.map(c => `${c.ID} (Eff: ${c.Effectiveness})`));
        }

        // Calculate residual risk factor (1 - effectiveness) product
        const residualRiskFactor = activeControls.reduce((acc, control) => {
            // Find the specific reduction for this THREAT-CONTROL pair from the MAP
            const mapEntry = threatControlMap.find(m =>
                normalizeID(m.ThreatID) === sThreatID &&
                normalizeID(m.ControlID) === normalizeID(control.ID)
            );

            // Use Map Reduction if available, otherwise fallback to Control Effectiveness
            let rawEff = mapEntry ? (mapEntry['Reduction'] || mapEntry.Effectiveness) : control.Effectiveness;

            let eff = 0;
            // Handle percentage strings or raw numbers
            if (typeof rawEff === 'string') {
                const s = rawEff as string;
                if (s.includes('%')) {
                    eff = parseFloat(s) / 100.0;
                } else {
                    eff = parseFloat(s);
                    // Heuristic: if eff > 1, assume it's percentage (e.g. 90 -> 0.9)
                    if (eff > 1) eff = eff / 100.0;
                }
            } else if (typeof rawEff === 'number') {
                eff = rawEff;
                if (eff > 1) eff = eff / 100.0;
            }

            if (isNaN(eff)) eff = 0;

            return acc * (1 - eff);
        }, 1);

        // Adjusted Frequency (TEF)
        // Scenario might have Min/ML/Max frequency or just one "Frequency".
        // Requirement says "Aggregated Adjusted TEF: Min, ML, Max". 
        // If Scenario only has 'Frequency', we treat Min/ML/Max as same or derive?
        // Let's assume Scenario has singular Frequency for now, or we define uncertainty range.
        // IF the Excel has fields "TeF Min", "TeF ML", "TeF Max", use them. 
        // If not, use 'Frequency' as ML, and maybe +/- variance?
        // Let's standardise: Use 'Frequency' as ML. 

        const baseFreq = scenario.Frequency || 0;
        const tef = baseFreq * residualRiskFactor;

        // For Min/Max TEF, we might not have data in simple columns. 
        // Let's simpler assumption: TEF is a single point estimate for pre-calc cards, 
        // unless 'MinLoss' implied frequency spread too? 
        // Usually PERT is on LOSS. Poisson is on Frequency.
        // "Aggregated Adjusted TEF: Min, ML, Max" -> Suggests uncertainty in frequency.
        // If input lacks it, return same value.
        const diff = (scenario.FrequencyMax || baseFreq) - (scenario.FrequencyMin || baseFreq);
        // If diff is 0, use single value.

        // TEF Min
        const baseFreqMin = scenario.FrequencyMin !== undefined ? scenario.FrequencyMin : baseFreq;
        const tefMin = baseFreqMin * residualRiskFactor;

        // TEF ML
        // scenario.Frequency is already ML
        const tefML = baseFreq * residualRiskFactor;

        // TEF Max
        const baseFreqMax = scenario.FrequencyMax !== undefined ? scenario.FrequencyMax : baseFreq;
        const tefMax = baseFreqMax * residualRiskFactor;

        totalTefMin += tefMin;
        totalTefML += tefML;
        totalTefMax += tefMax;

        // Loss values (PERT parameters)
        const lossMin = scenario.MinLoss || 0;
        const lossML = scenario.MostLikelyLoss || 0;
        const lossMax = scenario.MaxLoss || 0;

        // Expected Annual Loss for this scenario = TEF * Loss(Mean of PERT)
        // PERT Mean = (Min + 4*ML + Max) / 6
        const pertMeanLoss = (lossMin + 4 * lossML + lossMax) / 6;

        // EAL
        // Wait, the card asks for "Expected Annual Loss: Min, ML, Max".
        // Does it mean EAL_Min = TEF_Min * Loss_Min? Yes, likely.
        totalEALMin += tefMin * lossMin;
        totalEALML += tefML * lossML;
        totalEALMax += tefMax * lossMax;

        // For "Average Loss per Event", we need weighted sums
        // Weighted by probability (Frequency)
        // Actually, "Average Loss per Event" = Total EAL / Total Frequency
    });

    // Avoid division by zero
    const avgLossMin = totalTefMin > 0 ? totalEALMin / totalTefMin : 0;
    const avgLossML = totalTefML > 0 ? totalEALML / totalTefML : 0;
    const avgLossMax = totalTefMax > 0 ? totalEALMax / totalTefMax : 0;

    return {
        tefMin: totalTefMin,
        tefMostLikely: totalTefML,
        tefMax: totalTefMax,
        avgLossMin,
        avgLossMostLikely: avgLossML,
        avgLossMax,
        expectedAnnualLossMin: totalEALMin,
        expectedAnnualLossMostLikely: totalEALML,
        expectedAnnualLossMax: totalEALMax
    };
};
