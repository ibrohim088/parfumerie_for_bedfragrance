'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: {
    category?: string;
    priceRange?: [number, number];
    sort?: string;
    search?: string;
  };
  onFilterChange: (filters: any) => void;
}

const CATEGORIES = [
  { id: 'men', label: 'Erkaklar uchun' },
  { id: 'women', label: 'Ayollar uchun' },
  { id: 'unisex', label: 'Uniseks' },
  { id: 'gifts', label: 'Sovg'alar' },
];

const CATEGORIES_RU = [
  { id: 'men', label: 'Для мужчин' },
  { id: 'women', label: 'Для женщин' },
  { id: 'unisex', label: 'Унисекс' },
  { id: 'gifts', label: 'Подарки' },
];

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const t = useTranslations('products');
  const [priceMax, setPriceMax] = useState(filters.priceRange?.[1] || 1000000);

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categoryId ? '' : categoryId,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceMax(value);
    onFilterChange({
      ...filters,
      priceRange: [0, value],
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sort: e.target.value,
    });
  };

  const handleReset = () => {
    setPriceMax(1000000);
    onFilterChange({
      category: '',
      priceRange: [0, 1000000],
      sort: 'newest',
      search: '',
    });
  };

  return (
    <div className={styles.panel}>
      <h3>{t('filters')}</h3>

      <div className={styles.section}>
        <h4>{t('category')}</h4>
        <div className={styles.checkboxGroup}>
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.category === cat.id}
                onChange={() => handleCategoryChange(cat.id)}
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4>{t('priceRange')}</h4>
        <div className={styles.priceControl}>
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={priceMax}
            onChange={handlePriceChange}
            className={styles.slider}
          />
          <div className={styles.priceDisplay}>
            <span>0</span>
            <span>{priceMax.toLocaleString()} {t('currency', { defaultValue: 'UZS' })}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4>{t('sort')}</h4>
        <select
          value={filters.sort || 'newest'}
          onChange={handleSortChange}
          className={styles.select}
        >
          <option value="newest">Ko'p So'rov</option>
          <option value="price-low">Narx: Kam → Ko'p</option>
          <option value="price-high">Narx: Ko'p → Kam</option>
          <option value="rating">Reyting</option>
        </select>
      </div>

      <button className={styles.reset} onClick={handleReset}>
        {t('reset')}
      </button>
    </div>
  );
}
