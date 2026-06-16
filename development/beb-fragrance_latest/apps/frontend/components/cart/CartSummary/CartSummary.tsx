'use client';

import Link from 'next/link';
import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
  const shipping = 50000; // 50,000 UZS
  const subtotal = total;
  const totalWithShipping = subtotal + shipping;

  return (
    <div className={styles.summary}>
      <h3>Buyurtma Jami</h3>

      <div className={styles.row}>
        <span>Subtotal:</span>
        <span>{subtotal.toLocaleString()} UZS</span>
      </div>

      <div className={styles.row}>
        <span>Yetkazish:</span>
        <span>{shipping.toLocaleString()} UZS</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.row + ' ' + styles.total}>
        <span>Jami:</span>
        <span>{totalWithShipping.toLocaleString()} UZS</span>
      </div>

      <Link href="/checkout" className={styles.button}>
        To'lovga o'tish
      </Link>
    </div>
  );
}
