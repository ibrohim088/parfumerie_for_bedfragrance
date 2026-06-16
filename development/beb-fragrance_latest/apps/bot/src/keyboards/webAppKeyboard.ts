/**
 * 🌐 Telegram WebApp tugmalari bilan inline klaviaturalar
 *
 * Bot ichidan saytning turli sahifalarini (katalog, mahsulot,
 * login, buyurtmalar, kontaktlar) Telegram WebApp sifatida ochish
 * uchun ishlatiladigan inline klaviaturalar.
 *
 * Matnlar `../i18n/uz.ts` va `../i18n/ru.ts` fayllaridan olinadi,
 * havolalar `../config/bot.ts` dagi `WEBAPP_URL` asosida tuziladi.
 */

import { WEBAPP_URL } from '../config/bot';
import { uz, type Locale } from '../i18n/uz';
import { ru } from '../i18n/ru';

const translations = { uz, ru };

// ──────────────────────────────────────────────────────────────────────
// Yordamchi tiplar (Telegram Bot API — InlineKeyboardMarkup)
// ──────────────────────────────────────────────────────────────────────

interface InlineButton {
  text: string;
  web_app?: { url: string };
  url?: string;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineButton[][];
}

/** Bitta qatordan iborat, WebApp ochuvchi tugma yaratish */
function webAppButton(text: string, url: string): InlineButton {
  return { text, web_app: { url } };
}

// ──────────────────────────────────────────────────────────────────────
// Katalog / sayt
// ──────────────────────────────────────────────────────────────────────

/** "🛍 Katalogni ochish" — `/catalog` sahifasini WebApp sifatida ochadi */
export function catalogKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].menu;
  return {
    inline_keyboard: [[webAppButton(t.openCatalog, `${WEBAPP_URL}/catalog`)]],
  };
}

/** "🌐 Saytni ochish" — sayt bosh sahifasini WebApp sifatida ochadi */
export function websiteKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].menu;
  return {
    inline_keyboard: [[webAppButton(t.openWebsite, WEBAPP_URL)]],
  };
}

// ──────────────────────────────────────────────────────────────────────
// Mahsulotlar
// ──────────────────────────────────────────────────────────────────────

/** "🛍 Batafsil ko'rish" — bitta mahsulot sahifasi (slug bo'yicha) */
export function productDetailKeyboard(
  lang: Locale,
  slug: string
): InlineKeyboardMarkup {
  const t = translations[lang].catalog;
  return {
    inline_keyboard: [
      [webAppButton(t.viewDetails, `${WEBAPP_URL}/catalog/${slug}`)],
    ],
  };
}

/** "🛍 Barcha atirlar" — to'liq katalog sahifasi */
export function allProductsKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].catalog;
  return {
    inline_keyboard: [[webAppButton(t.allProducts, `${WEBAPP_URL}/catalog`)]],
  };
}

// ──────────────────────────────────────────────────────────────────────
// Login / buyurtmalar
// ──────────────────────────────────────────────────────────────────────

/**
 * "🌐 Kirish" — login sahifasi.
 * Token mavjud bo'lmaganda yoki sessiya tugaganda ko'rsatiladi.
 */
export function loginKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].orders;
  return {
    inline_keyboard: [[webAppButton(t.loginButton, `${WEBAPP_URL}/login`)]],
  };
}

/** "🔍 Batafsil" — bitta buyurtma tafsilotlari (order ID bo'yicha) */
export function orderDetailKeyboard(
  lang: Locale,
  orderId: string
): InlineKeyboardMarkup {
  const t = translations[lang].orders;
  return {
    inline_keyboard: [
      [webAppButton(t.detailsButton, `${WEBAPP_URL}/account/orders/${orderId}`)],
    ],
  };
}

/** "📦 Barcha buyurtmalar" — buyurtmalar ro'yxati sahifasi */
export function allOrdersKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].orders;
  return {
    inline_keyboard: [
      [webAppButton(t.allOrdersButton, `${WEBAPP_URL}/account/orders`)],
    ],
  };
}

/**
 * "📦 Buyurtmamni ko'rish" — WebApp dan `ORDER_PLACED` xabari
 * kelganidan keyin foydalanuvchiga ko'rsatiladi.
 */
export function viewOrderKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].webapp;
  return {
    inline_keyboard: [
      [webAppButton(t.viewOrder, `${WEBAPP_URL}/account/orders`)],
    ],
  };
}

// ──────────────────────────────────────────────────────────────────────
// Bog'lanish
// ──────────────────────────────────────────────────────────────────────

/**
 * "Bog'lanish" sahifasi uchun klaviatura:
 *  1-qator: 🌐 Saytga o'tish (WebApp)
 *  2-qator: 📸 Instagram   (oddiy URL havola)
 */
export function contactKeyboard(lang: Locale): InlineKeyboardMarkup {
  const t = translations[lang].contact;
  return {
    inline_keyboard: [
      [webAppButton(t.websiteButton, WEBAPP_URL)],
      [{ text: t.instagramButton, url: 'https://instagram.com/bebfragrance' }],
    ],
  };
}
