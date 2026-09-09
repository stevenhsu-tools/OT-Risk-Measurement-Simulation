// v5.2.1 Schema — OT Risk Monte Carlo Multi-Scenario
// Field names follow the Excel column headers for clarity and traceability

export interface Asset {
    ID: string;
    Name: string;
    PurdueLevel?: string;
    PrimaryFunction?: string;
    DowntimeCostPerHour: number;    // Required for loss calculation
    MaxOutageHours: number;         // Required for loss calculation
    BaseLoss?: number;              // Derived = DowntimeCostPerHour × MaxOutageHours; stored for display/export
    SafetyImpact?: 'Yes' | 'No' | string;
    AssumptionBasis?: string;
    [key: string]: any;
}

export interface Threat {
    ID: string;
    Name: string;                   // "Threat Type" in v5.2.1 Excel
    BaseTEFMin: number;
    BaseTEFMostLikely: number;
    BaseTEFMax: number;
    AssumptionBasis?: string;
    [key: string]: any;
}

export interface Control {
    ID: string;
    Name: string;
    Category?: string;
    ReductionMin: number;           // Decimal fraction 0-1 (e.g., 0.24 = 24%)
    ReductionMostLikely: number;
    ReductionMax: number;
    Enabled: boolean;               // Global on/off flag (distinct from per-map Enabled)
    TXOneSolutions: string[];       // Parsed from semicolon-separated "TXOne Solution(s)"
    EvidenceSourceIds?: string;
    [key: string]: any;
}

export interface Scenario {
    ID: string;
    Description: string;
    AssetID: string;
    ThreatID: string;
    Notes?: string;
    [key: string]: any;
    // ThreatType is a formula/lookup in Excel — derive at read time, don't store
}

export interface ThreatControlMap {
    ThreatID: string;
    ControlID: string;
    EffectOn: 'TEF' | 'Loss';       // Currently always 'TEF' in v5.2.1 data; kept for forward-compatibility
    Justification?: string;
    ControlEnabled: boolean;        // Per-mapping on/off; distinct from Control.Enabled
    ReductionMostLikely: number;    // Decimal fraction 0-1; the override value used in calculations
    [key: string]: any;
}

export interface RiskProfile {
    assets: Asset[];
    threats: Threat[];
    controls: Control[];
    scenarios: Scenario[];
    threatControlMap: ThreatControlMap[];
}

export interface StoredDataset {
    schemaVersion: number;
    savedAt: string;                // ISO timestamp
    defaultDataVersion?: string;    // Content hash of DEFAULT_RISK_PROFILE at save time
    userModified?: boolean;         // false only right after a full Reset Entire Dataset
    profile: RiskProfile;
}
