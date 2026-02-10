'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const GallerySection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  // 설정 파일에서 이미지 목록을 바로 가져옵니다.
  const images = weddingConfig.gallery.images;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <GallerySectionContainer $bgColor={bgColor}>
      <SectionTitle>갤러리</SectionTitle>
      
      {/* 무조건 그리드(바둑판) 모양으로 보여줍니다 */}
      <GalleryGridContainer>
        {images.map((image: string, index: number) => (
          <GalleryGridCard key={index} onClick={() => setSelectedImage(image)}>
            <GalleryGridImageWrapper>
              {/* 복잡한 Next/Image 대신, 일반 img 태그를 써서 에러를 원천 차단합니다 */}
              <img 
                src={image} 
                alt={`Wedding Photo ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </GalleryGridImageWrapper>
          </GalleryGridCard>
        ))}
      </GalleryGridContainer>

      {/* 사진 클릭했을 때 크게 보기 (모달) */}
      {selectedImage && (
        <ExpandedImageOverlay onClick={() => setSelectedImage(null)}>
          <ExpandedImageContainer onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Full size" 
              style={{ maxWidth: '95vw', maxHeight: '90vh', objectFit: 'contain' }}
            />
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
          </ExpandedImageContainer>
        </ExpandedImageOverlay>
      )}
    </GallerySectionContainer>
  );
};

// --- 스타일 컴포넌트 (디자인 유지) ---

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
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #e2d2be;
  }
`;

const GalleryGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 한 줄에 3개
  gap: 0.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const GalleryGridCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1; // 정사각형 유지
  
  &:hover {
    opacity: 0.9;
  }
`;

const GalleryGridImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ExpandedImageOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandedImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
`;

export default GallerySection;
