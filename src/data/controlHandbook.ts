/**
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

export const CONTROL_HANDBOOK: ControlHandbookEntry[] = [
  {
    "ID": "Control 1.1",
    "Name": "Ensure Equipment is Shipped with Supported Operating Systems",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 1.2",
    "Name": "Patch Application Procedures from Equipment Suppliers",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 1.3",
    "Name": "Require Secure Transmission Protocols in Equipment",
    "Category": "Network"
  },
  {
    "ID": "Control 1.4",
    "Name": "Network Configuration Documentation and Maintenance Guidelines",
    "Category": "Network"
  },
  {
    "ID": "Control 1.5",
    "Name": "Pre-Shipment Vulnerability Scan and Report",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 1.6",
    "Name": "Pre-Shipment Malware Scanning and Reporting",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 1.7",
    "Name": "Compatible Anti-Malware Solutions for Equipment",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 1.8",
    "Name": "Equipment Security Hardening",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 1.9",
    "Name": "Authentication Requirements for OS and Equipment Access Control",
    "Category": "Access control"
  },
  {
    "ID": "Control 1.10",
    "Name": "Access Control Solutions for Least Privilege",
    "Category": "Access control"
  },
  {
    "ID": "Control 1.11",
    "Name": "Logging and Exporting Security Events for Equipment",
    "Category": "Detection"
  },
  {
    "ID": "Control 1.12",
    "Name": "Required Event Log Types and Contents",
    "Category": "Detection"
  },
  {
    "ID": "Control 2.1",
    "Name": "Develop and Maintain an OT Asset Inventory",
    "Category": "Foundational"
  },
  {
    "ID": "Control 2.2",
    "Name": "Manage and Control Unauthorized Assets",
    "Category": "Foundational"
  },
  {
    "ID": "Control 2.3",
    "Name": "Manage and Control Air-Gapped Assets",
    "Category": "Foundational"
  },
  {
    "ID": "Control 2.4",
    "Name": "Deploy a Passive Asset Discovery Tool",
    "Category": "Foundational"
  },
  {
    "ID": "Control 3.1",
    "Name": "Develop and Maintain a Software Inventory",
    "Category": "Foundational"
  },
  {
    "ID": "Control 3.2",
    "Name": "Managing Authorized and Supported Software",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 3.3",
    "Name": "Manage and Control Unauthorized Software",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 3.4",
    "Name": "Address EOS and EOL Software Management",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 3.5",
    "Name": "Leverage Tools for Software Inventory Management",
    "Category": "Foundational"
  },
  {
    "ID": "Control 3.6",
    "Name": "Allowlist of Authorized Software",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 3.7",
    "Name": "Allowlist of Authorized Libraries",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 3.8",
    "Name": "Allowlist of Authorized Scripts",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 4.1",
    "Name": "Develop and Maintain a Data Management Framework",
    "Category": "Data"
  },
  {
    "ID": "Control 4.2",
    "Name": "Create and Manage a Data Inventory",
    "Category": "Data"
  },
  {
    "ID": "Control 4.3",
    "Name": "Set Up and Manage Data Access Permissions",
    "Category": "Data"
  },
  {
    "ID": "Control 4.4",
    "Name": "Implement Data Retention Policies",
    "Category": "Data"
  },
  {
    "ID": "Control 4.5",
    "Name": "Secure and Manage Removable Media",
    "Category": "Media"
  },
  {
    "ID": "Control 4.6",
    "Name": "Protect Sensitive Data During Transmission",
    "Category": "Data"
  },
  {
    "ID": "Control 4.7",
    "Name": "Document and Maintain Data Flow Records",
    "Category": "Network"
  },
  {
    "ID": "Control 4.8",
    "Name": "Secure Sensitive Data at Rest",
    "Category": "Data"
  },
  {
    "ID": "Control 4.9",
    "Name": "Record and Monitor Access to Sensitive Data",
    "Category": "Detection"
  },
  {
    "ID": "Control 5.1",
    "Name": "Develop and Manage a Secure Configuration Process",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 5.2",
    "Name": "Develop and Manage a Secure Configuration Process for OT Network Infrastructure",
    "Category": "Network"
  },
  {
    "ID": "Control 5.3",
    "Name": "Ensure Secure Management of OT Assets and Software",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 5.4",
    "Name": "Control and Secure Default Accounts on OT Assets and Software",
    "Category": "Access control"
  },
  {
    "ID": "Control 5.5",
    "Name": "Remove or Deactivate Unneeded Services on OT Assets and Software",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 5.6",
    "Name": "Configure and Use Trusted DNS Servers on OT Assets",
    "Category": "Network"
  },
  {
    "ID": "Control 6.1",
    "Name": "Develop and Maintain an Inventory of Accounts",
    "Category": "Access control"
  },
  {
    "ID": "Control 6.2",
    "Name": "Use Unique Passwords for OT Assets",
    "Category": "Access control"
  },
  {
    "ID": "Control 6.3",
    "Name": "Deactivate Inactive Accounts",
    "Category": "Access control"
  },
  {
    "ID": "Control 6.4",
    "Name": "Limit Administrative Privileges to Designated Administrator Accounts",
    "Category": "Access control"
  },
  {
    "ID": "Control 7.1",
    "Name": "Define and Implement an Access Approval Process",
    "Category": "Access control"
  },
  {
    "ID": "Control 7.2",
    "Name": "Implement a Process for Revoking Access",
    "Category": "Access control"
  },
  {
    "ID": "Control 7.3",
    "Name": "Enforce Multi-Factor Authentication for Remote Network Access",
    "Category": "Remote access"
  },
  {
    "ID": "Control 7.4",
    "Name": "Enforce Multi-Factor Authentication for Administrator Access",
    "Category": "Access control"
  },
  {
    "ID": "Control 8.1",
    "Name": "Define and Implement a Vulnerability Management Framework",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 8.2",
    "Name": "Develop and Maintain a Remediation Framework",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 8.3",
    "Name": "Testing and Validation Process for Software Updates",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 8.4",
    "Name": "Perform Operating System Patches During the Maintenance Phase",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 8.5",
    "Name": "Perform Application Patches During the Maintenance Phase",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 8.6",
    "Name": "Perform Vulnerability Assessments on OT Assets",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 8.7",
    "Name": "Remediation of Identified Vulnerabilities",
    "Category": "Vulnerability"
  },
  {
    "ID": "Control 9.1",
    "Name": "Develop and Maintain an Audit Log Management Framework",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.2",
    "Name": "Collect Audit Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.3",
    "Name": "Maintain Adequate Audit Log Storage Capacity",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.4",
    "Name": "Establish Consistent Time Synchronization",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.5",
    "Name": "Record and Maintain DNS Query Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.6",
    "Name": "Record and Maintain URL Request Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.7",
    "Name": "Record and Maintain Command-Line Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.8",
    "Name": "Consolidate and Centralize Audit Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.9",
    "Name": "Maintain and Store Audit Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 9.10",
    "Name": "Collect and Maintain Service Provider Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 10.1",
    "Name": "Enforce the Use of Supported Web Browsers on OT Assets",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 10.2",
    "Name": "Leverage DNS Filtering Services",
    "Category": "Network"
  },
  {
    "ID": "Control 10.3",
    "Name": "Implement and Enforce Network-Level URL Filtering",
    "Category": "Network"
  },
  {
    "ID": "Control 10.4",
    "Name": "Disable Unnecessary or Unauthorized Browser Extensions",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 11.1",
    "Name": "Implement and Manage Anti-Malware Solutions",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 11.2",
    "Name": "Implement Anti-Malware Protection for Legacy Assets",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 11.3",
    "Name": "Enable and Maintain Reliable Anti-Malware Signature Updates",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 11.4",
    "Name": "Turn Off Autorun and Autoplay for Removable Media",
    "Category": "Media"
  },
  {
    "ID": "Control 11.5",
    "Name": "Ensure Malware Scanning for All Removable Media",
    "Category": "Media"
  },
  {
    "ID": "Control 11.6",
    "Name": "Centralize Management of Anti-Malware Protection",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 11.7",
    "Name": "Enforce a Malware-Free Policy for All Inbound and Outbound OT Assets",
    "Category": "Media"
  },
  {
    "ID": "Control 11.8",
    "Name": "Implement Behavior-Based Anti-Malware Solutions",
    "Category": "Endpoint"
  },
  {
    "ID": "Control 12.1",
    "Name": "Develop and Maintain a Data Recovery Framework",
    "Category": "Recovery"
  },
  {
    "ID": "Control 12.2",
    "Name": "Conduct Automated Data Backups",
    "Category": "Recovery"
  },
  {
    "ID": "Control 12.3",
    "Name": "Ensure Recovery Data Integrity and Security",
    "Category": "Recovery"
  },
  {
    "ID": "Control 12.4",
    "Name": "Create and Maintain an Isolated Recovery Data Instance",
    "Category": "Recovery"
  },
  {
    "ID": "Control 12.5",
    "Name": "Regularly Test Recovery Data",
    "Category": "Recovery"
  },
  {
    "ID": "Control 13.1",
    "Name": "Ensure Network Infrastructure is Up to Date",
    "Category": "Network"
  },
  {
    "ID": "Control 13.2",
    "Name": "Design and Maintain a Secure Network Architecture",
    "Category": "Network"
  },
  {
    "ID": "Control 13.3",
    "Name": "Ensure Secure Management of Network Infrastructure",
    "Category": "Network"
  },
  {
    "ID": "Control 13.4",
    "Name": "Develop and Maintain a Network Architecture Diagram",
    "Category": "Network"
  },
  {
    "ID": "Control 13.5",
    "Name": "Enforce Remote Devices to Use a VPN Connection",
    "Category": "Remote access"
  },
  {
    "ID": "Control 13.6",
    "Name": "Define and Implement a Network Policy Baseline",
    "Category": "Network"
  },
  {
    "ID": "Control 14.1",
    "Name": "Consolidate Security Event Alerts",
    "Category": "Detection"
  },
  {
    "ID": "Control 14.2",
    "Name": "Implement a Network Intrusion Detection System",
    "Category": "Detection"
  },
  {
    "ID": "Control 14.3",
    "Name": "Implement Network Segmentation and Micro-Segmentation",
    "Category": "Network"
  },
  {
    "ID": "Control 14.4",
    "Name": "Control and Manage Remote Asset Access",
    "Category": "Remote access"
  },
  {
    "ID": "Control 14.5",
    "Name": "Capture and Maintain Network Traffic Flow Logs",
    "Category": "Detection"
  },
  {
    "ID": "Control 14.6",
    "Name": "Implement a Network Intrusion Prevention System",
    "Category": "Network"
  },
  {
    "ID": "Control 14.7",
    "Name": "Implement Port-Level Access Controls",
    "Category": "Network"
  },
  {
    "ID": "Control 14.8",
    "Name": "Implement Protocol-Level Access Controls",
    "Category": "Network"
  },
  {
    "ID": "Control 14.9",
    "Name": "Adjust Security Event Alerting Thresholds",
    "Category": "Detection"
  },
  {
    "ID": "Control 15.1",
    "Name": "Develop and Maintain a Security Awareness Program for OT Personnel",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.2",
    "Name": "Train OT Personnel to Detect Social Engineering Attacks",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.3",
    "Name": "Train OT Personnel on Authentication Best Practices",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.4",
    "Name": "Train OT Personnel on Data Handling Best Practices",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.5",
    "Name": "Train OT Personnel on Causes of Unintentional Data Exposure",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.6",
    "Name": "Train OT Personnel on Recognizing and Reporting Security Incidents",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.7",
    "Name": "Train OT Personnel to Report Missing Security Updates",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.8",
    "Name": "Train OT Personnel on Risks of Insecure Removable Devices",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.9",
    "Name": "Train OT Personnel on Identifying Insider Threats",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 15.10",
    "Name": "Provide Role-Based Security Awareness and Skills Training",
    "Category": "Awareness & training"
  },
  {
    "ID": "Control 16.1",
    "Name": "Create and Manage a Provider Inventory",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 16.2",
    "Name": "Develop and Maintain a Provider Management Policy",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 16.3",
    "Name": "Classify Providers",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 16.4",
    "Name": "Include Security Requirements in Provider Contracts",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 16.5",
    "Name": "Assess Providers",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 16.6",
    "Name": "Monitor Providers",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 16.7",
    "Name": "Securely Decommission Providers",
    "Category": "Supply chain"
  },
  {
    "ID": "Control 17.1",
    "Name": "Develop and Maintain a Secure Application Development Framework",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.2",
    "Name": "Develop and Manage a Process for Handling Software Vulnerabilities",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.3",
    "Name": "Conduct Root Cause Analysis of Security Vulnerabilities",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.4",
    "Name": "Create and Maintain an Inventory of Third-Party Software Components",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.5",
    "Name": "Use Trusted and Up-to-Date Third-Party Software Components",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.6",
    "Name": "Develop and Maintain a Severity Rating System for Application Vulnerabilities",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.7",
    "Name": "Separate Production and Non-Production Systems",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.8",
    "Name": "Train Developers in Application Security Concepts and Secure Coding",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.9",
    "Name": "Adopt Secure Design Principles in Application Architectures",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.10",
    "Name": "Implement Code-Level Security Checks",
    "Category": "Application security"
  },
  {
    "ID": "Control 17.11",
    "Name": "Conduct Threat Modeling",
    "Category": "Application security"
  },
  {
    "ID": "Control 18.1",
    "Name": "Assign Personnel for Cybersecurity Incident Handling",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.2",
    "Name": "Develop and Maintain Contact Information for Reporting Security Incidents",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.3",
    "Name": "Develop and Maintain a Process for Reporting OT Incidents",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.4",
    "Name": "Assign Key Roles and Responsibilities",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.5",
    "Name": "Define Mechanisms for Communicating During Incident Response",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.6",
    "Name": "Perform Regular Incident Response Drills",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.7",
    "Name": "Perform Post-Incident Analysis",
    "Category": "Incident response"
  },
  {
    "ID": "Control 18.8",
    "Name": "Define and Manage Security Incident Thresholds",
    "Category": "Incident response"
  }
];
