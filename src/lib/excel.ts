import * as XLSX from 'xlsx';
import { RiskProfile, Asset, Threat, Control, Scenario, ThreatControlMap } from './types';

// Helper to normalize keys (remove spaces, case insensitive, alpha-numeric only)
const normalizeKey = (key: string) => String(key || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// Helper to normalize IDs (Values): Uppercase, AlphaNumeric Only (removes - _ space)
// e.g. "A-01" -> "A01", "C 01" -> "C01"
const normalizeID = (id: any) => String(id || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

const mapRowKeys = (row: any, mapping: Record<string, string>, enableFuzzyRisk = false) => {
    const newRow: any = {};
    const rowKeys = Object.keys(row);

    // Standard Header Mapping
    rowKeys.forEach(key => {
        const normalized = normalizeKey(key);
        const targetKey = Object.keys(mapping).find(m => normalizeKey(m) === normalized);
        if (targetKey) {
            const val = row[key];
            let cleanVal: any = typeof val === 'string' ? val.trim() : val;

            // Normalize IDs (remove dashes/spaces) strict for consistency
            // CHANGE: User requested to KEEP original formats (e.g. S-01, Control 1.4).
            // We removed the forced normalizeID here. Comparisons elsewhere MUST use normalizeID.
            const definition = mapping[targetKey];
            // if (definition === 'ID' || definition.endsWith('ID')) {
            //    cleanVal = normalizeID(cleanVal);
            // }

            // Special handling for 'Value' field: Prioritize Numeric values
            // If we already have a numeric Value, don't overwrite it with a non-numeric one (like "Yes")
            if (definition === 'Value') {
                const isNewNumeric = !isNaN(parseFloat(String(cleanVal).replace(/[^0-9.-]/g, '')));
                const currentVal = newRow['Value'];
                const isCurrentNumeric = currentVal !== undefined && !isNaN(parseFloat(String(currentVal).replace(/[^0-9.-]/g, '')));

                if (isCurrentNumeric && !isNewNumeric) {
                    // Skip overwriting numeric with non-numeric
                    console.log(`Debug Mapping: Keeping existing Value ${currentVal} for ${newRow['ID']}, ignoring non-numeric ${cleanVal}`);
                } else {
                    if (isCurrentNumeric && isNewNumeric) {
                        console.log(`Debug Mapping: Overwriting Value ${currentVal} with new numeric ${cleanVal} for ${newRow['ID']}`);
                    }
                    newRow[definition] = cleanVal;
                }
            }
            // Percentage Handling: Auto-decimalize if > 1 (User data often has 27.06 for 27%)
            else if (definition.includes('Effectiveness') || definition.includes('Reduction')) {
                let num = parseFloat(String(cleanVal));
                if (!isNaN(num) && num > 1.0) {
                    newRow[definition] = num / 100.0;
                } else {
                    newRow[definition] = cleanVal;
                }
            } else {
                newRow[definition] = cleanVal;
            }
        } else if (enableFuzzyRisk) {
            // Fuzzy logic for Risk Data (Frequency/TEF)
            if (normalized.includes('freq') || normalized.includes('likeli') || normalized.includes('tef')) {
                // Map "Most Likely" or generic TEF to Frequency
                if (normalized.includes('min') && !normalized.includes('max')) {
                    newRow['FrequencyMin'] = row[key];
                } else if (normalized.includes('max') && !normalized.includes('min')) {
                    newRow['FrequencyMax'] = row[key];
                } else if (normalized.includes('most') || normalized.includes('ml') || normalized.includes('likely') || (!normalized.includes('min') && !normalized.includes('max'))) {
                    newRow['Frequency'] = row[key];
                }
            }
            // Fuzzy logic for Loss/Impact (Legacy support)
            // Enhanced to catch more currency-like headers
            else if (normalized.includes('loss') || normalized.includes('impact')) {
                if (normalized.includes('min')) {
                    newRow['MinLoss'] = row[key];
                } else if (normalized.includes('max')) {
                    newRow['MaxLoss'] = row[key];
                } else if (normalized.includes('most') || normalized.includes('ml')) {
                    newRow['MostLikelyLoss'] = row[key];
                } else {
                    // Fallback to Value
                    newRow['Value'] = row[key];
                    newRow['MostLikelyLoss'] = row[key];
                }
            }
        }

        // Preserve original key if not mapped (critical for debug)
        if (!newRow[key]) newRow[key] = row[key];
    });

    return newRow;
};

// Expected Mappings with Aliases
const ASSET_MAPPING = {
    'ID': 'ID', 'AssetID': 'ID', 'Asset ID': 'ID', 'Asset_ID': 'ID', 'Asset Identifier': 'ID',
    'Name': 'Name', 'Asset Name': 'Name',
    'Value': 'Value', 'Asset Value': 'Value', 'AssetValue': 'Value',
    'Base Loss': 'Value', 'Loss Base': 'Value', 'Base Asset Loss': 'Value', 'Loss': 'Value',
    'Base Value': 'Value', 'Current Value': 'Value', 'Replacement Value': 'Value', 'Cost': 'Value',
    'Base Loss (Downtime Only) (USD)': 'Value' // Exact match for user file
};

// Updated THREAT_MAPPING to include risk values
const THREAT_MAPPING = {
    'ID': 'ID', 'ThreatID': 'ID', 'Threat ID': 'ID', 'Threat Identifier': 'ID',
    'Name': 'Name', 'Threat Name': 'Name',
    'Type': 'Description', 'Threat Type': 'Description', // Map Type to Description if Description is missing
    'Description': 'Description', 'Threat Agent': 'Description',

    // Frequency Mappings (TEF)
    'Frequency': 'Frequency', 'Freq': 'Frequency', 'Likelihood': 'Frequency', 'TEF': 'Frequency', 'Threat Event Frequency': 'Frequency',
    'Base TEF Most Likely': 'Frequency', 'TEF Most Likely': 'Frequency',

    'FrequencyMin': 'FrequencyMin', 'Base TEF Min (events/yr)': 'FrequencyMin', 'Base TEF Min': 'FrequencyMin', 'TEF Min': 'FrequencyMin',
    'FrequencyMax': 'FrequencyMax', 'Base TEF Max': 'FrequencyMax', 'TEF Max': 'FrequencyMax',

    'MinLoss': 'MinLoss', 'Min Loss': 'MinLoss', 'Minimum Loss': 'MinLoss', 'Min Impact': 'MinLoss', 'Min Impact ($)': 'MinLoss', 'Minimum Impact': 'MinLoss',
    'MostLikelyLoss': 'MostLikelyLoss', 'ML Loss': 'MostLikelyLoss', 'Most Likely Loss': 'MostLikelyLoss', 'ML Impact': 'MostLikelyLoss', 'ML Impact ($)': 'MostLikelyLoss', 'Most Likely Impact': 'MostLikelyLoss',
    'MaxLoss': 'MaxLoss', 'Max Loss': 'MaxLoss', 'Maximum Loss': 'MaxLoss', 'Max Impact': 'MaxLoss', 'Max Impact ($)': 'MaxLoss', 'Maximum Impact': 'MaxLoss'
};

const CONTROL_MAPPING = {
    'ID': 'ID', 'ControlID': 'ID', 'Control ID': 'ID',
    'Name': 'Name', 'Control Name': 'Name',
    'Description': 'Description', 'Control Description': 'Description', 'Control Category': 'Description', // Fallback to Category if Desc missing

    // Effectiveness / Reduction Mappings
    'Effectiveness': 'Effectiveness', 'Eff': 'Effectiveness', 'Control Effectiveness': 'Effectiveness',
    'Reduction': 'Effectiveness', 'Control Reduction': 'Effectiveness',
    'Reduction Most Likely (%)': 'Effectiveness', 'Control Reduction Most Likely (%)': 'Effectiveness',

    'EffectivenessMin': 'EffectivenessMin', 'Reduction Min (%)': 'EffectivenessMin', 'Control Reduction Min (%)': 'EffectivenessMin',
    'EffectivenessMax': 'EffectivenessMax', 'Reduction Max (%)': 'EffectivenessMax', 'Control Reduction Max (%)': 'EffectivenessMax',

    'Cost': 'Cost', 'Control Cost': 'Cost', 'Annual Cost': 'Cost', 'Implementation Cost': 'Cost'
};

const SCENARIO_MAPPING = {
    'ID': 'ID', 'ScenarioID': 'ID', 'Scenario ID': 'ID', 'Scenario Identifier': 'ID',
    'Name': 'Name', 'Scenario': 'Name', 'Scenario Name': 'Name', 'Title': 'Name',
    'Scenario Description (action/process)': 'Name', 'Scenario Description': 'Name',
    'Description': 'Description',
    'Type': 'Type', 'Threat Type': 'Type',
    'Notes': 'Notes', 'Note': 'Notes',
    'AssetID': 'AssetID', 'Asset ID': 'AssetID', 'Asset Identifier': 'AssetID', 'Related Asset': 'AssetID', 'Asset': 'AssetID',
    'ThreatID': 'ThreatID', 'Threat ID': 'ThreatID', 'Threat Identifier': 'ThreatID', 'Related Threat': 'ThreatID', 'Threat': 'ThreatID'
    // Risk values removed from here as they are in Threats
};

const MAP_MAPPING = {
    'ThreatID': 'ThreatID', 'Threat ID': 'ThreatID', 'Threat': 'ThreatID',
    'ControlID': 'ControlID', 'Control ID': 'ControlID', 'Control': 'ControlID',
    'Reduction': 'Reduction', 'Control Reduction': 'Reduction', 'Control Reduction Most Likely (%)': 'Reduction', 'Reduction (%)': 'Reduction',
    'Justification': 'Justification', 'Rationale': 'Justification',
    'Enabled': 'Enabled', 'Control Enabled': 'Enabled', 'Control Enabled (0/1)': 'Enabled'
};

const findHeaderRow = (sheet: XLSX.WorkSheet, mapping: Record<string, string>): number => {
    const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const mappingKeys = Object.keys(mapping).map(normalizeKey);

    for (let i = 0; i < Math.min(data.length, 20); i++) {
        const row = data[i];
        if (!Array.isArray(row)) continue;

        let matches = 0;
        row.forEach(cell => {
            if (cell && mappingKeys.includes(normalizeKey(String(cell)))) {
                matches++;
            }
        });

        if (matches >= 2) {
            console.log(`Found header row at index ${i}:`, row);
            return i;
        }
    }
    return 0; // Default to 0
};

export const parseRiskProfile = async (file: File): Promise<RiskProfile> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                const requiredSheets = ['Assets', 'Threats', 'Controls', 'Scenarios', 'Threat_Control_Map'];
                const missingSheets = requiredSheets.filter(sheet => !workbook.SheetNames.includes(sheet));

                if (missingSheets.length > 0) {
                    throw new Error(`Profile Incorrect: Missing required sheets: ${missingSheets.join(', ')}. Please ensure you upload a valid Risk Assessment Profile.`);
                }

                const parseSheet = <T>(sheetName: string, mapping: Record<string, string>, enableFuzzy = false) => {
                    const sheet = workbook.Sheets[sheetName];
                    const headerRowIndex = findHeaderRow(sheet, mapping);

                    const range = XLSX.utils.decode_range(sheet['!ref'] || "A1");
                    range.s.r = headerRowIndex;
                    const newRef = XLSX.utils.encode_range(range);

                    const raw = XLSX.utils.sheet_to_json<any>(sheet, { range: newRef });

                    return raw.map(row => mapRowKeys(row, mapping, enableFuzzy)) as T[];
                };

                const assets = parseSheet<Asset>('Assets', ASSET_MAPPING, true); // Enable fuzzy for Assets to catch ID/Value variations

                // DEBUG: Log Parsed Assets to help diagnostics
                console.log("Debug - Parsed Assets (Raw Preview):", assets.slice(0, 5));
                assets.forEach(a => {
                    if (!a.Value) console.warn(`Asset ${a.ID} has missing Value! Check mapping.`);
                });

                const threats = parseSheet<Threat>('Threats', THREAT_MAPPING, true);
                const controls = parseSheet<Control>('Controls', CONTROL_MAPPING);
                let scenarios = parseSheet<Scenario>('Scenarios', SCENARIO_MAPPING);

                // POST-PROCESS SCENARIOS: Generate IDs if missing
                scenarios = scenarios.map((s, i) => {
                    if (!s.ID) {
                        // Pad ID with zeros, e.g. S-01, S-10
                        const idNum = i + 1;
                        s.ID = `S-${idNum < 10 ? '0' + idNum : idNum}`;
                    }
                    return s;
                });

                // POST-PROCESS MAP: Filter disabled controls - TEMPORARILY DISABLED FOR DEBUGGING
                let threatControlMap = parseSheet<ThreatControlMap>('Threat_Control_Map', MAP_MAPPING);
                // threatControlMap = threatControlMap.filter(m => {
                //     // Default to enabled if column missing/undefined. Only filter if explicitly 0.
                //     if (m.Enabled === 0 || m.Enabled === '0' || m.Enabled === false) return false;
                //     return true;
                // });
                console.log("Debug - Parsed Threat Control Map:", threatControlMap.slice(0, 5));

                // MERGE THREAT DATA INTO SCENARIOS
                let mergedCount = 0;
                scenarios = scenarios.map((scenario, i) => {
                    // Strict ID Matching using normalizeID
                    const threat = threats.find(t => normalizeID(t.ID) === normalizeID(scenario.ThreatID));
                    const asset = assets.find(a => normalizeID(a.ID) === normalizeID(scenario.AssetID));

                    // Debug Merge Logic: Log first few attempts or specific failures
                    if (i < 3 || scenario.ID.includes('S-01') || scenario.ID.includes('S01')) {
                        console.log(`Debug Merge [${scenario.ID}]: Looking for Asset '${scenario.AssetID}' and Threat '${scenario.ThreatID}'`);
                        console.log(`Debug Merge [${scenario.ID}]: Norm IDs -> Asset: '${normalizeID(scenario.AssetID)}', Threat: '${normalizeID(scenario.ThreatID)}'`);
                        console.log(`Debug Merge [${scenario.ID}]: Found Asset?`, !!asset, asset);
                        if (asset) console.log(`Debug Merge [${scenario.ID}]: Asset Value Raw:`, asset.Value);
                        if (!asset) console.log(`Debug Merge [${scenario.ID}]: Available Asset IDs (Head):`, assets.slice(0, 5).map(a => normalizeID(a.ID)));
                    }

                    let minLoss = 0, mlLoss = 0, maxLoss = 0;

                    // Primary Source for Loss: ASSET VALUE
                    // Primary Source for Loss: ASSET VALUE
                    // Logic from reference: Min = 0.5 * Value, ML = Value, Max = 2.0 * Value
                    let assetVal = 0;
                    if (asset) {
                        const a = asset as any;
                        // Robust check: If 'Value' is non-numeric (e.g. "Yes"), look for specific fallback columns that exist in the raw object
                        const rawVal = (a.Value && !isNaN(parseFloat(String(a.Value).replace(/[^0-9.-]/g, ''))))
                            ? a.Value
                            : (a['Base Loss (Downtime Only) (USD)'] || a['Base Loss'] || a['Loss'] || a['Base Asset Loss']);

                        assetVal = parseFloat(String(rawVal).replace(/[^0-9.-]/g, ''));

                        if (!isNaN(assetVal) && assetVal > 0) {
                            if (i < 3) console.log(`Debug Merge [${scenario.ID}]: Derived Asset Value: ${assetVal} from raw: ${rawVal}`);
                        }
                    }

                    if (assetVal > 0) {
                        minLoss = assetVal * 0.5;
                        mlLoss = assetVal;
                        maxLoss = assetVal * 2.0;
                    }

                    // Fallback to Threat-defined loss if Asset Value is missing or 0
                    if (mlLoss === 0 && threat) {
                        minLoss = threat.MinLoss || 0;
                        mlLoss = threat.MostLikelyLoss || 0;
                        maxLoss = threat.MaxLoss || 0;
                    }

                    if (threat) {
                        mergedCount++;
                        return {
                            ...scenario,
                            Frequency: threat.Frequency || 0,
                            FrequencyMin: threat.FrequencyMin || threat.Frequency || 0,
                            FrequencyMax: threat.FrequencyMax || threat.Frequency || 0,
                            MinLoss: minLoss,
                            MostLikelyLoss: mlLoss,
                            MaxLoss: maxLoss
                        };
                    }
                    return scenario;
                });

                console.log(`Merge Status: Merged ${mergedCount} out of ${scenarios.length} scenarios.`);
                if (scenarios.length > 0) {
                    // Log the first scenario and its matched threat to debug data values
                    const firstScenario = scenarios[0];
                    const matchingThreat = threats.find(t => t.ID === firstScenario.ThreatID);
                    console.log("Debug Merge - First Scenario:", firstScenario);
                    console.log("Debug Merge - Matching Threat (Source of Risk Data):", matchingThreat);
                }

                resolve({
                    assets,
                    threats,
                    controls,
                    scenarios,
                    threatControlMap,
                });
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
};
