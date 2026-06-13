import axios from 'axios';
import { env } from './env';

const TELEGRAM_API = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

// ── Asosiy xabar yuborish ──────────────────────────────────────

export interface TelegramSendResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

export async function sendTelegramMessage(
  chatId: string,
  text: string,
  parseMode: 'HTML' | 'Markdown' = 'HTML',
): Promise<TelegramSendResult> {
  try {
    const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    });

    return {
      success: true,
      messageId: response.data?.result?.message_id,
    };
  } catch (error: any) {
    console.error('Telegram xabar yuborishda xato:', error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.description || 'Telegram xabar yuborishda xato',
    };
  }
}

// ── Admin chat ga yuborish ─────────────────────────────────────

export async function notifyAdmin(text: string): Promise<TelegramSendResult> {
  return sendTelegramMessage(env.ADMIN_CHAT_ID, text);
}

// ── Yangi buyurtma bildirishi ──────────────────────────────────

export async function notifyNewOrder(order: {
  id: string;
  orderNumber: string;
  total: number;
  paymentMethod: string;
  customerPhone: string;
}): Promise<void> {
  const method =
    order.paymentMethod === 'payme'
      ? '💳 Payme'
      : order.paymentMethod === 'click'
      ? '💳 Click'
      : '💵 Naqt pul';

  const text =
    `🛒 <b>Yangi buyurtma!</b>\n\n` +
    `📦 Buyurtma: <code>#${order.orderNumber}</code>\n` +
    `👤 Telefon: <code>${order.customerPhone}</code>\n` +
    `💰 Summa: <b>${order.total.toLocaleString()} UZS</b>\n` +
    `💳 To'lov: ${method}`;

  await notifyAdmin(text);
}

// ── Naqt to'lov tasdiqlanishi ──────────────────────────────────

export async function notifyCashOrderButtons(order: {
  id: string;
  orderNumber: string;
  total: number;
  customerPhone: string;
}): Promise<void> {
  const text =
    `💵 <b>Naqt to'lov kutilmoqda</b>\n\n` +
    `📦 Buyurtma: <code>#${order.orderNumber}</code>\n` +
    `👤 Telefon: <code>${order.customerPhone}</code>\n` +
    `💰 Summa: <b>${order.total.toLocaleString()} UZS</b>\n\n` +
    `Iltimos, dashboard orqali tasdiqlang yoki rad eting.`;

  await notifyAdmin(text);
}