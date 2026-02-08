import React from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <head><meta name="generator" content="Wedding-Invitation" /></head>
      <body>
        <GlobalStyle /><CacheManager />
        {/* 노래 주소를 전체 주소로 지정합니다. 터치 후 재생됩니다 */}
        <audio src="https://jgyuchan.github.io/wedding/bgm.mp3" autoPlay loop style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
