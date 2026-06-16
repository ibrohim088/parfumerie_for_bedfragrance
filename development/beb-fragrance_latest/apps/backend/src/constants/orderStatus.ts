export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

// Admin dashboard da ko'rsatiladigan o'zbek tilidagi nomlar
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Kutilmoqda',
  confirmed: 'Tasdiqlangan',
  processing: 'Jarayonda',
  shipped: 'Yetkazilmoqda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilingan',
  refunded: 'Qaytarilgan',
};

// Admin qaysi statusga o'tkaza oladi (ruxsat etilgan o'tishlar)
export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
};

// Yakuniy statuslar — bulardan keyin o'zgartirib bo'lmaydi
export const FINAL_ORDER_STATUSES: OrderStatus[] = ['delivered', 'cancelled', 'refunded'];

export function isFinalStatus(status: OrderStatus): boolean {
  return FINAL_ORDER_STATUSES.includes(status);
}

export function canTransitionTo(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from].includes(to);
}