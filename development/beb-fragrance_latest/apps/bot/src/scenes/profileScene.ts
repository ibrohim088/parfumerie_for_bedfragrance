/**
 * 👤 Profil "scene"si
 *
 * "👤 Profil" / "👤 Профиль" tugmasi bosilganda chaqiriladi:
 *  - Agar foydalanuvchi tizimga kirmagan bo'lsa (`ctx.session.token` yo'q)
 *    — kirish usullari taklif etiladi (`authScene.promptLogin`):
 *    sayt orqali (WebApp) yoki telefon raqami orqali (OTP).
 *  - Aks holda — backenddan profil ma'lumotlari olinadi
 *    (`GET /users/me`) va ko'rsatiladi: ism, telefon, email, status,
 *    shuningdek profilni tahrirlash / manzillar / atir profili /
 *    buyurtmalar / tizimdan chiqish tugmalari bilan birga.
 */

import axios from 'axios';
import { BotContext } from '../types/context';
import { API_BASE_URL, WEBAPP_URL } from '../config/bot';
import { promptLogin } from './authScene';

// ──────────────────────────────────────────────────────────────────────
// Tiplar
// ──────────────────────────────────────────────────────────────────────

interface ProfileUser {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  role: string;
  createdAt?: string;
}

// ──────────────────────────────────────────────────────────────────────
// Asosiy handler
// ──────────────────────────────────────────────────────────────────────

/**
 * "👤 Profil" / "👤 Профиль" tugmasi bosilganda chaqiriladigan
 * asosiy handler.
 */
export async function profileHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const token = ctx.session.token;

  if (!token) {
    await promptLogin(ctx);
    return;
  }

  await ctx.reply(lang === 'uz' ? '⏳ Yuklanmoqda...' : '⏳ Загрузка...');

  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user: ProfileUser | undefined = response.data?.data;

    if (!user) {
      await ctx.reply(
        lang === 'uz'
          ? "❌ Profil ma'lumotlari topilmadi."
          : '❌ Данные профиля не найдены.'
      );
      return;
    }

    await renderProfile(ctx, user);
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // Token muddati tugagan / yaroqsiz — sessiyani tozalab,
      // qaytadan kirishni taklif qilamiz
      ctx.session.token = null;
      ctx.session.userId = null;
      ctx.session.isAdmin = false;

      await ctx.reply(
        lang === 'uz'
          ? '🔐 Sessiya muddati tugadi. Qaytadan kiring.'
          : '🔐 Сессия истекла. Войдите снова.'
      );
      await promptLogin(ctx);
      return;
    }

    await ctx.reply(
      lang === 'uz'
        ? "❌ Profil ma'lumotlarini yuklab bo'lmadi. Keyinroq urinib ko'ring."
        : '❌ Не удалось загрузить данные профиля. Попробуйте позже.'
    );
  }
}

// ──────────────────────────────────────────────────────────────────────
// Profil kartochkasi
// ──────────────────────────────────────────────────────────────────────

/**
 * Profil ma'lumotlarini matn va inline tugmalar (WebApp havolalari +
 * tizimdan chiqish) bilan chiqaradi.
 */
async function renderProfile(ctx: BotContext, user: ProfileUser): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || '—';
  const email = user.email || '—';
  const roleLabel =
    user.role === 'admin'
      ? lang === 'uz'
        ? '👑 Administrator'
        : '👑 Администратор'
      : lang === 'uz'
        ? '🙂 Mijoz'
        : '🙂 Клиент';

  const text =
    lang === 'uz'
      ? `👤 <b>Profil ma'lumotlari</b>\n\n` +
        `🪪 Ism: <b>${fullName}</b>\n` +
        `📱 Telefon: <b>${user.phone}</b>\n` +
        `📧 Email: <b>${email}</b>\n` +
        `🎖 Status: ${roleLabel}`
      : `👤 <b>Данные профиля</b>\n\n` +
        `🪪 Имя: <b>${fullName}</b>\n` +
        `📱 Телефон: <b>${user.phone}</b>\n` +
        `📧 Email: <b>${email}</b>\n` +
        `🎖 Статус: ${roleLabel}`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: lang === 'uz' ? '✏️ Tahrirlash' : '✏️ Редактировать',
            web_app: { url: `${WEBAPP_URL}/account/personal-info` },
          },
        ],
        [
          {
            text: lang === 'uz' ? '📍 Manzillarim' : '📍 Мои адреса',
            web_app: { url: `${WEBAPP_URL}/account/addresses` },
          },
          {
            text: lang === 'uz' ? '🌸 Atir profilim' : '🌸 Мой профиль аромата',
            web_app: { url: `${WEBAPP_URL}/account/scent-profile` },
          },
        ],
        [
          {
            text: lang === 'uz' ? '📦 Buyurtmalarim' : '📦 Мои заказы',
            web_app: { url: `${WEBAPP_URL}/account/orders` },
          },
        ],
        [
          {
            text: lang === 'uz' ? '🚪 Tizimdan chiqish' : '🚪 Выйти из системы',
            callback_data: 'PROFILE_LOGOUT',
          },
        ],
      ],
    },
  });
}

// ──────────────────────────────────────────────────────────────────────
// Tizimdan chiqish
// ──────────────────────────────────────────────────────────────────────

/**
 * "🚪 Tizimdan chiqish" inline tugmasi bosilganda chaqiriladi
 * (`callback_data: 'PROFILE_LOGOUT'`).
 *
 * Backendda sessiya bekor qilinadi (`POST /auth/logout`) va lokal
 * bot sessiyasidagi avtorizatsiya ma'lumotlari tozalanadi.
 */
export async function logoutHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const token = ctx.session.token;

  try {
    if (token) {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  } catch {
    // Backend bilan bog'lanishda xatolik bo'lsa ham, lokal sessiya
    // baribir tozalanadi — foydalanuvchi botda "chiqgan" holatda qoladi
  } finally {
    ctx.session.token = null;
    ctx.session.userId = null;
    ctx.session.isAdmin = false;
    ctx.session.phone = null;
    ctx.session.step = null;
  }

  if (ctx.callbackQuery) {
    await ctx.answerCbQuery(
      lang === 'uz' ? '👋 Tizimdan chiqdingiz' : '👋 Вы вышли из системы'
    );
  }

  await ctx.reply(
    lang === 'uz' ? '👋 Tizimdan chiqdingiz.' : '👋 Вы вышли из системы.'
  );
}
