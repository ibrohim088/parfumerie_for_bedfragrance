'use client';

import styles from './BrandStory.module.scss';

export default function BrandStory() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>BEB Fragrance haqida</h2>
          <p>
            Biz 2020-yildan beri dunyoning eng yaxshi atirlarini O'zbekistonga olib kelmoqdamiz.
            Har bir mahsulot diqqat bilan tanlangan va sifati tekshirilgan.
          </p>
          <p>
            Bizning maqsad - har bir mijozga premium sifat va qo'llanilishni ta'minlash.
          </p>
        </div>
        <div className={styles.image}>
          {/* Brand story image */}
        </div>
      </div>
    </section>
  );
}
