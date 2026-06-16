'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CatalogSidebar.module.scss';

interface FiltersType {
  search: string;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface CatalogSidebarProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

const categories = [
  'All',
  'Luxury',
  'Designer',
  'Niche',
  'Aromatic',
  'Oriental',
  'Floral',
  'Fruity',
];

const brands = [
  'DIOR',
  'CHANEL',
  'LOUIS VUITTON',
  'CREED',
  'BYREDO',
  'LE LABO',
  'DIPTYQUE',
  'NISHANE',
];

export default function CatalogSidebar({ filters, onChange }: CatalogSidebarProps) {
  const t = useTranslations('products');
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    category: true,
    brand: true,
    price: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearchChange = (value: string) => {
    onChange({ ...filters, search: value });
  };

  const handleCategoryChange = (value: string) => {
    onChange({ ...filters, category: value });
  };

  const handleBrandChange = (value: string) => {
    onChange({
      ...filters,
      brand: filters.brand === value ? '' : value,
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    onChange({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value,
    });
  };

  const handleSortChange = (value: string) => {
    onChange({ ...filters, sort: value });
  };

  const handleReset = () => {
    onChange({
      search: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
    });
  };

  return (
    <div className={styles.sidebar}>
      {/* Search */}
      <div className={styles.section}>
        <button
          className={styles.header}
          onClick={() => toggleSection('search')}
        >
          <span>Search</span>
          <span className={expandedSections.search ? styles.expanded : ''}>▼</span>
        </button>
        {expandedSections.search && (
          <div className={styles.content}>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.input}
            />
          </div>
        )}
      </div>

      {/* Category */}
      <div className={styles.section}>
        <button
          className={styles.header}
          onClick={() => toggleSection('category')}
        >
          <span>{t('category')}</span>
          <span className={expandedSections.category ? styles.expanded : ''}>▼</span>
        </button>
        {expandedSections.category && (
          <div className={styles.content}>
            <div className={styles.options}>
              {categories.map((cat) => (
                <label key={cat} className={styles.option}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand */}
      <div className={styles.section}>
        <button
          className={styles.header}
          onClick={() => toggleSection('brand')}
        >
          <span>Brand</span>
          <span className={expandedSections.brand ? styles.expanded : ''}>▼</span>
        </button>
        {expandedSections.brand && (
          <div className={styles.content}>
            <div className={styles.options}>
              {brands.map((brand) => (
                <label key={brand} className={styles.option}>
                  <input
                    type="checkbox"
                    value={brand}
                    checked={filters.brand === brand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className={styles.section}>
        <button
          className={styles.header}
          onClick={() => toggleSection('price')}
        >
          <span>{t('priceRange')}</span>
          <span className={expandedSections.price ? styles.expanded : ''}>▼</span>
        </button>
        {expandedSections.price && (
          <div className={styles.content}>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className={styles.priceInput}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className={styles.priceInput}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sort */}
      <div className={styles.section}>
        <button
          className={styles.header}
          onClick={() => toggleSection('sort')}
        >
          <span>{t('sort')}</span>
          <span className={expandedSections.sort ? styles.expanded : ''}>▼</span>
        </button>
        {expandedSections.sort && (
          <div className={styles.content}>
            <select
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button className={styles.reset} onClick={handleReset}>
        {t('reset')}
      </button>
    </div>
  );
}
