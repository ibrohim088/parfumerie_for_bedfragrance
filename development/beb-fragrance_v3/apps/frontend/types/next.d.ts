// ============================================
// NEXT.JS TYPE EXTENSIONS
// ============================================

import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Next.js specific
      NEXT_PUBLIC_BUILD_ID?: string;
      NEXT_PUBLIC_BUILD_TIME?: string;
      NEXT_PUBLIC_VERSION?: string;
    }
  }
}

// ============================================
// PAGE PROPS WITH LAYOUT
// ============================================

export interface PageProps {
  locale?: string;
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}

export interface PagePropsWithLayout extends PageProps {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
}

// ============================================
// SERVER-SIDE RENDERING TYPES
// ============================================

export interface SSRPageProps {
  locale: string;
  params: Record<string, string>;
}

export type GetSSRProps<T = any> = GetServerSideProps<T & SSRPageProps>;

export interface StaticPageProps {
  locale: string;
  slug: string;
}

export type GetStaticPageProps<T = any> = GetStaticProps<T & StaticPageProps>;

// ============================================
// METADATA TYPES
// ============================================

export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  imageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterCreator?: string;
  openGraphType?: 'website' | 'article' | 'product' | 'book' | 'profile';
  canonicalUrl?: string;
  robots?: string;
  language?: string;
  locale?: string;
  alternateLocales?: string[];
}

export interface LocalizedMetadata {
  uz: PageMetadata;
  ru: PageMetadata;
}

// ============================================
// API ROUTE TYPES
// ============================================

import type { NextApiRequest, NextApiResponse } from 'next';

export type NextApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>) => void | Promise<void>;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
  path?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    details?: Record<string, any>;
  };
  timestamp: string;
  path?: string;
}

export interface ApiPaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ============================================
// MIDDLEWARE TYPES
// ============================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type MiddlewareHandler = (request: NextRequest) => NextResponse | void | Promise<NextResponse | void>;

export interface MiddlewareConfig {
  matcher: (string | RegExp)[];
}

// ============================================
// ROUTE HANDLER TYPES (App Router)
// ============================================

export type RouteHandler<T = any> = (
  request: Request,
  context: {
    params: Record<string, string | string[]>;
  }
) => Response | Promise<Response>;

export type RouteHandlerMethods = {
  GET?: RouteHandler;
  POST?: RouteHandler;
  PUT?: RouteHandler;
  PATCH?: RouteHandler;
  DELETE?: RouteHandler;
  HEAD?: RouteHandler;
  OPTIONS?: RouteHandler;
};

// ============================================
// IMAGE OPTIMIZATION TYPES
// ============================================

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  responsive?: boolean;
}

// ============================================
// FONT TYPES
// ============================================

export interface FontConfig {
  variable: string;
  weight?: string[];
  style?: string[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

// ============================================
// REDIRECT & REWRITE TYPES
// ============================================

export interface RedirectRule {
  source: string;
  destination: string;
  permanent?: boolean;
}

export interface RewriteRule {
  source: string;
  destination: string;
}

export interface HeaderRule {
  source: string;
  headers: Array<{
    key: string;
    value: string;
  }>;
}

// ============================================
// BUILD OUTPUT TYPES
// ============================================

export interface BuildInfo {
  buildId: string;
  buildTime: number;
  env: 'development' | 'staging' | 'production';
  version: string;
  commitHash?: string;
  commitMessage?: string;
}

export interface BuildManifest {
  version: '1';
  pages: Record<string, string[]>;
  ampFirst: boolean;
  ampFirstPages: string[];
}

// ============================================
// WEBPACK CONFIG TYPES
// ============================================

export interface WebpackConfig {
  dev: boolean;
  isServer: boolean;
  config: any;
}

export type WebpackConfigBuilder = (config: any, options: any) => any;

// ============================================
// NEXT.JS CONFIG TYPES
// ============================================

export interface NextConfig {
  reactStrictMode?: boolean;
  swcMinify?: boolean;
  compress?: boolean;
  poweredByHeader?: boolean;
  productionBrowserSourceMaps?: boolean;
  optimizeFonts?: boolean;
  optimizeImages?: boolean;
  experimental?: {
    esmExternals?: boolean;
    isrMemoryCacheSize?: number;
  };
  env?: Record<string, string>;
  publicRuntimeConfig?: Record<string, any>;
  serverRuntimeConfig?: Record<string, any>;
}

// ============================================
// ISR TYPES
// ============================================

export interface ISRConfig {
  revalidate: number | boolean;
  unstable_priority?: boolean;
}

export type RevalidateType = number | ISRConfig;

// ============================================
// ANALYTICS & MONITORING
// ============================================

export interface PerformanceMetric {
  name: string;
  value: number;
  label?: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

export interface WebVital extends PerformanceMetric {
  id: string;
  delta: number;
}

export interface PageSpeedMetric {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
}

// ============================================
// ERROR HANDLING
// ============================================

export class NextError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'NextError';
  }
}

export class NotFoundError extends NextError {
  constructor(message: string = 'Not found') {
    super(404, message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends NextError {
  constructor(message: string = 'Internal server error') {
    super(500, message, 'INTERNAL_SERVER_ERROR');
    this.name = 'InternalServerError';
  }
}

// ============================================
// DEPLOYMENT TYPES
// ============================================

export interface DeploymentConfig {
  provider: 'vercel' | 'netlify' | 'docker' | 'self-hosted';
  environment: 'staging' | 'production';
  region?: string;
  caching?: {
    defaultTtl: number;
    maxTtl: number;
    staleWhileRevalidate: number;
  };
}
