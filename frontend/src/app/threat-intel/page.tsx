"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_IOCS } from '@/lib/mock-data';
import { Globe, Search, Shield, AlertTriangle, Hash, Link2, Mail, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  IP: Globe, Domain: Link2, Hash: Hash, URL: Link2, Email: Mail,
};

export default function ThreatIntelPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const types = ['All', ...Array.from(new Set(MOCK_IOCS.map(i => i.type)))];
  const filtered = MOCK_IOCS
    .filter(i => typeFilter === 'All' || i.type === typeFilter)
    .filter(i => i.value.toLowerCase().includes(search.toLowerCase()) || (i.threatActor?.toLowerCase() || '').includes(search.toLowerCase()));

  const stats = {
    total: MOCK_IOCS.length,
    highConf: MOCK_IOCS.filter(i => i.confidence >= 80).length,
    actors: new Set(MOCK_IOCS.map(i => i.threatActor).filter(Boolean)).size,
    sources: new Set(MOCK_IOCS.map(i => i.source)).size,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
          <Eye className="w-8 h-8 text-primary" />Threat Intelligence
        </h1>
        <p className="text-slate-400">IOC management, threat feed ingestion, and indicator enrichment</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><Shield className="w-5 h-5 text-primary" /></div>
          <div><div className="text-2xl font-bold">{stats.total}</div><div className="text-xs text-slate-400">Total IOCs</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
          <div><div className="text-2xl font-bold">{stats.highConf}</div><div className="text-xs text-slate-400">High Confidence</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg"><Globe className="w-5 h-5 text-amber-500" /></div>
          <div><div className="text-2xl font-bold">{stats.actors}</div><div className="text-xs text-slate-400">Threat Actors</div></div>
        </Card>
        <Card glow className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg"><Link2 className="w-5 h-5 text-emerald-500" /></div>
          <div><div className="text-2xl font-bold">{stats.sources}</div><div className="text-xs text-slate-400">Intel Sources</div></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card glow>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Search IOC value or threat actor..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/50" />
              </div>
              <div className="flex gap-2">
                {types.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className={cn("px-3 py-1.5 text-xs rounded-lg border transition-colors", typeFilter === t ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filtered.map(ioc => {
                const Icon = typeIcons[ioc.type] || Globe;
                return (
                  <div key={ioc.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn("p-2 rounded-lg", ioc.confidence >= 80 ? "bg-red-500/10" : "bg-amber-500/10")}>
                        <Icon className={cn("w-4 h-4", ioc.confidence >= 80 ? "text-red-400" : "text-amber-400")} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-sm text-slate-200 truncate">{ioc.value}</div>
                        <div className="text-xs text-slate-500">{ioc.threatActor} • {ioc.source}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={ioc.type === 'IP' ? 'Info' : ioc.type === 'Hash' ? 'Medium' : 'Low'}>{ioc.type}</Badge>
                      <div className="text-xs font-mono text-slate-400">{ioc.confidence}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-xs text-slate-500">{filtered.length} indicators found</div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card glow>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Threat Feed Status</h3>
            <div className="space-y-3">
              {['AlienVault OTX', 'CrowdStrike Intel', 'MISP Community', 'AbuseIPDB'].map((feed, i) => (
                <div key={feed} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", i < 3 ? "bg-emerald-500" : "bg-amber-500")} />
                    <span className="text-sm text-slate-300">{feed}</span>
                  </div>
                  <span className="text-xs text-slate-500">{i < 3 ? 'Active' : 'Stale'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card glow>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">IOC Type Distribution</h3>
            <div className="space-y-2">
              {types.filter(t => t !== 'All').map(type => {
                const count = MOCK_IOCS.filter(i => i.type === type).length;
                const pct = Math.round((count / MOCK_IOCS.length) * 100);
                return (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{type}</span>
                      <span className="text-slate-500">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card glow>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Top Threat Actors</h3>
            <div className="space-y-2">
              {Array.from(new Set(MOCK_IOCS.map(i => i.threatActor).filter(Boolean))).slice(0, 5).map(actor => (
                <div key={actor} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-slate-300">{actor}</span>
                  <span className="text-xs text-slate-500 font-mono">{MOCK_IOCS.filter(i => i.threatActor === actor).length} IOCs</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
