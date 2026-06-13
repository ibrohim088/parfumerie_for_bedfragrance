import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { paginate } from '../../utils/pagination';
import type { UpdateProfileRequest, AdminUpdateUserRequest, UserListQuery } from './users.types';

const userSelect = {
  id: true, phone: true, firstName: true, lastName: true,
  email: true, role: true, isActive: true, createdAt: true, updatedAt: true,
};

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: userSelect });
  if (!user) throw new AppError(404, 'Foydalanuvchi topilmadi.');
  return user;
}

export async function updateMe(userId: string, data: UpdateProfileRequest) {
  return prisma.user.update({ where: { id: userId }, data, select: userSelect });
}

export async function deleteMe(userId: string) {
  await prisma.user.update({ where: { id: userId }, data: { isActive: false } });
}

export async function getAllUsers(query: UserListQuery) {
  const { page = 1, limit = 20, search } = query;
  const where = search
    ? {
        OR: [
          { phone: { contains: search } },
          { firstName: { contains: search, mode: 'insensitive' as const } },
          { lastName: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where, select: userSelect,
      skip: (page - 1) * limit, take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  return paginate(data, total, page, limit);
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id }, select: userSelect });
  if (!user) throw new AppError(404, 'Foydalanuvchi topilmadi.');
  return user;
}

export async function adminUpdateUser(id: string, data: AdminUpdateUserRequest) {
  await getUserById(id);
  return prisma.user.update({ where: { id }, data, select: userSelect });
}

export async function adminDeleteUser(id: string) {
  await getUserById(id);
  await prisma.user.delete({ where: { id } });
}
