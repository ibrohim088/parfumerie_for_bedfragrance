// apps/admin/lib/utils.ts
export const formatPrice = (amount: number | null | undefined): string => {
  if (amount == null) return '0 UZS';
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
};

export const formatDate = (dateString: string | Date, withTime = true): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  
  return date.toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });
};

export const getInitials = (firstName?: string, lastName?: string): string => {
  const f = firstName?.trim()[0] || '';
  const l = lastName?.trim()[0] || '';
  return (f + l).toUpperCase();
};

export const truncate = (text: string, maxLength: number = 80): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};