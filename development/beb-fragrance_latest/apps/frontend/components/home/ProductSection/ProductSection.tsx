'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import styles from './ProductSection.module.scss';

interface ProductSectionProps {
  title: string;
  limit?: number;
  filters?: { [key: string]: any };
  showViewAll?: boolean;
}

const mockProducts = [
  {
    id: '1',
    name: 'Luxury Rose',
    slug: 'luxury-rose',
    image: 'https://via.placeholder.com/300x400?text=Luxury+Rose',
    price: 250000,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    slug: 'ocean-breeze',
    image: 'https://via.placeholder.com/300x400?text=Ocean+Breeze',
    price: 320000,
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Midnight Charm',
    slug: 'midnight-charm',
    image: 'https://via.placeholder.com/300x400?text=Midnight+Charm',
    price: 280000,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Blossom Dreams',
    slug: 'blossom-dreams',
    image: 'https://via.placeholder.com/300x400?text=Blossom+Dreams',
    price: 295000,
    rating: 4.7,
  },
];

export default function ProductSection({
  title,
  limit = 4,
  filters,
  showViewAll = true,
}: ProductSectionProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const { data, isLoading } = useProducts({ ...filters, limit });
  const products = data?.data || mockProducts.slice(0, limit);

  const handleProductClick = (slug: string) => {
    router.push(`/${locale}/catalog/${slug}`);
  };

  const handleViewAll = () => {
    router.push(`/${locale}/catalog`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {showViewAll && (
            <button className={styles.viewAll} onClick={handleViewAll}>
              {t('common.viewAll') || 'View All'} →
            </button>
          )}
        </div>

        {isLoading ? (
          <div className={styles.loading}>
            <p>{t('products.loading')}</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                onClick={() => handleProductClick(product.slug)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>
            <p>{t('products.noProducts')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
