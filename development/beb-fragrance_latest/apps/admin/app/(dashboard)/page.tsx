'use client';

import Link from 'next/link';
import { DollarSign, Package, Clock, Users, FileText, CreditCard } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { StatCard } from '@/components/ui/StatCard/StatCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart/RevenueChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders/RecentOrders';
import { TopProducts } from '@/components/dashboard/TopProducts/TopProducts';
import { Spinner } from '@/components/ui/Spinner/Spinner';

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

export default function DashboardPage() {
  const { overview, revenue, topProducts, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          BEB Fragrance admin paneli
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="Jami daromad"
          value={formatPrice(overview?.totalRevenue ?? 0)}
          subtitle={`Bugun: ${formatPrice(overview?.todayRevenue ?? 0)}`}
          icon={<DollarSign size={24} />}
          color="green"
        />
        <StatCard
          title="Jami buyurtmalar"
          value={String(overview?.totalOrders ?? 0)}
          subtitle={`Bugun: ${overview?.todayOrders ?? 0} ta`}
          icon={<Package size={24} />}
          color="blue"
        />
        <StatCard
          title="Kutilayotgan buyurtmalar"
          value={String(overview?.pendingOrders ?? 0)}
          subtitle={`Naqd kutilmoqda: ${overview?.pendingCashOrders ?? 0}`}
          icon={<Clock size={24} />}
          color="orange"
          href="/orders?status=pending"
        />
        <StatCard
          title="Foydalanuvchilar"
          value={String(overview?.totalUsers ?? 0)}
          subtitle={`Mahsulotlar: ${overview?.totalProducts ?? 0} ta`}
          icon={<Users size={24} />}
          color="purple"
        />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        <RevenueChart data={revenue ?? []} />
        <TopProducts data={topProducts ?? []} />
      </div>

      {/* Recent orders */}
      <RecentOrders />

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {[
          { href: '/products/new', label: '+ Yangi mahsulot', color: '#10b981', icon: null },
          { href: '/orders?status=pending', label: 'Kutilgan buyurtmalar', color: '#f59e0b', icon: <FileText size={16} style={{ marginRight: '6px' }} /> },
          { href: '/payments?status=pending_cash', label: 'Naqd to\'lovlar', color: '#3b82f6', icon: <CreditCard size={16} style={{ marginRight: '6px' }} /> },
          { href: '/users', label: 'Foydalanuvchilar', color: '#8b5cf6', icon: <Users size={16} style={{ marginRight: '6px' }} /> },
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              borderRadius: '8px',
              border: `1px solid ${item.color}30`,
              background: `${item.color}10`,
              color: item.color,
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
