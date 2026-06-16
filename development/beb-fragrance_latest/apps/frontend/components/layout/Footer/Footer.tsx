'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.scss';

export default function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>{t('aboutUs')}</h3>
            <p>{t('description')}</p>
          </div>

          <div className={styles.section}>
            <h3>{t('quickLinks')}</h3>
            <ul>
              <li>
                <Link href={`/${locale}`}>{t('home')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog`}>{t('catalog')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/about`}>{t('about')}</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>{t('contact')}</h3>
            <p>📞 +998 (90) 123-45-67</p>
            <p>📧 info@bebfragrance.uz</p>
            <p>📍 Tashkent, Uzbekistan</p>
          </div>

          <div className={styles.section}>
            <h3>{t('followUs')}</h3>
            <div className={styles.social}>
              <a href="#" target="_blank">📱 Instagram</a>
              <a href="#" target="_blank">🔵 Facebook</a>
              <a href="#" target="_blank">▶️ YouTube</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} BEB Fragrance. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
