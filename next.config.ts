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

  // Turbopack configuration (empty config to acknowledge we're using Turbopack)
  turbopack: {},
};

export default nextConfig;
