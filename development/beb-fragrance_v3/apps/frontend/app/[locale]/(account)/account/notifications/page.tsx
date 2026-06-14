'use client';

import { useTranslations } from 'next-intl';
import { useNotifications } from '@/hooks/useNotifications';
import styles from './notifications.module.scss';

export default function NotificationsPage() {
  const t = useTranslations('account');
  const { notifications } = useNotifications();

  return (
    <div className={styles.notifications}>
      <h1>{t('notifications')}</h1>
      <div className={styles.list}>
        {notifications?.map((notif) => (
          <div key={notif.id} className={styles.item}>
            {/* Notification item */}
          </div>
        ))}
      </div>
    </div>
  );
}
