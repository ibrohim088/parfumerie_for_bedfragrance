import { prisma } from '../../config/database';
import type { ScentProfileData } from './scent-profile.types';

export async function getScentProfile(userId: string) {
  return prisma.scentProfile.findUnique({ where: { userId } });
}

export async function upsertScentProfile(userId: string, data: ScentProfileData) {
  return prisma.scentProfile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
}
