'use client';

import { useState } from 'react';
import { usePayments } from '@/hooks/usePayments';
import { PaymentsTable } from '@/components/payments/PaymentsTable/PaymentsTable';
import { RefundModal } from '@/components/payments/RefundModal/RefundModal';
import { AdminSelect } from '@/components/ui/AdminSelect/AdminSelect';
import { AdminPagination } from '@/components/ui/AdminPagination/AdminPagination';
import { Spinner } from '@/components/ui/Spinner/Spinner';

const STATUS_OPTIONS = [
  { value: '', label: 'Barcha to\'lovlar' },
  { value: 'pending', label: 'Kutilmoqda' },
  { value: 'pending_cash', label: 'Naqd — kutilmoqda' },
  { value: 'paid', label: 'To\'langan' },
  { value: 'failed', label: 'Muvaffaqiyatsiz' },
  { value: 'refunded', label: 'Qaytarilgan' },
];

const PROVIDER_OPTIONS = [
  { value: '', label: 'Barcha provayderlar' },
  { value: 'payme', label: 'Payme' },
  { value: 'click', label: 'Click' },
  { value: 'cash', label: 'Naqd pul' },
];

export default function PaymentsPage() {
  const [status, setStatus] = useState('');
  const [provider, setProvider] = useState('');
  const [page, setPage] = useState(1);
  const [refundId, setRefundId] = useState<string | null>(null);

  const { payments, pagination, isLoading, confirmCash, rejectCash, refund } = usePayments({
    status: status || undefined,
    provider: provider || undefined,
    page,
    limit: 20,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>To'lovlar</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Jami: {pagination?.total ?? 0} ta tranzaksiya
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <AdminSelect
          value={status}
          onChange={(v) => { setStatus(v); setPage(1); }}
          options={STATUS_OPTIONS}
        />
        <AdminSelect
          value={provider}
          onChange={(v) => { setProvider(v); setPage(1); }}
          options={PROVIDER_OPTIONS}
        />
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {[
          { label: 'To\'langan', count: payments?.filter(p => p.status === 'paid').length ?? 0, color: '#10b981' },
          { label: 'Naqd kutilmoqda', count: payments?.filter(p => p.status === 'pending_cash').length ?? 0, color: '#f59e0b' },
          { label: 'Kutilmoqda', count: payments?.filter(p => p.status === 'pending').length ?? 0, color: '#3b82f6' },
          { label: 'Muvaffaqiyatsiz', count: payments?.filter(p => p.status === 'failed').length ?? 0, color: '#ef4444' },
        ].map(item => (
          <div
            key={item.label}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '16px',
              borderLeft: `4px solid ${item.color}`,
            }}
          >
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{item.label}</p>
            <p style={{ fontSize: '22px', fontWeight: 700, color: item.color }}>{item.count}</p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <PaymentsTable
          payments={payments ?? []}
          onConfirmCash={confirmCash}
          onRejectCash={rejectCash}
          onRefund={(id) => setRefundId(id)}
        />
      )}

      {pagination && pagination.totalPages > 1 && (
        <AdminPagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}

      {refundId && (
        <RefundModal
          transactionId={refundId}
          onConfirm={() => { refund(refundId); setRefundId(null); }}
          onClose={() => setRefundId(null)}
        />
      )}
    </div>
  );
}
