'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  const t = useTranslations('hero');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const handleShopClick = () => {
    router.push(`/${locale}/catalog`);
  };

  const handleBrandsClick = () => {
    router.push(`/${locale}/brands`);
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
