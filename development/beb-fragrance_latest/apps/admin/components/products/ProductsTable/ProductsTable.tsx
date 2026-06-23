'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './ProductsTable.module.scss';
import { AdminBadge } from '@/components/ui/AdminBadge/AdminBadge';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { Star } from 'lucide-react'

export type ProductRow = {
  id: string;
  name: string;
  brand: string;
  concentration: string;
  status: string;
  isFeatured?: boolean;
  images?: Array<{ url: string; isPrimary?: boolean; alt?: string }>;
  variants?: Array<{ id?: string; volume: number; price: number; stock: number }>;
  createdAt?: string;
};

interface ProductsTableProps {
  products: ProductRow[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  active: 'success',
  inactive: 'default',
  out_of_stock: 'warning',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Faol',
  inactive: 'Nofaol',
  out_of_stock: "Stokda yo'q",
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

function priceRange(variants?: ProductRow['variants']): string {
  if (!variants || variants.length === 0) return '—';
  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`;
}

function totalStock(variants?: ProductRow['variants']): number {
  if (!variants) return 0;
  return variants.reduce((sum, v) => sum + (v.stock ?? 0), 0);
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <p>Mahsulotlar topilmadi</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mahsulot</th>
            <th>Brend</th>
            <th>Kontsentratsiya</th>
            <th>Variantlar</th>
            <th className={styles.right}>Narx</th>
            <th className={styles.right}>Stok</th>
            <th>Status</th>
            <th className={styles.right}>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const primary =
              p.images?.find((i) => i.isPrimary) ?? p.images?.[0];
            const stock = totalStock(p.variants);
            const isConfirming = confirmId === p.id;

            return (
              <tr key={p.id} className={styles.row}>
                <td>
                  <div className={styles.productCell}>
                    <div className={styles.thumb}>
                      {primary?.url ? (
                        <Image
                          src={primary.url}
                          alt={primary.alt ?? p.name}
                          width={48}
                          height={48}
                          unoptimized
                        />
                      ) : (
                        <div className={styles.thumbPlaceholder}>—</div>
                      )}
                    </div>
                    <div className={styles.productInfo}>
                      <span className={styles.name}>
                        {p.name}
                        {p.isFeatured && <span className={styles.featured}><Star size={16} fill="currentColor" /></span>}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{p.brand}</td>
                <td className={styles.upper}>{p.concentration}</td>
                <td className={styles.muted}>
                  {p.variants?.length ?? 0} ta
                </td>
                <td className={`${styles.right} ${styles.bold}`}>
                  {priceRange(p.variants)}
                </td>
                <td className={`${styles.right} ${stock === 0 ? styles.danger : ''}`}>
                  {stock}
                </td>
                <td>
                  <AdminBadge variant={STATUS_VARIANT[p.status] ?? 'default'}>
                    {STATUS_LABEL[p.status] ?? p.status}
                  </AdminBadge>
                </td>
                <td className={styles.right}>
                  <div className={styles.actions}>
                    {isConfirming ? (
                      <>
                        <AdminButton
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            onDelete(p.id);
                            setConfirmId(null);
                          }}
                        >
                          Tasdiqlash
                        </AdminButton>
                        <AdminButton
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmId(null)}
                        >
                          Bekor
                        </AdminButton>
                      </>
                    ) : (
                      <>
                        <AdminButton
                          size="sm"
                          variant="ghost"
                          onClick={() => onEdit(p.id)}
                        >
                          Tahrirlash
                        </AdminButton>
                        <AdminButton
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmId(p.id)}
                        >
                          O'chirish
                        </AdminButton>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
