'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Package,
  MapPin,
  CreditCard,
  Bell,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import styles from './AccountSidebar.module.scss';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function AccountSidebar() {
  const t = useTranslations('account');
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split('/')[1];
  const logout = useAuthStore((state) => state.logout);

  const menuItems: MenuItem[] = [
    {
      href: '/account',
      label: t('overview'),
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: '/account/personal-info',
      label: t('personalInfo'),
      icon: <User size={20} />,
    },
    {
      href: '/account/orders',
      label: t('orders'),
      icon: <Package size={20} />,
    },
    {
      href: '/account/addresses',
      label: t('addresses'),
      icon: <MapPin size={20} />,
    },
    {
      href: '/account/payment',
      label: t('paymentMethods'),
      icon: <CreditCard size={20} />,
    },
    {
      href: '/account/notifications',
      label: t('notifications'),
      icon: <Bell size={20} />,
    },
    {
      href: '/account/scent-profile',
      label: t('scentProfile'),
      icon: <Sparkles size={20} />,
    },
  ];

  const isActive = (href: string): boolean => {
    if (href === '/account') {
      return pathname === `/${locale}/account`;
    }
    return pathname.includes(href);
  };

  const handleLogout = (): void => {
    logout();
    router.push(`/${locale}`);
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <h3 className={styles.navTitle}>{t('manage')}</h3>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={`/${locale}${item.href}`}
                className={`${styles.menuLink} ${isActive(item.href) ? styles.active : ''
                  }`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        <LogOut size={20} />
        <span>{t('logout')}</span>
      </button>
    </aside>
  );
}
