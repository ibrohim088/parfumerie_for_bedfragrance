import axios from 'axios';
import { BotContext } from '../types/context';
import { API_BASE_URL, WEBAPP_URL } from '../config/bot';

interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  concentration: string;
  isFeatured: boolean;
  images: { url: string; isPrimary: boolean }[];
  variants: { volume: number; price: number; stock: number }[];
}

function formatPrice(price: number): string {
  return price.toLocaleString('uz-UZ') + ' UZS';
}

function concentrationLabel(c: string): string {
  const map: Record<string, string> = {
    parfum: 'Parfum',
    edp: 'EDP',
    edt: 'EDT',
    edc: 'EDC',
    body_mist: 'Body Mist',
  };
  return map[c] ?? c.toUpperCase();
}

export async function catalogHandler(ctx: BotContext): Promise<void> {
  const lang = ctx.session.language ?? 'uz';

  try {
    await ctx.reply(
      lang === 'uz' ? '⏳ Yuklanmoqda...' : '⏳ Загрузка...'
    );

    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { limit: 5, status: 'active', featured: 'true' },
    });

    const products: Product[] = response.data?.data?.data ?? [];

    if (products.length === 0) {
      await ctx.reply(
        lang === 'uz'
          ? '😔 Hozircha mahsulotlar yo\'q.'
          : '😔 Пока нет товаров.'
      );
      return;
    }

    const header =
      lang === 'uz'
        ? '🌸 <b>Tanlangan atirlar:</b>\n'
        : '🌸 <b>Избранные ароматы:</b>\n';

    await ctx.reply(header, { parse_mode: 'HTML' });

    for (const product of products) {
      const minPrice = Math.min(...product.variants.map((v) => v.price));
      const inStock = product.variants.some((v) => v.stock > 0);
      const volumes = product.variants
        .map((v) => `${v.volume}ml`)
        .join(' · ');

      const text =
        `🌿 <b>${product.name}</b> — ${product.brand}\n` +
        `🧪 ${concentrationLabel(product.concentration)} | ${volumes}\n` +
        `💰 ${lang === 'uz' ? 'Narxdan' : 'От'} <b>${formatPrice(minPrice)}</b>\n` +
        `${inStock ? '✅' : '❌'} ${lang === 'uz' ? (inStock ? 'Mavjud' : 'Tugagan') : (inStock ? 'В наличии' : 'Нет в наличии')}`;

      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '🛍 Batafsil ko\'rish' : '🛍 Подробнее',
                web_app: { url: `${WEBAPP_URL}/catalog/${product.slug}` },
              },
            ],
          ],
        },
      });
    }

    // To'liq katalogga havola
    await ctx.reply(
      lang === 'uz' ? '👇 To\'liq katalog:' : '👇 Полный каталог:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === 'uz' ? '🛍 Barcha atirlar' : '🛍 Все ароматы',
                web_app: { url: `${WEBAPP_URL}/catalog` },
              },
            ],
          ],
        },
      }
    );
  } catch (error) {
    await ctx.reply(
      lang === 'uz'
        ? '❌ Xatolik yuz berdi. Keyinroq urinib ko\'ring.'
        : '❌ Произошла ошибка. Попробуйте позже.'
    );
  }
}