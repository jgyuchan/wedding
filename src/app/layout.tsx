'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // [기능 1] 화면 터치 시 노래 시작 (브라우저 정책 우회)
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            // 한 번 재생되면 이벤트 리스너 제거 (불필요한 실행 방지)
            document.removeEventListener('click', playAudio);
            document.removeEventListener('touchstart', playAudio);
          })
          .catch((e) => console.log("자동 재생 대기 중... 사용자가 터치해야 함"));
      }
    };

    // 화면 어디든 클릭하거나 터치하면 노래 시작 시도
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);

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
        
        {/* [강력해진 음악 버튼] 검은색 배경으로 변경하여 눈에 확 띄게 함 */}
        <button 
          onClick={toggleMusic}
          style={{
            position: 'fixed', 
            top: '15px', 
            right: '15px', 
            zIndex: 99999, // 제일 위에 표시
            background: 'rgba(0, 0, 0, 0.7)', // 반투명 검은색
            border: '2px solid white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '24px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
        >
          {isPlaying ? '♪' : '✕'}
        </button>

        {/* 노래 플레이어 (화면에는 안 보임) */}
        {/* 파일 경로가 맞다면 무조건 나옵니다. */}
        <audio 
          ref={audioRef}
          src="https://jgyuchan.github.io/wedding/bgm.mp3" 
          loop 
          preload="auto"
        />
        
        {children}
      </body>
    </html>
  );
}
