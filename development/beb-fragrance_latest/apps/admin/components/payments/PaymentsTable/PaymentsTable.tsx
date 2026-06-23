'use client';

import Link from 'next/link';
import styles from './PaymentsTable.module.scss';
import { AdminBadge } from '@/components/ui/AdminBadge/AdminBadge';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';

export type PaymentRow = {
  id: string;
  provider: string;
  status: string;
  amount: number;
  externalId?: string | null;
  createdAt: string;
  paidAt?: string | null;
  order?: {
    id?: string;
    orderNumber?: string;
  } | null;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  } | null;
};

interface PaymentsTableProps {
  payments: PaymentRow[];
  onConfirmCash: (id: string) => void;
  onRejectCash: (id: string) => void;
  onRefund: (id: string) => void;
}

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'info',
  pending_cash: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'default',
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Kutilmoqda',
  pending_cash: 'Naqd — kutilmoqda',
  paid: "To'langan",
  failed: 'Muvaffaqiyatsiz',
  refunded: 'Qaytarilgan',
};

const PROVIDER_LABEL: Record<string, string> = {
  payme: 'Payme',
  click: 'Click',
  cash: 'Naqd pul',
};

function formatPrice(amount: number): string {
  // Provider amounts are stored in tiyin (×100). Display in UZS.
  const uzs = Math.round(amount / 100);
  return new Intl.NumberFormat('uz-UZ').format(uzs) + ' UZS';
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function PaymentsTable({
  payments,
  onConfirmCash,
  onRejectCash,
  onRefund,
}: PaymentsTableProps) {
  if (!payments.length) {
    return (
      <div className={styles.empty}>
        <p>Tranzaksiyalar topilmadi</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tranzaksiya</th>
            <th>Buyurtma</th>
            <th>Mijoz</th>
            <th>Provayder</th>
            <th>Status</th>
            <th>Sana</th>
            <th className={styles.right}>Summa</th>
            <th className={styles.right}>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => {
            const customerName =
              [p.user?.firstName, p.user?.lastName].filter(Boolean).join(' ') || '—';
            const isPendingCash = p.status === 'pending_cash';
            const isPaid = p.status === 'paid';

            return (
              <tr key={p.id} className={styles.row}>
                <td>
                  <div className={styles.cellStack}>
                    <span className={styles.mono}>{p.id.slice(0, 8)}…</span>
                    {p.externalId && (
                      <span className={styles.muted}>{p.externalId}</span>
                    )}
                  </div>
                </td>
                <td>
                  {p.order?.id ? (
                    <Link href={`/orders/${p.order.id}`} className={styles.link}>
                      #{p.order.orderNumber ?? p.order.id.slice(0, 6)}
                    </Link>
                  ) : (
                    <span className={styles.muted}>—</span>
                  )}
                </td>
                <td>
                  <div className={styles.cellStack}>
                    <span>{customerName}</span>
                    {p.user?.phone && <span className={styles.muted}>{p.user.phone}</span>}
                  </div>
                </td>
                <td className={styles.upper}>
                  {PROVIDER_LABEL[p.provider] ?? p.provider}
                </td>
                <td>
                  <AdminBadge variant={STATUS_VARIANT[p.status] ?? 'default'}>
                    {STATUS_LABEL[p.status] ?? p.status}
                  </AdminBadge>
                </td>
                <td className={styles.muted}>
                  {formatDate(p.paidAt ?? p.createdAt)}
                </td>
                <td className={`${styles.right} ${styles.total}`}>
                  {formatPrice(p.amount)}
                </td>
                <td className={styles.right}>
                  <div className={styles.actions}>
                    {isPendingCash && (
                      <>
                        <AdminButton
                          size="sm"
                          variant="primary"
                          onClick={() => onConfirmCash(p.id)}
                        >
                          Tasdiqlash
                        </AdminButton>
                        <AdminButton
                          size="sm"
                          variant="ghost"
                          onClick={() => onRejectCash(p.id)}
                        >
                          Rad etish
                        </AdminButton>
                      </>
                    )}
                    {isPaid && (
                      <AdminButton
                        size="sm"
                        variant="ghost"
                        onClick={() => onRefund(p.id)}
                      >
                        Qaytarish
                      </AdminButton>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
