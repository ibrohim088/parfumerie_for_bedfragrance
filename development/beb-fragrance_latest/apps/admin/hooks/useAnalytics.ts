// apps/admin/components/hooks/useAnalytics.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { RevenuePeriod } from '@/types/analytics';

export function useAnalytics(period: RevenuePeriod = 'daily') {
  const overviewQuery = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: () => api.get('/admin/analytics/overview').then(res => res.data),
  });

  const revenueQuery = useQuery({
    queryKey: ['analytics', 'revenue', period],
    queryFn: () => api.get(`/admin/analytics/revenue?period=${period}`).then(res => res.data),
  });

  const orderStatsQuery = useQuery({
    queryKey: ['analytics', 'order-stats'],
    queryFn: () => api.get('/admin/analytics/orders-by-status').then(res => res.data),
  });

  const topProductsQuery = useQuery({
    queryKey: ['analytics', 'top-products'],
    queryFn: () => api.get('/admin/analytics/top-products').then(res => res.data),
  });

  const userStatsQuery = useQuery({
    queryKey: ['analytics', 'user-growth'],
    queryFn: () => api.get('/admin/analytics/user-growth').then(res => res.data),
  });

  return {
    overview: overviewQuery.data,
    revenue: revenueQuery.data,
    orderStats: orderStatsQuery.data,
    topProducts: topProductsQuery.data,
    userStats: userStatsQuery.data,
    isLoading: overviewQuery.isLoading,
  };
}