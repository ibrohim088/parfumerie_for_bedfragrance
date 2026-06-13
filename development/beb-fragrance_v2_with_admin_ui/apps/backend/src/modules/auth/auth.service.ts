import { prisma } from '../../config/database';
import { setOtp, getOtp, deleteOtp, setRefreshToken, getRefreshToken, deleteRefreshToken } from '../../config/redis';
import { sendOtpSms } from '../../config/sms';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { generateOtp } from '../../utils/otp';
import { AppError } from '../../middleware/errorHandler';
import { env } from '../../config/env';
import type { AuthResponse } from './auth.types';

export async function sendOtp(phone: string): Promise<void> {
  const otp = generateOtp();

  await setOtp(phone, otp);

  if (env.NODE_ENV === 'development') {
    console.log(`📱 OTP [${phone}]: ${otp}`);
    return;
  }

  const result = await sendOtpSms(phone, otp);
  if (!result.success) {
    throw new AppError(500, 'SMS yuborishda xato yuz berdi. Keyinroq urinib ko\'ring.');
  }
}

export async function verifyOtp(
  phone: string,
  otp: string,
  firstName?: string,
  lastName?: string,
): Promise<AuthResponse> {
  const storedOtp = await getOtp(phone);

  if (!storedOtp) {
    throw new AppError(400, 'OTP kodi muddati tugagan. Qayta so\'rang.', 'OTP_EXPIRED');
  }

  if (storedOtp !== otp) {
    throw new AppError(400, 'OTP kodi noto\'g\'ri.', 'OTP_INVALID');
  }

  await deleteOtp(phone);

  let user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    if (!firstName || !lastName) {
      throw new AppError(400, 'Yangi foydalanuvchi uchun ism va familiya talab etiladi.', 'REGISTRATION_REQUIRED');
    }
    user = await prisma.user.create({
      data: { phone, firstName, lastName, role: 'user', isActive: true },
    });
  }

  if (!user.isActive) {
    throw new AppError(403, 'Hisobingiz bloklangan.');
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id });

  await setRefreshToken(user.id, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email ?? undefined,
      role: user.role,
    },
  };
}

export async function refreshTokens(token: string): Promise<Pick<AuthResponse, 'accessToken' | 'refreshToken'>> {
  const payload = verifyRefreshToken(token);

  const stored = await getRefreshToken(payload.userId);
  if (!stored || stored !== token) {
    throw new AppError(401, 'Refresh token yaroqsiz yoki muddati tugagan.', 'REFRESH_TOKEN_INVALID');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.isActive) {
    throw new AppError(401, 'Foydalanuvchi topilmadi yoki bloklangan.');
  }

  const newAccessToken = generateAccessToken({ userId: user.id, role: user.role });
  const newRefreshToken = generateRefreshToken({ userId: user.id });

  await setRefreshToken(user.id, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logout(userId: string): Promise<void> {
  await deleteRefreshToken(userId);
}
