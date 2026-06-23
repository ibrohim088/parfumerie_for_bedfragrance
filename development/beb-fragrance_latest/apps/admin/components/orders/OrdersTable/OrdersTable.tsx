'use client';

import styles from './OrdersTable.module.scss';
import { AdminBadge } from '@/components/ui/AdminBadge/AdminBadge';

type OrderRow = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  itemsCount?: number;
  items?: Array<{ id: string; quantity: number }>;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  } | null;
  deliveryAddress?: {
    fullName?: string;
    phone?: string;
  } | null;
};

interface OrdersTableProps {
  orders: OrderRow[];
  onRowClick: (id: string) => void;
}

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'danger',
  refunded: 'default',
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Kutilmoqda',
  confirmed: 'Tasdiqlangan',
  processing: 'Jarayonda',
  shipped: 'Yetkazilmoqda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilingan',
  refunded: 'Qaytarilgan',
};

const PAYMENT_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  pending_cash: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'default',
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
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

export function OrdersTable({ orders, onRowClick }: OrdersTableProps) {
  if (!orders.length) {
    return (
      <div className={styles.empty}>
        <p>Buyurtmalar topilmadi</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Buyurtma</th>
            <th>Mijoz</th>
            <th>Sana</th>
            <th>Status</th>
            <th>To'lov</th>
            <th className={styles.right}>Summa</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const customerName =
              order.deliveryAddress?.fullName ??
              [order.user?.firstName, order.user?.lastName].filter(Boolean).join(' ') ??
              '—';
            const phone = order.deliveryAddress?.phone ?? order.user?.phone ?? '';
            const itemsCount =
              order.itemsCount ??
              order.items?.reduce((sum, i) => sum + (i.quantity ?? 0), 0) ??
              0;

            return (
              <tr
                key={order.id}
                className={styles.row}
                onClick={() => onRowClick(order.id)}
              >
                <td>
                  <div className={styles.orderCell}>
                    <span className={styles.orderNumber}>#{order.orderNumber}</span>
                    <span className={styles.muted}>{itemsCount} ta mahsulot</span>
                  </div>
                </td>
                <td>
                  <div className={styles.customerCell}>
                    <span>{customerName}</span>
                    {phone && <span className={styles.muted}>{phone}</span>}
                  </div>
                </td>
                <td className={styles.muted}>{formatDate(order.createdAt)}</td>
                <td>
                  <AdminBadge variant={STATUS_VARIANT[order.status] ?? 'default'}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </AdminBadge>
                </td>
                <td>
                  <div className={styles.paymentCell}>
                    <AdminBadge variant={PAYMENT_VARIANT[order.paymentStatus] ?? 'default'}>
                      {order.paymentStatus}
                    </AdminBadge>
                    <span className={styles.muted}>{order.paymentMethod?.toUpperCase()}</span>
                  </div>
                </td>
                <td className={`${styles.right} ${styles.total}`}>
                  {formatPrice(order.total)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
