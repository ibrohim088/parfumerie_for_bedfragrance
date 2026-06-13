/**
 * 📣 Bildirishnoma xizmati — bot orqali Telegram xabarlarini yuborish
 *
 * Bu modul `bot.telegram` (Telegraf) orqali to'g'ridan-to'g'ri Telegram
 * Bot API'ga xabar yuboradi. Ishlatilish o'rinlari:
 *
 *  - Foydalanuvchiga buyurtma holati o'zgarganda xabar yuborish
 *    (masalan, backend tomonidan ishga tushirilgan job/eventdan keyin)
 *  - Admin guruhiga (`ADMIN_CHAT_ID`) bot bilan bog'liq voqealar
 *    haqida xabar berish (yangi foydalanuvchi, xatoliklar va h.k.)
 *
 * Eslatma: backendning o'z Telegram integratsiyasi mavjud
 * (`apps/backend/src/config/telegram.ts`) — u yangi buyurtmalar haqida
 * adminga to'g'ridan-to'g'ri xabar beradi. Shu modul esa **bot
 * jarayoni** ichidan (`Telegraf` instance orqali) xabar yuborish uchun.
 */

import { bot } from '../config/bot';
import { env } from '../config/env';
import type { Locale } from '../i18n/uz';

// ──────────────────────────────────────────────────────────────────────
// Umumiy xabar yuborish
// ──────────────────────────────────────────────────────────────────────

export interface NotifyResult {
  success: boolean;
  error?: string;
}

/**
 * Berilgan chat (foydalanuvchi) ID'siga HTML formatdagi xabar yuboradi.
 *
 * Foydalanuvchi botni bloklagan (`403 Forbidden`) yoki chat
 * topilmagan (`400 Bad Request: chat not found`) hollarda xatolik
 * tashlamaydi — `{ success: false, error }` qaytaradi, shunda
 * chaqiruvchi kod butun jarayonni to'xtatib qo'ymaydi.
 */
export async function notifyUser(
  chatId: number | string,
  text: string,
  options?: { replyMarkup?: Record<string, unknown> }
): Promise<NotifyResult> {
  try {
    await bot.telegram.sendMessage(chatId, text, {
      parse_mode: 'HTML',
      ...(options?.replyMarkup ? { reply_markup: options.replyMarkup } : {}),
    });
    return { success: true };
  } catch (error: any) {
    const description: string | undefined = error?.response?.description ?? error?.message;
    console.error(`❌ Foydalanuvchiga (${chatId}) xabar yuborishda xato:`, description);
    return { success: false, error: description };
  }
}

/**
 * Admin chatga (`env.ADMIN_CHAT_ID`) HTML formatdagi xabar yuboradi.
 *
 * Bot jarayonida yuzaga kelgan muhim voqealar (yangi foydalanuvchi,
 * kutilmagan xatoliklar va h.k.) haqida adminni xabardor qilish uchun.
 */
export async function notifyAdmin(text: string): Promise<NotifyResult> {
  return notifyUser(env.ADMIN_CHAT_ID, text);
}

// ──────────────────────────────────────────────────────────────────────
// Buyurtma holati haqida xabar
// ──────────────────────────────────────────────────────────────────────

export interface OrderStatusNotification {
  orderNumber: string;
  status: string;
  total: number;
}

const STATUS_EMOJI: Record<string, string> = {
  pending: '⏳',
  confirmed: '✅',
  processing: '🔧',
  shipped: '🚚',
  delivered: '🎉',
  cancelled: '❌',
  refunded: '↩️',
};

const STATUS_LABEL: Record<Locale, Record<string, string>> = {
  uz: {
    pending: 'Kutilmoqda',
    confirmed: 'Tasdiqlandi',
    processing: 'Tayyorlanmoqda',
    shipped: 'Yetkazilmoqda',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi',
    refunded: 'Qaytarildi',
  },
  ru: {
    pending: 'Ожидает',
    confirmed: 'Подтверждён',
    processing: 'Обрабатывается',
    shipped: 'В пути',
    delivered: 'Доставлен',
    cancelled: 'Отменён',
    refunded: 'Возвращён',
  },
};

/**
 * Foydalanuvchiga buyurtma holati o'zgargani haqida xabar yuboradi.
 *
 * `chatId` — foydalanuvchining Telegram chat ID'si (shaxsiy chatlarda
 * odatda `ctx.from.id` ga teng).
 */
export async function notifyOrderStatusChange(
  chatId: number | string,
  order: OrderStatusNotification,
  lang: Locale = 'uz'
): Promise<NotifyResult> {
  const emoji = STATUS_EMOJI[order.status] ?? '📦';
  const label = STATUS_LABEL[lang][order.status] ?? order.status;

  const text =
    lang === 'uz'
      ? `${emoji} <b>Buyurtma holati yangilandi</b>\n\n` +
        `📦 Buyurtma: <code>#${order.orderNumber}</code>\n` +
        `📊 Holat: <b>${label}</b>\n` +
        `💰 Summa: <b>${order.total.toLocaleString()} UZS</b>`
      : `${emoji} <b>Статус заказа обновлён</b>\n\n` +
        `📦 Заказ: <code>#${order.orderNumber}</code>\n` +
        `📊 Статус: <b>${label}</b>\n` +
        `💰 Сумма: <b>${order.total.toLocaleString()} UZS</b>`;

  return notifyUser(chatId, text);
}

// ──────────────────────────────────────────────────────────────────────
// Admin uchun voqea xabarlari
// ──────────────────────────────────────────────────────────────────────

/**
 * Bot orqali yangi foydalanuvchi ro'yxatdan o'tgani (OTP orqali
 * birinchi marta kirgani) haqida adminga xabar beradi.
 */
export async function notifyAdminNewUser(user: {
  firstName: string;
  lastName?: string;
  phone: string;
}): Promise<NotifyResult> {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

  const text =
    `🆕 <b>Yangi foydalanuvchi (bot orqali)</b>\n\n` +
    `🪪 Ism: <b>${fullName}</b>\n` +
    `📱 Telefon: <code>${user.phone}</code>`;

  return notifyAdmin(text);
}

/**
 * Bot jarayonida ushlanmagan xatolik yuz berganda adminga
 * qisqa diagnostika xabarini yuboradi.
 */
export async function notifyAdminError(context: string, error: unknown): Promise<NotifyResult> {
  const message = error instanceof Error ? error.message : String(error);

  const text =
    `🐞 <b>Bot xatoligi</b>\n\n` +
    `📍 Joy: <code>${context}</code>\n` +
    `💬 Xabar: <code>${message}</code>`;

  return notifyAdmin(text);
}
