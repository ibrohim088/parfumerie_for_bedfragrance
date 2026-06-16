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
export const WEBAPP_URL = process.env.WEBAPP_URL || 'http://localhost:3000';

// API base URL
export const API_BASE_URL = env.API_BASE_URL;

/*
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
export const WEBAPP_URL = process.env.WEBAPP_URL || 'https://t.me/bebfragrance_bot';

// API base URL
export const API_BASE_URL = env.API_BASE_URL;
*/