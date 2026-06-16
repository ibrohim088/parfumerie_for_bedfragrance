'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAddresses } from '@/hooks/useAddresses';
import { MapPin, Trash2, Edit2, Plus } from 'lucide-react';
import styles from './addresses.module.scss';

export default function AddressesPage() {
  const t = useTranslations('account');
  const { addresses, loading, error, deleteAddress, setDefaultAddress } = useAddresses();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className={styles.addresses}>
        <h1>{t('addresses')}</h1>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading addresses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.addresses}>
        <h1>{t('addresses')}</h1>
        <div className={styles.error}>
          <p>Failed to load addresses: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.addresses}>
      <div className={styles.header}>
        <h1>{t('shippingAddresses')}</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
          {t('addAddress')}
        </button>
      </div>

      <div className={styles.list}>
        {addresses && addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className={`${styles.card} ${address.isDefault ? styles.default : ''}`}>
              <div className={styles.cardHeader}>
                <h3>{address.title}</h3>
                {address.isDefault && <span className={styles.badge}>{t('default')}</span>}
              </div>
              <div className={styles.cardContent}>
                <p>{address.phone}</p>
                <p>{address.address}</p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.editBtn} title={t('edit')}>
                  <Edit2 size={18} />
                </button>
                <button
                  className={styles.deleteBtn}
                  title={t('delete')}
                  onClick={() => deleteAddress(address.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <MapPin size={48} />
            <p>{t('noAddresses')}</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className={styles.form}>
          <h2>{t('addNewAddress')}</h2>
          <div className={styles.formGroup}>
            <label>{t('addressTitle')}</label>
            <input type="text" placeholder={t('home')} />
          </div>
          <div className={styles.formGroup}>
            <label>{t('phone')}</label>
            <input type="tel" />
          </div>
          <div className={styles.formGroup}>
            <label>{t('address')}</label>
            <textarea rows={3} />
          </div>
          <div className={styles.formActions}>
            <button className={styles.saveBtn}>{t('save')}</button>
            <button className={styles.cancelBtn} onClick={() => setShowForm(false)}>
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
