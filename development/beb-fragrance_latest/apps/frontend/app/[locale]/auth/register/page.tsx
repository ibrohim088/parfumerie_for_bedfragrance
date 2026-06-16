'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './RegisterPage.module.scss';

export default function RegisterPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const { locale } = params;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch') || 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await api.auth.register({ fullName, email, password, newsletter });
      console.log('Register:', { fullName, email, password, newsletter });

      // Simulate successful registration
      setTimeout(() => {
        router.push(`/${locale}`);
      }, 500);
    } catch (err: any) {
      setError(err.message || t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>{t('register')}</h1>
          <p className={styles.subtitle}>{t('registerSubtitle')}</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">{t('fullName')}</label>
              <input
                id="fullName"
                type="text"
                placeholder={t('fullNamePlaceholder')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">{t('password')}</label>
              <div className={styles.passwordInput}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder={t('confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.checkbox}>
              <input
                id="newsletter"
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />
              <label htmlFor="newsletter">{t('subscribeNewsletter')}</label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? t('loading') : t('register')}
            </button>
          </form>

          <div className={styles.divider}>
            <span>{t('or')}</span>
          </div>

          <button className={styles.googleBtn}>
            <Mail size={16} style={{ marginRight: '8px' }} />
            {t('registerWithGoogle')}
          </button>

          <div className={styles.links}>
            <span>{t('alreadyHaveAccount')}</span>
            <Link href={`/${locale}/auth/login`}>
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
