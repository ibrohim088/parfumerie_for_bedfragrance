'use client';

import styles from './CartItem.module.scss';

interface CartItemProps {
  item: any;
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.details}>
        <h3>{item.name}</h3>
        <p className={styles.price}>{item.price} UZS</p>
      </div>
      <div className={styles.quantity}>
        <button>-</button>
        <input type="number" value={item.quantity} min="1" readOnly />
        <button>+</button>
      </div>
      <button className={styles.remove}>✕</button>
    </div>
  );
}
