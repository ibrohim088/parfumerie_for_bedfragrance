'use client';

import styles from './OrderCard.module.scss';
import Badge from '@/components/ui/Badge/Badge';

interface OrderCardProps {
  id: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  items: number;
}

export default function OrderCard({ id, date, status, total, items }: OrderCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>Buyurtma #{id}</h4>
        <Badge variant={status === 'completed' ? 'success' : status === 'cancelled' ? 'danger' : 'warning'}>
          {status}
        </Badge>
      </div>
      <div className={styles.body}>
        <p>
          <span>Sana:</span>
          <strong>{new Date(date).toLocaleDateString('uz-UZ')}</strong>
        </p>
        <p>
          <span>Mahsulotlar:</span>
          <strong>{items} ta</strong>
        </p>
        <p>
          <span>Jami summa:</span>
          <strong>{total.toLocaleString('uz-UZ')} UZS</strong>
        </p>
      </div>
    </div>
  );
}
