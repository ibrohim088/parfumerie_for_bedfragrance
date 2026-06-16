import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { connectRedis, disconnectRedis } from './config/redis';
import { logger } from './utils/logger';

import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { apiRateLimiter } from './middleware/rateLimiter';

import authRouter from './modules/auth/auth.router';
import usersRouter from './modules/users/users.router';
import productsRouter from './modules/products/products.router';
import ordersRouter from './modules/orders/orders.router';
import addressesRouter from './modules/addresses/addresses.router';
import scentProfileRouter from './modules/scent-profile/scent-profile.router';
import notificationsRouter from './modules/notifications/notifications.router';
import uploadRouter from './modules/upload/upload.router';
import paymentsRouter from './modules/payments/payments.router';
import analyticsRouter from './modules/analytics/analytics.router';

const app = express();

// ── Global middleware ──────────────────────────────────────────

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    'http://localhost:3000',  // frontend dev
    'http://localhost:3001',  // admin dev
    ...(env.NODE_ENV === 'production'
      ? ['https://bebfragrance.uz', 'https://admin.bebfragrance.uz']
      : []),
  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(apiRateLimiter);

// ── Health check ───────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    env: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API routes ─────────────────────────────────────────────────

app.use('/api/auth',          authRouter);
app.use('/api/users',         usersRouter);
app.use('/api/products',      productsRouter);
app.use('/api/orders',        ordersRouter);
app.use('/api/addresses',     addressesRouter);
app.use('/api/scent-profile', scentProfileRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/upload',        uploadRouter);
app.use('/api/payments',      paymentsRouter);
app.use('/api/analytics',     analyticsRouter);

// ── 404 va error handler ───────────────────────────────────────

app.use(notFound);
app.use(errorHandler);

// ── Server ishga tushirish ─────────────────────────────────────

async function bootstrap(): Promise<void> {
  await connectDatabase();
  await connectRedis();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server ishga tushdi`, {
      port: env.PORT,
      env: env.NODE_ENV,
      url: `http://localhost:${env.PORT}`,
    });
  });
}

async function shutdown(signal: string): Promise<void> {
  logger.info(`${signal} signali qabul qilindi. Server to'xtatilmoqda...`);
  await disconnectDatabase();
  await disconnectRedis();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', { reason });
  process.exit(1);
});

bootstrap().catch((err) => {
  logger.error('Bootstrap xatosi:', err);
  process.exit(1);
});
