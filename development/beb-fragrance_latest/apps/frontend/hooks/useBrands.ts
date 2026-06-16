import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  category: string;
  image?: string;
  description?: string;
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      // Fetch brands - using products endpoint with brand filter
      const response = await api.products.getAll({ limit: 100 });
      // Extract unique brands from products
      return response;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
