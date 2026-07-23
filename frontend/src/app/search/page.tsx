"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_LOGS } from '@/lib/mock-data';
import { Search, Clock, Filter, ChevronDown, ChevronRight, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeRanges = ['Last 15m', 'Last 1h', 'Last 4h', 'Last 24h', 'Last 7d', 'Custom'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [timeRange, setTimeRange] = useState('Last 24h');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState('All');

  const sources = ['All', 'Microsoft-Windows-Security-Auditing', 'sshd', 'Suricata'];
  const filtered = MOCK_LOGS
    .filter(log => sourceFilter === 'All' || log.provider === sourceFilter)
    .filter(log => !query || log.message.toLowerCase().includes(query.toLowerCase()) || 
      String(log.eventID).includes(query) || log.user.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Build histogram buckets
  const histBuckets = Array.from({ length: 24 }, (_, i) => {
    const count = filtered.filter(() => Math.random() > 0.3).length;
    return { hour: `${String(i).padStart(2, '0')}:00`, count: Math.floor(Math.random() * 800) + 100 };
  });
  const maxCount = Math.max(...histBuckets.map(b => b.count));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
          <Terminal className="w-8 h-8 text-primary" />SIEM Log Explorer
        </h1>
        <p className="text-slate-400">Search, filter, and investigate normalized log events across all sources</p>
      </div>

      {/* Search Bar */}
      <Card glow>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search events... (e.g. 4625, powershell, admin, failed)"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/50 font-mono" />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <select value={timeRange} onChange={e => setTimeRange(e.target.value)}
                className="bg-transparent outline-none text-slate-300 text-sm">
                {timeRanges.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-400">
              <Filter className="w-4 h-4" />
              <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}
                className="bg-transparent outline-none text-slate-300 text-sm">
                {sources.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Event Histogram */}
      <Card glow>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Event Distribution ({timeRange})</h3>
        <div className="flex items-end gap-[2px] h-20">
          {histBuckets.map((bucket, i) => (
            <div key={i} className="flex-1 group relative">
              <div className="bg-gradient-to-t from-primary/40 to-cyan-500/40 rounded-t-sm transition-all hover:from-primary/60 hover:to-cyan-500/60"
                style={{ height: `${(bucket.count / maxCount) * 100}%` }} />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs text-slate-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {bucket.hour}: {bucket.count} events
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
        </div>
      </Card>

      {/* Results */}
      <Card glow>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-slate-400">{filtered.length} events found</span>
          <span className="text-xs text-slate-500">Sorted by time (newest first)</span>
        </div>

        <div className="space-y-1 max-h-[600px] overflow-y-auto custom-scrollbar">
          {filtered.map(log => {
            const isExpanded = expandedRow === log.id;
            return (
              <div key={log.id} className="border border-white/5 rounded-lg overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors"
                  onClick={() => setExpandedRow(isExpanded ? null : log.id)}>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />}
                  <span className="text-[11px] text-slate-500 font-mono w-44 shrink-0">{new Date(log.timestamp).toLocaleString()}</span>
                  <Badge variant={log.provider === 'Suricata' ? 'High' : 'Info'} className="shrink-0 text-[10px]">{String(log.eventID)}</Badge>
                  <span className="text-sm text-slate-300 truncate">{log.message}</span>
                  <span className="text-xs text-slate-500 shrink-0 ml-auto">{log.provider}</span>
                </div>
                {isExpanded && (
                  <div className="px-4 py-3 bg-white/[0.01] border-t border-white/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                      <div><span className="text-slate-500">Source IP:</span> <span className="text-cyan-400 font-mono">{log.sourceIp}</span></div>
                      <div><span className="text-slate-500">Dest IP:</span> <span className="text-cyan-400 font-mono">{log.destIp}</span></div>
                      <div><span className="text-slate-500">User:</span> <span className="text-slate-300">{log.user}</span></div>
                      <div><span className="text-slate-500">Event ID:</span> <span className="text-amber-400 font-mono">{String(log.eventID)}</span></div>
                    </div>
                    <div className="bg-black/40 rounded p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                      <pre>{log.rawJson}</pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
