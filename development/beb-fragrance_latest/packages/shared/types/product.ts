export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';

export type Concentration =
  | 'parfum'
  | 'edp'
  | 'edt'
  | 'edc'
  | 'body_mist';

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  volume: number; // ml
  price: number;  // UZS
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  concentration: Concentration;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  status: ProductStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}