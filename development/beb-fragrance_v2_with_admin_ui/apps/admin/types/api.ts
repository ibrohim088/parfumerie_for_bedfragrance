// ============================================
// GENERIC API WRAPPERS
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  statusCode?: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> {}

// ============================================
// PAGINATION PARAMS
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// PRODUCTS
// ============================================

export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
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
  concentration: 'parfum' | 'edp' | 'edt' | 'edc' | 'body_mist';
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  isFeatured: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsQueryParams extends PaginationParams {
  status?: 'active' | 'inactive' | 'out_of_stock';
  brand?: string;
  concentration?: string;
  isFeatured?: boolean;
}

export interface CreateProductRequest {
  name: string;
  brand: string;
  description: string;
  concentration: 'parfum' | 'edp' | 'edt' | 'edc' | 'body_mist';
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  status?: 'active' | 'inactive' | 'out_of_stock';
  isFeatured?: boolean;
  variants: Omit<ProductVariant, 'id'>[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

// ============================================
// USERS
// ============================================

export interface AdminUser {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersQueryParams extends PaginationParams {
  role?: 'user' | 'admin';
  isActive?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  role?: 'user' | 'admin';
}

// ============================================
// ORDERS
// ============================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'payme' | 'click' | 'cash';

export type PaymentStatus =
  | 'pending'
  | 'pending_cash'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: {
    id: string;
    name: string;
    slug: string;
    images: ProductImage[];
  };
  variant: {
    id: string;
    volume: number;
    price: number;
  };
}

export interface DeliveryAddress {
  id: string;
  label?: string | null;
  fullName: string;
  phone: string;
  region: string;
  district: string;
  street: string;
  apartment?: string | null;
  landmark?: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  user: Pick<AdminUser, 'id' | 'firstName' | 'lastName' | 'phone' | 'email'>;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  transaction?: Transaction | null;
}

export interface OrdersQueryParams extends PaginationParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  dateFrom?: string;
  dateTo?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  note?: string;
}

// ============================================
// TRANSACTIONS
// ============================================

export interface Transaction {
  id: string;
  orderId: string;
  provider: PaymentMethod;
  externalId?: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  confirmedBy?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentsQueryParams extends PaginationParams {
  provider?: PaymentMethod;
  status?: PaymentStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface RefundRequest {
  transactionId: string;
  reason: string;
  amount?: number; // qisman refund uchun, bo'sh bo'lsa to'liq
}

// ============================================
// UPLOAD
// ============================================

export interface UploadResponse {
  url: string;
  key: string;
  size: number;
  mimetype: string;
}

// ============================================
// AUTH (Admin login)
// ============================================

export interface AdminLoginRequest {
  phone: string;
  password: string;
}

export interface AdminLoginResponse {
  user: AdminUser;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}