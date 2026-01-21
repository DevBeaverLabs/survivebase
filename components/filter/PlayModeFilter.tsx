'use client';

import { cn } from '@/lib/utils';
import type { PlayMode } from '@/types';

interface PlayModeFilterProps {
  selectedModes: PlayMode[];
  onChange: (modes: PlayMode[]) => void;
  className?: string;
}

const playModes: Array<{ value: PlayMode; label: string }> = [
  { value: 'singleplayer', label: '싱글플레이어' },
  { value: 'multiplayer', label: '멀티플레이어' },
  { value: 'coop', label: '협동' },
];

export default function PlayModeFilter({
  selectedModes,
  onChange,
  className,
}: PlayModeFilterProps) {
  const handleToggle = (mode: PlayMode) => {
    if (selectedModes.includes(mode)) {
      onChange(selectedModes.filter((m) => m !== mode));
    } else {
      onChange([...selectedModes, mode]);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="text-sm font-medium text-text-primary mb-3">플레이 모드</h3>
      <div className="space-y-1">
        {playModes.map((mode) => (
          <label
            key={mode.value}
            className="flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer hover:bg-bg-tertiary transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedModes.includes(mode.value)}
              onChange={() => handleToggle(mode.value)}
              className="w-4 h-4 rounded border-border bg-bg-tertiary text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-sm text-text-secondary">{mode.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
