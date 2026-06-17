'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ProductImages from '@/components/productDetail/ProductImages/ProductImages';
import ProductInfo from '@/components/productDetail/ProductInfo/ProductInfo';
import styles from './ProductDetailPage.module.scss';

// Mock product for development
const mockProduct = {
  id: '1',
  name: 'Luxury Rose Premium Fragrance',
  slug: 'luxury-rose',
  price: 250000,
  rating: 4.8,
  reviews: 234,
  category: 'women',
  description: 'Elegant and sophisticated fragrance for women with notes of rose, jasmine, and sandalwood. Perfect for special occasions and everyday wear.',
  inStock: true,
  images: [
    'https://via.placeholder.com/600x600?text=Product+1',
    'https://via.placeholder.com/600x600?text=Product+2',
    'https://via.placeholder.com/600x600?text=Product+3',
  ],
  specifications: {
    volume: '100ml',
    concentration: 'Eau de Parfum (EDP)',
    expiry: '3 years',
    originCountry: 'France',
  },
  ingredients: ['Rose', 'Jasmine', 'Sandalwood', 'Bergamot', 'Musk'],
  usage: 'Apply on pulse points: neck, wrists, behind ears. Use 2-3 sprays per application.',
};

export default function ProductDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  // Using mock data for now - will replace with useProduct hook when API is ready
  const product = mockProduct;
  const isLoading = false;

  if (isLoading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  if (!product) {
    return <div className={styles.notFound}>{t('noProducts')}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <button onClick={() => router.back()} className={styles.back}>
          <ArrowLeft size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          Back
        </button>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.container}>
        <div className={styles.gallery}>
          <ProductImages images={product.images} />
        </div>

        <div className={styles.info}>
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
