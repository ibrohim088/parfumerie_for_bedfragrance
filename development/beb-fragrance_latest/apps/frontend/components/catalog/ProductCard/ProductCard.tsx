'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  image: string;
  price: number;
  rating?: number;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  brand,
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
        <button
          className={styles.wishlist}
          onClick={(e) => e.stopPropagation()}
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
        <div className={styles.overlay}>
          <button
            className={styles.addToCart}
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {brand && <span className={styles.brand}>{brand}</span>}
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.price}>{formattedPrice} UZS</span>
      </div>
    </div>
  );
}
