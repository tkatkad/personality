import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TestResult } from '../types';
import { buildTestResult } from './scoring';

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
 * Encodes a TestResult into a lightweight, URL-safe base64 string
 */
export function encodeResultToUrlParam(result: TestResult): string {
  try {
    const compact = {
      i: result.id,
      t: result.createdAt,
      d: result.demographics,
      a: result.answers || {},
      r: result.retestOf,
    };
    const jsonStr = JSON.stringify(compact);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
  } catch (err) {
    console.error('Failed to encode result:', err);
    return '';
  }
}

/**
 * Decodes compressed URL string back into a full TestResult object
 */
export function decodeResultFromUrlParam(encodedParam: string): TestResult | null {
  try {
    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedParam))));
    const compact = JSON.parse(jsonStr);
    if (!compact || !compact.i || !compact.a) return null;

    const result = buildTestResult(compact.i, compact.a, compact.d || {});
    if (compact.t) result.createdAt = compact.t;
    if (compact.r) result.retestOf = compact.r;
    return result;
  } catch (err) {
    console.error('Failed to decode result parameter:', err);
    return null;
  }
}

/**
 * Copies a self-contained, domain-agnostic shareable result link to clipboard
 */
export async function copyShareLink(result: TestResult, overrideOrigin?: string): Promise<boolean> {
  const origin = overrideOrigin || (typeof window !== 'undefined' ? window.location.origin : 'https://personality-test.job.web.id');
  const encoded = encodeResultToUrlParam(result);
  const shareUrl = `${origin}/result/${result.id}${encoded ? `?res=${encoded}` : ''}`;
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
