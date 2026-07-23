"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MOCK_ASSETS } from '@/lib/mock-data';
import { Server } from 'lucide-react';

export function TopAssets() {
  const sorted = [...MOCK_ASSETS].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  return (
    <Card glow className="h-full flex flex-col">
      <h3 className="text-sm font-semibold mb-4 text-slate-300">Highest Risk Assets</h3>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="space-y-3">
          {sorted.map(asset => (
            <div key={asset.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded">
                  <Server size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm text-slate-200">{asset.hostname}</div>
                  <div className="text-xs text-slate-500 font-mono">{asset.ipAddress}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-sm font-bold ${asset.riskScore > 80 ? 'text-red-500' : 'text-orange-500'}`}>
                  {asset.riskScore}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Risk Score</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
