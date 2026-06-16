import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
  description?: string;
  inStock?: boolean;
}

interface UseProductsParams {
  search?: string;
  category?: string;
  sort?: string;
  limit?: number;
  skip?: number;
  [key: string]: any;
}

export function useProducts(params?: UseProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => api.products.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
