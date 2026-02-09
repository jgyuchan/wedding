import React from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <head><meta name="generator" content="Wedding-Invitation" /></head>
      <body>
        <GlobalStyle /><CacheManager />
        {/* [정답] bgm.mp3는 public 폴더 바로 아래에 있으므로 images를 빼야 합니다! */}
        <audio src="/wedding/bgm.mp3?v=finish" autoPlay loop style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
