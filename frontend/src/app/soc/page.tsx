"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Activity, Globe, Server, AlertTriangle } from 'lucide-react';
import { AreaChart } from '@/components/charts/AreaChart';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function SocPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">SOC Overview</h1>
          <p className="text-slate-400">Live operation center metrics and activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'MTTD (Mean Time to Detect)', value: '14m', icon: Activity, color: 'text-blue-500' },
          { label: 'MTTR (Mean Time to Respond)', value: '1.2h', icon: Server, color: 'text-emerald-500' },
          { label: 'Open Investigations', value: '24', icon: Globe, color: 'text-orange-500' },
          { label: 'Critical Escalations', value: '3', icon: AlertTriangle, color: 'text-red-500' },
        ].map((stat, i) => (
          <Card key={i} glow className="p-4 flex flex-col items-center text-center justify-center h-32">
            <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <AreaChart />
        <Card glow className="flex flex-col">
          <h3 className="text-sm font-semibold mb-4 text-slate-300">Live Alert Stream</h3>
          <div className="flex-1 overflow-auto custom-scrollbar space-y-3">
            {MOCK_ALERTS.slice(0, 15).map(alert => (
              <div key={alert.id} className="flex gap-4 items-start p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:bg-white/[0.05] transition">
                <div className="shrink-0 mt-1">
                  <Badge variant={alert.severity as any}>{alert.severity}</Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-200 truncate">{alert.title}</div>
                  <div className="text-xs text-slate-500 flex justify-between mt-1">
                    <span className="truncate mr-4">{alert.source} • {alert.mitreTechnique}</span>
                    <span className="shrink-0">{formatDate(alert.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
