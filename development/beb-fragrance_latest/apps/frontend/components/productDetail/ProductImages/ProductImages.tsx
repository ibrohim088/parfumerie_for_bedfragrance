'use client';

import { useState } from 'react';
import styles from './ProductImages.module.scss';

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img src={images[selectedImage]} alt={`Product image ${selectedImage + 1}`} />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''
                }`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
