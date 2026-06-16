'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ProductCard from '@/components/catalog/ProductCard/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import styles from './CatalogGrid.module.scss';

interface FiltersType {
  search: string;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface CatalogGridProps {
  filters: FiltersType;
}

const mockProducts = [
  {
    id: '1',
    name: 'Luxury Rose',
    slug: 'luxury-rose',
    image: 'https://via.placeholder.com/300x400?text=Luxury+Rose',
    price: 250000,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    slug: 'ocean-breeze',
    image: 'https://via.placeholder.com/300x400?text=Ocean+Breeze',
    price: 320000,
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Midnight Charm',
    slug: 'midnight-charm',
    image: 'https://via.placeholder.com/300x400?text=Midnight+Charm',
    price: 280000,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Blossom Dreams',
    slug: 'blossom-dreams',
    image: 'https://via.placeholder.com/300x400?text=Blossom+Dreams',
    price: 295000,
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Forest Echo',
    slug: 'forest-echo',
    image: 'https://via.placeholder.com/300x400?text=Forest+Echo',
    price: 270000,
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Sunset Glory',
    slug: 'sunset-glory',
    image: 'https://via.placeholder.com/300x400?text=Sunset+Glory',
    price: 310000,
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Starlight',
    slug: 'starlight',
    image: 'https://via.placeholder.com/300x400?text=Starlight',
    price: 290000,
    rating: 4.6,
  },
  {
    id: '8',
    name: 'Heaven',
    slug: 'heaven',
    image: 'https://via.placeholder.com/300x400?text=Heaven',
    price: 330000,
    rating: 4.9,
  },
];

export default function CatalogGrid({ filters }: CatalogGridProps) {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const { data, isLoading } = useProducts(filters);
  const products = data?.data || mockProducts;

  const handleProductClick = (slug: string) => {
    router.push(`/${locale}/catalog/${slug}`);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <p>{t('noProducts')}</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      <div className={styles.header}>
        <p className={styles.count}>
          Showing {products.length} products
        </p>
      </div>

      <div className={styles.products}>
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            rating={product.rating}
            onClick={() => handleProductClick(product.slug)}
          />
        ))}
      </div>
    </div>
  );
}
