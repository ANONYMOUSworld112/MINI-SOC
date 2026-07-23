import React from 'react';
import { cn, getSeverityColor } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info' | 'default';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const isSeverity = variant !== 'default';
  
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        isSeverity ? getSeverityColor(variant) : "text-slate-300 bg-slate-800 border-slate-700",
        isSeverity ? `bg-opacity-10 border-opacity-20` : "",
        className
      )}
      {...props}
    />
  );
}
