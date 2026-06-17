'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutGrid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts, getMinPrice, type Product } from '@/hooks/useProducts';
import { SORT_OPTIONS } from '@/lib/constants';
import type { FiltersType } from '@/components/catalog/CatalogSidebar/CatalogSidebar';
import styles from './CatalogGrid.module.scss';

interface CatalogGridProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

const PAGE_SIZE = 9;

function sortProducts(products: Product[], sort: string): Product[] {
  const list = [...products];
  switch (sort) {
    case SORT_OPTIONS.PRICE_LOW:
      return list.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    case SORT_OPTIONS.PRICE_HIGH:
      return list.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    case SORT_OPTIONS.POPULAR:
      return list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    case SORT_OPTIONS.OLDEST:
      return list.sort(
        (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
      );
    case SORT_OPTIONS.NEWEST:
    default:
      return list.sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
  }
}

export default function CatalogGrid({ filters, onChange }: CatalogGridProps) {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [
    filters.search,
    filters.brand,
    filters.gender,
    filters.family.join(','),
    filters.concentration,
    filters.minPrice,
    filters.maxPrice,
  ]);

  const queryParams = {
    search: filters.search || undefined,
    brand: filters.brand || undefined,
    concentration: filters.concentration || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
    page,
    limit: PAGE_SIZE,
  };

  const { data, isLoading, isError } = useProducts(queryParams);
  const rawProducts = data?.data || [];
  const products = useMemo(() => sortProducts(rawProducts, filters.sort), [rawProducts, filters.sort]);
  const meta = data?.meta;

  const handleProductClick = (slug: string) => {
    router.push(`/${locale}/catalog/${slug}`);
  };

  const handleSortChange = (value: string) => {
    onChange({ ...filters, sort: value });
  };

  // ── Faol filtr chiplari ──────────────────────────────────────
  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (filters.brand) {
    chips.push({
      key: 'brand',
      label: filters.brand,
      onRemove: () => onChange({ ...filters, brand: '' }),
    });
  }
  if (filters.gender) {
    chips.push({
      key: 'gender',
      label: t(`gender${filters.gender.charAt(0).toUpperCase()}${filters.gender.slice(1)}` as any),
      onRemove: () => onChange({ ...filters, gender: '' }),
    });
  }
  if (filters.concentration) {
    chips.push({
      key: 'concentration',
      label: filters.concentration.toUpperCase(),
      onRemove: () => onChange({ ...filters, concentration: '' }),
    });
  }
  filters.family.forEach((f) => {
    chips.push({
      key: `family-${f}`,
      label: t(`family${f.charAt(0).toUpperCase()}${f.slice(1)}` as any),
      onRemove: () => onChange({ ...filters, family: filters.family.filter((x) => x !== f) }),
    });
  });

  const sortOptions = [
    { value: SORT_OPTIONS.NEWEST, label: t('sortNewest') },
    { value: SORT_OPTIONS.POPULAR, label: t('sortBestsellers') },
    { value: SORT_OPTIONS.PRICE_LOW, label: t('sortPriceAsc') },
    { value: SORT_OPTIONS.PRICE_HIGH, label: t('sortPriceDesc') },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.toolbar}>
        <div className={styles.viewToggle}>
          <button
            className={view === 'grid' ? styles.active : ''}
            aria-label={t('gridView')}
            onClick={() => setView('grid')}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={view === 'list' ? styles.active : ''}
            aria-label={t('listView')}
            onClick={() => setView('list')}
          >
            <List size={16} />
          </button>
        </div>

        {chips.length > 0 && (
          <div className={styles.chips}>
            {chips.map((chip) => (
              <button key={chip.key} className={styles.chip} onClick={chip.onRemove}>
                {chip.label}
                <X size={12} />
              </button>
            ))}
          </div>
        )}

        <div className={styles.sortWrap}>
          <span className={styles.sortLabel}>{t('sortBy')}</span>
          <select
            value={filters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.sortSelect}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.header}>
        <p className={styles.count}>
          {isLoading
            ? t('loading')
            : `${meta?.total ?? products.length} ${t('productsCount')}`}
        </p>
      </div>

      {isLoading && (
        <div className={styles.loading}>
          <p>{t('loading')}</p>
        </div>
      )}

      {!isLoading && (isError || products.length === 0) && (
        <div className={styles.noProducts}>
          <p>{t('noProducts')}</p>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <>
          <div className={`${styles.products} ${view === 'list' ? styles.listView : ''}`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                view={view}
                onClick={() => handleProductClick(product.slug)}
              />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={!meta.hasPrevPage}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="prev"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={p === meta.page ? styles.activePage : ''}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={!meta.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
                aria-label="next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
