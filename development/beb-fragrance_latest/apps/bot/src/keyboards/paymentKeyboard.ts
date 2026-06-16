/**
 * 💵 To'lov bilan bog'liq inline klaviaturalar (admin uchun)
 *
 * Naqt pul ("cash") to'lovi kutilayotgan buyurtmalar uchun
 * adminga yuboriladigan "Tasdiqlash / Rad etish" tugmalari.
 *
 * MUHIM: callback_data formatlari
 * `apps/bot/src/handlers/paymentHandler.ts` dagi
 * `cashConfirmHandler` / `cashRejectHandler` bilan mos kelishi SHART:
 *   - "cash_confirm:<orderId>"  → cashConfirmHandler
 *   - "cash_reject:<orderId>"   → cashRejectHandler
 */

import type { Locale } from '../i18n/uz';

/** paymentHandler.ts dagi CASH_CONFIRM_ACTION bilan bir xil bo'lishi shart */
export const CASH_CONFIRM_ACTION = 'cash_confirm';
/** paymentHandler.ts dagi CASH_REJECT_ACTION bilan bir xil bo'lishi shart */
export const CASH_REJECT_ACTION = 'cash_reject';

// ──────────────────────────────────────────────────────────────────────
// Yordamchi tiplar (Telegram Bot API — InlineKeyboardMarkup)
// ──────────────────────────────────────────────────────────────────────

interface InlineButton {
  text: string;
  callback_data: string;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineButton[][];
}

// ──────────────────────────────────────────────────────────────────────
// Naqt to'lovni tasdiqlash / rad etish
// ──────────────────────────────────────────────────────────────────────

/**
 * Admin uchun "Naqt to'lovni tasdiqlash / rad etish" tugmalari.
 *
 * Yangi naqt to'lov kutilayotgan buyurtma bo'yicha adminga
 * bildirishnoma yuborilganda shu klaviatura xabarga biriktiriladi.
 * Tugma bosilganda mos `cashConfirmHandler` / `cashRejectHandler`
 * ishga tushadi va `ctx.callbackQuery.data.split(':')[1]` orqali
 * `orderId` o'qiladi.
 *
 * @param orderId  Buyurtma ID si (callback_data ichida ishlatiladi)
 * @param lang     Admin interfeysi tili ('uz' | 'ru')
 */
export function cashConfirmationKeyboard(
  orderId: string,
  lang: Locale
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        {
          text: lang === 'uz' ? '✅ Tasdiqlash' : '✅ Подтвердить',
          callback_data: `${CASH_CONFIRM_ACTION}:${orderId}`,
        },
        {
          text: lang === 'uz' ? "❌ Rad etish" : '❌ Отклонить',
          callback_data: `${CASH_REJECT_ACTION}:${orderId}`,
        },
      ],
    ],
  };
}
