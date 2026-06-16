'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  onClose: () => void;
  locale: string;
}

export default function MobileMenu({ onClose, locale }: MobileMenuProps) {
  const t = useTranslations('navigation');
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const initial = saved || preferred;
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#1f2937');
      root.style.setProperty('--bg-secondary', '#111827');
      root.style.setProperty('--text-primary', '#f3f4f6');
      root.style.setProperty('--text-secondary', '#9ca3af');
      root.style.setProperty('--border-color', '#374151');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--border-color', '#e5e7eb');
    }
  };

  const switchLanguage = (newLocale: 'uz' | 'ru') => {
    const pathWithoutLocale = window.location.pathname.slice(3);
    router.push(`/${newLocale}${pathWithoutLocale}`);
    onClose();
  };

  if (!mounted) return null;

  return (
    <div className={styles.mobileMenu}>
      <ul className={styles.menu}>
        <li>
          <Link href={`/${locale}`} onClick={onClose}>
            {t('home')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/catalog`} onClick={onClose}>
            {t('catalog')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/gift-box`} onClick={onClose}>
            {t('giftBox')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/about`} onClick={onClose}>
            {t('about')}
          </Link>
        </li>
      </ul>

      <div className={styles.divider} />

      <div className={styles.settings}>
        <div className={styles.settingItem}>
          <span>{t('language')}:</span>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.btn} ${locale === 'uz' ? styles.active : ''}`}
              onClick={() => switchLanguage('uz')}
            >
              UZ
            </button>
            <button
              className={`${styles.btn} ${locale === 'ru' ? styles.active : ''}`}
              onClick={() => switchLanguage('ru')}
            >
              РУ
            </button>
          </div>
        </div>

        <div className={styles.settingItem}>
          <span>{t('theme')}:</span>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </div>
  );
}