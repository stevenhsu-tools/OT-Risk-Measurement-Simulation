
import { AggregatedMetrics } from '@/lib/riskEngine';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

interface SummaryCardsProps {
    metrics: AggregatedMetrics;
    baselineMetrics?: AggregatedMetrics; // "Before Controls" (no controls applied) comparison
}

export function SummaryCards({ metrics, baselineMetrics }: SummaryCardsProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
    };

    const formatCurrency = (num: number) => {
        // For large numbers, maybe use abbreviation? For now standard currency
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }

    const formatValue = (num: number, isCurrency: boolean) => (isCurrency ? formatCurrency(num) : formatNumber(num));

    const reductionPct = (before: number, after: number): number | null => {
        if (!(before > 0)) return null;
        return ((before - after) / before) * 100;
    };

    const Card = ({ title, icon: Icon, values, baselineValues, isCurrency = false }: any) => {
        const mlReduction = baselineValues ? reductionPct(baselineValues.ml, values.ml) : null;
        return (
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-blue-50 rounded-lg">
                            <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-700 text-xs">{title}</h3>
                    </div>
                    {mlReduction !== null && mlReduction > 0.05 && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                            −{mlReduction.toFixed(0)}%
                        </span>
                    )}
                </div>

                {baselineValues ? (
                    <div className="space-y-1.5">
                        <div className="grid grid-cols-3 gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                            <span></span>
                            <span className="text-right">Before</span>
                            <span className="text-right">After</span>
                        </div>
                        {(['min', 'ml', 'max'] as const).map(bound => (
                            <div key={bound} className="grid grid-cols-3 gap-1 text-xs items-center">
                                <span className="text-gray-500">{bound === 'ml' ? 'Most Likely' : bound === 'min' ? 'Min' : 'Max'}</span>
                                <span className="text-right text-gray-400">{formatValue(baselineValues[bound], isCurrency)}</span>
                                <span className={`text-right font-semibold ${bound === 'ml' ? 'text-blue-600' : 'text-gray-900'}`}>
                                    {formatValue(values[bound], isCurrency)}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Min</span>
                            <span className="font-semibold text-gray-900">{formatValue(values.min, isCurrency)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Most Likely</span>
                            <span className="font-semibold text-blue-600">{formatValue(values.ml, isCurrency)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Max</span>
                            <span className="font-semibold text-gray-900">{formatValue(values.max, isCurrency)}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card
                title="Aggregated Adjusted TEF"
                icon={Activity}
                values={{ min: metrics.tefMin, ml: metrics.tefMostLikely, max: metrics.tefMax }}
                baselineValues={baselineMetrics ? { min: baselineMetrics.tefMin, ml: baselineMetrics.tefMostLikely, max: baselineMetrics.tefMax } : undefined}
            />
            <Card
                title="Avg Loss per Event"
                icon={DollarSign}
                values={{ min: metrics.avgLossMin, ml: metrics.avgLossMostLikely, max: metrics.avgLossMax }}
                baselineValues={baselineMetrics ? { min: baselineMetrics.avgLossMin, ml: baselineMetrics.avgLossMostLikely, max: baselineMetrics.avgLossMax } : undefined}
                isCurrency
            />
            <Card
                title="Expected Annual Loss"
                icon={TrendingUp}
                values={{ min: metrics.expectedAnnualLossMin, ml: metrics.expectedAnnualLossMostLikely, max: metrics.expectedAnnualLossMax }}
                baselineValues={baselineMetrics ? { min: baselineMetrics.expectedAnnualLossMin, ml: baselineMetrics.expectedAnnualLossMostLikely, max: baselineMetrics.expectedAnnualLossMax } : undefined}
                isCurrency
            />
        </div>
    );
}
