'use client';

import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import PriceFilter from './PriceFilter';
import PlayModeFilter from './PlayModeFilter';
import SortDropdown from './SortDropdown';
import Button from '@/components/ui/Button';
import type { FilterState, SortOption, PriceRange, PlayMode } from '@/types';

interface FilterSidebarProps {
  filters: FilterState;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: SortOption) => void;
  onTagsChange: (tags: string[]) => void;
  onPriceChange: (price: PriceRange | null) => void;
  onPlayModeChange: (modes: PlayMode[]) => void;
  onReset: () => void;
  className?: string;
}

export default function FilterSidebar({
  filters,
  onSearchChange,
  onSortChange,
  onTagsChange,
  onPriceChange,
  onPlayModeChange,
  onReset,
  className,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.search ||
    filters.tags.length > 0 ||
    filters.priceRange !== null ||
    filters.playMode.length > 0;

  return (
    <aside className={cn('space-y-6', className)}>
      {/* Search */}
      <SearchBar value={filters.search} onSearch={onSearchChange} />

      {/* Sort (Mobile) */}
      <div className="lg:hidden">
        <h3 className="text-sm font-medium text-text-primary mb-3">정렬</h3>
        <SortDropdown value={filters.sort} onChange={onSortChange} />
      </div>

      {/* Filters */}
      <div className="space-y-6 p-4 bg-bg-secondary rounded-lg border border-border">
        <TagFilter selectedTags={filters.tags} onChange={onTagsChange} />

        <div className="border-t border-border pt-4">
          <PriceFilter value={filters.priceRange} onChange={onPriceChange} />
        </div>

        <div className="border-t border-border pt-4">
          <PlayModeFilter selectedModes={filters.playMode} onChange={onPlayModeChange} />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="border-t border-border pt-4">
            <Button variant="ghost" className="w-full" onClick={onReset}>
              필터 초기화
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
