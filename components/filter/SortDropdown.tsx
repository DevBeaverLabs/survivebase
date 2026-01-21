'use client';

import React from 'react';
import { SORT_OPTIONS } from '@/lib/constants';
import { SortOption } from '@/types';

interface SortDropdownProps {
  value: SortOption;
  onChange?: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-text-secondary font-medium whitespace-nowrap">
        정렬 기준:
      </label>
      <div className="relative group">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange?.(e.target.value as SortOption)}
          className="appearance-none bg-bg-secondary border border-border text-text-primary text-sm rounded-md px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:border-accent hover:border-text-secondary transition-colors"
        >
          {Object.entries(SORT_OPTIONS).map(([key, option]) => (
            <option key={key} value={key}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-secondary group-hover:text-text-primary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
