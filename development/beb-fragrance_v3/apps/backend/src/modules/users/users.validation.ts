import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'Ism kamida 2 ta belgi.').optional(),
  lastName: z.string().min(2, 'Familiya kamida 2 ta belgi.').optional(),
  email: z.string().email('Email noto\'g\'ri formatda.').optional(),
});

export const adminUpdateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['user', 'admin']).optional(),
  isActive: z.boolean().optional(),
});

export const userListQuerySchema = z.object({
  page: z.string().optional().transform(v => (v ? parseInt(v) : 1)),
  limit: z.string().optional().transform(v => (v ? Math.min(parseInt(v), 100) : 20)),
  search: z.string().optional(),
});
