'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './LoginPage.module.scss';

export default function LoginPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const { locale } = params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await api.auth.login({ email, password });
      // Store token in authStore
      console.log('Login:', { email, password });

      // Simulate successful login
      setTimeout(() => {
        router.push(`/${locale}`);
      }, 500);
    } catch (err: any) {
      setError(err.message || t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>{t('login')}</h1>
          <p className={styles.subtitle}>{t('loginSubtitle')}</p>

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

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          <div className={styles.divider}>
            <span>{t('or')}</span>
          </div>

          <button className={styles.googleBtn}>
            <Mail size={16} style={{ marginRight: '8px' }} />
            {t('loginWithGoogle')}
          </button>

          <div className={styles.links}>
            <Link href={`/${locale}/auth/password-reset`}>
              {t('forgotPassword')}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/auth/register`}>
              {t('dontHaveAccount')} {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
