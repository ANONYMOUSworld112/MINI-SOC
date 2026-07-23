import React from 'react';
import { Search, Bell, Activity } from 'lucide-react';

export function Topbar() {
  return (
    <div className="h-16 glass-panel border-b border-white/5 flex items-center justify-between px-6 z-10 sticky top-0">
      
      {/* Search */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search alerts, incidents, IPs... (Ctrl+K)" 
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6 ml-auto">
        
        {/* Ingestion Rate */}
        <div className="hidden lg:flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Ingestion</span>
            <span className="text-xs font-mono text-emerald-400 text-glow">4,281 EPS</span>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </button>

      </div>
    </div>
  );
}
