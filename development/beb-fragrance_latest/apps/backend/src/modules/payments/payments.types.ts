export interface CreatePaymePaymentRequest {
  orderId: string;
}

export interface PaymeCallbackRequest {
  method: string;
  params: Record<string, any>;
  id: number;
}

export interface ClickPrepareRequest {
  click_trans_id: string;
  service_id: string;
  click_paydoc_id: string;
  merchant_trans_id: string;
  amount: number;
  action: number;
  error: number;
  error_note: string;
  sign_time: string;
  sign_string: string;
}

export interface ClickCompleteRequest extends ClickPrepareRequest {
  merchant_prepare_id: string;
}
