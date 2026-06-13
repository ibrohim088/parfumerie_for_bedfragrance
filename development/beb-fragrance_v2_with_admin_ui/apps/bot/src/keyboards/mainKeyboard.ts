/**
 * 🧭 Asosiy pastki klaviatura (Reply Keyboard)
 *
 * `/start` buyrug'idan keyin va til almashtirilgandan keyin
 * foydalanuvchiga ko'rsatiladigan doimiy (persistent) pastki klaviatura.
 *
 * Tugma matnlari `../i18n/uz.ts` va `../i18n/ru.ts` fayllaridagi
 * `start.buttons` bo'limidan olinadi — matnni o'zgartirish kerak
 * bo'lsa, faqat i18n fayllarini tahrirlash kifoya.
 */

import { uz, type Locale } from '../i18n/uz';
import { ru } from '../i18n/ru';

const translations = { uz, ru };

// ──────────────────────────────────────────────────────────────────────
// Yordamchi tiplar (Telegram Bot API — ReplyKeyboardMarkup)
// ──────────────────────────────────────────────────────────────────────

interface ReplyKeyboardButton {
  text: string;
}

interface ReplyKeyboardMarkup {
  keyboard: ReplyKeyboardButton[][];
  resize_keyboard?: boolean;
  persistent?: boolean;
}

// ──────────────────────────────────────────────────────────────────────
// Asosiy menyu
// ──────────────────────────────────────────────────────────────────────

/** Til almashtirish tugmasi matni (UZ va RU uchun bir xil) */
export const LANGUAGE_SWITCH_BUTTON = '🌐 UZ / RU';

/**
 * Doimiy pastki menyu klaviaturasi.
 *
 * Qatorlar:
 *  1) 🛍 Katalog        | 🌐 Saytga o'tish
 *  2) 📦 Buyurtmalarim  | 👤 Profil
 *  3) 📞 Bog'lanish     | 🌐 UZ / RU
 *
 * @param lang Foydalanuvchi sessiyasidagi til ('uz' | 'ru')
 */
export function mainKeyboard(lang: Locale): ReplyKeyboardMarkup {
  const t = translations[lang].start.buttons;

  return {
    keyboard: [
      [{ text: t.catalog }, { text: t.website }],
      [{ text: t.myOrders }, { text: t.profile }],
      [{ text: t.contact }, { text: t.langSwitch }],
    ],
    resize_keyboard: true,
    persistent: true,
  };
}

export default mainKeyboard;
