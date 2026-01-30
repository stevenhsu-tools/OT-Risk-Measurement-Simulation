
import { AggregatedMetrics } from '@/lib/aggregation';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

interface SummaryCardsProps {
    metrics: AggregatedMetrics;
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
    };

    const formatCurrency = (num: number) => {
        // For large numbers, maybe use abbreviation? For now standard currency
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }

    const Card = ({ title, icon: Icon, values, isCurrency = false }: any) => (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-700">{title}</h3>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min</span>
                    <span className="font-semibold text-gray-900">{isCurrency ? formatCurrency(values.min) : formatNumber(values.min)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Most Likely</span>
                    <span className="font-semibold text-blue-600">{isCurrency ? formatCurrency(values.ml) : formatNumber(values.ml)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Max</span>
                    <span className="font-semibold text-gray-900">{isCurrency ? formatCurrency(values.max) : formatNumber(values.max)}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
                title="Aggregated Adjusted TEF"
                icon={Activity}
                values={{ min: metrics.tefMin, ml: metrics.tefMostLikely, max: metrics.tefMax }}
            />
            <Card
                title="Avg Loss per Event"
                icon={DollarSign}
                values={{ min: metrics.avgLossMin, ml: metrics.avgLossMostLikely, max: metrics.avgLossMax }}
                isCurrency
            />
            <Card
                title="Expected Annual Loss"
                icon={TrendingUp}
                values={{ min: metrics.expectedAnnualLossMin, ml: metrics.expectedAnnualLossMostLikely, max: metrics.expectedAnnualLossMax }}
                isCurrency
            />
        </div>
    );
}
