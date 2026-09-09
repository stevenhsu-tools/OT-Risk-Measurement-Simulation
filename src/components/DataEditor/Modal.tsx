import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
}

export function Modal({ title, onClose, children, footer }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="px-6 py-4 overflow-y-auto flex-1 text-xs">{children}</div>
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2 flex-shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
