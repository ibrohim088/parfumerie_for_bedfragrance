'use client';

import styles from './FeaturedProducts.module.scss';

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Eng mashhur mahsulotlar</h2>
        <div className={styles.grid}>
          {/* ProductCard components will be rendered here */}
        </div>
      </div>
    </section>
  );
}
