// ============================================
// OVERVIEW / DASHBOARD STATS
// ============================================

export interface OverviewStats {
  totalRevenue: number;        // UZS
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  todayRevenue: number;        // UZS
  todayOrders: number;
  pendingOrders: number;
  pendingCashOrders: number;   // admin tasdiqlashini kutayotgan naqt pul
}

export interface OverviewStatsResponse {
  success: boolean;
  data: OverviewStats;
  message: string;
}

// ============================================
// REVENUE CHART
// ============================================

export type RevenuePeriod = 'daily' | 'weekly' | 'monthly';

export interface RevenueDataPoint {
  date: string;    // ISO yoki "2026-06-14" formati
  revenue: number; // UZS
  orders: number;
}

export interface RevenueChartData {
  period: RevenuePeriod;
  data: RevenueDataPoint[];
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
}

export interface RevenueChartResponse {
  success: boolean;
  data: RevenueChartData;
  message: string;
}

// ============================================
// ORDERS BY STATUS CHART
// ============================================

export interface OrderStatusStat {
  status: string;
  count: number;
  percentage: number;
  revenue: number;
}

export interface OrdersByStatusData {
  stats: OrderStatusStat[];
  total: number;
}

export interface OrdersByStatusResponse {
  success: boolean;
  data: OrdersByStatusData;
  message: string;
}

// ============================================
// PAYMENT METHOD CHART
// ============================================

export interface PaymentMethodStat {
  provider: 'payme' | 'click' | 'cash';
  count: number;
  revenue: number;
  percentage: number;
}

export interface PaymentMethodData {
  stats: PaymentMethodStat[];
  total: number;
  totalRevenue: number;
}

export interface PaymentMethodResponse {
  success: boolean;
  data: PaymentMethodData;
  message: string;
}

// ============================================
// TOP PRODUCTS
// ============================================

export interface TopProduct {
  productId: string;
  name: string;
  slug: string;
  totalSold: number;
  totalRevenue: number;
  primaryImage?: string | null;
}

export interface TopProductsData {
  products: TopProduct[];
  period: RevenuePeriod;
}

export interface TopProductsResponse {
  success: boolean;
  data: TopProductsData;
  message: string;
}

// ============================================
// USER GROWTH CHART
// ============================================

export interface UserGrowthDataPoint {
  date: string;
  newUsers: number;
  totalUsers: number;
}

export interface UserGrowthStats {
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  totalActive: number;
  data: UserGrowthDataPoint[];
}

export interface UserGrowthResponse {
  success: boolean;
  data: UserGrowthStats;
  message: string;
}

// ============================================
// FULL ANALYTICS (bitta endpointda hammasi)
// ============================================

export interface FullAnalyticsData {
  overview: OverviewStats;
  revenue: RevenueChartData;
  ordersByStatus: OrdersByStatusData;
  paymentMethods: PaymentMethodData;
  topProducts: TopProductsData;
  userGrowth: UserGrowthStats;
}

export interface FullAnalyticsResponse {
  success: boolean;
  data: FullAnalyticsData;
  message: string;
}

// ============================================
// QUERY PARAMS
// ============================================

export interface AnalyticsQueryParams {
  period?: RevenuePeriod;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}