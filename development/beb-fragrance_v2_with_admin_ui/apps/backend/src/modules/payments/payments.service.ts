import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { paginate } from '../../utils/pagination';
import { PaymeProvider } from './providers/payme.provider';
import { ClickProvider } from './providers/click.provider';
import { CashProvider } from './providers/cash.provider';

const paymeProvider = new PaymeProvider();
const clickProvider = new ClickProvider();
const cashProvider = new CashProvider();

export async function createPaymePayment(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(404, 'Buyurtma topilmadi.');
  if (order.paymentMethod !== 'payme') throw new AppError(400, 'Bu buyurtma Payme orqali to\'lanmaydi.');
  return paymeProvider.createPayment(orderId, order.total);
}

export async function handlePaymeCallback(payload: Record<string, any>) {
  return paymeProvider.handleCallback(payload);
}

export async function handleClickPrepare(payload: Record<string, any>) {
  return clickProvider.handlePrepare(payload);
}

export async function handleClickComplete(payload: Record<string, any>) {
  return clickProvider.handleComplete(payload);
}

export async function confirmCash(orderId: string, adminId: string) {
  return cashProvider.confirmCash(orderId, adminId);
}

export async function rejectCash(orderId: string, adminId: string) {
  return cashProvider.rejectCash(orderId, adminId);
}

export async function getPaymentStatus(orderId: string) {
  const transaction = await prisma.transaction.findFirst({ where: { orderId } });
  if (!transaction) throw new AppError(404, 'To\'lov ma\'lumoti topilmadi.');
  return transaction;
}

export async function getPaymentHistory(page = 1, limit = 20) {
  const [data, total] = await Promise.all([
    prisma.transaction.findMany({
      include: { order: { include: { user: { select: { phone: true, firstName: true, lastName: true } } } } },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.transaction.count(),
  ]);
  return paginate(data, total, page, limit);
}

export async function refundPayment(transactionId: string) {
  const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } });
  if (!transaction) throw new AppError(404, 'Tranzaksiya topilmadi.');
  if (transaction.status !== 'paid') throw new AppError(400, 'Faqat to\'langan tranzaksiyalarni qaytarish mumkin.');

  const provider = transaction.provider;
  if (provider === 'payme') return paymeProvider.refund(transactionId, transaction.amount);
  if (provider === 'click') return clickProvider.refund(transactionId, transaction.amount);
  if (provider === 'cash') return cashProvider.refund(transactionId, transaction.amount);

  throw new AppError(400, 'Noma\'lum to\'lov provayderi.');
}
