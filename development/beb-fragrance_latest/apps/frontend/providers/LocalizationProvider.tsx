'use client';

import { ReactNode } from 'react';
import NextIntlProvider from 'next-intl/client';

interface LocalizationProviderProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export default function LocalizationProvider({
  children,
  locale,
  messages,
}: LocalizationProviderProps) {
  return (
    <NextIntlProvider locale={locale} messages={messages}>
      {children}
    </NextIntlProvider>
  );
}
