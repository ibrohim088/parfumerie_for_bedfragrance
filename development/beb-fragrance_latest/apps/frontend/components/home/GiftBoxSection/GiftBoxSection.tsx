'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './GiftBoxSection.module.scss';

export default function GiftBoxSection() {
  const t = useTranslations('home');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const handleBuildClick = () => {
    router.push(`/${locale}/gift-box`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('giftBox')}</h2>
          <p className={styles.subtitle}>{t('giftBoxSubtitle')}</p>
          <button className={styles.cta} onClick={handleBuildClick}>
            {t('startBuilding')}
          </button>
        </div>

        <div className={styles.image}>
          <div className={styles.imagePlaceholder}>
            🎁
          </div>
        </div>
      </div>
    </section>
  );
}
