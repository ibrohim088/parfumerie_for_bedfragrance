'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './JournalSection.module.scss';

const articles = [
  {
    id: 1,
    title: 'The Art of Fragrance Layering',
    image: 'https://via.placeholder.com/400x250?text=Article+1',
    excerpt: 'Learn how to layer fragrances for a unique scent profile.',
  },
  {
    id: 2,
    title: 'Top 5 Summer Scents',
    image: 'https://via.placeholder.com/400x250?text=Article+2',
    excerpt: 'Discover the best fragrances for the warm season.',
  },
  {
    id: 3,
    title: 'Perfume Maintenance Tips',
    image: 'https://via.placeholder.com/400x250?text=Article+3',
    excerpt: 'How to preserve your fragrance collection properly.',
  },
];

export default function JournalSection() {
  const t = useTranslations('home');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const handleArticleClick = (id: number) => {
    router.push(`/${locale}/journal/${id}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('journal')}</h2>

        <div className={styles.grid}>
          {articles.map((article) => (
            <article
              key={article.id}
              className={styles.card}
              onClick={() => handleArticleClick(article.id)}
            >
              <div className={styles.imageContainer}>
                <img src={article.image} alt={article.title} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <a href="#" className={styles.readMore}>
                  Read More <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>{t('completeYourRitual')}</h3>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter for exclusive tips and new fragrance launches.
          </p>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.subscribe}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
