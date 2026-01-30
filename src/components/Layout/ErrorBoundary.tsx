import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-red-200">
                        <div className="flex items-center space-x-3 mb-4 text-red-600">
                            <AlertTriangle className="w-8 h-8" />
                            <h1 className="text-xl font-bold">Something went wrong</h1>
                        </div>
                        <p className="text-gray-700 mb-4">
                            The application encountered an error while processing your data.
                        </p>
                        <div className="bg-gray-100 p-4 rounded text-sm font-mono overflow-auto max-h-48 text-gray-800 mb-4">
                            {this.state.error?.message}
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
