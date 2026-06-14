import { z } from 'zod';

// Uzbek phone validation
const UzPhoneRegex = /^\+998[0-9]{9}$/;
// Russian phone validation
const RuPhoneRegex = /^\+7[0-9]{10}$/;

export const phoneSchema = z
  .string()
  .min(1, 'Telefon raqami talab qilinadi')
  .refine(
    (phone) => UzPhoneRegex.test(phone) || RuPhoneRegex.test(phone),
    'Noto\'g\'ri telefon raqami'
  );

export const emailSchema = z
  .string()
  .min(1, 'Email talab qilinadi')
  .email('Noto\'g\'ri email');

export const passwordSchema = z
  .string()
  .min(6, 'Parol kamida 6 ta belgi bo\'lishi kerak')
  .min(1, 'Parol talab qilinadi');

export const otpSchema = z
  .string()
  .length(6, 'OTP 6 ta raqamdan iborat bo\'lishi kerak')
  .regex(/^\d+$/, 'OTP faqat raqamlardan iborat bo\'lishi kerak');

export const nameSchema = z
  .string()
  .min(2, 'Ism kamida 2 ta belgi bo\'lishi kerak')
  .min(1, 'Ism talab qilinadi');

// Login validation
export const loginSchema = z.object({
  phone: phoneSchema,
  otp: otpSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register validation
export const registerSchema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Parollar mos kelmaydi',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Address validation
export const addressSchema = z.object({
  title: nameSchema,
  address: z.string().min(5, 'Manzil juda qisqa'),
  phone: phoneSchema,
  city: z.string().min(1, 'Shahar talab qilinadi'),
  region: z.string().min(1, 'Viloyat talab qilinadi'),
  zipCode: z.string().optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;

// Profile validation
export const profileSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  birthDate: z.string().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

// Password change validation
export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Parollar mos kelmaydi',
  path: ['confirmPassword'],
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// Scent profile validation
export const scentProfileSchema = z.object({
  favoriteScents: z.array(z.string()).min(1, 'Kamida bir atir tanlang'),
  scentFamily: z.enum(['floral', 'fresh', 'woody', 'oriental', 'chypre']),
  intensity: z.enum(['light', 'moderate', 'strong']),
  notes: z.string().optional(),
});

export type ScentProfileInput = z.infer<typeof scentProfileSchema>;

// Checkout validation
export const checkoutSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(5, 'Manzil juda qisqa'),
  city: z.string().min(1, 'Shahar talab qilinadi'),
  region: z.string().min(1, 'Viloyat talab qilinadi'),
  zipCode: z.string().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(['payme', 'click', 'cash']),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// Validation helper
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; error?: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'Validation error' };
  }
}

export default {
  loginSchema,
  registerSchema,
  addressSchema,
  profileSchema,
  changePasswordSchema,
  scentProfileSchema,
  checkoutSchema,
  validateInput,
};
