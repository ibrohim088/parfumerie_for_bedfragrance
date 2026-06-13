import { prisma } from '../../../config/database';
import { uzsTiyin } from '../../../config/payment';
import { AppError } from '../../../middleware/errorHandler';
import { createSystemNotification } from '../../notifications/notifications.service';
import type { IPaymentProvider, PaymentCreateResult } from './payment.provider';

export class ClickProvider implements IPaymentProvider {
  async createPayment(orderId: string, amount: number): Promise<PaymentCreateResult> {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, 'Buyurtma topilmadi.');

    const amountUzs = amount;
    const transaction = await prisma.transaction.upsert({
      where: { orderId },
      update: { status: 'pending', provider: 'click', amount: uzsTiyin(amountUzs) },
      create: {
        orderId,
        provider: 'click',
        amount: uzsTiyin(amountUzs),
        currency: 'UZS',
        status: 'pending',
      },
    });

    const { clickConfig } = await import('../../../config/payment');
    const paymentUrl =
      `https://my.click.uz/services/pay?service_id=${clickConfig.serviceId}` +
      `&merchant_id=${clickConfig.merchantId}` +
      `&amount=${amountUzs}` +
      `&transaction_param=${orderId}` +
      `&return_url=${process.env.FRONTEND_URL}/orders/${orderId}`;

    return { paymentUrl, transactionId: transaction.id };
  }

  async handlePrepare(payload: Record<string, any>): Promise<Record<string, unknown>> {
    const orderId = payload.merchant_trans_id;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return { error: -5, error_note: 'Buyurtma topilmadi.' };
    if (order.paymentStatus === 'paid') return { error: -4, error_note: 'Allaqachon to\'langan.' };

    const transaction = await prisma.transaction.findFirst({ where: { orderId } });
    if (!transaction) return { error: -6, error_note: 'Tranzaksiya topilmadi.' };

    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { externalId: payload.click_trans_id },
    });

    return {
      click_trans_id: payload.click_trans_id,
      merchant_trans_id: orderId,
      merchant_prepare_id: transaction.id,
      error: 0,
      error_note: 'Success',
    };
  }

  async handleComplete(payload: Record<string, any>): Promise<Record<string, unknown>> {
    const transactionId = payload.merchant_prepare_id;
    const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } });
    if (!transaction) return { error: -6, error_note: 'Tranzaksiya topilmadi.' };

    if (payload.error < 0) {
      await prisma.$transaction([
        prisma.transaction.update({ where: { id: transactionId }, data: { status: 'failed' } }),
        prisma.order.update({ where: { id: transaction.orderId }, data: { paymentStatus: 'failed', status: 'cancelled' } }),
      ]);
      return { error: 0, error_note: 'Success' };
    }

    await prisma.$transaction([
      prisma.transaction.update({ where: { id: transactionId }, data: { status: 'paid', paidAt: new Date() } }),
      prisma.order.update({ where: { id: transaction.orderId }, data: { paymentStatus: 'paid', status: 'confirmed' } }),
    ]);

    const order = await prisma.order.findUnique({ where: { id: transaction.orderId } });
    if (order) {
      await createSystemNotification(
        order.userId,
        'order_paid',
        'To\'lov qabul qilindi',
        `#${order.orderNumber} buyurtmangiz uchun to\'lov muvaffaqiyatli amalga oshirildi.`,
        { orderId: order.id },
      );
    }

    return {
      click_trans_id: payload.click_trans_id,
      merchant_trans_id: transaction.orderId,
      merchant_confirm_id: transactionId,
      error: 0,
      error_note: 'Success',
    };
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
