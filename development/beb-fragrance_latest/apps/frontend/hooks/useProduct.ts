import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string | string[];
  rating?: number;
  category?: string;
  stock?: number;
  inStock?: boolean;
  createdAt?: string;
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.products.getOne(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
