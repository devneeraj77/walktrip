/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://jsgdst-3000.csb.app/",
        "*.local-origin.dev",
        "*.app.github.dev",
        "*.csb.app",
      ],
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

module.exports = nextConfig;
