'use client';

import { useState } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  appid: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function BookmarkButton({
  appid,
  className,
  size = 'md',
  showLabel = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(appid);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger bounce animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    toggle(appid);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center justify-center gap-2 border transition-all duration-200',
        showLabel
          ? 'w-full rounded-md px-4 py-2 text-sm font-semibold'
          : 'rounded-full',
        'bg-bg-secondary/80 backdrop-blur-sm border-border',
        'hover:bg-bg-tertiary hover:border-text-secondary',
        bookmarked && 'bg-accent/20 border-accent text-accent',
        !showLabel && sizeClasses[size],
        className
      )}
      aria-label={bookmarked ? '북마크 제거' : '북마크 추가'}
    >
      <svg
        className={cn(
          showLabel ? 'w-4 h-4' : iconSizes[size],
          'transition-all duration-200',
          bookmarked ? 'text-accent fill-accent' : 'text-text-secondary',
          isAnimating && 'scale-125'
        )}
        style={{
          transition: isAnimating ? 'transform 0.15s ease-out' : 'transform 0.15s ease-in, color 0.2s',
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={bookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {showLabel && <span>{bookmarked ? '북마크 해제' : '북마크 추가'}</span>}
    </button>
  );
}
