"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_INCIDENTS } from '@/lib/mock-data';
import { Crosshair, Plus, Clock, Users } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function IncidentsPage() {
  const columns = ['New', 'Investigating', 'Containment', 'Eradication', 'Recovery', 'Resolved'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
            <Crosshair className="w-8 h-8 text-primary" />
            Incident Workbench
          </h1>
          <p className="text-slate-400">Manage and track active security incidents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <Plus className="w-4 h-4" />
          Create Incident
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map((col) => (
            <div key={col} className="w-80 flex flex-col gap-4">
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <h3 className="font-semibold text-slate-300">{col}</h3>
                <span className="bg-white/10 text-slate-300 text-xs py-0.5 px-2 rounded-full">
                  {MOCK_INCIDENTS.filter(i => i.status === col).length}
                </span>
              </div>
              
              <div className="flex-1 space-y-4">
                {MOCK_INCIDENTS.filter(i => i.status === col).map((incident) => (
                  <Card key={incident.id} glow className="p-4 cursor-pointer hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-mono text-slate-500">{incident.id}</span>
                      <Badge variant={incident.severity as any}>{incident.severity}</Badge>
                    </div>
                    
                    <h4 className="font-medium text-slate-200 mb-2 leading-tight">
                      {incident.title}
                    </h4>
                    
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                      {incident.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-3">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {incident.assignee}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {incident.slaCountdown}h SLA
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
