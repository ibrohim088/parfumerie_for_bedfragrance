import { bot } from './config/bot';
import { env } from './config/env';
import { logger } from './utils/logger';

// Handlers
import { startHandler } from './handlers/startHandler';
import { menuHandler } from './handlers/menuHandler';
import { catalogHandler } from './handlers/catalogHandler';
import { ordersHandler } from './handlers/ordersHandler';
import { contactHandler } from './handlers/contactHandler';
import { paymentHandler } from './handlers/paymentHandler';
import { webAppHandler } from './handlers/webAppHandler';

// Scenes
import { authScene } from './scenes/authScene';
import { profileScene } from './scenes/profileScene';

// /start komandasi
bot.start(startHandler);

// Scenes
bot.use(authScene);
bot.use(profileScene);

// Menyu tugmalari — UZ
bot.hears('🛍 Katalog', catalogHandler);
bot.hears('📦 Buyurtmalarim', ordersHandler);
bot.hears('👤 Profil', (ctx) => profileScene.enter()(ctx));
bot.hears('📞 Bog\'lanish', contactHandler);
bot.hears('🌐 Saytga o\'tish', webAppHandler);
bot.hears('🌐 UZ / RU', menuHandler.switchLanguage);

// Menyu tugmalari — RU
bot.hears('🛍 Каталог', catalogHandler);
bot.hears('📦 Мои заказы', ordersHandler);
bot.hears('👤 Профиль', (ctx) => profileScene.enter()(ctx));
bot.hears('📞 Контакты', contactHandler);
bot.hears('🌐 Перейти на сайт', webAppHandler);

// To'lov callback
bot.on('pre_checkout_query', paymentHandler.preCheckout);
bot.on('successful_payment', paymentHandler.successfulPayment);

// WebApp data
bot.on('web_app_data', webAppHandler.handleData);

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Botni ishga tushirish
bot.launch().then(() => {
  logger.info(`🤖 BEB Fragrance bot ishga tushdi — NODE_ENV=${env.NODE_ENV}`);
}).catch((err) => {
  logger.error('Bot ishga tushmadi:', err);
  process.exit(1);
});