"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/lib/constants';
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen glass-panel flex flex-col transition-all duration-300 border-r border-white/10 relative",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <Shield className="w-8 h-8 text-primary shrink-0" />
          {!collapsed && (
            <span className="font-bold text-lg tracking-wider text-glow whitespace-nowrap">
              SENTINEL SOC
            </span>
          )}
        </div>
      </div>

      {/* Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-secondary border border-white/10 rounded-full p-1 hover:bg-white/10 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        {NAVIGATION.map((group, i) => (
          <div key={i} className="mb-6">
            {!collapsed && (
              <h3 className="px-6 text-xs font-semibold text-slate-500 tracking-widest mb-3">
                {group.group}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                return (
                  <Link 
                    key={j} 
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-6 py-2.5 mx-2 rounded-lg transition-all",
                      isActive 
                        ? "bg-primary/10 text-primary border-l-2 border-primary" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary text-glow-primary")} />
                    {!collapsed && (
                      <span className="flex-1 text-sm font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User */}
      <div className="p-4 border-t border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center shrink-0">
          <span className="font-bold text-white">SA</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">SysAdmin</p>
            <p className="text-xs text-slate-500 truncate">Lead Analyst</p>
          </div>
        )}
      </div>
    </div>
  );
}
