'use client';

import styles from './ProfileForm.module.scss';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';

export default function ProfileForm() {
  return (
    <form className={styles.form}>
      <div className={styles.section}>
        <h3>Profil Rasmini O'zgartirish</h3>
        <div className={styles.uploadBox}>
          <input type="file" accept="image/*" />
          <p>Rasmni surish yoki tanlash</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Asosiy Ma'lumotlar</h3>
        <div className={styles.grid}>
          <Input label="To'liq ismi" placeholder="Ismingiz" />
          <Input label="Email" type="email" placeholder="email@example.com" />
          <Input label="Telefon" type="tel" disabled placeholder="+998" />
          <Input label="Tug'ilgan kuni" type="date" />
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="primary">Saqlash</Button>
        <Button variant="secondary">Bekor qilish</Button>
      </div>
    </form>
  );
}
