'use client';
import React from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const MainSection = () => {
  const { main } = weddingConfig;
  
  return (
    <Section>
      <ImageContainer>
        {/* height: auto로 설정하여 사진이 잘리지 않고 원본 비율대로 다 나옵니다 */}
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

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  width: 100%;
  /* 높이를 고정하지 않고 사진 크기에 맞춥니다 */
  height: auto; 
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto; /* 사진 원본 비율 유지 */
  object-fit: contain; /* 사진 전체가 다 보이게 설정 */
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
