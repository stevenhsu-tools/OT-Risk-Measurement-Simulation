import { useState } from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';
import { useRiskProfile } from '@/context/RiskProfileContext';
import { FileUpload } from '@/components/Input/FileUpload';
import { exportDatasetJSON, importDatasetJSON, exportDatasetExcel, importDatasetExcel } from '@/lib/datasetIO';

export function ImportExportPanel() {
    const { profile, replaceProfile, resetAll } = useRiskProfile();
    const [importMode, setImportMode] = useState<'excel' | 'json' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleResetAll = () => {
        if (!confirm('Reset the ENTIRE dataset (Assets, Threats, Controls, Threat-Control Map, Scenarios) to defaults? All your customizations will be lost. This cannot be undone.')) return;
        resetAll();
    };

    return (
        <div className="bg-white p-5 rounded-lg border border-gray-200 space-y-4 text-xs">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => exportDatasetJSON(profile)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                >
                    <Download className="w-4 h-4" /> <span>Export JSON</span>
                </button>
                <button
                    onClick={() => exportDatasetExcel(profile)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                >
                    <Download className="w-4 h-4" /> <span>Export Excel</span>
                </button>
                <button
                    onClick={() => setImportMode(importMode === 'json' ? null : 'json')}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                >
                    <Upload className="w-4 h-4" /> <span>Import JSON</span>
                </button>
                <button
                    onClick={() => setImportMode(importMode === 'excel' ? null : 'excel')}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                >
                    <Upload className="w-4 h-4" /> <span>Import Excel</span>
                </button>
                <button
                    onClick={handleResetAll}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
                >
                    <RotateCcw className="w-4 h-4" /> <span>Reset Entire Dataset</span>
                </button>
            </div>

            {importMode === 'json' && (
                <FileUpload
                    label="Upload Dataset JSON"
                    accept={{ 'application/json': ['.json'] }}
                    parseFile={importDatasetJSON}
                    onDataLoaded={(data) => { replaceProfile(data); setImportMode(null); }}
                    onError={setError}
                />
            )}
            {importMode === 'excel' && (
                <FileUpload
                    label="Upload Dataset Excel (5 sheets: Assets, Threats, Controls, Scenarios, Threat_Control_Map)"
                    accept={{
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                        'application/vnd.ms-excel': ['.xls'],
                    }}
                    parseFile={importDatasetExcel}
                    onDataLoaded={(data) => { replaceProfile(data); setImportMode(null); }}
                    onError={setError}
                />
            )}
            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200 text-xs">{error}</div>
            )}
        </div>
    );
}
