"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/Card';

const data = [
  { name: 'Critical', value: 12, color: '#ef4444' },
  { name: 'High', value: 34, color: '#f97316' },
  { name: 'Medium', value: 56, color: '#eab308' },
  { name: 'Low', value: 89, color: '#3b82f6' },
];

export function DonutChart() {
  return (
    <Card className="h-full flex flex-col glow">
      <h3 className="text-sm font-semibold mb-4 text-slate-300">Alert Severity Breakdown</h3>
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
