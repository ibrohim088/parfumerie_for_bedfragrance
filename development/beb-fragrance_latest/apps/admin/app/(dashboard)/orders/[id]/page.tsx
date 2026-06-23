'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOrder } from '@/hooks/useOrder';
import { OrderStatusSelect } from '@/components/orders/OrderStatusSelect/OrderStatusSelect';
import { AdminBadge } from '@/components/ui/AdminBadge/AdminBadge';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { Spinner } from '@/components/ui/Spinner/Spinner';

// STATUS_COLORS olib tashlandi (ishlatilmasdi) — AdminBadge variant to'g'ridanga map qilindi

const PAYMENT_STATUS_COLORS: Record<string, 'warning' | 'success' | 'error' | 'default'> = {
  pending: 'warning',
  pending_cash: 'warning',
  paid: 'success',
  failed: 'error',
  refunded: 'default',
};

interface OrderItem {
  id: string;
  product?: { name: string };
  variant?: { volume: number };
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { order, isLoading, updateStatus, isUpdating } = useOrder(id);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Buyurtma topilmadi</p>
        <Link href="/orders" style={{ color: 'var(--color-primary)', marginTop: '12px', display: 'inline-block' }}>
          ← Buyurtmalarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AdminButton variant="ghost" onClick={() => router.back()}>← Orqaga</AdminButton>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700 }}>#{order.orderNumber}</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <AdminBadge variant={PAYMENT_STATUS_COLORS[order.paymentStatus] ?? 'default'}>
            {order.paymentMethod.toUpperCase()} — {order.paymentStatus}
          </AdminBadge>
          <OrderStatusSelect
            currentStatus={order.status}
            onUpdate={(status) => updateStatus(status)}
            isLoading={isUpdating}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left: items + address */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Items */}
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            padding: '20px',
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Mahsulotlar</h3>
            {order.items.map((item: OrderItem) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <p style={{ fontWeight: 500 }}>{item.product?.name ?? 'Mahsulot'}</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                    {item.variant?.volume}ml × {item.quantity} dona
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 600 }}>{formatPrice(item.totalPrice)}</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                    {formatPrice(item.unitPrice)} / dona
                  </p>
                </div>
              </div>
            ))}

            {/* Total */}
            <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                <span>Mahsulotlar narxi</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                <span>Yetkazib berish</span>
                <span>{formatPrice(order.deliveryFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px', paddingTop: '6px', borderTop: '1px solid var(--color-border)', marginTop: '6px' }}>
                <span>Jami</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          {order.deliveryAddress && (
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              padding: '20px',
            }}>
              <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>Yetkazib berish manzili</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
                <p><strong>{order.deliveryAddress.fullName}</strong></p>
                <p style={{ color: 'var(--color-text-secondary)' }}>{order.deliveryAddress.phone}</p>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {order.deliveryAddress.region}, {order.deliveryAddress.district}, {order.deliveryAddress.street}
                  {order.deliveryAddress.apartment ? `, kv. ${order.deliveryAddress.apartment}` : ''}
                </p>
                {order.deliveryAddress.landmark && (
                  <p style={{ color: 'var(--color-text-secondary)' }}>Mo'ljal: {order.deliveryAddress.landmark}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: customer + transaction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Customer */}
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            padding: '20px',
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>Mijoz</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
              <p style={{ fontWeight: 500 }}>{order.user?.firstName} {order.user?.lastName}</p>
              <p style={{ color: 'var(--color-text-secondary)' }}>{order.user?.phone}</p>
              <Link
                href={`/users/${order.user?.id}`}
                style={{ color: 'var(--color-primary)', fontSize: '13px', marginTop: '8px' }}
              >
                Profil ko'rish →
              </Link>
            </div>
          </div>

          {/* Transaction */}
          {order.transaction && (
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              padding: '20px',
            }}>
              <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>To'lov</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Provayder</span>
                  <span style={{ fontWeight: 500, textTransform: 'uppercase' }}>{order.transaction.provider}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Status</span>
                  <AdminBadge variant={PAYMENT_STATUS_COLORS[order.transaction.status] ?? 'default'}>
                    {order.transaction.status}
                  </AdminBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Summa</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(Math.round(order.transaction.amount / 100))}</span>
                </div>
                {order.transaction.externalId && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>ID</span>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{order.transaction.externalId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              padding: '20px',
            }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Izoh</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}