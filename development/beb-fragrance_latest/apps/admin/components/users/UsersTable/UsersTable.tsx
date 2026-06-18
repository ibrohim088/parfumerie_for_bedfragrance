'use client';

import React from 'react';
import type { User } from '@/../../packages/shared/types/user';
import styles from './UsersTable.module.scss';
import { User } from 'lucide-react'

interface UsersTableProps {
  users: User[];
  onRowClick?: (id: string) => void;
}

function formatPhone(phone: string): string {
  // +998901234567 → +998 90 123 45 67
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }
  return phone;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const ROLE_LABELS: Record<string, string> = {
  customer: 'Mijoz',
  admin: 'Admin',
  super_admin: 'Super Admin',
};

const UsersTable: React.FC<UsersTableProps> = ({ users, onRowClick }) => {
  if (users.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}><User size={24} /></span>
        <p>Foydalanuvchilar topilmadi</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Foydalanuvchi</th>
            <th className={styles.th}>Telefon</th>
            <th className={styles.th}>Rol</th>
            <th className={styles.th}>Holat</th>
            <th className={styles.th}>Ro'yxatdan o'tgan</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`${styles.tr} ${onRowClick ? styles.clickable : ''}`}
              onClick={() => onRowClick?.(user.id)}
            >
              {/* Avatar + ism */}
              <td className={styles.td}>
                <div className={styles.userInfo}>
                  <div className={`${styles.avatar} ${user.isActive ? styles.avatarActive : styles.avatarInactive}`}>
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                  <div className={styles.nameBlock}>
                    <span className={styles.fullName}>
                      {user.firstName} {user.lastName}
                    </span>
                    {user.email && (
                      <span className={styles.email}>{user.email}</span>
                    )}
                  </div>
                </div>
              </td>

              {/* Telefon */}
              <td className={styles.td}>
                <span className={styles.phone}>{formatPhone(user.phone)}</span>
              </td>

              {/* Rol */}
              <td className={styles.td}>
                <span className={`${styles.roleBadge} ${styles[`role_${user.role}`]}`}>
                  {ROLE_LABELS[user.role] ?? user.role}
                </span>
              </td>

              {/* Holat */}
              <td className={styles.td}>
                <span className={`${styles.statusDot} ${user.isActive ? styles.dotActive : styles.dotInactive}`} />
                <span className={user.isActive ? styles.statusActive : styles.statusInactive}>
                  {user.isActive ? 'Faol' : 'Bloklangan'}
                </span>
              </td>

              {/* Sana */}
              <td className={styles.td}>
                <span className={styles.date}>{formatDate(user.createdAt)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { UsersTable };
export default UsersTable;
