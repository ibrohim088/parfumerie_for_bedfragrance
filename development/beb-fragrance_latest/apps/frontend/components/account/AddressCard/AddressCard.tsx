'use client';

import { MapPin, Phone } from 'lucide-react';
import styles from './AddressCard.module.scss';

interface AddressCardProps {
  id: string;
  title: string;
  address: string;
  phone: string;
  isDefault?: boolean;
}

export default function AddressCard({ id, title, address, phone, isDefault }: AddressCardProps) {
  return (
    <div className={`${styles.card} ${isDefault ? styles.default : ''}`}>
      <div className={styles.header}>
        <h4>{title}</h4>
        {isDefault && <span className={styles.badge}>Asosiy</span>}
      </div>
      <p className={styles.address}>
        <MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        {address}
      </p>
      <p className={styles.phone}>
        <Phone size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        {phone}
      </p>
      <div className={styles.actions}>
        <button className={styles.edit}>Tahrirlash</button>
        <button className={styles.delete}>O'chirish</button>
      </div>
    </div>
  );
}
