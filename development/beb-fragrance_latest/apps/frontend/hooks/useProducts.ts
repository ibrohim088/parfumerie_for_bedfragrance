import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(filters?: any): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.sort) queryParams.append('sort', filters.sort);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?${queryParams}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return { products, loading, error, refetch: fetchProducts };
}
