import { BotContext } from '../types/context';
import { WEBAPP_URL } from '../config/bot';

export async function menuHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';
  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';

  // Til almashtirish
  if (text === '🌐 UZ / RU') {
    ctx.session.language = lang === 'uz' ? 'ru' : 'uz';
    const newLang = ctx.session.language;
    const confirmText =
      newLang === 'uz'
        ? '✅ Til o\'zgartirildi: <b>O\'zbekcha</b>'
        : '✅ Язык изменён: <b>Русский</b>';
    await ctx.reply(confirmText, { parse_mode: 'HTML' });
    return;
  }

  // Katalog
  if (text === '🛍 Katalog' || text === '🛍 Каталог') {
    await ctx.reply(
      lang === 'uz'
        ? '🌸 Bizning atirlar katalogi:'
        : '🌸 Наш каталог ароматов:',
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '🛍 Katalogni ochish' : '🛍 Открыть каталог',
                web_app: { url: `${WEBAPP_URL}/catalog` },
              },
            ],
          ],
        },
      }
    );
    return;
  }

  // Saytga o'tish
  if (text === '🌐 Saytga o\'tish' || text === '🌐 Перейти на сайт') {
    await ctx.reply(
      lang === 'uz'
        ? '🌐 BEB Fragrance rasmiy sayti:'
        : '🌐 Официальный сайт BEB Fragrance:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '🌐 Saytni ochish' : '🌐 Открыть сайт',
                web_app: { url: WEBAPP_URL },
              },
            ],
          ],
        },
      }
    );
    return;
  }
}