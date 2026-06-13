import { Telegraf, session } from 'telegraf';
import { BotContext } from '../types/context';
import { env } from './env';

// Bot instance yaratish
export const bot = new Telegraf<BotContext>(env.TELEGRAM_BOT_TOKEN);

// Session middleware
bot.use(
  session({
    defaultSession: (): BotContext['session'] => ({
      userId: null,
      token: null,
      language: 'uz',
      step: null,
      phone: null,
      isAdmin: false,
    }),
  })
);

// Telegram WebApp URL
export const WEBAPP_URL = env.WEBAPP_URL;

// API base URL
export const API_BASE_URL = env.API_BASE_URL;