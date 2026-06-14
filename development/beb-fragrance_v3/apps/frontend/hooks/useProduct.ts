import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string[];
  rating: number;
  category: string;
  stock: number;
  createdAt: string;
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProduct(slug: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Product not found');

      const data = await response.json();
      setProduct(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  return { product, loading, error, refetch: fetchProduct };
}
