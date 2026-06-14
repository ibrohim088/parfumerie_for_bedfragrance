import { z } from 'zod';

export const createPaymePaymentSchema = z.object({
  orderId: z.string().cuid('OrderId noto\'g\'ri.'),
});

export const cashConfirmSchema = z.object({
  orderId: z.string().cuid('OrderId noto\'g\'ri.'),
});

export const refundSchema = z.object({
  reason: z.string().min(5, 'Qaytarish sababi kamida 5 ta belgi.').optional(),
});
