
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'; // Use main package
import { useRef } from 'react';
import { SimulationResult } from '@/lib/riskEngine';
import { Download } from 'lucide-react';

interface ResultsViewProps {
    results: SimulationResult; // "After Controls" — the currently selected controls applied
    baselineResults: SimulationResult; // "Before Controls" — same scenarios, no controls applied
    onExportReport: (images?: string[], labels?: string[]) => void;
    onExportCSV?: () => void;
}

// Distinct qualitative bar colors (Excel-style), matching the original single-chart version.
const DISTINCT_COLORS = [
    '#4472C4', '#ED7D31', '#A5A5A5', '#FFC000', '#5B9BD5', '#70AD47',
    '#264478', '#9E480E', '#636363', '#997300', '#255E91', '#43682B',
    '#698ED0', '#F1975A', '#B7B7B7'
];

// Builds a histogram (shared bin edges) + exceedance-curve trace pair for one result set, so
// before/after charts are drawn on a directly comparable scale. Before/After are distinguished
// by chart title/label styling, not by color — colors match the original single-chart version.
function buildTraces(values: number[], binEdges: number[]) {
    const frequencies = new Array(binEdges.length - 1).fill(0);
    for (const val of values) {
        let placed = false;
        for (let i = 0; i < binEdges.length - 1; i++) {
            if (val >= binEdges[i] && val < binEdges[i + 1]) {
                frequencies[i]++;
                placed = true;
                break;
            }
        }
        if (!placed && val >= binEdges[binEdges.length - 1]) {
            frequencies[frequencies.length - 1]++;
        }
    }

    const formatLabel = (num: number) => {
        if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
        return `$${num}`;
    };
    const labels = binEdges.slice(0, -1).map(formatLabel);
    const barColors = frequencies.map((_, i) => DISTINCT_COLORS[i % DISTINCT_COLORS.length]);

    const histogramTrace: Partial<Plotly.Data> = {
        x: labels,
        y: frequencies,
        type: 'bar',
        marker: { color: barColors, line: { color: 'white', width: 1 } },
        name: 'Frequency',
        opacity: 0.85,
    };

    const sorted = [...values].sort((a, b) => b - a);
    const total = sorted.length;
    const exceedanceTrace: Partial<Plotly.Data> = {
        x: sorted,
        y: sorted.map((_, i) => (i + 1) / total),
        type: 'scatter',
        mode: 'lines',
        name: 'Exceedance Prob.',
        line: { color: '#4472C4', width: 2 },
    };

    return { histogramTrace, exceedanceTrace };
}

export function ResultsView({ results, baselineResults, onExportReport, onExportCSV }: ResultsViewProps) {
    const beforeHistRef = useRef<any>(null);
    const afterHistRef = useRef<any>(null);
    const beforeExcRef = useRef<any>(null);
    const afterExcRef = useRef<any>(null);

    const handleExport = async () => {
        const refs = [
            { ref: beforeHistRef, label: 'Annual Loss Histogram — Before Controls' },
            { ref: afterHistRef, label: 'Annual Loss Histogram — After Controls' },
            { ref: beforeExcRef, label: 'Loss Exceedance Curve — Before Controls' },
            { ref: afterExcRef, label: 'Loss Exceedance Curve — After Controls' },
        ];
        const images: string[] = [];
        const labels: string[] = [];
        // Capture each chart independently (one failure/timeout shouldn't block the rest) and yield
        // to the browser between captures — four sequential rasterizations can be resource-heavy.
        for (const { ref, label } of refs) {
            if (!ref.current) continue;
            try {
                const img = await Plotly.toImage(ref.current.el, { format: 'png', height: 320, width: 480 });
                images.push(img);
                labels.push(label);
            } catch (e) {
                console.warn(`Failed to capture chart: ${label}`, e);
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        onExportReport(images, labels);
    };

    // Shared bin edges and axis range across before/after so bar heights and curve positions are
    // directly comparable, not independently auto-scaled.
    const allValues = [...baselineResults.annualLosses, ...results.annualLosses];
    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);
    const binCount = 15;
    const rawStep = (maxVal - minVal) / binCount || 1;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const step = Math.ceil(rawStep / magnitude) * magnitude;
    const binEdges: number[] = [];
    let current = Math.floor(minVal / step) * step;
    const end = Math.ceil(maxVal / step) * step;
    while (current <= end) {
        binEdges.push(current);
        current += step;
    }
    const xAxisRange = [minVal, maxVal];

    const before = buildTraces(baselineResults.annualLosses, binEdges);
    const after = buildTraces(results.annualLosses, binEdges);

    const formatCurrency = (num: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

    const StatRow = ({ label, before, after, colorAfter = 'text-gray-900', isPct = false }: any) => (
        <div className="p-3 bg-gray-50 rounded-md text-center">
            <div className="text-[11px] text-gray-500 mb-1">{label}</div>
            <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400">{isPct ? `${(before * 100).toFixed(1)}%` : formatCurrency(before)}</span>
                <span className="text-gray-300 text-xs">→</span>
                <span className={`text-base font-bold ${colorAfter}`}>{isPct ? `${(after * 100).toFixed(1)}%` : formatCurrency(after)}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-sm font-bold text-gray-800">Simulation Results</h2>
                        <p className="text-[11px] text-gray-400 mt-0.5">Before Controls → After Controls</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {onExportCSV && (
                            <button
                                onClick={onExportCSV}
                                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Export Monte Carlo Results (CSV)</span>
                            </button>
                        )}
                        <button
                            onClick={handleExport}
                            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF Report</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                    <StatRow label="Mean Annual Loss" before={baselineResults.meanEAL} after={results.meanEAL} />
                    <StatRow label="P90 Loss" before={baselineResults.p90EAL} after={results.p90EAL} colorAfter="text-blue-600" />
                    <StatRow label="P95 Loss" before={baselineResults.p95EAL} after={results.p95EAL} colorAfter="text-red-600" />
                    <StatRow label="Prob. ≥1 Event" before={baselineResults.probabilityOnePlusEvents} after={results.probabilityOnePlusEvents} isPct />
                </div>

                {/* 2x2 chart grid: Before | After, Histogram (top row) then Exceedance Curve (bottom row).
                    Before/After are distinguished by a highlighted group header + matching border
                    accent (not trace color, so chart colors stay consistent with the original
                    single-chart version). */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-0">
                        <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide text-center bg-gray-100 rounded-t-lg py-1.5 border border-b-0 border-gray-300">Before Controls</p>
                        <div className="h-[360px] w-full border-2 border-gray-300 rounded-b-lg p-2">
                            <Plot
                                ref={beforeHistRef}
                                data={[before.histogramTrace]}
                                layout={{
                                    title: { text: 'Annual Loss Histogram', font: { size: 12 } },
                                    autosize: true,
                                    margin: { t: 36, b: 55, l: 55, r: 15 },
                                    font: { size: 9 },
                                    xaxis: { title: { text: 'Loss ($)', font: { size: 10 } }, tickfont: { size: 9 }, automargin: true, tickangle: -45 },
                                    yaxis: { title: { text: 'Frequency', font: { size: 10 } } },
                                    bargap: 0.3,
                                }}
                                useResizeHandler={true}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="space-y-0">
                        <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide text-center bg-blue-100 rounded-t-lg py-1.5 border border-b-0 border-blue-300">After Controls</p>
                        <div className="h-[360px] w-full border-2 border-blue-300 rounded-b-lg p-2">
                            <Plot
                                ref={afterHistRef}
                                data={[after.histogramTrace]}
                                layout={{
                                    title: { text: 'Annual Loss Histogram', font: { size: 12 } },
                                    autosize: true,
                                    margin: { t: 36, b: 55, l: 55, r: 15 },
                                    font: { size: 9 },
                                    xaxis: { title: { text: 'Loss ($)', font: { size: 10 } }, tickfont: { size: 9 }, automargin: true, tickangle: -45 },
                                    yaxis: { title: { text: 'Frequency', font: { size: 10 } } },
                                    bargap: 0.3,
                                }}
                                useResizeHandler={true}
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    <div className="h-[360px] w-full border-2 border-gray-300 rounded-lg p-2">
                        <Plot
                            ref={beforeExcRef}
                            data={[before.exceedanceTrace]}
                            layout={{
                                title: { text: 'Loss Exceedance Curve', font: { size: 12 } },
                                autosize: true,
                                margin: { t: 36, b: 35, l: 55, r: 15 },
                                font: { size: 9 },
                                xaxis: { title: { text: 'Loss ($)', font: { size: 10 } }, range: xAxisRange },
                                yaxis: { title: { text: 'Prob. of Exceedance', font: { size: 10 } }, tickformat: '.0%' },
                            }}
                            useResizeHandler={true}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="h-[360px] w-full border-2 border-blue-300 rounded-lg p-2">
                        <Plot
                            ref={afterExcRef}
                            data={[after.exceedanceTrace]}
                            layout={{
                                title: { text: 'Loss Exceedance Curve', font: { size: 12 } },
                                autosize: true,
                                margin: { t: 36, b: 35, l: 55, r: 15 },
                                font: { size: 9 },
                                xaxis: { title: { text: 'Loss ($)', font: { size: 10 } }, range: xAxisRange },
                                yaxis: { title: { text: 'Prob. of Exceedance', font: { size: 10 } }, tickformat: '.0%' },
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
