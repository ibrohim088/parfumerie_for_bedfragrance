'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ProductGallery from '@/components/catalog/ProductGallery/ProductGallery';
import styles from './product-detail.module.scss';

interface ProductDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function ProductDetailPage({
  params: { slug },
}: ProductDetailPageProps) {
  const t = useTranslations('product');

  // TODO: Fetch product data using slug from backend

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.gallery}>
            <ProductGallery />
          </div>
          <div className={styles.details}>
            {/* Product details akan diisi dari data */}
          </div>
        </div>
      </div>
    </div>
  );
}
