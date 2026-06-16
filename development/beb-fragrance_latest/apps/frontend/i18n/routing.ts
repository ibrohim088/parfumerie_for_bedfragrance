import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['uz', 'ru'],
  defaultLocale: 'uz',
  pathPrefix: undefined,
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 31536000,
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
