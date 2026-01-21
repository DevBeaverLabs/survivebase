'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRecentGames } from '@/hooks/useRecentGames';
import { motion, AnimatePresence } from 'framer-motion';
import BookmarkButton from './BookmarkButton';
import ImageWithFallback from '../ui/ImageWithFallback';

interface GameDetailClientProps {
  appid: number;
}

export function RecentGameTracker({ appid }: GameDetailClientProps) {
  const { add } = useRecentGames();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      add(appid);
    }
  }, [appid, add]);

  return null;
}

export function GameDetailBookmark({ appid }: GameDetailClientProps) {
  return (
    <BookmarkButton appid={appid} showLabel size="lg" />
  );
}

interface ScreenshotGalleryProps {
  screenshots: string[];
  gameName: string;
}

export function ScreenshotGallery({ screenshots, gameName }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === 'Escape') {
      setSelectedIndex(null);
    } else if (e.key === 'ArrowLeft') {
      setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'ArrowRight') {
      setSelectedIndex((prev) => 
        prev !== null && prev < screenshots.length - 1 ? prev + 1 : prev
      );
    }
  }, [selectedIndex, screenshots.length]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, handleKeyDown]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {screenshots.slice(0, 4).map((screenshot, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-video rounded-lg overflow-hidden border border-border group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <ImageWithFallback
              src={screenshot}
              alt={`${gameName} screenshot ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/20 transition-colors flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-bg-secondary/80 flex items-center justify-center text-text-primary hover:bg-bg-tertiary transition-colors"
              aria-label="닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(selectedIndex - 1);
                }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-bg-secondary/80 flex items-center justify-center text-text-primary hover:bg-bg-tertiary transition-colors"
                aria-label="이전"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedIndex < screenshots.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(selectedIndex + 1);
                }}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-bg-secondary/80 flex items-center justify-center text-text-primary hover:bg-bg-tertiary transition-colors"
                aria-label="다음"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={screenshots[selectedIndex]}
                alt={`${gameName} screenshot ${selectedIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-bg-secondary/80 text-sm text-text-primary">
              {selectedIndex + 1} / {screenshots.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
