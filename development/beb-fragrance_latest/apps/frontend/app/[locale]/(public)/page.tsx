'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory/BrandStory';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
    </>
  );
}
