import { Info, Database, Mail, Github, BookOpen, Download } from 'lucide-react';

const HANDBOOK_PDF_URL = 'https://1drv.ms/b/c/389cdef109ba7f67/IQCEPAaoYTFtSrL5GgG6fFJaAQbr57GgeKpnif4qqXudC9s';

export function AboutView() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto text-xs">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-5">
                    <div className="p-2.5 bg-blue-100 rounded-full">
                        <Info className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-gray-900">About OT Risk Measurement Simulation</h1>
                        <p className="text-gray-500">Operational Technology Risk Simulation &amp; Assessment Tool — Version 2</p>
                    </div>
                </div>

                <div className="prose prose-sm max-w-none space-y-5 text-gray-700">
                    <section>
                        <h2 className="text-sm font-semibold text-gray-800 mb-2">Application Purpose</h2>
                        <p>
                            This application helps organizations measure and visualize Operational Technology (OT) risks using
                            Monte Carlo simulation, based on the methodology in the OT Risk Monte Carlo Multi-Scenario reference
                            model (v5.2.2). By analyzing threats, assets, and controls, it calculates potential annual losses and
                            generates actionable insights to prioritize risk mitigation strategies.
                        </p>
                    </section>

                    <section className="bg-amber-50 p-5 rounded-md border border-amber-200">
                        <h2 className="text-sm font-semibold text-amber-900 mb-2">Most Likely Value Methodology</h2>
                        <p className="text-amber-800">
                            <strong>Base TEF Most Likely</strong> (Threats) and <strong>Reduction Most Likely</strong> (Controls)
                            are never entered directly — both are calculated as the <em>mode of a calibrated lognormal
                            distribution</em>, treating the Min and Max values as the 5th and 95th percentile bounds of a 90%
                            confidence interval. This is the calibrated-estimation technique used by Douglas Hubbard's
                            quantitative risk methodology and the FAIR (Factor Analysis of Information Risk) model, chosen
                            because frequency and effectiveness estimates are typically right-skewed rather than symmetric — a
                            plain average of Min and Max would overstate the realistic central value. The reference workbook
                            (v5.2.2) corrects several rows where earlier versions had stale hand-entered values instead of this
                            formula; the app now always computes this value itself rather than trusting a stored figure, so it
                            cannot drift out of sync again.
                        </p>
                    </section>

                    <section className="bg-indigo-50 p-5 rounded-md border border-indigo-200">
                        <div className="flex items-start space-x-3">
                            <BookOpen className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div className="space-y-2">
                                <h2 className="text-sm font-semibold text-indigo-900">OT Cybersecurity Controls Handbook</h2>
                                <p className="text-indigo-800">
                                    Every Control ID and Category in this application comes from the{' '}
                                    <strong>OT Cybersecurity Controls Handbook (20250515, V1.3.1-NT)</strong>, which documents the
                                    recommended controls, categories, and their alignment with TXOne Networks solutions. When
                                    adding or editing a Control, its ID and Category are constrained to this handbook to keep the
                                    dataset consistent and traceable.
                                </p>
                                <a
                                    href={HANDBOOK_PDF_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download the Handbook (PDF)</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-50 p-5 rounded-md border border-blue-200">
                        <div className="flex items-start space-x-3">
                            <Database className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h2 className="text-sm font-semibold text-blue-900 mb-2">Editable Risk Data — No Upload Required</h2>
                                <p className="text-blue-800">
                                    Version 2 comes pre-loaded with a complete set of Assets, Threats, Controls, Threat–Control
                                    Mappings, and Scenarios, so you can start immediately under the <strong>Data</strong> section
                                    of the sidebar. Edit any table to reflect your own environment, and use{' '}
                                    <strong>Import / Export Dataset</strong> (also under Data) and{' '}
                                    <strong>Reset to Default</strong> (available per-table or for the entire dataset) to save,
                                    share, or restore your configuration — no spreadsheet upload is required to use the tool.
                                </p>
                                <p className="mt-2 text-blue-800">
                                    Data is stored locally in your browser. To hand a customized dataset to a colleague or another
                                    company, export it as JSON or Excel and share the file — they can import it directly.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-gray-100 pt-5">
                        <h2 className="text-sm font-semibold text-gray-800 mb-3">Open Source</h2>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Github className="w-4 h-4" />
                            <span>This program is developed by <strong>Steven Hsu</strong> and is open-source.</span>
                        </div>
                    </section>

                    <section className="border-t border-gray-100 pt-5">
                        <h2 className="text-sm font-semibold text-gray-800 mb-3">Contact &amp; Support</h2>
                        <div className="flex items-center space-x-3">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/steven-hsu-logo.png`}
                                alt="Steven Hsu"
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span>Developed by <strong>Steven Hsu</strong></span>
                                </div>
                                <div className="mt-0.5 text-blue-600">
                                    <a href="mailto:steven_hsu@txone.com" className="hover:underline">steven_hsu@txone.com</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
