/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wedding',
  assetPrefix: '/wedding',
  output: 'export',
  compiler: { styledComponents: true },
  images: { unoptimized: true }, // 정적 사이트 이미지 최적화 끄기
};
export default nextConfig;
