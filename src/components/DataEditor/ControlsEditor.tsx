import { useRiskProfile } from '@/context/RiskProfileContext';
import { DataTableEditor, ColumnSpec } from './DataTableEditor';
import { Control } from '@/lib/types';
import { CONTROL_HANDBOOK } from '@/data/controlHandbook';
import { lognormalMostLikely } from '@/lib/formulas';
import { Download } from 'lucide-react';

const HANDBOOK_PDF_URL = 'https://1drv.ms/b/c/389cdef109ba7f67/IQCEPAaoYTFtSrL5GgG6fFJaAQbr57GgeKpnif4qqXudC9s';

const HANDBOOK_BY_ID = new Map(CONTROL_HANDBOOK.map(h => [h.ID, h]));

function useAllKnownSolutions(controls: Control[]): string[] {
    const set = new Set<string>();
    controls.forEach(c => (c.TXOneSolutions || []).forEach(s => set.add(s)));
    return Array.from(set).sort();
}

const computeReductionMostLikely = (row: Partial<Control>) =>
    lognormalMostLikely(row.ReductionMin ?? 0, row.ReductionMax ?? 0);

const HandbookDownloadButton = () => (
    <a
        href={HANDBOOK_PDF_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 px-3 py-1.5 text-xs text-blue-700 border border-blue-200 bg-blue-50 rounded hover:bg-blue-100"
    >
        <Download className="w-3.5 h-3.5" />
        <span>OT Cybersecurity Controls Handbook (PDF)</span>
    </a>
);

export function ControlsEditor() {
    const { profile, updateTable, resetTable } = useRiskProfile();
    const allSolutions = useAllKnownSolutions(profile.controls).filter(s => s !== 'EdgeIPS Pro');

    const columns: ColumnSpec<Control>[] = [
        {
            key: 'ID', label: 'ID', type: 'select', required: true, widthClassName: 'w-28 min-w-[7rem]',
            options: () => CONTROL_HANDBOOK.map(h => ({ value: h.ID, label: `${h.ID}: ${h.Name}` })),
            helpText: 'Control IDs come from the OT Cybersecurity Controls Handbook — select one below. Name and Category are filled in automatically and cannot be edited.',
            validate: (val) => (val && !HANDBOOK_BY_ID.has(val)) ? 'Control ID must come from the Handbook' : null,
        },
        {
            key: 'Name', label: 'Name', type: 'text', required: true,
            readOnly: true,
            computeValue: (row) => HANDBOOK_BY_ID.get(row.ID || '')?.Name ?? row.Name ?? '',
            helpText: 'Auto-filled from the Handbook based on the selected Control ID.',
        },
        {
            key: 'Category', label: 'Category', type: 'text', required: true,
            readOnly: true,
            computeValue: (row) => HANDBOOK_BY_ID.get(row.ID || '')?.Category ?? row.Category ?? '',
            helpText: 'Auto-filled from the Handbook based on the selected Control ID.',
        },
        {
            key: 'ReductionMin', label: 'Reduction Min (%)', type: 'percent', required: true,
            validate: (val, row) => {
                if (typeof val !== 'number' || val < 0 || val > 1) return 'Must be between 0% and 100%';
                if (typeof row.ReductionMax === 'number' && val > row.ReductionMax) return 'Reduction Min must be less than Reduction Max';
                return null;
            },
        },
        {
            key: 'ReductionMostLikely', label: 'Reduction Most Likely (%)', type: 'percent', required: true,
            readOnly: true,
            computeValue: computeReductionMostLikely,
            helpText: 'Auto-calculated from Reduction Min and Reduction Max.',
        },
        {
            key: 'ReductionMax', label: 'Reduction Max (%)', type: 'percent', required: true,
            validate: (val, row) => {
                if (typeof val !== 'number' || val < 0 || val > 1) return 'Must be between 0% and 100%';
                if (typeof row.ReductionMin === 'number' && val < row.ReductionMin) return 'Reduction Max must be greater than Reduction Min';
                return null;
            },
        },
        { key: 'Enabled', label: 'Enabled', type: 'boolean', hideInTable: true, readOnly: true, helpText: 'Program-controlled — not user-editable.' },
        {
            key: 'TXOneSolutions',
            label: 'TXOne Solution(s)',
            type: 'multiselect',
            options: () => allSolutions.map(s => ({ value: s, label: s })),
            format: (val) => (Array.isArray(val) ? val.join(', ') : '-'),
        },
        { key: 'EvidenceSourceIds', label: 'Evidence Source IDs', type: 'text', hideInTable: true },
    ];

    const impactMessage = (control: Control, action: 'update' | 'delete'): string | null => {
        const count = profile.threatControlMap.filter(m => m.ControlID === control.ID).length;
        if (count === 0) return null;
        const verb = action === 'delete' ? 'Deleting' : 'Updating';
        return `${verb} Control ${control.ID} will also affect ${count} Threat-Control Map entr${count > 1 ? 'ies' : 'y'} that reference it. Continue?`;
    };

    const handleChange = (rows: Control[]) => {
        // Auto-fill Name/Category from the Handbook when ID matches, keep ReductionMostLikely
        // derived, and de-duplicate the merged "EdgeIPS Pro" -> "EdgeIPS" solution name.
        const normalized = rows.map(c => {
            const handbookEntry = HANDBOOK_BY_ID.get(c.ID);
            const solutions = Array.from(new Set(
                (c.TXOneSolutions || []).map(s => (s === 'EdgeIPS Pro' ? 'EdgeIPS' : s))
            ));
            return {
                ...c,
                Name: handbookEntry?.Name || c.Name,
                Category: handbookEntry?.Category || c.Category,
                ReductionMostLikely: computeReductionMostLikely(c),
                TXOneSolutions: solutions,
            };
        });
        updateTable('controls', normalized);
    };

    return (
        <DataTableEditor
            title="Controls"
            extraActions={<HandbookDownloadButton />}
            description={
                <>
                    <p>
                        <strong>Controls</strong> are the security measures (people, process, or technology) that reduce the
                        frequency of a Threat occurring. Each Control's <strong>Reduction</strong> values (Min/Most
                        Likely/Max, shown as a %) describe how much it lowers a Threat's TEF when applied — this is Risk
                        Reduction.
                    </p>
                    <p>
                        <strong>Control ID</strong> is selected from the <em>OT Cybersecurity Controls Handbook</em> (download
                        button above); <strong>Name</strong> and <strong>Category</strong> are then filled in automatically
                        and cannot be edited directly. <strong>Reduction Most Likely</strong> is always auto-calculated from
                        Reduction Min and Reduction Max and cannot be entered directly either; it is the value used as the
                        central estimate in the Calculation and Simulation steps.
                    </p>
                    <p>
                        <strong>Why not just average Min and Max?</strong> Reduction Most Likely is calculated as the{' '}
                        <em>mode of a calibrated lognormal distribution</em> — Min and Max are treated as the 5th and 95th
                        percentile bounds (a 90% confidence interval), and the formula solves for that distribution's most
                        probable value. This is the standard approach in quantitative risk analysis (used by Douglas Hubbard's
                        calibrated-estimation method and the FAIR risk model) because control effectiveness estimates are
                        typically right-skewed, so a plain arithmetic average would overstate the realistic central estimate.
                    </p>
                    <p className="font-mono text-[11px] bg-white/60 border border-blue-200 rounded px-3 py-2 text-blue-900">
                        Reduction Most Likely (%) = EXP( (ln(Max) + ln(Min)) / 2 − ((ln(Max) − ln(Min)) / 3.29)² )
                    </p>
                </>
            }
            columns={columns}
            rows={profile.controls}
            onChange={handleChange}
            onResetToDefault={() => resetTable('controls')}
            idKey={(row) => row.ID}
            newRow={() => ({
                ID: '',
                Name: '',
                ReductionMin: 0,
                ReductionMostLikely: 0,
                ReductionMax: 0,
                Enabled: true,
                TXOneSolutions: [],
            })}
            getImpact={impactMessage}
            searchFields={['ID', 'Name', 'Category']}
        />
    );
}
