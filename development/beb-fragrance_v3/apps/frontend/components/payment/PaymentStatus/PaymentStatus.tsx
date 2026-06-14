'use client';

import styles from './PaymentStatus.module.scss';

interface PaymentStatusProps {
  status: 'pending' | 'success' | 'failed';
  message?: string;
}

export default function PaymentStatus({ status, message }: PaymentStatusProps) {
  const statusConfig = {
    pending: { icon: '⏳', label: 'Kutilmoqda', color: 'pending' },
    success: { icon: '✓', label: 'Amalga oshirildi', color: 'success' },
    failed: { icon: '✕', label: 'Bekor qilindi', color: 'failed' },
  };

  const config = statusConfig[status];

  return (
    <div className={`${styles.status} ${styles[config.color]}`}>
      <span className={styles.icon}>{config.icon}</span>
      <div>
        <h4>{config.label}</h4>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
