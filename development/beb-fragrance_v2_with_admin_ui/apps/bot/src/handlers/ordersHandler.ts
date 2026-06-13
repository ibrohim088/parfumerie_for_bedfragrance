import axios from 'axios';
import { BotContext } from '../types/context';
import { WEBAPP_URL } from '../config/bot';

interface OrderItem {
  quantity: number;
  unitPrice: number;
  product: { name: string };
  variant: { volume: number };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

function statusEmoji(status: string): string {
  const map: Record<string, string> = {
    pending: '⏳',
    confirmed: '✅',
    processing: '🔧',
    shipped: '🚚',
    delivered: '🎉',
    cancelled: '❌',
    refunded: '↩️',
  };
  return map[status] ?? '📦';
}

function statusLabel(status: string, lang: string): string {
  const uz: Record<string, string> = {
    pending: 'Kutilmoqda',
    confirmed: 'Tasdiqlandi',
    processing: 'Tayyorlanmoqda',
    shipped: 'Yetkazilmoqda',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi',
    refunded: 'Qaytarildi',
  };
  const ru: Record<string, string> = {
    pending: 'Ожидает',
    confirmed: 'Подтверждён',
    processing: 'Обрабатывается',
    shipped: 'В пути',
    delivered: 'Доставлен',
    cancelled: 'Отменён',
    refunded: 'Возвращён',
  };
  return lang === 'uz' ? (uz[status] ?? status) : (ru[status] ?? status);
}

function paymentLabel(method: string, lang: string): string {
  const uz: Record<string, string> = {
    payme: '💳 Payme',
    click: '💳 Click',
    cash: '💵 Naqt pul',
  };
  const ru: Record<string, string> = {
    payme: '💳 Payme',
    click: '💳 Click',
    cash: '💵 Наличные',
  };
  return lang === 'uz' ? (uz[method] ?? method) : (ru[method] ?? method);
}

export async function ordersHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const token = ctx.session.token;

  if (!token) {
    await ctx.reply(
      lang === 'uz'
        ? '🔐 Buyurtmalarni ko\'rish uchun avval tizimga kiring.\n\n👇 Sayt orqali kiring:'
        : '🔐 Для просмотра заказов войдите в систему.\n\n👇 Войдите через сайт:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '🌐 Kirish' : '🌐 Войти',
                web_app: { url: `${WEBAPP_URL}/login` },
              },
            ],
          ],
        },
      }
    );
    return;
  }

  try {
    await ctx.reply(lang === 'uz' ? '⏳ Yuklanmoqda...' : '⏳ Загрузка...');

    const response = await axios.get(`${WEBAPP_URL.replace('3000', '4000')}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 5 },
    });

    const orders: Order[] = response.data?.data?.data ?? [];

    if (orders.length === 0) {
      await ctx.reply(
        lang === 'uz'
          ? '📦 Hozircha buyurtmalaringiz yo\'q.\n\nXarid qilish uchun katalogni oching:'
          : '📦 У вас пока нет заказов.\n\nОткройте каталог для покупок:',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: lang === 'uz' ? '🛍 Katalog' : '🛍 Каталог',
                  web_app: { url: `${WEBAPP_URL}/catalog` },
                },
              ],
            ],
          },
        }
      );
      return;
    }

    const header =
      lang === 'uz'
        ? `📦 <b>So'nggi buyurtmalaringiz:</b>`
        : `📦 <b>Ваши последние заказы:</b>`;

    await ctx.reply(header, { parse_mode: 'HTML' });

    for (const order of orders) {
      const date = new Date(order.createdAt).toLocaleDateString(
        lang === 'uz' ? 'uz-UZ' : 'ru-RU'
      );
      const emoji = statusEmoji(order.status);

      const text =
        `${emoji} <b>#${order.orderNumber}</b>\n` +
        `📅 ${date}\n` +
        `📊 ${lang === 'uz' ? 'Holat' : 'Статус'}: ${statusLabel(order.status, lang)}\n` +
        `${paymentLabel(order.paymentMethod, lang)}\n` +
        `💰 <b>${order.total.toLocaleString()} UZS</b>`;

      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '🔍 Batafsil' : '🔍 Подробнее',
                web_app: { url: `${WEBAPP_URL}/account/orders/${order.id}` },
              },
            ],
          ],
        },
      });
    }

    await ctx.reply(
      lang === 'uz' ? '📋 Barcha buyurtmalar:' : '📋 Все заказы:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '📦 Barcha buyurtmalar' : '📦 Все заказы',
                web_app: { url: `${WEBAPP_URL}/account/orders` },
              },
            ],
          ],
        },
      }
    );
  } catch (error: any) {
    if (error?.response?.status === 401) {
      ctx.session.token = null;
      ctx.session.userId = null;
      await ctx.reply(
        lang === 'uz'
          ? '🔐 Sessiya muddati tugadi. Qayta kiring.'
          : '🔐 Сессия истекла. Войдите снова.',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: lang === 'uz' ? '🌐 Kirish' : '🌐 Войти',
                  web_app: { url: `${WEBAPP_URL}/login` },
                },
              ],
            ],
          },
        }
      );
      return;
    }

    await ctx.reply(
      lang === 'uz'
        ? '❌ Xatolik yuz berdi. Keyinroq urinib ko\'ring.'
        : '❌ Произошла ошибка. Попробуйте позже.'
    );
  }
}