import { InputForm } from '@/components/Input/InputForm';
import { RiskDataOverview } from '@/components/Dashboard/RiskDataOverview';

interface DashboardViewProps {
    companyName: string;
    setCompanyName: (value: string) => void;
    assessorName: string;
    setAssessorName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    logo: string | null;
    setLogo: (value: string | null) => void;
    date: string;
    setDate: (value: string) => void;
    onNavigate: (view: string) => void;
}

export function DashboardView({ onNavigate, ...inputFormProps }: DashboardViewProps) {
    return (
        <div className="space-y-6 text-xs">
            <InputForm {...inputFormProps} />

            <RiskDataOverview onNavigate={onNavigate} />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h3 className="font-semibold text-blue-900 mb-2 text-xs">Getting Started</h3>
                <ol className="list-decimal list-inside text-blue-800 space-y-1">
                    <li>Review or customize Assets, Threats, Controls, Threat–Control Map, and Scenarios, under the <strong>Data</strong> section.</li>
                    <li>Use <strong>Import / Export Dataset</strong> under Data to save, share, or restore your configuration.</li>
                    <li>Go to <strong>Risk Simulation</strong> under Assessment to choose Scenarios, Controls, or TXOne Solutions, view the calculated risk estimate, and run a Monte Carlo simulation — all on one page.</li>
                </ol>
            </div>
        </div>
    );
}
