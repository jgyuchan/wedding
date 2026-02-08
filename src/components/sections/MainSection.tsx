'use client';
import React from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const MainSection = () => {
  // 에러를 일으키던 워터마크 코드를 삭제했습니다.
  const { main } = weddingConfig;
  
  return (
    <Section>
      <ImageContainer>
        <MainImage src={main.image} alt="Main Wedding" />
        <Overlay />
        <Content>
          <DateText>{main.date}</DateText>
          <Title>{main.title}</Title>
          <VenueText>{main.venue}</VenueText>
        </Content>
      </ImageContainer>
    </Section>
  );
};

const Section = styled.section` height: 100vh; width: 100%; position: relative; overflow: hidden; `;
const ImageContainer = styled.div` width: 100%; height: 100%; position: relative; `;
const MainImage = styled.img` width: 100%; height: 100%; object-fit: cover; `;
const Overlay = styled.div` position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.2); `;
const Content = styled.div` position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white; width: 100%; padding: 0 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); `;
const DateText = styled.p` font-size: 1.1rem; letter-spacing: 2px; margin-bottom: 1rem; font-family: 'Playfair Display', serif; `;
const Title = styled.h1` font-size: 3.5rem; margin-bottom: 1.5rem; font-family: 'Playfair Display', serif; font-style: italic; `;
const VenueText = styled.p` font-size: 1rem; letter-spacing: 1px; `;

export default MainSection;
