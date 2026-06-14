export interface ProductVariantInput {
  volume: number;
  price: number;
  stock: number;
}

export interface ProductImageInput {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface CreateProductRequest {
  name: string;
  brand: string;
  description: string;
  concentration: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  images: ProductImageInput[];
  variants: ProductVariantInput[];
  isFeatured?: boolean;
  status?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface ProductListQuery {
  page?: number;
  limit?: number;
  search?: string;
  brand?: string;
  concentration?: string;
  status?: string;
  featured?: string;
  minPrice?: string;
  maxPrice?: string;
}
