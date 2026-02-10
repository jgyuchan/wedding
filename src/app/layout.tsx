'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 화면 터치 시 재생 시도
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("자동 재생 대기 중"));
      }
    };
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);
    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <html lang="ko">
      <head>
        <meta name="generator" content="Wedding-Invitation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <GlobalStyle /><CacheManager />
        
        {/* [강제 노출] 화면 하단에 고정된 뮤직 컨트롤러 */}
        <div 
          onClick={toggleMusic}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)', // 정중앙 정렬
            zIndex: 999999, // 그 어떤 것보다 위에
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // 진한 검정
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            cursor: 'pointer',
            border: '2px solid white',
            width: 'max-content' // 내용물만큼만 크기 차지
          }}
        >
          <span style={{ fontSize: '20px' }}>{isPlaying ? '🔊' : '🔇'}</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {isPlaying ? '노래 끄기' : '노래 켜기 (터치)'}
          </span>
        </div>

        {/* 오디오 태그: 버전(?v=real_final)을 바꿔서 강제로 새로 읽게 함 */}
        <audio 
          ref={audioRef}
          src="https://jgyuchan.github.io/wedding/bgm.mp3?v=real_final" 
          loop 
          preload="auto"
        />

        {children}
      </body>
    </html>
  );
}
