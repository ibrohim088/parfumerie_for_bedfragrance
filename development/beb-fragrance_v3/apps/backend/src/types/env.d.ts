declare namespace NodeJS {
  interface ProcessEnv {
    // Server
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    API_URL: string;

    // Database
    DATABASE_URL: string;

    // Redis
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD?: string;
    REDIS_DB: string;

    // JWT
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRE: string;

    // OTP
    OTP_EXPIRE: string;
    OTP_LENGTH: string;

    // SMS
    SMS_PROVIDER: 'eskiz' | 'playmobile';
    SMS_API_KEY: string;
    SMS_FROM: string;

    // AWS S3
    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_S3_ACCESS_KEY: string;
    AWS_S3_SECRET_KEY: string;
    AWS_S3_URL: string;

    // Payment - Payme
    PAYME_MERCHANT_ID: string;
    PAYME_API_URL: string;
    PAYME_TEST_MODE: string;

    // Payment - Click
    CLICK_MERCHANT_ID: string;
    CLICK_SERVICE_ID: string;
    CLICK_API_URL: string;
    CLICK_SECRET_KEY: string;

    // Payment - Cash
    CASH_MIN_AMOUNT: string;
    CASH_MAX_AMOUNT: string;

    // Telegram Bot
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_BOT_WEBHOOK_URL: string;
    TELEGRAM_ADMIN_CHAT_ID: string;

    // Frontend URLs
    FRONTEND_URL: string;
    ADMIN_URL: string;

    // Logging
    LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';

    // Email (optional)
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASSWORD?: string;
    SMTP_FROM?: string;

    // Cors
    CORS_ORIGIN: string;
  }
}
