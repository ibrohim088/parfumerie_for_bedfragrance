'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import styles from './account.module.scss';

export default function AccountPage() {
  const t = useTranslations('account');
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.account}>
      <h1>{t('welcome')}, {user.fullName}</h1>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>{t('totalOrders')}</span>
          <span className={styles.value}>0</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>{t('totalSpent')}</span>
          <span className={styles.value}>0 UZS</span>
        </div>
      </div>
    </div>
  );
}
