import { Info, AlertTriangle, Mail } from 'lucide-react';

export function AboutView() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Info className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">About OT Risk Measurement</h1>
                        <p className="text-gray-500">Operational Technology Risk Simulation & Assessment Tool</p>
                    </div>
                </div>

                <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Application Purpose</h2>
                        <p>
                            This application is designed to help organizations measure and visualize Operational Technology (OT) risks using
                            advanced Monte Carlo simulations. By analyzing threats, assets, and controls, it calculates potential annual losses
                            and generates actionable insights to prioritize risk mitigation strategies.
                        </p>
                    </section>

                    <section className="bg-amber-50 p-6 rounded-md border border-amber-200">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-semibold text-amber-800 mb-2">Requirement: Valid Risk Profile</h2>
                                <p className="text-amber-700">
                                    To run this simulation effectively, you must upload a correctly formatted <strong>Risk Assessment Profile</strong> (Excel file).
                                    This profile contains the necessary definitions for Assets, Threats, Controls, and Scenarios.
                                </p>
                                <p className="mt-4 text-amber-800 font-medium">
                                    If you do not have the profile file or need assistance creating one, please contact TXOne Networks.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-gray-100 pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact & Support</h2>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-5 h-5" />
                            <span>Developed by <strong>Steven Hsu</strong></span>
                        </div>
                        <div className="ml-7 mt-1 text-blue-600">
                            <a href="mailto:steven_hsu@txone.com" className="hover:underline">steven_hsu@txone.com</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
