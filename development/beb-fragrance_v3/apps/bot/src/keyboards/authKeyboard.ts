/**
 * 🔐 Avtorizatsiya bilan bog'liq klaviaturalar
 *
 * Foydalanuvchi tizimga kirmagan bo'lsa (sessiyada `token` yo'q),
 * unga telefon raqamini ulashish (OTP uchun) yoki sayt login
 * sahifasini WebApp orqali ochish imkonini beradigan klaviaturalar.
 */

import { WEBAPP_URL } from '../config/bot';
import type { Locale } from '../i18n/uz';

// ──────────────────────────────────────────────────────────────────────
// Yordamchi tiplar (Telegram Bot API)
// ──────────────────────────────────────────────────────────────────────

interface ReplyKeyboardButton {
  text: string;
  request_contact?: boolean;
}

interface ReplyKeyboardMarkup {
  keyboard: ReplyKeyboardButton[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
}

interface RemoveKeyboardMarkup {
  remove_keyboard: true;
}

interface InlineButton {
  text: string;
  web_app?: { url: string };
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineButton[][];
}

// ──────────────────────────────────────────────────────────────────────
// Telefon raqamini ulashish
// ──────────────────────────────────────────────────────────────────────

/**
 * Telefon raqamini ulashish so'rovi bilan klaviatura.
 *
 * Telegram'ning `request_contact` xususiyati orqali foydalanuvchi
 * o'z telefon raqamini bir tugma bosish bilan yuboradi. Bu raqam
 * keyinchalik OTP yuborish / hisobni bog'lash uchun ishlatiladi
 * (`ctx.session.phone`).
 */
export function requestPhoneKeyboard(lang: Locale): ReplyKeyboardMarkup {
  return {
    keyboard: [
      [
        {
          text:
            lang === 'uz'
              ? '📱 Telefon raqamni yuborish'
              : '📱 Отправить номер телефона',
          request_contact: true,
        },
      ],
      [{ text: lang === 'uz' ? '⬅️ Orqaga' : '⬅️ Назад' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
}

/**
 * Reply keyboard'ni yashirish.
 *
 * Telefon raqami muvaffaqiyatli qabul qilingandan keyin yoki
 * avtorizatsiya bekor qilinganda asosiy klaviaturaga qaytishdan
 * oldin ishlatiladi.
 */
export function removeKeyboard(): RemoveKeyboardMarkup {
  return { remove_keyboard: true };
}

// ──────────────────────────────────────────────────────────────────────
// Sayt orqali kirish
// ──────────────────────────────────────────────────────────────────────

/**
 * "🌐 Kirish" — sayt login sahifasini WebApp sifatida ochadi.
 *
 * Token umuman bo'lmagan yoki sessiya muddati tugagan (401)
 * holatlarda foydalanuvchiga ko'rsatiladi.
 */
export function loginWebAppKeyboard(lang: Locale): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        {
          text: lang === 'uz' ? '🌐 Kirish' : '🌐 Войти',
          web_app: { url: `${WEBAPP_URL}/login` },
        },
      ],
    ],
  };
}
