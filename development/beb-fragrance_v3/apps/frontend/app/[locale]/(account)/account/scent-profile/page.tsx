'use client';

import { useTranslations } from 'next-intl';
import { useScentProfile } from '@/hooks/useScentProfile';
import styles from './scent-profile.module.scss';

export default function ScentProfilePage() {
  const t = useTranslations('account');
  const { profile } = useScentProfile();

  return (
    <div className={styles.scentProfile}>
      <h1>{t('scentProfile')}</h1>
      {/* Scent profile form */}
    </div>
  );
}
