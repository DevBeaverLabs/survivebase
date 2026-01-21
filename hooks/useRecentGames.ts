'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, MAX_RECENT_GAMES } from '@/lib/constants';

export function useRecentGames() {
  const [recentGames, setRecentGames] = useLocalStorage<number[]>(
    STORAGE_KEYS.recentGames,
    []
  );

  const add = useCallback(
    (appid: number) => {
      setRecentGames((prev) => {
        // Remove if already exists (will be moved to front)
        const filtered = prev.filter((id) => id !== appid);
        // Add to front and limit
        return [appid, ...filtered].slice(0, MAX_RECENT_GAMES);
      });
    },
    [setRecentGames]
  );

  const clear = useCallback(() => {
    setRecentGames([]);
  }, [setRecentGames]);

  return {
    recentGames,
    add,
    clear,
  };
}
