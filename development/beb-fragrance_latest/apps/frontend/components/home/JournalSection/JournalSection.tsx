'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useBlog } from '@/hooks/useBlog';
import styles from './JournalSection.module.scss';

export default function JournalSection() {
  const t = useTranslations('home');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const { data: articles, isLoading } = useBlog();

  const handleArticleClick = (slug: string) => {
    router.push(`/${locale}/blog/${slug}`);
  };

  if (isLoading) return null;
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('journal')}</h2>

        <div className={styles.grid}>
          {articles.map((article: any) => (
            <article
              key={article.id}
              className={styles.card}
              onClick={() => handleArticleClick(article.slug)}
            >
              <div className={styles.imageContainer}>
                {article.image && <img src={article.image} alt={article.title} />}
              </div>
              <div className={styles.content}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <a href="#" className={styles.readMore}>
                  {t('readMore')} <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
