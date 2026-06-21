'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useBrands } from '@/hooks/useBrands';
import styles from './FraganceBrands.module.scss';

export default function FraganceBrands() {
  const t = useTranslations('home');
  const router = useRouter();

  const { data: brands, isLoading } = useBrands();

  const handleBrandClick = (brandName: string) => {
    router.push(`/catalog?brand=${encodeURIComponent(brandName)}`);
  };

  if (isLoading) return null;
  if (!Array.isArray(brands) || brands.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('brands.title')}</h2>

        <div className={styles.brandsList}>
          {brands.map((brand: any) => (
            <button
              key={brand.id}
              className={styles.brandTag}
              onClick={() => handleBrandClick(brand.name)}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


/*
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './FraganceBrands.module.scss';

const brands = [
  'LOUIS VUITTON',
  'DIOR',
  'BYREDO',
  'CREED',
  'LE LABO',
  'DIPTYQUE',
  'JO MALONE',
  'HEELEY',
  'MAISON MARGIELA',
  'FRAGOMIST',
  'PARFUMS DE MARLY',
  'NISHANE',
];

export default function FraganceBrands() {
  const t = useTranslations('home');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const handleBrandClick = (brandName: string) => {
    router.push(`/${locale}/catalog?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('brands.title')}</h2>

        <div className={styles.brandsList}>
          {brands.map((brand) => (
            <button
              key={brand}
              className={styles.brandTag}
              onClick={() => handleBrandClick(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

*/