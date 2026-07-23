"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Shield, Search, Plus, Play, Check, AlertTriangle, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const sampleRules = [
  { id: 'R-001', name: 'Brute Force Login Attempt', severity: 'High', mitre: 'T1110', status: 'Active', matches24h: 23, falsePositiveRate: 4.2, lastTriggered: '2 min ago' },
  { id: 'R-002', name: 'Suspicious PowerShell Download', severity: 'High', mitre: 'T1059.001', status: 'Active', matches24h: 8, falsePositiveRate: 12.5, lastTriggered: '15 min ago' },
  { id: 'R-003', name: 'Credential Dumping (Mimikatz)', severity: 'Critical', mitre: 'T1003', status: 'Active', matches24h: 2, falsePositiveRate: 0, lastTriggered: '1 hr ago' },
  { id: 'R-004', name: 'Lateral Movement via PsExec', severity: 'High', mitre: 'T1570', status: 'Active', matches24h: 5, falsePositiveRate: 8.3, lastTriggered: '30 min ago' },
  { id: 'R-005', name: 'New Service Installation', severity: 'Medium', mitre: 'T1543.003', status: 'Active', matches24h: 12, falsePositiveRate: 22.1, lastTriggered: '5 min ago' },
  { id: 'R-006', name: 'Registry Run Key Modification', severity: 'High', mitre: 'T1547.001', status: 'Active', matches24h: 3, falsePositiveRate: 6.7, lastTriggered: '45 min ago' },
  { id: 'R-007', name: 'DNS Tunneling Detection', severity: 'High', mitre: 'T1071.004', status: 'Active', matches24h: 1, falsePositiveRate: 15.0, lastTriggered: '2 hr ago' },
  { id: 'R-008', name: 'SSH Brute Force (Linux)', severity: 'High', mitre: 'T1110.003', status: 'Active', matches24h: 18, falsePositiveRate: 3.1, lastTriggered: '8 min ago' },
  { id: 'R-009', name: 'Suspicious Sudo Escalation', severity: 'Medium', mitre: 'T1548', status: 'Disabled', matches24h: 0, falsePositiveRate: 35.0, lastTriggered: 'N/A' },
  { id: 'R-010', name: 'IDS Malware Communication', severity: 'Critical', mitre: 'T1071', status: 'Active', matches24h: 4, falsePositiveRate: 2.0, lastTriggered: '20 min ago' },
  { id: 'R-011', name: 'Data Exfiltration Over HTTP', severity: 'Critical', mitre: 'T1048', status: 'Active', matches24h: 1, falsePositiveRate: 5.5, lastTriggered: '3 hr ago' },
  { id: 'R-012', name: 'Event Log Clearing', severity: 'High', mitre: 'T1070.001', status: 'Active', matches24h: 0, falsePositiveRate: 0, lastTriggered: '1 day ago' },
];

export default function DetectionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = sampleRules
    .filter(r => statusFilter === 'All' || r.status === statusFilter)
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.mitre.includes(search));

  const activeRules = sampleRules.filter(r => r.status === 'Active').length;
  const totalMatches = sampleRules.reduce((s, r) => s + r.matches24h, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
            <FileCode2 className="w-8 h-8 text-primary" />Detection Rules
          </h1>
          <p className="text-slate-400">Manage Sigma detection rules, test against historical logs, and track performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">
          <Plus className="w-4 h-4" /> Create Rule
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><Shield className="w-5 h-5 text-primary" /></div>
          <div><div className="text-2xl font-bold">{sampleRules.length}</div><div className="text-xs text-slate-400">Total Rules</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg"><Check className="w-5 h-5 text-emerald-500" /></div>
          <div><div className="text-2xl font-bold">{activeRules}</div><div className="text-xs text-slate-400">Active Rules</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
          <div><div className="text-2xl font-bold">{totalMatches}</div><div className="text-xs text-slate-400">Matches (24h)</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg"><Play className="w-5 h-5 text-red-500" /></div>
          <div><div className="text-2xl font-bold">{sampleRules.filter(r => r.severity === 'Critical').length}</div><div className="text-xs text-slate-400">Critical Rules</div></div>
        </Card>
      </div>

      <Card glow>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search rule name or MITRE technique..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/50" />
          </div>
          <div className="flex gap-2">
            {['All', 'Active', 'Disabled'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={cn("px-3 py-1.5 text-xs rounded-lg border transition-colors", statusFilter === s ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Rule Name</th>
                <th className="pb-3 font-medium">Severity</th>
                <th className="pb-3 font-medium">MITRE</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Matches 24h</th>
                <th className="pb-3 font-medium">FP Rate</th>
                <th className="pb-3 font-medium">Last Triggered</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map(rule => (
                <tr key={rule.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="py-3 font-mono text-xs text-slate-400">{rule.id}</td>
                  <td className="py-3 font-medium text-slate-200">{rule.name}</td>
                  <td className="py-3"><Badge variant={rule.severity as 'Critical' | 'High' | 'Medium'}>{rule.severity}</Badge></td>
                  <td className="py-3 font-mono text-xs text-cyan-400">{rule.mitre}</td>
                  <td className="py-3">
                    <span className={cn("inline-flex items-center gap-1 text-xs", rule.status === 'Active' ? "text-emerald-400" : "text-slate-500")}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", rule.status === 'Active' ? "bg-emerald-500" : "bg-slate-600")} />
                      {rule.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-xs text-slate-300">{rule.matches24h}</td>
                  <td className="py-3">
                    <span className={cn("font-mono text-xs", rule.falsePositiveRate > 20 ? "text-red-400" : rule.falsePositiveRate > 10 ? "text-amber-400" : "text-emerald-400")}>
                      {rule.falsePositiveRate}%
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-500">{rule.lastTriggered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
