export interface Asset {
    ID: string;
    Name: string;
    Value?: number;
    [key: string]: any;
}

export interface Threat {
    ID: string;
    Name: string;
    Description?: string;
    Frequency?: number; // Treat as Most Likely
    FrequencyMin?: number;
    FrequencyMax?: number;
    MinLoss?: number;
    MostLikelyLoss?: number;
    MaxLoss?: number;
    [key: string]: any;
}

export interface Control {
    ID: string;
    Name: string;
    Description?: string;
    Effectiveness?: number; // 0-1 or percentage (Most Likely)
    EffectivenessMin?: number;
    EffectivenessMax?: number;
    Cost?: number;
    [key: string]: any;
}

export interface Scenario {
    ID: string;
    Name: string;
    Description?: string;
    AssetID?: string;
    ThreatID?: string;
    Frequency?: number; // Initial frequency (Most Likely)
    FrequencyMin?: number;
    FrequencyMax?: number;
    MinLoss?: number;
    MostLikelyLoss?: number;
    MaxLoss?: number;
    [key: string]: any;
}

export interface ThreatControlMap {
    ThreatID: string;
    ControlID: string;
    [key: string]: any;
}

export interface RiskProfile {
    assets: Asset[];
    threats: Threat[];
    controls: Control[];
    scenarios: Scenario[];
    threatControlMap: ThreatControlMap[];
}
