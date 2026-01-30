import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileSpreadsheet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseRiskProfile } from '@/lib/excel';
import { RiskProfile } from '@/lib/types';

interface FileUploadProps {
    onDataLoaded: (data: RiskProfile) => void;
    className?: string;
    onError?: (error: string) => void;
}

export function FileUpload({ onDataLoaded, className, onError }: FileUploadProps) {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Clear previous errors
        onError?.('');

        try {
            const data = await parseRiskProfile(file);
            onDataLoaded(data);
        } catch (err: any) {
            console.error(err);
            onError?.(err.message || "Failed to parse Excel file");
        }
    }, [onDataLoaded, onError]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ease-in-out",
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
                className
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-3">
                <FileSpreadsheet className={cn("w-12 h-12", isDragActive ? "text-blue-500" : "text-gray-400")} />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                        {isDragActive ? "Drop the file here" : "Upload Risk Assessment Profile"}
                    </p>
                    <p className="text-xs text-gray-500">
                        Drag and drop an Excel file, or click to browse
                    </p>
                </div>
            </div>
        </div>
    );
}
