'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const GallerySection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const images = weddingConfig.gallery.images;
  // 선택된 이미지의 주소 대신 '인덱스(번호)'를 저장합니다.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 이전 사진 보기
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // 배경 클릭 닫기 방지
    if (selectedIndex !== null) {
      // 0번에서 이전으로 가면 마지막 사진으로 보냄
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  // 다음 사진 보기
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
       // 마지막에서 다음으로 가면 0번 사진으로 보냄
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <GallerySectionContainer $bgColor={bgColor}>
      <SectionTitle>갤러리</SectionTitle>
      
      <GalleryGridContainer>
        {images.map((image: string, index: number) => (
          // 클릭 시 해당 사진의 '번호(index)'를 저장
          <GalleryGridCard key={index} onClick={() => setSelectedIndex(index)}>
            <GalleryGridImageWrapper>
              <img 
                src={image} 
                alt={`Wedding Photo ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </GalleryGridImageWrapper>
          </GalleryGridCard>
        ))}
      </GalleryGridContainer>

      {/* 확대 보기 모달 (selectedIndex가 숫자인 경우에만 표시) */}
      {selectedIndex !== null && (
        <ExpandedImageOverlay onClick={() => setSelectedIndex(null)}>
          <ExpandedImageContainer onClick={e => e.stopPropagation()}>
            
            {/* ⬅️ 왼쪽 화살표 버튼 */}
            <NavButton $position="left" onClick={showPrev}>〈</NavButton>
            
            <img 
              src={images[selectedIndex]} // 현재 번호의 사진을 보여줌
              alt="Full size" 
              style={{ maxWidth: '95vw', maxHeight: '80vh', objectFit: 'contain' }}
            />

            {/* ➡️ 오른쪽 화살표 버튼 */}
            <NavButton $position="right" onClick={showNext}>〉</NavButton>
            
            <CloseButton onClick={() => setSelectedIndex(null)}>×</CloseButton>
          </ExpandedImageContainer>
        </ExpandedImageOverlay>
      )}
    </GallerySectionContainer>
  );
};

// --- 스타일 ---
// (기존 스타일 유지 및 NavButton 추가)

const GallerySectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.5rem;
  &::after {
    content: '';
    position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%);
    width: 6px; height: 6px; border-radius: 50%; background-color: #e2d2be;
  }
`;

const GalleryGridContainer = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
  max-width: 800px; margin: 0 auto;
`;

const GalleryGridCard = styled.div`
  border-radius: 4px; overflow: hidden; cursor: pointer; position: relative; aspect-ratio: 1;
  &:hover { opacity: 0.9; }
`;

const GalleryGridImageWrapper = styled.div` width: 100%; height: 100%; `;

const ExpandedImageOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.95); z-index: 2000;
  display: flex; align-items: center; justify-content: center;
`;

const ExpandedImageContainer = styled.div`
  position: relative; display: flex; justify-content: center; align-items: center;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute; top: -3rem; right: 1rem;
  background: none; border: none; color: white; font-size: 2.5rem; cursor: pointer;
`;

// 🆕 좌우 이동 버튼 스타일
const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$position === 'left' ? 'left: 10px;' : 'right: 10px;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px; height: 50px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  z-index: 2001;
  &:hover { background: rgba(255, 255, 255, 0.4); }
`;

export default GallerySection;
