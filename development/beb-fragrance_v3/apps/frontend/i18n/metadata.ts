import { Metadata } from 'next';
import { Locale } from './locales';

export const metadataByLocale: Record<Locale, Metadata> = {
  uz: {
    title: 'BEB Fragrance - Eng Yaxshi Atirlari',
    description: 'Zamonaviy atir dunyo. Eng Yaxshi Atirlari Sifati va Arzonligi bilan.',
    keywords: 'atir, fragrance, parfum, qalinlik, aromat',
    alternates: {
      languages: {
        ru: 'https://bebfragrance.uz/ru',
        uz: 'https://bebfragrance.uz/uz',
      },
    },
    openGraph: {
      title: 'BEB Fragrance - Eng Yaxshi Atirlari',
      description: 'Zamonaviy atir dunyo. Eng Yaxshi Atirlari Sifati va Arzonligi bilan.',
      url: 'https://bebfragrance.uz/uz',
      siteName: 'BEB Fragrance',
      locale: 'uz_UZ',
    },
  },
  ru: {
    title: 'BEB Fragrance - Лучшие Духи и Парфюмерия',
    description: 'Мир современной парфюмерии. Лучшие ароматы с качеством и доступной ценой.',
    keywords: 'духи, парфюмерия, fragrance, ароматы, парфюм',
    alternates: {
      languages: {
        ru: 'https://bebfragrance.uz/ru',
        uz: 'https://bebfragrance.uz/uz',
      },
    },
    openGraph: {
      title: 'BEB Fragrance - Лучшие Духи и Парфюмерия',
      description: 'Мир современной парфюмерии. Лучшие ароматы с качеством и доступной ценой.',
      url: 'https://bebfragrance.uz/ru',
      siteName: 'BEB Fragrance',
      locale: 'ru_RU',
    },
  },
};

export function getMetadata(locale: Locale): Metadata {
  return metadataByLocale[locale];
}
