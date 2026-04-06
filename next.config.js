/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'i.vimeocdn.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
