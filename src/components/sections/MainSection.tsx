'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const MainSection = () => {
  const { main } = weddingConfig;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // [기능 1] 화면 터치 시 노래 시작
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("자동 재생 대기 중"));
      }
    };
    // 화면 어디든 터치하면 재생 시도
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, []);

  // [기능 2] 버튼 클릭 핸들러
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
    <Section>
      {/* 🎵 음악 플레이어 버튼 (메인 섹션 안에 직접 넣음) */}
      <MusicButton onClick={toggleMusic} $isPlaying={isPlaying}>
        {isPlaying ? '🔊' : '🔇'}
      </MusicButton>

      {/* 🎵 오디오 태그 (숨김) - 주소 직접 지정 */}
      <audio 
        ref={audioRef} 
        src="/wedding/bgm.mp3" 
        loop 
        preload="auto"
      />

      <ImageContainer>
        {/* 얼굴 잘리지 않게 height: auto 적용됨 */}
        <MainImage src={main.image} alt="Main Wedding" />
      </ImageContainer>
      
      <Content>
        <Greeting>The wedding of</Greeting>
        <Names>
          {weddingConfig.invitation.groom.name} <span>and</span> {weddingConfig.invitation.bride.name}
        </Names>
        <DateText>{main.date}</DateText>
        <VenueText>{main.venue}</VenueText>
      </Content>
    </Section>
  );
};

// --- 스타일 ---

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative; // 버튼 위치 기준점
`;

// 🎵 둥둥 떠다니는 음악 버튼 스타일
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(226, 210, 190, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(226, 210, 190, 0); }
  100% { box-shadow: 0 0 0 0 rgba(226, 210, 190, 0); }
`;

const MusicButton = styled.button<{ $isPlaying: boolean }>`
  position: fixed; // 화면에 고정
  bottom: 30px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.$isPlaying ? 'rgba(0,0,0,0.7)' : '#e2d2be'};
  color: white;
  border: 2px solid white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999999; // 무조건 맨 위
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  animation: ${props => props.$isPlaying ? 'none' : pulse} 2s infinite;
  
  &:active {
    transform: scale(0.95);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Content = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greeting = styled.p`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #c4a986;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Names = styled.h1`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
  span { font-size: 1rem; color: #888; margin: 0 5px; font-style: italic; }
`;

const DateText = styled.p` font-size: 1rem; color: #666; margin-bottom: 0.5rem; `;
const VenueText = styled.p` font-size: 1rem; color: #666; `;

export default MainSection;
