'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value: externalValue,
  onSearch,
  placeholder = '게임 검색...',
  className,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(externalValue || '');

  // Sync with external value
  useEffect(() => {
    if (externalValue !== undefined) {
      setInputValue(externalValue);
    }
  }, [externalValue]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className={cn('relative', className)}>
      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-10 py-3 rounded-lg',
          'bg-bg-tertiary border border-border',
          'text-text-primary placeholder:text-text-secondary',
          'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
          'transition-colors duration-200'
        )}
      />

      {/* Clear Button */}
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="검색어 지우기"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
