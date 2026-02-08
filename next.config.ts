/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wedding',
  assetPrefix: '/wedding',
  output: 'export',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
