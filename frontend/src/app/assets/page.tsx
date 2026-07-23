"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_ASSETS } from '@/lib/mock-data';
import { Server, Monitor, Wifi, Cloud, Search, Shield, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  Server: Server, 'Domain Controller': Server, Workstation: Monitor,
  'Network Device': Wifi, 'Cloud Resource': Cloud,
};

export default function AssetsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const types = ['All', ...Array.from(new Set(MOCK_ASSETS.map(a => a.type)))];
  const filtered = MOCK_ASSETS
    .filter(a => typeFilter === 'All' || a.type === typeFilter)
    .filter(a => a.hostname.toLowerCase().includes(search.toLowerCase()) || a.ipAddress.includes(search));

  const stats = {
    total: MOCK_ASSETS.length,
    critical: MOCK_ASSETS.filter(a => a.riskScore >= 80).length,
    servers: MOCK_ASSETS.filter(a => a.type === 'Server' || a.type === 'Domain Controller').length,
    online: MOCK_ASSETS.filter(a => new Date(a.lastSeen) > new Date(Date.now() - 3600000)).length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">Asset Inventory</h1>
        <p className="text-slate-400">Manage and monitor all registered organizational assets</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><Server className="w-5 h-5 text-primary" /></div>
          <div><div className="text-2xl font-bold">{stats.total}</div><div className="text-xs text-slate-400">Total Assets</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg"><Activity className="w-5 h-5 text-emerald-500" /></div>
          <div><div className="text-2xl font-bold">{stats.online}</div><div className="text-xs text-slate-400">Online Now</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
          <div><div className="text-2xl font-bold">{stats.critical}</div><div className="text-xs text-slate-400">High Risk</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg"><Shield className="w-5 h-5 text-amber-500" /></div>
          <div><div className="text-2xl font-bold">{stats.servers}</div><div className="text-xs text-slate-400">Servers</div></div>
        </Card>
      </div>

      <Card glow>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search hostname or IP..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/50" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={cn("px-3 py-1.5 text-xs rounded-lg border transition-colors", typeFilter === t ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3 font-medium">Hostname</th>
                <th className="pb-3 font-medium">IP Address</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">OS</th>
                <th className="pb-3 font-medium">Risk</th>
                <th className="pb-3 font-medium">Owner</th>
                <th className="pb-3 font-medium">Last Seen</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map(asset => {
                const Icon = typeIcons[asset.type] || Server;
                return (
                  <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-200">{asset.hostname}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs text-slate-400">{asset.ipAddress}</td>
                    <td className="py-3"><Badge variant="Info">{asset.type}</Badge></td>
                    <td className="py-3 text-slate-400 text-xs">{asset.os}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", asset.riskScore >= 80 ? "bg-red-500" : asset.riskScore >= 50 ? "bg-amber-500" : "bg-emerald-500")} />
                        <span className={cn("font-mono text-xs", asset.riskScore >= 80 ? "text-red-400" : asset.riskScore >= 50 ? "text-amber-400" : "text-emerald-400")}>{asset.riskScore}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-400 text-xs">{asset.owner}</td>
                    <td className="py-3 text-xs text-slate-500">{new Date(asset.lastSeen).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-slate-500">Showing {filtered.length} of {MOCK_ASSETS.length} assets</div>
      </Card>
    </div>
  );
}
