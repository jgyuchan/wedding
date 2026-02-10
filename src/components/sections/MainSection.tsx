'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const MainSection = () => {
  const { main } = weddingConfig;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // [기능 1] 화면 터치 시 노래 시작 (기존 유지)
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("자동 재생 대기 중"));
      }
    };
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, []);

  // [기능 2] 버튼 클릭 핸들러 (기존 유지)
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
      {/* 🎵 음악 버튼 */}
      <MusicButton onClick={toggleMusic} $isPlaying={isPlaying}>
        {isPlaying ? '🔊' : '🔇'}
      </MusicButton>

      {/* 🎵 오디오 태그 */}
      <audio 
        ref={audioRef} 
        src="/wedding/bgm.mp3" 
        loop 
        preload="auto"
      />

      <ImageContainer>
        {/* ✨ 반짝이 효과 (위치와 타이밍을 다르게 배치) */}
        <Sparkle $top={20} $left={20} $delay={0} />
        <Sparkle $top={40} $left={80} $delay={1.5} />
        <Sparkle $top={15} $left={60} $delay={3} />
        <Sparkle $top={70} $left={30} $delay={2} />
        <Sparkle $top={60} $left={85} $delay={0.5} />
        <Sparkle $top={30} $left={40} $delay={4} />

        <MainImage src={main.image} alt="Main Wedding" />
      </ImageContainer>
      
      <Content>
        {/* ✍️ 타이핑 효과 적용: "The wedding of" */}
        <GreetingWrapper>
          <Greeting>The wedding of</Greeting>
        </GreetingWrapper>
        
        <Names>
          {weddingConfig.invitation.groom.name} <span>and</span> {weddingConfig.invitation.bride.name}
        </Names>
        <DateText>{main.date}</DateText>
        <VenueText>{main.venue}</VenueText>
      </Content>
    </Section>
  );
};

// --- 스타일 및 애니메이션 정의 ---

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
`;

// 🎵 음악 버튼 애니메이션
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(226, 210, 190, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(226, 210, 190, 0); }
  100% { box-shadow: 0 0 0 0 rgba(226, 210, 190, 0); }
`;

const MusicButton = styled.button<{ $isPlaying: boolean }>`
  position: fixed;
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
  z-index: 999999;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  animation: ${props => props.$isPlaying ? 'none' : pulse} 2s infinite;
  
  &:active { transform: scale(0.95); }
`;

// ✨ 반짝이 애니메이션
const sparkleKeyframe = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
`;

const Sparkle = styled.div<{ $top: number; $left: number; $delay: number }>`
  position: absolute;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  z-index: 10;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8); // 빛 번짐 효과
  animation: ${sparkleKeyframe} 3s infinite ease-in-out;
  animation-delay: ${props => props.$delay}s;

  /* 십자가 모양 빛내기 */
  &::after, &::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    background: white;
    transform: translate(-50%, -50%);
  }
  &::after { width: 2px; height: 100%; }
  &::before { width: 100%; height: 2px; }
`;

// ✍️ 타이핑 애니메이션
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

const GreetingWrapper = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
`;

const Greeting = styled.p`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #c4a986;
  font-size: 1.3rem;
  overflow: hidden; /* 글자가 넘치면 숨김 (타이핑 효과 필수) */
  white-space: nowrap; /* 줄바꿈 방지 */
  border-right: 2px solid #c4a986; /* 커서 효과 */
  width: 0;
  /* 3.5초 동안 글자가 써지고, 커서는 0.75초마다 깜빡임 */
  animation: 
    ${typing} 3.5s steps(30, end) forwards,
    ${blink} 0.75s step-end infinite;
    
  /* 애니메이션이 끝나면 커서(border)를 없애기 위해 forwards 사용 */
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  position: relative; // 반짝이 위치 기준
  overflow: hidden; // 반짝이가 화면 밖으로 나가는 것 방지
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
