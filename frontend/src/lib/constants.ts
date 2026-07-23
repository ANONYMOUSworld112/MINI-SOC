import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Crosshair, 
  Search, 
  Server, 
  Globe, 
  Cpu, 
  HeartPulse, 
  Settings,
  Bot,
  Radar,
  Terminal
} from 'lucide-react';

export const NAVIGATION = [
  {
    group: 'OVERVIEW',
    items: [
      { name: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'SOC Overview', path: '/soc', icon: Activity },
    ]
  },
  {
    group: 'SECURITY',
    items: [
      { name: 'Alerts', path: '/alerts', icon: ShieldAlert, badge: 12 },
      { name: 'Incidents', path: '/incidents', icon: Crosshair, badge: 3 },
      { name: 'Detections', path: '/detections', icon: Radar },
      { name: 'Log Explorer', path: '/search', icon: Terminal },
    ]
  },
  {
    group: 'INTELLIGENCE',
    items: [
      { name: 'MITRE ATT&CK', path: '/mitre', icon: Globe },
      { name: 'Threat Intel', path: '/threat-intel', icon: Search },
      { name: 'Hunt', path: '/hunt', icon: Crosshair },
    ]
  },
  {
    group: 'ASSETS',
    items: [
      { name: 'Asset Inventory', path: '/assets', icon: Server },
      { name: 'Endpoints', path: '/endpoints', icon: Cpu },
      { name: 'Network', path: '/network', icon: Activity },
    ]
  },
  {
    group: 'SYSTEM',
    items: [
      { name: 'AI Copilot', path: '/copilot', icon: Bot },
      { name: 'Health', path: '/health', icon: HeartPulse },
      { name: 'Settings', path: '/settings', icon: Settings },
    ]
  }
];

export const MITRE_TACTICS = [
  'Reconnaissance', 'Resource Development', 'Initial Access', 'Execution', 
  'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access', 
  'Discovery', 'Lateral Movement', 'Collection', 'Command and Control', 
  'Exfiltration', 'Impact'
];

export const SEVERITY_COLORS = {
  Critical: 'text-red-500 bg-red-500/10 border-red-500/20',
  High: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  Medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  Low: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  Info: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};
