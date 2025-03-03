import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
