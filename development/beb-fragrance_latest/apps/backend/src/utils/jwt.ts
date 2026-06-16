import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// ── Tiplar ────────────────────────────────────────────────────────────────────

export interface JwtPayload {
  userId: string;
  role?: 'user' | 'admin'; // optional — refresh token da role bo'lmaydi
}
// ── OTP ───────────────────────────────────────────────────────────────────────

/**
 * 6 xonali raqamli OTP kodi generatsiya qiladi
 */
export function generateOtp(): string {
  const num = crypto.randomInt(100000, 999999);
  return String(num);
}

// ── Access Token ──────────────────────────────────────────────────────────────
export function signAccessToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? '15m') as jwt.SignOptions['expiresIn'];
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyAccessToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret) as JwtPayload;
}
export const generateAccessToken = signAccessToken;

// ── Refresh Token ─────────────────────────────────────────────────────────────
export function signRefreshToken(payload: JwtPayload): string {
  const secret = process.env.JWT_REFRESH_SECRET!;
  const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as jwt.SignOptions['expiresIn'];
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyRefreshToken(token: string): JwtPayload {
  const secret = process.env.JWT_REFRESH_SECRET!;
  return jwt.verify(token, secret) as JwtPayload;
}
export const generateRefreshToken = signRefreshToken;


