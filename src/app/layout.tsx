import React from 'react';
import { weddingConfig } from '../config/wedding-config';
import Watermark from '../lib/watermark';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/fonts/PlayfairDisplay-Italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/MaruBuri-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <meta name="generator" content="Wedding-Invitation" />
      </head>
      <body>
        <GlobalStyle />
        <CacheManager />
        
        {/* 노래 주소를 깃허브 배포 경로인 /wedding/bgm.mp3로 고정했습니다. */}
        <audio 
          src="/wedding/bgm.mp3?v=final" 
          autoPlay 
          loop 
          style={{ display: 'none' }} 
        />

        <Watermark />
        {children}
      </body>
    </html>
  );
}
