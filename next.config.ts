/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 깃허브 저장소 이름(/wedding)을 경로에 추가합니다.
  basePath: '/wedding',
  assetPrefix: '/wedding',
  
  // 2. 깃허브용 정적 배출 설정
  output: 'export',
  
  compiler: {
    styledComponents: true,
  },
  
  images: {
    // 3. 깃허브 페이지에서는 이미지 최적화를 지원하지 않으므로 끕니다.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://jgyuchan.github.io/wedding',
  },
  
  // 캐시 정책 설정 (기존 내용 유지)
  async headers() {
    return [
      {
        source: '/',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
