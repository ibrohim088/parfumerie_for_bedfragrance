import { ReactNode } from 'react';
import { getLocale } from '@/i18n/config';

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateStaticParams() {
  return [
    { locale: 'uz' },
    { locale: 'ru' },
  ];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const validLocale = getLocale(locale) === locale ? locale : 'uz';

  return (
    <div lang={validLocale}>
      {children}
    </div>
  );
}
