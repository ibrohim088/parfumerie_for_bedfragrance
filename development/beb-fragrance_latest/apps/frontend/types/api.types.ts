// ============================================
// API REQUEST & RESPONSE TYPES
// ============================================

// ============================================
// PRODUCTS API
// ============================================

export interface ProductsQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'popular' | 'rating';
  page?: number;
  limit?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: 'women' | 'men' | 'unisex' | 'sets';
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbnail: string;
  inStock: boolean;
  stockCount: number;
  scentFamily?: string;
  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];
  intensity?: 'light' | 'moderate' | 'strong';
  gender?: string;
  volume?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailResponse {
  success: boolean;
  data: Product;
  message: string;
}

export interface ProductsListResponse {
  success: boolean;
  data: {
    items: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

export interface ProductSearchResponse {
  success: boolean;
  data: Product[];
  message: string;
}

// ============================================
// ORDERS API
// ============================================

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'payme' | 'click' | 'cash';
  paymentId?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    zipCode: string;
  };
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: 'payme' | 'click' | 'cash';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    zipCode: string;
  };
  notes?: string;
}

export interface OrdersListResponse {
  success: boolean;
  data: {
    items: Order[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
}

export interface OrderDetailResponse {
  success: boolean;
  data: Order;
  message: string;
}

export interface UpdateOrderRequest {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
}

export interface UpdateOrderResponse {
  success: boolean;
  data: Order;
  message: string;
}

export interface CancelOrderResponse {
  success: boolean;
  data: Order;
  message: string;
}

// ============================================
// AUTHENTICATION API
// ============================================

export interface SendOtpRequest {
  phone: string;
}

export interface SendOtpResponse {
  success: boolean;
  data: {
    expiresIn: number;
  };
  message: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message: string;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
  };
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ============================================
// USERS API
// ============================================

export interface User {
  id: string;
  phone: string;
  email?: string;
  fullName?: string;
  profileImage?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  role: 'user' | 'admin';
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface UserDetailResponse {
  success: boolean;
  data: User;
  message: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  email?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  data: User;
  message: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// ============================================
// ADDRESSES API
// ============================================

export interface Address {
  id: string;
  userId: string;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface AddressesListResponse {
  success: boolean;
  data: Address[];
  message: string;
}

export interface AddressDetailResponse {
  success: boolean;
  data: Address;
  message: string;
}

export interface CreateAddressResponse {
  success: boolean;
  data: Address;
  message: string;
}

export interface UpdateAddressRequest {
  title?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  zipCode?: string;
  isDefault?: boolean;
}

export interface UpdateAddressResponse {
  success: boolean;
  data: Address;
  message: string;
}

export interface DeleteAddressResponse {
  success: boolean;
  message: string;
}

export interface SetDefaultAddressResponse {
  success: boolean;
  message: string;
}

// ============================================
// NOTIFICATIONS API
// ============================================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system' | 'promotion';
  icon?: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsListResponse {
  success: boolean;
  data: {
    items: Notification[];
    unreadCount: number;
    total: number;
  };
  message: string;
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
}

export interface MarkAllAsReadResponse {
  success: boolean;
  message: string;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}

// ============================================
// SCENT PROFILE API
// ============================================

export interface ScentProfile {
  id: string;
  userId: string;
  favoriteScents: string[];
  scentFamily?: 'floral' | 'fresh' | 'woody' | 'oriental' | 'chypre';
  intensity?: 'light' | 'moderate' | 'strong';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScentProfileRequest {
  favoriteScents: string[];
  scentFamily?: 'floral' | 'fresh' | 'woody' | 'oriental' | 'chypre';
  intensity?: 'light' | 'moderate' | 'strong';
  notes?: string;
}

export interface ScentProfileResponse {
  success: boolean;
  data: ScentProfile;
  message: string;
}

export interface UpdateScentProfileRequest {
  favoriteScents?: string[];
  scentFamily?: 'floral' | 'fresh' | 'woody' | 'oriental' | 'chypre';
  intensity?: 'light' | 'moderate' | 'strong';
  notes?: string;
}

export interface DeleteScentProfileResponse {
  success: boolean;
  message: string;
}

// ============================================
// PAYMENT API
// ============================================

export interface CreatePaymentRequest {
  orderId: string;
  amount: number;
  returnUrl: string;
}

export interface PaymePaymentResponse {
  success: boolean;
  data: {
    paymentId: string;
    paymentUrl: string;
  };
  message: string;
}

export interface ClickPaymentResponse {
  success: boolean;
  data: {
    paymentId: string;
    invoiceId: string;
  };
  message: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  data: {
    paymentId: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    amount: number;
    transactionId?: string;
    completedAt?: string;
  };
  message: string;
}

export interface PaymentCallbackRequest {
  paymentId: string;
  status: 'success' | 'failed' | 'cancelled';
  transactionId?: string;
}

export interface PaymentCallbackResponse {
  success: boolean;
  message: string;
}

// ============================================
// CART API
// ============================================

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  success: boolean;
  data: Cart;
  message: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface RemoveFromCartResponse {
  success: boolean;
  message: string;
}

export interface ClearCartResponse {
  success: boolean;
  message: string;
}

// ============================================
// GENERIC API RESPONSE
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}
