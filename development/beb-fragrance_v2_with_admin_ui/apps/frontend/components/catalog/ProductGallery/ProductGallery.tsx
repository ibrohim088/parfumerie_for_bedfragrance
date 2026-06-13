'use client';

import styles from './ProductGallery.module.scss';

export default function ProductGallery() {
  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {/* Main product image */}
        <img src="/placeholder.png" alt="Product" />
      </div>
      <div className={styles.thumbnails}>
        {/* Thumbnail images */}
      </div>
    </div>
  );
}
