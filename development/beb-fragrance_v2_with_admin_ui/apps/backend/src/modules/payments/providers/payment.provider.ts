export interface PaymentCreateResult {
  paymentUrl?: string;
  transactionId?: string;
  data?: Record<string, unknown>;
}

export interface IPaymentProvider {
  createPayment(orderId: string, amount: number): Promise<PaymentCreateResult>;
  handleCallback(payload: Record<string, any>): Promise<void>;
  refund(transactionId: string, amount: number): Promise<void>;
}
