/**
 * 🗂 Sessiya xizmati — `ctx.session` bilan ishlash uchun yordamchilar
 *
 * `apps/bot` da sessiya `telegraf`ning `session()` middleware'i orqali
 * saqlanadi (`config/bot.ts`). Standart sessiya qiymatlari:
 *
 * ```ts
 * {
 *   userId: null,
 *   token: null,
 *   language: 'uz',
 *   step: null,
 *   phone: null,
 *   isAdmin: false,
 * }
 * ```
 *
 * Bu modul handler/scene'lar ichida sessiya bilan bog'liq takrorlanuvchi
 * mantiqni (til, avtorizatsiya holati, bosqich boshqaruvi va h.k.)
 * bir joyga jamlaydi.
 */

import { BotContext } from '../types/context';
import type { Locale } from '../i18n/uz';

// ──────────────────────────────────────────────────────────────────────
// Standart sessiya qiymatlari
// ──────────────────────────────────────────────────────────────────────

/**
 * `config/bot.ts` dagi `defaultSession`ga mos keladigan standart
 * qiymatlar. Sessiyani to'liq tozalash (`resetSession`) uchun
 * ishlatiladi.
 */
export const DEFAULT_SESSION: BotContext['session'] = {
  userId: null,
  token: null,
  language: 'uz',
  step: null,
  phone: null,
  isAdmin: false,
};

// ──────────────────────────────────────────────────────────────────────
// Til (language)
// ──────────────────────────────────────────────────────────────────────

/** Foydalanuvchining joriy tilini qaytaradi (standart: `'uz'`). */
export function getLanguage(ctx: BotContext): Locale {
  return ctx.session.language ?? 'uz';
}

/** Foydalanuvchi tilini o'rnatadi. */
export function setLanguage(ctx: BotContext, lang: Locale): void {
  ctx.session.language = lang;
}

/**
 * Tilni `uz` ↔ `ru` orasida almashtiradi va yangi tilni qaytaradi.
 *
 * `menuHandler.ts` dagi "🌐 UZ / RU" tugmasi bosilganda ishlatiladi.
 */
export function toggleLanguage(ctx: BotContext): Locale {
  const next: Locale = getLanguage(ctx) === 'uz' ? 'ru' : 'uz';
  setLanguage(ctx, next);
  return next;
}

// ──────────────────────────────────────────────────────────────────────
// Avtorizatsiya holati
// ──────────────────────────────────────────────────────────────────────

/** Foydalanuvchi tizimga kirgan-kirmaganini tekshiradi (`token` mavjudligi). */
export function isAuthenticated(ctx: BotContext): boolean {
  return Boolean(ctx.session.token);
}

/** Foydalanuvchi administrator ekanini tekshiradi. */
export function isAdmin(ctx: BotContext): boolean {
  return Boolean(ctx.session.isAdmin);
}

/** Sessiyadagi backend foydalanuvchi ID'sini qaytaradi (bo'lmasa `null`). */
export function getUserId(ctx: BotContext): string | null {
  return ctx.session.userId ?? null;
}

/** Sessiyadagi access token'ni qaytaradi (bo'lmasa `null`). */
export function getToken(ctx: BotContext): string | null {
  return ctx.session.token ?? null;
}

/**
 * Muvaffaqiyatli avtorizatsiyadan keyin (`/auth/verify-otp` yoki
 * `AUTH_SUCCESS` WebApp eventi) sessiyaga avtorizatsiya
 * ma'lumotlarini yozadi.
 */
export function setAuthData(
  ctx: BotContext,
  data: { token: string | null; userId: string | null; isAdmin?: boolean }
): void {
  ctx.session.token = data.token;
  ctx.session.userId = data.userId;
  ctx.session.isAdmin = data.isAdmin ?? false;
}

/**
 * Avtorizatsiya bilan bog'liq sessiya maydonlarini tozalaydi
 * (`token`, `userId`, `isAdmin`, `phone`, `step`).
 *
 * `LOGOUT` WebApp eventi, 401 javobi yoki "🚪 Tizimdan chiqish"
 * tugmasi bosilganda ishlatiladi. Til (`language`) saqlanib qoladi.
 */
export function clearAuth(ctx: BotContext): void {
  ctx.session.token = null;
  ctx.session.userId = null;
  ctx.session.isAdmin = false;
  ctx.session.phone = null;
  ctx.session.step = null;
}

/**
 * Butun sessiyani standart holatga qaytaradi (til ham qayta
 * `'uz'`ga o'rnatiladi). Odatda `/start` buyrug'ini qayta yuborish
 * yoki test/diagnostika maqsadlarida ishlatiladi.
 */
export function resetSession(ctx: BotContext): void {
  ctx.session = { ...DEFAULT_SESSION };
}

// ──────────────────────────────────────────────────────────────────────
// Bosqich (step) boshqaruvi — ko'p qadamli oqimlar (masalan, authScene) uchun
// ──────────────────────────────────────────────────────────────────────

/** Joriy bosqichni (`ctx.session.step`) qaytaradi. */
export function getStep(ctx: BotContext): string | null {
  return ctx.session.step ?? null;
}

/** Bosqichni o'rnatadi. */
export function setStep(ctx: BotContext, step: string | null): void {
  ctx.session.step = step;
}

/** Bosqichni tozalaydi (`null`ga o'rnatadi). */
export function clearStep(ctx: BotContext): void {
  ctx.session.step = null;
}

/** Joriy bosqich berilgan qiymatlardan biriga teng ekanini tekshiradi. */
export function isStep(ctx: BotContext, ...steps: string[]): boolean {
  const current = ctx.session.step;
  return current != null && steps.includes(current);
}

// ──────────────────────────────────────────────────────────────────────
// Telefon raqami (avtorizatsiya oqimi uchun vaqtinchalik saqlash)
// ──────────────────────────────────────────────────────────────────────

/** Avtorizatsiya oqimida vaqtincha saqlangan telefon raqamini qaytaradi. */
export function getPendingPhone(ctx: BotContext): string | null {
  return ctx.session.phone ?? null;
}

/** Avtorizatsiya oqimi uchun telefon raqamini sessiyaga yozadi. */
export function setPendingPhone(ctx: BotContext, phone: string | null): void {
  ctx.session.phone = phone;
}
