export class CookieUtils {
  static set(name: string, value: string, options?: { maxAge?: number; path?: string; domain?: string }): void {
    if (typeof document === 'undefined') return;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options?.maxAge) {
      cookieString += `; Max-Age=${options.maxAge}`;
    }

    if (options?.path) {
      cookieString += `; Path=${options.path}`;
    }

    if (options?.domain) {
      cookieString += `; Domain=${options.domain}`;
    }

    document.cookie = cookieString;
  }

  static get(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');

      if (key && value && decodeURIComponent(key) === name) {
        return decodeURIComponent(value);
      }
    }

    return null;
  }

  static delete(name: string): void {
    this.set(name, '', { maxAge: 0 });
  }

  static setLocale(locale: string): void {
    this.set('NEXT_LOCALE', locale, { maxAge: 31536000, path: '/' });
  }

  static getLocale(): string | null {
    return this.get('NEXT_LOCALE');
  }

  static setTheme(theme: 'light' | 'dark'): void {
    this.set('theme', theme, { maxAge: 31536000, path: '/' });
  }

  static getTheme(): 'light' | 'dark' | null {
    const theme = this.get('theme');
    return theme === 'light' || theme === 'dark' ? theme : null;
  }
}

export default CookieUtils;
