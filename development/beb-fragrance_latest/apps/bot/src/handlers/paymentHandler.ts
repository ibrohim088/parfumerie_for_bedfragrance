import axios from 'axios';
import { BotContext } from '../types/context';
import { env } from '../config/env';

const API_BASE_URL = env.API_BASE_URL;

// Callback query action nomlari
export const CASH_CONFIRM_ACTION = 'cash_confirm';
export const CASH_REJECT_ACTION = 'cash_reject';

// Admin bot token orqali API chaqiruvi (service account sifatida)
async function callAdminApi(
  endpoint: string,
  body: Record<string, any>,
  adminToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await axios.post(`${API_BASE_URL}${endpoint}`, body, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message ?? 'API xatosi',
    };
  }
}

// Admin: naqt to'lovni tasdiqlash
export async function cashConfirmHandler(ctx: BotContext): Promise<void> {
  if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) return;

  const lang = ctx.session.language ?? 'uz';
  const token = ctx.session.token;

  if (!token || !ctx.session.isAdmin) {
    await ctx.answerCbQuery(
      lang === 'uz' ? '❌ Ruxsat yo\'q' : '❌ Нет доступа',
      { show_alert: true }
    );
    return;
  }

  // callback data: "cash_confirm:ORDER_ID"
  const orderId = ctx.callbackQuery.data.split(':')[1];
  if (!orderId) return;

  await ctx.answerCbQuery(
    lang === 'uz' ? '⏳ Tasdiqlanmoqda...' : '⏳ Подтверждается...'
  );

  const result = await callAdminApi(
    '/payments/cash/confirm',
    { orderId },
    token
  );

  if (result.success) {
    await ctx.editMessageText(
      (ctx.callbackQuery.message as any)?.text +
        '\n\n' +
        (lang === 'uz'
          ? '✅ <b>To\'lov tasdiqlandi!</b>'
          : '✅ <b>Оплата подтверждена!</b>'),
      { parse_mode: 'HTML' }
    );
  } else {
    await ctx.reply(
      lang === 'uz'
        ? `❌ Xatolik: ${result.error}`
        : `❌ Ошибка: ${result.error}`
    );
  }
}

// Admin: naqt to'lovni rad etish
export async function cashRejectHandler(ctx: BotContext): Promise<void> {
  if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) return;

  const lang = ctx.session.language ?? 'uz';
  const token = ctx.session.token;

  if (!token || !ctx.session.isAdmin) {
    await ctx.answerCbQuery(
      lang === 'uz' ? '❌ Ruxsat yo\'q' : '❌ Нет доступа',
      { show_alert: true }
    );
    return;
  }

  // callback data: "cash_reject:ORDER_ID"
  const orderId = ctx.callbackQuery.data.split(':')[1];
  if (!orderId) return;

  await ctx.answerCbQuery(
    lang === 'uz' ? '⏳ Rad etilmoqda...' : '⏳ Отклоняется...'
  );

  const result = await callAdminApi(
    '/payments/cash/reject',
    { orderId },
    token
  );

  if (result.success) {
    await ctx.editMessageText(
      (ctx.callbackQuery.message as any)?.text +
        '\n\n' +
        (lang === 'uz'
          ? '❌ <b>Buyurtma bekor qilindi.</b>'
          : '❌ <b>Заказ отменён.</b>'),
      { parse_mode: 'HTML' }
    );
  } else {
    await ctx.reply(
      lang === 'uz'
        ? `❌ Xatolik: ${result.error}`
        : `❌ Ошибка: ${result.error}`
    );
  }
}