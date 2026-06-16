import { prisma } from '../../config/database';
import { setOtp, getOtp, deleteOtp, setRefreshToken, getRefreshToken, deleteRefreshToken } from '../../config/redis';
import { sendOtpSms } from '../../config/sms';
import { sendOtpTelegram } from '../../config/telegram';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { generateOtp } from '../../utils/otp';
import { AppError } from '../../middleware/errorHandler';
import { env } from '../../config/env';
import type { AuthResponse } from './auth.types';

export async function sendOtp(phone: string, telegramId?: number | string): Promise<void> {
  // Agar shu raqam uchun amal qiluvchi OTP allaqachon mavjud bo'lsa (masalan,
  // duplikat so'rov tufayli), yangisini generatsiya QILMAYMIZ — aks holda
  // foydalanuvchiga ko'rsatilgan kod bilan Redis'dagi kod mos kelmay qolishi
  // mumkin. Shu mavjud kodni qayta yuboramiz.
  let otp = await getOtp(phone);
  if (!otp) {
    otp = generateOtp();
    await setOtp(phone, otp);
  }

  // 1) Avval Telegram orqali yuborishga harakat qilamiz (bot foydalanuvchining
  //    Telegram ID'sini yuborgan bo'lsa)
  if (telegramId) {
    const tgResult = await sendOtpTelegram(telegramId, otp);
    if (tgResult.success) {
      if (env.NODE_ENV === 'development') {
        console.log(`📱 OTP [${phone}] Telegram (${telegramId}) orqali yuborildi: ${otp}`);
      }
      return;
    }
    console.error(`Telegram orqali OTP yuborilmadi (${telegramId}):`, tgResult.error);
  }

  // 2) Development rejimida — agar Telegram orqali yuborilmagan bo'lsa,
  //    konsolga chiqaramiz (zaxira variant)
  if (env.NODE_ENV === 'development') {
    console.log(`📱 OTP [${phone}]: ${otp}`);
    return;
  }

  // 3) Production — SMS orqali yuborish (Eskiz.uz)
  const result = await sendOtpSms(phone, otp);
  if (!result.success) {
    throw new AppError(500, 'OTP kodini yuborishda xato yuz berdi. Keyinroq urinib ko\'ring.');
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
    if (!firstName) {
      // Admin panel kabi joylardan kelgan so'rovlarda ism-familiya yuborilmaydi —
      // bu holatda foydalanuvchi avval bot orqali ro'yxatdan o'tgan bo'lishi kerak.
      throw new AppError(404, 'Bu telefon raqami bilan ro\'yxatdan o\'tilmagan.', 'USER_NOT_FOUND');
    }
    user = await prisma.user.create({
      data: { phone, firstName, lastName: lastName ?? '', role: 'user', isActive: true },
    });
  }

  if (!user.isActive) {
    throw new AppError(403, 'Hisobingiz bloklangan.');
  }

  // 59-60 satrlar:
  const accessToken = generateAccessToken({ userId: user.id, role: user.role as 'user' | 'admin' });
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

  const newAccessToken = generateAccessToken({ userId: user.id, role: user.role as 'user' | 'admin' });
  const newRefreshToken = generateRefreshToken({ userId: user.id });

  await setRefreshToken(user.id, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logout(userId: string): Promise<void> {
  await deleteRefreshToken(userId);
}



// 91-92 satrlar:
