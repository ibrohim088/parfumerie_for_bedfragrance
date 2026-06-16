import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import type { CreateAddressRequest, UpdateAddressRequest } from './addresses.types';

export async function getAddresses(userId: string) {
  return prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function createAddress(userId: string, data: CreateAddressRequest) {
  if (data.isDefault) {
    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
  }

  const count = await prisma.address.count({ where: { userId } });
  if (count >= 10) throw new AppError(400, 'Maksimal 10 ta manzil saqlash mumkin.');

  return prisma.address.create({ data: { ...data, userId } });
}

export async function updateAddress(userId: string, addressId: string, data: UpdateAddressRequest) {
  const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
  if (!address) throw new AppError(404, 'Manzil topilmadi.');

  if (data.isDefault) {
    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
  }

  return prisma.address.update({ where: { id: addressId }, data });
}

export async function deleteAddress(userId: string, addressId: string) {
  const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
  if (!address) throw new AppError(404, 'Manzil topilmadi.');
  await prisma.address.delete({ where: { id: addressId } });
}
