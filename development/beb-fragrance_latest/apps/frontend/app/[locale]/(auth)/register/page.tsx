'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './register.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function RegisterPage() {
  const t = useTranslations('auth');

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP qayta yuborish taymeri
  const startTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.match(/^\+998[0-9]{9}$/)) {
      setError('Telefon raqam noto\'g\'ri. Masalan: +998901234567');
      return;
    }
    if (firstName.trim().length < 2) {
      setError('Ism kamida 2 ta belgi bo\'lishi kerak.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Xato yuz berdi');
      setStep('otp');
      startTimer();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('SMS-kodni to\'liq kiriting.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otp: otpCode,
          firstName: firstName.trim(),
          lastName: lastName.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Kod noto\'g\'ri');

      // Token saqlash
      if (data.data?.accessToken) {
        localStorage.setItem('token', data.data.accessToken);
        if (data.data.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
      }
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Xato');
      startTimer();
      setOtp(['', '', '', '', '', '']);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1>{step === 'form' ? t('register') : t('otp')}</h1>

        {error && <p className={styles.error}>{error}</p>}

        {step === 'form' ? (
          <form onSubmit={handleSendOtp}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">{t('fullName')}</label>
              <input
                id="firstName"
                type="text"
                placeholder={t('fullNamePlaceholder')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Familiya (ixtiyoriy)</label>
              <input
                id="lastName"
                type="text"
                placeholder="Familiyangizni kiriting"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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
            <p className={styles.otpHint}>
              <strong>{phone}</strong> raqamiga SMS-kod yuborildi
            </p>

            <div className={styles.otpRow}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={styles.otpInput}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? t('verifying') : t('verify')}
            </button>

            <div className={styles.resendRow}>
              {resendTimer > 0 ? (
                <span className={styles.resendTimer}>{resendTimer}s dan so'ng qayta yuborish</span>
              ) : (
                <button
                  type="button"
                  className={styles.resendBtn}
                  onClick={handleResend}
                  disabled={loading}
                >
                  Kodni qayta yuborish
                </button>
              )}
            </div>

            <button
              type="button"
              className={styles.back}
              onClick={() => { setStep('form'); setError(''); setOtp(['','','','','','']); }}
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