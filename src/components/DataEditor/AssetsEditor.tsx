import { useRiskProfile } from '@/context/RiskProfileContext';
import { DataTableEditor, ColumnSpec } from './DataTableEditor';
import { Asset } from '@/lib/types';
import { nextSequentialId } from '@/lib/idGenerator';

const PURDUE_LEVELS = ['L0', 'L0/L1', 'L1', 'L1/L2', 'L2', 'L2/L3', 'L3', 'L3.5', 'L4', 'L5'];
const PRIMARY_FUNCTIONS = [
    'Connectivity', 'Control', 'Data Collection', 'Engineering', 'Measurement',
    'Monitoring', 'Remote access', 'Safety', 'Others',
];

const computeBaseLoss = (row: Partial<Asset>) =>
    (row.DowntimeCostPerHour || 0) * (row.MaxOutageHours || 0);

const columns: ColumnSpec<Asset>[] = [
    { key: 'ID', label: 'ID', type: 'text', required: true, widthClassName: 'w-20 min-w-[5rem]' },
    { key: 'Name', label: 'Name', type: 'text', required: true },
    {
        key: 'PurdueLevel', label: 'Purdue Level', type: 'select-other',
        options: () => PURDUE_LEVELS.map(v => ({ value: v, label: v })),
        helpText: 'Existing values outside this list (e.g. a combined level) are preserved as "Others".',
    },
    {
        key: 'PrimaryFunction', label: 'Primary Function', type: 'select-other',
        options: () => PRIMARY_FUNCTIONS.filter(f => f !== 'Others').map(v => ({ value: v, label: v })),
    },
    { key: 'DowntimeCostPerHour', label: 'Downtime Cost/Hr (USD)', type: 'number', required: true },
    { key: 'MaxOutageHours', label: 'Max Outage Hours', type: 'number', required: true },
    {
        key: 'BaseLoss',
        label: 'Base Loss (USD)',
        type: 'number',
        readOnly: true,
        computeValue: computeBaseLoss,
        helpText: 'Auto-calculated as Downtime Cost/Hr × Max Outage Hours.',
        format: (val) => (typeof val === 'number' ? `$${val.toLocaleString()}` : '-'),
    },
    {
        key: 'SafetyImpact', label: 'Safety Impact?', type: 'select',
        options: () => [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
    },
    { key: 'AssumptionBasis', label: 'Assumption Basis', type: 'textarea', hideInTable: true },
];

export function AssetsEditor() {
    const { profile, updateTable, resetTable } = useRiskProfile();

    const impactMessage = (asset: Asset, action: 'update' | 'delete'): string | null => {
        const count = profile.scenarios.filter(s => s.AssetID === asset.ID).length;
        if (count === 0) return null;
        const verb = action === 'delete' ? 'Deleting' : 'Updating';
        return `${verb} Asset ${asset.ID} will also affect ${count} Scenario${count > 1 ? 's' : ''} that reference it (their Base Loss inputs depend on this Asset). Continue?`;
    };

    const handleChange = (rows: Asset[]) => {
        // Always recompute BaseLoss from DowntimeCostPerHour x MaxOutageHours on save
        const recomputed = rows.map(a => ({ ...a, BaseLoss: computeBaseLoss(a) }));
        updateTable('assets', recomputed);
    };

    return (
        <DataTableEditor
            title="Assets"
            description={
                <>
                    <p>
                        <strong>Assets</strong> are the OT equipment, systems, or zones being protected (e.g. HMIs, PLCs,
                        engineering workstations, historian servers). Each Scenario links one Asset to one Threat, so every
                        Asset referenced by a Scenario must have at least a <strong>Downtime Cost/Hr</strong> and{' '}
                        <strong>Max Outage Hours</strong> filled in.
                    </p>
                    <p>
                        <strong>Base Loss (USD)</strong> is the key value used by the risk calculation — it is always
                        auto-calculated as <em>Downtime Cost/Hr × Max Outage Hours</em>, and the Scenario's Min/Most Likely/Max
                        loss-per-event figures are derived from it (0.5×, 1×, 2× Base Loss). You cannot type into Base Loss
                        directly; update the two input fields instead and it will recalculate automatically.
                    </p>
                </>
            }
            columns={columns}
            rows={profile.assets}
            onChange={handleChange}
            onResetToDefault={() => resetTable('assets')}
            idKey={(row) => row.ID}
            newRow={() => ({
                ID: nextSequentialId(profile.assets.map(a => a.ID), 'A'),
                Name: '',
                DowntimeCostPerHour: 0,
                MaxOutageHours: 0,
            })}
            getImpact={impactMessage}
            searchFields={['ID', 'Name']}
        />
    );
}
