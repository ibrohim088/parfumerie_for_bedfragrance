'use client';

import { Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './InstagramSection.module.scss';

export default function InstagramSection() {
  const t = useTranslations('home');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('seeOnInstagram')}</h2>

        <div className={styles.cta}>
          <a
            href="https://instagram.com/bebfragrance"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followButton}
          >
            <Instagram size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            {t('followInstagram')}
          </a>
        </div>
      </div>
    </section>
  );
}
