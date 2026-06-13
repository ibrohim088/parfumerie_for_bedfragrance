'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { ProductsTable } from '@/components/products/ProductsTable/ProductsTable';
import { AdminSearchInput } from '@/components/ui/AdminSearchInput/AdminSearchInput';
import { AdminSelect } from '@/components/ui/AdminSelect/AdminSelect';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { AdminPagination } from '@/components/ui/AdminPagination/AdminPagination';
import { Spinner } from '@/components/ui/Spinner/Spinner';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
  { value: 'out_of_stock', label: 'Stokda yo\'q' },
  { value: '', label: 'Barchasi' },
];

const CONCENTRATION_OPTIONS = [
  { value: '', label: 'Barcha kontsentratsiyalar' },
  { value: 'parfum', label: 'Parfum' },
  { value: 'edp', label: 'EDP' },
  { value: 'edt', label: 'EDT' },
  { value: 'edc', label: 'EDC' },
  { value: 'body_mist', label: 'Body Mist' },
];

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('active');
  const [concentration, setConcentration] = useState('');
  const [page, setPage] = useState(1);

  const { products, pagination, isLoading, deleteProduct } = useProducts({
    search: search || undefined,
    status: status || undefined,
    concentration: concentration || undefined,
    page,
    limit: 20,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Mahsulotlar</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Jami: {pagination?.total ?? 0} ta mahsulot
          </p>
        </div>
        <AdminButton onClick={() => router.push('/products/new')}>
          + Yangi mahsulot
        </AdminButton>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <AdminSearchInput
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Nom yoki brend bo'yicha qidirish..."
          style={{ flex: '1', minWidth: '220px' }}
        />
        <AdminSelect
          value={status}
          onChange={(v) => { setStatus(v); setPage(1); }}
          options={STATUS_OPTIONS}
        />
        <AdminSelect
          value={concentration}
          onChange={(v) => { setConcentration(v); setPage(1); }}
          options={CONCENTRATION_OPTIONS}
        />
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <ProductsTable
          products={products ?? []}
          onEdit={(id) => router.push(`/products/${id}/edit`)}
          onDelete={deleteProduct}
        />
      )}

      {pagination && pagination.totalPages > 1 && (
        <AdminPagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
