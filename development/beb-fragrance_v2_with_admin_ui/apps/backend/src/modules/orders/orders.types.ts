export interface OrderItemInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemInput[];
  deliveryAddressId: string;
  paymentMethod: 'payme' | 'click' | 'cash';
  notes?: string;
}

export interface OrderListQuery {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  search?: string;
}
