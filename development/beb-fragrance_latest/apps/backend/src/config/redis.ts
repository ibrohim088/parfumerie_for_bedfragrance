import { createClient, RedisClientType } from 'redis';
import { env } from './env';

type RedisClient = RedisClientType<any, any, any>;

let redisClient: RedisClient;

export function getRedisClient(): RedisClient {
  if (!redisClient) {
    redisClient = createClient({ url: env.REDIS_URL }) as RedisClient;

    redisClient.on('error', (err: Error) => {
      console.error('❌  Redis error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅  Redis connected');
    });

    redisClient.on('reconnecting', () => {
      console.warn('⚠️   Redis reconnecting...');
    });
  }

  return redisClient;
}

export async function connectRedis(): Promise<void> {
  const client = getRedisClient();
  if (!client.isOpen) {
    await client.connect();
  }
}

export async function disconnectRedis(): Promise<void> {
  const client = getRedisClient();
  if (client.isOpen) {
    await client.quit();
    console.log('🔌  Redis disconnected');
  }
}

// ── OTP helpers ────────────────────────────────────────────────

const OTP_PREFIX = 'otp:';
const OTP_TTL_SECONDS = 120; // 2 daqiqa

export async function setOtp(phone: string, otp: string): Promise<void> {
  const client = getRedisClient();
  await client.set(`${OTP_PREFIX}${phone}`, otp, { EX: OTP_TTL_SECONDS });
}

export async function getOtp(phone: string): Promise<string | null> {
  const client = getRedisClient();
  return client.get(`${OTP_PREFIX}${phone}`);
}

export async function deleteOtp(phone: string): Promise<void> {
  const client = getRedisClient();
  await client.del(`${OTP_PREFIX}${phone}`);
}

// ── Refresh token helpers ──────────────────────────────────────

const REFRESH_PREFIX = 'refresh:';
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 kun

export async function setRefreshToken(
  userId: string,
  token: string,
): Promise<void> {
  const client = getRedisClient();
  await client.set(`${REFRESH_PREFIX}${userId}`, token, {
    EX: REFRESH_TTL_SECONDS,
  });
}

export async function getRefreshToken(userId: string): Promise<string | null> {
  const client = getRedisClient();
  return client.get(`${REFRESH_PREFIX}${userId}`);
}

export async function deleteRefreshToken(userId: string): Promise<void> {
  const client = getRedisClient();
  await client.del(`${REFRESH_PREFIX}${userId}`);
}

/*
import { createClient, RedisClientType } from 'redis';
import { env } from './env';

let redisClient: RedisClientType;

export function getRedisClient(): RedisClientType {
  if (!redisClient) {
    redisClient = createClient({ url: env.REDIS_URL }) as RedisClientType;

    redisClient.on('error', (err) => {
      console.error('❌  Redis error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅  Redis connected');
    });

    redisClient.on('reconnecting', () => {
      console.warn('⚠️   Redis reconnecting...');
    });
  }

  return redisClient;
}

export async function connectRedis(): Promise<void> {
  const client = getRedisClient();
  if (!client.isOpen) {
    await client.connect();
  }
}

export async function disconnectRedis(): Promise<void> {
  const client = getRedisClient();
  if (client.isOpen) {
    await client.quit();
    console.log('🔌  Redis disconnected');
  }
}

// ── OTP helpers ────────────────────────────────────────────────

const OTP_PREFIX = 'otp:';
const OTP_TTL_SECONDS = 120; // 2 daqiqa

export async function setOtp(phone: string, otp: string): Promise<void> {
  const client = getRedisClient();
  await client.set(`${OTP_PREFIX}${phone}`, otp, { EX: OTP_TTL_SECONDS });
}

export async function getOtp(phone: string): Promise<string | null> {
  const client = getRedisClient();
  return client.get(`${OTP_PREFIX}${phone}`);
}

export async function deleteOtp(phone: string): Promise<void> {
  const client = getRedisClient();
  await client.del(`${OTP_PREFIX}${phone}`);
}

// ── Refresh token helpers ──────────────────────────────────────

const REFRESH_PREFIX = 'refresh:';
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 kun

export async function setRefreshToken(
  userId: string,
  token: string,
): Promise<void> {
  const client = getRedisClient();
  await client.set(`${REFRESH_PREFIX}${userId}`, token, {
    EX: REFRESH_TTL_SECONDS,
  });
}

export async function getRefreshToken(userId: string): Promise<string | null> {
  const client = getRedisClient();
  return client.get(`${REFRESH_PREFIX}${userId}`);
}

export async function deleteRefreshToken(userId: string): Promise<void> {
  const client = getRedisClient();
  await client.del(`${REFRESH_PREFIX}${userId}`);
}
*/