"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MOCK_ASSETS } from '@/lib/mock-data';
import { Cpu, Shield, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function EndpointsPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_ASSETS.filter(a => a.hostname.toLowerCase().includes(search.toLowerCase()) || a.ipAddress.includes(search));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">Endpoint Security</h1>
          <p className="text-slate-400">Host visibility and EDR status</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search endpoints by hostname, IP..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <Card glow className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6 font-medium">Hostname</th>
                <th className="py-4 px-6 font-medium">IP Address</th>
                <th className="py-4 px-6 font-medium">OS / Type</th>
                <th className="py-4 px-6 font-medium">Risk Score</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(asset => (
                <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-slate-400" />
                      <span className="font-medium text-slate-200">{asset.hostname}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-slate-400">{asset.ipAddress}</td>
                  <td className="py-4 px-6">
                    <div className="text-slate-300">{asset.os}</div>
                    <div className="text-xs text-slate-500">{asset.type}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${asset.riskScore > 80 ? 'text-red-500' : asset.riskScore > 50 ? 'text-orange-500' : 'text-emerald-500'}`}>
                      {asset.riskScore}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={asset.riskScore > 80 ? 'Critical' : 'default'} className="flex items-center gap-1 w-max">
                      <Shield size={12} /> {asset.riskScore > 80 ? 'Isolated' : 'Protected'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
