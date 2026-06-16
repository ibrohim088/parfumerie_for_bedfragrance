'use client';

import { useTranslations } from 'next-intl';
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
            <p>{t('contactContent')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
