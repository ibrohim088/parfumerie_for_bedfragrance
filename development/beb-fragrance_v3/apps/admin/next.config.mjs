import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/config.ts');

const nextConfig = {
  // SCSS Modules
  sassOptions: {
    includePaths: ['./styles'],
  },

  // Rasm domenlarini ruxsat berish
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'bebfragrance.uz',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Standalone output (Docker uchun)
  output: 'standalone',

  // Xavfsizlik headerlari
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Backend API ga redirect
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/:path*`,
      },
    ];
  },

  // Webpack konfiguratsiyasi
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // TypeScript va ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Compress
  compress: true,

  // Powered by headerini o'chirish
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
