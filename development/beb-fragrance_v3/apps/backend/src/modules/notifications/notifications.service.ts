import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import type { SendNotificationRequest } from './notifications.types';

export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

export async function markAsRead(userId: string, notificationId: string) {
  const notification = await prisma.notification.findFirst({ where: { id: notificationId, userId } });
  if (!notification) throw new AppError(404, 'Bildirishnoma topilmadi.');
  return prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } });
}

export async function markAllAsRead(userId: string) {
  await prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}

export async function sendNotification(data: SendNotificationRequest) {
  const user = await prisma.user.findUnique({ where: { id: data.userId } });
  if (!user) throw new AppError(404, 'Foydalanuvchi topilmadi.');

  return prisma.notification.create({ data });
}

// Tizim ichida ishlatish uchun (orders, payments dan chaqiriladi)
export async function createSystemNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  metadata?: Record<string, unknown>,
) {
  return prisma.notification.create({
    data: { userId, type, title, message, metadata },
  });
}
