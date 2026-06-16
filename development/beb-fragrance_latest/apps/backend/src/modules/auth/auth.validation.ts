import { z } from 'zod';

export const sendOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^\+998[0-9]{9}$/, 'Telefon raqam noto\'g\'ri. Masalan: +998901234567'),
  telegramId: z.union([z.string(), z.number()]).optional(),
});

export const verifyOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^\+998[0-9]{9}$/, 'Telefon raqam noto\'g\'ri.'),
  otp: z
    .string()
    .length(6, 'OTP kodi 6 ta raqamdan iborat bo\'lishi kerak.')
    .regex(/^\d{6}$/, 'OTP kodi faqat raqamlardan iborat bo\'lishi kerak.'),
  firstName: z.string().min(2, 'Ism kamida 2 ta belgi bo\'lishi kerak.').optional(),
  lastName: z.string().min(2, 'Familiya kamida 2 ta belgi bo\'lishi kerak.').optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token talab etiladi.'),
});
