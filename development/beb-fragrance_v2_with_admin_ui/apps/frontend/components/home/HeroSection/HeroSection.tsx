'use client';

import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>BEB Fragrance</h1>
          <p>Premium atirlar dunyosiga xush kelibsiz</p>
          <button className={styles.cta}>Katalogni ko'rish</button>
        </div>
        <div className={styles.image}>
          {/* Hero background image */}
        </div>
      </div>
    </section>
  );
}
