'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { Game } from '@/types';

interface TagCloudProps {
  games: Game[];
  onTagClick: (tag: string) => void;
  selectedTags?: string[];
  className?: string;
}

export default function TagCloud({
  games,
  onTagClick,
  selectedTags = [],
  className,
}: TagCloudProps) {
  // Calculate tag frequencies
  const tagData = useMemo(() => {
    const tagCounts = new Map<string, number>();

    for (const game of games) {
      for (const tag of game.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      }
    }

    // Sort by count and take top 15
    const sorted = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    // Calculate min and max for scaling
    const counts = sorted.map(([, count]) => count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);

    return sorted.map(([tag, count]) => ({
      tag,
      count,
      // Scale font size between 0.75rem and 1.25rem
      scale: maxCount === minCount ? 1 : (count - minCount) / (maxCount - minCount),
    }));
  }, [games]);

  if (tagData.length === 0) return null;

  return (
    <div className={cn('p-4 bg-bg-secondary rounded-lg border border-border', className)}>
      <h3 className="text-sm font-medium text-text-primary mb-4">인기 태그</h3>
      <div className="flex flex-wrap gap-2">
        {tagData.map(({ tag, count, scale }) => {
          const isSelected = selectedTags.includes(tag);
          // Font size from 12px to 20px
          const fontSize = 12 + scale * 8;

          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={cn(
                'px-3 py-1.5 rounded-full transition-all duration-200',
                'hover:scale-105',
                isSelected
                  ? 'bg-accent text-bg-primary font-medium'
                  : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary hover:text-text-primary'
              )}
              style={{ fontSize: `${fontSize}px` }}
              title={`${tag} (${count})`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
