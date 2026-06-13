'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import OtpInput from '@/components/ui/OtpInput/OtpInput';
import styles from './login.module.scss';

export default function LoginPage() {
  const t = useTranslations('auth');
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: API call to send OTP
      setStep('otp');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ phone, otp });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1>{t('login')}</h1>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">{t('phone')}</label>
              <input
                id="phone"
                type="tel"
                placeholder="+998 XX XXX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? t('sending') : t('sendOtp')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className={styles.formGroup}>
              <label>{t('otp')}</label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                length={6}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? t('verifying') : t('verify')}
            </button>
            <button
              type="button"
              className={styles.back}
              onClick={() => setStep('phone')}
            >
              {t('back')}
            </button>
          </form>
        )}

        <p className={styles.register}>
          {t('noAccount')} <Link href="/register">{t('register')}</Link>
        </p>
      </div>
    </div>
  );
}
