'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './OrdersByStatusChart.module.scss';

export interface OrderStatusData {
  status: string;
  label: string;
  count: number;
}

interface Props {
  data: OrderStatusData[];
  loading?: boolean;
  title?: string;
}

const COLORS: Record<string, string> = {
  pending: '#f59e0b',
  paid: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#22c55e',
  cancelled: '#ef4444',
  refunded: '#64748b',
};

const FALLBACK_COLORS = ['#7c3aed', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#64748b'];

export function OrdersByStatusChart({
  data,
  loading,
  title = "Buyurtmalar statusi bo'yicha",
}: Props) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  if (loading) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (!data.length || total === 0) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.empty}>Ma'lumot yo'q</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.total}>Jami: {total}</span>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.status}
                  fill={COLORS[entry.status] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'var(--admin-surface)',
                border: '1px solid var(--admin-border)',
                borderRadius: 8,
                color: 'var(--admin-text)',
              }}
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ color: 'var(--admin-text)', fontSize: 13 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
