'use client';

import { useState } from 'react';
import styles from './OrderStatusSelect.module.scss';

interface OrderStatusSelectProps {
  currentStatus: string;
  onUpdate: (status: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'pending', label: 'Kutilmoqda' },
  { value: 'confirmed', label: 'Tasdiqlangan' },
  { value: 'processing', label: 'Jarayonda' },
  { value: 'shipped', label: 'Yetkazilmoqda' },
  { value: 'delivered', label: 'Yetkazildi' },
  { value: 'cancelled', label: 'Bekor qilingan' },
  { value: 'refunded', label: 'Qaytarilgan' },
];

const STATUS_CLASS: Record<string, string> = {
  pending: styles.pending,
  confirmed: styles.info,
  processing: styles.info,
  shipped: styles.info,
  delivered: styles.success,
  cancelled: styles.error,
  refunded: styles.muted,
};

export function OrderStatusSelect({
  currentStatus,
  onUpdate,
  isLoading = false,
  disabled = false,
}: OrderStatusSelectProps) {
  const [value, setValue] = useState(currentStatus);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    if (next === value) return;
    setValue(next);
    onUpdate(next);
  };

  return (
    <div className={`${styles.wrapper} ${STATUS_CLASS[value] ?? ''}`}>
      <select
        className={styles.select}
        value={value}
        onChange={handleChange}
        disabled={disabled || isLoading}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
    </div>
  );
}
