
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulationControlsProps {
    trials: number;
    setTrials: (val: number) => void;
    onRun: () => void;
    isRunning: boolean;
    disabled?: boolean;
}

export function SimulationControls({ trials, setTrials, onRun, isRunning, disabled }: SimulationControlsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full space-y-2">
                <label className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Simulation Trials</span>
                    <span className="text-blue-600 font-bold">{trials}</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="1000"
                    value={trials}
                    onChange={(e) => setTrials(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    disabled={isRunning || disabled}
                />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>1</span>
                    <span>500</span>
                    <span>1000</span>
                </div>
            </div>

            <button
                onClick={onRun}
                disabled={disabled || isRunning}
                className={cn(
                    "w-full md:w-auto px-8 py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold text-white transition-all transform hover:scale-105 active:scale-95",
                    disabled
                        ? "bg-gray-300 cursor-not-allowed"
                        : isRunning
                            ? "bg-blue-400 cursor-wait animate-pulse"
                            : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                )}
            >
                <Play className={cn("w-5 h-5", isRunning && "animate-spin")} fill="currentColor" />
                <span>{isRunning ? "Running Simulation..." : "Run Monte Carlo Simulation"}</span>
            </button>
        </div>
    );
}
