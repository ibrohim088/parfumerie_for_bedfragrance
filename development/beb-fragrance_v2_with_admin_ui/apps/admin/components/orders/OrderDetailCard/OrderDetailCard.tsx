'use client';

import Link from 'next/link';
import styles from './OrderDetailCard.module.scss';
import { AdminBadge } from '@/components/ui/AdminBadge/AdminBadge';

type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: { id?: string; name?: string; slug?: string } | null;
  variant?: { id?: string; volume?: number } | null;
};

type OrderDetail = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  } | null;
  deliveryAddress?: {
    fullName?: string;
    phone?: string;
    region?: string;
    district?: string;
    street?: string;
    apartment?: string | null;
    landmark?: string | null;
  } | null;
  transaction?: {
    provider?: string;
    status?: string;
    amount?: number;
    externalId?: string | null;
  } | null;
};

interface OrderDetailCardProps {
  order: OrderDetail;
}

const PAYMENT_STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  pending_cash: 'warning',
  paid: 'success',
  failed: 'error',
  refunded: 'default',
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  return (
    <div className={styles.grid}>
      {/* Left column */}
      <div className={styles.column}>
        {/* Items */}
        <section className={styles.card}>
          <h3 className={styles.title}>Mahsulotlar</h3>
          <div className={styles.items}>
            {order.items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.product?.name ?? 'Mahsulot'}</p>
                  <p className={styles.muted}>
                    {item.variant?.volume ? `${item.variant.volume}ml` : ''} × {item.quantity} dona
                  </p>
                </div>
                <div className={styles.itemPrice}>
                  <p className={styles.itemTotal}>{formatPrice(item.totalPrice)}</p>
                  <p className={styles.muted}>{formatPrice(item.unitPrice)} / dona</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.muted}>Mahsulotlar narxi</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.muted}>Yetkazib berish</span>
              <span>{formatPrice(order.deliveryFee)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Jami</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </section>

        {/* Delivery */}
        {order.deliveryAddress && (
          <section className={styles.card}>
            <h3 className={styles.title}>Yetkazib berish manzili</h3>
            <div className={styles.addressBlock}>
              <p>
                <strong>{order.deliveryAddress.fullName}</strong>
              </p>
              {order.deliveryAddress.phone && (
                <p className={styles.muted}>{order.deliveryAddress.phone}</p>
              )}
              <p className={styles.muted}>
                {[
                  order.deliveryAddress.region,
                  order.deliveryAddress.district,
                  order.deliveryAddress.street,
                  order.deliveryAddress.apartment ? `kv. ${order.deliveryAddress.apartment}` : null,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </p>
              {order.deliveryAddress.landmark && (
                <p className={styles.muted}>Mo'ljal: {order.deliveryAddress.landmark}</p>
              )}
            </div>
          </section>
        )}

        {/* Notes */}
        {order.notes && (
          <section className={styles.card}>
            <h3 className={styles.title}>Izoh</h3>
            <p className={styles.notes}>{order.notes}</p>
          </section>
        )}
      </div>

      {/* Right column */}
      <div className={styles.column}>
        {/* Customer */}
        <section className={styles.card}>
          <h3 className={styles.title}>Mijoz</h3>
          <div className={styles.addressBlock}>
            <p className={styles.itemName}>
              {order.user?.firstName} {order.user?.lastName}
            </p>
            {order.user?.phone && <p className={styles.muted}>{order.user.phone}</p>}
            {order.user?.id && (
              <Link href={`/users/${order.user.id}`} className={styles.link}>
                Profil ko'rish →
              </Link>
            )}
          </div>
        </section>

        {/* Transaction */}
        {order.transaction && (
          <section className={styles.card}>
            <h3 className={styles.title}>To'lov</h3>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span className={styles.muted}>Provayder</span>
                <span className={styles.upper}>{order.transaction.provider}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.muted}>Status</span>
                <AdminBadge
                  variant={
                    PAYMENT_STATUS_VARIANT[order.transaction.status ?? ''] ?? 'default'
                  }
                >
                  {order.transaction.status}
                </AdminBadge>
              </div>
              {typeof order.transaction.amount === 'number' && (
                <div className={styles.summaryRow}>
                  <span className={styles.muted}>Summa</span>
                  <span className={styles.itemTotal}>
                    {formatPrice(Math.round(order.transaction.amount / 100))}
                  </span>
                </div>
              )}
              {order.transaction.externalId && (
                <div className={styles.summaryRow}>
                  <span className={styles.muted}>ID</span>
                  <span className={styles.mono}>{order.transaction.externalId}</span>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
