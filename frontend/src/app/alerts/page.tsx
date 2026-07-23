"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { ShieldAlert, Search, Filter, MoreHorizontal, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = MOCK_ALERTS.filter(alert => 
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alert.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
            <ShieldAlert className="w-8 h-8 text-primary" />
            Alert Management
          </h1>
          <p className="text-slate-400">Triage, investigate, and respond to security alerts</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search alerts by ID, title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Alert List */}
      <Card glow className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6 font-medium">Alert Details</th>
                <th className="py-4 px-6 font-medium">Severity</th>
                <th className="py-4 px-6 font-medium">MITRE ATT&CK</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`w-5 h-5 mt-0.5 ${
                        alert.severity === 'Critical' ? 'text-red-500' :
                        alert.severity === 'High' ? 'text-orange-500' :
                        alert.severity === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div>
                        <div className="font-medium text-slate-200 mb-1">{alert.title}</div>
                        <div className="text-xs text-slate-500 font-mono">
                          {alert.id} • {formatDate(alert.timestamp)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={alert.severity as any}>{alert.severity}</Badge>
                  </td>
                  <td className="py-4 px-6">
                    {alert.mitreTechnique ? (
                      <div className="text-xs">
                        <div className="text-slate-300 font-medium">{alert.mitreTechnique}</div>
                        <div className="text-slate-500">{alert.mitreTactic}</div>
                      </div>
                    ) : (
                      <span className="text-slate-600 text-xs">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-full">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        alert.status === 'Open' ? 'bg-red-500' :
                        alert.status === 'Investigating' ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`}></span>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
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
