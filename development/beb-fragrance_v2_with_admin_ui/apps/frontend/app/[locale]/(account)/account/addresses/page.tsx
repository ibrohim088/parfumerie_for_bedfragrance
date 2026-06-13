'use client';

import { useTranslations } from 'next-intl';
import { useAddresses } from '@/hooks/useAddresses';
import styles from './addresses.module.scss';

export default function AddressesPage() {
  const t = useTranslations('account');
  const { addresses } = useAddresses();

  return (
    <div className={styles.addresses}>
      <h1>{t('addresses')}</h1>
      <div className={styles.list}>
        {addresses?.map((address) => (
          <div key={address.id} className={styles.card}>
            {/* Address card content */}
          </div>
        ))}
      </div>
    </div>
  );
}
