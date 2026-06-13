import { prisma } from '../../../config/database';
import { paymeConfig, uzsTiyin } from '../../../config/payment';
import { AppError } from '../../../middleware/errorHandler';
import { createSystemNotification } from '../../notifications/notifications.service';
import type { IPaymentProvider, PaymentCreateResult } from './payment.provider';

// Payme JSON-RPC metodlari
const PAYME_METHODS = {
  CHECK_PERFORM: 'CheckPerformTransaction',
  CREATE: 'CreateTransaction',
  PERFORM: 'PerformTransaction',
  CANCEL: 'CancelTransaction',
  CHECK_TX: 'CheckTransaction',
  GET_STATEMENT: 'GetStatement',
} as const;

export class PaymeProvider implements IPaymentProvider {
  async createPayment(orderId: string, amount: number): Promise<PaymentCreateResult> {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, 'Buyurtma topilmadi.');

    const amountTiyin = uzsTiyin(amount);
    const params = `m=${paymeConfig.merchantId};ac.order_id=${orderId};a=${amountTiyin}`;
    const encoded = Buffer.from(params).toString('base64');
    const paymentUrl = `${paymeConfig.apiUrl}/${encoded}`;

    await prisma.transaction.upsert({
      where: { orderId },
      update: { status: 'pending', provider: 'payme', amount: amountTiyin },
      create: {
        orderId,
        provider: 'payme',
        amount: amountTiyin,
        currency: 'UZS',
        status: 'pending',
      },
    });

    return { paymentUrl };
  }

  async handleCallback(payload: Record<string, any>): Promise<void> {
    const { method, params, id } = payload;

    switch (method) {
      case PAYME_METHODS.CHECK_PERFORM:
        await this.checkPerform(params);
        break;
      case PAYME_METHODS.CREATE:
        await this.createTransaction(params);
        break;
      case PAYME_METHODS.PERFORM:
        await this.performTransaction(params);
        break;
      case PAYME_METHODS.CANCEL:
        await this.cancelTransaction(params);
        break;
      default:
        throw new AppError(400, `Noma'lum metod: ${method}`);
    }
  }

  private async checkPerform(params: any) {
    const orderId = params?.account?.order_id;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw { code: -31050, message: 'Buyurtma topilmadi.' };
    if (order.paymentStatus === 'paid') throw { code: -31050, message: 'Allaqachon to\'langan.' };
  }

  private async createTransaction(params: any) {
    const orderId = params?.account?.order_id;
    const externalId = params?.id;

    await prisma.transaction.update({
      where: { orderId },
      data: { externalId, status: 'pending' },
    });
  }

  private async performTransaction(params: any) {
    const externalId = params?.id;

    const transaction = await prisma.transaction.findFirst({ where: { externalId } });
    if (!transaction) throw { code: -31003, message: 'Tranzaksiya topilmadi.' };

    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'paid', paidAt: new Date() },
      }),
      prisma.order.update({
        where: { id: transaction.orderId },
        data: { paymentStatus: 'paid', status: 'confirmed' },
      }),
    ]);

    const order = await prisma.order.findUnique({
      where: { id: transaction.orderId },
      include: { user: true },
    });

    if (order) {
      await createSystemNotification(
        order.userId,
        'order_paid',
        'To\'lov qabul qilindi',
        `#${order.orderNumber} buyurtmangiz uchun to\'lov muvaffaqiyatli amalga oshirildi.`,
        { orderId: order.id },
      );
    }
  }

  private async cancelTransaction(params: any) {
    const externalId = params?.id;

    const transaction = await prisma.transaction.findFirst({ where: { externalId } });
    if (!transaction) throw { code: -31003, message: 'Tranzaksiya topilmadi.' };

    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'failed' },
      }),
      prisma.order.update({
        where: { id: transaction.orderId },
        data: { paymentStatus: 'failed', status: 'cancelled' },
      }),
    ]);
  }

  async refund(transactionId: string, amount: number): Promise<void> {
    const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } });
    if (!transaction) throw new AppError(404, 'Tranzaksiya topilmadi.');

    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'refunded' },
      }),
      prisma.order.update({
        where: { id: transaction.orderId },
        data: { paymentStatus: 'refunded', status: 'refunded' },
      }),
    ]);
  }
}
