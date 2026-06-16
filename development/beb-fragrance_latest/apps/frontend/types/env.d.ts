// ============================================
// ENVIRONMENT VARIABLES TYPE DEFINITIONS
// ============================================

declare namespace NodeJS {
  interface ProcessEnv {
    // ============================================
    // APP CONFIGURATION
    // ============================================

    /** Application environment */
    NODE_ENV: 'development' | 'staging' | 'production';

    /** Application name */
    NEXT_PUBLIC_APP_NAME: string;

    /** Application description */
    NEXT_PUBLIC_APP_DESCRIPTION: string;

    /** Application URL */
    NEXT_PUBLIC_APP_URL: string;

    // ============================================
    // API CONFIGURATION
    // ============================================

    /** Backend API URL */
    NEXT_PUBLIC_API_URL: string;

    /** API timeout in milliseconds */
    NEXT_PUBLIC_API_TIMEOUT: string;

    /** API version */
    NEXT_PUBLIC_API_VERSION: string;

    // ============================================
    // AUTHENTICATION
    // ============================================

    /** NextAuth.js secret key */
    NEXTAUTH_SECRET: string;

    /** NextAuth.js URL */
    NEXTAUTH_URL: string;

    /** JWT secret for token signing */
    NEXT_PUBLIC_JWT_SECRET: string;

    /** JWT token expiration time */
    NEXT_PUBLIC_JWT_EXPIRES_IN: string;

    /** Refresh token expiration time */
    NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN: string;

    // ============================================
    // PAYMENT PROVIDERS
    // ============================================

    /** Payme merchant ID */
    NEXT_PUBLIC_PAYME_MERCHANT_ID: string;

    /** Payme merchant key */
    PAYME_MERCHANT_KEY: string;

    /** Click service ID */
    NEXT_PUBLIC_CLICK_SERVICE_ID: string;

    /** Click merchant ID */
    NEXT_PUBLIC_CLICK_MERCHANT_ID: string;

    /** Click merchant key */
    CLICK_MERCHANT_KEY: string;

    /** Click return URL */
    NEXT_PUBLIC_CLICK_RETURN_URL: string;

    // ============================================
    // STORAGE & FILE UPLOAD
    // ============================================

    /** AWS S3 bucket name */
    NEXT_PUBLIC_AWS_S3_BUCKET: string;

    /** AWS S3 region */
    NEXT_PUBLIC_AWS_S3_REGION: string;

    /** AWS S3 access key ID */
    AWS_S3_ACCESS_KEY_ID: string;

    /** AWS S3 secret access key */
    AWS_S3_SECRET_ACCESS_KEY: string;

    /** AWS S3 CDN URL */
    NEXT_PUBLIC_AWS_S3_CDN_URL: string;

    /** Max file upload size in MB */
    NEXT_PUBLIC_MAX_FILE_SIZE: string;

    // ============================================
    // THIRD-PARTY SERVICES
    // ============================================

    /** Telegram bot token */
    TELEGRAM_BOT_TOKEN: string;

    /** Telegram admin chat ID */
    TELEGRAM_ADMIN_CHAT_ID: string;

    /** SMS provider API key */
    SMS_PROVIDER_API_KEY: string;

    /** SMS provider API URL */
    SMS_PROVIDER_API_URL: string;

    /** Email service API key */
    EMAIL_SERVICE_API_KEY: string;

    /** Email service provider */
    EMAIL_SERVICE_PROVIDER: string;

    // ============================================
    // ANALYTICS & MONITORING
    // ============================================

    /** Google Analytics ID */
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;

    /** Sentry DSN */
    NEXT_PUBLIC_SENTRY_DSN: string;

    /** Sentry environment */
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: string;

    // ============================================
    // FEATURE FLAGS
    // ============================================

    /** Enable product catalog */
    NEXT_PUBLIC_FEATURE_CATALOG: string;

    /** Enable shopping cart */
    NEXT_PUBLIC_FEATURE_CART: string;

    /** Enable orders */
    NEXT_PUBLIC_FEATURE_ORDERS: string;

    /** Enable Payme payment */
    NEXT_PUBLIC_FEATURE_PAYME: string;

    /** Enable Click payment */
    NEXT_PUBLIC_FEATURE_CLICK: string;

    /** Enable cash payment */
    NEXT_PUBLIC_FEATURE_CASH: string;

    /** Enable gift boxes */
    NEXT_PUBLIC_FEATURE_GIFT_BOX: string;

    /** Enable scent profile */
    NEXT_PUBLIC_FEATURE_SCENT_PROFILE: string;

    /** Enable admin panel */
    NEXT_PUBLIC_FEATURE_ADMIN: string;

    /** Enable notifications */
    NEXT_PUBLIC_FEATURE_NOTIFICATIONS: string;

    // ============================================
    // LOCALIZATION
    // ============================================

    /** Default locale */
    NEXT_PUBLIC_DEFAULT_LOCALE: 'uz' | 'ru';

    /** Supported locales */
    NEXT_PUBLIC_SUPPORTED_LOCALES: string;

    // ============================================
    // SEO
    // ============================================

    /** Google Search Console verification */
    NEXT_PUBLIC_GOOGLE_SEARCH_VERIFICATION: string;

    /** Yandex Webmaster verification */
    NEXT_PUBLIC_YANDEX_VERIFICATION: string;

    // ============================================
    // DATABASE (Backend reference)
    // ============================================

    /** Database URL (not used in frontend, for reference) */
    DATABASE_URL?: string;

    // ============================================
    // DEVELOPMENT ONLY
    // ============================================

    /** Enable debug mode */
    NEXT_PUBLIC_DEBUG: string;

    /** Enable mock API */
    NEXT_PUBLIC_MOCK_API: string;

    /** API delay for testing */
    NEXT_PUBLIC_API_DELAY: string;
  }
}

// Validated environment variables
export interface ValidatedEnv {
  NODE_ENV: 'development' | 'staging' | 'production';
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_APP_DESCRIPTION: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_API_TIMEOUT: number;
  NEXT_PUBLIC_API_VERSION: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  NEXT_PUBLIC_JWT_SECRET: string;
  NEXT_PUBLIC_JWT_EXPIRES_IN: string;
  NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN: string;
  NEXT_PUBLIC_PAYME_MERCHANT_ID: string;
  PAYME_MERCHANT_KEY: string;
  NEXT_PUBLIC_CLICK_SERVICE_ID: string;
  NEXT_PUBLIC_CLICK_MERCHANT_ID: string;
  CLICK_MERCHANT_KEY: string;
  NEXT_PUBLIC_CLICK_RETURN_URL: string;
  NEXT_PUBLIC_AWS_S3_BUCKET: string;
  NEXT_PUBLIC_AWS_S3_REGION: string;
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
  NEXT_PUBLIC_AWS_S3_CDN_URL: string;
  NEXT_PUBLIC_MAX_FILE_SIZE: number;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_ADMIN_CHAT_ID: string;
  SMS_PROVIDER_API_KEY: string;
  SMS_PROVIDER_API_URL: string;
  EMAIL_SERVICE_API_KEY: string;
  EMAIL_SERVICE_PROVIDER: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
  NEXT_PUBLIC_SENTRY_DSN: string;
  NEXT_PUBLIC_SENTRY_ENVIRONMENT: string;
  NEXT_PUBLIC_FEATURE_CATALOG: boolean;
  NEXT_PUBLIC_FEATURE_CART: boolean;
  NEXT_PUBLIC_FEATURE_ORDERS: boolean;
  NEXT_PUBLIC_FEATURE_PAYME: boolean;
  NEXT_PUBLIC_FEATURE_CLICK: boolean;
  NEXT_PUBLIC_FEATURE_CASH: boolean;
  NEXT_PUBLIC_FEATURE_GIFT_BOX: boolean;
  NEXT_PUBLIC_FEATURE_SCENT_PROFILE: boolean;
  NEXT_PUBLIC_FEATURE_ADMIN: boolean;
  NEXT_PUBLIC_FEATURE_NOTIFICATIONS: boolean;
  NEXT_PUBLIC_DEFAULT_LOCALE: 'uz' | 'ru';
  NEXT_PUBLIC_SUPPORTED_LOCALES: string[];
  NEXT_PUBLIC_GOOGLE_SEARCH_VERIFICATION: string;
  NEXT_PUBLIC_YANDEX_VERIFICATION: string;
  NEXT_PUBLIC_DEBUG: boolean;
  NEXT_PUBLIC_MOCK_API: boolean;
  NEXT_PUBLIC_API_DELAY: number;
}

// Environment validation utility type
export type EnvironmentValidator = {
  [K in keyof ValidatedEnv]: (value: any) => ValidatedEnv[K];
};
