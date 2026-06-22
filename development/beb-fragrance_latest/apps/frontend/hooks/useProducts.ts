import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface ProductImage {
  id?: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id?: string;
  volume: number;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description?: string;
  concentration: string;
  category?: string;
  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];
  status?: string;
  isFeatured?: boolean;
  inStock?: boolean;
  rating?: number;
  createdAt?: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}

interface UseProductsParams {
  search?: string;
  brand?: string;
  category?: string;
  concentration?: string;
  gender?: string;
  family?: string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: number;
  limit?: number;
  [key: string]: any;
}

export function useProducts(params?: UseProductsParams) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => api.products.getAll(params),
    staleTime: 1000 * 60 * 5,
  });
}

const FALLBACK_IMAGE = '/images/placeholder.png';

export function getPrimaryImage(product: Pick<Product, 'images'>): string {
  if (!product.images || product.images.length === 0) return FALLBACK_IMAGE;
  const primary = product.images.find((img) => img.isPrimary);
  const image = primary ?? product.images[0];
  return image?.url ?? FALLBACK_IMAGE;
}

export function getMinPrice(product: Pick<Product, 'variants'>): number {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}

export function getMaxPrice(product: Pick<Product, 'variants'>): number {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.max(...product.variants.map((v) => v.price));
}

export function isInStock(product: Pick<Product, 'variants' | 'inStock'>): boolean {
  if (typeof product.inStock === 'boolean') return product.inStock;
  return (product.variants || []).some((v) => v.stock > 0);
}

const NEW_THRESHOLD_DAYS = 21;

export function isNewProduct(product: Pick<Product, 'createdAt'>): boolean {
  if (!product.createdAt) return false;
  const createdAt = new Date(product.createdAt).getTime();
  const diffDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_THRESHOLD_DAYS;
}