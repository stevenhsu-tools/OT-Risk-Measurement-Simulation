import { useRiskProfile } from '@/context/RiskProfileContext';
import { DataTableEditor, ColumnSpec } from './DataTableEditor';
import { ThreatControlMap } from '@/lib/types';

export function ThreatControlMapEditor() {
    const { profile, updateTable, resetTable } = useRiskProfile();

    const columns: ColumnSpec<ThreatControlMap>[] = [
        {
            key: 'ThreatID', label: 'Threat', type: 'select', required: true,
            options: () => profile.threats.map(t => ({ value: t.ID, label: `${t.ID}: ${t.Name}` })),
            format: (val) => {
                const t = profile.threats.find(t => t.ID === val);
                return t ? `${t.ID}: ${t.Name}` : val || '-';
            },
        },
        {
            key: 'ControlID', label: 'Control', type: 'select', required: true,
            options: () => profile.controls.map(c => ({ value: c.ID, label: `${c.ID}: ${c.Name}` })),
            format: (val) => {
                const c = profile.controls.find(c => c.ID === val);
                return c ? `${c.ID}: ${c.Name}` : val || '-';
            },
        },
        {
            key: 'EffectOn', label: 'Effect On', type: 'select', required: true,
            readOnly: true,
            computeValue: () => 'TEF' as const,
            options: () => [{ value: 'TEF', label: 'TEF' }],
            helpText: 'This version supports TEF-side controls only; Loss-side effects are disabled.',
        },
        {
            key: 'ReductionMostLikely', label: 'Reduction (Most Likely)', type: 'percent', required: true,
            readOnly: true,
            computeValue: (row) => {
                const control = profile.controls.find(c => c.ID === row.ControlID);
                return control?.ReductionMostLikely ?? row.ReductionMostLikely ?? 0;
            },
            helpText: "Comes directly from the selected Control's Reduction Most Likely value.",
        },
        { key: 'ControlEnabled', label: 'Enabled', type: 'boolean', hideInTable: true, readOnly: true, helpText: 'Program-controlled — not user-editable.' },
        { key: 'Justification', label: 'Justification', type: 'textarea', hideInTable: true },
    ];

    return (
        <DataTableEditor
            title="Threat–Control Map"
            description={
                <>
                    <p>
                        The <strong>Threat–Control Map</strong> defines which Controls are applicable to which Threats — this
                        is what lets the app recommend Controls when you select a Scenario, and what drives the TEF reduction
                        calculation. Each row links one Threat to one Control.
                    </p>
                    <p>
                        Every Threat and Control referenced here must already exist. <strong>Reduction (Most Likely)</strong> is
                        always taken from the linked Control and cannot be edited here directly — update it on the{' '}
                        <strong>Controls</strong> page instead. This version supports TEF-side effects only.
                    </p>
                </>
            }
            columns={columns}
            rows={profile.threatControlMap}
            onChange={(rows) => updateTable('threatControlMap', rows)}
            onResetToDefault={() => resetTable('threatControlMap')}
            idKey={(row) => `${row.ThreatID}::${row.ControlID}`}
            newRow={() => ({
                ThreatID: '',
                ControlID: '',
                EffectOn: 'TEF' as const,
                ReductionMostLikely: 0,
                ControlEnabled: true,
            })}
            searchFields={['ThreatID', 'ControlID', 'Justification']}
        />
    );
}
