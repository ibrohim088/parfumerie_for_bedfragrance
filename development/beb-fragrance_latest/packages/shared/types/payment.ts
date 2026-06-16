export type PaymentMethod = 'payme' | 'click' | 'cash';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'pending_cash';

export interface PaymentProvider {
  name: PaymentMethod;
  transactionId?: string;
  externalId?: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number; // UZS
  method: PaymentMethod;
  status: PaymentStatus;
  provider: PaymentProvider;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}