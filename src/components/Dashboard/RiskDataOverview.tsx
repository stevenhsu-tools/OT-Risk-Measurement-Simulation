import { Server, AlertTriangle, Shield, FileText, Link2 } from 'lucide-react';
import { useRiskProfile } from '@/context/RiskProfileContext';

interface RiskDataOverviewProps {
    onNavigate?: (view: string) => void;
}

export function RiskDataOverview({ onNavigate }: RiskDataOverviewProps) {
    const { profile } = useRiskProfile();

    const stats = [
        { label: 'Assets', count: profile.assets.length, icon: Server, view: 'assets', color: 'text-blue-500' },
        { label: 'Threats', count: profile.threats.length, icon: AlertTriangle, view: 'threats', color: 'text-amber-500' },
        { label: 'Controls', count: profile.controls.length, icon: Shield, view: 'controls', color: 'text-emerald-500' },
        { label: 'Threat-Control Mappings', count: profile.threatControlMap.length, icon: Link2, view: 'threat-control-map', color: 'text-rose-500' },
        { label: 'Scenarios', count: profile.scenarios.length, icon: FileText, view: 'scenarios', color: 'text-purple-500' },
    ];

    return (
        <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Risk Data Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {stats.map(s => {
                    const Card = onNavigate ? 'button' : 'div';
                    return (
                        <Card
                            key={s.view}
                            onClick={onNavigate ? () => onNavigate(s.view) : undefined}
                            className={`bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-left ${onNavigate ? 'hover:shadow-md hover:border-blue-300 transition-all' : ''}`}
                        >
                            <s.icon className={`w-4 h-4 mb-1.5 ${s.color}`} />
                            <div className="text-lg font-bold text-gray-900">{s.count}</div>
                            <div className="text-[11px] text-gray-500">{s.label}</div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
