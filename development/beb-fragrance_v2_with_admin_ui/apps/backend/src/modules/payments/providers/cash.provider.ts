import { prisma } from '../../../config/database';
import { cashConfig, uzsTiyin } from '../../../config/payment';
import { AppError } from '../../../middleware/errorHandler';
import { createSystemNotification } from '../../notifications/notifications.service';
import type { IPaymentProvider, PaymentCreateResult } from './payment.provider';

export class CashProvider implements IPaymentProvider {
  async createPayment(orderId: string, amount: number): Promise<PaymentCreateResult> {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, 'Buyurtma topilmadi.');

    if (amount < cashConfig.minAmount) {
      throw new AppError(400, `Naqt to'lov uchun minimal summa: ${cashConfig.minAmount.toLocaleString()} UZS.`);
    }
    if (amount > cashConfig.maxAmount) {
      throw new AppError(400, `Naqt to'lov uchun maksimal summa: ${cashConfig.maxAmount.toLocaleString()} UZS.`);
    }

    await prisma.transaction.upsert({
      where: { orderId },
      update: { status: 'pending_cash', provider: 'cash', amount: uzsTiyin(amount) },
      create: {
        orderId,
        provider: 'cash',
        amount: uzsTiyin(amount),
        currency: 'UZS',
        status: 'pending_cash',
      },
    });

    return { data: { message: 'Naqt to\'lov tasdiqlash kutilmoqda.' } };
  }

  async confirmCash(orderId: string, adminId: string): Promise<void> {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, 'Buyurtma topilmadi.');
    if (order.paymentStatus !== 'pending_cash') {
      throw new AppError(400, 'Bu buyurtma naqt to\'lov kutish holatida emas.');
    }

    await prisma.$transaction([
      prisma.transaction.update({
        where: { orderId },
        data: { status: 'paid', paidAt: new Date(), confirmedBy: adminId },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'paid', status: 'confirmed' },
      }),
    ]);

    await createSystemNotification(
      order.userId,
      'order_paid',
      'To\'lov tasdiqlandi',
      `#${order.orderNumber} buyurtmangiz uchun naqt to\'lov admin tomonidan tasdiqlandi.`,
      { orderId: order.id },
    );
  }

  async rejectCash(orderId: string, adminId: string): Promise<void> {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, 'Buyurtma topilmadi.');

    await prisma.$transaction([
      prisma.transaction.update({
        where: { orderId },
        data: { status: 'failed', confirmedBy: adminId },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'failed', status: 'cancelled' },
      }),
    ]);
  }

  async handleCallback(payload: Record<string, any>): Promise<void> {}

  async refund(transactionId: string, amount: number): Promise<void> {
    const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } });
    if (!transaction) throw new AppError(404, 'Tranzaksiya topilmadi.');

    await prisma.$transaction([
      prisma.transaction.update({ where: { id: transactionId }, data: { status: 'refunded' } }),
      prisma.order.update({ where: { id: transaction.orderId }, data: { paymentStatus: 'refunded', status: 'refunded' } }),
    ]);
  }
}
