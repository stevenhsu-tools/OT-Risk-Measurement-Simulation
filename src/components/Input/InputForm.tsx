import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFormProps {
    companyName: string;
    setCompanyName: (value: string) => void;
    assessorName: string;
    setAssessorName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    logo: string | null;
    setLogo: (value: string | null) => void;
    date: string;
    setDate: (value: string) => void;
}

export function InputForm({
    companyName,
    setCompanyName,
    assessorName,
    setAssessorName,
    email,
    setEmail,
    logo,
    setLogo,
    date,
    setDate
}: InputFormProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogo(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [setLogo]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Assessment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter company name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assessor Name</label>
                        <input
                            type="text"
                            value={assessorName}
                            onChange={(e) => setAssessorName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter assessor name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer transition-colors min-h-[100px]",
                                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
                            )}
                        >
                            <input {...getInputProps()} />
                            {logo ? (
                                <div className="relative w-full h-32 flex items-center justify-center">
                                    <img src={logo} alt="Company Logo" className="max-h-full max-w-full object-contain" />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLogo(null);
                                        }}
                                        className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50"
                                    >
                                        <span className="sr-only">Remove</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    <Camera className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-xs">Drag logo here or click to upload</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
