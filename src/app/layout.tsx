import React from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <head>
        <meta name="generator" content="Wedding-Invitation" />
      </head>
      <body>
        <GlobalStyle />
        <CacheManager />
        {/* 노래 주소를 전체 주소로 지정하여 경로 문제를 원천 해결합니다. */}
        <audio 
          src="https://jgyuchan.github.io/wedding/bgm.mp3" 
          autoPlay 
          loop 
          style={{ display: 'none' }} 
        />
        {children}
      </body>
    </html>
  );
}
