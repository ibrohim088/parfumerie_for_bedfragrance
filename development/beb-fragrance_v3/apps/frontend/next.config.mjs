import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/config.ts');

const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'bebfragrance.uz' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/:path*`,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
    return config;
  },
  compress: true,
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
