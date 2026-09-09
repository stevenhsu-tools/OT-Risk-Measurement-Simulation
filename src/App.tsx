import { useState, useRef, useEffect } from 'react';

import { ErrorBoundary } from '@/components/Layout/ErrorBoundary';
import { Sidebar, View } from '@/components/Layout/Sidebar';
import { AboutView } from '@/components/About/AboutView';
import { DashboardView } from '@/components/Dashboard/DashboardView';
import { AssetsEditor } from '@/components/DataEditor/AssetsEditor';
import { ThreatsEditor } from '@/components/DataEditor/ThreatsEditor';
import { ControlsEditor } from '@/components/DataEditor/ControlsEditor';
import { ScenariosEditor } from '@/components/DataEditor/ScenariosEditor';
import { ThreatControlMapEditor } from '@/components/DataEditor/ThreatControlMapEditor';
import { ImportExportView } from '@/components/DataEditor/ImportExportView';
import { AssessmentView } from '@/components/Assessment/AssessmentView';
import { RiskProfileProvider, useRiskProfile } from '@/context/RiskProfileContext';
import { SimulationResult } from '@/lib/riskEngine';
import { RiskProfile } from '@/lib/types';

const VIEW_TITLES: Record<View, string> = {
    'profile': 'Profile',
    'assets': 'Assets',
    'threats': 'Threats',
    'controls': 'Controls',
    'threat-control-map': 'Threat–Control Map',
    'scenarios': 'Scenarios',
    'import-export': 'Import / Export Dataset',
    'assessment': 'Risk Simulation',
    'about': 'About',
};

function AppShell() {
    // Report metadata (independent of risk data)
    const [companyName, setCompanyName] = useState('');
    const [assessorName, setAssessorName] = useState('');
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState<string | null>(null);
    const [date, setDate] = useState<string>(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });

    const [currentView, setCurrentView] = useState<View>('profile');

    // Scroll to top on view change
    const mainContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo(0, 0);
        }
    }, [currentView]);

    const { profile } = useRiskProfile();

    // Selection state — shared with the Assessment page
    const [selectedScenarioIds, setSelectedScenarioIds] = useState<string[]>([]);
    const [selectedControlIds, setSelectedControlIds] = useState<string[]>([]);

    // Simulation state — lifted up (rather than owned by AssessmentView) so a result survives
    // navigating away and back to the Assessment page. It's invalidated (see AssessmentView) only
    // when the Scenario/Control selection or the underlying risk data actually changes.
    const [trials, setTrials] = useState(1000);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    // "Before Controls" run — same Scenarios, no Controls applied — for the before/after comparison
    const [baselineSimulationResult, setBaselineSimulationResult] = useState<SimulationResult | null>(null);
    const [resultSnapshot, setResultSnapshot] = useState<{
        scenarioIds: string[];
        controlIds: string[];
        profile: RiskProfile;
    } | null>(null);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar
                currentView={currentView}
                onViewChange={setCurrentView}
                stats={{
                    totalScenarios: profile.scenarios.length,
                    selectedScenarios: selectedScenarioIds.length,
                    totalControls: profile.controls.length,
                    selectedControls: selectedControlIds.length,
                }}
            />

            <div className="flex-1 flex flex-col overflow-hidden ml-64">
                <header className="bg-white border-b border-gray-200 flex-shrink-0">
                    <div className="px-8 h-14 flex items-center justify-between">
                        <h1 className="text-base font-bold text-gray-900">{VIEW_TITLES[currentView]}</h1>
                        <div className="text-xs text-gray-500">
                            {companyName || 'No Company Selected'} | {date}
                        </div>
                    </div>
                </header>

                <main ref={mainContentRef} className="flex-1 overflow-y-auto p-8 relative flex flex-col">
                    <div className="flex-1 pb-16">
                        {currentView === 'profile' && (
                            <DashboardView
                                companyName={companyName} setCompanyName={setCompanyName}
                                assessorName={assessorName} setAssessorName={setAssessorName}
                                email={email} setEmail={setEmail}
                                logo={logo} setLogo={setLogo}
                                date={date} setDate={setDate}
                                onNavigate={(view) => setCurrentView(view as View)}
                            />
                        )}
                        {currentView === 'assets' && <AssetsEditor />}
                        {currentView === 'threats' && <ThreatsEditor />}
                        {currentView === 'controls' && <ControlsEditor />}
                        {currentView === 'threat-control-map' && <ThreatControlMapEditor />}
                        {currentView === 'scenarios' && <ScenariosEditor />}
                        {currentView === 'import-export' && <ImportExportView />}
                        {currentView === 'assessment' && (
                            <AssessmentView
                                selectedScenarioIds={selectedScenarioIds}
                                onScenarioChange={setSelectedScenarioIds}
                                selectedControlIds={selectedControlIds}
                                onControlChange={setSelectedControlIds}
                                companyName={companyName}
                                assessorName={assessorName}
                                email={email}
                                logo={logo}
                                trials={trials}
                                setTrials={setTrials}
                                isSimulating={isSimulating}
                                setIsSimulating={setIsSimulating}
                                simulationResult={simulationResult}
                                setSimulationResult={setSimulationResult}
                                baselineSimulationResult={baselineSimulationResult}
                                setBaselineSimulationResult={setBaselineSimulationResult}
                                resultSnapshot={resultSnapshot}
                                setResultSnapshot={setResultSnapshot}
                            />
                        )}
                        {currentView === 'about' && <AboutView />}
                    </div>

                    <footer className="mt-auto pt-8 pb-4 text-center text-xs text-gray-500 border-t border-gray-100">
                        Developed by Steven Hsu
                    </footer>
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <RiskProfileProvider>
                <AppShell />
            </RiskProfileProvider>
        </ErrorBoundary>
    );
}

export default App;
