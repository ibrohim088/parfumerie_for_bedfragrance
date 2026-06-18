"use client";

import React, { useMemo, useState } from "react";
import styles from "./RevenueChart.module.scss";

export interface RevenuePoint {
  label: string;     // "Yan", "Fev", ...
  revenue: number;   // so'mda
}

interface RevenueChartProps {
  data?: RevenuePoint[];
  title?: string;
  currency?: string;
}

const MOCK_DATA: RevenuePoint[] = [
  { label: "Yan", revenue: 4200000 },
  { label: "Fev", revenue: 5100000 },
  { label: "Mar", revenue: 4800000 },
  { label: "Apr", revenue: 6300000 },
  { label: "May", revenue: 7250000 },
  { label: "Iyn", revenue: 8120000 },
  { label: "Iyl", revenue: 7600000 },
  { label: "Avg", revenue: 9100000 },
  { label: "Sen", revenue: 8800000 },
  { label: "Okt", revenue: 9700000 },
  { label: "Noy", revenue: 10250000 },
  { label: "Dek", revenue: 11800000 },
];

const RANGES = [
  { key: "6m", label: "6 oy", months: 6 },
  { key: "12m", label: "12 oy", months: 12 },
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

const formatShort = (v: number) => {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(0) + "K";
  return String(v);
};

const formatFull = (v: number) => new Intl.NumberFormat("uz-UZ").format(v);

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data = MOCK_DATA,
  title = "Daromad statistikasi",
  currency = "so'm",
}) => {
  const [range, setRange] = useState<RangeKey>("12m");
  const [hover, setHover] = useState<number | null>(null);

  const visible = useMemo(() => {
    const months = RANGES.find((r) => r.key === range)?.months ?? data.length;
    // return data.slice(-months);
    return Array.isArray(data) ? data.slice(-months) : [];
  }, [data, range]);

  const { max, total, growth } = useMemo(() => {
    const max = Math.max(...visible.map((p) => p.revenue), 1);
    const total = visible.reduce((s, p) => s + p.revenue, 0);
    const first = visible[0]?.revenue ?? 0;
    const last = visible[visible.length - 1]?.revenue ?? 0;
    const growth = first > 0 ? ((last - first) / first) * 100 : 0;
    return { max, total, growth };
  }, [visible]);

  // SVG geometry
  const W = 720;
  const H = 240;
  const PAD_X = 32;
  const PAD_Y = 24;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;
  const stepX = visible.length > 1 ? innerW / (visible.length - 1) : 0;

  const points = visible.map((p, i) => {
    const x = PAD_X + i * stepX;
    const y = PAD_Y + innerH - (p.revenue / max) * innerH;
    return { x, y, ...p };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = points.length
    ? `${linePath} L${points[points.length - 1].x},${PAD_Y + innerH} L${points[0].x},${PAD_Y + innerH} Z`
    : "";

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section className={styles.card} aria-label={title}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.summary}>
            <span className={styles.total}>
              {formatFull(total)} <span className={styles.currency}>{currency}</span>
            </span>
            <span className={`${styles.growth} ${growth >= 0 ? styles.up : styles.down}`}>
              {growth >= 0 ? "▲" : "▼"} {Math.abs(growth).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className={styles.tabs} role="tablist">
          {RANGES.map((r) => (
            <button
              key={r.key}
              role="tab"
              aria-selected={range === r.key}
              className={`${styles.tab} ${range === r.key ? styles.tabActive : ""}`}
              onClick={() => setRange(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.chartWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} preserveAspectRatio="none">
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c4ef0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6c4ef0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grid */}
          {gridLines.map((g, i) => {
            const y = PAD_Y + innerH * g;
            return (
              <g key={i}>
                <line x1={PAD_X} y1={y} x2={W - PAD_X} y2={y} className={styles.grid} />
                <text x={8} y={y + 4} className={styles.axis}>
                  {formatShort(max * (1 - g))}
                </text>
              </g>
            );
          })}

          {/* area + line */}
          <path d={areaPath} fill="url(#revGrad)" />
          <path d={linePath} className={styles.line} />

          {/* points */}
          {points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <circle cx={p.x} cy={p.y} r={hover === i ? 6 : 3.5} className={styles.dot} />
              <rect
                x={p.x - stepX / 2}
                y={PAD_Y}
                width={stepX || innerW}
                height={innerH}
                fill="transparent"
              />
            </g>
          ))}

          {/* x labels */}
          {points.map((p, i) => (
            <text key={i} x={p.x} y={H - 6} textAnchor="middle" className={styles.axis}>
              {p.label}
            </text>
          ))}

          {/* tooltip */}
          {hover !== null && points[hover] && (
            <g transform={`translate(${points[hover].x}, ${points[hover].y - 14})`}>
              <rect x={-58} y={-32} width={116} height={28} rx={6} className={styles.tipBg} />
              <text x={0} y={-13} textAnchor="middle" className={styles.tipText}>
                {points[hover].label}: {formatShort(points[hover].revenue)} {currency}
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  );
};

export default RevenueChart;
