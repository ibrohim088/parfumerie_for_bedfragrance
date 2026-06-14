'use client';

import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className={styles.panel}>
      <h3>Filters</h3>

      <div className={styles.section}>
        <h4>Category</h4>
        <div className={styles.checkboxGroup}>
          {/* Category options */}
        </div>
      </div>

      <div className={styles.section}>
        <h4>Price Range</h4>
        <input
          type="range"
          min={0}
          max={1000000}
          value={filters.priceRange[1]}
          onChange={(e) => onFilterChange({
            ...filters,
            priceRange: [filters.priceRange[0], parseInt(e.target.value)],
          })}
        />
      </div>

      <div className={styles.section}>
        <h4>Sort</h4>
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      <button className={styles.reset} onClick={() => onFilterChange({})}>
        Reset Filters
      </button>
    </div>
  );
}
