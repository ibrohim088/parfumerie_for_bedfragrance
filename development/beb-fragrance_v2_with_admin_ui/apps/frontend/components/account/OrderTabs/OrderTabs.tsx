'use client';

import styles from './OrderTabs.module.scss';
import { useState } from 'react';

interface OrderTabsProps {
  orders: any[];
}

export default function OrderTabs({ orders }: OrderTabsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Barcha buyurtmalar' },
    { id: 'pending', label: 'Jarayonda' },
    { id: 'completed', label: 'Bajarilgan' },
    { id: 'cancelled', label: 'Bekor qilingan' },
  ];

  return (
    <div className={styles.tabs}>
      <div className={styles.tabButtons}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {/* Orders list */}
      </div>
    </div>
  );
}
