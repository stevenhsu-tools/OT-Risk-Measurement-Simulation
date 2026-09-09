import { useState, useMemo } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { SelectionList } from '@/components/Selection/SelectionList';
import { SummaryCards } from '@/components/Summary/SummaryCards';
import { SimulationControls } from '@/components/Simulation/SimulationControls';
import { ResultsView } from '@/components/Results/ResultsView';
import { useRiskProfile } from '@/context/RiskProfileContext';
import { buildTXOneIndex } from '@/lib/txoneIndex';
import { calculateAggregatedMetrics, runSimulation, SimulationResult } from '@/lib/riskEngine';
import { exportPDF, exportCSV, exportRawCSV } from '@/lib/export';
import { RiskProfile } from '@/lib/types';

type ResultSnapshot = { scenarioIds: string[]; controlIds: string[]; profile: RiskProfile };

interface AssessmentViewProps {
    selectedScenarioIds: string[];
    onScenarioChange: (ids: string[]) => void;
    selectedControlIds: string[];
    onControlChange: (ids: string[]) => void;
    companyName: string;
    assessorName: string;
    email: string;
    logo: string | null;
    trials: number;
    setTrials: (n: number) => void;
    isSimulating: boolean;
    setIsSimulating: (b: boolean) => void;
    simulationResult: SimulationResult | null;
    setSimulationResult: (r: SimulationResult | null) => void;
    baselineSimulationResult: SimulationResult | null;
    setBaselineSimulationResult: (r: SimulationResult | null) => void;
    resultSnapshot: ResultSnapshot | null;
    setResultSnapshot: (s: ResultSnapshot | null) => void;
}

export function AssessmentView({
    selectedScenarioIds,
    onScenarioChange,
    selectedControlIds,
    onControlChange,
    companyName,
    assessorName,
    email,
    logo,
    trials,
    setTrials,
    isSimulating,
    setIsSimulating,
    simulationResult,
    setSimulationResult,
    baselineSimulationResult,
    setBaselineSimulationResult,
    resultSnapshot,
    setResultSnapshot,
}: AssessmentViewProps) {
    const { profile } = useRiskProfile();
    const [selectedSolutionIds, setSelectedSolutionIds] = useState<string[]>([]);

    const index = useMemo(() => buildTXOneIndex(profile), [profile]);

    const controlsForThreat = (threatId: string) =>
        profile.threatControlMap.filter(m => m.ThreatID === threatId).map(m => m.ControlID);
    const threatsForControl = (controlId: string) =>
        profile.threatControlMap.filter(m => m.ControlID === controlId).map(m => m.ThreatID);

    const selectedScenarios = useMemo(
        () => profile.scenarios.filter(s => selectedScenarioIds.includes(s.ID)),
        [profile, selectedScenarioIds]
    );

    // Bidirectional recommendations: any of Scenarios / Controls / TXOne Solutions can drive the other two.
    const recommendedControlIds = useMemo(() => {
        const set = new Set<string>();
        selectedScenarios.forEach(s => controlsForThreat(s.ThreatID).forEach(id => set.add(id)));
        selectedSolutionIds.forEach(sol => (index.solutionToControls.get(sol) || []).forEach(id => set.add(id)));
        return Array.from(set);
    }, [selectedScenarios, selectedSolutionIds, profile, index]);

    const recommendedScenarioIds = useMemo(() => {
        const set = new Set<string>();
        const threatIds = new Set<string>();
        selectedControlIds.forEach(cid => threatsForControl(cid).forEach(t => threatIds.add(t)));
        profile.scenarios.forEach(s => { if (threatIds.has(s.ThreatID)) set.add(s.ID); });
        selectedSolutionIds.forEach(sol => (index.solutionToScenarios.get(sol) || []).forEach(id => set.add(id)));
        return Array.from(set);
    }, [selectedControlIds, selectedSolutionIds, profile, index]);

    const recommendedSolutionIds = useMemo(() => {
        const set = new Set<string>();
        selectedControlIds.forEach(cid => (index.controlToSolutions.get(cid) || []).forEach(s => set.add(s)));
        selectedScenarios.forEach(s => controlsForThreat(s.ThreatID).forEach(cid =>
            (index.controlToSolutions.get(cid) || []).forEach(sol => set.add(sol))
        ));
        return Array.from(set);
    }, [selectedControlIds, selectedScenarios, profile, index]);

    const metrics = useMemo(
        () => calculateAggregatedMetrics(selectedScenarios, selectedControlIds, profile),
        [selectedScenarios, selectedControlIds, profile]
    );

    // "Before Controls" baseline — same Scenarios, no Controls applied — for the before/after comparison
    const baselineMetrics = useMemo(
        () => calculateAggregatedMetrics(selectedScenarios, [], profile),
        [selectedScenarios, profile]
    );

    const handleRunSimulation = () => {
        setIsSimulating(true);
        setTimeout(() => {
            try {
                // Same seed for both runs so "Before" and "After" draw the identical random
                // sequence — with no Controls selected the two results are then byte-identical,
                // and any difference shown is due to the Controls alone, not RNG variance.
                const seed = Date.now();
                const result = runSimulation(selectedScenarios, selectedControlIds, profile, trials, seed);
                const baselineResult = runSimulation(selectedScenarios, [], profile, trials, seed);
                setSimulationResult(result);
                setBaselineSimulationResult(baselineResult);
                setResultSnapshot({ scenarioIds: selectedScenarioIds, controlIds: selectedControlIds, profile });
            } catch (e) {
                console.error('Simulation failed', e);
                alert('Simulation failed. Check console for details.');
            } finally {
                setIsSimulating(false);
            }
        }, 100);
    };

    // A result is only shown while it was produced from exactly the current Scenario/Control
    // selection and the current risk data — any change to either hides the stale result and
    // requires re-running. Reference equality is intentional: these are only replaced (new array/
    // object identity) when the user actually changes something, not on every render.
    const isResultCurrent = Boolean(
        simulationResult &&
        baselineSimulationResult &&
        resultSnapshot &&
        resultSnapshot.scenarioIds === selectedScenarioIds &&
        resultSnapshot.controlIds === selectedControlIds &&
        resultSnapshot.profile === profile
    );

    const handleExportPDF = (images?: string[], labels?: string[]) => {
        exportPDF(
            { companyName, assessorName, email, logo },
            metrics,
            simulationResult,
            selectedScenarios,
            images,
            baselineMetrics,
            baselineSimulationResult,
            labels
        ).catch(e => console.error('Failed to export PDF', e));
    };

    const handleExportCSV = () => {
        if (!simulationResult || !baselineSimulationResult) return;
        const rows = simulationResult.annualLosses.map((loss, i) => [
            i + 1,
            baselineSimulationResult.annualLosses[i],
            loss,
        ]);
        exportCSV('simulation-results.csv', ['Trial ID', 'Annual Loss (Before Controls)', 'Annual Loss (After Controls)'], rows);
    };

    const handleExportSelection = () => {
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const scenarioCsv = [
            ['ID', 'Description', 'Selected'].join(','),
            ...profile.scenarios.map(s => [s.ID, s.Description, selectedScenarioIds.includes(s.ID) ? 'TRUE' : 'FALSE']
                .map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')),
        ].join('\n');
        const controlCsv = [
            ['ID', 'Name', 'Selected'].join(','),
            ...profile.controls.map(c => [c.ID, c.Name, selectedControlIds.includes(c.ID) ? 'TRUE' : 'FALSE']
                .map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')),
        ].join('\n');
        exportRawCSV(`Selection${dateStr}.csv`, `SCENARIOS\n${scenarioCsv}\n\nCONTROLS\n${controlCsv}`);
    };

    const applyRecommended = (
        current: string[],
        recommended: string[],
        setter: (ids: string[]) => void
    ) => setter(Array.from(new Set([...current, ...recommended])));

    return (
        <div className="space-y-8 text-xs">
            {/* ===== SELECTION ===== */}
            <section className="space-y-3">
                <div>
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">1. Selection</h2>
                    <p className="text-gray-500 mt-1">
                        Start from whichever makes sense: pick <strong>Scenarios</strong> to see recommended Controls and TXOne
                        Solutions; pick <strong>Controls</strong> to see which Scenarios and TXOne Solutions they relate to; or
                        pick a <strong>TXOne Solution</strong> to see the Controls it provides and the Scenarios it covers.
                        Recommended items are highlighted — use "Apply Recommended" to add them to your selection.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <SelectionList
                        title="Scenarios"
                        items={profile.scenarios.map(s => ({ id: s.ID, name: `${s.ID}: ${s.Description}`, description: s.Notes }))}
                        selectedIds={selectedScenarioIds}
                        onSelectionChange={onScenarioChange}
                        relatedIds={recommendedScenarioIds}
                        footer={recommendedScenarioIds.filter(id => !selectedScenarioIds.includes(id)).length > 0 ? (
                            <button
                                onClick={() => applyRecommended(selectedScenarioIds, recommendedScenarioIds, onScenarioChange)}
                                className="w-full flex items-center justify-center space-x-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors font-medium"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                                <span>Apply Recommended ({recommendedScenarioIds.filter(id => !selectedScenarioIds.includes(id)).length})</span>
                            </button>
                        ) : null}
                    />
                    <SelectionList
                        title="Controls"
                        items={profile.controls.map(c => ({ id: c.ID, name: `${c.ID}: ${c.Name}`, description: c.Category }))}
                        selectedIds={selectedControlIds}
                        onSelectionChange={onControlChange}
                        relatedIds={recommendedControlIds}
                        footer={recommendedControlIds.filter(id => !selectedControlIds.includes(id)).length > 0 ? (
                            <button
                                onClick={() => applyRecommended(selectedControlIds, recommendedControlIds, onControlChange)}
                                className="w-full flex items-center justify-center space-x-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors font-medium"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                                <span>Apply Recommended ({recommendedControlIds.filter(id => !selectedControlIds.includes(id)).length})</span>
                            </button>
                        ) : null}
                    />
                    <SelectionList
                        title="TXOne Solutions"
                        items={index.allSolutions.map(sol => ({
                            id: sol,
                            name: sol,
                            description: `${(index.solutionToControls.get(sol) || []).length} control(s)`,
                        }))}
                        selectedIds={selectedSolutionIds}
                        onSelectionChange={setSelectedSolutionIds}
                        relatedIds={recommendedSolutionIds}
                        footer={recommendedSolutionIds.filter(id => !selectedSolutionIds.includes(id)).length > 0 ? (
                            <button
                                onClick={() => applyRecommended(selectedSolutionIds, recommendedSolutionIds, setSelectedSolutionIds)}
                                className="w-full flex items-center justify-center space-x-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors font-medium"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                                <span>Apply Recommended ({recommendedSolutionIds.filter(id => !selectedSolutionIds.includes(id)).length})</span>
                            </button>
                        ) : null}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleExportSelection}
                        className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 border border-gray-300 rounded px-3 py-1.5 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <Download className="w-3.5 h-3.5" /> <span>Export Selection</span>
                    </button>
                </div>
            </section>

            {/* ===== CALCULATION ===== */}
            <section className="space-y-3 border-t border-gray-200 pt-6">
                <div>
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">2. Calculation</h2>
                    <p className="text-gray-500 mt-1">
                        A deterministic point estimate for the currently selected Scenarios: <strong>Aggregate Adjusted
                        TEF</strong> (combined yearly frequency after Control reduction), <strong>Avg Loss per Event</strong>{' '}
                        (loss size, weighted by TEF-Most-Likely), and <strong>Expected Annual Loss</strong> (TEF × Loss).
                        Each is shown as Min / Most Likely / Max, comparing <strong>Before Controls</strong> (no Controls
                        applied) against <strong>After Controls</strong> (your current Control selection) so you can see the
                        effect of the Controls you've chosen.
                    </p>
                </div>
                {selectedScenarios.length === 0 ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                        No scenarios selected yet — choose Scenarios above to see calculated risk figures.
                    </div>
                ) : (
                    <>
                        <div className="text-gray-500">
                            {selectedScenarios.length} scenario{selectedScenarios.length > 1 ? 's' : ''} selected, {selectedControlIds.length} control{selectedControlIds.length !== 1 ? 's' : ''} applied.
                        </div>
                        <SummaryCards metrics={metrics} baselineMetrics={baselineMetrics} />
                    </>
                )}
            </section>

            {/* ===== SIMULATION & RESULTS ===== */}
            <section className="space-y-3 border-t border-gray-200 pt-6">
                <div>
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">3. Simulation &amp; Results</h2>
                    <p className="text-gray-500 mt-1">
                        Runs two Monte Carlo simulations (up to 1,000 trials each) — one with no Controls applied
                        (<strong>Before Controls</strong>) and one with your current Control selection (<strong>After
                        Controls</strong>) — sampling frequency and loss per trial to build a distribution of possible
                        annual outcomes for each. <strong>Mean Annual Loss</strong> is the average across all trials;{' '}
                        <strong>P90 / P95 Loss</strong> are the loss levels exceeded in only 10% / 5% of trials (used for
                        conservative budgeting); <strong>Prob. ≥1 Event</strong> is the share of trials with at least one
                        loss event. The <strong>Annual Loss Histogram</strong> shows how often each loss range occurred; the{' '}
                        <strong>Loss Exceedance Curve</strong> shows the probability of exceeding any given loss level — each
                        shown Before and After so you can see the effect of your Controls.
                    </p>
                </div>
                {selectedScenarios.length === 0 ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                        No scenarios selected yet — choose Scenarios above before running a simulation.
                    </div>
                ) : (
                    <>
                        <SimulationControls
                            trials={trials}
                            setTrials={setTrials}
                            onRun={handleRunSimulation}
                            isRunning={isSimulating}
                            disabled={selectedScenarios.length === 0}
                        />
                        {isResultCurrent && simulationResult && baselineSimulationResult && (
                            <ResultsView
                                results={simulationResult}
                                baselineResults={baselineSimulationResult}
                                onExportReport={handleExportPDF}
                                onExportCSV={handleExportCSV}
                            />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
