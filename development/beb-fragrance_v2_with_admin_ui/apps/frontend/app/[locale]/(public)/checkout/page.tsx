'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector/PaymentMethodSelector';
import styles from './checkout.module.scss';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'cash'>('payme');

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <div className={styles.content}>
          <div className={styles.form}>
            <section className={styles.section}>
              <h2>{t('deliveryAddress')}</h2>
              {/* Address form */}
            </section>
            <section className={styles.section}>
              <h2>{t('paymentMethod')}</h2>
              <PaymentMethodSelector
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
            </section>
          </div>
          <div className={styles.summary}>
            {/* Order summary */}
          </div>
        </div>
      </div>
    </div>
  );
}
