'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useScentProfile } from '@/hooks/useScentProfile';
import { Sparkles } from 'lucide-react';
import styles from './scent-profile.module.scss';

export default function ScentProfilePage() {
  const t = useTranslations('account');
  const { profile, loading, error, updateProfile } = useScentProfile();
  const [formData, setFormData] = useState({
    scentFamily: '',
    intensity: '',
    notes: '',
    favoriteScents: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        scentFamily: profile.scentFamily || '',
        intensity: profile.intensity || '',
        notes: profile.notes || '',
        favoriteScents: profile.favoriteScents || [],
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateProfile(formData);
      alert(t('profileUpdated'));
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.scentProfile}>
        <h1>{t('scentProfile')}</h1>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading scent profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.scentProfile}>
        <h1>{t('scentProfile')}</h1>
        <div className={styles.message}>
          <Sparkles size={48} />
          <p>Create your scent profile to get personalized recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.scentProfile}>
      <h1>{t('scentProfile')}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="scentFamily">{t('scentFamily')}</label>
          <select
            id="scentFamily"
            name="scentFamily"
            value={formData.scentFamily}
            onChange={handleChange}
          >
            <option value="">Select scent family</option>
            <option value="floral">Floral</option>
            <option value="fresh">Fresh</option>
            <option value="woody">Woody</option>
            <option value="oriental">Oriental</option>
            <option value="chypre">Chypre</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="intensity">{t('intensity')}</label>
          <select
            id="intensity"
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
          >
            <option value="">Select intensity</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="strong">Strong</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes">{t('favoriteNotes')}</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter your favorite fragrance notes..."
            rows={4}
          />
        </div>

        <button type="submit" disabled={submitting} className={styles.submitBtn}>
          {submitting ? 'Saving...' : t('save')}
        </button>
      </form>
    </div>
  );
}
