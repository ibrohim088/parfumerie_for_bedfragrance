'use client';

import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import styles from './PaymentStatus.module.scss';

interface PaymentStatusProps {
  status: 'pending' | 'success' | 'failed';
  message?: string;
}

export default function PaymentStatus({ status, message }: PaymentStatusProps) {
  const statusConfig = {
    pending: { icon: Clock, label: 'Kutilmoqda', color: 'pending' },
    success: { icon: CheckCircle2, label: 'Amalga oshirildi', color: 'success' },
    failed: { icon: XCircle, label: 'Bekor qilindi', color: 'failed' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`${styles.status} ${styles[config.color]}`}>
      <span className={styles.icon}>
        <StatusIcon size={20} />
      </span>
      <div>
        <h4>{config.label}</h4>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
