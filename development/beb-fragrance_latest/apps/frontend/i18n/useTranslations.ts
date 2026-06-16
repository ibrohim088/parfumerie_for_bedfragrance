import { useTranslations as useTranslationsIntl } from 'next-intl';

export function useTranslations(namespace?: string) {
  const t = useTranslationsIntl();

  if (namespace) {
    return t(namespace);
  }

  return t;
}

export function getTranslationKey(path: string): string {
  return path;
}
