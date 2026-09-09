import { ImportExportPanel } from '@/components/Dashboard/ImportExportPanel';
import { RiskDataOverview } from '@/components/Dashboard/RiskDataOverview';

export function ImportExportView() {
    return (
        <div className="space-y-6 text-xs">
            <div>
                <h2 className="text-base font-bold text-gray-900">Import / Export Dataset</h2>
                <p className="text-gray-500 mt-1">
                    Share your customized Assets, Threats, Controls, Threat–Control Map, and Scenarios with other users or
                    companies, or restore the built-in v5.2.2 defaults. Export as JSON (recommended for round-tripping between
                    this app) or Excel (for interoperability with the reference spreadsheet).
                </p>
            </div>
            <RiskDataOverview />
            <ImportExportPanel />
        </div>
    );
}
