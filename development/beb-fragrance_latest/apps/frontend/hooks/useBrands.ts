import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  category?: string;
  image?: string;
  description?: string;
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async (): Promise<Brand[]> => {
      // Backendda alohida brand endpoint yo'q, shu sababli mahsulotlardan
      // unikal brendlarni ajratib olamiz.
      const response = await api.products.getAll({ limit: 100 });
      const products = response?.data || [];

      const seen = new Set<string>();
      const brands: Brand[] = [];

      for (const product of products) {
        const name = product?.brand;
        if (!name || seen.has(name)) continue;
        seen.add(name);
        brands.push({
          id: name,
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
        });
      }

      return brands;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}


/*
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
*/