/**
 * 🇷🇺 Rus tili — bot matnlari (i18n)
 *
 * `uz.ts` faylidagi `BotTranslations` strukturasiga mos keladigan
 * ruscha tarjimalar. Struktura va izohlar uchun `./uz.ts` ga qarang.
 */

import type { BotTranslations } from './uz';

export const ru: BotTranslations = {
  common: {
    loading: '⏳ Загрузка...',
    error: '❌ Произошла ошибка. Попробуйте позже.',
    currency: 'UZS',
  },

  start: {
    welcome:
      '👋 Добро пожаловать в бот <b>BEB Fragrance</b>!\n\n' +
      '🌸 Оригинальные и эксклюзивные ароматы с доставкой по Ташкенту.\n\n' +
      'Выберите один из вариантов ниже:',
    buttons: {
      catalog: '🛍 Каталог',
      website: '🌐 Перейти на сайт',
      myOrders: '📦 Мои заказы',
      profile: '👤 Профиль',
      contact: '📞 Контакты',
      langSwitch: '🌐 UZ / RU',
    },
  },

  menu: {
    languageChanged: '✅ Язык изменён: <b>Русский</b>',
    catalogIntro: '🌸 Наш каталог ароматов:',
    openCatalog: '🛍 Открыть каталог',
    websiteIntro: '🌐 Официальный сайт BEB Fragrance:',
    openWebsite: '🌐 Открыть сайт',
  },

  catalog: {
    empty: '😔 Пока нет товаров.',
    featuredHeader: '🌸 <b>Избранные ароматы:</b>\n',
    priceFrom: 'От',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии',
    viewDetails: '🛍 Подробнее',
    fullCatalogIntro: '👇 Полный каталог:',
    allProducts: '🛍 Все ароматы',
  },

  orders: {
    loginRequired:
      '🔐 Для просмотра заказов войдите в систему.\n\n👇 Войдите через сайт:',
    loginButton: '🌐 Войти',
    empty: '📦 У вас пока нет заказов.\n\nОткройте каталог для покупок:',
    catalogButton: '🛍 Каталог',
    header: '📦 <b>Ваши последние заказы:</b>',
    statusLabel: 'Статус',
    statuses: {
      pending: 'Ожидает',
      confirmed: 'Подтверждён',
      processing: 'Обрабатывается',
      shipped: 'В пути',
      delivered: 'Доставлен',
      cancelled: 'Отменён',
      refunded: 'Возвращён',
    },
    paymentMethods: {
      payme: '💳 Payme',
      click: '💳 Click',
      cash: '💵 Наличные',
    },
    detailsButton: '🔍 Подробнее',
    allOrdersIntro: '📋 Все заказы:',
    allOrdersButton: '📦 Все заказы',
    sessionExpired: '🔐 Сессия истекла. Войдите снова.',
  },

  payment: {
    noAccess: '❌ Нет доступа',
    confirming: '⏳ Подтверждается...',
    confirmed: '✅ <b>Оплата подтверждена!</b>',
    rejecting: '⏳ Отклоняется...',
    rejected: '❌ <b>Заказ отменён.</b>',
    errorPrefix: '❌ Ошибка:',
  },

  contact: {
    text:
      `📞 <b>BEB Fragrance — Контакты</b>\n\n` +
      `📍 Адрес: Ташкент, Узбекистан\n` +
      `📱 Телефон: <a href="tel:+998901234567">+998 90 123 45 67</a>\n` +
      `📸 Instagram: <a href="https://instagram.com/bebfragrance">@bebfragrance</a>\n` +
      `⏰ Время работы: 09:00 — 21:00 (Пн — Сб)\n\n` +
      `🚚 Доставка по Ташкенту: <b>30 000 UZS</b>\n` +
      `⏱ Срок доставки: <b>1-2 дня</b>`,
    websiteButton: '🌐 Перейти на сайт',
    instagramButton: '📸 Instagram',
  },

  webapp: {
    authSuccess: (name: string) =>
      `✅ Вы успешно вошли в систему, <b>${name}</b>!`,
    logout: '👋 Вы вышли из системы.',
    orderPlaced: (orderNumber: string, total: string) =>
      `🛒 <b>Ваш заказ принят!</b>\n\n` +
      `📦 #${orderNumber}\n` +
      `💰 ${total} UZS\n\n` +
      `⏳ Мы свяжемся с вами в ближайшее время.`,
    viewOrder: '📦 Посмотреть заказ',
  },
};

export default ru;