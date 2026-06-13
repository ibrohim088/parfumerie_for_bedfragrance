// apps/admin/components/hooks/usePayments.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function usePayments(params: any = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['payments', params],
    queryFn: () => api.get('/admin/payments', { params }).then(res => res.data),
  });

  const confirmCash = useMutation({
    mutationFn: (id: string) => api.post(`/admin/payments/${id}/confirm-cash`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['payments'] }),
  });

  const rejectCash = useMutation({
    mutationFn: (id: string) => api.post(`/admin/payments/${id}/reject-cash`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['payments'] }),
  });

  const refund = useMutation({
    mutationFn: (id: string) => api.post(`/admin/payments/${id}/refund`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['payments'] }),
  });

  return {
    payments: data?.items,
    pagination: data?.pagination,
    isLoading,
    confirmCash: confirmCash.mutate,
    rejectCash: rejectCash.mutate,
    refund: refund.mutate,
  };
}