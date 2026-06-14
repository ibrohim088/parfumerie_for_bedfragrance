'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import styles from './AccountSidebar.module.scss';

export default function AccountSidebar() {
  const t = useTranslations('account');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const menuItems = [
    { href: '/account', label: t('overview') },
    { href: '/account/personal-info', label: t('personalInfo') },
    { href: '/account/orders', label: t('orders') },
    { href: '/account/addresses', label: t('addresses') },
    { href: '/account/payment', label: t('paymentMethods') },
    { href: '/account/notifications', label: t('notifications') },
    { href: '/account/scent-profile', label: t('scentProfile') },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={`/${locale}${item.href}`}
                className={pathname.includes(item.href) ? styles.active : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.logout}>
        {t('logout')}
      </button>
    </aside>
  );
}
