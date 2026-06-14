// String utilities
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
}

export function unslugify(str: string): string {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

// Number utilities
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('uz-UZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num));
}

// Array utilities
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const group = String(item[key]);
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

// Object utilities
export function omit<T extends Record<string, any>>(obj: T, ...keys: (keyof T)[]): Partial<T> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export function pick<T extends Record<string, any>>(obj: T, ...keys: (keyof T)[]): Partial<T> {
  return keys.reduce(
    (result, key) => {
      result[key] = obj[key];
      return result;
    },
    {} as Partial<T>
  );
}

// Type utilities
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+[0-9]{1,3}[0-9]{4,14}$/;
  return phoneRegex.test(phone);
}

export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Delay utility
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// URL utilities
export function getQueryParam(param: string): string | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

export function setQueryParam(key: string, value: string): void {
  if (typeof window === 'undefined') return;

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
}

export function removeQueryParam(key: string): void {
  if (typeof window === 'undefined') return;

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);
  window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
}

// Scroll utilities
export function scrollToTop(smooth: boolean = true): void {
  if (typeof window === 'undefined') return;

  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

export function scrollToElement(selector: string, smooth: boolean = true): void {
  if (typeof document === 'undefined') return;

  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
    });
  }
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export default {
  capitalize,
  truncate,
  slugify,
  unslugify,
  formatNumber,
  clamp,
  chunk,
  unique,
  groupBy,
  omit,
  pick,
  isEmail,
  isPhoneNumber,
  isUrl,
  delay,
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  scrollToTop,
  scrollToElement,
  copyToClipboard,
};
