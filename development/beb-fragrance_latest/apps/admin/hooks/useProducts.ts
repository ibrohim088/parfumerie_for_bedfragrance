// apps/admin/components/hooks/useProducts.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

interface ProductsParams {
  search?: string;
  status?: string;
  concentration?: string;
  page?: number;
  limit?: number;
}

export function useProducts(params: ProductsParams = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['products', params],
    queryFn: () => api.get('/products', { params }).then(res => res.data),
  });

  const createProduct = useMutation({
    mutationFn: (data: any) => api.post('/products', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, ...data }: any) => api.put(`/products/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return {
    products: data?.items,
    pagination: data?.pagination,
    isLoading,
    createProduct: createProduct.mutateAsync,
    isCreating: createProduct.isPending,
    updateProduct: updateProduct.mutateAsync,
    isUpdating: updateProduct.isPending,
    deleteProduct: deleteProduct.mutate,
  };
}