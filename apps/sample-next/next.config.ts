import nextPwa from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

const withPWA = nextPwa({
  dest: 'public',
  register: false,
});

export default withPWA(nextConfig);
