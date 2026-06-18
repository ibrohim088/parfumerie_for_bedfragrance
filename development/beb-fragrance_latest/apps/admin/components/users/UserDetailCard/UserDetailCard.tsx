'use client';

import React from 'react';
import type { User } from '@/../../packages/shared/types/user';
import styles from './UserDetailCard.module.scss';
import { Lock, CheckCircle2, Trash2 } from 'lucide-react'

interface UserDetailCardProps {
  user: User;
  onToggleActive: (isActive: boolean) => void;
  onDelete: () => void;
  isUpdating?: boolean;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  user,
  onToggleActive,
  onDelete,
  isUpdating = false,
}) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `${user.firstName} ${user.lastName} ni o'chirishni tasdiqlaysizmi?\nBu amalni qaytarib bo'lmaydi.`
    );
    if (confirmed) onDelete();
  };

  return (
    <div className={styles.wrapper}>
      {/* ── Profile header ── */}
      <div className={styles.profileHeader}>
        <div className={`${styles.avatar} ${user.isActive ? styles.avatarActive : styles.avatarInactive}`}>
          {getInitials(user.firstName, user.lastName)}
        </div>
        <div className={styles.profileMeta}>
          <h2 className={styles.fullName}>
            {user.firstName} {user.lastName}
          </h2>
          <span className={styles.phone}>{user.phone}</span>
          <div className={styles.badges}>
            <span className={`${styles.roleBadge} ${styles[`role_${user.role}`]}`}>
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
            <span className={`${styles.statusBadge} ${user.isActive ? styles.statusActive : styles.statusInactive}`}>
              <span className={`${styles.statusDot} ${user.isActive ? styles.dotActive : styles.dotInactive}`} />
              {user.isActive ? 'Faol' : 'Bloklangan'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Info rows ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Profil ma'lumotlari</h3>
        <dl className={styles.infoList}>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Ism</dt>
            <dd className={styles.infoValue}>{user.firstName}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Familiya</dt>
            <dd className={styles.infoValue}>{user.lastName}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Telefon raqam</dt>
            <dd className={styles.infoValue}>{user.phone}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Email</dt>
            <dd className={styles.infoValue}>{user.email ?? '—'}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Rol</dt>
            <dd className={styles.infoValue}>{ROLE_LABELS[user.role] ?? user.role}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>ID</dt>
            <dd className={`${styles.infoValue} ${styles.mono}`}>{user.id}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Ro'yxatdan o'tgan</dt>
            <dd className={styles.infoValue}>{formatDate(user.createdAt)}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>Oxirgi yangilanish</dt>
            <dd className={styles.infoValue}>{formatDateTime(user.updatedAt)}</dd>
          </div>
        </dl>
      </div>

      {/* ── Actions ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Holat boshqaruvi</h3>
        <p className={styles.actionHint}>
          {user.isActive
            ? 'Foydalanuvchini bloklash — platformaga kirishni to\'xtatadi.'
            : 'Foydalanuvchini faollashtirish — platformaga kirishni qayta tiklaydi.'}
        </p>
        <button
          className={`${styles.actionBtn} ${user.isActive ? styles.btnBlock : styles.btnActivate}`}
          onClick={() => onToggleActive(!user.isActive)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className={styles.btnSpinner} />
          ) : user.isActive ? (
            <Lock size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}
        </button>
      </div>

      {/* ── Danger zone ── */}
      <div className={`${styles.section} ${styles.dangerZone}`}>
        <h3 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>Xavfli zona</h3>
        <p className={styles.actionHint}>
          Foydalanuvchini o'chirish — barcha ma'lumotlari va buyurtmalari bilan birga yo'q qilinadi.
          Bu amalni qaytarib bo'lmaydi.
        </p>
        <button className={`${styles.actionBtn} ${styles.btnDelete}`} onClick={handleDelete}>
          <Trash2 size={16} />
          Foydalanuvchini o'chirish
        </button>
      </div>
    </div>
  );
};

export { UserDetailCard };
export default UserDetailCard;
