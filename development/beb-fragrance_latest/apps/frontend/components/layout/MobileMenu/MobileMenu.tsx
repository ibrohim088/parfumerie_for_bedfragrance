'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const switchLanguage = (newLocale: 'uz' | 'ru') => {
    router.replace(pathname, { locale: newLocale });
    onClose();
  };

  return (
    <div className={styles.mobileMenu}>
      <ul className={styles.menu}>
        <li><Link href="/" onClick={onClose}>{t('home')}</Link></li>
        <li><Link href="/catalog" onClick={onClose}>{t('catalog')}</Link></li>
        <li><Link href="/brands" onClick={onClose}>{t('brands')}</Link></li>
        <li><Link href="/decant" onClick={onClose}>{t('decant')}</Link></li>
        <li><Link href="/gift-box" onClick={onClose}>{t('giftBox')}</Link></li>
        <li><Link href="/blog" onClick={onClose}>{t('blog')}</Link></li>
        <li><Link href="/about" onClick={onClose}>{t('about')}</Link></li>
      </ul>

      <div className={styles.divider} />

      <div className={styles.settings}>
        <div className={styles.settingItem}>
          <span>{t('language')}:</span>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.btn} ${locale === 'uz' ? styles.active : ''}`}
              onClick={() => switchLanguage('uz')}
            >UZ</button>
            <button
              className={`${styles.btn} ${locale === 'ru' ? styles.active : ''}`}
              onClick={() => switchLanguage('ru')}
            >РУ</button>
          </div>
        </div>

        <div className={styles.settingItem}>
          <span>{t('theme')}:</span>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === 'light' ? <><Moon size={14} /> Dark</> : <><Sun size={14} /> Light</>}
          </button>
        </div>
      </div>
    </div>
  );
}