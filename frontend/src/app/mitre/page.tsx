"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MOCK_MITRE_TECHNIQUES } from '@/lib/mock-data';
import { MITRE_TACTICS } from '@/lib/constants';
import { Globe, Shield, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MitrePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
            <Globe className="w-8 h-8 text-primary" />
            MITRE ATT&CK Matrix
          </h1>
          <p className="text-slate-400">Coverage and active threats mapped to the MITRE ATT&CK framework</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card glow className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">68%</div>
            <div className="text-sm text-slate-400">Total Detection Coverage</div>
          </div>
        </Card>
        <Card glow className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">14</div>
            <div className="text-sm text-slate-400">Techniques with Active Alerts</div>
          </div>
        </Card>
      </div>

      {/* Interactive Matrix */}
      <div className="overflow-x-auto pb-6 custom-scrollbar">
        <div className="flex gap-2 min-w-max">
          {MITRE_TACTICS.map((tactic) => {
            const techniques = MOCK_MITRE_TECHNIQUES.filter(t => t.tactic === tactic);
            return (
              <div key={tactic} className="w-48 flex flex-col gap-2">
                <div className="bg-white/5 border border-white/10 rounded px-3 py-2 text-center text-xs font-bold text-slate-300 uppercase tracking-wider h-12 flex items-center justify-center">
                  {tactic}
                </div>
                
                {techniques.map(tech => (
                  <div 
                    key={tech.id} 
                    className={cn(
                      "p-3 rounded text-xs border cursor-pointer hover:-translate-y-0.5 transition-transform",
                      tech.recentAlerts > 0 
                        ? "bg-red-500/20 border-red-500/40 text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.2)]" 
                        : tech.coverage > 0 
                          ? "bg-primary/20 border-primary/40 text-blue-100"
                          : "bg-white/5 border-white/10 text-slate-400"
                    )}
                  >
                    <div className="font-mono mb-1 opacity-70">{tech.id}</div>
                    <div className="font-medium leading-tight">{tech.name}</div>
                  </div>
                ))}
                
                {/* Pad with empty cells for realistic look */}
                {Array.from({ length: Math.max(0, 10 - techniques.length) }).map((_, i) => (
                  <div key={i} className="p-3 rounded text-xs border bg-white/5 border-white/10 text-slate-400 opacity-50 h-[72px]">
                    <div className="w-8 h-3 bg-white/10 rounded mb-2"></div>
                    <div className="w-full h-3 bg-white/10 rounded"></div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
