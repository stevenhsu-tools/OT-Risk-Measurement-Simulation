/**
 * v5.2.1 Risk Calculation Engine
 * Unified module for deterministic aggregation and Monte Carlo simulation
 * Implements the exact v5.2.1 Excel formulas with Triangular distribution
 */

import { Asset, Threat, Scenario, ThreatControlMap, RiskProfile } from './types';

const normalizeID = (id: any): string =>
  String(id || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

// ============ Shared Helpers ============

/**
 * Calculate aggregate TEF reduction for one scenario's threat
 * Additive, capped at 85% (v5.2.1 methodology, not v4.9's multiplicative model)
 */
export function calculateAggregateReduction(
  threatId: string,
  selectedControlIds: string[],
  threatControlMap: ThreatControlMap[]
): number {
  const tId = normalizeID(threatId);
  const selectedSet = new Set(selectedControlIds.map(normalizeID));

  // Single runtime gate: user selection in the Selection step. The imported Control.Enabled /
  // ThreatControlMap.ControlEnabled flags are data-authoring fields (default false in the source
  // Excel) kept for import/export fidelity, but are not additional calculation gates — otherwise
  // a user selecting a control here would silently have no effect until those flags were separately
  // toggled elsewhere. See implementation plan §Methodology, "Single runtime gate" decision.
  const sum = threatControlMap
    .filter(
      m =>
        normalizeID(m.ThreatID) === tId &&
        m.EffectOn === 'TEF' && // Only TEF-side controls; Loss has no control effect in v5.2.1
        selectedSet.has(normalizeID(m.ControlID)) // User selected this control
    )
    .reduce((acc, m) => acc + (m.ReductionMostLikely || 0), 0);

  return Math.min(0.85, sum); // Capped at 85%
}

export interface AdjustedScenario {
  scenario: Scenario;
  tefMin: number;
  tefML: number;
  tefMax: number;
  lossMin: number;
  lossML: number;
  lossMax: number;
  reduction: number;
}

/**
 * Compute adjusted TEF (with control reduction) and Loss (from Asset, no control effect)
 * Returns null if scenario references non-existent Threat or Asset
 */
export function computeAdjustedScenario(
  scenario: Scenario,
  threats: Threat[],
  assets: Asset[],
  selectedControlIds: string[],
  threatControlMap: ThreatControlMap[]
): AdjustedScenario | null {
  const threat = threats.find(t => normalizeID(t.ID) === normalizeID(scenario.ThreatID));
  const asset = assets.find(a => normalizeID(a.ID) === normalizeID(scenario.AssetID));

  if (!threat || !asset) return null; // Data-integrity guard

  const reduction = calculateAggregateReduction(
    scenario.ThreatID,
    selectedControlIds,
    threatControlMap
  );

  // Adjusted TEF with control reduction (additive-capped model)
  const tefMin = threat.BaseTEFMin * (1 - reduction);
  const tefML = threat.BaseTEFMostLikely * (1 - reduction);
  const tefMax = threat.BaseTEFMax * (1 - reduction);

  // Loss per event — always from Asset.BaseLoss × 0.5/1/2, no control effect
  const baseLoss =
    asset.BaseLoss ?? asset.DowntimeCostPerHour * asset.MaxOutageHours;
  const lossMin = baseLoss * 0.5;
  const lossML = baseLoss * 1.0;
  const lossMax = baseLoss * 2.0;

  return { scenario, tefMin, tefML, tefMax, lossMin, lossML, lossMax, reduction };
}

// ============ Deterministic Aggregation ============

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

export function calculateAggregatedMetrics(
  selectedScenarios: Scenario[],
  selectedControlIds: string[],
  profile: Pick<RiskProfile, 'threats' | 'assets' | 'threatControlMap'>
): AggregatedMetrics {
  const adjusted = selectedScenarios
    .map(s =>
      computeAdjustedScenario(
        s,
        profile.threats,
        profile.assets,
        selectedControlIds,
        profile.threatControlMap
      )
    )
    .filter((x): x is AdjustedScenario => x !== null);

  // Aggregate TEF
  const tefMin = adjusted.reduce((sum, a) => sum + a.tefMin, 0);
  const tefML = adjusted.reduce((sum, a) => sum + a.tefML, 0);
  const tefMax = adjusted.reduce((sum, a) => sum + a.tefMax, 0);

  // Weight sum = TEF-ML only, used for ALL THREE avg-loss bounds
  // (matches v5.2.1's asymmetric formula: "Aggregate loss per event and weight (sum of weight or TEF most likely)")
  const weightSum = tefML;
  const avgLossMin =
    weightSum > 0 ? adjusted.reduce((sum, a) => sum + a.tefML * a.lossMin, 0) / weightSum : 0;
  const avgLossML =
    weightSum > 0 ? adjusted.reduce((sum, a) => sum + a.tefML * a.lossML, 0) / weightSum : 0;
  const avgLossMax =
    weightSum > 0 ? adjusted.reduce((sum, a) => sum + a.tefML * a.lossMax, 0) / weightSum : 0;

  // EAL uses matched bounds: min×min, ML×ML, max×max
  const ealMin = adjusted.reduce((sum, a) => sum + a.tefMin * a.lossMin, 0);
  const ealML = adjusted.reduce((sum, a) => sum + a.tefML * a.lossML, 0);
  const ealMax = adjusted.reduce((sum, a) => sum + a.tefMax * a.lossMax, 0);

  return {
    tefMin,
    tefMostLikely: tefML,
    tefMax,
    avgLossMin,
    avgLossMostLikely: avgLossML,
    avgLossMax,
    expectedAnnualLossMin: ealMin,
    expectedAnnualLossMostLikely: ealML,
    expectedAnnualLossMax: ealMax,
  };
}

// ============ Monte Carlo Simulation ============

export interface SimulationResult {
  meanEAL: number;
  p90EAL: number;
  p95EAL: number;
  probabilityOnePlusEvents: number;
  annualLosses: number[];
}

/**
 * Mulberry32 PRNG — small, fast, deterministic given a seed.
 * Used so the "Before Controls" and "After Controls" runs can draw from the
 * exact same random sequence (see runSimulation's `rng` param), guaranteeing
 * identical results when the Control selection has no effect (e.g. none selected).
 */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Triangular distribution inverse-CDF
 * Matches v5.2.1 Excel Sim sheet formula exactly
 */
function sampleTriangular(min: number, ml: number, max: number, rng: () => number): number {
  if (max <= min) return 0; // Guard against degenerate range
  const u = rng();
  const fc = (ml - min) / (max - min);
  if (u < fc) {
    return min + Math.sqrt(u * (max - min) * (ml - min));
  } else {
    return max - Math.sqrt((1 - u) * (max - min) * (max - ml));
  }
}

/**
 * Poisson sampling via Knuth algorithm (lambda <= 50) or Normal approximation (lambda > 50)
 * Statistically equivalent to Excel's CRITBINOM(1000, lambda/1000, RAND()) at these scales
 */
function samplePoisson(lambda: number, rng: () => number): number {
  if (lambda <= 0) return 0;
  if (lambda <= 50) {
    // Knuth algorithm
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= rng();
    } while (p > L);
    return k - 1;
  } else {
    // Normal approximation for large lambda
    const g = sampleGaussian(rng);
    return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * g));
  }
}

/**
 * Box-Muller Gaussian sampler
 */
function sampleGaussian(rng: () => number): number {
  const u1 = rng();
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export function runSimulation(
  selectedScenarios: Scenario[],
  selectedControlIds: string[],
  profile: Pick<RiskProfile, 'threats' | 'assets' | 'threatControlMap'>,
  trials: number,
  seed: number = Date.now()
): SimulationResult {
  const rng = mulberry32(seed);
  const adjusted = selectedScenarios
    .map(s =>
      computeAdjustedScenario(
        s,
        profile.threats,
        profile.assets,
        selectedControlIds,
        profile.threatControlMap
      )
    )
    .filter((x): x is AdjustedScenario => x !== null);

  const annualLosses: number[] = [];
  let trialsWithEvents = 0;

  for (let i = 0; i < trials; i++) {
    let trialLoss = 0;
    let trialEventCount = 0;

    for (const a of adjusted) {
      // Sample TEF for this trial (epistemic uncertainty)
      const tefSample = sampleTriangular(a.tefMin, a.tefML, a.tefMax, rng);

      // Draw event count from Poisson (aleatory uncertainty)
      const eventCount = samplePoisson(tefSample, rng);

      if (eventCount > 0) {
        // ONE loss draw per scenario per trial (not per individual event)
        // Matches v5.2.1 Excel Sim sheet, differs from v1's per-event draws
        const lossSample = sampleTriangular(a.lossMin, a.lossML, a.lossMax, rng);
        trialLoss += eventCount * lossSample;
        trialEventCount += eventCount;
      }
    }

    annualLosses.push(trialLoss);
    if (trialEventCount > 0) trialsWithEvents++;
  }

  // Compute statistics
  annualLosses.sort((x, y) => x - y);
  const meanEAL =
    trials > 0 ? annualLosses.reduce((a, b) => a + b, 0) / trials : 0;
  const p90EAL = annualLosses[Math.floor(trials * 0.9)] ?? 0;
  const p95EAL = annualLosses[Math.floor(trials * 0.95)] ?? 0;

  return {
    meanEAL,
    p90EAL,
    p95EAL,
    probabilityOnePlusEvents: trials > 0 ? trialsWithEvents / trials : 0,
    annualLosses,
  };
}
