// JOYLASHTIRISH YO'LI (rout):
//   apps/admin/middleware.ts
// (mavjud middleware.ts faylini shu fayl bilan to'liq almashtiring)
//
// Eslatma: avvalgi middleware.ts fayli apps/frontend dan ko'chirilgan
// ko'rinadi — u next-intl (./i18n/routing, "uz"/"ru" locale prefikslari)
// va /account, /checkout kabi FRONTEND yo'llariga mo'ljallangan edi.
// Admin panelida:
//   - locale-based routing yo'q (app/layout.tsx da lang="uz" qattiq yozilgan),
//   - avtorizatsiya client tomonda (dashboard)/layout.tsx ichidagi
//     useAdminAuth hook orqali tekshiriladi (token localStorage'da
//     saqlanadi, middleware esa unga kira olmaydi).
// Shu sababli bu middleware hozircha hech narsani bloklamaydi/yo'naltirmaydi.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};


/*
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedPaths = [
  '/account',
  '/account/personal-info',
  '/account/orders',
  '/account/addresses',
  '/account/payment',
  '/account/notifications',
  '/account/scent-profile',
  '/checkout',
];

function isProtectedPath(pathname: string): boolean {
  const strippedPath = pathname.replace(/^\/(uz|ru)/, '') || '/';
  return protectedPaths.some(
    (path) => strippedPath === path || strippedPath.startsWith(path + '/')
  );
}

function getTokenFromRequest(request: NextRequest): string | null {
  const cookieToken = request.cookies.get('token')?.value;
  if (cookieToken) return cookieToken;

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (isProtectedPath(pathname)) {
    const token = getTokenFromRequest(request);

    if (!token) {
      const locale = pathname.startsWith('/ru') ? 'ru' : 'uz';
      const loginUrl = new URL(
        locale === 'uz' ? '/login' : '/ru/login',
        request.url
      );
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
*/