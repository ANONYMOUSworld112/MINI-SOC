import { Alert, Incident, Asset, LogEvent, MitreTechnique, IOC, Severity, IncidentStatus, AlertStatus } from './types';
import { MITRE_TACTICS } from './constants';

const severities: Severity[] = ['Critical', 'High', 'Medium', 'Low', 'Info'];
const incidentStatuses: IncidentStatus[] = ['New', 'Investigating', 'Containment', 'Eradication', 'Recovery', 'Resolved'];
const alertStatuses: AlertStatus[] = ['Open', 'Investigating', 'Resolved', 'False Positive'];

// Helpers for generation
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomIP = () => `${randomInt(10, 192)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

export const MOCK_ALERTS: Alert[] = Array.from({ length: 45 }).map((_, i) => {
  const isCritical = i < 5;
  const mitre = [
    { tactic: 'Execution', technique: 'T1059.001' },
    { tactic: 'Credential Access', technique: 'T1110' },
    { tactic: 'Impact', technique: 'T1486' },
    { tactic: 'Exfiltration', technique: 'T1041' },
    { tactic: 'Persistence', technique: 'T1543' },
    { tactic: 'Defense Evasion', technique: 'T1070' },
    { tactic: 'Lateral Movement', technique: 'T1021' },
  ];
  const m = randomChoice(mitre);
  
  return {
    id: `ALT-10${i + 10}`,
    title: isCritical ? 'Ransomware Extension Detected' : randomChoice(['Suspicious PowerShell Execution', 'Multiple Failed Logins', 'Unusual outbound traffic to RU', 'New Service Created', 'Log Clearing Detected', 'SMB Brute Force', 'Pass-the-Hash Detected']),
    severity: isCritical ? 'Critical' : randomChoice(severities),
    timestamp: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
    source: randomChoice(['Endpoint Detection', 'Active Directory', 'EDR', 'Firewall', 'Sysmon', 'Suricata']),
    description: `Alert generated due to suspicious activity involving ${randomIP()} or host WS-${randomInt(10, 99)}`,
    mitreTactic: m.tactic,
    mitreTechnique: m.technique,
    status: randomChoice(alertStatuses),
    assignedTo: i % 3 === 0 ? 'SOC Analyst 1' : undefined,
    tags: ['malware', 'network', 'auth'].slice(0, randomInt(1, 3))
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const MOCK_INCIDENTS: Incident[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `INC-20${i}`,
  title: `${randomChoice(['Potential Ransomware Infection', 'Brute Force Attack', 'Data Exfiltration', 'Malware Outbreak', 'Compromised Credentials'])} on ${randomChoice(['FS-01', 'VPN-GW', 'DC-02', 'WS-042', 'WEB-01'])}`,
  severity: randomChoice(severities),
  status: randomChoice(incidentStatuses),
  createdAt: randomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()),
  updatedAt: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
  assignee: randomChoice(['Alice Smith', 'Bob Jones', 'Charlie Brown', 'Unassigned']),
  description: 'Incident created from correlated alerts indicating unauthorized access and potential lateral movement.',
  alerts: [MOCK_ALERTS[randomInt(0, 10)].id, MOCK_ALERTS[randomInt(11, 20)].id],
  assetsAffected: [`AST-00${randomInt(1, 9)}`, `AST-01${randomInt(0, 9)}`],
  slaCountdown: randomInt(1, 48)
}));

export const MOCK_ASSETS: Asset[] = Array.from({ length: 35 }).map((_, i) => ({
  id: `AST-00${i + 1}`,
  hostname: `${randomChoice(['WIN-SRV', 'FS', 'WS', 'LNX', 'DC'])}-${randomInt(1, 99)}`,
  ipAddress: randomIP(),
  type: randomChoice(['Workstation', 'Server', 'Domain Controller', 'Network Device', 'Cloud Resource']),
  os: randomChoice(['Windows Server 2019', 'Windows Server 2022', 'Windows 11', 'Ubuntu 22.04', 'Cisco IOS']),
  riskScore: randomInt(10, 99),
  lastSeen: randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
  owner: randomChoice(['IT Ops', 'Storage Team', 'Sales', 'HR', 'Engineering']),
  tags: [randomChoice(['critical', 'database', 'fileserver', 'workstation', 'dmz'])]
}));

export const MOCK_LOGS: LogEvent[] = Array.from({ length: 60 }).map((_, i) => ({
  id: `LOG-500${i}`,
  timestamp: randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
  sourceIp: randomIP(),
  destIp: randomIP(),
  eventID: randomChoice([4624, 4625, 4688, 4720, 'syslog-auth', 'suricata-alert']),
  provider: randomChoice(['Microsoft-Windows-Security-Auditing', 'sshd', 'Suricata']),
  user: randomChoice(['SYSTEM', 'admin', 'jdoe', 'asmith', 'root']),
  message: randomChoice(['An account was successfully logged on.', 'An account failed to log on.', 'A new process has been created.', 'A user account was created.', 'Failed password for root', 'ET MALWARE Suspicious User-Agent']),
  rawJson: '{"Event": {"System": {"Provider": {"Name": "Microsoft-Windows-Security-Auditing"}}}}'
}));

export const MOCK_IOCS: IOC[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `IOC-800${i}`,
  type: randomChoice(['IP', 'Domain', 'Hash', 'URL']),
  value: randomChoice(['185.11.22.33', 'malicious-domain.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'http://phishing.com/login']),
  threatActor: randomChoice(['APT28', 'Lazarus Group', 'Cozy Bear', 'Unknown']),
  confidence: randomInt(40, 100),
  firstSeen: randomDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()),
  lastSeen: randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
  source: randomChoice(['CrowdStrike', 'AlienVault OTX', 'Internal Sandbox', 'ThreatConnect'])
}));

const mitreTechniquesBase = [
  { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution' },
  { id: 'T1110', name: 'Brute Force', tactic: 'Credential Access' },
  { id: 'T1486', name: 'Data Encrypted for Impact', tactic: 'Impact' },
  { id: 'T1041', name: 'Exfiltration Over C2 Channel', tactic: 'Exfiltration' },
  { id: 'T1543', name: 'Create or Modify System Process', tactic: 'Persistence' },
  { id: 'T1070', name: 'Indicator Removal on Host', tactic: 'Defense Evasion' },
  { id: 'T1021', name: 'Remote Services', tactic: 'Lateral Movement' },
  { id: 'T1566', name: 'Phishing', tactic: 'Initial Access' },
  { id: 'T1046', name: 'Network Service Discovery', tactic: 'Discovery' },
  { id: 'T1119', name: 'Automated Collection', tactic: 'Collection' },
  { id: 'T1071', name: 'Application Layer Protocol', tactic: 'Command and Control' }
];

export const MOCK_MITRE_TECHNIQUES: MitreTechnique[] = mitreTechniquesBase.map(t => ({
  ...t,
  description: `Adversaries may use ${t.name} to achieve ${t.tactic}.`,
  platforms: ['Windows', 'Linux', 'macOS'],
  dataSources: ['Process: Process Creation', 'File: File Creation'],
  coverage: randomInt(20, 100),
  recentAlerts: randomInt(0, 15)
}));

// Also generate full coverage matrix mapping
MITRE_TACTICS.forEach(tactic => {
  if (!MOCK_MITRE_TECHNIQUES.find(t => t.tactic === tactic)) {
    MOCK_MITRE_TECHNIQUES.push({
      id: `T19${randomInt(0, 99)}`,
      name: `Generic ${tactic} Technique`,
      tactic,
      description: `Simulated technique for ${tactic}`,
      platforms: ['Windows'],
      dataSources: ['Network Traffic'],
      coverage: randomInt(0, 80),
      recentAlerts: randomInt(0, 3)
    });
  }
});
