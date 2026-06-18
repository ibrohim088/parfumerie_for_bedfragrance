'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { RevenuePeriod } from '@/types/analytics';

export function useAnalytics(period: RevenuePeriod = 'daily') {
  const overviewQuery = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: () => api.get('/analytics/overview').then(res => res.data.data),
  });

  const revenueQuery = useQuery({
    queryKey: ['analytics', 'revenue', period],
    queryFn: () => api.get(`/analytics/revenue?period=${period}`).then(res => res.data.data),
  });

  const orderStatsQuery = useQuery({
    queryKey: ['analytics', 'order-stats'],
    queryFn: () => api.get('/analytics/orders').then(res => res.data.data),
  });

  const topProductsQuery = useQuery({
    queryKey: ['analytics', 'top-products'],
    queryFn: () => api.get('/analytics/products').then(res => res.data.data),
  });

  const userStatsQuery = useQuery({
    queryKey: ['analytics', 'user-growth'],
    queryFn: () => api.get('/analytics/users').then(res => res.data.data),
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