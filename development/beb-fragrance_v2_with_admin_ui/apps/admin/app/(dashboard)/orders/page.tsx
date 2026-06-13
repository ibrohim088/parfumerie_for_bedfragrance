'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/orders/OrdersTable/OrdersTable';
import { AdminSearchInput } from '@/components/ui/AdminSearchInput/AdminSearchInput';
import { AdminSelect } from '@/components/ui/AdminSelect/AdminSelect';
import { AdminPagination } from '@/components/ui/AdminPagination/AdminPagination';
import { Spinner } from '@/components/ui/Spinner/Spinner';

const STATUS_OPTIONS = [
  { value: '', label: 'Barcha statuslar' },
  { value: 'pending', label: 'Kutilmoqda' },
  { value: 'confirmed', label: 'Tasdiqlangan' },
  { value: 'processing', label: 'Jarayonda' },
  { value: 'shipped', label: 'Yetkazilmoqda' },
  { value: 'delivered', label: 'Yetkazildi' },
  { value: 'cancelled', label: 'Bekor qilingan' },
  { value: 'refunded', label: 'Qaytarilgan' },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: '', label: 'Barcha to\'lovlar' },
  { value: 'pending', label: 'Kutilmoqda' },
  { value: 'pending_cash', label: 'Naqd — kutilmoqda' },
  { value: 'paid', label: 'To\'langan' },
  { value: 'failed', label: 'Muvaffaqiyatsiz' },
  { value: 'refunded', label: 'Qaytarilgan' },
];

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') ?? '');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [page, setPage] = useState(1);

  const { orders, pagination, isLoading } = useOrders({
    search: search || undefined,
    status: status || undefined,
    paymentStatus: paymentStatus || undefined,
    page,
    limit: 20,
    admin: true,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Buyurtmalar</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Jami: {pagination?.total ?? 0} ta buyurtma
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <AdminSearchInput
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Buyurtma raqami yoki telefon..."
          style={{ flex: '1', minWidth: '220px' }}
        />
        <AdminSelect
          value={status}
          onChange={(v) => { setStatus(v); setPage(1); }}
          options={STATUS_OPTIONS}
        />
        <AdminSelect
          value={paymentStatus}
          onChange={(v) => { setPaymentStatus(v); setPage(1); }}
          options={PAYMENT_STATUS_OPTIONS}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <OrdersTable
          orders={orders ?? []}
          onRowClick={(id) => router.push(`/orders/${id}`)}
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
