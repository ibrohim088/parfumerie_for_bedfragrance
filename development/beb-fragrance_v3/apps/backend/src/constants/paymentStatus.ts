export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PENDING_CASH: 'pending_cash',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_METHOD = {
  PAYME: 'payme',
  CLICK: 'click',
  CASH: 'cash',
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

// Admin dashboard da ko'rsatiladigan o'zbek tilidagi nomlar
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Kutilmoqda',
  pending_cash: 'Naqt — tasdiq kutilmoqda',
  paid: 'To\'langan',
  failed: 'Muvaffaqiyatsiz',
  refunded: 'Qaytarilgan',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  payme: 'Payme',
  click: 'Click',
  cash: 'Naqt pul',
};

// To'lov muvaffaqiyatli deb hisoblanadimi
export function isPaid(status: PaymentStatus): boolean {
  return status === PAYMENT_STATUS.PAID;
}

// To'lov yakuniy holatdami (o'zgartirish mumkin emas)
export function isFinalPaymentStatus(status: PaymentStatus): boolean {
  return status === PAYMENT_STATUS.PAID || status === PAYMENT_STATUS.REFUNDED;
}