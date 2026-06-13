'use client';

import { useTranslations } from 'next-intl';
import styles from './payment.module.scss';

export default function PaymentPage() {
  const t = useTranslations('account');

  return (
    <div className={styles.payment}>
      <h1>{t('paymentMethods')}</h1>
      {/* Payment methods list */}
    </div>
  );
}
