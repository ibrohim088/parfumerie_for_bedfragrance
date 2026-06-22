'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import styles from './ProductSection.module.scss';

interface ProductSectionProps {
  title: string;
  limit?: number;
  filters?: { [key: string]: any };
  showViewAll?: boolean;
}

export default function ProductSection({
  title,
  limit = 4,
  filters,
  showViewAll = true,
}: ProductSectionProps) {
  const t = useTranslations();
  const router = useRouter();

  const { data, isLoading } = useProducts({ ...filters, limit });
  const products = data?.data || [];

  const handleProductClick = (slug: string) => {
    router.push(`/catalog/${slug}`);
  };

  const handleViewAll = () => {
    router.push('/catalog');
  };

  // ✅ FIX: "Barchasini ko'rish" tugmasiga hover qilganda
  // /catalog sahifasi oldindan yuklanadi (prefetch).
  // Foydalanuvchi bosganida sahifa allaqachon tayyor bo'ladi — 0ms!
  const handleViewAllMouseEnter = () => {
    router.prefetch('/catalog');
  };

  // ✅ FIX: Mahsulot kartasiga hover qilganda mahsulot sahifasi prefetch
  const handleProductMouseEnter = (slug: string) => {
    router.prefetch(`/catalog/${slug}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {showViewAll && (
            <button
              className={styles.viewAll}
              onClick={handleViewAll}
              onMouseEnter={handleViewAllMouseEnter}
            >
              {t('common.viewAll')}{' '}
              <ArrowRight size={16} style={{ verticalAlign: 'middle' }} />
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
              <div
                key={product.id}
                onMouseEnter={() => handleProductMouseEnter(product.slug)}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                  onClick={() => handleProductClick(product.slug)}
                />
              </div>
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

/*
'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import styles from './ProductSection.module.scss';

interface ProductSectionProps {
  title: string;
  limit?: number;
  filters?: { [key: string]: any };
  showViewAll?: boolean;
}

export default function ProductSection({
  title,
  limit = 4,
  filters,
  showViewAll = true,
}: ProductSectionProps) {
  const t = useTranslations();
  const router = useRouter();

  const { data, isLoading } = useProducts({ ...filters, limit });
  const products = data?.data || [];

  const handleProductClick = (slug: string) => {
    router.push(`/catalog/${slug}`);
  };

  const handleViewAll = () => {
    router.push('/catalog');
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {showViewAll && (
            <button className={styles.viewAll} onClick={handleViewAll}>
              {t('common.viewAll')}{' '}
              <ArrowRight size={16} style={{ verticalAlign: 'middle' }} />
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
*/