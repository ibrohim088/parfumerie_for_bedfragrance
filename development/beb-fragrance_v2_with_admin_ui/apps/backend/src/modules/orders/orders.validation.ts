import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().cuid('ProductId noto\'g\'ri.'),
    variantId: z.string().cuid('VariantId noto\'g\'ri.'),
    quantity: z.number().int().min(1, 'Miqdor kamida 1 bo\'lishi kerak.').max(10),
  })).min(1, 'Kamida 1 ta mahsulot bo\'lishi kerak.'),
  deliveryAddressId: z.string().cuid('Manzil ID noto\'g\'ri.'),
  paymentMethod: z.enum(['payme', 'click', 'cash']),
  notes: z.string().max(500).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
});

export const orderListQuerySchema = z.object({
  page: z.string().optional().transform(v => v ? parseInt(v) : 1),
  limit: z.string().optional().transform(v => v ? Math.min(parseInt(v), 100) : 20),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  search: z.string().optional(),
});
