'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProductGrid from '@/components/catalog/ProductGrid/ProductGrid';
import FilterPanel from '@/components/catalog/FilterPanel/FilterPanel';
import styles from './catalog.module.scss';

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000000],
    sort: 'newest',
    search: '',
  });

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </aside>
          <main className={styles.main}>
            <ProductGrid filters={filters} />
          </main>
        </div>
      </div>
    </div>
  );
}
