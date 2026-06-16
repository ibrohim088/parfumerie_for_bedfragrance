
import { message } from 'telegraf/filters';
import { bot } from './config/bot';
import { env } from './config/env';
import { logger } from './utils/logger';


import { startHandler } from './handlers/startHandler';
import { menuHandler } from './handlers/menuHandler';
import { catalogHandler } from './handlers/catalogHandler';
import { ordersHandler } from './handlers/ordersHandler';
import { contactHandler } from './handlers/contactHandler';
import {
  cashConfirmHandler,
  cashRejectHandler,
  CASH_CONFIRM_ACTION,
  CASH_REJECT_ACTION,
} from './handlers/paymentHandler';
import { webAppHandler } from './handlers/webAppHandler';


import {
  enterAuthScene,
  handleAuthStartCallback,
  handlePhoneContact,
  handleOtpInput,
  isAuthStep,
} from './scenes/authScene';


import { profileHandler, logoutHandler } from './scenes/profileScene';


bot.start(startHandler);


bot.command('login', enterAuthScene);


bot.use((ctx, next) => {
  if (ctx.message && 'text' in ctx.message && isAuthStep(ctx)) {
    return handleOtpInput(ctx);
  }
  return next();
});

bot.action('AUTH_START', handleAuthStartCallback);

bot.on(message('contact'), handlePhoneContact);


bot.action('PROFILE_LOGOUT', logoutHandler);


bot.action(new RegExp(`^${CASH_CONFIRM_ACTION}:`), cashConfirmHandler);
bot.action(new RegExp(`^${CASH_REJECT_ACTION}:`), cashRejectHandler);

bot.hears('🛍 Katalog', catalogHandler);
bot.hears('📦 Buyurtmalarim', ordersHandler);
bot.hears('👤 Profil', profileHandler);
bot.hears('📞 Bog\'lanish', contactHandler);
bot.hears('🌐 Saytga o\'tish', menuHandler);
bot.hears('🌐 UZ / RU', menuHandler);

bot.hears('🛍 Каталог', catalogHandler);
bot.hears('📦 Мои заказы', ordersHandler);
bot.hears('👤 Профиль', profileHandler);
bot.hears('📞 Контакты', contactHandler);
bot.hears('🌐 Перейти на сайт', menuHandler);

bot.on(message('web_app_data'), webAppHandler);

// Global xatoliklarni ushlab qolish: bitta handlerdagi xatolik
// (masalan, BUTTON_URL_INVALID) butun botni yiqitmasligi kerak.
bot.catch((err, ctx) => {
  logger.error(`Handlerda xatolik yuz berdi [update ${ctx.update.update_id}]:`, err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot
  .launch()
  .then(() => {
    logger.info(`🤖 BEB Fragrance bot ishga tushdi — NODE_ENV=${env.NODE_ENV}`);
  })
  .catch((err) => {
    logger.error('Bot ishga tushmadi:', err);
    process.exit(1);
  });
