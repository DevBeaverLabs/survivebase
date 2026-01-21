'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, MAX_BOOKMARKS } from '@/lib/constants';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<number[]>(
    STORAGE_KEYS.bookmarks,
    []
  );

  const add = useCallback(
    (appid: number) => {
      setBookmarks((prev) => {
        if (prev.includes(appid)) return prev;
        const newBookmarks = [appid, ...prev];
        // Limit to MAX_BOOKMARKS
        return newBookmarks.slice(0, MAX_BOOKMARKS);
      });
    },
    [setBookmarks]
  );

  const remove = useCallback(
    (appid: number) => {
      setBookmarks((prev) => prev.filter((id) => id !== appid));
    },
    [setBookmarks]
  );

  const toggle = useCallback(
    (appid: number) => {
      setBookmarks((prev) => {
        if (prev.includes(appid)) {
          return prev.filter((id) => id !== appid);
        }
        const newBookmarks = [appid, ...prev];
        return newBookmarks.slice(0, MAX_BOOKMARKS);
      });
    },
    [setBookmarks]
  );

  const isBookmarked = useCallback(
    (appid: number) => bookmarks.includes(appid),
    [bookmarks]
  );

  const clear = useCallback(() => {
    setBookmarks([]);
  }, [setBookmarks]);

  return {
    bookmarks,
    add,
    remove,
    toggle,
    isBookmarked,
    clear,
    count: bookmarks.length,
  };
}
