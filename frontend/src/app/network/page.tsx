"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Network, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MOCK_ASSETS } from '@/lib/mock-data';

export default function NetworkPage() {
  const networkAssets = MOCK_ASSETS.filter(a => ['Server', 'Network Device'].includes(a.type));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">Network Intelligence</h1>
          <p className="text-slate-400">Traffic analysis and boundary monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="p-6 col-span-2 min-h-[300px] flex items-center justify-center border-dashed">
          <div className="text-center">
            <Network className="w-12 h-12 text-blue-500/50 mx-auto mb-4" />
            <p className="text-slate-400">Interactive Network Topology Map</p>
            <p className="text-xs text-slate-600 mt-2">Visualizing {networkAssets.length} connected endpoints and gateways</p>
          </div>
        </Card>
        
        <div className="space-y-4">
          <Card glow className="p-5">
            <h3 className="text-sm font-semibold mb-4 text-slate-300">Traffic Anomalies</h3>
            <div className="space-y-3">
              {[
                { ip: '185.22.x.x', type: 'Data Exfiltration', vol: '2.4 GB', icon: ArrowUpRight, color: 'text-red-500' },
                { ip: '45.33.x.x', type: 'Port Scan', vol: '12 MB', icon: Activity, color: 'text-orange-500' },
                { ip: '10.0.x.x', type: 'C2 Beacon', vol: '1.2 KB', icon: ArrowDownRight, color: 'text-red-500' }
              ].map((anomaly, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
                  <div className="flex items-center gap-3">
                    <anomaly.icon size={16} className={anomaly.color} />
                    <div>
                      <div className="text-sm font-mono text-slate-200">{anomaly.ip}</div>
                      <div className="text-xs text-slate-500">{anomaly.type}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-300">{anomaly.vol}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
