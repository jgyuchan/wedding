import React from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <head><meta name="generator" content="Wedding-Invitation" /></head>
      <body>
        <GlobalStyle /><CacheManager />
        {/* bgm.mp3는 public 폴더 바로 아래에 있으므로 이 주소가 맞습니다 */}
        <audio src="https://jgyuchan.github.io/wedding/bgm.mp3" autoPlay loop style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
