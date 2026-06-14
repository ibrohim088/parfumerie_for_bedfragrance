"use client";

import React, { useMemo } from "react";
import styles from "./TopProducts.module.scss";

export interface TopProduct {
  id: string;
  name: string;
  category?: string;
  imageUrl?: string;
  sold: number;
  revenue: number;
}

interface TopProductsProps {
  products?: TopProduct[];
  title?: string;
  limit?: number;
  onViewAll?: () => void;
  onItemClick?: (product: TopProduct) => void;
}

const MOCK_PRODUCTS: TopProduct[] = [
  { id: "p-01", name: "Bleu de Chanel EDP", category: "Erkaklar uchun", sold: 142, revenue: 71000000 },
  { id: "p-02", name: "Dior Sauvage Elixir",  category: "Erkaklar uchun", sold: 128, revenue: 64000000 },
  { id: "p-03", name: "YSL Libre Intense",    category: "Ayollar uchun",  sold: 110, revenue: 49500000 },
  { id: "p-04", name: "Tom Ford Oud Wood",    category: "Unisex",         sold: 88,  revenue: 88000000 },
  { id: "p-05", name: "Lattafa Khamrah",      category: "Unisex",         sold: 76,  revenue: 22800000 },
];

const formatPrice = (v: number) => new Intl.NumberFormat("uz-UZ").format(v) + " so'm";

export const TopProducts: React.FC<TopProductsProps> = ({
  products = MOCK_PRODUCTS,
  title = "Eng ko'p sotilgan",
  limit = 5,
  onViewAll,
  onItemClick,
}) => {
  const items = useMemo(
    () => [...products].sort((a, b) => b.sold - a.sold).slice(0, limit),
    [products, limit],
  );

  const maxSold = Math.max(...items.map((p) => p.sold), 1);

  return (
    <section className={styles.card} aria-label={title}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button type="button" className={styles.viewAll} onClick={onViewAll}>
          Barchasi
        </button>
      </header>

      <ul className={styles.list}>
        {items.map((p, idx) => {
          const pct = (p.sold / maxSold) * 100;
          return (
            <li
              key={p.id}
              className={`${styles.item} ${onItemClick ? styles.clickable : ""}`}
              onClick={() => onItemClick?.(p)}
            >
              <div className={styles.rank}>{idx + 1}</div>

              <div className={styles.media}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} loading="lazy" />
                ) : (
                  <div className={styles.placeholder} aria-hidden>
                    {p.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className={styles.info}>
                <div className={styles.row}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.revenue}>{formatPrice(p.revenue)}</span>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.category}>{p.category ?? "—"}</span>
                  <span className={styles.sold}>{p.sold} ta sotilgan</span>
                </div>

                <div className={styles.barTrack} aria-hidden>
                  <div className={styles.barFill} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </li>
          );
        })}

        {items.length === 0 && (
          <li className={styles.empty}>Mahsulotlar topilmadi</li>
        )}
      </ul>
    </section>
  );
};

export default TopProducts;
