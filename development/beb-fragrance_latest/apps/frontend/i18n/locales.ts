export const locales = ['uz', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uz';

export const localeLabels: Record<Locale, string> = {
  uz: 'O\'zbekcha',
  ru: 'Русский',
};

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  uz: 'ltr',
  ru: 'ltr',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleLabel(locale: Locale): string {
  return localeLabels[locale];
}
