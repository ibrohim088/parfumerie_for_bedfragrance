'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { AdminBadge } from '@/components/ui/AdminBadge/AdminBadge';
import { Spinner } from '@/components/ui/Spinner/Spinner';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoading, toggleActive, isUpdating } = useUser(id);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Foydalanuvchi topilmadi</p>
        <AdminButton variant="ghost" onClick={() => router.push('/users')} style={{ marginTop: '12px' }}>
          ← Foydalanuvchilarga qaytish
        </AdminButton>
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
            <h1 style={{ fontSize: '22px', fontWeight: 700 }}>
              {user.firstName} {user.lastName}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>{user.phone}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <AdminBadge variant={user.role === 'admin' ? 'info' : 'default'}>
            {user.role === 'admin' ? 'Admin' : 'Foydalanuvchi'}
          </AdminBadge>
          <AdminBadge variant={user.isActive ? 'success' : 'error'}>
            {user.isActive ? 'Faol' : 'Bloklangan'}
          </AdminBadge>
          <AdminButton
            variant={user.isActive ? 'danger' : 'primary'}
            onClick={() => toggleActive(!user.isActive)}
            isLoading={isUpdating}
          >
            {user.isActive ? 'Bloklash' : 'Faollashtirish'}
          </AdminButton>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Profile info */}
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          padding: '20px',
        }}>
          <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Profil ma'lumotlari</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Ism', value: user.firstName },
              { label: 'Familiya', value: user.lastName },
              { label: 'Telefon', value: user.phone },
              { label: 'Email', value: user.email ?? '—' },
              { label: 'Rol', value: user.role },
              { label: "Ro'yxatdan o'tgan sana", value: formatDate(user.createdAt) },
              { label: "Oxirgi yangilanish", value: formatDate(user.updatedAt) },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                <span style={{ fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            padding: '20px',
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Tezkor harakatlar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                href={`/orders?search=${user.phone}`}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  background: 'var(--color-bg)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  fontSize: '14px',
                  transition: 'background 0.2s',
                }}
              >
                📦 Buyurtmalarini ko'rish →
              </Link>
              <Link
                href={`/payments?search=${user.phone}`}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  background: 'var(--color-bg)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  fontSize: '14px',
                }}
              >
                💳 To'lovlarini ko'rish →
              </Link>
            </div>
          </div>

          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            padding: '20px',
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>Xavfli zona</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
              Foydalanuvchini o'chirish barcha ma'lumotlarini yo'q qiladi.
            </p>
            <AdminButton
              variant="danger"
              onClick={() => {
                if (confirm(`${user.firstName} ${user.lastName}ni o'chirishni tasdiqlaysizmi?`)) {
                  // deleteUser call
                  router.push('/users');
                }
              }}
            >
              Foydalanuvchini o'chirish
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
}
