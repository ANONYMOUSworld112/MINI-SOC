export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type IncidentStatus = 'New' | 'Investigating' | 'Containment' | 'Eradication' | 'Recovery' | 'Resolved';
export type AlertStatus = 'Open' | 'Investigating' | 'Resolved' | 'False Positive';

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  timestamp: string;
  source: string;
  description: string;
  mitreTactic?: string;
  mitreTechnique?: string;
  status: AlertStatus;
  assignedTo?: string;
  tags: string[];
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  assignee: string;
  description: string;
  alerts: string[];
  assetsAffected: string[];
  slaCountdown?: number; // hours remaining
}

export interface Asset {
  id: string;
  hostname: string;
  ipAddress: string;
  type: 'Workstation' | 'Server' | 'Domain Controller' | 'Network Device' | 'Cloud Resource';
  os: string;
  riskScore: number;
  lastSeen: string;
  owner: string;
  tags: string[];
}

export interface LogEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  eventID: number | string;
  provider: string;
  user: string;
  message: string;
  rawJson: string;
}

export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  description: string;
  platforms: string[];
  dataSources: string[];
  coverage: number; // 0-100%
  recentAlerts: number;
}

export interface IOC {
  id: string;
  type: 'IP' | 'Domain' | 'Hash' | 'URL';
  value: string;
  threatActor?: string;
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  source: string;
}

export interface DetectionRule {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  mitreTechniques: string[];
  enabled: boolean;
  author: string;
  lastUpdated: string;
  query: string;
}
