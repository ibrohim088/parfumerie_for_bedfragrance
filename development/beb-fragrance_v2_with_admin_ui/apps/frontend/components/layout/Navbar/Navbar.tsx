'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = pathname.split('/')[1];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          BEB Fragrance
        </Link>

        <ul className={styles.menu}>
          <li>
            <Link href={`/${locale}`}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/catalog`}>
              {t('catalog')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/gift-box`}>
              {t('giftBox')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/about`}>
              {t('about')}
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link href={`/${locale}/cart`} className={styles.icon}>
            🛒
          </Link>
          <Link href={`/${locale}/login`} className={styles.icon}>
            👤
          </Link>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
}
