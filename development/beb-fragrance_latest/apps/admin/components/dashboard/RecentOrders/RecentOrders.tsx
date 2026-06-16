"use client";

import React from "react";
import styles from "./RecentOrders.module.scss";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface RecentOrder {
  id: string;
  customer: string;
  email?: string;
  total: number;
  status: OrderStatus;
  createdAt: string | Date;
}

interface RecentOrdersProps {
  orders?: RecentOrder[];
  title?: string;
  onViewAll?: () => void;
  onRowClick?: (order: RecentOrder) => void;
}

const MOCK_ORDERS: RecentOrder[] = [
  { id: "#ORD-1042", customer: "Aziza Karimova", email: "aziza@mail.com", total: 540000, status: "delivered", createdAt: "2025-06-12T10:24:00" },
  { id: "#ORD-1041", customer: "Bekzod Tursunov", email: "bek@mail.com", total: 320000, status: "shipped", createdAt: "2025-06-12T09:11:00" },
  { id: "#ORD-1040", customer: "Dilnoza Yusupova", email: "dil@mail.com", total: 875000, status: "processing", createdAt: "2025-06-11T18:02:00" },
  { id: "#ORD-1039", customer: "Sardor Olimov", email: "sar@mail.com", total: 220000, status: "pending", createdAt: "2025-06-11T14:47:00" },
  { id: "#ORD-1038", customer: "Madina Rasulova", email: "mad@mail.com", total: 1240000, status: "cancelled", createdAt: "2025-06-10T20:30:00" },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("uz-UZ").format(value) + " so'm";

const formatDate = (value: string | Date) => {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("uz-UZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Kutilmoqda",
  processing: "Tayyorlanmoqda",
  shipped: "Yuborilgan",
  delivered: "Yetkazilgan",
  cancelled: "Bekor qilingan",
};

export const RecentOrders: React.FC<RecentOrdersProps> = ({
  orders = MOCK_ORDERS,
  title = "So'nggi buyurtmalar",
  onViewAll,
  onRowClick,
}) => {
  return (
    <section className={styles.card} aria-label={title}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button type="button" className={styles.viewAll} onClick={onViewAll}>
          Barchasi
        </button>
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mijoz</th>
              <th>Sana</th>
              <th>Holat</th>
              <th className={styles.right}>Summa</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} onClick={() => onRowClick?.(o)} className={onRowClick ? styles.clickable : ""}>
                <td className={styles.mono}>{o.id}</td>
                <td>
                  <div className={styles.customer}>
                    <span className={styles.name}>{o.customer}</span>
                    {o.email && <span className={styles.email}>{o.email}</span>}
                  </div>
                </td>
                <td className={styles.muted}>{formatDate(o.createdAt)}</td>
                <td>
                  <span className={`${styles.badge} ${styles[`status_${o.status}`]}`}>
                    {STATUS_LABEL[o.status]}
                  </span>
                </td>
                <td className={`${styles.right} ${styles.amount}`}>{formatPrice(o.total)}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>Buyurtmalar topilmadi</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrders;
