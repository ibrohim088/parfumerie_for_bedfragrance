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

  // Static fayllar va API ga middleware qo'llanilmaydi
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Himoyalangan yo'llar uchun auth tekshiruvi
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
    '/((?!_next/static|_next/image|favicon.ico|icons|images|fonts|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};