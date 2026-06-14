import { Order, Product } from '../types/session';

/**
 * Narxni formatlash: 250000 → "250 000 UZS"
 */
export function formatPrice(amount: number, currency = 'UZS'): string {
  return `${amount.toLocaleString('uz-UZ')} ${currency}`;
}

/**
 * Sanani formatlash: ISO string → "12.06.2026 14:30"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Buyurtma statusini o'zbek tilida chiqarish
 */
export function formatOrderStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: '⏳ Kutilmoqda',
    confirmed: '✅ Tasdiqlandi',
    processing: '🔄 Tayyorlanmoqda',
    shipped: '🚚 Yetkazilmoqda',
    delivered: '📦 Yetkazildi',
    cancelled: '❌ Bekor qilindi',
  };
  return statusMap[status] ?? status;
}

/**
 * To'lov usulini formatlash
 */
export function formatPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    payme: '💳 Payme',
    click: '💳 Click',
    cash: '💵 Naqt pul',
  };
  return methodMap[method] ?? method;
}

/**
 * To'lov statusini formatlash
 */
export function formatPaymentStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: '⏳ Kutilmoqda',
    paid: '✅ To\'langan',
    failed: '❌ Muvaffaqiyatsiz',
    refunded: '↩️ Qaytarildi',
    pending_cash: '💵 Naqt — kutilmoqda',
  };
  return statusMap[status] ?? status;
}

/**
 * Mahsulot kartochkasini formatlash (Telegram xabari uchun)
 */
export function formatProductCard(product: Product): string {
  return [
    `🌸 *${escapeMarkdown(product.name)}*`,
    product.brand ? `🏷 Brend: ${escapeMarkdown(product.brand)}` : '',
    product.volume ? `📦 Hajm: ${product.volume}ml` : '',
    `💰 Narx: ${formatPrice(product.price)}`,
    product.inStock ? '✅ Mavjud' : '❌ Mavjud emas',
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Buyurtma kartochkasini formatlash
 */
export function formatOrderCard(order: Order): string {
  const lines = [
    `📋 *Buyurtma #${order.id.slice(-6).toUpperCase()}*`,
    `📅 Sana: ${formatDate(order.createdAt)}`,
    `📊 Status: ${formatOrderStatus(order.status)}`,
    `💳 To'lov: ${formatPaymentMethod(order.paymentMethod)}`,
    `💰 Jami: ${formatPrice(order.total)}`,
  ];
  return lines.join('\n');
}

/**
 * Telegram MarkdownV2 uchun maxsus belgilarni ekranlashtirish
 */
export function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

/**
 * Telefon raqamini formatlash: 998901234567 → +998 90 123-45-67
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('998')) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10)}`;
  }
  return phone;
}