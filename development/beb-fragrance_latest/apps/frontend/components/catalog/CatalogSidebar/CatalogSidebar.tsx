'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { User, Tag, FlaskConical, Sparkles, Wallet, Search, ArrowUpDown } from 'lucide-react';
import { MIN_PRICE, MAX_PRICE } from '@/lib/constants';
import styles from './CatalogSidebar.module.scss';

export interface FiltersType {
  search: string;
  brand: string;
  gender: string;
  family: string[];
  concentration: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface CatalogSidebarProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

const BRANDS = [
  'BEB Exclusive',
  'BEB Collection',
  'Byredo',
  'Creed',
  'Diptyque',
  'Le Labo',
  'Nishane',
  'Xerjoff',
  'Amouage',
  'Tom Ford',
  'Maison Margiela',
  'Frederic Malle',
];

const VISIBLE_BRANDS_COUNT = 4;
const CONCENTRATIONS = ['parfum', 'edp', 'edt', 'edc'];

export default function CatalogSidebar({ filters, onChange }: CatalogSidebarProps) {
  const t = useTranslations('products');

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [expanded, setExpanded] = useState({
    search: true,
    gender: true,
    brand: true,
    family: true,
    concentration: true,
    price: true,
    sort: true,
  });

  const toggle = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleBrands = showAllBrands ? BRANDS : BRANDS.slice(0, VISIBLE_BRANDS_COUNT);
  const hiddenCount = BRANDS.length - VISIBLE_BRANDS_COUNT;

  const familyOptions = [
    { value: 'floral',    label: t('familyFloral') },
    { value: 'woody',     label: t('familyWoody') },
    { value: 'oriental',  label: t('familyOriental') },
    { value: 'citrus',    label: t('familyCitrus') },
    { value: 'fruity',    label: t('familyFruity') },
  ];

  const handleGenderChange = (value: string) => {
    onChange({ ...filters, gender: filters.gender === value ? '' : value });
  };

  const handleBrandChange = (value: string) => {
    onChange({ ...filters, brand: filters.brand === value ? '' : value });
  };

  const handleFamilyToggle = (value: string) => {
    const next = filters.family.includes(value)
      ? filters.family.filter((f) => f !== value)
      : [...filters.family, value];
    onChange({ ...filters, family: next });
  };

  const handleConcentrationChange = (value: string) => {
    onChange({ ...filters, concentration: filters.concentration === value ? '' : value });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    onChange({ ...filters, [type === 'min' ? 'minPrice' : 'maxPrice']: value });
  };

  const handleSliderChange = (value: string) => {
    onChange({ ...filters, maxPrice: value });
  };

  const handleSortChange = (value: string) => {
    onChange({ ...filters, sort: value });
  };

  const handleClearAll = () => {
    onChange({
      search: '',
      brand: '',
      gender: '',
      family: [],
      concentration: '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
    });
  };

  const sliderValue = filters.maxPrice ? Number(filters.maxPrice) : MAX_PRICE;

  return (
    <div className={styles.sidebar}>

      {/* Header */}
      <div className={styles.heading}>
        <h2 className={styles.title}>{t('filters')}</h2>
        <button className={styles.clearAll} onClick={handleClearAll}>
          {t('clearAll')}
        </button>
      </div>
      <p className={styles.subtitle}>{t('refineSelection')}</p>

      {/* Search */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('search')}>
          <span className={styles.sectionLabel}>
            <Search size={13} />
            Search
          </span>
          <span className={`${styles.chevron} ${expanded.search ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.search && (
          <div className={styles.content}>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className={styles.input}
            />
          </div>
        )}
      </div>

      {/* Gender */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('gender')}>
          <span className={styles.sectionLabel}>
            <User size={13} />
            {t('gender')}
          </span>
          <span className={`${styles.chevron} ${expanded.gender ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.gender && (
          <div className={styles.content}>
            <div className={styles.options}>
              {[
                { value: 'men',    label: t('genderMen') },
                { value: 'women',  label: t('genderWomen') },
                { value: 'unisex', label: t('genderUnisex') },
              ].map((opt) => (
                <label key={opt.value} className={styles.option}>
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === opt.value}
                    onChange={() => handleGenderChange(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('brand')}>
          <span className={styles.sectionLabel}>
            <Tag size={13} />
            {t('brand')}
          </span>
          <span className={`${styles.chevron} ${expanded.brand ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.brand && (
          <div className={styles.content}>
            <div className={styles.options}>
              {visibleBrands.map((brand) => (
                <label key={brand} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={filters.brand === brand}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
            {hiddenCount > 0 && (
              <button
                className={styles.showMore}
                onClick={() => setShowAllBrands((prev) => !prev)}
              >
                {showAllBrands ? t('showLess') : `+ ${t('showMore')} ${hiddenCount}`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Fragrance Family */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('family')}>
          <span className={styles.sectionLabel}>
            <Sparkles size={13} />
            {t('fragranceFamily')}
          </span>
          <span className={`${styles.chevron} ${expanded.family ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.family && (
          <div className={styles.content}>
            <div className={styles.options}>
              {familyOptions.map((opt) => (
                <label key={opt.value} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={filters.family.includes(opt.value)}
                    onChange={() => handleFamilyToggle(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Concentration */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('concentration')}>
          <span className={styles.sectionLabel}>
            <FlaskConical size={13} />
            {t('concentration')}
          </span>
          <span className={`${styles.chevron} ${expanded.concentration ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.concentration && (
          <div className={styles.content}>
            <div className={styles.concentrationGroup}>
              {CONCENTRATIONS.map((c) => (
                <button
                  key={c}
                  className={`${styles.concentrationBtn} ${filters.concentration === c ? styles.active : ''}`}
                  onClick={() => handleConcentrationChange(c)}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('price')}>
          <span className={styles.sectionLabel}>
            <Wallet size={13} />
            {t('priceRange')}
          </span>
          <span className={`${styles.chevron} ${expanded.price ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.price && (
          <div className={styles.content}>
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10000}
              value={sliderValue}
              onChange={(e) => handleSliderChange(e.target.value)}
              className={styles.slider}
            />
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className={styles.priceInput}
              />
              <span>—</span>
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
        <button className={styles.sectionHeader} onClick={() => toggle('sort')}>
          <span className={styles.sectionLabel}>
            <ArrowUpDown size={13} />
            {t('sort')}
          </span>
          <span className={`${styles.chevron} ${expanded.sort ? styles.open : ''}`}>▼</span>
        </button>
        {expanded.sort && (
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

    </div>
  );
}