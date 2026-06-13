'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './result.module.scss';

export default function CheckoutResultPage() {
  const t = useTranslations('checkout');
  const searchParams = useSearchParams();
  const status = searchParams.get('status'); // 'success' | 'failed'

  return (
    <div className={styles.result}>
      <div className={styles.container}>
        <div className={styles.content}>
          {status === 'success' ? (
            <>
              <div className={styles.success}>✓</div>
              <h1>{t('successTitle')}</h1>
              <p>{t('successMessage')}</p>
            </>
          ) : (
            <>
              <div className={styles.failed}>✕</div>
              <h1>{t('failedTitle')}</h1>
              <p>{t('failedMessage')}</p>
            </>
          )}
          <Link href="/catalog" className={styles.button}>
            {t('backToCatalog')}
          </Link>
        </div>
      </div>
    </div>
  );
}
