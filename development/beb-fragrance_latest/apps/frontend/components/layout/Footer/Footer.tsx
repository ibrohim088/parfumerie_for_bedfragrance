'use client';

import { Phone, MapPin, Instagram, Send, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './Footer.module.scss';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>

          <div className={`${styles.section} ${styles.brand}`}>
            <span className={styles.brandName}>BEB Fragrance</span>
            <p>{t('description')}</p>
          </div>

          <div className={styles.section}>
            <h3>{t('quickLinks')}</h3>
            <ul>
              <li><Link href="/">{t('home')}</Link></li>
              <li><Link href="/catalog">{t('catalog')}</Link></li>
              <li><Link href="/brands">{t('brands')}</Link></li>
              <li><Link href="/about">{t('about')}</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>{t('contact')}</h3>
            <p><Phone size={14} /> +998 (99) 040 1771</p>
            <p><MapPin size={14} /> Tashkent, Uzbekistan, Chorsu Turkuaz</p>
          </div>

          <div className={styles.section}>
            <h3>{t('followUs')}</h3>
            <div className={styles.social}>
              <a href="https://www.instagram.com/bebfragrance/" target="_blank"><Instagram size={15} /> Instagram</a>
              <a href="https://www.youtube.com/@Bebfragrance" target="_blank"><Youtube size={15} /> YouTube</a>
              <a href="https://t.me/bebfragrance" target="_blank"><Send size={15} /> Telegram Admin</a>
              {/* <a href="https://t.me/bebfragrance1" target="_blank"><Send size={15} /> Telegram Kanal</a> */}
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