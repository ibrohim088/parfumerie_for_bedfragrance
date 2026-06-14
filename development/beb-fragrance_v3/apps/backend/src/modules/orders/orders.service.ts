import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { paginate } from '../../utils/pagination';
import { notifyNewOrder, notifyCashOrderButtons } from '../../config/telegram';
import { canTransitionTo } from '../../constants/orderStatus';
import type { CreateOrderRequest, OrderListQuery } from './orders.types';

const DELIVERY_FEE = 30000;

function generateOrderNumber(): string {
  return `BEB-${Date.now().toString().slice(-8)}`;
}

const orderInclude = {
  items: { include: { product: { select: { name: true, slug: true } }, variant: true } },
  deliveryAddress: true,
  transaction: true,
  user: { select: { id: true, phone: true, firstName: true, lastName: true } },
};

export async function createOrder(userId: string, body: CreateOrderRequest) {
  const address = await prisma.address.findFirst({ where: { id: body.deliveryAddressId, userId } });
  if (!address) throw new AppError(404, 'Manzil topilmadi.');

  const variants = await prisma.productVariant.findMany({
    where: { id: { in: body.items.map(i => i.variantId) } },
    include: { product: true },
  });

  for (const item of body.items) {
    const variant = variants.find(v => v.id === item.variantId);
    if (!variant) throw new AppError(404, `Variant topilmadi: ${item.variantId}`);
    if (variant.stock < item.quantity) throw new AppError(400, `${variant.product.name} — stokda yetarli mahsulot yo'q.`);
  }

  const subtotal = body.items.reduce((sum, item) => {
    const variant = variants.find(v => v.id === item.variantId)!;
    return sum + variant.price * item.quantity;
  }, 0);

  const paymentStatus = body.paymentMethod === 'cash' ? 'pending_cash' : 'pending';

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        deliveryAddressId: body.deliveryAddressId,
        paymentMethod: body.paymentMethod,
        paymentStatus,
        status: 'pending',
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total: subtotal + DELIVERY_FEE,
        notes: body.notes,
        items: {
          create: body.items.map(item => {
            const variant = variants.find(v => v.id === item.variantId)!;
            return {
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              unitPrice: variant.price,
              totalPrice: variant.price * item.quantity,
            };
          }),
        },
      },
      include: orderInclude,
    });

    for (const item of body.items) {
      const variant = variants.find(v => v.id === item.variantId)!;
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return newOrder;
  });

  await notifyNewOrder({
    id: order.id,
    orderNumber: order.orderNumber,
    total: order.total,
    paymentMethod: order.paymentMethod,
    customerPhone: order.user.phone,
  });

  if (body.paymentMethod === 'cash') {
    await notifyCashOrderButtons({
      id: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      customerPhone: order.user.phone,
    });
  }

  return order;
}

export async function getMyOrders(userId: string, query: OrderListQuery) {
  const { page = 1, limit = 20, status } = query;
  const where: any = { userId };
  if (status) where.status = status;

  const [data, total] = await Promise.all([
    prisma.order.findMany({ where, include: orderInclude, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.order.count({ where }),
  ]);

  return paginate(data, total, page, limit);
}

export async function getMyOrderById(userId: string, orderId: string) {
  const order = await prisma.order.findFirst({ where: { id: orderId, userId }, include: orderInclude });
  if (!order) throw new AppError(404, 'Buyurtma topilmadi.');
  return order;
}

export async function cancelOrder(userId: string, orderId: string) {
  const order = await prisma.order.findFirst({ where: { id: orderId, userId } });
  if (!order) throw new AppError(404, 'Buyurtma topilmadi.');
  if (!canTransitionTo(order.status as any, 'cancelled')) {
    throw new AppError(400, `"${order.status}" holatidagi buyurtmani bekor qilib bo'lmaydi.`);
  }
  return prisma.order.update({ where: { id: orderId }, data: { status: 'cancelled' }, include: orderInclude });
}

export async function getAllOrders(query: OrderListQuery) {
  const { page = 1, limit = 20, status, paymentStatus, search } = query;
  const where: any = {};
  if (status) where.status = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;
  if (search) where.OR = [
    { orderNumber: { contains: search } },
    { user: { phone: { contains: search } } },
  ];

  const [data, total] = await Promise.all([
    prisma.order.findMany({ where, include: orderInclude, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.order.count({ where }),
  ]);

  return paginate(data, total, page, limit);
}

export async function updateOrderStatus(orderId: string, status: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(404, 'Buyurtma topilmadi.');
  if (!canTransitionTo(order.status as any, status as any)) {
    throw new AppError(400, `"${order.status}" → "${status}" o'tish mumkin emas.`);
  }
  return prisma.order.update({ where: { id: orderId }, data: { status }, include: orderInclude });
}
