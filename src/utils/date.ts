// /src/utils/date.ts
import type { CollectionEntry } from "astro:content";

/**
 * Format date for display
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  // Handle invalid dates
  if (!date || isNaN(date.getTime())) {
    console.warn('Invalid date provided to formatDate:', date);
    return 'Invalid Date';
  }
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
}

/**
 * Get formatted date (alias for formatDate to match existing component)
 */
export function getFormattedDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return formatDate(date, options);
}

/**
 * Format date for machine reading (ISO string)
 */
export function formatMachineDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Sort collection entries by date (newest first)
 */
export function collectionDateSort<T extends CollectionEntry<any>>(a: T, b: T): number {
  const dateA = new Date(a.data.publishDate || a.data.date);
  const dateB = new Date(b.data.publishDate || b.data.date);
  return dateB.getTime() - dateA.getTime();
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }
  
  return 'Just now';
}

/**
 * Check if date is within the last N days
 */
export function isRecent(date: Date, days: number = 7): boolean {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays <= days;
}