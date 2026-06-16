'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Bell,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import styles from './AccountSidebar.module.scss';

interface SidebarLink {
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

  const links: SidebarLink[] = [
    {
      href: `/account/personal-info`,
      label: t('personalInfo'),
      icon: <User size={20} />,
    },
    {
      href: `/account/orders`,
      label: t('orderHistory'),
      icon: <Package size={20} />,
    },
    {
      href: `/account/addresses`,
      label: t('shippingAddresses'),
      icon: <MapPin size={20} />,
    },
    {
      href: `/account/payment`,
      label: t('paymentMethods'),
      icon: <CreditCard size={20} />,
    },
    {
      href: `/account/notifications`,
      label: t('notifications'),
      icon: <Bell size={20} />,
    },
    {
      href: `/account/scent-profile`,
      label: t('scentProfile'),
      icon: <Sparkles size={20} />,
    },
  ];

  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${locale}${link.href}`}
                className={`${styles.link} ${isActive(link.href) ? styles.active : ''
                  }`}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
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
