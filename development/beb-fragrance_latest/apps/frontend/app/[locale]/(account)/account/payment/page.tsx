'use client';

import { useTranslations } from 'next-intl';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import styles from './payment.module.scss';

export default function PaymentPage() {
  const t = useTranslations('account');

  // TODO: Implement payment methods fetching from API
  // For now, showing empty state with add payment method button

  return (
    <div className={styles.payment}>
      <div className={styles.header}>
        <h1>{t('paymentMethods')}</h1>
        <button className={styles.addBtn}>
          <Plus size={20} />
          {t('addPaymentMethod')}
        </button>
      </div>

      <div className={styles.empty}>
        <CreditCard size={48} />
        <p>{t('noPaymentMethods')}</p>
      </div>

      <div className={styles.info}>
        <h2>Supported Payment Methods:</h2>
        <ul>
          <li>💳 Payme</li>
          <li>💳 Click</li>
          <li>💵 Cash on Delivery</li>
        </ul>
      </div>
    </div>
  );
}
