import { z } from 'zod';

export const createAddressSchema = z.object({
  label: z.string().max(50).optional(),
  fullName: z.string().min(2, 'To\'liq ism kamida 2 ta belgi.'),
  phone: z.string().regex(/^\+998[0-9]{9}$/, 'Telefon noto\'g\'ri formatda.'),
  region: z.string().min(2, 'Viloyat talab etiladi.'),
  district: z.string().min(2, 'Tuman talab etiladi.'),
  street: z.string().min(3, 'Ko\'cha/manzil talab etiladi.'),
  apartment: z.string().optional(),
  landmark: z.string().optional(),
  isDefault: z.boolean().optional().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();
