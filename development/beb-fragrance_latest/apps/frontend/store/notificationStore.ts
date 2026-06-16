import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  timestamp: number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  showSuccess: (title: string, message: string) => string;
  showError: (title: string, message: string) => string;
  showInfo: (title: string, message: string) => string;
  showWarning: (title: string, message: string) => string;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after duration
    if (notification.duration) {
      setTimeout(() => {
        get().removeNotification(id);
      }, notification.duration);
    }

    return id;
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  showSuccess: (title: string, message: string) => {
    return get().addNotification({
      title,
      message,
      type: 'success',
      duration: 3000,
    });
  },

  showError: (title: string, message: string) => {
    return get().addNotification({
      title,
      message,
      type: 'error',
      duration: 5000,
    });
  },

  showInfo: (title: string, message: string) => {
    return get().addNotification({
      title,
      message,
      type: 'info',
      duration: 3000,
    });
  },

  showWarning: (title: string, message: string) => {
    return get().addNotification({
      title,
      message,
      type: 'warning',
      duration: 4000,
    });
  },
}));

export default useNotificationStore;
