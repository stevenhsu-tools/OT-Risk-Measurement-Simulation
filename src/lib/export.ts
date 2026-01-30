import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AggregatedMetrics } from './aggregation';
import { Scenario } from './types';
import { SimulationResult } from './monteCarlo';

// Extend jsPDF type to include autoTable
interface SectionData {
    companyName: string;
    assessorName: string;
    email: string;
    logo: string | null;
}

export const exportPDF = (
    sectionData: SectionData,
    metrics: AggregatedMetrics,
    results: SimulationResult | null,
    _selectedScenarios: Scenario[], // For list (Unused)
    chartImages: string[] = []
) => {
    const doc = new jsPDF();

    // Header
    const today = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text('OT Risk Assessment Report', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${today}`, 14, 28);

    // Logo
    if (sectionData.logo) {
        try {
            doc.addImage(sectionData.logo, 'JPEG', 150, 10, 40, 20); // Adjust positioning
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

    // Summary Metrics
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Pre-Simulation Summary', 14, finalY);
    autoTable(doc, {
        startY: finalY + 5,
        head: [['Metric', 'Min', 'Most Likely', 'Max']],
        body: [
            ['Aggregated Adjusted TEF', metrics.tefMin.toFixed(2), metrics.tefMostLikely.toFixed(2), metrics.tefMax.toFixed(2)],
            ['Avg Loss per Event', formatCurrency(metrics.avgLossMin), formatCurrency(metrics.avgLossMostLikely), formatCurrency(metrics.avgLossMax)],
            ['Expected Annual Loss', formatCurrency(metrics.expectedAnnualLossMin), formatCurrency(metrics.expectedAnnualLossMostLikely), formatCurrency(metrics.expectedAnnualLossMax)],
        ]
    });

    // Simulation Results
    if (results) {
        finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.text('Simulation Results', 14, finalY);
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

    // Charts
    if (chartImages && chartImages.length > 0) {
        finalY = (doc as any).lastAutoTable.finalY + 10;

        // Add new page if needed
        if (finalY > 200) {
            doc.addPage();
            finalY = 20;
        }

        doc.text('Charts', 14, finalY);
        finalY += 10;

        chartImages.forEach((img) => {
            // Check if we need a new page
            if (finalY + 80 > 280) {
                doc.addPage();
                finalY = 20;
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
