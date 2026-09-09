import * as XLSX from 'xlsx';
import { RiskProfile, Asset, Threat, Control, Scenario, ThreatControlMap } from './types';

const REQUIRED_SHEETS = ['Assets', 'Threats', 'Controls', 'Scenarios', 'Threat_Control_Map'];

// ============ JSON (primary path — reliable round-trip of the app's own data) ============

export function exportDatasetJSON(profile: RiskProfile): void {
    const json = JSON.stringify(profile, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    downloadBlob(blob, `ot-risk-dataset-${dateStamp()}.json`);
}

export function importDatasetJSON(file: File): Promise<RiskProfile> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target?.result as string);
                validateProfileShape(parsed);
                resolve(parsed as RiskProfile);
            } catch (err: any) {
                reject(new Error(`Invalid dataset JSON: ${err.message}`));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

// Required numeric fields per table — checked so a malformed row (e.g. hand-edited JSON) is
// rejected at import time instead of silently becoming NaN once it reaches the risk engine.
const REQUIRED_NUMERIC_FIELDS: Partial<Record<keyof RiskProfile, string[]>> = {
    assets: ['DowntimeCostPerHour', 'MaxOutageHours'],
    threats: ['BaseTEFMin', 'BaseTEFMostLikely', 'BaseTEFMax'],
    controls: ['ReductionMin', 'ReductionMostLikely', 'ReductionMax'],
};

function validateProfileShape(obj: any): void {
    const keys: (keyof RiskProfile)[] = ['assets', 'threats', 'controls', 'scenarios', 'threatControlMap'];
    for (const key of keys) {
        if (!Array.isArray(obj[key])) {
            throw new Error(`Missing or invalid "${key}" array`);
        }
        const requiredFields = REQUIRED_NUMERIC_FIELDS[key];
        if (!requiredFields) continue;
        obj[key].forEach((row: any, i: number) => {
            for (const field of requiredFields) {
                if (typeof row?.[field] !== 'number' || isNaN(row[field])) {
                    throw new Error(`"${key}[${i}]" (ID: ${row?.ID ?? 'unknown'}) has a missing or invalid "${field}"`);
                }
            }
        });
    }
}

// ============ Excel (interop with the v5.2.1 reference schema) ============

export function exportDatasetExcel(profile: RiskProfile): void {
    const wb = XLSX.utils.book_new();

    const assetsSheet = XLSX.utils.json_to_sheet(profile.assets.map(a => ({
        'Asset ID': a.ID,
        'Asset Name': a.Name,
        'Purdue Level': a.PurdueLevel || '',
        'Primary Function': a.PrimaryFunction || '',
        'Downtime Cost per Hour (USD)': a.DowntimeCostPerHour,
        'Max Outage Hours': a.MaxOutageHours,
        'Base Loss (Downtime Only) (USD)': a.BaseLoss ?? a.DowntimeCostPerHour * a.MaxOutageHours,
        'Safety Impact?': a.SafetyImpact || '',
        'Assumption Basis': a.AssumptionBasis || '',
    })));
    XLSX.utils.book_append_sheet(wb, assetsSheet, 'Assets');

    const threatsSheet = XLSX.utils.json_to_sheet(profile.threats.map(t => ({
        'Threat ID': t.ID,
        'Threat Type': t.Name,
        'Base TEF Min (events/yr)': t.BaseTEFMin,
        'Base TEF Most Likely (events/yr)': t.BaseTEFMostLikely,
        'Base TEF Max (events/yr)': t.BaseTEFMax,
        'Assumption Basis': t.AssumptionBasis || '',
    })));
    XLSX.utils.book_append_sheet(wb, threatsSheet, 'Threats');

    const controlsSheet = XLSX.utils.json_to_sheet(profile.controls.map(c => ({
        'Control ID': c.ID,
        'Control Name': c.Name,
        'Control Category': c.Category || '',
        'Reduction Min (%)': c.ReductionMin,
        'Reduction Most Likely (%)': c.ReductionMostLikely,
        'Reduction Max (%)': c.ReductionMax,
        'Enabled (0/1)': c.Enabled ? 1 : 0,
        'TXOne Solution(s)': (c.TXOneSolutions || []).join('; '),
        'Evidence Source IDs': c.EvidenceSourceIds || '',
    })));
    XLSX.utils.book_append_sheet(wb, controlsSheet, 'Controls');

    const scenariosSheet = XLSX.utils.json_to_sheet(profile.scenarios.map(s => ({
        'Scenario ID': s.ID,
        'Scenario Description (action/process)': s.Description,
        'Asset ID': s.AssetID,
        'Threat ID': s.ThreatID,
        'Notes': s.Notes || '',
    })));
    XLSX.utils.book_append_sheet(wb, scenariosSheet, 'Scenarios');

    const tcmSheet = XLSX.utils.json_to_sheet(profile.threatControlMap.map(m => ({
        'Threat ID': m.ThreatID,
        'Control ID': m.ControlID,
        'Effect On (TEF/Loss)': m.EffectOn,
        'Justification': m.Justification || '',
        'Control Enabled (0/1)': m.ControlEnabled ? 1 : 0,
        'Control Reduction Most Likely (%)': m.ReductionMostLikely,
    })));
    XLSX.utils.book_append_sheet(wb, tcmSheet, 'Threat_Control_Map');

    XLSX.writeFile(wb, `ot-risk-dataset-${dateStamp()}.xlsx`);
}

export function importDatasetExcel(file: File): Promise<RiskProfile> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const wb = XLSX.read(data, { type: 'binary' });

                const missing = REQUIRED_SHEETS.filter(s => !wb.SheetNames.includes(s));
                if (missing.length > 0) {
                    throw new Error(`Missing required sheets: ${missing.join(', ')}`);
                }

                const assets: Asset[] = XLSX.utils.sheet_to_json<any>(wb.Sheets['Assets']).map(row => ({
                    ID: String(row['Asset ID'] || '').trim(),
                    Name: String(row['Asset Name'] || '').trim(),
                    PurdueLevel: row['Purdue Level'] || undefined,
                    PrimaryFunction: row['Primary Function'] || undefined,
                    DowntimeCostPerHour: parseFloat(row['Downtime Cost per Hour (USD)']) || 0,
                    MaxOutageHours: parseFloat(row['Max Outage Hours']) || 0,
                    BaseLoss: parseFloat(row['Base Loss (Downtime Only) (USD)']) || 0,
                    SafetyImpact: row['Safety Impact?'] || undefined,
                    AssumptionBasis: row['Assumption Basis'] || undefined,
                }));

                const threats: Threat[] = XLSX.utils.sheet_to_json<any>(wb.Sheets['Threats']).map(row => ({
                    ID: String(row['Threat ID'] || '').trim(),
                    Name: String(row['Threat Type'] || '').trim(),
                    BaseTEFMin: parseFloat(row['Base TEF Min (events/yr)']) || 0,
                    BaseTEFMostLikely: parseFloat(row['Base TEF Most Likely (events/yr)']) || 0,
                    BaseTEFMax: parseFloat(row['Base TEF Max (events/yr)']) || 0,
                    AssumptionBasis: row['Assumption Basis'] || undefined,
                }));

                const controls: Control[] = XLSX.utils.sheet_to_json<any>(wb.Sheets['Controls']).map(row => {
                    const solStr = String(row['TXOne Solution(s)'] || '').trim();
                    return {
                        ID: String(row['Control ID'] || '').trim(),
                        Name: String(row['Control Name'] || '').trim(),
                        Category: row['Control Category'] || undefined,
                        ReductionMin: normalizePct(row['Reduction Min (%)']),
                        ReductionMostLikely: normalizePct(row['Reduction Most Likely (%)']),
                        ReductionMax: normalizePct(row['Reduction Max (%)']),
                        Enabled: Number(row['Enabled (0/1)']) === 1,
                        TXOneSolutions: solStr ? solStr.split(';').map(s => s.trim()).filter(Boolean) : [],
                        EvidenceSourceIds: row['Evidence Source IDs'] || undefined,
                    };
                });

                const scenarios: Scenario[] = XLSX.utils.sheet_to_json<any>(wb.Sheets['Scenarios']).map(row => ({
                    ID: String(row['Scenario ID'] || '').trim(),
                    Description: String(row['Scenario Description (action/process)'] || row['Scenario Description'] || '').trim(),
                    AssetID: String(row['Asset ID'] || '').trim(),
                    ThreatID: String(row['Threat ID'] || '').trim(),
                    Notes: row['Notes'] || undefined,
                }));

                const threatControlMap: ThreatControlMap[] = XLSX.utils.sheet_to_json<any>(wb.Sheets['Threat_Control_Map']).map(row => ({
                    ThreatID: String(row['Threat ID'] || '').trim(),
                    ControlID: String(row['Control ID'] || '').trim(),
                    EffectOn: (String(row['Effect On (TEF/Loss)'] || 'TEF').trim() === 'Loss' ? 'Loss' : 'TEF') as 'TEF' | 'Loss',
                    Justification: row['Justification'] || undefined,
                    ControlEnabled: Number(row['Control Enabled (0/1)']) === 1,
                    ReductionMostLikely: normalizePct(row['Control Reduction Most Likely (%)']),
                }));

                resolve({ assets, threats, controls, scenarios, threatControlMap });
            } catch (err: any) {
                reject(new Error(err.message || 'Failed to parse Excel file'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsBinaryString(file);
    });
}

function normalizePct(val: any): number {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;
    return num > 1 ? num / 100 : num;
}

function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function dateStamp(): string {
    return new Date().toISOString().split('T')[0];
}
