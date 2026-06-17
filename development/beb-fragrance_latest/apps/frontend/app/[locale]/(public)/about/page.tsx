'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './about.module.scss';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>{t('ourStory')}</h2>
            <p>{t('storyContent')}</p>
          </section>
          <section className={styles.section}>
            <h2>{t('mission')}</h2>
            <p>{t('missionContent')}</p>
          </section>
          <section className={styles.section}>
            <h2>{t('contact')}</h2>
            <div className={styles.contactList}>
              <p className={styles.contactItem}>
                <MapPin size={18} />
                {t('contactAddressLabel')}: {t('contactAddress')}
              </p>
              <p className={styles.contactItem}>
                <Phone size={18} />
                {t('contactPhoneLabel')}: {t('contactPhone')}
              </p>
              <p className={styles.contactItem}>
                <Mail size={18} />
                {t('contactEmailLabel')}: {t('contactEmail')}
              </p>
              <p className={styles.contactItem}>
                <Clock size={18} />
                {t('contactHoursLabel')}: {t('contactHours')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
