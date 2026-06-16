'use client';

import { useTranslations } from 'next-intl';
import { useOrders } from '@/hooks/useOrders';
import OrderTabs from '@/components/account/OrderTabs/OrderTabs';
import styles from './orders.module.scss';

export default function OrdersPage() {
  const t = useTranslations('account');
  const { orders } = useOrders();

  return (
    <div className={styles.orders}>
      <h1>{t('orders')}</h1>
      <OrderTabs orders={orders} />
    </div>
  );
}
