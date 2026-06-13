/**
 * 🇺🇿 O'zbek tili — bot matnlari (i18n)
 *
 * Bu fayl botning barcha handler'larida (start, menu, catalog, orders,
 * payment, contact, webApp) ishlatiladigan matnlarni bir joyga
 * markazlashtiradi. Hozircha handler'lar ichida matnlar
 * `lang === 'uz' ? '...' : '...'` ko'rinishida hardcode qilingan —
 * kelajakda ularni shu `uz` / `ru` obyektlariga almashtirish mumkin.
 *
 * `OrderStatusKey` va `PaymentMethodKey` tiplari `@beb/shared`
 * paketidagi `OrderStatus` / `PaymentMethod` tiplariga mos keladi.
 */

// ──────────────────────────────────────────────────────────────────────
// Yordamchi tiplar
// ──────────────────────────────────────────────────────────────────────

export type Locale = 'uz' | 'ru';

export type OrderStatusKey =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethodKey = 'payme' | 'click' | 'cash';

// ──────────────────────────────────────────────────────────────────────
// Tarjima strukturasi
// ──────────────────────────────────────────────────────────────────────

export interface BotTranslations {
  common: {
    /** Har qanday so'rovdan oldin ko'rsatiladigan "yuklanmoqda" matni */
    loading: string;
    /** Umumiy kutilmagan xatolik matni */
    error: string;
    /** Valyuta belgisi */
    currency: string;
  };

  start: {
    /** /start buyrug'iga javob — asosiy salomlashish matni */
    welcome: string;
    /** Pastki klaviatura tugmalari */
    buttons: {
      catalog: string;
      website: string;
      myOrders: string;
      profile: string;
      contact: string;
      langSwitch: string;
    };
  };

  menu: {
    /** Til muvaffaqiyatli almashtirilgandan keyingi tasdiq matni */
    languageChanged: string;
    /** "Katalog" tugmasi bosilganda chiqadigan sarlavha */
    catalogIntro: string;
    /** Katalogni WebApp orqali ochish tugmasi matni */
    openCatalog: string;
    /** "Saytga o'tish" tugmasi bosilganda chiqadigan sarlavha */
    websiteIntro: string;
    /** Saytni WebApp orqali ochish tugmasi matni */
    openWebsite: string;
  };

  catalog: {
    /** Mahsulotlar topilmaganda ko'rsatiladigan matn */
    empty: string;
    /** Tanlangan (featured) mahsulotlar ro'yxati sarlavhasi */
    featuredHeader: string;
    /** "Narxdan ..." prefiksi (minimal narx oldidan) */
    priceFrom: string;
    /** Mahsulot mavjud bo'lganda */
    inStock: string;
    /** Mahsulot tugaganda */
    outOfStock: string;
    /** "Batafsil ko'rish" tugmasi (WebApp) */
    viewDetails: string;
    /** To'liq katalog havolasi oldidan chiqadigan matn */
    fullCatalogIntro: string;
    /** "Barcha atirlar" tugmasi (WebApp) */
    allProducts: string;
  };

  orders: {
    /** Foydalanuvchi tizimga kirmagan bo'lsa ko'rsatiladigan matn */
    loginRequired: string;
    /** "Kirish" tugmasi (WebApp login sahifasi) */
    loginButton: string;
    /** Buyurtmalar ro'yxati bo'sh bo'lganda */
    empty: string;
    /** "Katalog" tugmasi (bo'sh buyurtmalar ro'yxatida) */
    catalogButton: string;
    /** Buyurtmalar ro'yxati sarlavhasi */
    header: string;
    /** "Holat" so'zi (buyurtma statusi oldidan) */
    statusLabel: string;
    /** Buyurtma statuslari tarjimasi */
    statuses: Record<OrderStatusKey, string>;
    /** To'lov usullari tarjimasi */
    paymentMethods: Record<PaymentMethodKey, string>;
    /** "Batafsil" tugmasi (bitta buyurtma uchun) */
    detailsButton: string;
    /** Barcha buyurtmalar havolasi oldidan chiqadigan matn */
    allOrdersIntro: string;
    /** "Barcha buyurtmalar" tugmasi (WebApp) */
    allOrdersButton: string;
    /** Sessiya muddati tugaganda chiqadigan matn (401 xatolik) */
    sessionExpired: string;
  };

  payment: {
    /** Admin bo'lmagan foydalanuvchi naqt to'lovni boshqarmoqchi bo'lsa */
    noAccess: string;
    /** Naqt to'lov tasdiqlanayotgan vaqtdagi javob (callback) */
    confirming: string;
    /** Naqt to'lov muvaffaqiyatli tasdiqlangandan keyin */
    confirmed: string;
    /** Naqt to'lov rad etilayotgan vaqtdagi javob (callback) */
    rejecting: string;
    /** Naqt to'lov / buyurtma rad etilgandan keyin */
    rejected: string;
    /** Admin API xatosi chiqqanda matn prefiksi: "❌ Xatolik: ..." */
    errorPrefix: string;
  };

  contact: {
    /** "Bog'lanish" sahifasining to'liq matni (manzil, telefon va h.k.) */
    text: string;
    /** Saytga o'tish tugmasi (WebApp) */
    websiteButton: string;
    /** Instagram havolasi tugmasi */
    instagramButton: string;
  };

  webapp: {
    /** WebApp orqali muvaffaqiyatli login bo'lganda (AUTH_SUCCESS) */
    authSuccess: (name: string) => string;
    /** WebApp orqali tizimdan chiqilganda (LOGOUT) */
    logout: string;
    /** Yangi buyurtma berilganda (ORDER_PLACED) */
    orderPlaced: (orderNumber: string, total: string) => string;
    /** "Buyurtmamni ko'rish" tugmasi (WebApp) */
    viewOrder: string;
  };
}

// ──────────────────────────────────────────────────────────────────────
// O'zbekcha tarjimalar
// ──────────────────────────────────────────────────────────────────────

export const uz: BotTranslations = {
  common: {
    loading: '⏳ Yuklanmoqda...',
    error: "❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.",
    currency: 'UZS',
  },

  start: {
    welcome:
      "👋 Assalomu alaykum! <b>BEB Fragrance</b> botiga xush kelibsiz!\n\n" +
      '🌸 Original va eksklyuziv atirlar — Toshkent yetkazib berish bilan.\n\n' +
      'Quyidagi tugmalardan birini tanlang:',
    buttons: {
      catalog: '🛍 Katalog',
      website: "🌐 Saytga o'tish",
      myOrders: '📦 Buyurtmalarim',
      profile: '👤 Profil',
      contact: "📞 Bog'lanish",
      langSwitch: '🌐 UZ / RU',
    },
  },

  menu: {
    languageChanged: "✅ Til o'zgartirildi: <b>O'zbekcha</b>",
    catalogIntro: '🌸 Bizning atirlar katalogi:',
    openCatalog: '🛍 Katalogni ochish',
    websiteIntro: '🌐 BEB Fragrance rasmiy sayti:',
    openWebsite: '🌐 Saytni ochish',
  },

  catalog: {
    empty: "😔 Hozircha mahsulotlar yo'q.",
    featuredHeader: '🌸 <b>Tanlangan atirlar:</b>\n',
    priceFrom: 'Narxdan',
    inStock: 'Mavjud',
    outOfStock: 'Tugagan',
    viewDetails: "🛍 Batafsil ko'rish",
    fullCatalogIntro: "👇 To'liq katalog:",
    allProducts: '🛍 Barcha atirlar',
  },

  orders: {
    loginRequired:
      "🔐 Buyurtmalarni ko'rish uchun avval tizimga kiring.\n\n👇 Sayt orqali kiring:",
    loginButton: '🌐 Kirish',
    empty:
      "📦 Hozircha buyurtmalaringiz yo'q.\n\nXarid qilish uchun katalogni oching:",
    catalogButton: '🛍 Katalog',
    header: "📦 <b>So'nggi buyurtmalaringiz:</b>",
    statusLabel: 'Holat',
    statuses: {
      pending: 'Kutilmoqda',
      confirmed: 'Tasdiqlandi',
      processing: 'Tayyorlanmoqda',
      shipped: 'Yetkazilmoqda',
      delivered: 'Yetkazildi',
      cancelled: 'Bekor qilindi',
      refunded: 'Qaytarildi',
    },
    paymentMethods: {
      payme: '💳 Payme',
      click: '💳 Click',
      cash: '💵 Naqt pul',
    },
    detailsButton: '🔍 Batafsil',
    allOrdersIntro: '📋 Barcha buyurtmalar:',
    allOrdersButton: '📦 Barcha buyurtmalar',
    sessionExpired: '🔐 Sessiya muddati tugadi. Qayta kiring.',
  },

  payment: {
    noAccess: "❌ Ruxsat yo'q",
    confirming: '⏳ Tasdiqlanmoqda...',
    confirmed: "✅ <b>To'lov tasdiqlandi!</b>",
    rejecting: '⏳ Rad etilmoqda...',
    rejected: '❌ <b>Buyurtma bekor qilindi.</b>',
    errorPrefix: '❌ Xatolik:',
  },

  contact: {
    text:
      `📞 <b>BEB Fragrance — Bog'lanish</b>\n\n` +
      `📍 Manzil: Toshkent, O'zbekiston\n` +
      `📱 Telefon: <a href="tel:+998901234567">+998 90 123 45 67</a>\n` +
      `📸 Instagram: <a href="https://instagram.com/bebfragrance">@bebfragrance</a>\n` +
      `⏰ Ish vaqti: 09:00 — 21:00 (Dushanba — Shanba)\n\n` +
      `🚚 Toshkent bo'ylab yetkazib berish: <b>30 000 UZS</b>\n` +
      `⏱ Yetkazib berish vaqti: <b>1-2 kun ichida</b>`,
    websiteButton: "🌐 Saytga o'tish",
    instagramButton: '📸 Instagram',
  },

  webapp: {
    authSuccess: (name: string) =>
      `✅ Tizimga muvaffaqiyatli kirdingiz, <b>${name}</b>!`,
    logout: '👋 Tizimdan chiqtingiz.',
    orderPlaced: (orderNumber: string, total: string) =>
      `🛒 <b>Buyurtmangiz qabul qilindi!</b>\n\n` +
      `📦 #${orderNumber}\n` +
      `💰 ${total} UZS\n\n` +
      `⏳ Tez orada siz bilan bog'lanamiz.`,
    viewOrder: "📦 Buyurtmamni ko'rish",
  },
};

export default uz;