'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import OtpInput from '@/components/ui/OtpInput/OtpInput';
import styles from './register.module.scss';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { sendOtp, register } = useAuth();

  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendOtp(formData.phone);
      setStep('otp');
    } catch (err: any) {
      setError(err.message || t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        phone: formData.phone,
        otp,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message || t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1>{t('register')}</h1>

        {error && <div className={styles.error}>{error}</div>}

        {step === 'details' ? (
          <form onSubmit={handleSendOtp}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">{t('fullName')}</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">{t('lastName')}</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">{t('phone')}</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+998 XX XXX XX XX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? t('sending') : t('sendOtp')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className={styles.formGroup}>
              <label>{t('otp')}</label>
              <OtpInput value={otp} onChange={setOtp} length={6} />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? t('registering') : t('register')}
            </button>
            <button
              type="button"
              className={styles.back}
              onClick={() => setStep('details')}
            >
              {t('back')}
            </button>
          </form>
        )}

        <p className={styles.login}>
          {t('haveAccount')} <Link href="/login">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
}
