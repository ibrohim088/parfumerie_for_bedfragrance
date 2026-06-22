'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { LayoutGrid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts, type Product } from '@/hooks/useProducts';
import { SORT_OPTIONS } from '@/lib/constants';
import type { FiltersType } from '@/components/catalog/CatalogSidebar/CatalogSidebar';
import styles from './CatalogGrid.module.scss';

interface CatalogGridProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

const PAGE_SIZE = 9;

// ✅ FIX 4: sortProducts funksiyasi va useMemo O'CHIRILDI.
// Avval: Barcha mahsulotlar olinib, keyin JS da saralanardi.
//         Bu qo'shimcha render va sekinlik.
// Endi: sort parametri to'g'ridan-to'g'ri API ga yuboriladi.
//        Backend saralaydi — tezroq va to'g'riroq.

export default function CatalogGrid({ filters, onChange }: CatalogGridProps) {
  const t = useTranslations('products');
  const router = useRouter();

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);

  // Filter o'zgarganda sahifani 1 ga qaytarish
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

  // ✅ sort endi API ga ham yuboriladi
  const queryParams = {
    search:        filters.search        || undefined,
    brand:         filters.brand         || undefined,
    concentration: filters.concentration || undefined,
    minPrice:      filters.minPrice      || undefined,
    maxPrice:      filters.maxPrice      || undefined,
    sort:          filters.sort          || 'newest', // ← API ga!
    page,
    limit: PAGE_SIZE,
  };

  const { data, isLoading, isError } = useProducts(queryParams);

  // ✅ Endi useMemo va sortProducts yo'q — API dan tayyor holda keladi
  const products: Product[] = data?.data || [];
  const meta = data?.meta;

  const handleProductClick = (slug: string) => {
    router.push(`/catalog/${slug}`);
  };

  // ✅ Mahsulot kartasiga hover qilganda sahifa prefetch
  const handleProductMouseEnter = (slug: string) => {
    router.prefetch(`/catalog/${slug}`);
  };

  // Faol filtr chiplari
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
      label: t(
        `gender${filters.gender.charAt(0).toUpperCase()}${filters.gender.slice(1)}` as any
      ),
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
      label: t(
        `family${f.charAt(0).toUpperCase()}${f.slice(1)}` as any
      ),
      onRemove: () =>
        onChange({ ...filters, family: filters.family.filter((x) => x !== f) }),
    });
  });

  return (
    <div className={styles.grid}>
      {/* Toolbar */}
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
              <button
                key={chip.key}
                className={styles.chip}
                onClick={chip.onRemove}
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Natijalar soni */}
      <div className={styles.header}>
        <p className={styles.count}>
          {isLoading
            ? t('loading')
            : `${meta?.total ?? products.length} ${t('productsCount')}`}
        </p>
      </div>

      {/* Loading holati */}
      {isLoading && (
        <div className={styles.loading}>
          <p>{t('loading')}</p>
        </div>
      )}

      {/* Bo'sh holat */}
      {!isLoading && (isError || products.length === 0) && (
        <div className={styles.noProducts}>
          <p>{t('noProducts')}</p>
        </div>
      )}

      {/* Mahsulotlar */}
      {!isLoading && products.length > 0 && (
        <>
          <div
            className={`${styles.products} ${view === 'list' ? styles.listView : ''}`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                onMouseEnter={() => handleProductMouseEnter(product.slug)}
              >
                <ProductCard
                  product={product}
                  view={view}
                  onClick={() => handleProductClick(product.slug)}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={!meta.hasPrevPage}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="prev"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    className={p === meta.page ? styles.activePage : ''}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              )}
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

/*
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
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
    router.push(`/catalog/${slug}`);
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
*/