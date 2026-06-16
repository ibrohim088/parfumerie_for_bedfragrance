'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useOrder } from '@/hooks/useOrder';
import styles from './order-detail.module.scss';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({
  params: { id },
}: OrderDetailPageProps) {
  const t = useTranslations('account');
  const { order } = useOrder(id);

  if (!order) return <div>{t('loading')}</div>;

  return (
    <div className={styles.orderDetail}>
      <h1>{t('order')} #{order.id}</h1>
      <div className={styles.details}>
        {/* Order details will be rendered here */}
      </div>
    </div>
  );
}
