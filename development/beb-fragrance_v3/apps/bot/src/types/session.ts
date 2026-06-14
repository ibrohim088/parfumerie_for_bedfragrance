/**
 * 🗂 Bot sessiyasi tipi
 *
 * `telegraf`ning `session()` middleware'i (`config/bot.ts`) har bir
 * chat uchun shu shaklda obyektni saqlaydi va `ctx.session` orqali
 * mavjud bo'ladi. Standart qiymatlar `config/bot.ts` dagi
 * `defaultSession` funksiyasida belgilangan.
 */

import type { Locale } from '../i18n/uz';

export interface BotSession {
  /** Backenddagi foydalanuvchi ID'si (avtorizatsiyadan keyin to'ldiriladi) */
  userId: string | null;

  /** Backend tomonidan berilgan JWT access token */
  token: string | null;

  /** Foydalanuvchi tanlagan til ('uz' | 'ru'), standart — 'uz' */
  language: Locale;

  /**
   * Ko'p qadamli oqimlarning joriy bosqichi (masalan, `authScene`):
   *  - 'auth_awaiting_phone'
   *  - 'auth_awaiting_otp'
   *
   * Hech qaysi oqim faol bo'lmaganda — `null`.
   */
  step: string | null;

  /**
   * Avtorizatsiya oqimida vaqtincha saqlanadigan telefon raqami
   * (OTP yuborilgandan keyin, tasdiqlanmaguncha).
   */
  phone: string | null;

  /** Foydalanuvchi administrator rolida ekanligi */
  isAdmin: boolean;
}