'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useMemo, useState } from 'react';
import styles from './UserGrowthChart.module.scss';

export interface UserGrowthPoint {
  date: string;       // ISO date, e.g. 2026-06-01
  newUsers: number;
  totalUsers: number;
}

interface Props {
  data: UserGrowthPoint[];
  loading?: boolean;
  title?: string;
}

type Range = '7d' | '30d' | '90d' | 'all';

const RANGES: { value: Range; label: string }[] = [
  { value: '7d', label: '7 kun' },
  { value: '30d', label: '30 kun' },
  { value: '90d', label: '90 kun' },
  { value: 'all', label: 'Hammasi' },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short' });
}

export function UserGrowthChart({
  data,
  loading,
  title = "Foydalanuvchilar o'sishi",
}: Props) {
  const [range, setRange] = useState<Range>('30d');

  const filtered = useMemo(() => {
    if (range === 'all') return data;
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    return data.slice(-days);
  }, [data, range]);

  const totalNew = filtered.reduce((s, d) => s + d.newUsers, 0);
  const lastTotal = filtered.length ? filtered[filtered.length - 1]!.totalUsers : 0;

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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.subtitle}>
            <span className={styles.metric}>+{totalNew}</span>
            <span className={styles.muted}>yangi · jami {lastTotal}</span>
          </div>
        </div>
        <div className={styles.rangeTabs}>
          {RANGES.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRange(r.value)}
              className={`${styles.tab} ${range === r.value ? styles.tabActive : ''}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={filtered} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="newUsersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="totalUsersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="var(--admin-text)"
              tick={{ fontSize: 12, fill: 'var(--admin-text)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--admin-border)' }}
              minTickGap={24}
            />
            <YAxis
              stroke="var(--admin-text)"
              tick={{ fontSize: 12, fill: 'var(--admin-text)' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--admin-surface)',
                border: '1px solid var(--admin-border)',
                borderRadius: 8,
                color: 'var(--admin-text)',
              }}
              labelFormatter={(label) => formatDate(String(label))}
              formatter={(value: number, name: string) => [`${value}`, name]}
            />
            <Legend wrapperStyle={{ color: 'var(--admin-text)', fontSize: 13 }} />
            <Area
              type="monotone"
              dataKey="totalUsers"
              name="Jami"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#totalUsersFill)"
            />
            <Area
              type="monotone"
              dataKey="newUsers"
              name="Yangi"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#newUsersFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
