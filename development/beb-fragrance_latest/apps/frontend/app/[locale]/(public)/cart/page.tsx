'use client';

import { useTranslations } from 'next-intl';
import CartItem from '@/components/cart/CartItem/CartItem';
import CartSummary from '@/components/cart/CartSummary/CartSummary';
import { useCart } from '@/hooks/useCart';
import styles from './cart.module.scss';

export default function CartPage() {
  const t = useTranslations('cart');
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{t('empty')}</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <div className={styles.content}>
          <div className={styles.items}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary total={total} />
        </div>
      </div>
    </div>
  );
}
