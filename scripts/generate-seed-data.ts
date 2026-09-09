#!/usr/bin/env node
/**
 * Generate seed data from v5.2.2 reference Excel
 * Run once via: npx tsx scripts/generate-seed-data.ts
 * Output: src/data/defaultData.ts
 *
 * GENERATED FILE — do not hand-edit defaultData.ts
 */

import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { lognormalMostLikely } from '../src/lib/formulas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = path.resolve(__dirname, '../Reference/OT_Risk_MonteCarlo_multi_Scenario_v5.2.2.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/defaultData.ts');

interface RawAsset {
  'Asset ID'?: string;
  'Asset Name'?: string;
  'Purdue Level'?: string;
  'Primary Function'?: string;
  'Downtime Cost per Hour (USD)'?: number;
  'Max Outage Hours'?: number;
  'Base Loss (Downtime Only) (USD)'?: number;
  'Safety Impact?'?: string;
  'Assumption Basis'?: string;
  [key: string]: any;
}

interface RawThreat {
  'Threat ID'?: string;
  'Threat Type'?: string;
  'Base TEF Min (events/yr)'?: number;
  'Base TEF Most Likely (events/yr)'?: number;
  'Base TEF Max (events/yr)'?: number;
  'Assumption Basis'?: string;
  [key: string]: any;
}

interface RawControl {
  'Control ID'?: string;
  'Control Name'?: string;
  'Control Category'?: string;
  'Reduction Min (%)'?: number;
  'Reduction Most Likely (%)'?: number;
  'Reduction Max (%)'?: number;
  'Enabled (0/1)'?: number;
  'TXOne Solution(s)'?: string;
  'Evidence Source IDs'?: string;
  [key: string]: any;
}

interface RawScenario {
  'Scenario ID'?: string;
  'Scenario Description (action/process)'?: string;
  'Asset ID'?: string;
  'Threat ID'?: string;
  'Notes'?: string;
  [key: string]: any;
}

interface RawTCM {
  'Threat ID'?: string;
  'Control ID'?: string;
  'Effect On (TEF/Loss)'?: string;
  'Justification'?: string;
  'Control Enabled (0/1)'?: number;
  'Control Reduction Most Likely (%)'?: number;
  [key: string]: any;
}

function normalizePercentage(val: number | undefined): number {
  if (val === undefined || val === null) return 0;
  // If > 1, assume it's a whole-number percent (e.g., 24 = 24%), convert to decimal
  if (val > 1) return val / 100;
  return val;
}

function parseExcel() {
  console.log(`Reading Excel from ${EXCEL_PATH}...`);
  const wb = XLSX.readFile(EXCEL_PATH);

  // Assets
  const assetsRaw = XLSX.utils.sheet_to_json<RawAsset>(wb.Sheets['Assets']);
  const assets = assetsRaw.map(row => {
    const baseLoss = (row['Base Loss (Downtime Only) (USD)'] as number) ?? 0;
    return {
      ID: (row['Asset ID'] || '').toString().trim(),
      Name: (row['Asset Name'] || '').toString().trim(),
      PurdueLevel: (row['Purdue Level'] || '').toString().trim() || undefined,
      PrimaryFunction: (row['Primary Function'] || '').toString().trim() || undefined,
      DowntimeCostPerHour: parseFloat(String(row['Downtime Cost per Hour (USD)'] || 0)),
      MaxOutageHours: parseFloat(String(row['Max Outage Hours'] || 0)),
      BaseLoss: parseFloat(String(baseLoss)),
      SafetyImpact: (row['Safety Impact?'] || '').toString().trim() || undefined,
      AssumptionBasis: (row['Assumption Basis'] || '').toString().trim() || undefined,
    };
  });

  // Threats
  // Base TEF Most Likely is always COMPUTED from Min/Max (calibrated-lognormal mode), never trusted
  // from the Excel cell directly — some rows in the source workbook have historically carried stale
  // hardcoded values instead of the live formula, so recomputing here guarantees correctness.
  const threatsRaw = XLSX.utils.sheet_to_json<RawThreat>(wb.Sheets['Threats']);
  const threats = threatsRaw.map(row => {
    const min = parseFloat(String(row['Base TEF Min (events/yr)'] || 0));
    const max = parseFloat(String(row['Base TEF Max (events/yr)'] || 0));
    return {
      ID: (row['Threat ID'] || '').toString().trim(),
      Name: (row['Threat Type'] || '').toString().trim(),
      BaseTEFMin: min,
      BaseTEFMostLikely: lognormalMostLikely(min, max),
      BaseTEFMax: max,
      AssumptionBasis: (row['Assumption Basis'] || '').toString().trim() || undefined,
    };
  });

  // Controls
  // Reduction Most Likely is always COMPUTED from Min/Max (calibrated-lognormal mode), never
  // trusted from the Excel cell directly — see note on Threats above; the same staleness issue
  // exists in the Controls sheet.
  const controlsRaw = XLSX.utils.sheet_to_json<RawControl>(wb.Sheets['Controls']);
  const controls = controlsRaw.map(row => {
    const txoneSolutionsStr = (row['TXOne Solution(s)'] || '').toString().trim();
    const txoneSolutions = txoneSolutionsStr
      ? Array.from(new Set(
          txoneSolutionsStr.split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            // "EdgeIPS Pro" is merged into "EdgeIPS" — the two are treated as one product line
            .map(s => (s === 'EdgeIPS Pro' ? 'EdgeIPS' : s))
        ))
      : [];

    const min = normalizePercentage(parseFloat(String(row['Reduction Min (%)'] || 0)));
    const max = normalizePercentage(parseFloat(String(row['Reduction Max (%)'] || 0)));

    return {
      ID: (row['Control ID'] || '').toString().trim(),
      Name: (row['Control Name'] || '').toString().trim(),
      Category: (row['Control Category'] || '').toString().trim() || undefined,
      ReductionMin: min,
      ReductionMostLikely: lognormalMostLikely(min, max),
      ReductionMax: max,
      Enabled: Boolean((row['Enabled (0/1)'] ?? 0) === 1),
      TXOneSolutions: txoneSolutions,
      EvidenceSourceIds: (row['Evidence Source IDs'] || '').toString().trim() || undefined,
    };
  });
  const controlMostLikelyById = new Map(controls.map(c => [c.ID, c.ReductionMostLikely]));

  // Scenarios
  const scenariosRaw = XLSX.utils.sheet_to_json<RawScenario>(wb.Sheets['Scenarios']);
  const scenarios = scenariosRaw.map(row => ({
    ID: (row['Scenario ID'] || '').toString().trim(),
    Description: (row['Scenario Description (action/process)'] || '').toString().trim(),
    AssetID: (row['Asset ID'] || '').toString().trim(),
    ThreatID: (row['Threat ID'] || '').toString().trim(),
    Notes: (row['Notes'] || '').toString().trim() || undefined,
  }));

  // Threat_Control_Map
  // ReductionMostLikely is looked up from the (already-corrected) matching Control, not read from
  // this sheet's own cell — the Excel formula here is itself just a lookup into Controls, so this
  // keeps generated data consistent with the app's own runtime behavior (ThreatControlMapEditor
  // derives this field from the linked Control the same way).
  const tcmRaw = XLSX.utils.sheet_to_json<RawTCM>(wb.Sheets['Threat_Control_Map']);
  const threatControlMap = tcmRaw.map(row => {
    const effOn = (row['Effect On (TEF/Loss)'] || 'TEF').toString().trim();
    const justification = (row['Justification'] || '').toString().trim() || undefined;
    const controlId = (row['Control ID'] || '').toString().trim();
    return {
      ThreatID: (row['Threat ID'] || '').toString().trim(),
      ControlID: controlId,
      EffectOn: (effOn === 'Loss' ? 'Loss' : 'TEF') as 'TEF' | 'Loss',
      // "EdgeIPS Pro" is merged into "EdgeIPS" — keep justification text consistent
      Justification: justification?.replace(/EdgeIPS Pro/g, 'EdgeIPS'),
      ControlEnabled: Boolean((row['Control Enabled (0/1)'] ?? 0) === 1),
      ReductionMostLikely: controlMostLikelyById.get(controlId)
        ?? normalizePercentage(parseFloat(String(row['Control Reduction Most Likely (%)'] || 0))),
    };
  });

  return { assets, threats, controls, scenarios, threatControlMap };
}

const HANDBOOK_PATH = path.resolve(__dirname, '../Reference/Control ID from Handbook Completed.xlsx');
const HANDBOOK_OUTPUT_PATH = path.resolve(__dirname, '../src/data/controlHandbook.ts');

interface RawHandbookRow {
  'Control ID'?: string;
  'Control Name'?: string;
  'Control Category'?: string;
  [key: string]: any;
}

function parseControlHandbook() {
  console.log(`Reading Control ID Handbook from ${HANDBOOK_PATH}...`);
  const wb = XLSX.readFile(HANDBOOK_PATH);
  const sheetName = wb.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json<RawHandbookRow>(wb.Sheets[sheetName]);
  return rows.map(row => ({
    ID: (row['Control ID'] || '').toString().trim(),
    Name: (row['Control Name'] || '').toString().trim(),
    Category: (row['Control Category'] || '').toString().trim(),
  })).filter(r => r.ID);
}

function generateHandbookFile(entries: { ID: string; Name: string; Category: string }[]) {
  const content = `/**
 * GENERATED FILE — see scripts/generate-seed-data.ts
 * Regenerate via: npm run generate:seed
 * Do not hand-edit this file.
 *
 * Source of truth for valid Control ID + Category combinations, from
 * "Reference/Control ID from Handbook Completed.xlsx" (OT Cybersecurity Controls Handbook).
 */

export interface ControlHandbookEntry {
  ID: string;
  Name: string;
  Category: string;
}

export const CONTROL_HANDBOOK: ControlHandbookEntry[] = ${JSON.stringify(entries, null, 2)};
`;
  fs.writeFileSync(HANDBOOK_OUTPUT_PATH, content);
  console.log(`✓ Generated ${HANDBOOK_OUTPUT_PATH}`);
  console.log(`  Control Handbook entries: ${entries.length}`);
}

function generateTypeScriptFile(profile: {
  assets: any[];
  threats: any[];
  controls: any[];
  scenarios: any[];
  threatControlMap: any[];
}) {
  const profile_str = JSON.stringify(profile, null, 2);
  // Content hash of the generated data — lets the app detect (in storage.ts) whether a browser's
  // saved dataset is just a stale copy of an older default (auto-heal it) versus data the user has
  // actually customized (never touch it). Changes automatically whenever regeneration produces
  // different content; no manual version bumping required.
  const dataVersion = createHash('sha256').update(profile_str).digest('hex').slice(0, 16);

  const content = `/**
 * GENERATED FILE — see scripts/generate-seed-data.ts
 * Regenerate via: npm run generate:seed
 * Do not hand-edit this file.
 */

import { RiskProfile } from '../lib/types';

// Content hash of the data below — bumps automatically on regeneration if data changes.
export const DEFAULT_DATA_VERSION = '${dataVersion}';

export const DEFAULT_RISK_PROFILE: RiskProfile = ${profile_str};
`;

  fs.writeFileSync(OUTPUT_PATH, content);
  console.log(`✓ Generated ${OUTPUT_PATH}`);
  console.log(`  Assets: ${profile.assets.length}`);
  console.log(`  Threats: ${profile.threats.length}`);
  console.log(`  Controls: ${profile.controls.length}`);
  console.log(`  Scenarios: ${profile.scenarios.length}`);
  console.log(`  Threat_Control_Map: ${profile.threatControlMap.length}`);
}

try {
  const profile = parseExcel();
  generateTypeScriptFile(profile);
  const handbookEntries = parseControlHandbook();
  generateHandbookFile(handbookEntries);
  console.log('✓ Seed data generation complete');
} catch (err) {
  console.error('✗ Error generating seed data:', err);
  process.exit(1);
}
