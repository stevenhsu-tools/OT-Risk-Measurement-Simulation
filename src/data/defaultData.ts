/**
 * GENERATED FILE — see scripts/generate-seed-data.ts
 * Regenerate via: npm run generate:seed
 * Do not hand-edit this file.
 */

import { RiskProfile } from '../lib/types';

// Content hash of the data below — bumps automatically on regeneration if data changes.
export const DEFAULT_DATA_VERSION = '38454287b8fb76ec';

export const DEFAULT_RISK_PROFILE: RiskProfile = {
  "assets": [
    {
      "ID": "A-01",
      "Name": "Operator HMI",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 16,
      "BaseLoss": 96000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-02",
      "Name": "Engineering Workstation",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 20,
      "BaseLoss": 240000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-03",
      "Name": "SCADA Server",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 3,
      "BaseLoss": 36000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-04",
      "Name": "Historian",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 3000,
      "MaxOutageHours": 20,
      "BaseLoss": 60000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-05",
      "Name": "PLC Controller",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 16000,
      "MaxOutageHours": 3,
      "BaseLoss": 48000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-06",
      "Name": "SIS Controller",
      "PurdueLevel": "L0/L1",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 20,
      "BaseLoss": 120000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-07",
      "Name": "Remote I/O",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 24000,
      "MaxOutageHours": 20,
      "BaseLoss": 480000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-08",
      "Name": "Industrial Switch",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 24000,
      "MaxOutageHours": 20,
      "BaseLoss": 480000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-09",
      "Name": "Industrial Firewall",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 24000,
      "MaxOutageHours": 6,
      "BaseLoss": 144000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-10",
      "Name": "Wireless AP (OT)",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 24000,
      "MaxOutageHours": 20,
      "BaseLoss": 480000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-11",
      "Name": "IIoT Gateway",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Engineering",
      "DowntimeCostPerHour": 3000,
      "MaxOutageHours": 20,
      "BaseLoss": 60000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-12",
      "Name": "OPC UA Server",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 24000,
      "MaxOutageHours": 6,
      "BaseLoss": 144000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-13",
      "Name": "MES Interface Node",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 20,
      "BaseLoss": 240000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-14",
      "Name": "Batch Server",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 5000,
      "MaxOutageHours": 20,
      "BaseLoss": 100000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-15",
      "Name": "Robot Controller",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 8000,
      "MaxOutageHours": 20,
      "BaseLoss": 160000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-16",
      "Name": "Vision Inspection PC",
      "PurdueLevel": "L1/L2",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 48000,
      "MaxOutageHours": 20,
      "BaseLoss": 960000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-17",
      "Name": "CNC Controller",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 12,
      "BaseLoss": 144000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-18",
      "Name": "Packaging Line PC",
      "PurdueLevel": "L1/L2",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 3000,
      "MaxOutageHours": 12,
      "BaseLoss": 36000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-19",
      "Name": "Quality Lab PC",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 32000,
      "MaxOutageHours": 8,
      "BaseLoss": 256000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-20",
      "Name": "Asset Management Server",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 16000,
      "MaxOutageHours": 6,
      "BaseLoss": 96000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-21",
      "Name": "Patch Management Relay",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 8000,
      "MaxOutageHours": 18,
      "BaseLoss": 144000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-22",
      "Name": "Backup Server (OT)",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 48000,
      "MaxOutageHours": 20,
      "BaseLoss": 960000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-23",
      "Name": "Jump Host",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 3000,
      "MaxOutageHours": 18,
      "BaseLoss": 54000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-24",
      "Name": "Remote Access Gateway",
      "PurdueLevel": "L2/L3",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 18,
      "BaseLoss": 216000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-25",
      "Name": "Domain Controller (OT)",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Engineering",
      "DowntimeCostPerHour": 3000,
      "MaxOutageHours": 20,
      "BaseLoss": 60000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-26",
      "Name": "File Transfer Server",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 8,
      "BaseLoss": 48000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-27",
      "Name": "Print Server (OT)",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 32000,
      "MaxOutageHours": 16,
      "BaseLoss": 512000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-28",
      "Name": "Time Server (NTP)",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 20,
      "BaseLoss": 120000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-29",
      "Name": "License Server",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 16000,
      "MaxOutageHours": 4,
      "BaseLoss": 64000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-30",
      "Name": "Virtualization Host",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Engineering",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 8,
      "BaseLoss": 48000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-31",
      "Name": "DCS",
      "PurdueLevel": "L1/L2",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 60000,
      "MaxOutageHours": 16,
      "BaseLoss": 960000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-32",
      "Name": "RTU",
      "PurdueLevel": "L1",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 10000,
      "MaxOutageHours": 18,
      "BaseLoss": 180000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-33",
      "Name": "Emergency Shutdown Systems (ESD)",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Safety",
      "DowntimeCostPerHour": 80000,
      "MaxOutageHours": 8,
      "BaseLoss": 640000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-34",
      "Name": "Burner Management Systems (BMS)",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Safety",
      "DowntimeCostPerHour": 60000,
      "MaxOutageHours": 8,
      "BaseLoss": 480000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-35",
      "Name": "Fire and Gas Systems (FGS)",
      "PurdueLevel": "L1",
      "PrimaryFunction": "Safety",
      "DowntimeCostPerHour": 100000,
      "MaxOutageHours": 8,
      "BaseLoss": 800000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-36",
      "Name": "Maintenance Workstations",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Engineering",
      "DowntimeCostPerHour": 8000,
      "MaxOutageHours": 12,
      "BaseLoss": 96000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-37",
      "Name": "Alarm Servers",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 32000,
      "MaxOutageHours": 8,
      "BaseLoss": 256000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-38",
      "Name": "Advanced Process Control (APC) Servers",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Engineering",
      "DowntimeCostPerHour": 20000,
      "MaxOutageHours": 9,
      "BaseLoss": 180000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-39",
      "Name": "Industrial PCs (IPC)",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Data Collection",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 12,
      "BaseLoss": 144000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-40",
      "Name": "Configuration Management Servers",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Engineering",
      "DowntimeCostPerHour": 10000,
      "MaxOutageHours": 12,
      "BaseLoss": 120000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-41",
      "Name": "HVAC Control Systems",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 18,
      "BaseLoss": 108000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-42",
      "Name": "Building Management Systems (BMS)",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 6000,
      "MaxOutageHours": 18,
      "BaseLoss": 108000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-43",
      "Name": "Industrial Sensor / Transmitter",
      "PurdueLevel": "L0/L1",
      "PrimaryFunction": "Measurement",
      "DowntimeCostPerHour": 5000,
      "MaxOutageHours": 12,
      "BaseLoss": 60000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-44",
      "Name": "Variable Frequency Drive (VFD)",
      "PurdueLevel": "L1",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 40000,
      "MaxOutageHours": 8,
      "BaseLoss": 320000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-45",
      "Name": "Safety PLC / Logic Solver",
      "PurdueLevel": "L1",
      "PrimaryFunction": "Safety",
      "DowntimeCostPerHour": 120000,
      "MaxOutageHours": 8,
      "BaseLoss": 960000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-46",
      "Name": "Distributed I/O Cabinet",
      "PurdueLevel": "L1",
      "PrimaryFunction": "Control",
      "DowntimeCostPerHour": 48000,
      "MaxOutageHours": 12,
      "BaseLoss": 576000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-47",
      "Name": "Industrial Protocol Gateway",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 16000,
      "MaxOutageHours": 12,
      "BaseLoss": 192000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-48",
      "Name": "Industrial Cellular Router",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 18,
      "BaseLoss": 216000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-49",
      "Name": "OT File Repository / NAS",
      "PurdueLevel": "L3.5",
      "PrimaryFunction": "Data management",
      "DowntimeCostPerHour": 16000,
      "MaxOutageHours": 18,
      "BaseLoss": 288000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-50",
      "Name": "Manufacturing Execution Server",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Operations",
      "DowntimeCostPerHour": 40000,
      "MaxOutageHours": 12,
      "BaseLoss": 480000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-51",
      "Name": "Recipe / Batch Management Server",
      "PurdueLevel": "L3",
      "PrimaryFunction": "Operations",
      "DowntimeCostPerHour": 72000,
      "MaxOutageHours": 16,
      "BaseLoss": 1152000,
      "SafetyImpact": "Yes",
      "AssumptionBasis": "v5.1 safety: cost x4; whole-hour outage x2, capped at 20 hours."
    },
    {
      "ID": "A-52",
      "Name": "Data Diode / OT DMZ Gateway",
      "PurdueLevel": "L3/L3.5",
      "PrimaryFunction": "Connectivity",
      "DowntimeCostPerHour": 16000,
      "MaxOutageHours": 12,
      "BaseLoss": 192000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-53",
      "Name": "Remote Operations Terminal",
      "PurdueLevel": "L2/L3",
      "PrimaryFunction": "Remote access",
      "DowntimeCostPerHour": 20000,
      "MaxOutageHours": 12,
      "BaseLoss": 240000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    },
    {
      "ID": "A-54",
      "Name": "Condition Monitoring Gateway",
      "PurdueLevel": "L2",
      "PrimaryFunction": "Monitoring",
      "DowntimeCostPerHour": 12000,
      "MaxOutageHours": 18,
      "BaseLoss": 216000,
      "SafetyImpact": "No",
      "AssumptionBasis": "v5.1: cost x2; whole-hour outage x1.5, rounded up and capped at 20 hours."
    }
  ],
  "threats": [
    {
      "ID": "T-01",
      "Name": "Malware via removable media",
      "BaseTEFMin": 3,
      "BaseTEFMostLikely": 5.049043653557815,
      "BaseTEFMax": 12.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-02",
      "Name": "Ransomware from IT to OT",
      "BaseTEFMin": 2.25,
      "BaseTEFMostLikely": 3.9036906066954704,
      "BaseTEFMax": 10.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-03",
      "Name": "Phishing leading to OT access",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-04",
      "Name": "Compromised vendor remote access",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-05",
      "Name": "Unauthorized software installation",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.4274806062731,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-06",
      "Name": "Lateral movement via shared credentials",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-07",
      "Name": "Credential stuffing on remote access portal",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-08",
      "Name": "Exploitation of unpatched HMI",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-09",
      "Name": "Exploitation of unpatched SCADA server",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-10",
      "Name": "Exploitation of PLC engineering protocol",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-11",
      "Name": "Abuse of remote desktop",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-12",
      "Name": "OT network scanning and reconnaissance",
      "BaseTEFMin": 0.15,
      "BaseTEFMostLikely": 0.2897274065665937,
      "BaseTEFMax": 3.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-13",
      "Name": "Supply chain compromised update",
      "BaseTEFMin": 0.38,
      "BaseTEFMostLikely": 0.7313448517924861,
      "BaseTEFMax": 3.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-14",
      "Name": "Insecure file transfer between zones",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7971270151795,
      "BaseTEFMax": 10.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-15",
      "Name": "Misconfiguration of firewall rules",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-16",
      "Name": "Rogue device insertion",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-17",
      "Name": "Unauthorized wireless access",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-18",
      "Name": "Data exfiltration of recipes/parameters",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-19",
      "Name": "Tampering with historian data",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-20",
      "Name": "Denial of service on OT switch",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-21",
      "Name": "Time sync manipulation",
      "BaseTEFMin": 0.15,
      "BaseTEFMostLikely": 0.2943686540529448,
      "BaseTEFMax": 2.63,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-22",
      "Name": "Backup deletion and sabotage",
      "BaseTEFMin": 0.38,
      "BaseTEFMostLikely": 0.7313448517924861,
      "BaseTEFMax": 3.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-23",
      "Name": "Insider misuse",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-24",
      "Name": "Privilege escalation on OT endpoint",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-25",
      "Name": "Abuse of OT admin tools",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-26",
      "Name": "Unsafe change to control logic",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-27",
      "Name": "Malicious script execution",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-28",
      "Name": "USB drop attack",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-29",
      "Name": "Compromised portable engineering laptop",
      "BaseTEFMin": 1.5,
      "BaseTEFMostLikely": 2.7180507449407143,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-30",
      "Name": "Infected firmware image",
      "BaseTEFMin": 0.38,
      "BaseTEFMostLikely": 0.7313448517924861,
      "BaseTEFMax": 3.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-31",
      "Name": "Compromised newly delivered equipment",
      "BaseTEFMin": 0.38,
      "BaseTEFMostLikely": 0.7313448517924861,
      "BaseTEFMax": 3.5,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-32",
      "Name": "Unauthorized OT protocol command",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-33",
      "Name": "Exploitation of legacy or unsupported operating system",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-34",
      "Name": "Exploitation of exposed remote-access appliance",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.4667994931024708,
      "BaseTEFMax": 8.75,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-35",
      "Name": "Unauthorized modification of HMI or control configuration",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-36",
      "Name": "Command-and-control communication from OT endpoint",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.445137101676012,
      "BaseTEFMax": 7,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-37",
      "Name": "Unmanaged or shadow OT asset communication",
      "BaseTEFMin": 0.75,
      "BaseTEFMostLikely": 1.39856350758975,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    },
    {
      "ID": "T-38",
      "Name": "Malformed industrial protocol denial of service",
      "BaseTEFMin": 0.38,
      "BaseTEFMostLikely": 0.7470133663501434,
      "BaseTEFMax": 5.25,
      "AssumptionBasis": "v5.1 elevated TEF prior: min x1.50, most likely x1.60, max x1.75; calibrate with site incident history."
    }
  ],
  "controls": [
    {
      "ID": "Control 1.1",
      "Name": "Ensure Equipment is Shipped with Supported Operating Systems",
      "Category": "Supply chain",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "Element Portable Inspector",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-04"
    },
    {
      "ID": "Control 1.2",
      "Name": "Patch Application Procedures from Equipment Suppliers",
      "Category": "Supply chain",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3511514748973963,
      "ReductionMax": 0.6,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 1.3",
      "Name": "Require Secure Transmission Protocols in Equipment",
      "Category": "Network",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.26894134935367203,
      "ReductionMax": 0.48,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 1.5",
      "Name": "Pre-Shipment Vulnerability Scan and Report",
      "Category": "Supply chain",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.25730966911852154,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "Element Portable Inspector",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-04"
    },
    {
      "ID": "Control 1.6",
      "Name": "Pre-Shipment Malware Scanning and Reporting",
      "Category": "Supply chain",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.42013569461691125,
      "ReductionMax": 0.66,
      "Enabled": false,
      "TXOneSolutions": [
        "Element Portable Inspector",
        "Element Safe Port",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-04"
    },
    {
      "ID": "Control 1.7",
      "Name": "Compatible Anti-Malware Solutions for Equipment",
      "Category": "Endpoint",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.42013569461691125,
      "ReductionMax": 0.66,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 1.8",
      "Name": "Equipment Security Hardening",
      "Category": "Endpoint",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3511514748973963,
      "ReductionMax": 0.6,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 1.11",
      "Name": "Logging and Exporting Security Events for Equipment",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10047835992520839,
      "ReductionMax": 0.24,
      "Enabled": false,
      "TXOneSolutions": [
        "StellarOne",
        "EdgeOne",
        "ElementOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 1.12",
      "Name": "Required Event Log Types and Contents",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10047835992520839,
      "ReductionMax": 0.24,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "EdgeOne",
        "ElementOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 2.1",
      "Name": "Develop and Maintain an OT Asset Inventory",
      "Category": "Foundational",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.25730966911852154,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "Stellar Agent",
        "ElementOne",
        "SenninRecon"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 2.2",
      "Name": "Manage and Control Unauthorized Assets",
      "Category": "Foundational",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.26894134935367203,
      "ReductionMax": 0.48,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "Element Portable Inspector",
        "Element Safe Port"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-04"
    },
    {
      "ID": "Control 2.3",
      "Name": "Manage and Control Air-Gapped Assets",
      "Category": "Foundational",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.26894134935367203,
      "ReductionMax": 0.48,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "Stellar Agent",
        "Element Portable Inspector",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04"
    },
    {
      "ID": "Control 2.4",
      "Name": "Deploy a Passive Asset Discovery Tool",
      "Category": "Foundational",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeOne",
        "SenninRecon"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 3.1",
      "Name": "Develop and Maintain a Software Inventory",
      "Category": "Foundational",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "Element Portable Inspector",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03; SRC-04"
    },
    {
      "ID": "Control 3.2",
      "Name": "Managing Authorized and Supported Software",
      "Category": "Endpoint",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 3.3",
      "Name": "Manage and Control Unauthorized Software",
      "Category": "Endpoint",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3511514748973963,
      "ReductionMax": 0.6,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 3.4",
      "Name": "Address EOS and EOL Software Management",
      "Category": "Endpoint",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "EdgeIPS",
        "EdgeFire",
        "Element Portable Inspector"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04"
    },
    {
      "ID": "Control 3.5",
      "Name": "Leverage Tools for Software Inventory Management",
      "Category": "Foundational",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "Stellar Agent",
        "ElementOne",
        "SenninRecon"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 3.6",
      "Name": "Allowlist of Authorized Software",
      "Category": "Endpoint",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.42013569461691125,
      "ReductionMax": 0.66,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 3.7",
      "Name": "Allowlist of Authorized Libraries",
      "Category": "Endpoint",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 3.8",
      "Name": "Allowlist of Authorized Scripts",
      "Category": "Endpoint",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3511514748973963,
      "ReductionMax": 0.6,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 4.5",
      "Name": "Secure and Manage Removable Media",
      "Category": "Media",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.43298698760031096,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "Element Portable Inspector",
        "Element Safe Port",
        "ElementOne",
        "Stellar Agent"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03; SRC-04"
    },
    {
      "ID": "Control 4.7",
      "Name": "Document and Maintain Data Flow Records",
      "Category": "Network",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "SenninRecon"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 4.9",
      "Name": "Record and Monitor Access to Sensitive Data",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10561029171830451,
      "ReductionMax": 0.3,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "EdgeOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-05"
    },
    {
      "ID": "Control 5.1",
      "Name": "Develop and Manage a Secure Configuration Process",
      "Category": "Endpoint",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 5.2",
      "Name": "Develop and Manage a Secure Configuration Process for OT Network Infrastructure",
      "Category": "Network",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "EdgeIPS",
        "EdgeFire"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 5.3",
      "Name": "Ensure Secure Management of OT Assets and Software",
      "Category": "Endpoint",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.26894134935367203,
      "ReductionMax": 0.48,
      "Enabled": false,
      "TXOneSolutions": [
        "StellarOne",
        "EdgeOne",
        "ElementOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 5.5",
      "Name": "Remove or Deactivate Unneeded Services on OT Assets and Software",
      "Category": "Endpoint",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 8.1",
      "Name": "Define and Implement a Vulnerability Management Framework",
      "Category": "Vulnerability",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.26894134935367203,
      "ReductionMax": 0.48,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "Stellar Agent",
        "SenninRecon",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-05"
    },
    {
      "ID": "Control 8.2",
      "Name": "Develop and Maintain a Remediation Framework",
      "Category": "Vulnerability",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "SenninOne",
        "EdgeOne",
        "StellarOne",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 8.3",
      "Name": "Testing and Validation Process for Software Updates",
      "Category": "Vulnerability",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne",
        "Element Portable Inspector"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03; SRC-04"
    },
    {
      "ID": "Control 8.4",
      "Name": "Perform Operating System Patches During the Maintenance Phase",
      "Category": "Vulnerability",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3718309655028642,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne",
        "Stellar Agent"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03"
    },
    {
      "ID": "Control 8.5",
      "Name": "Perform Application Patches During the Maintenance Phase",
      "Category": "Vulnerability",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3718309655028642,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne",
        "Stellar Agent"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03"
    },
    {
      "ID": "Control 8.6",
      "Name": "Perform Vulnerability Assessments on OT Assets",
      "Category": "Vulnerability",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "Stellar Agent",
        "SenninRecon",
        "Element Portable Inspector"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 8.7",
      "Name": "Remediation of Identified Vulnerabilities",
      "Category": "Vulnerability",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3511514748973963,
      "ReductionMax": 0.6,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "Stellar Agent",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-05"
    },
    {
      "ID": "Control 9.2",
      "Name": "Collect Audit Logs",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10561029171830451,
      "ReductionMax": 0.3,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "StellarOne",
        "ElementOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 9.3",
      "Name": "Maintain Adequate Audit Log Storage Capacity",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10047835992520839,
      "ReductionMax": 0.24,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "StellarOne",
        "ElementOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 9.5",
      "Name": "Record and Maintain DNS Query Logs",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10047835992520839,
      "ReductionMax": 0.24,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 9.8",
      "Name": "Consolidate and Centralize Audit Logs",
      "Category": "Detection",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "SenninOne",
        "EdgeOne",
        "StellarOne",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 9.9",
      "Name": "Maintain and Store Audit Logs",
      "Category": "Detection",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10047835992520839,
      "ReductionMax": 0.24,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "StellarOne",
        "ElementOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 10.2",
      "Name": "Leverage DNS Filtering Services",
      "Category": "Network",
      "ReductionMin": 0.06,
      "ReductionMostLikely": 0.10047835992520839,
      "ReductionMax": 0.24,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeFire",
        "EdgeIPS"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 11.1",
      "Name": "Implement and Manage Anti-Malware Solutions",
      "Category": "Endpoint",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.43298698760031096,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 11.2",
      "Name": "Implement Anti-Malware Protection for Legacy Assets",
      "Category": "Endpoint",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.43298698760031096,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "EdgeIPS",
        "EdgeFire"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03"
    },
    {
      "ID": "Control 11.3",
      "Name": "Enable and Maintain Reliable Anti-Malware Signature Updates",
      "Category": "Endpoint",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03; SRC-04"
    },
    {
      "ID": "Control 11.4",
      "Name": "Turn Off Autorun and Autoplay for Removable Media",
      "Category": "Media",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 11.5",
      "Name": "Ensure Malware Scanning for All Removable Media",
      "Category": "Media",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.444606306880081,
      "ReductionMax": 0.78,
      "Enabled": false,
      "TXOneSolutions": [
        "Element Portable Inspector",
        "Element Safe Port",
        "ElementOne",
        "Stellar Agent"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03; SRC-04"
    },
    {
      "ID": "Control 11.6",
      "Name": "Centralize Management of Anti-Malware Protection",
      "Category": "Endpoint",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 11.7",
      "Name": "Enforce a Malware-Free Policy for All Inbound and Outbound OT Assets",
      "Category": "Media",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.444606306880081,
      "ReductionMax": 0.78,
      "Enabled": false,
      "TXOneSolutions": [
        "Element Portable Inspector",
        "Element Safe Port",
        "ElementOne",
        "EdgeIPS"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-04"
    },
    {
      "ID": "Control 11.8",
      "Name": "Implement Behavior-Based Anti-Malware Solutions",
      "Category": "Endpoint",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.43298698760031096,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "Stellar Agent",
        "StellarOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-03"
    },
    {
      "ID": "Control 13.2",
      "Name": "Design and Maintain a Secure Network Architecture",
      "Category": "Network",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-06"
    },
    {
      "ID": "Control 13.3",
      "Name": "Ensure Secure Management of Network Infrastructure",
      "Category": "Network",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.26894134935367203,
      "ReductionMax": 0.48,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "EdgeIPS",
        "EdgeFire"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 13.4",
      "Name": "Develop and Maintain a Network Architecture Diagram",
      "Category": "Network",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "SenninRecon"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 13.5",
      "Name": "Enforce Remote Devices to Use a VPN Connection",
      "Category": "Remote access",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeFire"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 13.6",
      "Name": "Define and Implement a Network Policy Baseline",
      "Category": "Network",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 14.1",
      "Name": "Consolidate Security Event Alerts",
      "Category": "Detection",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.194198448501848,
      "ReductionMax": 0.42,
      "Enabled": false,
      "TXOneSolutions": [
        "SenninOne",
        "EdgeOne",
        "StellarOne",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    },
    {
      "ID": "Control 14.2",
      "Name": "Implement a Network Intrusion Detection System",
      "Category": "Detection",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeOne",
        "SenninRecon"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 14.3",
      "Name": "Implement Network Segmentation and Micro-Segmentation",
      "Category": "Network",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.43298698760031096,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-06"
    },
    {
      "ID": "Control 14.4",
      "Name": "Control and Manage Remote Asset Access",
      "Category": "Remote access",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.3511514748973963,
      "ReductionMax": 0.6,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeFire",
        "EdgeIPS",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 14.5",
      "Name": "Capture and Maintain Network Traffic Flow Logs",
      "Category": "Detection",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "SenninRecon",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 14.6",
      "Name": "Implement a Network Intrusion Prevention System",
      "Category": "Network",
      "ReductionMin": 0.3,
      "ReductionMostLikely": 0.43298698760031096,
      "ReductionMax": 0.72,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 14.7",
      "Name": "Implement Port-Level Access Controls",
      "Category": "Network",
      "ReductionMin": 0.18,
      "ReductionMostLikely": 0.2788732241271481,
      "ReductionMax": 0.54,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02"
    },
    {
      "ID": "Control 14.8",
      "Name": "Implement Protocol-Level Access Controls",
      "Category": "Network",
      "ReductionMin": 0.24,
      "ReductionMostLikely": 0.36209151292418407,
      "ReductionMax": 0.66,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeIPS",
        "EdgeFire",
        "EdgeOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-06"
    },
    {
      "ID": "Control 14.9",
      "Name": "Adjust Security Event Alerting Thresholds",
      "Category": "Detection",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "EdgeOne",
        "SenninOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-05"
    },
    {
      "ID": "Control 18.8",
      "Name": "Define and Manage Security Incident Thresholds",
      "Category": "Incident response",
      "ReductionMin": 0.12,
      "ReductionMostLikely": 0.1859154827514321,
      "ReductionMax": 0.36,
      "Enabled": false,
      "TXOneSolutions": [
        "SenninOne",
        "EdgeOne",
        "StellarOne",
        "ElementOne"
      ],
      "EvidenceSourceIds": "SRC-01; SRC-02; SRC-03; SRC-04; SRC-05"
    }
  ],
  "scenarios": [
    {
      "ID": "S-01",
      "Description": "Industrial Switch: maintenance activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-08",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-02",
      "Description": "MES Interface Node: operations activity triggers rogue device insertion.",
      "AssetID": "A-13",
      "ThreatID": "T-16"
    },
    {
      "ID": "S-03",
      "Description": "SCADA Server: vendor support activity triggers malware via removable media.",
      "AssetID": "A-03",
      "ThreatID": "T-01"
    },
    {
      "ID": "S-04",
      "Description": "Virtualization Host: maintenance activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-30",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-05",
      "Description": "CNC Controller: engineering activity triggers data exfiltration of recipes/parameters.",
      "AssetID": "A-17",
      "ThreatID": "T-18"
    },
    {
      "ID": "S-06",
      "Description": "Domain Controller (OT): maintenance activity triggers lateral movement via shared credentials.",
      "AssetID": "A-25",
      "ThreatID": "T-06"
    },
    {
      "ID": "S-07",
      "Description": "Remote I/O: maintenance activity triggers infected firmware image.",
      "AssetID": "A-07",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-08",
      "Description": "File Transfer Server: engineering activity triggers exploitation of unpatched scada server.",
      "AssetID": "A-26",
      "ThreatID": "T-09"
    },
    {
      "ID": "S-09",
      "Description": "SIS Controller: engineering activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-06",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-10",
      "Description": "Time Server (NTP): engineering activity triggers privilege escalation on ot endpoint.",
      "AssetID": "A-28",
      "ThreatID": "T-24"
    },
    {
      "ID": "S-11",
      "Description": "Time Server (NTP): engineering activity triggers denial of service on OT switch.",
      "AssetID": "A-28",
      "ThreatID": "T-20"
    },
    {
      "ID": "S-12",
      "Description": "MES Interface Node: operations activity triggers unauthorized wireless access.",
      "AssetID": "A-13",
      "ThreatID": "T-17"
    },
    {
      "ID": "S-13",
      "Description": "Industrial Switch: engineering activity triggers rogue device insertion.",
      "AssetID": "A-08",
      "ThreatID": "T-16"
    },
    {
      "ID": "S-14",
      "Description": "Virtualization Host: engineering activity triggers malicious script execution.",
      "AssetID": "A-30",
      "ThreatID": "T-27"
    },
    {
      "ID": "S-15",
      "Description": "Virtualization Host: engineering activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-30",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-16",
      "Description": "Remote I/O: vendor support activity triggers insecure file transfer between zones.",
      "AssetID": "A-07",
      "ThreatID": "T-14"
    },
    {
      "ID": "S-17",
      "Description": "Wireless AP (OT): vendor support activity triggers insecure file transfer between zones.",
      "AssetID": "A-10",
      "ThreatID": "T-14"
    },
    {
      "ID": "S-18",
      "Description": "Industrial Switch: engineering activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-08",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-19",
      "Description": "SCADA Server: vendor support activity triggers ransomware from it to OT.",
      "AssetID": "A-03",
      "ThreatID": "T-02"
    },
    {
      "ID": "S-20",
      "Description": "Industrial Firewall: vendor support activity triggers unauthorized wireless access.",
      "AssetID": "A-09",
      "ThreatID": "T-17"
    },
    {
      "ID": "S-21",
      "Description": "IIoT Gateway: operations activity triggers unauthorized software installation.",
      "AssetID": "A-11",
      "ThreatID": "T-05"
    },
    {
      "ID": "S-22",
      "Description": "Batch Server: operations activity triggers infected firmware image.",
      "AssetID": "A-14",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-23",
      "Description": "Patch Management Relay: engineering activity triggers misconfiguration of firewall rules.",
      "AssetID": "A-21",
      "ThreatID": "T-15"
    },
    {
      "ID": "S-24",
      "Description": "OPC UA Server: engineering activity triggers insecure file transfer between zones.",
      "AssetID": "A-12",
      "ThreatID": "T-14"
    },
    {
      "ID": "S-25",
      "Description": "Packaging Line PC: engineering activity triggers credential stuffing on remote access portal.",
      "AssetID": "A-18",
      "ThreatID": "T-07"
    },
    {
      "ID": "S-26",
      "Description": "Print Server (OT): operations activity triggers ransomware from it to OT.",
      "AssetID": "A-27",
      "ThreatID": "T-02"
    },
    {
      "ID": "S-27",
      "Description": "Domain Controller (OT): operations activity triggers tampering with historian data.",
      "AssetID": "A-25",
      "ThreatID": "T-19"
    },
    {
      "ID": "S-28",
      "Description": "IIoT Gateway: operations activity triggers infected firmware image.",
      "AssetID": "A-11",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-29",
      "Description": "Robot Controller: maintenance activity triggers malware via removable media.",
      "AssetID": "A-15",
      "ThreatID": "T-01"
    },
    {
      "ID": "S-30",
      "Description": "Jump Host: engineering activity triggers phishing leading to ot access.",
      "AssetID": "A-23",
      "ThreatID": "T-03"
    },
    {
      "ID": "S-31",
      "Description": "Backup Server (OT): maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-22",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-32",
      "Description": "Wireless AP (OT): operations activity triggers abuse of remote desktop.",
      "AssetID": "A-10",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-33",
      "Description": "Batch Server: maintenance activity triggers usb drop attack.",
      "AssetID": "A-14",
      "ThreatID": "T-28"
    },
    {
      "ID": "S-34",
      "Description": "Asset Management Server: vendor support activity triggers credential stuffing on remote access portal.",
      "AssetID": "A-20",
      "ThreatID": "T-07"
    },
    {
      "ID": "S-35",
      "Description": "PLC Controller: vendor support activity triggers exploitation of unpatched scada server.",
      "AssetID": "A-05",
      "ThreatID": "T-09"
    },
    {
      "ID": "S-36",
      "Description": "SIS Controller: maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-06",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-37",
      "Description": "Engineering Workstation: operations activity triggers misconfiguration of firewall rules.",
      "AssetID": "A-02",
      "ThreatID": "T-15"
    },
    {
      "ID": "S-38",
      "Description": "File Transfer Server: engineering activity triggers unsafe change to control logic.",
      "AssetID": "A-26",
      "ThreatID": "T-26"
    },
    {
      "ID": "S-39",
      "Description": "Quality Lab PC: vendor support activity triggers compromised vendor remote access.",
      "AssetID": "A-19",
      "ThreatID": "T-04"
    },
    {
      "ID": "S-40",
      "Description": "Batch Server: operations activity triggers infected firmware image.",
      "AssetID": "A-14",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-41",
      "Description": "Engineering Workstation: maintenance activity triggers ransomware from it to OT.",
      "AssetID": "A-02",
      "ThreatID": "T-02"
    },
    {
      "ID": "S-42",
      "Description": "SIS Controller: operations activity triggers denial of service on OT switch.",
      "AssetID": "A-06",
      "ThreatID": "T-20"
    },
    {
      "ID": "S-43",
      "Description": "Engineering Workstation: vendor support activity triggers data exfiltration of recipes/parameters.",
      "AssetID": "A-02",
      "ThreatID": "T-18"
    },
    {
      "ID": "S-44",
      "Description": "Industrial Switch: maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-08",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-45",
      "Description": "Print Server (OT): engineering activity triggers unauthorized wireless access.",
      "AssetID": "A-27",
      "ThreatID": "T-17"
    },
    {
      "ID": "S-46",
      "Description": "Patch Management Relay: vendor support activity triggers credential stuffing on remote access portal.",
      "AssetID": "A-21",
      "ThreatID": "T-07"
    },
    {
      "ID": "S-47",
      "Description": "Industrial Switch: vendor support activity triggers misconfiguration of firewall rules.",
      "AssetID": "A-08",
      "ThreatID": "T-15"
    },
    {
      "ID": "S-48",
      "Description": "Engineering Workstation: vendor support activity triggers exploitation of unpatched hmi.",
      "AssetID": "A-02",
      "ThreatID": "T-08"
    },
    {
      "ID": "S-49",
      "Description": "Industrial Switch: vendor support activity triggers time sync manipulation.",
      "AssetID": "A-08",
      "ThreatID": "T-21"
    },
    {
      "ID": "S-50",
      "Description": "Vision Inspection PC: maintenance activity triggers credential stuffing on remote access portal.",
      "AssetID": "A-16",
      "ThreatID": "T-07"
    },
    {
      "ID": "S-51",
      "Description": "DCS: engineering activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-31",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-52",
      "Description": "DCS: maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-31",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-53",
      "Description": "DCS: operations activity triggers denial of service on OT switch.",
      "AssetID": "A-31",
      "ThreatID": "T-20"
    },
    {
      "ID": "S-54",
      "Description": "RTU: engineering activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-32",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-55",
      "Description": "RTU: vendor support activity triggers compromised vendor remote access.",
      "AssetID": "A-32",
      "ThreatID": "T-04"
    },
    {
      "ID": "S-56",
      "Description": "RTU: operations activity triggers infected firmware image.",
      "AssetID": "A-32",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-57",
      "Description": "Emergency Shutdown Systems (ESD): engineering activity triggers unsafe change to control logic.",
      "AssetID": "A-33",
      "ThreatID": "T-26"
    },
    {
      "ID": "S-58",
      "Description": "Emergency Shutdown Systems (ESD): maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-33",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-59",
      "Description": "Emergency Shutdown Systems (ESD): operations activity triggers denial of service on OT switch.",
      "AssetID": "A-33",
      "ThreatID": "T-20"
    },
    {
      "ID": "S-60",
      "Description": "Burner Management Systems (BMS): engineering activity triggers unsafe change to control logic.",
      "AssetID": "A-34",
      "ThreatID": "T-26"
    },
    {
      "ID": "S-61",
      "Description": "Burner Management Systems (BMS): maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-34",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-62",
      "Description": "Burner Management Systems (BMS): operations activity triggers infected firmware image.",
      "AssetID": "A-34",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-63",
      "Description": "Fire and Gas Systems (FGS): engineering activity triggers exploitation of PLC engineering protocol.",
      "AssetID": "A-35",
      "ThreatID": "T-10"
    },
    {
      "ID": "S-64",
      "Description": "Fire and Gas Systems (FGS): maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-35",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-65",
      "Description": "Fire and Gas Systems (FGS): operations activity triggers infected firmware image.",
      "AssetID": "A-35",
      "ThreatID": "T-30"
    },
    {
      "ID": "S-66",
      "Description": "Maintenance Workstations: maintenance activity triggers malware via removable media.",
      "AssetID": "A-36",
      "ThreatID": "T-01"
    },
    {
      "ID": "S-67",
      "Description": "Alarm Servers: operations activity triggers tampering with historian data.",
      "AssetID": "A-37",
      "ThreatID": "T-19"
    },
    {
      "ID": "S-68",
      "Description": "Alarm Servers: maintenance activity triggers abuse of remote desktop.",
      "AssetID": "A-37",
      "ThreatID": "T-11"
    },
    {
      "ID": "S-69",
      "Description": "Alarm Servers: vendor support activity triggers insecure file transfer between zones.",
      "AssetID": "A-37",
      "ThreatID": "T-14"
    },
    {
      "ID": "S-70",
      "Description": "Advanced Process Control (APC) Servers: engineering activity triggers data exfiltration of recipes/parameters.",
      "AssetID": "A-38",
      "ThreatID": "T-18"
    },
    {
      "ID": "S-71",
      "Description": "Advanced Process Control (APC) Servers: operations activity triggers ransomware from it to OT.",
      "AssetID": "A-38",
      "ThreatID": "T-02"
    },
    {
      "ID": "S-72",
      "Description": "Industrial PCs (IPC): operations activity triggers ransomware from it to OT.",
      "AssetID": "A-39",
      "ThreatID": "T-02"
    },
    {
      "ID": "S-73",
      "Description": "Industrial PCs (IPC): maintenance activity triggers privilege escalation on ot endpoint.",
      "AssetID": "A-39",
      "ThreatID": "T-24"
    },
    {
      "ID": "S-74",
      "Description": "Configuration Management Servers: vendor support activity triggers supply chain compromised update.",
      "AssetID": "A-40",
      "ThreatID": "T-13"
    },
    {
      "ID": "S-75",
      "Description": "Configuration Management Servers: operations activity triggers backup deletion and sabotage.",
      "AssetID": "A-40",
      "ThreatID": "T-22"
    },
    {
      "ID": "S-76",
      "Description": "HVAC Control Systems: vendor support activity triggers misconfiguration of firewall rules.",
      "AssetID": "A-41",
      "ThreatID": "T-15"
    },
    {
      "ID": "S-77",
      "Description": "HVAC Control Systems: operations activity triggers denial of service on OT switch.",
      "AssetID": "A-41",
      "ThreatID": "T-20"
    },
    {
      "ID": "S-78",
      "Description": "Building Management Systems (BMS): vendor support activity triggers compromised vendor remote access.",
      "AssetID": "A-42",
      "ThreatID": "T-04"
    },
    {
      "ID": "S-79",
      "Description": "Building Management Systems (BMS): operations activity triggers ransomware from it to OT.",
      "AssetID": "A-42",
      "ThreatID": "T-02"
    },
    {
      "ID": "S-80",
      "Description": "Industrial Sensor / Transmitter: field maintenance introduces an unmanaged OT asset.",
      "AssetID": "A-43",
      "ThreatID": "T-37",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-81",
      "Description": "Variable Frequency Drive: an unauthorized OT protocol command affects process speed.",
      "AssetID": "A-44",
      "ThreatID": "T-32",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-82",
      "Description": "Safety PLC / Logic Solver: legacy platform exposure is exploited.",
      "AssetID": "A-45",
      "ThreatID": "T-33",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-83",
      "Description": "Distributed I/O Cabinet: a malformed industrial protocol causes disruption.",
      "AssetID": "A-46",
      "ThreatID": "T-38",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-84",
      "Description": "Industrial Protocol Gateway: insecure zone transfer enables lateral movement.",
      "AssetID": "A-47",
      "ThreatID": "T-14",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-85",
      "Description": "Industrial Cellular Router: exposed remote access appliance is exploited.",
      "AssetID": "A-48",
      "ThreatID": "T-34",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-86",
      "Description": "OT File Repository / NAS: ransomware moves from IT into OT data management.",
      "AssetID": "A-49",
      "ThreatID": "T-02",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-87",
      "Description": "Manufacturing Execution Server: HMI or operations configuration is modified without authorization.",
      "AssetID": "A-50",
      "ThreatID": "T-35",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-88",
      "Description": "Recipe / Batch Management Server: data exfiltration targets recipes and parameters.",
      "AssetID": "A-51",
      "ThreatID": "T-18",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-89",
      "Description": "Data Diode / OT DMZ Gateway: firewall policy misconfiguration changes conduit exposure.",
      "AssetID": "A-52",
      "ThreatID": "T-15",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-90",
      "Description": "Remote Operations Terminal: command-and-control traffic is initiated from an OT endpoint.",
      "AssetID": "A-53",
      "ThreatID": "T-36",
      "Notes": "Expanded asset scenario"
    },
    {
      "ID": "S-91",
      "Description": "Condition Monitoring Gateway: compromised newly delivered equipment is connected to the OT network.",
      "AssetID": "A-54",
      "ThreatID": "T-31",
      "Notes": "Expanded asset scenario"
    }
  ],
  "threatControlMap": [
    {
      "ThreatID": "T-01",
      "ControlID": "Control 1.6",
      "EffectOn": "TEF",
      "Justification": "Multi-engine scanning and malware-free reports validate inbound equipment and media.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-01",
      "ControlID": "Control 4.5",
      "EffectOn": "TEF",
      "Justification": "Inbound media scanning, chain-of-custody reporting, and endpoint USB policies reduce transient-device risk.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-01",
      "ControlID": "Control 11.1",
      "EffectOn": "TEF",
      "Justification": "OT-compatible anti-malware, policy management, and reporting protect supported endpoints.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-01",
      "ControlID": "Control 11.5",
      "EffectOn": "TEF",
      "Justification": "Dedicated entry-point scanning and central scan records validate USB and contractor media before OT use.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-01",
      "ControlID": "Control 11.7",
      "EffectOn": "TEF",
      "Justification": "Entry-point validation provides malware-free reports; EdgeIPS can add inline streaming anti-malware on supported network paths.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-01",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 2.1",
      "EffectOn": "TEF",
      "Justification": "Network, endpoint, portable inspection, and passive discovery sources cover connected, managed, and air-gapped assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 8.4",
      "EffectOn": "TEF",
      "Justification": "Virtual patching and endpoint compensating controls reduce exposure while OS patch deployment is planned and validated.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3718309655028642
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 11.2",
      "EffectOn": "TEF",
      "Justification": "Stellar protects legacy endpoints and Edge provides network-layer compensating controls when an agent cannot be deployed.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-02",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-03",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-03",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-03",
      "ControlID": "Control 13.5",
      "EffectOn": "TEF",
      "Justification": "EdgeFire provides site-to-site and client-to-site VPN capabilities at remote OT locations.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-03",
      "ControlID": "Control 14.4",
      "EffectOn": "TEF",
      "Justification": "VPN, firewall, IPS, and protocol-aware control protect the remote-access network path; IAM/MFA is complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-04",
      "ControlID": "Control 13.5",
      "EffectOn": "TEF",
      "Justification": "EdgeFire provides site-to-site and client-to-site VPN capabilities at remote OT locations.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-04",
      "ControlID": "Control 13.6",
      "EffectOn": "TEF",
      "Justification": "Auto rule learning and centrally governed network policies help create and maintain an OT communications baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-04",
      "ControlID": "Control 14.4",
      "EffectOn": "TEF",
      "Justification": "VPN, firewall, IPS, and protocol-aware control protect the remote-access network path; IAM/MFA is complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-04",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-04",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-05",
      "ControlID": "Control 3.2",
      "EffectOn": "TEF",
      "Justification": "Application control and centrally managed baselines restrict execution to approved OT software.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-05",
      "ControlID": "Control 3.3",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and policy management prevent or expose unauthorized executable use.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-05",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-05",
      "ControlID": "Control 3.8",
      "EffectOn": "TEF",
      "Justification": "Script and fileless-attack prevention plus application lockdown constrain unapproved script execution.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-05",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-06",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-06",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-06",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-06",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-06",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-07",
      "ControlID": "Control 13.5",
      "EffectOn": "TEF",
      "Justification": "EdgeFire provides site-to-site and client-to-site VPN capabilities at remote OT locations.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-07",
      "ControlID": "Control 14.4",
      "EffectOn": "TEF",
      "Justification": "VPN, firewall, IPS, and protocol-aware control protect the remote-access network path; IAM/MFA is complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-07",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-07",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-08",
      "ControlID": "Control 3.4",
      "EffectOn": "TEF",
      "Justification": "Stellar protects legacy endpoints while Edge virtual patching constrains unpatchable network exposure and Element assesses disconnected assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-08",
      "ControlID": "Control 8.1",
      "EffectOn": "TEF",
      "Justification": "Asset-linked CVE discovery and VSAR-based operational prioritization support a production-aware vulnerability workflow.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-08",
      "ControlID": "Control 8.4",
      "EffectOn": "TEF",
      "Justification": "Virtual patching and endpoint compensating controls reduce exposure while OS patch deployment is planned and validated.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3718309655028642
    },
    {
      "ThreatID": "T-08",
      "ControlID": "Control 8.7",
      "EffectOn": "TEF",
      "Justification": "Virtual patching, endpoint prevention, and contextual prioritization provide treatment paths for vulnerabilities that cannot be patched immediately.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-08",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-08",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-09",
      "ControlID": "Control 3.4",
      "EffectOn": "TEF",
      "Justification": "Stellar protects legacy endpoints while Edge virtual patching constrains unpatchable network exposure and Element assesses disconnected assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-09",
      "ControlID": "Control 8.1",
      "EffectOn": "TEF",
      "Justification": "Asset-linked CVE discovery and VSAR-based operational prioritization support a production-aware vulnerability workflow.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-09",
      "ControlID": "Control 8.4",
      "EffectOn": "TEF",
      "Justification": "Virtual patching and endpoint compensating controls reduce exposure while OS patch deployment is planned and validated.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3718309655028642
    },
    {
      "ThreatID": "T-09",
      "ControlID": "Control 8.7",
      "EffectOn": "TEF",
      "Justification": "Virtual patching, endpoint prevention, and contextual prioritization provide treatment paths for vulnerabilities that cannot be patched immediately.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-09",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-09",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-10",
      "ControlID": "Control 1.3",
      "EffectOn": "TEF",
      "Justification": "OT protocol DPI and policy enforcement constrain insecure protocol exposure and permitted commands.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-10",
      "ControlID": "Control 8.1",
      "EffectOn": "TEF",
      "Justification": "Asset-linked CVE discovery and VSAR-based operational prioritization support a production-aware vulnerability workflow.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-10",
      "ControlID": "Control 8.5",
      "EffectOn": "TEF",
      "Justification": "Protocol-aware virtual patching and application control provide compensating protection until application updates are approved.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3718309655028642
    },
    {
      "ThreatID": "T-10",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-10",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-10",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-11",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-11",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-11",
      "ControlID": "Control 13.5",
      "EffectOn": "TEF",
      "Justification": "EdgeFire provides site-to-site and client-to-site VPN capabilities at remote OT locations.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-11",
      "ControlID": "Control 14.4",
      "EffectOn": "TEF",
      "Justification": "VPN, firewall, IPS, and protocol-aware control protect the remote-access network path; IAM/MFA is complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-11",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-12",
      "ControlID": "Control 2.1",
      "EffectOn": "TEF",
      "Justification": "Network, endpoint, portable inspection, and passive discovery sources cover connected, managed, and air-gapped assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-12",
      "ControlID": "Control 2.4",
      "EffectOn": "TEF",
      "Justification": "Passive OT traffic analysis exposes asset identity, topology, protocols, and communication paths without active probing.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-12",
      "ControlID": "Control 13.4",
      "EffectOn": "TEF",
      "Justification": "Network Graph and passive asset visibility create an operationally maintainable topology reference.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-12",
      "ControlID": "Control 14.2",
      "EffectOn": "TEF",
      "Justification": "Passive traffic analysis detects assets, protocols, anomalous communications, and exposure without changing production traffic.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-12",
      "ControlID": "Control 14.5",
      "EffectOn": "TEF",
      "Justification": "Network Graph, traffic visibility, and cross-product correlation preserve OT communication evidence.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-13",
      "ControlID": "Control 1.2",
      "EffectOn": "TEF",
      "Justification": "Virtual patching and protocol-aware policy provide compensating protection while supplier-controlled patching is delayed.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-13",
      "ControlID": "Control 1.5",
      "EffectOn": "TEF",
      "Justification": "Agentless inspection identifies asset and vulnerability information before production acceptance.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-13",
      "ControlID": "Control 1.6",
      "EffectOn": "TEF",
      "Justification": "Multi-engine scanning and malware-free reports validate inbound equipment and media.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-13",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-13",
      "ControlID": "Control 8.3",
      "EffectOn": "TEF",
      "Justification": "Maintenance mode and inspection workflows support controlled validation before or during production change windows.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-14",
      "ControlID": "Control 1.3",
      "EffectOn": "TEF",
      "Justification": "OT protocol DPI and policy enforcement constrain insecure protocol exposure and permitted commands.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-14",
      "ControlID": "Control 4.7",
      "EffectOn": "TEF",
      "Justification": "Network graphs and passive protocol visibility document OT communication paths and flows.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-14",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-14",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-14",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-15",
      "ControlID": "Control 5.2",
      "EffectOn": "TEF",
      "Justification": "EdgeOne centralizes policy definition, review, rule learning, and deployment across network enforcement points.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-15",
      "ControlID": "Control 13.3",
      "EffectOn": "TEF",
      "Justification": "Central policy management, role-controlled administration, and device visibility support secure network control operation.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-15",
      "ControlID": "Control 13.6",
      "EffectOn": "TEF",
      "Justification": "Auto rule learning and centrally governed network policies help create and maintain an OT communications baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-15",
      "ControlID": "Control 14.9",
      "EffectOn": "TEF",
      "Justification": "Central consoles provide visibility and event prioritization to tune alert thresholds to operational context.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-16",
      "ControlID": "Control 2.2",
      "EffectOn": "TEF",
      "Justification": "Network discovery and policy enforcement identify or restrict unauthorized connections; Element screens transient devices.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-16",
      "ControlID": "Control 4.5",
      "EffectOn": "TEF",
      "Justification": "Inbound media scanning, chain-of-custody reporting, and endpoint USB policies reduce transient-device risk.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-16",
      "ControlID": "Control 11.5",
      "EffectOn": "TEF",
      "Justification": "Dedicated entry-point scanning and central scan records validate USB and contractor media before OT use.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-16",
      "ControlID": "Control 11.7",
      "EffectOn": "TEF",
      "Justification": "Entry-point validation provides malware-free reports; EdgeIPS can add inline streaming anti-malware on supported network paths.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-16",
      "ControlID": "Control 14.7",
      "EffectOn": "TEF",
      "Justification": "Network policies restrict permitted endpoints, services, and ports at enforcement points.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-17",
      "ControlID": "Control 2.1",
      "EffectOn": "TEF",
      "Justification": "Network, endpoint, portable inspection, and passive discovery sources cover connected, managed, and air-gapped assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-17",
      "ControlID": "Control 2.2",
      "EffectOn": "TEF",
      "Justification": "Network discovery and policy enforcement identify or restrict unauthorized connections; Element screens transient devices.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-17",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-17",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-17",
      "ControlID": "Control 14.7",
      "EffectOn": "TEF",
      "Justification": "Network policies restrict permitted endpoints, services, and ports at enforcement points.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-18",
      "ControlID": "Control 4.7",
      "EffectOn": "TEF",
      "Justification": "Network graphs and passive protocol visibility document OT communication paths and flows.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-18",
      "ControlID": "Control 4.9",
      "EffectOn": "TEF",
      "Justification": "Login, endpoint, network, and portfolio telemetry supports monitoring and investigation, subject to underlying system logging configuration.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10561029171830451
    },
    {
      "ThreatID": "T-18",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-18",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-18",
      "ControlID": "Control 14.5",
      "EffectOn": "TEF",
      "Justification": "Network Graph, traffic visibility, and cross-product correlation preserve OT communication evidence.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-19",
      "ControlID": "Control 4.9",
      "EffectOn": "TEF",
      "Justification": "Login, endpoint, network, and portfolio telemetry supports monitoring and investigation, subject to underlying system logging configuration.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10561029171830451
    },
    {
      "ThreatID": "T-19",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-19",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-19",
      "ControlID": "Control 14.1",
      "EffectOn": "TEF",
      "Justification": "Portfolio correlation and product alerting reduce fragmented event review and support operational prioritization.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-19",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-20",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-20",
      "ControlID": "Control 14.2",
      "EffectOn": "TEF",
      "Justification": "Passive traffic analysis detects assets, protocols, anomalous communications, and exposure without changing production traffic.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-20",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-20",
      "ControlID": "Control 14.7",
      "EffectOn": "TEF",
      "Justification": "Network policies restrict permitted endpoints, services, and ports at enforcement points.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-20",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-21",
      "ControlID": "Control 1.11",
      "EffectOn": "TEF",
      "Justification": "Portfolio consoles collect product telemetry and export reports for operational review.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10047835992520839
    },
    {
      "ThreatID": "T-21",
      "ControlID": "Control 9.2",
      "EffectOn": "TEF",
      "Justification": "Product consoles collect security events, inventory, policy, and scan results for review and export.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10561029171830451
    },
    {
      "ThreatID": "T-21",
      "ControlID": "Control 14.1",
      "EffectOn": "TEF",
      "Justification": "Portfolio correlation and product alerting reduce fragmented event review and support operational prioritization.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-21",
      "ControlID": "Control 14.5",
      "EffectOn": "TEF",
      "Justification": "Network Graph, traffic visibility, and cross-product correlation preserve OT communication evidence.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-22",
      "ControlID": "Control 4.9",
      "EffectOn": "TEF",
      "Justification": "Login, endpoint, network, and portfolio telemetry supports monitoring and investigation, subject to underlying system logging configuration.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10561029171830451
    },
    {
      "ThreatID": "T-22",
      "ControlID": "Control 9.2",
      "EffectOn": "TEF",
      "Justification": "Product consoles collect security events, inventory, policy, and scan results for review and export.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10561029171830451
    },
    {
      "ThreatID": "T-22",
      "ControlID": "Control 9.8",
      "EffectOn": "TEF",
      "Justification": "SenninOne correlates portfolio telemetry while product consoles centralize their own event and policy records.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-22",
      "ControlID": "Control 9.9",
      "EffectOn": "TEF",
      "Justification": "Product data can be retained and exported; enterprise retention controls remain complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10047835992520839
    },
    {
      "ThreatID": "T-22",
      "ControlID": "Control 18.8",
      "EffectOn": "TEF",
      "Justification": "Consolidated events and operational context support threshold definition and escalation, but do not replace an incident-response process.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-23",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-23",
      "ControlID": "Control 4.9",
      "EffectOn": "TEF",
      "Justification": "Login, endpoint, network, and portfolio telemetry supports monitoring and investigation, subject to underlying system logging configuration.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.10561029171830451
    },
    {
      "ThreatID": "T-23",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-23",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-23",
      "ControlID": "Control 14.1",
      "EffectOn": "TEF",
      "Justification": "Portfolio correlation and product alerting reduce fragmented event review and support operational prioritization.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-24",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-24",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-24",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-24",
      "ControlID": "Control 14.1",
      "EffectOn": "TEF",
      "Justification": "Portfolio correlation and product alerting reduce fragmented event review and support operational prioritization.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-25",
      "ControlID": "Control 3.6",
      "EffectOn": "TEF",
      "Justification": "Application lockdown and OT application recognition create and enforce an approved execution baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-25",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-25",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-25",
      "ControlID": "Control 14.1",
      "EffectOn": "TEF",
      "Justification": "Portfolio correlation and product alerting reduce fragmented event review and support operational prioritization.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-25",
      "ControlID": "Control 14.5",
      "EffectOn": "TEF",
      "Justification": "Network Graph, traffic visibility, and cross-product correlation preserve OT communication evidence.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-26",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-26",
      "ControlID": "Control 5.2",
      "EffectOn": "TEF",
      "Justification": "EdgeOne centralizes policy definition, review, rule learning, and deployment across network enforcement points.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-26",
      "ControlID": "Control 8.3",
      "EffectOn": "TEF",
      "Justification": "Maintenance mode and inspection workflows support controlled validation before or during production change windows.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-26",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-26",
      "ControlID": "Control 18.8",
      "EffectOn": "TEF",
      "Justification": "Consolidated events and operational context support threshold definition and escalation, but do not replace an incident-response process.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-27",
      "ControlID": "Control 3.8",
      "EffectOn": "TEF",
      "Justification": "Script and fileless-attack prevention plus application lockdown constrain unapproved script execution.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-27",
      "ControlID": "Control 11.1",
      "EffectOn": "TEF",
      "Justification": "OT-compatible anti-malware, policy management, and reporting protect supported endpoints.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-27",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-28",
      "ControlID": "Control 4.5",
      "EffectOn": "TEF",
      "Justification": "Inbound media scanning, chain-of-custody reporting, and endpoint USB policies reduce transient-device risk.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-28",
      "ControlID": "Control 11.4",
      "EffectOn": "TEF",
      "Justification": "Endpoint USB control and lockdown help limit unapproved removable-media behavior.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-28",
      "ControlID": "Control 11.5",
      "EffectOn": "TEF",
      "Justification": "Dedicated entry-point scanning and central scan records validate USB and contractor media before OT use.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-28",
      "ControlID": "Control 11.7",
      "EffectOn": "TEF",
      "Justification": "Entry-point validation provides malware-free reports; EdgeIPS can add inline streaming anti-malware on supported network paths.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-29",
      "ControlID": "Control 2.2",
      "EffectOn": "TEF",
      "Justification": "Network discovery and policy enforcement identify or restrict unauthorized connections; Element screens transient devices.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-29",
      "ControlID": "Control 4.5",
      "EffectOn": "TEF",
      "Justification": "Inbound media scanning, chain-of-custody reporting, and endpoint USB policies reduce transient-device risk.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-29",
      "ControlID": "Control 11.5",
      "EffectOn": "TEF",
      "Justification": "Dedicated entry-point scanning and central scan records validate USB and contractor media before OT use.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-29",
      "ControlID": "Control 11.7",
      "EffectOn": "TEF",
      "Justification": "Entry-point validation provides malware-free reports; EdgeIPS can add inline streaming anti-malware on supported network paths.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-29",
      "ControlID": "Control 14.4",
      "EffectOn": "TEF",
      "Justification": "VPN, firewall, IPS, and protocol-aware control protect the remote-access network path; IAM/MFA is complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-30",
      "ControlID": "Control 1.5",
      "EffectOn": "TEF",
      "Justification": "Agentless inspection identifies asset and vulnerability information before production acceptance.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-30",
      "ControlID": "Control 1.6",
      "EffectOn": "TEF",
      "Justification": "Multi-engine scanning and malware-free reports validate inbound equipment and media.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-30",
      "ControlID": "Control 8.3",
      "EffectOn": "TEF",
      "Justification": "Maintenance mode and inspection workflows support controlled validation before or during production change windows.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-30",
      "ControlID": "Control 11.7",
      "EffectOn": "TEF",
      "Justification": "Entry-point validation provides malware-free reports; EdgeIPS can add inline streaming anti-malware on supported network paths.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.444606306880081
    },
    {
      "ThreatID": "T-31",
      "ControlID": "Control 1.1",
      "EffectOn": "TEF",
      "Justification": "Element validates incoming equipment and collects asset/OS information before deployment.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-31",
      "ControlID": "Control 1.5",
      "EffectOn": "TEF",
      "Justification": "Agentless inspection identifies asset and vulnerability information before production acceptance.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-31",
      "ControlID": "Control 1.6",
      "EffectOn": "TEF",
      "Justification": "Multi-engine scanning and malware-free reports validate inbound equipment and media.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-31",
      "ControlID": "Control 1.7",
      "EffectOn": "TEF",
      "Justification": "Stellar supports OT endpoint protection compatibility, including modern and legacy Windows systems.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.42013569461691125
    },
    {
      "ThreatID": "T-31",
      "ControlID": "Control 1.8",
      "EffectOn": "TEF",
      "Justification": "Application control, operation lockdown, USB control, and baseline policies harden supported endpoints.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-32",
      "ControlID": "Control 1.3",
      "EffectOn": "TEF",
      "Justification": "OT protocol DPI and policy enforcement constrain insecure protocol exposure and permitted commands.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-32",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-32",
      "ControlID": "Control 14.3",
      "EffectOn": "TEF",
      "Justification": "Inline zone and conduit controls restrict lateral movement and enforce OT-aware communication policy.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-32",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-32",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-33",
      "ControlID": "Control 3.4",
      "EffectOn": "TEF",
      "Justification": "Stellar protects legacy endpoints while Edge virtual patching constrains unpatchable network exposure and Element assesses disconnected assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-33",
      "ControlID": "Control 8.1",
      "EffectOn": "TEF",
      "Justification": "Asset-linked CVE discovery and VSAR-based operational prioritization support a production-aware vulnerability workflow.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-33",
      "ControlID": "Control 8.4",
      "EffectOn": "TEF",
      "Justification": "Virtual patching and endpoint compensating controls reduce exposure while OS patch deployment is planned and validated.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3718309655028642
    },
    {
      "ThreatID": "T-33",
      "ControlID": "Control 8.7",
      "EffectOn": "TEF",
      "Justification": "Virtual patching, endpoint prevention, and contextual prioritization provide treatment paths for vulnerabilities that cannot be patched immediately.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-33",
      "ControlID": "Control 11.2",
      "EffectOn": "TEF",
      "Justification": "Stellar protects legacy endpoints and Edge provides network-layer compensating controls when an agent cannot be deployed.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-33",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-34",
      "ControlID": "Control 13.5",
      "EffectOn": "TEF",
      "Justification": "EdgeFire provides site-to-site and client-to-site VPN capabilities at remote OT locations.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-34",
      "ControlID": "Control 14.2",
      "EffectOn": "TEF",
      "Justification": "Passive traffic analysis detects assets, protocols, anomalous communications, and exposure without changing production traffic.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-34",
      "ControlID": "Control 14.4",
      "EffectOn": "TEF",
      "Justification": "VPN, firewall, IPS, and protocol-aware control protect the remote-access network path; IAM/MFA is complementary.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.3511514748973963
    },
    {
      "ThreatID": "T-34",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-34",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-35",
      "ControlID": "Control 5.1",
      "EffectOn": "TEF",
      "Justification": "Centralized baselines, configuration safeguards, and controlled maintenance mode support repeatable endpoint configuration control.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.194198448501848
    },
    {
      "ThreatID": "T-35",
      "ControlID": "Control 5.2",
      "EffectOn": "TEF",
      "Justification": "EdgeOne centralizes policy definition, review, rule learning, and deployment across network enforcement points.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-35",
      "ControlID": "Control 8.3",
      "EffectOn": "TEF",
      "Justification": "Maintenance mode and inspection workflows support controlled validation before or during production change windows.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-35",
      "ControlID": "Control 13.6",
      "EffectOn": "TEF",
      "Justification": "Auto rule learning and centrally governed network policies help create and maintain an OT communications baseline.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-35",
      "ControlID": "Control 18.8",
      "EffectOn": "TEF",
      "Justification": "Consolidated events and operational context support threshold definition and escalation, but do not replace an incident-response process.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-36",
      "ControlID": "Control 11.8",
      "EffectOn": "TEF",
      "Justification": "Behavioral baselines and CPSDR identify or block anomalous activity beyond signature-only detection.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-36",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-36",
      "ControlID": "Control 14.2",
      "EffectOn": "TEF",
      "Justification": "Passive traffic analysis detects assets, protocols, anomalous communications, and exposure without changing production traffic.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-36",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-36",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    },
    {
      "ThreatID": "T-37",
      "ControlID": "Control 2.1",
      "EffectOn": "TEF",
      "Justification": "Network, endpoint, portable inspection, and passive discovery sources cover connected, managed, and air-gapped assets.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.25730966911852154
    },
    {
      "ThreatID": "T-37",
      "ControlID": "Control 2.2",
      "EffectOn": "TEF",
      "Justification": "Network discovery and policy enforcement identify or restrict unauthorized connections; Element screens transient devices.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-37",
      "ControlID": "Control 2.4",
      "EffectOn": "TEF",
      "Justification": "Passive OT traffic analysis exposes asset identity, topology, protocols, and communication paths without active probing.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-37",
      "ControlID": "Control 13.4",
      "EffectOn": "TEF",
      "Justification": "Network Graph and passive asset visibility create an operationally maintainable topology reference.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.1859154827514321
    },
    {
      "ThreatID": "T-37",
      "ControlID": "Control 14.2",
      "EffectOn": "TEF",
      "Justification": "Passive traffic analysis detects assets, protocols, anomalous communications, and exposure without changing production traffic.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-38",
      "ControlID": "Control 1.3",
      "EffectOn": "TEF",
      "Justification": "OT protocol DPI and policy enforcement constrain insecure protocol exposure and permitted commands.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.26894134935367203
    },
    {
      "ThreatID": "T-38",
      "ControlID": "Control 13.2",
      "EffectOn": "TEF",
      "Justification": "OT-native enforcement points support zones, conduits, segmentation, and documented network architecture.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-38",
      "ControlID": "Control 14.2",
      "EffectOn": "TEF",
      "Justification": "Passive traffic analysis detects assets, protocols, anomalous communications, and exposure without changing production traffic.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.2788732241271481
    },
    {
      "ThreatID": "T-38",
      "ControlID": "Control 14.6",
      "EffectOn": "TEF",
      "Justification": "Inline IPS provides protocol-aware prevention, virtual patching, and policy enforcement at OT boundaries.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.43298698760031096
    },
    {
      "ThreatID": "T-38",
      "ControlID": "Control 14.8",
      "EffectOn": "TEF",
      "Justification": "Industrial protocol DPI and command-aware policy limit protocol operations to approved communications.",
      "ControlEnabled": false,
      "ReductionMostLikely": 0.36209151292418407
    }
  ]
};
