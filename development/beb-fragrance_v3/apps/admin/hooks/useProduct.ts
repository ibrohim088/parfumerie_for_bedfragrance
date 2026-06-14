// apps/admin/components/hooks/useProduct.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useProduct(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.get(`/admin/products/${id}`).then(res => res.data),
    enabled: !!id,
  });

  return {
    product: data?.data,
    isLoading,
  };
}