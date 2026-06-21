'use client';

import { useTranslations } from 'next-intl';
import { useBlog } from '@/hooks/useBlog';
import { Calendar, User, ArrowRight } from 'lucide-react';
import styles from './page.module.scss';

export default function BlogPage() {
  const t = useTranslations('navigation');
  const tc = useTranslations('common');
  const { data: posts, isLoading, error } = useBlog();

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('blog')}</h1>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>{tc('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('blog')}</h1>
          <div className={styles.error}>
            <p>{tc('loadErrorBlog')} {tc('tryAgainLater')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('blog')}</h1>
        <p className={styles.subtitle}>{tc('blogSubtitle')}</p>

        {posts && posts.length > 0 ? (
          <div className={styles.grid}>
            {posts.map((post: any) => (
              <article key={post.id} className={styles.card}>
                {post.image && (
                  <img src={post.image} alt={post.title} className={styles.image} />
                )}
                <div className={styles.placeholder} />
                <div className={styles.content}>
                  {post.category && <span className={styles.category}>{post.category}</span>}
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDescription}>{post.excerpt || post.description}</p>
                  <div className={styles.meta}>
                    {post.date && (
                      <span className={styles.date}>
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    )}
                    {post.author && (
                      <span className={styles.author}>
                        <User size={14} />
                        {post.author}
                      </span>
                    )}
                  </div>
                  <button className={styles.readMore}>
                    {tc('readMore')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>{tc('noBlogPosts')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
