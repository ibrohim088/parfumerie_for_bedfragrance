'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import CatalogSidebar, {
  type FiltersType,
} from '@/components/catalog/CatalogSidebar/CatalogSidebar';
import CatalogGrid from '@/components/catalog/CatalogGrid/CatalogGrid';
import styles from './CatalogPage.module.scss';

export default function CatalogPage() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersType>({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    gender: searchParams.get('gender') || '',
    family: searchParams.get('family') ? searchParams.get('family')!.split(',') : [],
    concentration: searchParams.get('concentration') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={`/${locale}`}>{tCommon('home')}</Link>
          <ChevronRight size={13} />
          <span>{tNav('catalog')}</span>
        </div>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>{t('title')}</h1>
        </div>
      </div>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <CatalogSidebar filters={filters} onChange={setFilters} />
        </aside>

        <main className={styles.main}>
          <CatalogGrid filters={filters} onChange={setFilters} />
        </main>
      </div>
    </div>
  );
}
