'use client';

import { Heart, Bookmark } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './InstagramSection.module.scss';

export default function InstagramSection() {
  const t = useTranslations('home');

  const instagramPosts = [
    { id: 1, image: 'https://via.placeholder.com/300x300?text=Post+1' },
    { id: 2, image: 'https://via.placeholder.com/300x300?text=Post+2' },
    { id: 3, image: 'https://via.placeholder.com/300x300?text=Post+3' },
    { id: 4, image: 'https://via.placeholder.com/300x300?text=Post+4' },
    { id: 5, image: 'https://via.placeholder.com/300x300?text=Post+5' },
    { id: 6, image: 'https://via.placeholder.com/300x300?text=Post+6' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('seeOnInstagram')}</h2>

        <div className={styles.grid}>
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/bebfragrance"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.postItem}
            >
              <img src={post.image} alt={`Instagram post ${post.id}`} />
              <div className={styles.overlay}>
                <span className={styles.icon}>
                  <Heart size={18} fill="currentColor" />
                  <Bookmark size={18} style={{ marginLeft: '8px' }} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <a
            href="https://instagram.com/bebfragrance"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followButton}
          >
            FOLLOW @BEBFRAGRANCE
          </a>
        </div>
      </div>
    </section>
  );
}
