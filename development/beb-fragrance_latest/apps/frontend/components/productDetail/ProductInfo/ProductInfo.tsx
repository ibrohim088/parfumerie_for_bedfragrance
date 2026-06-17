'use client';

import { useState } from 'react';
import { Star, Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './ProductInfo.module.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  specifications: {
    volume: string;
    concentration: string;
    expiry: string;
    originCountry: string;
  };
  ingredients: string[];
  usage: string;
}

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations('products');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'usage'>(
    'description'
  );
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const formattedPrice = product.price ? Number(product.price).toLocaleString() : '0';

  return (
    <div className={styles.info}>
      <div>
        <h1 className={styles.name}>{product.name}</h1>
        <div className={styles.rating}>
          <span className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
            ))}
            {product.rating}
          </span>
          <span className={styles.reviews}>({product.reviews} reviews)</span>
        </div>
      </div>

      <div className={styles.price}>
        <span className={styles.value}>{formattedPrice} UZS</span>
        <span className={styles.status}>
          {product.inStock ? (
            <>
              <Check size={16} style={{ marginRight: '4px' }} />
              In Stock
            </>
          ) : (
            <>
              <X size={16} style={{ marginRight: '4px' }} />
              Out of Stock
            </>
          )}
        </span>
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.actions}>
        <div className={styles.quantitySelector}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button
          className={`${styles.addToCart} ${addedToCart ? styles.success : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {addedToCart ? (
            <>
              <Check size={16} style={{ marginRight: '4px' }} />
              Added to Cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'specifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'usage' ? styles.active : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            Usage
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div>
              <h3>About this Fragrance</h3>
              <p>{product.description}</p>
              <h4>Ingredients</h4>
              <ul>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3>Product Specifications</h3>
              <table className={styles.specs}>
                <tbody>
                  <tr>
                    <td>Volume</td>
                    <td>{product.specifications.volume}</td>
                  </tr>
                  <tr>
                    <td>Concentration</td>
                    <td>{product.specifications.concentration}</td>
                  </tr>
                  <tr>
                    <td>Shelf Life</td>
                    <td>{product.specifications.expiry}</td>
                  </tr>
                  <tr>
                    <td>Origin Country</td>
                    <td>{product.specifications.originCountry}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'usage' && (
            <div>
              <h3>How to Use</h3>
              <p>{product.usage}</p>
              <h4>Tips for Best Results</h4>
              <ul>
                <li>Apply on clean, moisturized skin</li>
                <li>Store in a cool, dark place away from sunlight</li>
                <li>Do not shake the bottle before use</li>
                <li>For longer longevity, apply to pulse points</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
