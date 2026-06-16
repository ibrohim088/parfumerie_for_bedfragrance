'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

// Mock data - replace with API call when backend is ready
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Rose',
    image: 'https://via.placeholder.com/300x300?text=Luxury+Rose',
    price: 250000,
    rating: 4.8,
    category: 'women',
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    image: 'https://via.placeholder.com/300x300?text=Ocean+Breeze',
    price: 320000,
    rating: 4.6,
    category: 'unisex',
  },
  {
    id: '3',
    name: 'Midnight Charm',
    image: 'https://via.placeholder.com/300x300?text=Midnight+Charm',
    price: 280000,
    rating: 4.9,
    category: 'men',
  },
  {
    id: '4',
    name: 'Blossom Dreams',
    image: 'https://via.placeholder.com/300x300?text=Blossom+Dreams',
    price: 295000,
    rating: 4.7,
    category: 'women',
  },
  {
    id: '5',
    name: 'Forest Mist',
    image: 'https://via.placeholder.com/300x300?text=Forest+Mist',
    price: 275000,
    rating: 4.5,
    category: 'men',
  },
  {
    id: '6',
    name: 'Sunset Paradise',
    image: 'https://via.placeholder.com/300x300?text=Sunset+Paradise',
    price: 310000,
    rating: 4.8,
    category: 'unisex',
  },
  {
    id: '7',
    name: 'Vanilla Dreams',
    image: 'https://via.placeholder.com/300x300?text=Vanilla+Dreams',
    price: 240000,
    rating: 4.6,
    category: 'women',
  },
  {
    id: '8',
    name: 'Desert Sand',
    image: 'https://via.placeholder.com/300x300?text=Desert+Sand',
    price: 265000,
    rating: 4.7,
    category: 'men',
  },
];

interface ProductGridProps {
  filters?: {
    category?: string;
    priceRange?: [number, number];
    sort?: string;
    search?: string;
  };
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch - replace with actual API call
    const fetchProducts = async () => {
      try {
        // TODO: Replace with actual API call
        // const res = await api.get('/products', { params: filters });
        let filtered = [...mockProducts];

        // Apply filters
        if (filters?.category) {
          filtered = filtered.filter(p => p.category === filters.category);
        }

        if (filters?.priceRange) {
          filtered = filtered.filter(
            p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
          );
        }

        // Apply sort
        if (filters?.sort) {
          switch (filters.sort) {
            case 'price-low':
              filtered.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              filtered.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filtered.sort((a, b) => b.rating - a.rating);
              break;
            default:
              // newest - keep original order
              break;
          }
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleProductClick = (productId: string) => {
    router.push(`/${locale}/catalog/${productId}`);
  };

  if (loading) {
    return (
      <div className={styles.grid}>
        <div className={styles.loading}>{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className={styles.gridWrapper}>
      {products.length === 0 ? (
        <div className={styles.empty}>{t('noProducts')}</div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              rating={product.rating}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
