import { prisma } from '../../config/database';
import type { RevenuePeriod } from './analytics.types';

function startOf(period: 'day' | 'week' | 'month'): Date {
  const now = new Date();
  if (period === 'day') return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === 'week') {
    const d = new Date(now);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function getOverview() {
  const today = startOf('day');

  const [
    totalRevenue,
    totalOrders,
    totalUsers,
    totalProducts,
    todayData,
    pendingOrders,
    pendingCashOrders,
  ] = await Promise.all([
    prisma.transaction.aggregate({ where: { status: 'paid' }, _sum: { amount: true } }),
    prisma.order.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.product.count({ where: { status: 'active' } }),
    prisma.order.aggregate({
      where: { createdAt: { gte: today } },
      _count: true,
      _sum: { total: true },
    }),
    prisma.order.count({ where: { status: 'pending' } }),
    prisma.order.count({ where: { paymentStatus: 'pending_cash' } }),
  ]);

  return {
    totalRevenue: Math.round((totalRevenue._sum.amount ?? 0) / 100),
    totalOrders,
    totalUsers,
    totalProducts,
    todayRevenue: todayData._sum.total ?? 0,
    todayOrders: todayData._count,
    pendingOrders,
    pendingCashOrders,
  };
}

export async function getRevenue(period: RevenuePeriod = 'daily', days = 30) {
  const from = new Date();
  from.setDate(from.getDate() - days);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: from }, paymentStatus: 'paid' },
    select: { createdAt: true, total: true },
    orderBy: { createdAt: 'asc' },
  });

  const map = new Map<string, { revenue: number; orders: number }>();

  for (const order of orders) {
    const d = order.createdAt;
    let key: string;
    if (period === 'daily') {
      key = d.toISOString().slice(0, 10);
    } else if (period === 'weekly') {
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      key = weekStart.toISOString().slice(0, 10);
    } else {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }

    const existing = map.get(key) ?? { revenue: 0, orders: 0 };
    map.set(key, { revenue: existing.revenue + order.total, orders: existing.orders + 1 });
  }

  return Array.from(map.entries()).map(([date, val]) => ({ date, ...val }));
}

export async function getOrderStats() {
  const grouped = await prisma.order.groupBy({
    by: ['status'],
    _count: { status: true },
    orderBy: { _count: { status: 'desc' } },
  });

  return grouped.map(g => ({ status: g.status, count: g._count.status }));
}

export async function getTopProducts(limit = 10) {
  const items = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true, totalPrice: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: limit,
  });

  const products = await prisma.product.findMany({
    where: { id: { in: items.map(i => i.productId) } },
    select: { id: true, name: true, slug: true },
  });

  return items.map(item => {
    const product = products.find(p => p.id === item.productId)!;
    return {
      productId: item.productId,
      name: product?.name ?? 'Noma\'lum',
      slug: product?.slug ?? '',
      totalSold: item._sum.quantity ?? 0,
      totalRevenue: item._sum.totalPrice ?? 0,
    };
  });
}

export async function getUserStats() {
  const today = startOf('day');
  const week = startOf('week');
  const month = startOf('month');

  const [newToday, newWeek, newMonth, totalActive] = await Promise.all([
    prisma.user.count({ where: { createdAt: { gte: today } } }),
    prisma.user.count({ where: { createdAt: { gte: week } } }),
    prisma.user.count({ where: { createdAt: { gte: month } } }),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  return { newUsersToday: newToday, newUsersThisWeek: newWeek, newUsersThisMonth: newMonth, totalActive };
}
