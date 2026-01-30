import { useMemo, useState } from 'react';
import { Search, CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectionItem {
    id: string;
    name: string; // Used as label
    description?: string;
    [key: string]: any;
}

interface SelectionListProps {
    title: string;
    items: SelectionItem[];
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
    relatedIds?: string[]; // IDs that are recommended/related based on other selections
    className?: string;
    footer?: React.ReactNode;
}

export function SelectionList({
    title,
    items,
    selectedIds,
    onSelectionChange,
    relatedIds = [],
    className,
    footer
}: SelectionListProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [items, searchTerm]);

    const allSelected = filteredItems.length > 0 && filteredItems.every(item => selectedIds.includes(item.id));
    const someSelected = filteredItems.some(item => selectedIds.includes(item.id));

    const handleSelectAll = () => {
        if (allSelected) {
            // Deselect all visible
            const visibleIds = filteredItems.map(i => i.id);
            onSelectionChange(selectedIds.filter(id => !visibleIds.includes(id)));
        } else {
            // Select all visible
            const visibleIds = filteredItems.map(i => i.id);
            const newSelection = Array.from(new Set([...selectedIds, ...visibleIds]));
            onSelectionChange(newSelection);
        }
    };

    const handleToggle = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange(selectedIds.filter(prevId => prevId !== id));
        } else {
            onSelectionChange([...selectedIds, id]);
        }
    };

    return (
        <div className={cn("bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-[500px]", className)}>
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {selectedIds.length} Selected
                    </span>
                </div>

                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleSelectAll}
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        {allSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                            <Square className={cn("w-4 h-4", someSelected ? "text-blue-400 fill-blue-400" : "text-gray-300")} />
                        )}
                        <span>Select All</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">No items found</div>
                ) : (
                    filteredItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => handleToggle(item.id)}
                            className={cn(
                                "group flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors text-sm border-l-4",
                                selectedIds.includes(item.id)
                                    ? "bg-blue-50/50 hover:bg-blue-50 border-transparent"
                                    : relatedIds.includes(item.id)
                                        ? "bg-orange-50 hover:bg-orange-100 border-orange-400" // Highlight recommended
                                        : "hover:bg-gray-50 border-transparent"
                            )}
                        >
                            <div className="mt-0.5 flex-shrink-0">
                                {selectedIds.includes(item.id) ? (
                                    <CheckSquare className="w-4 h-4 text-blue-600" />
                                ) : (
                                    <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={cn("font-medium text-wrap break-words", selectedIds.includes(item.id) ? "text-gray-900" : "text-gray-700")}>
                                    {item.name}
                                    {relatedIds.includes(item.id) && !selectedIds.includes(item.id) && (
                                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                            Recommended
                                        </span>
                                    )}
                                </p>
                                {item.description && (
                                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Footer Area */}
            {footer && (
                <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                    {footer}
                </div>
            )}
        </div>
    );
}
