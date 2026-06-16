import React from 'react';
import styles from './AdminTable.module.scss';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface AdminTableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

function AdminTable<T = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyText = 'Ma\'lumot topilmadi',
  onRowClick,
  className = '',
}: AdminTableProps<T>) {
  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.th}
                style={{ width: col.width, textAlign: col.align || 'left' }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className={styles.skeletonRow}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    <span className={styles.skeleton} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className={`${styles.tr} ${onRowClick ? styles.clickable : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => {
                  const value = (row as Record<string, unknown>)[col.key];
                  return (
                    <td
                      key={col.key}
                      className={styles.td}
                      style={{ textAlign: col.align || 'left' }}
                    >
                      {col.render ? col.render(value, row) : (value as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { AdminTable };
export default AdminTable;
