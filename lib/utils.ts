// SurviveBase - Utility Functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in KRW
 */
export function formatPrice(price: number): string {
  if (price === 0) return '무료';
  return `₩${price.toLocaleString('ko-KR')}`;
}

/**
 * Calculate review score percentage
 */
export function calculateReviewScore(positive: number, negative: number): number {
  const total = positive + negative;
  if (total === 0) return 0;
  return Math.round((positive / total) * 100);
}

/**
 * Get review label based on score
 */
export function getReviewLabel(score: number): string {
  if (score >= 95) return '압도적으로 긍정적';
  if (score >= 85) return '매우 긍정적';
  if (score >= 70) return '긍정적';
  if (score >= 40) return '복합적';
  if (score >= 20) return '부정적';
  return '매우 부정적';
}

/**
 * Format date to Korean locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Delay function for rate limiting
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Get Steam store URL for a game
 */
export function getSteamUrl(appid: number): string {
  return `https://store.steampowered.com/app/${appid}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
