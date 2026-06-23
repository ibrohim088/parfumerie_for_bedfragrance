'use client';

import { Sun, Moon, Info } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { AdminInput } from '@/components/ui/AdminInput/AdminInput';
import { useTheme } from '@/providers/ThemeProvider';

export default function SettingsPage() {
  const { admin, logout } = useAdminAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Sozlamalar</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Admin panel sozlamalari
        </p>
      </div>

      {/* Admin Profile */}
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        padding: '24px',
      }}>
        <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Profil</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <AdminInput label="Ism" value={admin?.firstName ?? ''} readOnly style={{ flex: 1 }} />
            <AdminInput label="Familiya" value={admin?.lastName ?? ''} readOnly style={{ flex: 1 }} />
          </div>
          <AdminInput label="Telefon raqami" value={admin?.phone ?? ''} readOnly />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'var(--color-bg)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}>
            <Info size={15} style={{ flexShrink: 0 }} />
            Profilni o'zgartirish uchun backend orqali bajaring
          </div>
        </div>
      </div>

      {/* Theme */}
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        padding: '24px',
      }}>
        <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Interfeys</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          {(['light', 'dark'] as const).map(t => {
            const isActive = theme === t;
            const Icon = t === 'light' ? Sun : Moon;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  borderRadius: '10px',
                  border: `2px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: isActive ? 'var(--color-primary-10)' : 'var(--color-bg)',
                  cursor: 'pointer',
                  color: 'var(--color-text)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon
                  size={24}
                  style={{
                    color: t === 'light' ? '#facc15' : isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fill: t === 'light' ? '#facc15' : 'none',
                  }}
                />
                <span>{t === 'light' ? 'Kunduzgi' : 'Tungi'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Info */}
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        padding: '24px',
      }}>
        <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Tizim haqida</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          {[
            { label: 'Loyiha', value: 'BEB Fragrance Admin' },
            { label: 'Frontend', value: 'Next.js 14' },
            { label: 'Backend', value: 'Express + Prisma' },
            { label: 'Versiya', value: 'v2.0' },
            { label: 'Domain', value: 'admin.bebfragrance.uz' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
              <span style={{ fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid #ef444430',
        padding: '24px',
      }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px', color: '#ef4444' }}>Chiqish</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Admin paneldan chiqish
        </p>
        <AdminButton variant="danger" onClick={logout}>
          Tizimdan chiqish
        </AdminButton>
      </div>
    </div>
  );
}