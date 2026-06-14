/**
 * 🔐 Avtorizatsiya "scene"si — telefon raqami orqali OTP bilan kirish
 *
 * Foydalanuvchi botda ro'yxatdan o'tish / tizimga kirish uchun:
 *  1) Telefon raqamini ulashadi ("📱 Telefon raqamni yuborish" tugmasi orqali)
 *  2) Backend shu raqamga OTP kod yuboradi (`POST /auth/send-otp`)
 *  3) Foydalanuvchi 6 xonali OTP kodni kiritadi
 *  4) Kod tasdiqlanadi (`POST /auth/verify-otp`) va `accessToken`
 *     sessiyaga saqlanadi (`ctx.session.token`)
 *
 * Oqim bosqichlari `ctx.session.step` orqali boshqariladi:
 *  - AUTH_STEPS.AWAITING_PHONE — telefon raqami kutilmoqda
 *  - AUTH_STEPS.AWAITING_OTP   — OTP kod kutilmoqda
 *
 * Eslatma: `BotSession.step` maydoni `string | null` (yoki shu
 * qiymatlarni o'z ichiga olgan union) tipida bo'lishi kerak,
 * `BotSession.phone` esa `string | null` bo'lishi kerak
 * (`config/bot.ts` dagi `defaultSession`ga mos).
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

// ──────────────────────────────────────────────────────────────────────
// Bosqich (step) konstantalari
// ──────────────────────────────────────────────────────────────────────

export const AUTH_STEPS = {
  AWAITING_PHONE: 'auth_awaiting_phone',
  AWAITING_OTP: 'auth_awaiting_otp',
} as const;

const PHONE_REGEX = /^\+998\d{9}$/;
const OTP_REGEX = /^\d{6}$/;

/**
 * Joriy foydalanuvchi shu paytda avtorizatsiya bosqichida ekanligini
 * tekshiradi. `index.ts` / `menuHandler.ts` ichida kelgan matnli
 * xabarlarni to'g'ri handler'ga (auth scene'ga) yo'naltirish uchun
 * ishlatiladi:
 *
 * ```ts
 * if (isAuthStep(ctx)) {
 *   return handleOtpInput(ctx);
 * }
 * ```
 */
export function isAuthStep(ctx: BotContext): boolean {
  const step = ctx.session.step;
  return step === AUTH_STEPS.AWAITING_PHONE || step === AUTH_STEPS.AWAITING_OTP;
}

// ──────────────────────────────────────────────────────────────────────
// 1) Scene'ga kirish — telefon raqamini so'rash
// ──────────────────────────────────────────────────────────────────────

/**
 * Avtorizatsiya oqimini boshlaydi: foydalanuvchidan telefon raqamini
 * ulashishni so'raydi.
 *
 * Chaqiriladi: foydalanuvchi tizimga kirmagan bo'lib, "📱 Telefon orqali
 * kirish" inline tugmasini bosganda (`AUTH_START` callback) yoki
 * `/login` buyrug'i yuborilganda.
 */
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

/**
 * "📱 Telefon orqali kirish" inline tugmasi bosilganda chaqiriladi
 * (`callback_data: 'AUTH_START'`).
 */
export async function handleAuthStartCallback(ctx: BotContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCbQuery();
  }
  await enterAuthScene(ctx);
}

// ──────────────────────────────────────────────────────────────────────
// 2) Telefon raqami qabul qilindi — OTP yuborish
// ──────────────────────────────────────────────────────────────────────

/**
 * `request_contact` tugmasi orqali yuborilgan kontaktni qabul qiladi,
 * raqamni `+998XXXXXXXXX` formatiga keltiradi va backenddan OTP so'raydi.
 *
 * `ctx.message` ichida `contact` mavjud bo'lganda chaqiriladi
 * (odatda `bot.on(message('contact'), handlePhoneContact)` orqali ulanadi).
 */
export async function handlePhoneContact(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  if (!ctx.message || !('contact' in ctx.message)) return;

  const contact = ctx.message.contact;

  // Faqat foydalanuvchining o'zi yuborgan (o'ziga tegishli) raqam qabul qilinadi
  if (contact.user_id && contact.user_id !== ctx.from?.id) {
    await ctx.reply(
      lang === 'uz'
        ? "⚠️ Iltimos, faqat o'zingizning telefon raqamingizni yuboring."
        : '⚠️ Пожалуйста, отправьте только свой собственный номер телефона.',
      { reply_markup: requestPhoneKeyboard(lang) }
    );
    return;
  }

  // Raqamni "+998901234567" formatiga keltirish
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
    await axios.post(`${API_BASE_URL}/auth/send-otp`, { phone });

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
        ? '❌ OTP kodini yuborishda xatolik. Keyinroq urinib ko\'ring.'
        : '❌ Ошибка при отправке OTP-кода. Попробуйте позже.',
      { reply_markup: removeKeyboard() }
    );
    ctx.session.step = null;
    ctx.session.phone = null;
  }
}

// ──────────────────────────────────────────────────────────────────────
// 3) OTP kodi qabul qilindi — tasdiqlash
// ──────────────────────────────────────────────────────────────────────

/**
 * `ctx.session.step === AUTH_STEPS.AWAITING_OTP` bo'lganda kelgan
 * matnli xabarni OTP kod sifatida qabul qiladi va backendda tekshiradi
 * (`POST /auth/verify-otp`).
 *
 * Muvaffaqiyatli bo'lsa — `accessToken`, `userId` va `isAdmin`
 * sessiyaga saqlanadi, bosqich (`step`) va vaqtinchalik telefon
 * (`phone`) tozalanadi.
 */
export async function handleOtpInput(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const phone = ctx.session.phone;

  if (!ctx.message || !('text' in ctx.message)) return;
  const otp = ctx.message.text.trim();

  // "⬅️ Orqaga" tugmasi — oqimni bekor qilish
  if (otp === '⬅️ Orqaga' || otp === '⬅️ Назад') {
    await cancelAuthScene(ctx);
    return;
  }

  if (!phone) {
    // Sessiyada telefon saqlanmagan bo'lsa (masalan, bot qayta ishga
    // tushgan bo'lsa) — oqimni boshidan boshlash
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

    if (status === 400 || status === 401) {
      await ctx.reply(
        lang === 'uz'
          ? "❌ Kod noto'g'ri yoki muddati tugagan. Qayta urinib ko'ring yoki /start orqali qaytadan boshlang."
          : '❌ Код неверный или истёк. Попробуйте снова или начните заново через /start.'
      );
      return;
    }

    await ctx.reply(
      lang === 'uz'
        ? '❌ Tasdiqlashda xatolik yuz berdi. Keyinroq urinib ko\'ring.'
        : '❌ Произошла ошибка при подтверждении. Попробуйте позже.',
      { reply_markup: mainKeyboard(lang) }
    );
    ctx.session.step = null;
    ctx.session.phone = null;
  }
}

// ──────────────────────────────────────────────────────────────────────
// 4) Bekor qilish va kirish usulini taklif qilish
// ──────────────────────────────────────────────────────────────────────

/**
 * Avtorizatsiya oqimini bekor qiladi, sessiyadagi vaqtinchalik
 * ma'lumotlarni (`step`, `phone`) tozalaydi va asosiy menyuga qaytaradi.
 */
export async function cancelAuthScene(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  ctx.session.step = null;
  ctx.session.phone = null;

  await ctx.reply(lang === 'uz' ? '↩️ Bekor qilindi.' : '↩️ Отменено.', {
    reply_markup: mainKeyboard(lang),
  });
}

/**
 * Foydalanuvchi tizimga kirmagan bo'lsa (`ctx.session.token` yo'q),
 * kirish usulini tanlash uchun ko'rsatiladigan xabar:
 *  - 🌐 Sayt orqali kirish (WebApp login sahifasi)
 *  - 📱 Telefon raqami orqali kirish (botdagi OTP oqimi)
 *
 * `profileScene.ts` va `ordersHandler.ts` kabi joylarda
 * foydalanuvchi avtorizatsiyadan o'tmagan holatda chaqiriladi.
 */
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
        ],
      },
    }
  );
}
