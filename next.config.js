/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.app.github.dev'],
    },
  },
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['picsum.photos', 'i.pravatar.cc'], // whitelist external image domains
  },
};

module.exports = nextConfig;
