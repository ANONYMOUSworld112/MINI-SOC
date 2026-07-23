"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Search, Database, HardDrive, Terminal } from 'lucide-react';
import { MOCK_LOGS } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export default function HuntPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">Threat Hunting</h1>
          <p className="text-slate-400">Query and analyze raw log events</p>
        </div>
      </div>

      <Card className="p-0 border-primary/20">
        <div className="p-4 bg-black/40 border-b border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-primary" />
            <span className="font-mono text-sm text-primary">KQL Query</span>
          </div>
          <textarea 
            className="w-full bg-transparent border-none outline-none font-mono text-sm text-slate-200 resize-none h-20"
            defaultValue={'SecurityEvent\n| where EventID == 4688\n| where CommandLine contains "powershell.exe"\n| project TimeGenerated, Computer, Account, CommandLine\n| limit 50'}
          />
          <div className="flex justify-end gap-2">
            <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded text-sm hover:bg-white/10 transition">Save Query</button>
            <button className="px-6 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary/90 transition shadow-[0_0_10px_rgba(59,130,246,0.5)]">Run Query</button>
          </div>
        </div>
      </Card>

      <Card glow className="flex-1 overflow-hidden p-0 flex flex-col min-h-[400px]">
        <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Database size={16} /> Results <span className="text-slate-500 font-normal">({MOCK_LOGS.length} events found)</span>
          </h3>
          <div className="flex gap-2">
            <button className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded">Export JSON</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-[#0a0a0a] z-10 border-b border-white/10">
              <tr className="uppercase tracking-wider text-slate-500">
                <th className="p-3 font-medium">Timestamp</th>
                <th className="p-3 font-medium">EventID</th>
                <th className="p-3 font-medium">Source IP</th>
                <th className="p-3 font-medium">User</th>
                <th className="p-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody className="font-mono text-slate-300 divide-y divide-white/5">
              {MOCK_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-white/[0.02] cursor-pointer">
                  <td className="p-3 whitespace-nowrap text-slate-500">{formatDate(log.timestamp)}</td>
                  <td className="p-3 text-blue-400">{log.eventID}</td>
                  <td className="p-3">{log.sourceIp}</td>
                  <td className="p-3">{log.user}</td>
                  <td className="p-3 truncate max-w-md" title={log.message}>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
