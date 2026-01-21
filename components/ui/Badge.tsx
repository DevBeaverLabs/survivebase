import React from 'react';
import { cn, type ReviewVariant } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'outline';
  reviewVariant?: ReviewVariant;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  reviewVariant,
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-bg-tertiary text-text-secondary border-transparent',
    success: 'bg-success/10 text-success border-success/20 font-bold',
    outline: 'bg-transparent text-text-secondary border-border',
  };

  const reviewVariants: Record<ReviewVariant, string> = {
    'overwhelming': 'bg-[var(--review-overwhelming)]/10 text-[var(--review-overwhelming)] border-[var(--review-overwhelming)]/20 font-bold',
    'very-positive': 'bg-[var(--review-very-positive)]/10 text-[var(--review-very-positive)] border-[var(--review-very-positive)]/20 font-bold',
    'positive': 'bg-[var(--review-positive)]/10 text-[var(--review-positive)] border-[var(--review-positive)]/20 font-bold',
    'mixed': 'bg-[var(--review-mixed)]/10 text-[var(--review-mixed)] border-[var(--review-mixed)]/20 font-bold',
    'negative': 'bg-[var(--review-negative)]/10 text-[var(--review-negative)] border-[var(--review-negative)]/20 font-bold',
    'very-negative': 'bg-[var(--review-very-negative)]/10 text-[var(--review-very-negative)] border-[var(--review-very-negative)]/20 font-bold',
  };

  // reviewVariant takes precedence over variant
  const variantClass = reviewVariant 
    ? reviewVariants[reviewVariant] 
    : variants[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border transition-colors',
        variantClass,
        className
      )}
    >
      {children}
    </span>
  );
}
