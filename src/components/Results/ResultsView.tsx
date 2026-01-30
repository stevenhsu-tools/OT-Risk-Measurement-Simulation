
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'; // Use main package
import { useRef } from 'react';
import { SimulationResult } from '@/lib/monteCarlo';
import { Download } from 'lucide-react';

interface ResultsViewProps {
    results: SimulationResult;
    onExportReport: (images?: string[]) => void;
}

export function ResultsView({ results, onExportReport, onExportCSV }: ResultsViewProps & { onExportCSV?: () => void }) {
    const plot1Ref = useRef<any>(null);
    const plot2Ref = useRef<any>(null);

    const handleExport = async () => {
        try {
            const images: string[] = [];
            if (plot1Ref.current) {
                const img = await Plotly.toImage(plot1Ref.current.el, { format: 'png', height: 400, width: 600 });
                images.push(img);
            }
            if (plot2Ref.current) {
                const img = await Plotly.toImage(plot2Ref.current.el, { format: 'png', height: 400, width: 600 });
                images.push(img);
            }
            onExportReport(images);
        } catch (e) {
            console.error("Failed to capture charts", e);
            onExportReport([]);
        }
    };

    // Dynamic Binning for Histogram with Multi-Colors
    const values = results.annualLosses;
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const binCount = 15; // Target number of bins

    // Nice round number step size
    const rawStep = (maxVal - minVal) / binCount;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const step = Math.ceil(rawStep / magnitude) * magnitude;

    const dynamicBins: number[] = [];
    const dynamicLabels: string[] = [];

    // Generate bins starting from floor of min
    let current = Math.floor(minVal / step) * step;
    const end = Math.ceil(maxVal / step) * step;

    while (current <= end) {
        dynamicBins.push(current);
        current += step;
    }

    // Count frequencies
    const frequencies = new Array(dynamicBins.length - 1).fill(0);
    for (const val of values) {
        for (let i = 0; i < dynamicBins.length - 1; i++) {
            if (val >= dynamicBins[i] && val < dynamicBins[i + 1]) {
                frequencies[i]++;
                break;
            }
        }
        // Handle max edge inclusive
        if (val >= dynamicBins[dynamicBins.length - 1]) {
            // Add to last bin or ignore? Usually last bin extends.
            // For simple plotting, let's put it in the last bucket
            frequencies[frequencies.length - 1]++;
        }
    }

    // Generate Labels
    const formatLabel = (num: number) => {
        if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
        return `$${num}`;
    };

    for (let i = 0; i < dynamicBins.length - 1; i++) {
        dynamicLabels.push(formatLabel(dynamicBins[i]));
    }

    // Custom distinct colors for each bar to match Excel style (qualitative)
    const distinctColors = [
        '#4472C4', '#ED7D31', '#A5A5A5', '#FFC000', '#5B9BD5', '#70AD47',
        '#264478', '#9E480E', '#636363', '#997300', '#255E91', '#43682B',
        '#698ED0', '#F1975A', '#B7B7B7'
    ];

    // Cycle colors if more bins than colors
    const barColors = frequencies.map((_, i) => distinctColors[i % distinctColors.length]);

    const histogramTrace: Partial<Plotly.Data> = {
        x: dynamicLabels,
        y: frequencies,
        type: 'bar',
        marker: {
            color: barColors,
            line: {
                color: 'white',
                width: 1
            }
        },
        name: 'Frequency',
        opacity: 0.8,
    };

    // Exceedance Curve Data (1 - CDF)
    // Sort losses Descending
    const sortedLosses = [...results.annualLosses].sort((a, b) => b - a);
    const total = sortedLosses.length;
    const exceedanceX: number[] = [];
    const exceedanceY: number[] = []; // Probability

    // Check unique values to reduce points? Or just plot all points (step function)
    sortedLosses.forEach((loss, index) => {
        exceedanceX.push(loss);
        exceedanceY.push((index + 1) / total); // Probability of exceeding this loss
    });

    const exceedanceTrace: Partial<Plotly.Data> = {
        x: exceedanceX,
        y: exceedanceY,
        type: 'scatter',
        mode: 'lines',
        name: 'Exceedance Prob.',
        line: { color: '#ef4444', width: 2 }
    };

    const formatCurrency = (num: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

    return (
        <div className="space-y-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Simulation Results</h2>
                    <div className="flex items-center space-x-4">
                        {onExportCSV && (
                            <button
                                onClick={onExportCSV}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export Monte Carlo Simulation Results (CSV)</span>
                            </button>
                        )}
                        <button
                            onClick={handleExport}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download PDF Report</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-gray-50 rounded-md text-center">
                        <div className="text-sm text-gray-500 mb-1">Mean Annual Loss</div>
                        <div className="text-xl font-bold text-gray-900">{formatCurrency(results.meanEAL)}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md text-center">
                        <div className="text-sm text-gray-500 mb-1">P90 Loss</div>
                        <div className="text-xl font-bold text-blue-600">{formatCurrency(results.p90EAL)}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md text-center">
                        <div className="text-sm text-gray-500 mb-1">P95 Loss</div>
                        <div className="text-xl font-bold text-red-600">{formatCurrency(results.p95EAL)}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md text-center">
                        <div className="text-sm text-gray-500 mb-1">Prob. ≥1 Event</div>
                        <div className="text-xl font-bold text-gray-900">{(results.probabilityOnePlusEvents * 100).toFixed(1)}%</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-[400px] w-full border rounded-lg p-2">
                        <Plot
                            ref={plot1Ref}
                            data={[histogramTrace]}
                            layout={{
                                title: { text: 'Annual Loss Histogram' },
                                autosize: true,
                                margin: { t: 40, b: 60, l: 60, r: 20 },
                                xaxis: {
                                    title: { text: 'Loss ($)' },
                                    tickfont: { size: 10 },
                                    automargin: true,
                                    tickangle: -45
                                },
                                yaxis: { title: { text: 'Frequency' } },
                                bargap: 0.3
                            }}
                            useResizeHandler={true}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="h-[400px] w-full border rounded-lg p-2">
                        <Plot
                            ref={plot2Ref}
                            data={[exceedanceTrace]}
                            layout={{
                                title: { text: 'Loss Exceedance Curve' },
                                autosize: true,
                                margin: { t: 40, b: 40, l: 60, r: 20 },
                                xaxis: { title: { text: 'Loss ($)' } },
                                yaxis: {
                                    title: { text: 'Probability of Exceedance' },
                                    tickformat: '.1%'
                                }
                            }}
                            useResizeHandler={true}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
