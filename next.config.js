/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'launch-stack.srvr.site',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
