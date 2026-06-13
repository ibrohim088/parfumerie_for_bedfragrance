import { z } from 'zod';

const variantSchema = z.object({
  volume: z.number().int().positive('Hajm musbat son bo\'lishi kerak.'),
  price: z.number().int().positive('Narx musbat son bo\'lishi kerak.'),
  stock: z.number().int().min(0, 'Stok manfiy bo\'lishi mumkin emas.'),
});

const imageSchema = z.object({
  url: z.string().url('Rasm URL noto\'g\'ri.'),
  alt: z.string().optional(),
  isPrimary: z.boolean(),
});

export const createProductSchema = z.object({
  name: z.string().min(2, 'Mahsulot nomi kamida 2 ta belgi.'),
  brand: z.string().min(1, 'Brend talab etiladi.'),
  description: z.string().min(10, 'Tavsif kamida 10 ta belgi.'),
  concentration: z.enum(['parfum', 'edp', 'edt', 'edc', 'body_mist']),
  topNotes: z.array(z.string()).min(1, 'Kamida 1 ta yuqori nota.'),
  middleNotes: z.array(z.string()).min(1, 'Kamida 1 ta o\'rta nota.'),
  baseNotes: z.array(z.string()).min(1, 'Kamida 1 ta pastki nota.'),
  images: z.array(imageSchema).min(1, 'Kamida 1 ta rasm talab etiladi.'),
  variants: z.array(variantSchema).min(1, 'Kamida 1 ta variant talab etiladi.'),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(['active', 'inactive', 'out_of_stock']).optional().default('active'),
});

export const updateProductSchema = createProductSchema.partial();

export const productListQuerySchema = z.object({
  page: z.string().optional().transform(v => (v ? parseInt(v) : 1)),
  limit: z.string().optional().transform(v => (v ? Math.min(parseInt(v), 50) : 20)),
  search: z.string().optional(),
  brand: z.string().optional(),
  concentration: z.string().optional(),
  status: z.string().optional(),
  featured: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});
