// ============================================
// DOMAIN TYPES & MODELS
// ============================================

// ============================================
// PRODUCT DOMAIN
// ============================================

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
}

export interface ProductFilterOptions {
  categories: string[];
  priceRange: [number, number];
  scents: string[];
  intensities: string[];
}

export interface ProductVariant {
  id: string;
  volume: string;
  price: number;
  stock: number;
  sku: string;
}

export interface ScraperProduct {
  id: string;
  externalId: string;
  name: string;
  source: string;
  price: number;
  currency: string;
  url: string;
  lastUpdated: string;
}

// ============================================
// ORDER DOMAIN
// ============================================

export interface OrderStatusHistory {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
  note?: string;
}

export interface OrderTimeline {
  ordered: string;
  confirmed?: string;
  shipped?: string;
  delivered?: string;
  estimatedDelivery?: string;
}

export interface ShippingInfo {
  provider: 'uzpost' | 'easyway' | 'other';
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
}

export interface RefundInfo {
  id: string;
  orderId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedAt: string;
  processedAt?: string;
}

export interface GiftOrder extends Order {
  giftMessage?: string;
  recipientName?: string;
  recipientPhone?: string;
}

// ============================================
// USER DOMAIN
// ============================================

export interface UserPreferences {
  language: 'uz' | 'ru';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  marketingEmails: boolean;
}

export interface UserStatistics {
  totalOrders: number;
  totalSpent: number;
  totalReviews: number;
  totalWishlistItems: number;
  averageOrderValue: number;
  memberSince: string;
}

export interface UserVerification {
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
}

export interface UserAccount extends User {
  preferences: UserPreferences;
  statistics: UserStatistics;
  verification: UserVerification;
}

export interface Admin extends User {
  permissions: AdminPermission[];
  lastActivityAt: string;
  department?: string;
}

export enum AdminPermission {
  VIEW_DASHBOARD = 'view_dashboard',
  MANAGE_PRODUCTS = 'manage_products',
  MANAGE_ORDERS = 'manage_orders',
  MANAGE_USERS = 'manage_users',
  MANAGE_PAYMENTS = 'manage_payments',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_SETTINGS = 'manage_settings',
  MANAGE_SUPPORT = 'manage_support',
}

// ============================================
// CART DOMAIN
// ============================================

export interface CartSummary {
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discount: number;
  total: number;
}

export interface CartPromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  expiresAt: string;
}

export interface CartSaved {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  name: string;
  createdAt: string;
}

// ============================================
// PAYMENT DOMAIN
// ============================================

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'payme' | 'click' | 'card' | 'cash';
  isDefault: boolean;
  lastUsed?: string;
  // Card details (masked)
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  // Account details
  accountNumber?: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: 'payme' | 'click' | 'cash';
  provider: 'payme' | 'click' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  errorCode?: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
  metadata?: Record<string, any>;
}

export interface PaymentStats {
  totalTransactions: number;
  totalAmount: number;
  successfulPayments: number;
  failedPayments: number;
  averageTransactionAmount: number;
  mostUsedMethod: 'payme' | 'click' | 'cash';
}

// ============================================
// WISHLIST & FAVORITES DOMAIN
// ============================================

export interface WishlistItem {
  productId: string;
  productName: string;
  price: number;
  image: string;
  rating: number;
  addedAt: string;
  priceHistory?: PriceHistoryEntry[];
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PriceHistoryEntry {
  price: number;
  date: string;
}

// ============================================
// NOTIFICATION DOMAIN
// ============================================

export interface NotificationPreferences {
  orderUpdates: boolean;
  paymentNotifications: boolean;
  promotions: boolean;
  systemAlerts: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export interface NotificationTemplate {
  id: string;
  type: 'order' | 'payment' | 'system' | 'promotion';
  titleUz: string;
  titleRu: string;
  messageUz: string;
  messageRu: string;
  variables?: string[];
}

// ============================================
// REVIEW DOMAIN
// ============================================

export interface ProductRating {
  average: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  verified: number;
  unverified: number;
}

export interface UserReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  helpfulCount: number;
  unhelpfulCount: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// SCENT PROFILE DOMAIN
// ============================================

export interface ScentNote {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface ScentFamily {
  id: string;
  name: string;
  nameUz: string;
  nameRu: string;
  description: string;
  characteristics: string[];
  topProducts: string[];
}

export interface ScentPreference {
  familyId: string;
  intensity: 'light' | 'moderate' | 'strong';
  favoriteNotes: string[];
}

export interface PersonalScentProfile {
  userId: string;
  preferences: ScentPreference[];
  recommendedProducts: string[];
  lastUpdated: string;
}

// ============================================
// ANALYTICS DOMAIN
// ============================================

export interface UserActivity {
  userId: string;
  action: 'view' | 'click' | 'add_to_cart' | 'purchase' | 'review';
  productId?: string;
  orderId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface SalesMetrics {
  date: string;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: string[];
  topCategories: string[];
}

export interface UserMetrics {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
  bounceRate: number;
}

// ============================================
// SUPPORT DOMAIN
// ============================================

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  category: 'shipping' | 'payment' | 'product' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderType: 'customer' | 'support';
  message: string;
  attachments?: string[];
  createdAt: string;
}

// ============================================
// COUPON & PROMO DOMAIN
// ============================================

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  applicableCategories?: string[];
  applicableProducts?: string[];
  excludedProducts?: string[];
  isActive: boolean;
}

export interface PromoCampaign {
  id: string;
  name: string;
  description: string;
  type: 'seasonal' | 'flash' | 'vip' | 'referral';
  startDate: string;
  endDate: string;
  banner?: string;
  coupons: string[];
  targetedUsers?: string[];
  conditions?: Record<string, any>;
}

// ============================================
// EXPORT ALL USER TYPES
// ============================================

export type { User } from './api.types';

// ============================================
// UTILITY TYPES
// ============================================

export type Locale = 'uz' | 'ru';
export type Theme = 'light' | 'dark' | 'auto';
export type Currency = 'UZS' | 'RUB' | 'USD';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type NotificationType = 'order' | 'payment' | 'system' | 'promotion';

export type UserRole = 'user' | 'admin';
