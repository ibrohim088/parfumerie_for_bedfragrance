export interface OverviewStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  todayRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  pendingCashOrders: number;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderStats {
  status: string;
  count: number;
}

export interface TopProduct {
  productId: string;
  name: string;
  slug: string;
  totalSold: number;
  totalRevenue: number;
}

export interface UserStats {
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  totalActive: number;
}

export type RevenuePeriod = 'daily' | 'weekly' | 'monthly';
