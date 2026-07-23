"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Settings, Shield, Bell, Users, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">Platform Settings</h1>
        <p className="text-slate-400">Configure global platform behavior and integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'security', label: 'Security & Auth', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'users', label: 'Users & Roles', icon: Users },
            { id: 'integrations', label: 'Integrations', icon: Database },
          ].map((tab, i) => (
            <button key={tab.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
        
        <Card glow className="md:col-span-3 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4 border-b border-white/10 pb-2">General Configuration</h3>
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Organization Name</label>
                <input type="text" defaultValue="Sentinel Corp" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Default Data Retention (Days)</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 outline-none">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option selected>180 Days</option>
                  <option>365 Days</option>
                </select>
              </div>
              <div className="pt-4 border-t border-white/10">
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">Save Changes</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
