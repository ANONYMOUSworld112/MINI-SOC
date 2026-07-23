"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Activity, Database, Cpu, HardDrive, Wifi, Server, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { name: 'API Server', status: 'healthy', uptime: '99.99%', latency: '12ms', icon: Server },
  { name: 'Database (PostgreSQL)', status: 'healthy', uptime: '99.98%', latency: '3ms', icon: Database },
  { name: 'Redis Cache', status: 'healthy', uptime: '99.99%', latency: '1ms', icon: Zap },
  { name: 'Detection Engine', status: 'healthy', uptime: '99.95%', latency: '45ms', icon: Activity },
  { name: 'Correlation Engine', status: 'healthy', uptime: '99.90%', latency: '68ms', icon: Cpu },
  { name: 'WebSocket Hub', status: 'healthy', uptime: '99.97%', latency: '5ms', icon: Wifi },
  { name: 'Log Ingestion', status: 'healthy', uptime: '99.92%', latency: '22ms', icon: HardDrive },
  { name: 'Event Simulator', status: 'healthy', uptime: '100.0%', latency: '0ms', icon: Activity },
];

const collectors = [
  { name: 'Winlogbeat (DC-01)', status: 'connected', eps: 342, lastSeen: '2s ago' },
  { name: 'Winlogbeat (WS-001-005)', status: 'connected', eps: 128, lastSeen: '1s ago' },
  { name: 'Filebeat (LNX-WEB-01)', status: 'connected', eps: 215, lastSeen: '3s ago' },
  { name: 'Auditbeat (LNX-DB-01)', status: 'connected', eps: 89, lastSeen: '5s ago' },
  { name: 'Suricata IDS Sensor', status: 'connected', eps: 456, lastSeen: '1s ago' },
  { name: 'Syslog (FW-01)', status: 'connected', eps: 178, lastSeen: '2s ago' },
  { name: 'Fluent Bit (K8s)', status: 'warning', eps: 12, lastSeen: '45s ago' },
  { name: 'Cloud Audit (AWS)', status: 'disconnected', eps: 0, lastSeen: '15 min ago' },
];

const metrics = [
  { label: 'Events/Second', value: '1,420', change: '+5.2%', positive: true },
  { label: 'Total Events (24h)', value: '122.6M', change: '+8.1%', positive: true },
  { label: 'Avg Processing Latency', value: '23ms', change: '-12%', positive: true },
  { label: 'Queue Depth', value: '142', change: '-45%', positive: true },
  { label: 'Active WebSockets', value: '8', change: '0%', positive: true },
  { label: 'DB Size', value: '4.2 GB', change: '+2.1%', positive: false },
  { label: 'CPU Usage', value: '38%', change: '-5%', positive: true },
  { label: 'Memory Usage', value: '62%', change: '+3%', positive: false },
];

export default function HealthPage() {
  const healthyCount = services.filter(s => s.status === 'healthy').length;
  const connectedCollectors = collectors.filter(c => c.status === 'connected').length;
  const totalEPS = collectors.reduce((s, c) => s + c.eps, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3 text-glow">
          <Activity className="w-8 h-8 text-emerald-500" />System Health
        </h1>
        <p className="text-slate-400">Monitor platform infrastructure, services, and ingestion performance</p>
      </div>

      {/* Overall Status Banner */}
      <Card glow className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400">All Systems Operational</div>
            <div className="text-sm text-slate-400">{healthyCount}/{services.length} services healthy • {connectedCollectors}/{collectors.length} collectors connected</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-slate-200">{totalEPS.toLocaleString()}</div>
          <div className="text-xs text-slate-400">events/sec aggregate</div>
        </div>
      </Card>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <Card key={m.label} glow>
            <div className="text-xs text-slate-500 mb-1">{m.label}</div>
            <div className="text-xl font-bold text-slate-200 font-mono">{m.value}</div>
            <div className={cn("text-xs mt-1", m.positive ? "text-emerald-400" : "text-amber-400")}>{m.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <Card glow>
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <Server className="w-4 h-4" /> Service Status
          </h3>
          <div className="space-y-3">
            {services.map(svc => (
              <div key={svc.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <svc.icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">{svc.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-mono">{svc.latency}</span>
                  <span className="text-xs text-slate-500">{svc.uptime}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-400">Healthy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Collector Status */}
        <Card glow>
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <Wifi className="w-4 h-4" /> Collector Status
          </h3>
          <div className="space-y-3">
            {collectors.map(col => (
              <div key={col.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full",
                    col.status === 'connected' ? "bg-emerald-500" :
                    col.status === 'warning' ? "bg-amber-500 animate-pulse" : "bg-red-500"
                  )} />
                  <span className="text-sm text-slate-300">{col.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 font-mono">{col.eps} eps</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{col.lastSeen}
                  </span>
                  {col.status === 'disconnected' && <XCircle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
