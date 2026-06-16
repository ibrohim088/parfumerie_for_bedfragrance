'use client';

import { useTranslations } from 'next-intl';
import { useDecants } from '@/hooks/useDecants';
import styles from './page.module.scss';

export default function DecantsPage() {
  const t = useTranslations('navigation');
  const { data: decants, isLoading, error } = useDecants();

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('decant')}</h1>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading decants...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('decant')}</h1>
          <div className={styles.error}>
            <p>Failed to load decants. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('decant')}</h1>
        <p className={styles.subtitle}>Try our premium fragrances in small quantities</p>

        {decants && decants.length > 0 ? (
          <div className={styles.grid}>
            {decants.map((decant: any) => (
              <div key={decant.id} className={styles.card}>
                {decant.image && (
                  <img src={decant.image} alt={decant.name} className={styles.image} />
                )}
                <div className={styles.placeholder} />
                <h3 className={styles.cardTitle}>{decant.name}</h3>
                {decant.volume && <p className={styles.cardDescription}>{decant.volume}</p>}
                {decant.price && <span className={styles.price}>{decant.price.toLocaleString()} UZS</span>}
                <button className={styles.btn}>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No decants available</p>
          </div>
        )}
      </div>
    </div>
  );
}
