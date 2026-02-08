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
        
        {/* 노래 주소를 전체 인터넷 주소로 박아넣어 경로 문제를 해결합니다. */}
        <audio 
          src="https://jgyuchan.github.io/wedding/bgm.mp3" 
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
