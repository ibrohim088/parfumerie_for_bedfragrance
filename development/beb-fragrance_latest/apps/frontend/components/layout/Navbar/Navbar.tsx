'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Moon, Sun, ShoppingCart, User } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const locale = pathname.split('/')[1];

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLanguage = (newLocale: 'uz' | 'ru') => {
    const path = pathname.slice(3);
    router.push(`/${newLocale}${path}`);
  };

  if (!mounted) return null;

  return (
    <nav className={styles.navbar} data-theme={theme}>
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoText}>BEB Fragrance</span>
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
            <Link href={`/${locale}/brands`}>
              {t('brands')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/decant`}>
              {t('decant')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/gift-box`}>
              {t('giftBox')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/blog`}>
              {t('blog')}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/about`}>
              {t('about')}
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <div className={styles.language}>
            <button
              className={`${styles.langBtn} ${locale === 'uz' ? styles.active : ''}`}
              onClick={() => switchLanguage('uz')}
            >
              UZ
            </button>
            <span className={styles.separator}>/</span>
            <button
              className={`${styles.langBtn} ${locale === 'ru' ? styles.active : ''}`}
              onClick={() => switchLanguage('ru')}
            >
              РУ
            </button>
          </div>

          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>

          <Link href={`/${locale}/cart`} className={styles.icon} aria-label="Shopping cart">
            <ShoppingCart size={20} />
          </Link>

          {user ? (
            <div className={styles.userMenu}>
              <Link href={`/${locale}/account/profile`} className={styles.icon} aria-label="My account">
                <User size={20} />
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push(`/${locale}`);
                }}
                className={styles.logoutBtn}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link href={`/${locale}/auth/login`} className={styles.icon} aria-label="Login">
              <User size={20} />
            </Link>
          )}
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} locale={locale} />
      )}
    </nav>
  );
}
