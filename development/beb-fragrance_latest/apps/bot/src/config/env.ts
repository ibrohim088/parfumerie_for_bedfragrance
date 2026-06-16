import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Telegram
  TELEGRAM_BOT_TOKEN: z
    .string()
    .min(1, 'TELEGRAM_BOT_TOKEN is required'),

  ADMIN_CHAT_ID: z
    .string()
    .min(1, 'ADMIN_CHAT_ID is required'),

  // WebApp & API
  WEBAPP_URL: z
    .string()
    .url('WEBAPP_URL must be a valid URL')
    .default('http://localhost:3000'),

  API_BASE_URL: z
    .string()
    .url('API_BASE_URL must be a valid URL')
    .default('http://localhost:4000/api'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌  Bot — Invalid environment variables:');
  parsed.error.issues.forEach((issue) => {
    console.error(`   ${issue.path.join('.')} — ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
export type BotEnv = typeof env;