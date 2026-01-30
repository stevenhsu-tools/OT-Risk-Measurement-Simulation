import { LayoutDashboard, FileText, CheckSquare, BarChart2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
    currentView: 'main' | 'detail' | 'about';
    onViewChange: (view: 'main' | 'detail' | 'about') => void;
    stats: {
        totalScenarios: number;
        totalControls: number;
    };
    className?: string;
}

export function Sidebar({ currentView, onViewChange, stats, className }: SidebarProps) {
    const NavItem = ({ view, icon: Icon, label }: { view: 'main' | 'detail' | 'about', icon: any, label: string }) => (
        <button
            onClick={() => onViewChange(view)}
            className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors border-l-4",
                currentView === view
                    ? "bg-blue-900/50 text-white border-blue-500"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent"
            )}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );

    return (
        <div className={cn("w-64 bg-[#0F172A] text-white flex flex-col h-screen fixed left-0 top-0 z-10", className)}>
            {/* Header */}
            <div className="p-6 flex items-center space-x-3 border-b border-white/10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">
                    OT
                </div>
                <h1 className="font-bold text-lg tracking-tight">Risk Sim</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-1">
                <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Menu
                </div>
                <NavItem view="main" icon={LayoutDashboard} label="Main Dashboard" />
                <NavItem view="detail" icon={FileText} label="Profile Detail" />
                <NavItem view="about" icon={Info} label="About (Help)" />
            </nav>

            {/* Stats Card */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Assessment Stats
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <CheckSquare className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm">Scenarios</span>
                        </div>
                        <span className="text-sm font-bold text-emerald-400">{stats.totalScenarios}</span>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <BarChart2 className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">Controls</span>
                        </div>
                        <span className="text-sm font-bold text-blue-400">{stats.totalControls}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
