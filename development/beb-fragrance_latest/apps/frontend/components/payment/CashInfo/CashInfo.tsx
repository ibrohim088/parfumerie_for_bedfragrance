'use client';

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
          <p><strong>💳 Minimal summa:</strong> 50,000 UZS</p>
          <p><strong>💵 Maksimal summa:</strong> 5,000,000 UZS</p>
          <p><strong>📅 To'lov vaqti:</strong> Yetkazib berishda</p>
        </div>
      </div>
    </div>
  );
}
