import { RiskProfile } from './types';

export interface TXOneIndex {
    solutionToControls: Map<string, string[]>;
    controlToSolutions: Map<string, string[]>;
    solutionToScenarios: Map<string, string[]>;
    allSolutions: string[];
}

export function buildTXOneIndex(profile: RiskProfile): TXOneIndex {
    const controlToSolutions = new Map<string, string[]>();
    const solutionToControls = new Map<string, string[]>();

    profile.controls.forEach(c => {
        controlToSolutions.set(c.ID, c.TXOneSolutions || []);
        (c.TXOneSolutions || []).forEach(sol => {
            const existing = solutionToControls.get(sol) || [];
            existing.push(c.ID);
            solutionToControls.set(sol, existing);
        });
    });

    // solutionToScenarios: for each solution's controls, find TCM rows with that ControlID,
    // get ThreatIDs, then find Scenarios whose ThreatID matches
    const solutionToScenarios = new Map<string, string[]>();
    solutionToControls.forEach((controlIds, solution) => {
        const threatIds = new Set(
            profile.threatControlMap
                .filter(m => controlIds.includes(m.ControlID))
                .map(m => m.ThreatID)
        );
        const scenarioIds = profile.scenarios
            .filter(s => threatIds.has(s.ThreatID))
            .map(s => s.ID);
        solutionToScenarios.set(solution, scenarioIds);
    });

    const allSolutions = Array.from(solutionToControls.keys()).sort();

    return { solutionToControls, controlToSolutions, solutionToScenarios, allSolutions };
}
