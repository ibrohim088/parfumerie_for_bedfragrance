'use client';

import { CreditCard, Banknote, Calendar } from 'lucide-react';
import styles from './CashInfo.module.scss';

export default function CashInfo() {
  return (
    <div className={styles.info}>
      <div className={styles.card}>
        <h4>Naqt Pul To'lov Ma'lumotlari</h4>
        <p>
          Buyurtmani tasdiqlash uchun, kuryerni kutib olinganda naqt pul bilan to'lovni amalga oshiring.
        </p>
        <div className={styles.details}>
          <p>
            <CreditCard size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            <strong>Minimal summa:</strong> 50,000 UZS
          </p>
          <p>
            <Banknote size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            <strong>Maksimal summa:</strong> 5,000,000 UZS
          </p>
          <p>
            <Calendar size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            <strong>To'lov vaqti:</strong> Yetkazib berishda
          </p>
        </div>
      </div>
    </div>
  );
}
