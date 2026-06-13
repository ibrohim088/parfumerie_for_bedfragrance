'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import styles from './PaymentMethodChart.module.scss';

export interface PaymentMethodData {
  method: 'payme' | 'click' | 'cash' | string;
  label: string;
  count: number;
  amount: number;
}

interface Props {
  data: PaymentMethodData[];
  loading?: boolean;
  title?: string;
  metric?: 'count' | 'amount';
}

const METHOD_COLORS: Record<string, string> = {
  payme: '#00c4b4',
  click: '#0098f0',
  cash: '#22c55e',
};

const FALLBACK = '#7c3aed';

function formatUZS(value: number) {
  return new Intl.NumberFormat('uz-UZ').format(value) + " so'm";
}

export default function PaymentMethodChart({
  data,
  loading,
  title = "To'lov usullari bo'yicha",
  metric = 'amount',
}: Props) {
  if (loading) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.empty}>Ma'lumot yo'q</div>
      </div>
    );
  }

  const totalAmount = data.reduce((s, d) => s + d.amount, 0);
  const totalCount = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.stats}>
          <span>{totalCount} ta to'lov</span>
          <span className={styles.dot}>•</span>
          <span>{formatUZS(totalAmount)}</span>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="var(--admin-text)"
              tick={{ fontSize: 12, fill: 'var(--admin-text)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--admin-border)' }}
            />
            <YAxis
              stroke="var(--admin-text)"
              tick={{ fontSize: 12, fill: 'var(--admin-text)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                metric === 'amount'
                  ? new Intl.NumberFormat('uz-UZ', { notation: 'compact' }).format(v)
                  : String(v)
              }
            />
            <Tooltip
              cursor={{ fill: 'rgba(124,58,237,0.08)' }}
              contentStyle={{
                background: 'var(--admin-surface)',
                border: '1px solid var(--admin-border)',
                borderRadius: 8,
                color: 'var(--admin-text)',
              }}
              formatter={(value: number) =>
                metric === 'amount' ? formatUZS(value) : `${value} ta`
              }
            />
            <Legend wrapperStyle={{ color: 'var(--admin-text)', fontSize: 13 }} />
            <Bar
              dataKey={metric}
              name={metric === 'amount' ? "Summa (so'm)" : 'Soni'}
              radius={[8, 8, 0, 0]}
              maxBarSize={64}
            >
              {data.map((entry) => (
                <Cell key={entry.method} fill={METHOD_COLORS[entry.method] || FALLBACK} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
