/**
 * 🔐 Avtorizatsiya bilan bog'liq klaviaturalar
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

interface InlineWebAppButton {
  text: string;
  web_app: { url: string };
}

interface InlineCallbackButton {
  text: string;
  callback_data: string;
}

type InlineButton = InlineWebAppButton | InlineCallbackButton;

interface InlineKeyboardMarkup {
  inline_keyboard: InlineButton[][];
}

// ──────────────────────────────────────────────────────────────────────
// Telefon raqamini ulashish
// ──────────────────────────────────────────────────────────────────────

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

export function removeKeyboard(): RemoveKeyboardMarkup {
  return { remove_keyboard: true };
}

// ──────────────────────────────────────────────────────────────────────
// Sayt orqali kirish
// ──────────────────────────────────────────────────────────────────────

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