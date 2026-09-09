import { useRiskProfile } from '@/context/RiskProfileContext';
import { DataTableEditor, ColumnSpec } from './DataTableEditor';
import { Scenario } from '@/lib/types';
import { nextSequentialId } from '@/lib/idGenerator';

export function ScenariosEditor() {
    const { profile, updateTable, resetTable } = useRiskProfile();

    const assetExists = (id: string) => profile.assets.some(a => a.ID === id);
    const threatExists = (id: string) => profile.threats.some(t => t.ID === id);

    const columns: ColumnSpec<Scenario>[] = [
        { key: 'ID', label: 'ID', type: 'text', required: true, widthClassName: 'w-16 min-w-[4rem]' },
        { key: 'Description', label: 'Description', type: 'textarea', required: true },
        {
            key: 'AssetID', label: 'Asset', type: 'select', required: true,
            options: () => profile.assets.map(a => ({ value: a.ID, label: `${a.ID}: ${a.Name}` })),
            validate: (val) => (val && !assetExists(val)) ? 'Selected Asset no longer exists' : null,
            format: (val) => {
                const a = profile.assets.find(a => a.ID === val);
                return a ? `${a.ID}: ${a.Name}` : val || '-';
            },
        },
        {
            key: 'ThreatID', label: 'Threat', type: 'select', required: true,
            options: () => profile.threats.map(t => ({ value: t.ID, label: `${t.ID}: ${t.Name}` })),
            validate: (val) => (val && !threatExists(val)) ? 'Selected Threat no longer exists' : null,
            format: (val) => {
                const t = profile.threats.find(t => t.ID === val);
                return t ? `${t.ID}: ${t.Name}` : val || '-';
            },
        },
        { key: 'Notes', label: 'Notes', type: 'textarea', hideInTable: true },
    ];

    return (
        <DataTableEditor
            title="Scenarios"
            description={
                <>
                    <p>
                        A <strong>Scenario</strong> is a specific incident: one Asset exposed to one Threat (e.g. "Ransomware
                        on the Historian Server"). Scenarios are the unit of selection everywhere else in the app — on the{' '}
                        <strong>Assessment</strong> page you choose which Scenarios to include, and the risk calculation and
                        Monte Carlo simulation run per selected Scenario.
                    </p>
                    <p>
                        Every Scenario requires a <strong>Description</strong>, a linked <strong>Asset</strong>, and a linked{' '}
                        <strong>Threat</strong> — the Asset supplies the loss magnitude (Base Loss) and the Threat supplies the
                        frequency (TEF); Controls mapped to that Threat then reduce the effective frequency.
                    </p>
                </>
            }
            columns={columns}
            rows={profile.scenarios}
            onChange={(rows) => updateTable('scenarios', rows)}
            onResetToDefault={() => resetTable('scenarios')}
            idKey={(row) => row.ID}
            newRow={() => ({
                ID: nextSequentialId(profile.scenarios.map(s => s.ID), 'S'),
                Description: '',
                AssetID: '',
                ThreatID: '',
            })}
            searchFields={['ID', 'Description']}
        />
    );
}
