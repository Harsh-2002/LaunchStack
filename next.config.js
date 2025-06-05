/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'launch-stack',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: false },
};

module.exports = nextConfig;
