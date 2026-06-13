import { env } from './env';

// ── Payme ──────────────────────────────────────────────────────

export const paymeConfig = {
  merchantId: env.PAYME_MERCHANT_ID,
  secretKey: env.PAYME_SECRET_KEY,
  testMode: env.PAYME_TEST_MODE,

  // Payme callback URL lar
  callbackUrl: `${env.PAYMENT_CALLBACK_BASE_URL}/payments/payme/callback`,

  // Payme API URL lar
  apiUrl: env.PAYME_TEST_MODE
    ? 'https://checkout.test.paycom.uz'
    : 'https://checkout.paycom.uz',

  // Basic Auth header (Payme webhook uchun)
  basicAuthHeader: (): string => {
    const credentials = Buffer.from(
      `Paycom:${env.PAYME_SECRET_KEY}`,
    ).toString('base64');
    return `Basic ${credentials}`;
  },
} as const;

// ── Click ──────────────────────────────────────────────────────

export const clickConfig = {
  merchantId: env.CLICK_MERCHANT_ID,
  serviceId: env.CLICK_SERVICE_ID,
  secretKey: env.CLICK_SECRET_KEY,

  // Click callback URL lar
  prepareUrl: `${env.PAYMENT_CALLBACK_BASE_URL}/payments/click/prepare`,
  completeUrl: `${env.PAYMENT_CALLBACK_BASE_URL}/payments/click/complete`,

  // Click API URL
  apiUrl: 'https://api.click.uz/v2/merchant',
} as const;

// ── Naqt pul ───────────────────────────────────────────────────

export const cashConfig = {
  minAmount: env.CASH_MIN_AMOUNT,
  maxAmount: env.CASH_MAX_AMOUNT,
} as const;

// ── Umumiy to'lov konfiguratsiyasi ─────────────────────────────

export const paymentConfig = {
  callbackBaseUrl: env.PAYMENT_CALLBACK_BASE_URL,
  payme: paymeConfig,
  click: clickConfig,
  cash: cashConfig,
} as const;

export type PaymentConfig = typeof paymentConfig;

// ── Yordamchi funksiyalar ──────────────────────────────────────

/**
 * Summani UZS dan tiyinga o'tkazish (Payme tiyinda ishlaydi)
 * 1 UZS = 100 tiyin
 */
export function uzsTiyin(uzs: number): number {
  return Math.round(uzs * 100);
}

/**
 * Summani tiyindan UZS ga o'tkazish
 */
export function tiyinUzs(tiyin: number): number {
  return Math.round(tiyin / 100);
}

/**
 * Click MD5 imzo yaratish
 */
import crypto from 'crypto';

export function createClickSignature(params: {
  clickTransId: string;
  serviceId: string;
  secretKey: string;
  merchantTransId: string;
  amount: number;
  action: number;
  signTime: string;
}): string {
  const raw =
    params.clickTransId +
    params.serviceId +
    params.secretKey +
    params.merchantTransId +
    params.amount +
    params.action +
    params.signTime;

  return crypto.createHash('md5').update(raw).digest('hex');
}