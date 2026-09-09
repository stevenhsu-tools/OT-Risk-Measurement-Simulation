import { useRiskProfile } from '@/context/RiskProfileContext';
import { DataTableEditor, ColumnSpec } from './DataTableEditor';
import { Threat } from '@/lib/types';
import { nextSequentialId } from '@/lib/idGenerator';
import { lognormalMostLikely } from '@/lib/formulas';

const computeTEFMostLikely = (row: Partial<Threat>) =>
    lognormalMostLikely(row.BaseTEFMin ?? 0, row.BaseTEFMax ?? 0);

const columns: ColumnSpec<Threat>[] = [
    { key: 'ID', label: 'ID', type: 'text', required: true, widthClassName: 'w-20 min-w-[5rem]' },
    { key: 'Name', label: 'Threat Type', type: 'text', required: true },
    {
        key: 'BaseTEFMin', label: 'Base TEF Min (events/yr)', type: 'number', required: true,
        validate: (val, row) => (typeof val === 'number' && typeof row.BaseTEFMax === 'number' && val > row.BaseTEFMax)
            ? 'TEF Min must be less than TEF Max' : null,
    },
    {
        key: 'BaseTEFMostLikely', label: 'Base TEF Most Likely (events/yr)', type: 'number', required: true,
        readOnly: true,
        computeValue: computeTEFMostLikely,
        helpText: 'Auto-calculated from Base TEF Min and Base TEF Max.',
    },
    {
        key: 'BaseTEFMax', label: 'Base TEF Max (events/yr)', type: 'number', required: true,
        validate: (val, row) => (typeof val === 'number' && typeof row.BaseTEFMin === 'number' && val < row.BaseTEFMin)
            ? 'TEF Max must be greater than TEF Min' : null,
    },
    { key: 'AssumptionBasis', label: 'Assumption Basis', type: 'textarea', hideInTable: true },
];

export function ThreatsEditor() {
    const { profile, updateTable, resetTable } = useRiskProfile();

    const impactMessage = (threat: Threat, action: 'update' | 'delete'): string | null => {
        const scenarioCount = profile.scenarios.filter(s => s.ThreatID === threat.ID).length;
        const mapCount = profile.threatControlMap.filter(m => m.ThreatID === threat.ID).length;
        if (scenarioCount === 0 && mapCount === 0) return null;
        const parts = [];
        if (scenarioCount > 0) parts.push(`${scenarioCount} Scenario${scenarioCount > 1 ? 's' : ''}`);
        if (mapCount > 0) parts.push(`${mapCount} Threat-Control Map entr${mapCount > 1 ? 'ies' : 'y'}`);
        const verb = action === 'delete' ? 'Deleting' : 'Updating';
        return `${verb} Threat ${threat.ID} will also affect ${parts.join(' and ')}. Continue?`;
    };

    const handleChange = (rows: Threat[]) => {
        const recomputed = rows.map(t => ({ ...t, BaseTEFMostLikely: computeTEFMostLikely(t) }));
        updateTable('threats', recomputed);
    };

    return (
        <DataTableEditor
            title="Threats"
            description={
                <>
                    <p>
                        <strong>Threats</strong> represent the hazards or attack types that can affect an Asset (e.g. ransomware,
                        insider misuse, USB-borne malware). <strong>TEF</strong> stands for <em>Threat Event Frequency</em> — how
                        often, per year, a given Threat is expected to occur before any controls are applied.
                    </p>
                    <p>
                        Every Threat referenced by a Scenario or a Threat–Control Map entry must have valid{' '}
                        <strong>Base TEF Min</strong> and <strong>Base TEF Max</strong> values (Min must be less than Max).{' '}
                        <strong>Base TEF Most Likely</strong> is always auto-calculated between them and cannot be entered
                        directly — it is the frequency value used as the central estimate in the risk calculation, and is
                        reduced by the selected Controls' combined effectiveness during Calculation and Simulation.
                    </p>
                    <p>
                        <strong>Why not just average Min and Max?</strong> Most Likely is calculated as the <em>mode of a
                        calibrated lognormal distribution</em> — Min and Max are treated as the 5th and 95th percentile bounds
                        (a 90% confidence interval), and the formula solves for that distribution's most probable value. This
                        is the standard approach in quantitative risk analysis (used by Douglas Hubbard's calibrated-estimation
                        method and the FAIR risk model) because event frequencies are typically right-skewed — many
                        occurrences cluster at the low end with a long tail of rare, extreme values — so a plain arithmetic
                        average would overstate the realistic central estimate.
                    </p>
                    <p className="font-mono text-[11px] bg-white/60 border border-blue-200 rounded px-3 py-2 text-blue-900">
                        Base TEF Most Likely (events/yr) = EXP( (ln(Max) + ln(Min)) / 2 − ((ln(Max) − ln(Min)) / 3.29)² )
                    </p>
                </>
            }
            columns={columns}
            rows={profile.threats}
            onChange={handleChange}
            onResetToDefault={() => resetTable('threats')}
            idKey={(row) => row.ID}
            newRow={() => ({
                ID: nextSequentialId(profile.threats.map(t => t.ID), 'T'),
                Name: '',
                BaseTEFMin: 0,
                BaseTEFMostLikely: 0,
                BaseTEFMax: 0,
            })}
            getImpact={impactMessage}
            searchFields={['ID', 'Name']}
        />
    );
}
