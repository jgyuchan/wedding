'use client';

import React from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const MainSection = () => {
  const { main } = weddingConfig;
  
  return (
    <Section>
      <ImageArea>
        {/* 사진 크기를 화면의 60% 정도로 줄이고, 꽉 차게 조절 */}
        <MainImage src={main.image} alt="Main Wedding" />
      </ImageArea>
      
      <TextArea>
        {/* 글씨 색상을 검정 계열로 변경 (흰 배경 위니까) */}
        <Greeting>The wedding of</Greeting>
        <Names>
          {weddingConfig.invitation.groom.name} <span>and</span> {weddingConfig.invitation.bride.name}
        </Names>
        <DateText>{main.date}</DateText>
        <VenueText>{main.venue}</VenueText>
      </TextArea>
    </Section>
  );
};

// 전체 섹션: 세로로 배치
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff; // 배경 흰색
`;

// 사진 영역
const ImageArea = styled.div`
  width: 100%;
  height: 60vh; // 화면 높이의 60%만 차지하게 줄임 (요청 반영)
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 사진 비율 유지하면서 꽉 채우기
  object-position: center top; // 인물 얼굴 위주로 보이게
`;

// 글씨 영역 (사진 아래)
const TextArea = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Greeting = styled.p`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #e2d2be; // 베이지색 포인트
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Names = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
  span {
    font-size: 0.9rem;
    font-style: italic;
    color: #888;
    margin: 0 5px;
  }
`;

const DateText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const VenueText = styled.p`
  font-size: 1rem;
  color: #555;
`;

export default MainSection;
