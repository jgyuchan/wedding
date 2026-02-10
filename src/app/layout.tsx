'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // [기능 1] 화면 터치 시 노래 시작 시도
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            // 재생 성공하면 이벤트 제거
            document.removeEventListener('click', playAudio);
            document.removeEventListener('touchstart', playAudio);
          })
          .catch((e) => console.log("자동 재생 막힘: 버튼을 눌러주세요"));
      }
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  // [기능 2] 버튼 클릭 시 끄고 켜기
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
        
        {/* [위치 변경] 오른쪽 아래에 고정 (이제 안 가려집니다) */}
        <div
          onClick={toggleMusic}
          style={{
            position: 'fixed', 
            bottom: '30px',  // 바닥에서 30px 위
            right: '20px',   // 오른쪽에서 20px 안쪽
            zIndex: 99999,   // 무조건 제일 위에
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 15px',
            borderRadius: '30px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontSize: '14px',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <span style={{ fontSize: '18px' }}>{isPlaying ? '🔊' : '🔇'}</span>
          <span>{isPlaying ? 'BGM ON' : 'BGM OFF'}</span>
        </div>

        {/* 오디오 플레이어 (풀주소 사용) */}
        <audio 
          ref={audioRef}
          src="https://jgyuchan.github.io/wedding/bgm.mp3?v=final_fix" 
          loop 
          preload="auto"
        />
        
        {children}
      </body>
    </html>
  );
}
