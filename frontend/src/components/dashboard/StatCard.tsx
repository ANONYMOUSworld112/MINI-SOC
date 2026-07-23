import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function StatCard({ title, value, trend, icon: Icon, colorClass = "text-primary" }: StatCardProps) {
  return (
    <Card glow className="flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 font-medium text-sm">{title}</span>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <div className="flex items-baseline gap-2 mt-auto">
        <span className="text-3xl font-bold">{value}</span>
        {trend && (
          <span className={`text-xs font-medium ${trend.startsWith('-') || trend.startsWith('0') ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
}
