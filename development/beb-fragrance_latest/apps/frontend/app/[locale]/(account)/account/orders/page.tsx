'use client';

import { useTranslations } from 'next-intl';
import { useOrders } from '@/hooks/useOrders';
import OrderTabs from '@/components/account/OrderTabs/OrderTabs';
import styles from './orders.module.scss';

export default function OrdersPage() {
  const t = useTranslations('account');
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className={styles.orders}>
        <h1>{t('orders')}</h1>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.orders}>
        <h1>{t('orders')}</h1>
        <div className={styles.error}>
          <p>Failed to load orders: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      <h1>{t('orderHistory')}</h1>
      <OrderTabs orders={orders} />
    </div>
  );
}
