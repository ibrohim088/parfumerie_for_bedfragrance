'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from './register.module.scss';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1>{t('register')}</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">{t('fullName')}</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
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

          <div className={styles.formGroup}>
            <label htmlFor="email">{t('email')}</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">{t('password')}</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? t('registering') : t('register')}
          </button>
        </form>

        <p className={styles.login}>
          {t('haveAccount')} <Link href="/login">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
}
