import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a crypto-secure v4 UUID or fallback
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Downloads a JS object as a JSON file
 */
export function downloadJSON(data: unknown, filename: string) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copies a shareable result link to clipboard
 */
export async function copyShareLink(resultId: string): Promise<boolean> {
  const shareUrl = `${window.location.origin}/result/${resultId}`;
  try {
    await navigator.clipboard.writeText(shareUrl);
    return true;
  } catch (err) {
    console.error('Failed to copy link', err);
    return false;
  }
}

/**
 * Formats ISO date string nicely
 */
export function formatDate(isoString: string, lang: string = 'id'): string {
  try {
    const date = new Date(isoString);
    const locale = lang === 'es' ? 'es-ES' : lang === 'en' ? 'en-US' : 'id-ID';
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return isoString;
  }
}
