import { BotContext } from '../types/context';
import { WEBAPP_URL } from '../config/bot';

export async function contactHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  const text =
    lang === 'uz'
      ? `📞 <b>BEB Fragrance — Bog'lanish</b>\n\n` +
        `📍 Manzil: Toshkent, O'zbekiston\n` +
        `📱 Telefon: <a href="tel:+998901234567">+998 90 123 45 67</a>\n` +
        `📸 Instagram: <a href="https://instagram.com/bebfragrance">@bebfragrance</a>\n` +
        `⏰ Ish vaqti: 09:00 — 21:00 (Dushanba — Shanba)\n\n` +
        `🚚 Toshkent bo'ylab yetkazib berish: <b>30 000 UZS</b>\n` +
        `⏱ Yetkazib berish vaqti: <b>1-2 kun ichida</b>`
      : `📞 <b>BEB Fragrance — Контакты</b>\n\n` +
        `📍 Адрес: Ташкент, Узбекистан\n` +
        `📱 Телефон: <a href="tel:+998901234567">+998 90 123 45 67</a>\n` +
        `📸 Instagram: <a href="https://instagram.com/bebfragrance">@bebfragrance</a>\n` +
        `⏰ Время работы: 09:00 — 21:00 (Пн — Сб)\n\n` +
        `🚚 Доставка по Ташкенту: <b>30 000 UZS</b>\n` +
        `⏱ Срок доставки: <b>1-2 дня</b>`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: lang === 'uz' ? '🌐 Saytga o\'tish' : '🌐 Перейти на сайт',
            web_app: { url: WEBAPP_URL },
          },
        ],
        [
          {
            text: '📸 Instagram',
            url: 'https://instagram.com/bebfragrance',
          },
        ],
      ],
    },
  });
}