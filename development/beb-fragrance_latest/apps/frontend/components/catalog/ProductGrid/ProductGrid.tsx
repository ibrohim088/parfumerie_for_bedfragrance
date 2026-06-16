'use client';

import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  filters?: any;
}

export default function ProductGrid({ filters }: ProductGridProps) {
  // TODO: Fetch products based on filters
  const products = []; // Placeholder

  return (
    <div className={styles.grid}>
      {products.length === 0 ? (
        <div className={styles.empty}>No products found</div>
      ) : (
        products.map((product) => (
          <div key={product.id}>{/* ProductCard component */}</div>
        ))
      )}
    </div>
  );
}
