"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Search } from 'lucide-react';

export default function GenericPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow">{title}</h1>
        <p className="text-slate-400">{description}</p>
      </div>
      <Card glow className="h-96 flex items-center justify-center border-dashed">
        <p className="text-slate-500 flex flex-col items-center gap-2">
          <Search className="w-8 h-8 opacity-50" />
          {title} Dashboard - Coming Soon
        </p>
      </Card>
    </div>
  );
}
