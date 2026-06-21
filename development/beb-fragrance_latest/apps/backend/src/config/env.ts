import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  // Server

  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000').transform(Number),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // AWS S3 — hozircha optional, keyin to'ldiriladi
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_BUCKET_NAME: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),

  // SMS — Eskiz.uz — hozircha optional (OTP_DELIVERY=email bo'lgani uchun)
  SMS_EMAIL: z.string().email('SMS_EMAIL must be a valid email').optional(),
  SMS_SECRET: z.string().optional(),

  // Payme
  PAYME_MERCHANT_ID: z.string().min(1, 'PAYME_MERCHANT_ID is required'),
  PAYME_SECRET_KEY: z.string().min(1, 'PAYME_SECRET_KEY is required'),
  PAYME_TEST_MODE: z.string().default('true').transform((v) => v === 'true'),

  // Click
  CLICK_MERCHANT_ID: z.string().min(1, 'CLICK_MERCHANT_ID is required'),
  CLICK_SERVICE_ID: z.string().min(1, 'CLICK_SERVICE_ID is required'),
  CLICK_SECRET_KEY: z.string().min(1, 'CLICK_SECRET_KEY is required'),

  // Payment General
  PAYMENT_CALLBACK_BASE_URL: z.string().url('PAYMENT_CALLBACK_BASE_URL must be a valid URL'),
  CASH_MIN_AMOUNT: z.string().default('10000').transform(Number),
  CASH_MAX_AMOUNT: z.string().default('10000000').transform(Number),

  // Telegram
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),
  ADMIN_CHAT_ID: z.string().min(1, 'ADMIN_CHAT_ID is required'),

  // Email (Nodemailer / SMTP) — ixtiyoriy, bo'lmasa Ethereal test ishlatiladi
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional().transform((v) => (v ? Number(v) : 587)),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),


  // OTP yetkazib berish usuli: 'sms' | 'email' | 'console'
  // development default: 'email'  |  production default: 'sms'
  OTP_DELIVERY: z.enum(['sms', 'email', 'console']).optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌  Invalid environment variables:');
  parsed.error.issues.forEach((issue) => {
    console.error(`   ${issue.path.join('.')} — ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;


/*
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000').transform(Number),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // AWS S3
  AWS_ACCESS_KEY_ID: z.string().min(1, 'AWS_ACCESS_KEY_ID is required'),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, 'AWS_SECRET_ACCESS_KEY is required'),
  AWS_BUCKET_NAME: z.string().min(1, 'AWS_BUCKET_NAME is required'),
  AWS_REGION: z.string().default('us-east-1'),

  // SMS — Eskiz.uz
  SMS_EMAIL: z.string().email('SMS_EMAIL must be a valid email'),
  SMS_SECRET: z.string().min(1, 'SMS_SECRET is required'),

  // Payme
  PAYME_MERCHANT_ID: z.string().min(1, 'PAYME_MERCHANT_ID is required'),
  PAYME_SECRET_KEY: z.string().min(1, 'PAYME_SECRET_KEY is required'),
  PAYME_TEST_MODE: z.string().default('true').transform((v) => v === 'true'),

  // Click
  CLICK_MERCHANT_ID: z.string().min(1, 'CLICK_MERCHANT_ID is required'),
  CLICK_SERVICE_ID: z.string().min(1, 'CLICK_SERVICE_ID is required'),
  CLICK_SECRET_KEY: z.string().min(1, 'CLICK_SECRET_KEY is required'),

  // Payment General
  PAYMENT_CALLBACK_BASE_URL: z.string().url('PAYMENT_CALLBACK_BASE_URL must be a valid URL'),
  CASH_MIN_AMOUNT: z.string().default('10000').transform(Number),
  CASH_MAX_AMOUNT: z.string().default('10000000').transform(Number),

  // Telegram
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),
  ADMIN_CHAT_ID: z.string().min(1, 'ADMIN_CHAT_ID is required'),

  // Email (Nodemailer / SMTP) — ixtiyoriy, bo'lmasa Ethereal test ishlatiladi
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional().transform((v) => (v ? Number(v) : 587)),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),

  // OTP yetkazib berish usuli: 'sms' | 'email' | 'console'
  // development default: 'email'  |  production default: 'sms'
  OTP_DELIVERY: z.enum(['sms', 'email', 'console']).optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌  Invalid environment variables:');
  parsed.error.issues.forEach((issue) => {
    console.error(`   ${issue.path.join('.')} — ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;

*/