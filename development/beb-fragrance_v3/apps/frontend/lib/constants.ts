// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds

// App Configuration
export const APP_NAME = 'BEB Fragrance';
export const APP_DESCRIPTION = 'Zamonaviy atir dunyo';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bebfragrance.uz';

// Payment Configuration
export const PAYMENT_METHODS = {
  PAYME: 'payme',
  CLICK: 'click',
  CASH: 'cash',
} as const;

export const PAYMENT_METHOD_LABELS = {
  payme: 'Payme',
  click: 'Click',
  cash: 'Naqt Pul',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_LABELS = {
  pending: 'Kutilmoqda',
  processing: 'Qayta Ishlanmoqda',
  shipped: 'Yuborildi',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor Qilindi',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

export const PAYMENT_STATUS_LABELS = {
  pending: 'Kutilmoqda',
  paid: 'To\'landi',
  failed: 'Bekor Qilindi',
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// Scent Families
export const SCENT_FAMILIES = {
  FLORAL: 'floral',
  FRESH: 'fresh',
  WOODY: 'woody',
  ORIENTAL: 'oriental',
  CHYPRE: 'chypre',
} as const;

export const SCENT_FAMILY_LABELS = {
  floral: 'Gullali',
  fresh: 'Yangi',
  woody: 'O\'rmoniy',
  oriental: 'Sharqiy',
  chypre: 'Kipra',
} as const;

// Scent Intensity
export const SCENT_INTENSITY = {
  LIGHT: 'light',
  MODERATE: 'moderate',
  STRONG: 'strong',
} as const;

export const SCENT_INTENSITY_LABELS = {
  light: 'Engil',
  moderate: 'O\'rtacha',
  strong: 'Kuchli',
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = {
  WOMEN: 'women',
  MEN: 'men',
  UNISEX: 'unisex',
  SETS: 'sets',
} as const;

// Pagination
export const ITEMS_PER_PAGE = 12;
export const ITEMS_PER_PAGE_ORDERS = 10;

// Sorting Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW: 'price_low',
  PRICE_HIGH: 'price_high',
  POPULAR: 'popular',
  RATING: 'rating',
} as const;

export const SORT_LABELS = {
  newest: 'Eng Yangi',
  oldest: 'Eng Eski',
  price_low: 'Narx: Kam - Ko\'p',
  price_high: 'Narx: Ko\'p - Kam',
  popular: 'Mashhur',
  rating: 'Reyting',
} as const;

// Price Range
export const MIN_PRICE = 0;
export const MAX_PRICE = 5000000; // 5 million UZS

// Phone Regex
export const UZ_PHONE_REGEX = /^\+998[0-9]{9}$/;
export const RU_PHONE_REGEX = /^\+7[0-9]{10}$/;

// Delivery Time
export const DELIVERY_TIME_UZS = 50000;
export const FREE_DELIVERY_THRESHOLD = 500000; // 500k UZS

// OTP
export const OTP_LENGTH = 6;
export const OTP_TIMEOUT = 60; // 60 seconds

// Toast Duration
export const TOAST_DURATION = 3000; // 3 seconds

// Debounce Delay
export const DEBOUNCE_DELAY = 300; // 300ms

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  CART: 'cart',
  THEME: 'theme',
  LOCALE: 'locale',
  USER: 'user',
} as const;

// Feature Flags
export const FEATURES = {
  PAYME_ENABLED: true,
  CLICK_ENABLED: true,
  CASH_ENABLED: true,
  GIFT_BOX_ENABLED: true,
  SCENT_PROFILE_ENABLED: true,
  ADMIN_PANEL_ENABLED: true,
} as const;

export default {
  API_URL,
  API_TIMEOUT,
  APP_NAME,
  APP_DESCRIPTION,
  APP_URL,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS,
  PAYMENT_STATUS_LABELS,
  USER_ROLES,
  SCENT_FAMILIES,
  SCENT_FAMILY_LABELS,
  SCENT_INTENSITY,
  SCENT_INTENSITY_LABELS,
  PRODUCT_CATEGORIES,
  ITEMS_PER_PAGE,
  SORT_OPTIONS,
  SORT_LABELS,
  MIN_PRICE,
  MAX_PRICE,
  DELIVERY_TIME_UZS,
  FREE_DELIVERY_THRESHOLD,
  OTP_LENGTH,
  OTP_TIMEOUT,
  TOAST_DURATION,
  DEBOUNCE_DELAY,
  STORAGE_KEYS,
  FEATURES,
};
