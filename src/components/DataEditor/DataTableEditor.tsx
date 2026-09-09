import { useState, useMemo, ReactNode } from 'react';
import { Plus, Pencil, Trash2, RotateCcw, Search, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Modal } from './Modal';

export type ColumnType = 'text' | 'number' | 'percent' | 'boolean' | 'select' | 'multiselect' | 'textarea' | 'select-other';

export interface ColumnSpec<T> {
    key: keyof T;
    label: string;
    type: ColumnType;
    required?: boolean;
    hideInTable?: boolean; // still editable in the modal, but not shown as a table column (e.g. long text)
    options?: () => { value: string; label: string }[];
    validate?: (value: any, row: Partial<T>, allRows: T[]) => string | null;
    format?: (value: any) => string; // display formatting for the table cell
    readOnly?: boolean; // shown but not editable in the modal (e.g. computed/derived fields, program-controlled flags)
    computeValue?: (row: Partial<T>) => any; // if set, this field's value is always derived from other fields on save
    sortable?: boolean; // defaults to true
    helpText?: string; // short note shown under the field label in the modal
    widthClassName?: string; // overrides the default table-cell width (e.g. a narrow ID column)
}

interface DataTableEditorProps<T> {
    title: string;
    description?: ReactNode; // explanatory block rendered above the search bar
    columns: ColumnSpec<T>[];
    rows: T[];
    onChange: (rows: T[]) => void;
    onResetToDefault: () => void;
    idKey: (row: T) => string;
    newRow: () => Partial<T>;
    // Returns a human-readable impact message (e.g. "3 Scenarios reference this Asset") to confirm before
    // applying a delete or an update to an existing row. Returns null/undefined if there's no impact to flag.
    getImpact?: (row: T, action: 'update' | 'delete') => string | null | undefined;
    searchFields?: (keyof T)[];
    extraActions?: ReactNode; // additional buttons rendered in the header toolbar (e.g. a PDF download link)
}

type SortDir = 'asc' | 'desc' | null;

// A <select> with a fixed option list plus a free-text "Others" fallback — used for fields where
// the canonical list is fixed but existing/legacy data may hold a value outside it (that value must
// never be silently dropped).
function SelectOtherField({
    value,
    options,
    onChange,
}: {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}) {
    const matchesOption = options.some(o => o.value === value);
    const [otherMode, setOtherMode] = useState(value !== '' && !matchesOption);

    return (
        <div className="space-y-2">
            <select
                value={otherMode ? '__other__' : value}
                onChange={e => {
                    if (e.target.value === '__other__') {
                        setOtherMode(true);
                        onChange('');
                    } else {
                        setOtherMode(false);
                        onChange(e.target.value);
                    }
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs"
            >
                <option value="">-- Select --</option>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
                <option value="__other__">Others (specify)</option>
            </select>
            {otherMode && (
                <input
                    type="text"
                    placeholder="Please specify"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs"
                />
            )}
        </div>
    );
}

export function DataTableEditor<T extends Record<string, any>>({
    title,
    description,
    columns,
    rows,
    onChange,
    onResetToDefault,
    idKey,
    newRow,
    getImpact,
    searchFields,
    extraActions,
}: DataTableEditorProps<T>) {
    const [search, setSearch] = useState('');
    const [editingRow, setEditingRow] = useState<Partial<T> | null>(null);
    const [isNew, setIsNew] = useState(false);
    // The exact row object being edited (not a copy) — used so save/delete/toggle operations target
    // that one specific row by reference rather than by idKey, which can collide if duplicate IDs
    // ever exist (e.g. legacy/imported data) and must never be trusted to identify a single row.
    const [editingOriginalRow, setEditingOriginalRow] = useState<T | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [duplicateError, setDuplicateError] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>(null);
    const [pendingConfirm, setPendingConfirm] = useState<{ message: string; onConfirm: () => void } | null>(null);

    const filteredRows = useMemo(() => {
        if (!search.trim()) return rows;
        const q = search.toLowerCase();
        const fields = searchFields || columns.map(c => c.key);
        return rows.filter(row =>
            fields.some(f => String(row[f] ?? '').toLowerCase().includes(q))
        );
    }, [rows, search, searchFields, columns]);

    const sortedRows = useMemo(() => {
        if (!sortKey || !sortDir) return filteredRows;
        const copy = [...filteredRows];
        copy.sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            let cmp: number;
            if (typeof av === 'number' && typeof bv === 'number') {
                cmp = av - bv;
            } else if (typeof av === 'boolean' && typeof bv === 'boolean') {
                cmp = (av === bv) ? 0 : av ? 1 : -1;
            } else {
                cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true, sensitivity: 'base' });
            }
            return sortDir === 'asc' ? cmp : -cmp;
        });
        return copy;
    }, [filteredRows, sortKey, sortDir]);

    const tableColumns = columns.filter(c => !c.hideInTable);

    const handleSort = (col: ColumnSpec<T>) => {
        if (col.sortable === false) return;
        if (sortKey !== col.key) {
            setSortKey(col.key);
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            setSortDir('desc');
        } else if (sortDir === 'desc') {
            setSortKey(null);
            setSortDir(null);
        } else {
            setSortDir('asc');
        }
    };

    const openAdd = () => {
        setEditingRow(newRow());
        setIsNew(true);
        setEditingOriginalRow(null);
        setErrors({});
        setDuplicateError(null);
    };

    const openEdit = (row: T) => {
        setEditingRow({ ...row });
        setIsNew(false);
        setEditingOriginalRow(row);
        setErrors({});
        setDuplicateError(null);
    };

    const closeModal = () => {
        setEditingRow(null);
        setEditingOriginalRow(null);
        setErrors({});
        setDuplicateError(null);
    };

    const handleFieldChange = (key: keyof T, value: any) => {
        setDuplicateError(null);
        setEditingRow(prev => {
            if (!prev) return prev;
            let next: Partial<T> = { ...prev, [key]: value };
            // Re-derive any computed columns that depend on the field that just changed
            columns.forEach(col => {
                if (col.computeValue) {
                    next = { ...next, [col.key]: col.computeValue(next) };
                }
            });
            return next;
        });
    };

    const validateAll = (row: Partial<T>): Record<string, string> => {
        const errs: Record<string, string> = {};
        columns.forEach(col => {
            const val = row[col.key];
            if (col.required && (val === undefined || val === null || val === '')) {
                errs[String(col.key)] = `${col.label} is required`;
                return;
            }
            if (col.validate) {
                const msg = col.validate(val, row, rows);
                if (msg) errs[String(col.key)] = msg;
            }
        });
        return errs;
    };

    const commitSave = (row: Partial<T>) => {
        if (isNew) {
            onChange([...rows, row as T]);
        } else {
            // Match by the exact original row reference, not by idKey — never trust idKey to
            // identify a single row, since duplicate IDs must be rejected but could already exist
            // in imported/legacy data.
            onChange(rows.map(r => (r === editingOriginalRow ? (row as T) : r)));
        }
        closeModal();
    };

    const handleSave = () => {
        if (!editingRow) return;
        // Recompute all derived fields one final time before validating/saving
        let finalRow: Partial<T> = { ...editingRow };
        columns.forEach(col => {
            if (col.computeValue) {
                finalRow = { ...finalRow, [col.key]: col.computeValue(finalRow) };
            }
        });

        const errs = validateAll(finalRow);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            setDuplicateError(null);
            return;
        }

        // Reject duplicate IDs — compare against every OTHER row (excluding the one being edited).
        const newId = idKey(finalRow as T);
        const isDuplicate = rows.some(r => r !== editingOriginalRow && idKey(r) === newId);
        if (isDuplicate) {
            setDuplicateError(`"${newId}" already exists. Please use a unique ID.`);
            return;
        }
        setDuplicateError(null);

        if (!isNew && getImpact) {
            const impact = getImpact(finalRow as T, 'update');
            if (impact) {
                setPendingConfirm({
                    message: impact,
                    onConfirm: () => { setPendingConfirm(null); commitSave(finalRow); },
                });
                return;
            }
        }
        commitSave(finalRow);
    };

    const handleDelete = (row: T) => {
        const impact = getImpact?.(row, 'delete');
        const message = impact || 'Delete this row? This cannot be undone.';
        setPendingConfirm({
            message,
            onConfirm: () => {
                setPendingConfirm(null);
                // Remove by exact object reference, not idKey, so a duplicate-ID row (if one
                // already exists) can't cause both rows to be deleted at once.
                onChange(rows.filter(r => r !== row));
            },
        });
    };

    const handleInlineToggle = (row: T, key: keyof T) => {
        onChange(rows.map(r => (r === row ? { ...r, [key]: !r[key] } : r)));
    };

    const handleReset = () => {
        setPendingConfirm({
            message: `Reset ${title} to default? This will discard your edits to this table.`,
            onConfirm: () => { setPendingConfirm(null); onResetToDefault(); },
        });
    };

    const renderCellValue = (row: T, col: ColumnSpec<T>) => {
        const val = row[col.key];
        if (col.format) return col.format(val);
        if (col.type === 'boolean') return val ? 'Yes' : 'No';
        if (col.type === 'percent') return typeof val === 'number' ? `${(val * 100).toFixed(1)}%` : '-';
        if (col.type === 'multiselect') return Array.isArray(val) ? val.join(', ') : '-';
        if (col.type === 'number' && typeof val === 'number') return val.toLocaleString();
        return val ?? '-';
    };

    const renderField = (col: ColumnSpec<T>) => {
        const val = editingRow?.[col.key];
        const isReadOnly = Boolean(col.readOnly || col.computeValue);

        if (col.type === 'boolean') {
            return (
                <label className="flex items-center space-x-2 text-xs">
                    <input
                        type="checkbox"
                        checked={Boolean(val)}
                        disabled={isReadOnly}
                        onChange={e => handleFieldChange(col.key, e.target.checked)}
                        className="rounded border-gray-300 disabled:opacity-60"
                    />
                    <span className={isReadOnly ? 'text-gray-400' : ''}>{col.label}</span>
                </label>
            );
        }

        if (col.type === 'select') {
            const opts = col.options?.() || [];
            return (
                <select
                    value={val ?? ''}
                    disabled={isReadOnly}
                    onChange={e => handleFieldChange(col.key, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs disabled:bg-gray-100 disabled:text-gray-500"
                >
                    <option value="">-- Select --</option>
                    {opts.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            );
        }

        if (col.type === 'select-other') {
            const opts = col.options?.() || [];
            return (
                <SelectOtherField
                    value={val ?? ''}
                    options={opts}
                    onChange={(v) => handleFieldChange(col.key, v)}
                />
            );
        }

        if (col.type === 'multiselect') {
            const opts = col.options?.() || [];
            const selected: string[] = Array.isArray(val) ? val : [];
            return (
                <div className="border border-gray-300 rounded px-3 py-2 text-xs max-h-32 overflow-y-auto space-y-1">
                    {opts.map(o => (
                        <label key={o.value} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selected.includes(o.value)}
                                onChange={e => {
                                    const next = e.target.checked
                                        ? [...selected, o.value]
                                        : selected.filter(v => v !== o.value);
                                    handleFieldChange(col.key, next);
                                }}
                                className="rounded border-gray-300"
                            />
                            <span>{o.label}</span>
                        </label>
                    ))}
                </div>
            );
        }

        if (col.type === 'textarea') {
            return (
                <textarea
                    value={val ?? ''}
                    disabled={isReadOnly}
                    onChange={e => handleFieldChange(col.key, e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs disabled:bg-gray-100 disabled:text-gray-500"
                />
            );
        }

        if (col.type === 'percent') {
            // Stored/validated as a 0-1 decimal fraction throughout the app, but shown and entered
            // here as a whole-number percentage (e.g. 24, not 0.24) to avoid confusing users.
            const displayVal = typeof val === 'number' ? Math.round(val * 100 * 100) / 100 : '';
            return (
                <div className="relative">
                    <input
                        type="number"
                        step="0.1"
                        value={displayVal}
                        disabled={isReadOnly}
                        onChange={e => handleFieldChange(col.key, e.target.value === '' ? '' : parseFloat(e.target.value) / 100)}
                        className="w-full border border-gray-300 rounded pl-3 pr-7 py-2 text-xs disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
            );
        }

        if (col.type === 'number') {
            return (
                <input
                    type="number"
                    step="any"
                    value={val ?? ''}
                    disabled={isReadOnly}
                    onChange={e => handleFieldChange(col.key, e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs disabled:bg-gray-100 disabled:text-gray-500"
                />
            );
        }

        return (
            <input
                type="text"
                value={val ?? ''}
                disabled={isReadOnly}
                onChange={e => handleFieldChange(col.key, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs disabled:bg-gray-100 disabled:text-gray-500"
            />
        );
    };

    const sortIcon = (col: ColumnSpec<T>) => {
        if (col.sortable === false) return null;
        if (sortKey !== col.key) return <ArrowUpDown className="w-3 h-3 text-gray-300" />;
        if (sortDir === 'asc') return <ArrowUp className="w-3 h-3 text-gray-600" />;
        if (sortDir === 'desc') return <ArrowDown className="w-3 h-3 text-gray-600" />;
        return <ArrowUpDown className="w-3 h-3 text-gray-300" />;
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">{title} ({rows.length})</h2>
                <div className="flex items-center space-x-2">
                    {extraActions}
                    <button
                        onClick={handleReset}
                        className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Default</span>
                    </button>
                    <button
                        onClick={openAdd}
                        className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                    </button>
                </div>
            </div>

            {description && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 leading-relaxed space-y-2">
                    {description}
                </div>
            )}

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                    type="text"
                    placeholder={`Search ${title.toLowerCase()}...`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-xs"
                />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <thead>
                        <tr>
                            {tableColumns.map(col => (
                                <th
                                    key={String(col.key)}
                                    onClick={() => handleSort(col)}
                                    className={`px-3 py-2 text-left bg-gray-50 font-medium text-gray-600 whitespace-nowrap ${col.sortable === false ? '' : 'cursor-pointer select-none hover:bg-gray-100'}`}
                                >
                                    <span className="inline-flex items-center gap-1">
                                        {col.label}
                                        {sortIcon(col)}
                                    </span>
                                </th>
                            ))}
                            <th className="px-3 py-2 text-right bg-gray-50 w-20">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedRows.map((row, i) => (
                            <tr key={`${idKey(row)}-${i}`} className="hover:bg-gray-50 align-top">
                                {tableColumns.map(col => (
                                    <td key={String(col.key)} className={`px-3 py-2 whitespace-normal break-words ${col.widthClassName || 'min-w-[8rem] max-w-md'}`}>
                                        {col.type === 'boolean' ? (
                                            <input
                                                type="checkbox"
                                                checked={Boolean(row[col.key])}
                                                onChange={() => handleInlineToggle(row, col.key)}
                                                className="rounded border-gray-300"
                                            />
                                        ) : (
                                            renderCellValue(row, col)
                                        )}
                                    </td>
                                ))}
                                <td className="px-3 py-2 text-right whitespace-nowrap">
                                    <button onClick={() => openEdit(row)} className="text-gray-400 hover:text-blue-600 mr-2">
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => handleDelete(row)} className="text-gray-400 hover:text-red-600">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {sortedRows.length === 0 && (
                            <tr>
                                <td colSpan={tableColumns.length + 1} className="px-3 py-8 text-center text-gray-400">
                                    No rows found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {editingRow && (
                <Modal
                    title={isNew ? `Add ${title.replace(/s$/, '')}` : `Edit ${title.replace(/s$/, '')}`}
                    onClose={closeModal}
                    footer={
                        <>
                            <button onClick={closeModal} className="px-4 py-2 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                                Save
                            </button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        {duplicateError && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200 text-xs">
                                {duplicateError}
                            </div>
                        )}
                        {columns.map(col => (
                            <div key={String(col.key)}>
                                {col.type !== 'boolean' && (
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        {col.label}{col.required && <span className="text-red-500"> *</span>}
                                        {(col.readOnly || col.computeValue) && <span className="text-gray-400 font-normal"> (auto-calculated)</span>}
                                    </label>
                                )}
                                {col.helpText && (
                                    <p className="text-[11px] text-gray-500 mb-1">{col.helpText}</p>
                                )}
                                {renderField(col)}
                                {errors[String(col.key)] && (
                                    <p className="text-[11px] text-red-600 mt-1">{errors[String(col.key)]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </Modal>
            )}

            {pendingConfirm && (
                <Modal
                    title="Please Confirm"
                    onClose={() => setPendingConfirm(null)}
                    footer={
                        <>
                            <button onClick={() => setPendingConfirm(null)} className="px-4 py-2 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                                Cancel
                            </button>
                            <button onClick={pendingConfirm.onConfirm} className="px-4 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                                Confirm
                            </button>
                        </>
                    }
                >
                    <p className="text-xs text-gray-700 whitespace-pre-line">{pendingConfirm.message}</p>
                </Modal>
            )}
        </div>
    );
}
