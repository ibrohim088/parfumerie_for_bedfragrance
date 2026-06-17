'use client';

import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart } from 'lucide-react';
import {
  getPrimaryImage,
  getMinPrice,
  isNewProduct,
  type Product,
} from '@/hooks/useProducts';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product?: Product;
  // Sodda props (to'g'ridan-to'g'ri ishlatish uchun)
  id?: string;
  name?: string;
  brand?: string;
  image?: string;
  price?: number;
  rating?: number;
  view?: 'grid' | 'list';
  onClick?: () => void;
}

export default function ProductCard({
  product,
  id,
  name,
  brand,
  image,
  price,
  rating,
  view = 'grid',
  onClick,
}: ProductCardProps) {
  const t = useTranslations('products');

  // Product object bo'lsa undan olish, aks holda sodda props
  const resolvedImage  = product ? getPrimaryImage(product) : (image ?? '');
  const resolvedPrice  = product ? getMinPrice(product)     : (price ?? 0);
  const resolvedName   = product?.name  ?? name  ?? '';
  const resolvedBrand  = product?.brand ?? brand ?? '';

  const formattedPrice = resolvedPrice
    ? resolvedPrice.toLocaleString('uz-UZ')
    : '0';

  const statusBadge = product
    ? product.isFeatured
      ? t('bestseller')
      : isNewProduct(product)
        ? t('newBadge')
        : null
    : null;

  const noteTags = product
    ? [product.topNotes?.[0], product.baseNotes?.[0]]
        .filter(Boolean)
        .map((n) => String(n).toUpperCase())
    : [];

  return (
    <div
      className={`${styles.card} ${view === 'list' ? styles.listCard : ''}`}
      onClick={onClick}
    >
      <div className={styles.image}>
        {/* Concentration badge */}
        {product?.concentration && (
          <span className={styles.typeBadge}>
            {product.concentration.toUpperCase()}
          </span>
        )}

        {/* Status badge: Bestseller / New */}
        {statusBadge && (
          <span
            className={`${styles.statusBadge} ${
              product?.isFeatured ? styles.bestseller : styles.newBadge
            }`}
          >
            {statusBadge}
          </span>
        )}

        <img src={resolvedImage} alt={resolvedName} loading="lazy" />

        {/* Wishlist */}
        <button
          className={styles.wishlist}
          onClick={(e) => e.stopPropagation()}
          aria-label={t('addToWishlist')}
        >
          <Heart size={16} />
        </button>

        {/* Add to Cart overlay */}
        <div className={styles.overlay}>
          <button
            className={styles.addToCart}
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart size={15} />
            {t('addToCart')}
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {resolvedBrand && (
          <span className={styles.brand}>{resolvedBrand}</span>
        )}
        <h3 className={styles.name}>{resolvedName}</h3>
        <div className={styles.bottomRow}>
          <span className={styles.price}>{formattedPrice} UZS</span>
          {noteTags.length > 0 && (
            <span className={styles.notes}>{noteTags.join(' / ')}</span>
          )}
        </div>
      </div>
    </div>
  );
}