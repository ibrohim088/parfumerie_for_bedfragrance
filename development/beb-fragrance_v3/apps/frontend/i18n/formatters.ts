import { Locale } from './locales';

export const dateFormats: Record<Locale, Intl.DateTimeFormatOptions> = {
  uz: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
  ru: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
};

export const currencyFormats: Record<Locale, string> = {
  uz: 'UZS',
  ru: '₽',
};

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(
    locale === 'uz' ? 'uz-UZ' : 'ru-RU',
    dateFormats[locale]
  );
}

export function formatCurrency(
  amount: number,
  locale: Locale
): string {
  const formatter = new Intl.NumberFormat(
    locale === 'uz' ? 'uz-UZ' : 'ru-RU',
    {
      style: 'currency',
      currency: currencyFormats[locale] === 'UZS' ? 'UZS' : 'RUB',
    }
  );

  return formatter.format(amount);
}

export function formatPhoneNumber(phone: string, locale: Locale): string {
  const cleaned = phone.replace(/\D/g, '');

  if (locale === 'uz') {
    if (cleaned.length === 12 && cleaned.startsWith('998')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
    }
  } else if (locale === 'ru') {
    if (cleaned.length === 11 && cleaned.startsWith('7')) {
      return `+${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
    }
  }

  return phone;
}
