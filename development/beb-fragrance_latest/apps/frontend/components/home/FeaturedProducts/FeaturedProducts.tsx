'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import styles from './FeaturedProducts.module.scss';

// Mock data - fallback when API is not available
const mockProducts = [
  {
    id: "1",
    name: "Luxury Rose",
    slug: "luxury-rose",
    image: "https://via.placeholder.com/300x300?text=Luxury+Rose",
    price: 250000,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Ocean Breeze",
    slug: "ocean-breeze",
    image: "https://via.placeholder.com/300x300?text=Ocean+Breeze",
    price: 320000,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Midnight Charm",
    slug: "midnight-charm",
    image: "https://via.placeholder.com/300x300?text=Midnight+Charm",
    price: 280000,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Blossom Dreams",
    slug: "blossom-dreams",
    image: "https://via.placeholder.com/300x300?text=Blossom+Dreams",
    price: 295000,
    rating: 4.7,
  },
];

export default function FeaturedProducts() {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const { data, isLoading } = useProducts({ limit: 4 });
  const products = data?.data || mockProducts;

  const handleProductClick = (slug: string) => {
    router.push(`/${locale}/catalog/${slug}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('featured')}</h2>

        {isLoading ? (
          <div className={styles.loading}>
            <p>{t('loading')}</p>
          </div>
        ) : products.length > 0 ? (
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
            <p>{t('noProducts')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
