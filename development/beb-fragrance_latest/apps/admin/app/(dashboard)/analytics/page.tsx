'use client';

import { useState } from 'react';
import { DollarSign, Package, Users, ShoppingBag, Calendar, CalendarDays, CheckCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { RevenueChart } from '@/components/dashboard/RevenueChart/RevenueChart';
import { TopProducts } from '@/components/dashboard/TopProducts/TopProducts';
import { OrdersByStatusChart } from '@/components/analytics/OrdersByStatusChart/OrdersByStatusChart';
import { UserGrowthChart } from '@/components/analytics/UserGrowthChart/UserGrowthChart';
import { PaymentMethodChart } from '@/components/analytics/PaymentMethodChart/PaymentMethodChart';
import { StatCard } from '@/components/ui/StatCard/StatCard';
import { AdminSelect } from '@/components/ui/AdminSelect/AdminSelect';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import type { RevenuePeriod } from '@/types/analytics';

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<RevenuePeriod>('daily');
  const { overview, revenue, orderStats, topProducts, userStats, isLoading } = useAnalytics(period);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Analitika</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Savdo va foydalanuvchi statistikasi
          </p>
        </div>
        <AdminSelect
          value={period}
          onChange={(v) => setPeriod(v as RevenuePeriod)}
          options={[
            { value: 'daily', label: 'Kunlik' },
            { value: 'weekly', label: 'Haftalik' },
            { value: 'monthly', label: 'Oylik' },
          ]}
        />
      </div>

      {/* Overview stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard title="Jami daromad" value={formatPrice(overview?.totalRevenue ?? 0)} icon={<DollarSign size={24} />} color="green" />
        <StatCard title="Jami buyurtmalar" value={String(overview?.totalOrders ?? 0)} icon={<Package size={24} />} color="blue" />
        <StatCard title="Jami foydalanuvchilar" value={String(overview?.totalUsers ?? 0)} icon={<Users size={24} />} color="purple" />
        <StatCard title="Faol mahsulotlar" value={String(overview?.totalProducts ?? 0)} icon={<ShoppingBag size={24} />} color="orange" />
      </div>

      {/* Revenue chart */}
      <RevenueChart data={revenue ?? []} period={period} />

      {/* Middle row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <OrdersByStatusChart data={orderStats ?? []} />
        <PaymentMethodChart />
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <TopProducts data={topProducts ?? []} showRevenue />
        <div
          style={{
            background: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            padding: '20px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Foydalanuvchilar o'sishi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Bugun qo\'shildi', value: userStats?.newUsersToday ?? 0, icon: <Calendar size={16} style={{ marginRight: '8px' }} /> },
              { label: 'Bu hafta qo\'shildi', value: userStats?.newUsersThisWeek ?? 0, icon: <CalendarDays size={16} style={{ marginRight: '8px' }} /> },
              { label: 'Bu oy qo\'shildi', value: userStats?.newUsersThisMonth ?? 0, icon: <Calendar size={16} style={{ marginRight: '8px' }} /> },
              { label: 'Jami faol', value: userStats?.totalActive ?? 0, icon: <CheckCircle size={16} style={{ marginRight: '8px' }} /> },
            ].map(item => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'var(--color-bg)',
                  borderRadius: '8px',
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
                  {item.icon} {item.label}
                </span>
                <span style={{ fontWeight: 700, fontSize: '18px' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
