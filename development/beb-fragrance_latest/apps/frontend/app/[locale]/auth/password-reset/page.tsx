'use client';

import { useState } from 'react';
import { CheckCircle, Phone, Mail as MailIcon, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './PasswordResetPage.module.scss';

export default function PasswordResetPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('auth');
  const { locale } = params;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await api.auth.requestPasswordReset({ email });
      console.log('Password reset requested for:', email);

      // Simulate successful submission
      setTimeout(() => {
        setSubmitted(true);
      }, 500);
    } catch (err: any) {
      setError(err.message || t('resetFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.successIcon}>
              <CheckCircle size={40} color="#10b981" />
            </div>
            <h1>{t('resetSent')}</h1>
            <p className={styles.message}>
              {t('resetSentMessage')}
              <br />
              <strong>{email}</strong>
            </p>

            <div className={styles.hints}>
              <h3>{t('helpfulHints')}</h3>
              <ul>
                <li>{t('checkSpam')}</li>
                <li>{t('linkExpires')}</li>
                <li>{t('contactSupport')}</li>
              </ul>
            </div>

            <Link href={`/${locale}/auth/login`} className={styles.backBtn}>
              <ArrowLeft size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              {t('backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>{t('resetPassword')}</h1>
          <p className={styles.subtitle}>{t('resetPasswordSubtitle')}</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">{t('email')}</label>
              <input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className={styles.help}>
                {t('resetEmailHint')}
              </p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? t('loading') : t('sendResetLink')}
            </button>
          </form>

          <div className={styles.divider}>
            <span>{t('or')}</span>
          </div>

          <div className={styles.supportSection}>
            <h3>{t('needHelp')}</h3>
            <p>{t('contactSupportMessage')}</p>
            <a href="mailto:support@bebfragrance.uz" className={styles.emailLink}>
              <MailIcon size={16} style={{ marginRight: '8px', display: 'inline' }} />
              support@bebfragrance.uz
            </a>
          </div>

          <div className={styles.links}>
            <Link href={`/${locale}/auth/login`}>
              <ArrowLeft size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              {t('backToLogin')}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/auth/register`}>
              {t('createNewAccount')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
