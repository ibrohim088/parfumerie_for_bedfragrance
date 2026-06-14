import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.scss';

export const metadata: Metadata = {
  title: 'BEB Fragrance - Premium Atirlar',
  description: 'Eng yaxshi sifatdagi xalqa mashhur atirlar. Payme, Click, Naqt to\'lovlar qabul qilinadi.',
  keywords: 'atir, fragrance, parfyum, Tashkent, Uzbekistan',
  authors: [{ name: 'BEB Fragrance' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://bebfragrance.uz',
    siteName: 'BEB Fragrance',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
