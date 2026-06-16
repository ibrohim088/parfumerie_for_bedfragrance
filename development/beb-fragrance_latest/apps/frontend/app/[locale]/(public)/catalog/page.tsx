'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import CatalogSidebar from '@/components/catalog/CatalogSidebar/CatalogSidebar';
import CatalogGrid from '@/components/catalog/CatalogGrid/CatalogGrid';
import styles from './CatalogPage.module.scss';

export default function CatalogPage() {
  const t = useTranslations('products');
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>
          Explore our curated collection of premium fragrances
        </p>
      </div>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <CatalogSidebar filters={filters} onChange={handleFilterChange} />
        </aside>

        <main className={styles.main}>
          <CatalogGrid filters={filters} />
        </main>
      </div>
    </div>
  );
}
