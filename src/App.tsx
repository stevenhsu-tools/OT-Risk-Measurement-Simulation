import { useState, useMemo, useRef, useEffect } from 'react';

import { InputForm } from '@/components/Input/InputForm';
import { FileUpload } from '@/components/Input/FileUpload';
import { SelectionList } from '@/components/Selection/SelectionList';
import { SummaryCards } from '@/components/Summary/SummaryCards';
import { SimulationControls } from '@/components/Simulation/SimulationControls';
import { ResultsView } from '@/components/Results/ResultsView';
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary';
import { AboutView } from '@/components/About/AboutView';

import { RiskProfile } from '@/lib/types';
import { calculateAggregatedMetrics } from '@/lib/aggregation';
import { runSimulation, SimulationResult } from '@/lib/monteCarlo';
import { exportPDF, exportRawCSV, exportCSV } from '@/lib/export';
import { Download, ArrowRight } from 'lucide-react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { cn } from '@/lib/utils';

function App() {
    // Input State
    const [companyName, setCompanyName] = useState('');
    const [assessorName, setAssessorName] = useState('');
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState<string | null>(null);
    const [date, setDate] = useState<string>(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });
    const [currentView, setCurrentView] = useState<'main' | 'detail' | 'about'>('main');
    const [profileActiveTab, setProfileActiveTab] = useState<'Assets' | 'Threats' | 'Controls' | 'Scenarios' | 'Threat_Control_Map'>('Assets');

    // Scroll handling
    const mainContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo(0, 0);
        }
    }, [currentView]);

    // Data State
    const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Selection State
    const [selectedScenarioIds, setSelectedScenarioIds] = useState<string[]>([]);
    const [selectedControlIds, setSelectedControlIds] = useState<string[]>([]);

    // Simulation State
    const [trials, setTrials] = useState(1000);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

    // Computed Selection
    const selectedScenarios = useMemo(() =>
        riskProfile?.scenarios.filter(s => selectedScenarioIds.includes(s.ID)) || [],
        [riskProfile, selectedScenarioIds]
    );

    const selectedControls = useMemo(() =>
        riskProfile?.controls.filter(c => selectedControlIds.includes(c.ID)) || [],
        [riskProfile, selectedControlIds]
    );

    // Helper to calculate recommended controls
    const getRecommendedControls = (scenarioIds: string[], profile: RiskProfile | null) => {
        if (!profile || scenarioIds.length === 0) return [];
        const allRecommended = new Set<string>();
        profile.scenarios
            .filter(s => scenarioIds.includes(s.ID))
            .forEach(s => {
                const threatId = s.ThreatID || s['Threat_ID'] || s['Threat ID'];
                if (threatId) {
                    const related = profile.threatControlMap
                        .filter(map => map.ThreatID === threatId)
                        .map(map => map.ControlID);
                    related.forEach(id => allRecommended.add(id));
                }
            });
        return Array.from(allRecommended);
    };

    const recommendedControlIds = useMemo(() =>
        getRecommendedControls(selectedScenarioIds, riskProfile),
        [riskProfile, selectedScenarioIds]
    );

    const handleScenarioChange = (newScenarioIds: string[]) => {
        if (!riskProfile) {
            setSelectedScenarioIds(newScenarioIds);
            return;
        }

        // Calculate controls that are NO LONGER recommended
        const currentRecommended = getRecommendedControls(selectedScenarioIds, riskProfile);
        const newRecommended = getRecommendedControls(newScenarioIds, riskProfile);

        // Find IDs that were in current but NOT in new
        const noLongerRecommended = currentRecommended.filter(id => !newRecommended.includes(id));

        // Update scenarios
        setSelectedScenarioIds(newScenarioIds);

        // Update controls: Remove those that are no longer recommended
        // Keep controls that are: (Still selected) AND (Not in the 'noLongerRecommended' list)
        if (noLongerRecommended.length > 0) {
            setSelectedControlIds(prev => prev.filter(id => !noLongerRecommended.includes(id)));
        }
    };

    const handleApplyRecommendations = () => {
        const newSelection = Array.from(new Set([...selectedControlIds, ...recommendedControlIds]));
        setSelectedControlIds(newSelection);
    };

    const handleRemoveRecommendations = () => {
        setSelectedControlIds(prev => prev.filter(id => !recommendedControlIds.includes(id)));
    };

    // Metrics
    const aggregatedMetrics = useMemo(() => {
        if (!riskProfile) return {
            tefMin: 0, tefMostLikely: 0, tefMax: 0,
            avgLossMin: 0, avgLossMostLikely: 0, avgLossMax: 0,
            expectedAnnualLossMin: 0, expectedAnnualLossMostLikely: 0, expectedAnnualLossMax: 0
        };
        return calculateAggregatedMetrics(selectedScenarios, selectedControls, riskProfile.threatControlMap);
    }, [selectedScenarios, selectedControls, riskProfile]);

    // Handlers
    const handleDataLoaded = (data: RiskProfile) => {
        setRiskProfile(data);
        setUploadError(null);
        // Do not auto-select by default as requested
        setSelectedScenarioIds([]);
        setSelectedControlIds([]);
        setSimulationResult(null);
    };

    const handleRunSimulation = async () => {
        if (!riskProfile) return;
        setIsSimulating(true);

        // Allow UI to update before heavy calc
        setTimeout(() => {
            try {
                const result = runSimulation(
                    selectedScenarios,
                    selectedControls,
                    riskProfile.threatControlMap,
                    trials
                );
                setSimulationResult(result);
            } catch (e) {
                console.error("Simulation failed", e);
                alert("Simulation failed. Check console for details.");
            } finally {
                setIsSimulating(false);
            }
        }, 100);
    };

    const handleExportPDF = async (images?: string[]) => {
        if (!riskProfile) return;
        exportPDF(
            { companyName, assessorName, email, logo },
            calculateAggregatedMetrics(selectedScenarios, selectedControls, riskProfile.threatControlMap),
            simulationResult,
            selectedScenarios,
            images
        );
    };

    const handleExportCSV = () => {
        if (!simulationResult) return;

        // Export Annual Losses (Raw Data)
        const rows = simulationResult.annualLosses.map((loss, index) => [index + 1, loss]);
        exportCSV('simulation-results.csv', ['Trial ID', 'Annual Loss'], rows);
    };

    const handleExportConfiguration = () => {
        if (!riskProfile) return;

        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const filename = `Configuration${dateStr}.csv`;

        // Scenarios Section
        // Export ALL scenarios, with Selected status
        const scenarioHeaders = ['ID', 'Name', 'Selected'];
        const scenarioRows = riskProfile.scenarios.map(s => [
            s.ID,
            s.Name,
            selectedScenarioIds.includes(s.ID) ? 'TRUE' : 'FALSE'
        ]);

        const scenarioCsv = [
            scenarioHeaders.join(','),
            ...scenarioRows.map(row => row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        // Controls Section
        // Export ALL controls, with Selected status
        const controlHeaders = ['ID', 'Name', 'Selected'];
        const controlRows = riskProfile.controls.map(c => [
            c.ID,
            c.Name,
            selectedControlIds.includes(c.ID) ? 'TRUE' : 'FALSE'
        ]);

        const controlCsv = [
            controlHeaders.join(','),
            ...controlRows.map(row => row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        // Combine
        const combinedContent = `SCENARIOS\n${scenarioCsv}\n\nCONTROLS\n${controlCsv}`;

        exportRawCSV(filename, combinedContent);
    };

    return (
        <ErrorBoundary>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    stats={{
                        totalScenarios: riskProfile?.scenarios.length || 0,
                        totalControls: riskProfile?.controls.length || 0
                    }}
                />

                <div className="flex-1 flex flex-col overflow-hidden ml-64">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 flex-shrink-0">
                        <div className="px-8 h-16 flex items-center justify-between">
                            <h1 className="text-xl font-bold text-gray-900">
                                {currentView === 'main' ? 'Risk Simulation Dashboard' :
                                    currentView === 'detail' ? 'Profile Details' : 'About Application'}
                            </h1>
                            <div className="text-sm text-gray-500">
                                {companyName || 'No Company Selected'} | {date}
                            </div>
                        </div>
                    </header>

                    <main ref={mainContentRef} className="flex-1 overflow-y-auto p-8 relative flex flex-col">
                        {currentView === 'main' ? (
                            <div className="space-y-8 pb-16">
                                <InputForm
                                    companyName={companyName} setCompanyName={setCompanyName}
                                    assessorName={assessorName} setAssessorName={setAssessorName}
                                    email={email} setEmail={setEmail}
                                    logo={logo} setLogo={setLogo}
                                    date={date} setDate={setDate}
                                />

                                {!riskProfile ? (
                                    <div className="mt-8">
                                        <FileUpload onDataLoaded={handleDataLoaded} onError={setUploadError} />
                                        {uploadError && (
                                            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                                                {uploadError}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in duration-500 space-y-8">
                                        <div className="flex justify-between items-center bg-green-50 p-4 rounded-md border border-green-200 text-green-800">
                                            <span className="font-medium">File Loaded Successfully</span>
                                            <button onClick={() => setRiskProfile(null)} className="text-sm underline hover:text-green-900">
                                                Upload Different File
                                            </button>
                                        </div>

                                        {/* Selection Inteface */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <SelectionList
                                                title="Scenarios"
                                                items={riskProfile.scenarios.map((s, i) => {
                                                    const id = s.ID || `S-${String(i + 1).padStart(2, '0')}`;
                                                    const name = s.Name || 'Unnamed Scenario';
                                                    return {
                                                        id: s.ID || `scenario-${i}`,
                                                        name: `${id}: ${name}`,
                                                        description: s.Description
                                                    };
                                                })}
                                                selectedIds={selectedScenarioIds}
                                                onSelectionChange={handleScenarioChange}
                                            />
                                            <SelectionList
                                                title="Controls"
                                                items={riskProfile.controls.map((c, i) => {
                                                    const id = c.ID || `C-${String(i + 1).padStart(2, '0')}`;
                                                    return {
                                                        id: c.ID || `control-${i}`,
                                                        name: `${c.ID || id}: ${c.Name || 'Unnamed'}`,
                                                        description: c.Description
                                                    };
                                                })}
                                                selectedIds={selectedControlIds}
                                                onSelectionChange={setSelectedControlIds}
                                                relatedIds={recommendedControlIds}
                                                footer={recommendedControlIds.length > 0 ? (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={handleApplyRecommendations}
                                                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors text-sm font-medium"
                                                            title="Select all recommended controls"
                                                        >
                                                            <ArrowRight className="w-4 h-4" />
                                                            <span>Apply ({recommendedControlIds.length})</span>
                                                        </button>
                                                        <button
                                                            onClick={handleRemoveRecommendations}
                                                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                                                            title="Unselect recommended controls"
                                                        >
                                                            <span>Unselect</span>
                                                        </button>
                                                    </div>
                                                ) : null}
                                            />
                                        </div>

                                        <div className="flex justify-end space-x-4">
                                            <button onClick={handleExportConfiguration} className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 border border-gray-300 rounded px-3 py-2 bg-white shadow-sm hover:bg-gray-50 transition-colors">
                                                <Download className="w-4 h-4" /> <span>Export Configuration</span>
                                            </button>
                                        </div>

                                        {/* Summary Cards */}
                                        <SummaryCards metrics={aggregatedMetrics} />

                                        {/* Simulation Controls */}
                                        <SimulationControls
                                            trials={trials}
                                            setTrials={setTrials}
                                            onRun={handleRunSimulation}
                                            isRunning={isSimulating}
                                            disabled={selectedScenarios.length === 0}
                                        />

                                        {/* Results */}
                                        {simulationResult && (
                                            <ResultsView results={simulationResult} onExportReport={handleExportPDF} onExportCSV={handleExportCSV} />
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : currentView === 'detail' ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-16">
                                {/* Tab Navigation */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex space-x-2 overflow-x-auto">
                                    {['Assets', 'Threats', 'Controls', 'Scenarios', 'Threat_Control_Map'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setProfileActiveTab(tab as any)}
                                            className={cn(
                                                "px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                                                profileActiveTab === tab
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            )}
                                        >
                                            {tab === 'Threat_Control_Map' ? 'Threat Control Map' : tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
                                    <h2 className="text-xl font-bold mb-4">{profileActiveTab === 'Threat_Control_Map' ? 'Threat Control Map' : profileActiveTab} ({
                                        profileActiveTab === 'Assets' ? riskProfile?.assets.length :
                                            profileActiveTab === 'Threats' ? riskProfile?.threats.length :
                                                profileActiveTab === 'Controls' ? riskProfile?.controls.length :
                                                    profileActiveTab === 'Scenarios' ? riskProfile?.scenarios.length :
                                                        riskProfile?.threatControlMap.length || 0
                                    })</h2>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead>
                                                <tr>
                                                    {profileActiveTab === 'Assets' && (
                                                        <>
                                                            <th className="px-4 py-2 text-left bg-gray-50">ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Name</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Purdue Level</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Primary Function</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Downtime Cost/Hr</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Max Outage</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Base Loss</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Safety Impact?</th>
                                                        </>
                                                    )}
                                                    {profileActiveTab === 'Threats' && (
                                                        <>
                                                            <th className="px-4 py-2 text-left bg-gray-50">ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Name</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Description/Type</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Freq Min</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Freq Likely</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Freq Max</th>
                                                        </>
                                                    )}
                                                    {profileActiveTab === 'Controls' && (
                                                        <>
                                                            <th className="px-4 py-2 text-left bg-gray-50">ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Name</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Description/Category</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Eff Min</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Eff Likely</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Eff Max</th>
                                                        </>
                                                    )}
                                                    {profileActiveTab === 'Scenarios' && (
                                                        <>
                                                            <th className="px-4 py-2 text-left bg-gray-50">ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Name</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Threat Type</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Asset ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Threat ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Freq</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Loss (Likely)</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Notes</th>
                                                        </>
                                                    )}
                                                    {profileActiveTab === 'Threat_Control_Map' && (
                                                        <>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Threat ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Control ID</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Reduction (%)</th>
                                                            <th className="px-4 py-2 text-left bg-gray-50">Justification</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {profileActiveTab === 'Assets' && riskProfile?.assets.map((a, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2">{a.ID}</td>
                                                        <td className="px-4 py-2 font-medium">{a.Name}</td>
                                                        <td className="px-4 py-2">{a['Purdue Level'] || '-'}</td>
                                                        <td className="px-4 py-2">{a['Primary Function'] || '-'}</td>
                                                        <td className="px-4 py-2">{a['Downtime Cost per Hour (USD)'] ? `$${Number(a['Downtime Cost per Hour (USD)']).toLocaleString()}` : '-'}</td>
                                                        <td className="px-4 py-2">{a['Max Outage Hours'] || '-'}</td>
                                                        <td className="px-4 py-2">{a['Base Loss (Downtime Only) (USD)'] ? `$${Number(a['Base Loss (Downtime Only) (USD)']).toLocaleString()}` : (a.Value ? `$${a.Value.toLocaleString()}` : '-')}</td>
                                                        <td className="px-4 py-2">{a['Safety Impact?'] || '-'}</td>
                                                    </tr>
                                                ))}
                                                {profileActiveTab === 'Threats' && riskProfile?.threats.map((t, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2">{t.ID}</td>
                                                        <td className="px-4 py-2 font-medium">{t.Name}</td>
                                                        <td className="px-4 py-2 text-gray-500 truncate max-w-xs">{t.Description}</td>
                                                        <td className="px-4 py-2">{typeof t.FrequencyMin === 'number' ? t.FrequencyMin.toFixed(2) : t.FrequencyMin}</td>
                                                        <td className="px-4 py-2">{typeof t.Frequency === 'number' ? t.Frequency.toFixed(2) : t.Frequency}</td>
                                                        <td className="px-4 py-2">{typeof t.FrequencyMax === 'number' ? t.FrequencyMax.toFixed(2) : t.FrequencyMax}</td>
                                                    </tr>
                                                ))}
                                                {profileActiveTab === 'Controls' && riskProfile?.controls.map((c, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2">{c.ID}</td>
                                                        <td className="px-4 py-2 font-medium">{c.Name}</td>
                                                        <td className="px-4 py-2 text-gray-500 truncate max-w-xs" title={c.Description}>{c.Description}</td>
                                                        <td className="px-4 py-2">{c.EffectivenessMin ? Math.round(c.EffectivenessMin * 100) + '%' : '-'}</td>
                                                        <td className="px-4 py-2">{c.Effectiveness ? Math.round(c.Effectiveness * 100) + '%' : '-'}</td>
                                                        <td className="px-4 py-2">{c.EffectivenessMax ? Math.round(c.EffectivenessMax * 100) + '%' : '-'}</td>
                                                    </tr>
                                                ))}
                                                {profileActiveTab === 'Scenarios' && riskProfile?.scenarios.map((s, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2">{s.ID}</td>
                                                        <td className="px-4 py-2 font-medium">{s.Name}</td>
                                                        <td className="px-4 py-2 text-sm">{s.Type}</td>
                                                        <td className="px-4 py-2">{s.AssetID}</td>
                                                        <td className="px-4 py-2">{s.ThreatID}</td>
                                                        <td className="px-4 py-2">{typeof s.Frequency === 'number' ? s.Frequency.toFixed(2) : s.Frequency}</td>
                                                        <td className="px-4 py-2">{s.MostLikelyLoss ? `$${s.MostLikelyLoss.toLocaleString()}` : '-'}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{s.Notes}</td>
                                                    </tr>
                                                ))}
                                                {profileActiveTab === 'Threat_Control_Map' && riskProfile?.threatControlMap.map((m, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2">{m.ThreatID}</td>
                                                        <td className="px-4 py-2">{m.ControlID}</td>
                                                        <td className="px-4 py-2">{m.Reduction ? `${(m.Reduction * 100).toFixed(0)}%` : '-'}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{m.Justification}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <AboutView />
                        )}

                        <footer className="mt-auto pt-8 pb-4 text-center text-sm text-gray-500 border-t border-gray-100">
                            Developed by Steven Hsu
                        </footer>
                    </main>
                </div>
            </div >
        </ErrorBoundary >
    );
}

export default App;
