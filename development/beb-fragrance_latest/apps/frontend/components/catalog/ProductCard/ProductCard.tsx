'use client';

import { Star, ShoppingCart } from 'lucide-react';
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
  price = 0,
  rating = 4.5,
  onClick,
}: ProductCardProps) {
  const formattedPrice = price ? Number(price).toLocaleString() : '0';

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.image}>
        <img src={image} alt={name} loading="lazy" />
        <div className={styles.overlay}>
          <button className={styles.addToCart}>
            <ShoppingCart size={16} style={{ marginRight: '6px' }} />
            Add to Cart
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{formattedPrice} UZS</span>
          <span className={styles.rating}>
            <Star size={14} style={{ fill: '#ffc107', color: '#ffc107', marginRight: '4px' }} />
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
}
