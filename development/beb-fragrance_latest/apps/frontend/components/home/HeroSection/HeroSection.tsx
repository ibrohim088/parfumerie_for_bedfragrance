'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  const t = useTranslations('hero');
  const router = useRouter();

  const handleShopClick = () => {
    router.push('/catalog');
  };

  const handleBrandsClick = () => {
    router.push('/brands');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>

          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={handleShopClick}>
              {t('shopNow')}
            </button>
            <button className={styles.btnSecondary} onClick={handleBrandsClick}>
              {t('viewBrands')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}