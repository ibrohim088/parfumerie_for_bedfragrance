'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <div className={styles.mobileMenu}>
      <ul className={styles.menu}>
        <li>
          <Link href={`/${locale}`} onClick={onClose}>
            {t('home')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/catalog`} onClick={onClose}>
            {t('catalog')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/gift-box`} onClick={onClose}>
            {t('giftBox')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/about`} onClick={onClose}>
            {t('about')}
          </Link>
        </li>
      </ul>
    </div>
  );
}
