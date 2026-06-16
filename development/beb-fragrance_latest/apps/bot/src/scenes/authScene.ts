/**
 * 🔐 Avtorizatsiya "scene"si — telefon raqami orqali OTP bilan kirish
 */

import axios from 'axios';
import { BotContext } from '../types/context';
import { API_BASE_URL } from '../config/bot';
import {
  requestPhoneKeyboard,
  removeKeyboard,
  loginWebAppKeyboard,
} from '../keyboards/authKeyboard';
import { mainKeyboard } from '../keyboards/mainKeyboard';

export const AUTH_STEPS = {
  AWAITING_PHONE: 'auth_awaiting_phone',
  AWAITING_OTP: 'auth_awaiting_otp',
} as const;

const PHONE_REGEX = /^\+998\d{9}$/;
const OTP_REGEX = /^\d{6}$/;

export function isAuthStep(ctx: BotContext): boolean {
  const step = ctx.session.step;
  return step === AUTH_STEPS.AWAITING_PHONE || step === AUTH_STEPS.AWAITING_OTP;
}

export async function enterAuthScene(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  ctx.session.step = AUTH_STEPS.AWAITING_PHONE;
  const text =
    lang === 'uz'
      ? `🔐 <b>Tizimga kirish</b>\n\nDavom etish uchun telefon raqamingizni ulashing. Bu raqamga 6 xonali tasdiqlash kodi (OTP) yuboriladi.`
      : `🔐 <b>Вход в систему</b>\n\nЧтобы продолжить, поделитесь номером телефона. На этот номер будет отправлен 6-значный код подтверждения (OTP).`;
  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: requestPhoneKeyboard(lang),
  });
}

export async function handleAuthStartCallback(ctx: BotContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCbQuery();
  }
  await enterAuthScene(ctx);
}

export async function handlePhoneContact(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  if (!ctx.message || !('contact' in ctx.message)) return;
  const contact = ctx.message.contact;
  if (contact.user_id && contact.user_id !== ctx.from?.id) {
    await ctx.reply(
      lang === 'uz'
        ? "⚠️ Iltimos, faqat o'zingizning telefon raqamingizni yuboring."
        : '⚠️ Пожалуйста, отправьте только свой собственный номер телефона.',
      { reply_markup: requestPhoneKeyboard(lang) }
    );
    return;
  }
  let phone = contact.phone_number.replace(/[\s()-]/g, '');
  if (!phone.startsWith('+')) phone = `+${phone}`;
  if (!PHONE_REGEX.test(phone)) {
    await ctx.reply(
      lang === 'uz'
        ? "❌ Telefon raqam noto'g'ri. Masalan: +998901234567"
        : '❌ Неверный номер телефона. Например: +998901234567',
      { reply_markup: requestPhoneKeyboard(lang) }
    );
    return;
  }
  try {
    await axios.post(`${API_BASE_URL}/auth/send-otp`, { phone, telegramId: ctx.from?.id });
    ctx.session.phone = phone;
    ctx.session.step = AUTH_STEPS.AWAITING_OTP;
    await ctx.reply(
      lang === 'uz'
        ? `📩 <b>${phone}</b> raqamiga 6 xonali tasdiqlash kodi yuborildi.\n\nKodni shu yerga kiriting:`
        : `📩 На номер <b>${phone}</b> отправлен 6-значный код подтверждения.\n\nВведите код сюда:`,
      { parse_mode: 'HTML', reply_markup: removeKeyboard() }
    );
  } catch (error: any) {
    if (error?.response?.status === 429) {
      await ctx.reply(
        lang === 'uz'
          ? "⏳ Juda ko'p urinish. Iltimos, biroz kutib qaytadan urinib ko'ring."
          : '⏳ Слишком много попыток. Подождите немного и попробуйте снова.',
        { reply_markup: removeKeyboard() }
      );
      return;
    }
    await ctx.reply(
      lang === 'uz'
        ? "❌ OTP kodini yuborishda xatolik. Keyinroq urinib ko'ring."
        : '❌ Ошибка при отправке OTP-кода. Попробуйте позже.',
      { reply_markup: removeKeyboard() }
    );
    ctx.session.step = null;
    ctx.session.phone = null;
  }
}

export async function handleOtpInput(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const phone = ctx.session.phone;
  if (!ctx.message || !('text' in ctx.message)) return;
  const otp = ctx.message.text.trim();
  if (otp === '⬅️ Orqaga' || otp === '⬅️ Назад') {
    await cancelAuthScene(ctx);
    return;
  }
  if (!phone) {
    await enterAuthScene(ctx);
    return;
  }
  if (!OTP_REGEX.test(otp)) {
    await ctx.reply(
      lang === 'uz'
        ? "❌ Kod 6 xonali raqamdan iborat bo'lishi kerak. Qayta kiriting:"
        : '❌ Код должен состоять из 6 цифр. Введите снова:'
    );
    return;
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
      phone,
      otp,
      firstName: ctx.from?.first_name,
      lastName: ctx.from?.last_name,
    });
    const data = response.data?.data;
    ctx.session.token = data?.accessToken ?? null;
    ctx.session.userId = data?.user?.id ?? null;
    ctx.session.isAdmin = data?.user?.role === 'admin';
    ctx.session.step = null;
    ctx.session.phone = null;
    const name = data?.user?.firstName ?? '';
    await ctx.reply(
      lang === 'uz'
        ? `✅ Tabriklaymiz, <b>${name}</b>! Tizimga muvaffaqiyatli kirdingiz.`
        : `✅ Поздравляем, <b>${name}</b>! Вы успешно вошли в систему.`,
      { parse_mode: 'HTML', reply_markup: mainKeyboard(lang) }
    );
  } catch (error: any) {
    const status = error?.response?.status;
    const code = error?.response?.data?.code;
    if (status === 400 || status === 401) {
      if (code === 'OTP_EXPIRED') {
        await ctx.reply(
          lang === 'uz'
            ? "⏰ Kod muddati tugagan (2 daqiqa). Iltimos, /start orqali qaytadan boshlang va yangi kod so'rang."
            : '⏰ Срок действия кода истёк (2 минуты). Начните заново через /start и запросите новый код.'
        );
        ctx.session.step = null;
        ctx.session.phone = null;
        return;
      }
      await ctx.reply(
        lang === 'uz'
          ? "❌ Kod noto'g'ri. Qayta urinib ko'ring yoki /start orqali qaytadan boshlang."
          : '❌ Код неверный. Попробуйте снова или начните заново через /start.'
      );
      return;
    }
    await ctx.reply(
      lang === 'uz'
        ? "❌ Tasdiqlashda xatolik yuz berdi. Keyinroq urinib ko'ring."
        : '❌ Произошла ошибка при подтверждении. Попробуйте позже.',
      { reply_markup: mainKeyboard(lang) }
    );
    ctx.session.step = null;
    ctx.session.phone = null;
  }
}

export async function cancelAuthScene(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  ctx.session.step = null;
  ctx.session.phone = null;
  await ctx.reply(lang === 'uz' ? '↩️ Bekor qilindi.' : '↩️ Отменено.', {
    reply_markup: mainKeyboard(lang),
  });
}

export async function promptLogin(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const webAppButtons = loginWebAppKeyboard(lang).inline_keyboard;
  await ctx.reply(
    lang === 'uz'
      ? '🔐 Profil bilan ishlash uchun tizimga kiring.'
      : '🔐 Войдите в систему, чтобы продолжить.',
    {
      reply_markup: {
        inline_keyboard: [
          ...webAppButtons,
          [
            {
              text: lang === 'uz' ? '📱 Telefon orqali kirish' : '📱 Войти по телефону',
              callback_data: 'AUTH_START',
            },
          ],
        ] as any,
      },
    }
  );
}