import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ className, glow, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6",
        glow && "hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]",
        className
      )}
      {...props}
    />
  );
}
