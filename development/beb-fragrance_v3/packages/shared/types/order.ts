import type { ProductVariant } from './product';
import type { Address } from './address';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variant: Pick<ProductVariant, 'volume' | 'price'>;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  deliveryAddress: Address;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}