import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'outline';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-bg-tertiary text-text-secondary border-transparent',
    success: 'bg-success/10 text-success border-success/20 font-bold',
    outline: 'bg-transparent text-text-secondary border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
