'use client';

import { cn } from '@/lib/utils';
import { PRICE_RANGES } from '@/lib/constants';
import type { PriceRange } from '@/types';

interface PriceFilterProps {
  value: PriceRange | null;
  onChange: (value: PriceRange | null) => void;
  className?: string;
}

const priceOptions: Array<{ value: PriceRange | null; label: string }> = [
  { value: null, label: '전체' },
  { value: 'free', label: PRICE_RANGES.free.label },
  { value: 'under15000', label: PRICE_RANGES.under15000.label },
  { value: 'under30000', label: PRICE_RANGES.under30000.label },
  { value: 'over30000', label: PRICE_RANGES.over30000.label },
];

export default function PriceFilter({ value, onChange, className }: PriceFilterProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="text-sm font-medium text-text-primary mb-3">가격대</h3>
      <div className="space-y-1">
        {priceOptions.map((option) => (
          <label
            key={option.value ?? 'all'}
            className="flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer hover:bg-bg-tertiary transition-colors"
          >
            <input
              type="radio"
              name="price"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 border-border bg-bg-tertiary text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-sm text-text-secondary">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
