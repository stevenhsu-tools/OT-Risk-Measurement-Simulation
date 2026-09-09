import {
    LayoutDashboard, Server, AlertTriangle, Shield, FileText, Link2,
    ClipboardList, Info, ArrowLeftRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type View =
    | 'profile'
    | 'assets'
    | 'threats'
    | 'controls'
    | 'threat-control-map'
    | 'scenarios'
    | 'import-export'
    | 'assessment'
    | 'about';

interface NavItemDef {
    view: View;
    icon: any;
    label: string;
}

interface NavSection {
    section?: string;
    items: NavItemDef[];
}

const NAV_SECTIONS: NavSection[] = [
    { items: [{ view: 'profile', icon: LayoutDashboard, label: 'Profile' }] },
    {
        section: 'Data',
        items: [
            { view: 'assets', icon: Server, label: 'Assets' },
            { view: 'threats', icon: AlertTriangle, label: 'Threats' },
            { view: 'controls', icon: Shield, label: 'Controls' },
            { view: 'threat-control-map', icon: Link2, label: 'Threat–Control Map' },
            { view: 'scenarios', icon: FileText, label: 'Scenarios' },
            { view: 'import-export', icon: ArrowLeftRight, label: 'Import / Export Dataset' },
        ],
    },
    {
        section: 'Assessment',
        items: [
            { view: 'assessment', icon: ClipboardList, label: 'Risk Simulation' },
        ],
    },
    { items: [{ view: 'about', icon: Info, label: 'About' }] },
];

interface SidebarProps {
    currentView: View;
    onViewChange: (view: View) => void;
    stats: {
        totalScenarios: number;
        selectedScenarios: number;
        totalControls: number;
        selectedControls: number;
    };
    className?: string;
}

export function Sidebar({ currentView, onViewChange, stats, className }: SidebarProps) {
    return (
        <div
            className={cn(
                "w-64 text-white flex flex-col h-screen fixed left-0 top-0 z-10 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0B1220]",
                className
            )}
        >
            {/* Header */}
            <div className="px-5 py-5 flex items-center space-x-3 border-b border-white/10 flex-shrink-0 bg-black/10">
                <img
                    src={`${import.meta.env.BASE_URL}assets/ot-risk-sim.svg`}
                    alt="OT Risk Measurement Simulation"
                    className="w-9 h-9 flex-shrink-0 drop-shadow-[0_0_8px_rgba(56,189,248,0.35)]"
                />
                <div className="min-w-0">
                    <h1 className="font-bold text-[13px] leading-tight tracking-tight text-white">
                        OT Risk Measurement
                    </h1>
                    <h1 className="font-bold text-[13px] leading-tight tracking-tight text-white">
                        Simulation
                    </h1>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-3 overflow-y-auto">
                {NAV_SECTIONS.map((sec, idx) => (
                    <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                        {sec.section && (
                            <div className="px-5 mb-1.5 text-[10px] font-semibold text-cyan-500/70 uppercase tracking-widest">
                                {sec.section}
                            </div>
                        )}
                        <div className="space-y-0.5 px-2">
                            {sec.items.map(item => (
                                <button
                                    key={item.view}
                                    onClick={() => onViewChange(item.view)}
                                    className={cn(
                                        "w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium transition-all rounded-md border-l-2",
                                        currentView === item.view
                                            ? "bg-gradient-to-r from-blue-600/30 to-transparent text-white border-cyan-400 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]"
                                            : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
                                    )}
                                >
                                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="truncate text-left">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Stats Card */}
            <div className="mx-3 mb-3 p-3 rounded-lg border border-white/10 bg-black/30 flex-shrink-0">
                <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                    Assessment Stats
                </h3>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-slate-300">
                            <ClipboardList className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs">Scenarios</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">
                            {stats.selectedScenarios} / {stats.totalScenarios}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-slate-300">
                            <Shield className="w-3.5 h-3.5 text-sky-400" />
                            <span className="text-xs">Controls</span>
                        </div>
                        <span className="text-xs font-bold text-sky-400">
                            {stats.selectedControls} / {stats.totalControls}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
