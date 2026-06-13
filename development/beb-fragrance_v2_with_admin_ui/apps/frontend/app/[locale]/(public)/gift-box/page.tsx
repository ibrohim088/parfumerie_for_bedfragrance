'use client';

import { useTranslations } from 'next-intl';
import styles from './gift-box.module.scss';

export default function GiftBoxPage() {
  const t = useTranslations('giftBox');

  return (
    <div className={styles.giftBox}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </div>
    </div>
  );
}
