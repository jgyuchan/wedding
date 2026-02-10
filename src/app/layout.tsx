'use client'; // 이 줄이 있어야 터치 기능을 쓸 수 있습니다!

import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // [기능 1] 화면 터치 시 노래 시작
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log("자동 재생 막힘(정상): 사용자가 버튼을 눌러야 함"));
      }
    };

    // 화면 어디든 클릭하거나 터치하면 노래 시작 시도
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('touchstart', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  // [기능 2] 음악 끄기/켜기 버튼 기능
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버튼 누를 때는 다른 터치 이벤트 방지
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
        
        {/* 우측 상단 음악 버튼 (항상 떠있음) */}
        <button 
          onClick={toggleMusic}
          style={{
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e2d2be',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>

        {/* 노래 플레이어 (화면에는 안 보임) */}
        <audio 
          ref={audioRef}
          src="https://jgyuchan.github.io/wedding/bgm.mp3?v=music_fix" 
          loop 
        />
        
        {children}
      </body>
    </html>
  );
}
