'use client';

import { useTranslations } from 'next-intl';
import { useBrands } from '@/hooks/useBrands';
import styles from './page.module.scss';

export default function BrandsPage() {
  const t = useTranslations('navigation');
  const tc = useTranslations('common');
  const { data: brands, isLoading, error } = useBrands();

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('brands')}</h1>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>{tc('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('brands')}</h1>
          <div className={styles.error}>
            <p>{tc('loadErrorBrands')} {tc('tryAgainLater')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('brands')}</h1>
        <p className={styles.subtitle}>{tc('brandsSubtitle')}</p>

        {brands && brands.length > 0 ? (
          <div className={styles.grid}>
            {brands.map((brand: any) => (
              <div key={brand.id} className={styles.card}>
                {brand.image && (
                  <img src={brand.image} alt={brand.name} className={styles.image} />
                )}
                <div className={styles.placeholder} />
                <h3 className={styles.cardTitle}>{brand.name}</h3>
                {brand.category && <p className={styles.cardDescription}>{brand.category}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>{tc('noBrands')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
