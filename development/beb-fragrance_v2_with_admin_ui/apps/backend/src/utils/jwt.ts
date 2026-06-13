import crypto from 'crypto';

/**
 * 6 xonali raqamli OTP kodi generatsiya qiladi
 */
export function generateOtp(): string {
  const num = crypto.randomInt(100000, 999999);
  return String(num);
}
