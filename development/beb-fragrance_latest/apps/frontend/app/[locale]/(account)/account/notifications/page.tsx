'use client';

import { useTranslations } from 'next-intl';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, Trash2, CheckCircle } from 'lucide-react';
import styles from './notifications.module.scss';

export default function NotificationsPage() {
  const t = useTranslations('account');
  const { notifications, loading, error, markAsRead, deleteNotification } = useNotifications();

  if (loading) {
    return (
      <div className={styles.notifications}>
        <h1>{t('notifications')}</h1>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.notifications}>
        <h1>{t('notifications')}</h1>
        <div className={styles.error}>
          <p>Failed to load notifications: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.notifications}>
      <h1>{t('notifications')}</h1>

      <div className={styles.list}>
        {notifications && notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className={`${styles.item} ${notif.isRead ? styles.read : styles.unread}`}>
              <div className={styles.icon}>
                <Bell size={20} />
              </div>
              <div className={styles.content}>
                <h3>{notif.title}</h3>
                <p>{notif.message}</p>
                <span className={styles.type}>{notif.type}</span>
                <span className={styles.date}>
                  {new Date(notif.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.actions}>
                {!notif.isRead && (
                  <button
                    className={styles.readBtn}
                    onClick={() => markAsRead(notif.id)}
                    title="Mark as read"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteNotification(notif.id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <Bell size={48} />
            <p>{t('noNotifications')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
