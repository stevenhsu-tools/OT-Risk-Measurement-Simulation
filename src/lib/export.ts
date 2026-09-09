import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AggregatedMetrics, SimulationResult } from './riskEngine';
import { Scenario } from './types';

// Extend jsPDF type to include autoTable
interface SectionData {
    companyName: string;
    assessorName: string;
    email: string;
    logo: string | null;
}

// Reads a data-URL image's natural pixel dimensions so the PDF can fit it into a bounding box
// without stretching it out of its original aspect ratio.
function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = reject;
        img.src = dataUrl;
    });
}

// jsPDF's addImage needs an explicit format; detect it from the data URL rather than assuming JPEG.
function detectImageFormat(dataUrl: string): string {
    const match = dataUrl.match(/^data:image\/(\w+);/);
    const ext = (match?.[1] || 'jpeg').toUpperCase();
    return ext === 'JPG' ? 'JPEG' : ext;
}

export const exportPDF = async (
    sectionData: SectionData,
    metrics: AggregatedMetrics,
    results: SimulationResult | null,
    _selectedScenarios: Scenario[], // For list (Unused)
    chartImages: string[] = [],
    baselineMetrics?: AggregatedMetrics,
    baselineResults?: SimulationResult | null,
    chartLabels: string[] = []
) => {
    const doc = new jsPDF();

    // Header
    const today = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text('OT Risk Assessment Report', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${today}`, 14, 28);

    // Logo — fit within a max 40x20mm box, preserving its natural aspect ratio (never stretched)
    if (sectionData.logo) {
        try {
            const { width, height } = await getImageDimensions(sectionData.logo);
            const maxWidth = 40;
            const maxHeight = 20;
            const scale = Math.min(maxWidth / width, maxHeight / height);
            const drawWidth = width * scale;
            const drawHeight = height * scale;
            // Right-align within the same box the old fixed-size logo occupied
            const x = 150 + (maxWidth - drawWidth) / 2;
            const y = 10 + (maxHeight - drawHeight) / 2;
            doc.addImage(sectionData.logo, detectImageFormat(sectionData.logo), x, y, drawWidth, drawHeight);
        } catch (e) {
            console.warn("Could not add logo", e);
        }
    }

    // Inputs
    doc.setFontSize(14);
    doc.text('Assessment Details', 14, 40);
    autoTable(doc, {
        startY: 45,
        head: [['Field', 'Value']],
        body: [
            ['Company Name', sectionData.companyName],
            ['Assessor Name', sectionData.assessorName],
            ['Email', sectionData.email],
        ]
    });

    // Helper for currency formatting
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    // % reduction from Before -> After (positive = improvement); '-' when Before is 0 (undefined %)
    const formatReduction = (before: number, after: number) =>
        before > 0 ? `${(((before - after) / before) * 100).toFixed(1)}%` : '-';

    // Summary Metrics — Before Controls vs After Controls when a baseline is available
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Pre-Simulation Summary (Before Controls -> After Controls)', 14, finalY);
    if (baselineMetrics) {
        autoTable(doc, {
            startY: finalY + 5,
            head: [['Metric', 'Bound', 'Before Controls', 'After Controls', 'Reduction %']],
            body: [
                ['Aggregated Adjusted TEF', 'Min', baselineMetrics.tefMin.toFixed(2), metrics.tefMin.toFixed(2), formatReduction(baselineMetrics.tefMin, metrics.tefMin)],
                ['', 'Most Likely', baselineMetrics.tefMostLikely.toFixed(2), metrics.tefMostLikely.toFixed(2), formatReduction(baselineMetrics.tefMostLikely, metrics.tefMostLikely)],
                ['', 'Max', baselineMetrics.tefMax.toFixed(2), metrics.tefMax.toFixed(2), formatReduction(baselineMetrics.tefMax, metrics.tefMax)],
                ['Avg Loss per Event', 'Min', formatCurrency(baselineMetrics.avgLossMin), formatCurrency(metrics.avgLossMin), formatReduction(baselineMetrics.avgLossMin, metrics.avgLossMin)],
                ['', 'Most Likely', formatCurrency(baselineMetrics.avgLossMostLikely), formatCurrency(metrics.avgLossMostLikely), formatReduction(baselineMetrics.avgLossMostLikely, metrics.avgLossMostLikely)],
                ['', 'Max', formatCurrency(baselineMetrics.avgLossMax), formatCurrency(metrics.avgLossMax), formatReduction(baselineMetrics.avgLossMax, metrics.avgLossMax)],
                ['Expected Annual Loss', 'Min', formatCurrency(baselineMetrics.expectedAnnualLossMin), formatCurrency(metrics.expectedAnnualLossMin), formatReduction(baselineMetrics.expectedAnnualLossMin, metrics.expectedAnnualLossMin)],
                ['', 'Most Likely', formatCurrency(baselineMetrics.expectedAnnualLossMostLikely), formatCurrency(metrics.expectedAnnualLossMostLikely), formatReduction(baselineMetrics.expectedAnnualLossMostLikely, metrics.expectedAnnualLossMostLikely)],
                ['', 'Max', formatCurrency(baselineMetrics.expectedAnnualLossMax), formatCurrency(metrics.expectedAnnualLossMax), formatReduction(baselineMetrics.expectedAnnualLossMax, metrics.expectedAnnualLossMax)],
            ]
        });
    } else {
        autoTable(doc, {
            startY: finalY + 5,
            head: [['Metric', 'Min', 'Most Likely', 'Max']],
            body: [
                ['Aggregated Adjusted TEF', metrics.tefMin.toFixed(2), metrics.tefMostLikely.toFixed(2), metrics.tefMax.toFixed(2)],
                ['Avg Loss per Event', formatCurrency(metrics.avgLossMin), formatCurrency(metrics.avgLossMostLikely), formatCurrency(metrics.avgLossMax)],
                ['Expected Annual Loss', formatCurrency(metrics.expectedAnnualLossMin), formatCurrency(metrics.expectedAnnualLossMostLikely), formatCurrency(metrics.expectedAnnualLossMax)],
            ]
        });
    }

    // Simulation Results — Before Controls vs After Controls when a baseline is available
    if (results) {
        finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.text('Simulation Results (Before Controls -> After Controls)', 14, finalY);
        if (baselineResults) {
            autoTable(doc, {
                startY: finalY + 5,
                head: [['Metric', 'Before Controls', 'After Controls', 'Reduction %']],
                body: [
                    ['Mean Annual Loss', formatCurrency(baselineResults.meanEAL), formatCurrency(results.meanEAL), formatReduction(baselineResults.meanEAL, results.meanEAL)],
                    ['P90 Loss', formatCurrency(baselineResults.p90EAL), formatCurrency(results.p90EAL), formatReduction(baselineResults.p90EAL, results.p90EAL)],
                    ['P95 Loss', formatCurrency(baselineResults.p95EAL), formatCurrency(results.p95EAL), formatReduction(baselineResults.p95EAL, results.p95EAL)],
                    ['Prob. >= 1 Event', `${(baselineResults.probabilityOnePlusEvents * 100).toFixed(1)}%`, `${(results.probabilityOnePlusEvents * 100).toFixed(1)}%`, formatReduction(baselineResults.probabilityOnePlusEvents, results.probabilityOnePlusEvents)],
                ]
            });
        } else {
            autoTable(doc, {
                startY: finalY + 5,
                head: [['Metric', 'Value']],
                body: [
                    ['Mean Annual Loss', formatCurrency(results.meanEAL)],
                    ['P90 Loss', formatCurrency(results.p90EAL)],
                    ['P95 Loss', formatCurrency(results.p95EAL)],
                    ['Prob. >= 1 Event', `${(results.probabilityOnePlusEvents * 100).toFixed(1)}%`],
                ]
            });
        }
    }

    // Charts
    if (chartImages && chartImages.length > 0) {
        finalY = (doc as any).lastAutoTable.finalY + 10;

        // Add new page if needed
        if (finalY > 200) {
            doc.addPage();
            finalY = 20;
        }

        doc.setFontSize(14);
        doc.text('Charts', 14, finalY);
        finalY += 10;

        chartImages.forEach((img, i) => {
            // Check if we need a new page
            if (finalY + 90 > 280) {
                doc.addPage();
                finalY = 20;
            }

            const label = chartLabels[i];
            if (label) {
                doc.setFontSize(10);
                doc.text(label, 14, finalY);
                finalY += 6;
            }

            try {
                doc.addImage(img, 'PNG', 14, finalY, 180, 80);
                finalY += 90;
            } catch (e) {
                console.warn("Error adding chart image", e);
            }
        });
    }

    doc.save('risk-assessment-report.pdf');
};

export const exportCSV = (filename: string, headers: string[], rows: any[]) => {
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const exportRawCSV = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
