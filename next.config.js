/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'launch-stack',
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: false },
};

module.exports = nextConfig;
