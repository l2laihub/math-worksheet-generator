import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Next.js 16: externalize server-only packages from bundling
  serverExternalPackages: ['pdfkit', 'fontkit', 'png-js', 'brotli'],

  // Disable Turbopack to avoid WSL path resolution issues
  // turbopack: {},

  // Enable better Netlify support
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
