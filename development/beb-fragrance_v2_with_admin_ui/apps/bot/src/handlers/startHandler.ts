import { BotContext } from '../types/context';
import { WEBAPP_URL } from '../config/bot';

export async function startHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  const text =
    lang === 'uz'
      ? `👋 Assalomu alaykum! <b>BEB Fragrance</b> botiga xush kelibsiz!\n\n🌸 Original va eksklyuziv atirlar — Toshkent yetkazib berish bilan.\n\nQuyidagi tugmalardan birini tanlang:`
      : `👋 Добро пожаловать в бот <b>BEB Fragrance</b>!\n\n🌸 Оригинальные и эксклюзивные ароматы с доставкой по Ташкенту.\n\nВыберите один из вариантов ниже:`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: {
      keyboard: [
        [
          { text: lang === 'uz' ? '🛍 Katalog' : '🛍 Каталог' },
          { text: lang === 'uz' ? '🌐 Saytga o\'tish' : '🌐 Перейти на сайт' },
        ],
        [
          { text: lang === 'uz' ? '📦 Buyurtmalarim' : '📦 Мои заказы' },
          { text: lang === 'uz' ? '👤 Profil' : '👤 Профиль' },
        ],
        [
          { text: lang === 'uz' ? '📞 Bog\'lanish' : '📞 Контакты' },
          { text: lang === 'uz' ? '🌐 UZ / RU' : '🌐 UZ / RU' },
        ],
      ],
      resize_keyboard: true,
      persistent: true,
    },
  });
}