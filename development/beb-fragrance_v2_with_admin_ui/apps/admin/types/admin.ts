import type {
  AdminUser,
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  Transaction,
} from './api';

// ============================================
// SIDEBAR NAVIGATION
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide-react icon name
  badge?: number | null;
  children?: NavItem[];
}

// ============================================
// DASHBOARD STAT CARD
// ============================================

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardData {
  title: string;
  value: string | number;
  trend?: {
    value: number;       // % yoki sonli qiymat
    direction: TrendDirection;
    label?: string;      // "o'tgan haftaga nisbatan"
  };
  icon?: string;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

// ============================================
// TABLE COLUMN DEFINITION
// ============================================

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
}

// ============================================
// FILTER STATE (orders, products, users sahifalari)
// ============================================

export interface OrderFilters {
  search: string;
  status: OrderStatus | '';
  paymentStatus: PaymentStatus | '';
  paymentMethod: PaymentMethod | '';
  dateFrom: string;
  dateTo: string;
}

export interface ProductFilters {
  search: string;
  status: 'active' | 'inactive' | 'out_of_stock' | '';
  brand: string;
  concentration: string;
  isFeatured: boolean | null;
}

export interface UserFilters {
  search: string;
  role: 'user' | 'admin' | '';
  isActive: boolean | null;
}

export interface PaymentFilters {
  search: string;
  provider: PaymentMethod | '';
  status: PaymentStatus | '';
  dateFrom: string;
  dateTo: string;
}

// ============================================
// MODAL STATE
// ============================================

export type ModalType =
  | 'confirm-delete'
  | 'refund'
  | 'order-status'
  | 'product-image'
  | 'user-detail'
  | null;

export interface ModalState<T = unknown> {
  type: ModalType;
  data?: T;
  isOpen: boolean;
}

// ============================================
// ADMIN SETTINGS
// ============================================

export interface AdminSettings {
  siteName: string;
  siteEmail: string;
  supportPhone: string;
  deliveryFee: number;
  minOrderAmount: number;
  cashMinAmount: number;
  cashMaxAmount: number;
  paymeEnabled: boolean;
  clickEnabled: boolean;
  cashEnabled: boolean;
  telegramNotifications: boolean;
  smsNotifications: boolean;
}

// ============================================
// RECENT ACTIVITY
// ============================================

export type ActivityType =
  | 'new_order'
  | 'payment_received'
  | 'order_cancelled'
  | 'new_user'
  | 'product_updated'
  | 'refund_requested';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  meta?: string;   // "150,000 UZS", "#ORD-001" kabi
  timestamp: string;
  read: boolean;
}

// ============================================
// RE-EXPORTS for convenience
// ============================================

export type {
  AdminUser,
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  Transaction,
};