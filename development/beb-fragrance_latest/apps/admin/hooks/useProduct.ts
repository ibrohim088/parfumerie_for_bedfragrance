// apps/admin/components/hooks/useProduct.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useProduct(id: string) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.get(`/products/${id}`).then(res => res.data),
    enabled: !!id,
  });

  const updateProduct = useMutation({
    mutationFn: (payload: any) => api.put(`/products/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    product: data?.data,
    isLoading,
    updateProduct: updateProduct.mutateAsync,
    isUpdating: updateProduct.isPending,
  };
}
