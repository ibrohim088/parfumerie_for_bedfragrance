'use client';

import styles from './ProductCard.module.scss';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  rating = 4.5,
  onClick,
}: ProductCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.image}>
        <img src={image} alt={name} loading="lazy" />
        <div className={styles.overlay}>
          <button className={styles.addToCart}>🛒 Add to Cart</button>
        </div>
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{price.toLocaleString()} UZS</span>
          <span className={styles.rating}>⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}
