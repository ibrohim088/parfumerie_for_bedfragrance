// apps/admin/components/hooks/useOrders.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

interface OrdersParams {
  search?: string;
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
  admin?: boolean;
}

export function useOrders(params: OrdersParams = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['orders', params],
    queryFn: () => api.get('/admin/orders', { params }).then(res => res.data),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/admin/orders/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  return {
    orders: data?.items,
    pagination: data?.pagination,
    isLoading,
    updateStatus: updateStatus.mutate,
    isUpdating: updateStatus.isPending,
  };
}