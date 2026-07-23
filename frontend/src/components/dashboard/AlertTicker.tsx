"use client";

import React from 'react';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle } from 'lucide-react';

export function AlertTicker() {
  const recentAlerts = MOCK_ALERTS.slice(0, 10);

  return (
    <div className="bg-white/[0.02] border-y border-white/10 h-10 flex items-center overflow-hidden relative">
      <div className="absolute left-0 z-10 px-4 bg-gradient-to-r from-background to-transparent h-full flex items-center">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
          <AlertCircle size={14} className="animate-pulse" /> Live
        </span>
      </div>
      
      <div className="flex whitespace-nowrap animate-ticker-scroll pl-24">
        {recentAlerts.map(alert => (
          <div key={alert.id} className="flex items-center gap-3 mx-6">
            <span className="text-xs text-slate-500">{alert.id}</span>
            <Badge variant={alert.severity as any}>{alert.severity}</Badge>
            <span className="text-sm font-medium">{alert.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
