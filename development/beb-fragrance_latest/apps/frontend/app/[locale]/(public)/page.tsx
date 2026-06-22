import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import FraganceBrands from '@/components/home/FraganceBrands/FraganceBrands';
import ProductSection from '@/components/home/ProductSection/ProductSection';
import InstagramSection from '@/components/home/InstagramSection/InstagramSection';
import GiftBoxSection from '@/components/home/GiftBoxSection/GiftBoxSection';
import JournalSection from '@/components/home/JournalSection/JournalSection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: 'BEB Fragrance — Premium Atirlar | Toshkent',
    description: t('metaDescription', {
      defaultValue: 'Original va eksklyuziv atirlar. Payme, Click, Naqt to\'lov.',
    }),
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <>
      <HeroSection />
      <FraganceBrands />
      <ProductSection
        title={t('bestsellers')}
        limit={4}
        filters={{ featured: 'true' }}
        showViewAll={true}
      />
      <ProductSection
        title={t('newArrivals')}
        limit={4}
        showViewAll={true}
      />
      <InstagramSection />
      <GiftBoxSection />
      <JournalSection />
    </>
  );
}



/*
'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import FraganceBrands from '@/components/home/FraganceBrands/FraganceBrands';
import ProductSection from '@/components/home/ProductSection/ProductSection';
import InstagramSection from '@/components/home/InstagramSection/InstagramSection';
import GiftBoxSection from '@/components/home/GiftBoxSection/GiftBoxSection';
import JournalSection from '@/components/home/JournalSection/JournalSection';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <HeroSection />
      <FraganceBrands />
      <ProductSection
        title={t('bestsellers')}
        limit={4}
        filters={{ featured: 'true' }}
        showViewAll={true}
      />
      <ProductSection
        title={t('newArrivals')}
        limit={4}
        showViewAll={true}
      />
      <InstagramSection />
      <GiftBoxSection />
      <JournalSection />
    </>
  );
}
*/

/*
'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import FraganceBrands from '@/components/home/FraganceBrands/FraganceBrands';
import ProductSection from '@/components/home/ProductSection/ProductSection';
import InstagramSection from '@/components/home/InstagramSection/InstagramSection';
import GiftBoxSection from '@/components/home/GiftBoxSection/GiftBoxSection';
import JournalSection from '@/components/home/JournalSection/JournalSection';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <HeroSection />
      <FraganceBrands />
      <ProductSection
        title={t('bestsellers')}
        limit={4}
        filters={{ sort: 'bestsellers' }}
        showViewAll={true}
      />
      <ProductSection
        title={t('newArrivals')}
        limit={4}
        filters={{ sort: 'newest' }}
        showViewAll={true}
      />
      <InstagramSection />
      <GiftBoxSection />
      <JournalSection />
    </>
  );
}
*/