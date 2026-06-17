'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Moon,
  Sun,
  ShoppingCart,
  User,
  Heart,
  Search,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLanguage = (newLocale: 'uz' | 'ru') => {
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) return null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>BEB Fragrance</span>
        </Link>

        {/* Desktop Menu */}
        <ul className={styles.menu}>
          <li><Link href="/">{t('home')}</Link></li>
          <li><Link href="/catalog">{t('catalog')}</Link></li>
          <li><Link href="/brands">{t('brands')}</Link></li>
          <li><Link href="/decant">{t('decant')}</Link></li>
          <li><Link href="/gift-box">{t('giftBox')}</Link></li>
          <li><Link href="/blog">{t('blog')}</Link></li>
          <li><Link href="/about">{t('about')}</Link></li>
        </ul>

        {/* Actions */}
        <div className={styles.actions}>

          {/* Language */}
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

          {/* Theme toggle */}
          <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Search */}
          <Link href="/catalog" className={styles.iconBtn} aria-label="Search">
            <Search size={18} />
          </Link>

          {/* Wishlist */}
          <Link href="/account/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={18} />
          </Link>

          {/* Cart */}
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
            <ShoppingCart size={18} />
          </Link>

          {/* User */}
          {user ? (
            <div className={styles.userMenu}>
              <Link href="/account" className={styles.iconBtn} aria-label="Account">
                <User size={18} />
              </Link>
              <button
                onClick={() => { logout(); router.push('/'); }}
                className={styles.logoutBtn}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.iconBtn} aria-label="Login">
              <User size={18} />
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
}