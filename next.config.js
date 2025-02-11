/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Use SWC for faster builds
  experimental: {
    // Remove forceSwcTransforms since we're using default Next.js config
    swcMinify: true
  },
  // This will allow you to import your React components
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  // Add this if you're using images
  images: {
    domains: ['your-domain.com'],
  }
}

module.exports = nextConfig 