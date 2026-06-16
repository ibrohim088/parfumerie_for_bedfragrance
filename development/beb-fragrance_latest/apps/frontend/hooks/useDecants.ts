import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Decant {
  id: string;
  name: string;
  slug: string;
  price: number;
  volume: string;
  originalProduct?: string;
  image?: string;
  inStock?: boolean;
}

export function useDecants() {
  return useQuery({
    queryKey: ['decants'],
    queryFn: async () => {
      // Fetch decants - using products endpoint with decant category
      const response = await api.products.getAll({ category: 'decant', limit: 100 });
      return response;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
