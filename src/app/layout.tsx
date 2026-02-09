import React from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <head><meta name="generator" content="Wedding-Invitation" /></head>
      <body>
        <GlobalStyle /><CacheManager />
        {/* [무적 치트키] 노래 경로도 인터넷 전체 주소로 변경 */}
        <audio src="https://jgyuchan.github.io/wedding/bgm.mp3" autoPlay loop style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
