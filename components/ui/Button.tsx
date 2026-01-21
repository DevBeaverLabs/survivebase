import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-accent text-bg-primary hover:bg-accent-hover font-bold shadow-md shadow-accent/20 active:scale-95',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-border border border-border active:scale-95',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded',
    md: 'px-5 py-2.5 text-sm rounded-md',
    lg: 'px-8 py-3.5 text-base rounded-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
