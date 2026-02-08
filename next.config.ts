/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wedding',
  assetPrefix: '/wedding',
  output: 'export',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true, // 깃허브 페이지에서 이미지가 안 나오는 문제를 해결합니다.
  },
};

export default nextConfig;
