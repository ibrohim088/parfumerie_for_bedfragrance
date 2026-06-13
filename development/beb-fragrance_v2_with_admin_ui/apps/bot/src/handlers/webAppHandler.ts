import { BotContext } from '../types/context';
import { WEBAPP_URL } from '../config/bot';

// Telegram WebApp dan kelgan ma'lumotlarni qabul qilish
export async function webAppHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  if (!ctx.message || !('web_app_data' in ctx.message)) return;

  const rawData = (ctx.message as any).web_app_data?.data;
  if (!rawData) return;

  let data: Record<string, any>;
  try {
    data = JSON.parse(rawData);
  } catch {
    return;
  }

  const { type, payload } = data;

  switch (type) {
    // WebApp dan auth tokeni keldi — sessionga saqlash
    case 'AUTH_SUCCESS': {
      ctx.session.token = payload.accessToken;
      ctx.session.userId = payload.user?.id ?? null;
      ctx.session.isAdmin = payload.user?.role === 'admin';

      const name = payload.user?.firstName ?? '';
      await ctx.reply(
        lang === 'uz'
          ? `✅ Tizimga muvaffaqiyatli kirdingiz, <b>${name}</b>!`
          : `✅ Вы успешно вошли в систему, <b>${name}</b>!`,
        { parse_mode: 'HTML' }
      );
      break;
    }

    // WebApp dan logout
    case 'LOGOUT': {
      ctx.session.token = null;
      ctx.session.userId = null;
      ctx.session.isAdmin = false;

      await ctx.reply(
        lang === 'uz'
          ? '👋 Tizimdan chiqtingiz.'
          : '👋 Вы вышли из системы.'
      );
      break;
    }

    // Buyurtma berildi
    case 'ORDER_PLACED': {
      const orderNumber = payload.orderNumber ?? '';
      const total = payload.total ?? 0;

      await ctx.reply(
        lang === 'uz'
          ? `🛒 <b>Buyurtmangiz qabul qilindi!</b>\n\n📦 #${orderNumber}\n💰 ${total.toLocaleString()} UZS\n\n⏳ Tez orada siz bilan bog'lanamiz.`
          : `🛒 <b>Ваш заказ принят!</b>\n\n📦 #${orderNumber}\n💰 ${total.toLocaleString()} UZS\n\n⏳ Мы свяжемся с вами в ближайшее время.`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: lang === 'uz' ? '📦 Buyurtmamni ko\'rish' : '📦 Посмотреть заказ',
                  web_app: { url: `${WEBAPP_URL}/account/orders` },
                },
              ],
            ],
          },
        }
      );
      break;
    }

    default:
      break;
  }
}