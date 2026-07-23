"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Activity, ShieldAlert, Crosshair, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AlertTicker } from '@/components/dashboard/AlertTicker';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { TopAssets } from '@/components/dashboard/TopAssets';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">Executive Dashboard</h1>
          <p className="text-slate-400">Platform overview and key security metrics</p>
        </div>
      </div>

      <div className="-mx-6 mb-6">
        <AlertTicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Alerts" value={MOCK_ALERTS.filter(a => a.status !== 'Resolved').length} trend="+12%" icon={ShieldAlert} colorClass="text-red-500" />
        <StatCard title="Open Incidents" value="8" trend="-2" icon={Crosshair} colorClass="text-orange-500" />
        <StatCard title="Total Events (24h)" value="3.2B" trend="+5%" icon={Activity} colorClass="text-blue-500" />
        <StatCard title="Avg Risk Score" value="76/100" trend="+1.2" icon={AlertTriangle} colorClass="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[350px]">
        <div className="lg:col-span-2 h-full">
          <AreaChart />
        </div>
        <div className="h-full">
          <DonutChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card glow>
            <h3 className="text-sm font-semibold mb-4 text-slate-300">Recent Critical Alerts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                    <th className="pb-3 font-medium">Alert ID</th>
                    <th className="pb-3 font-medium">Severity</th>
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {MOCK_ALERTS.slice(0, 5).map((alert) => (
                    <tr key={alert.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono text-xs text-slate-400">{alert.id}</td>
                      <td className="py-3"><Badge variant={alert.severity as any}>{alert.severity}</Badge></td>
                      <td className="py-3 font-medium text-slate-200">{alert.title}</td>
                      <td className="py-3 text-slate-400">{alert.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <TopAssets />
        </div>
      </div>
    </div>
  );
}
