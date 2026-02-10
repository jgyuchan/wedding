'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

// 네이버 지도 타입 선언
declare global { interface Window { naver: any; } }

const VenueSection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { venue } = weddingConfig;
  
  // 지도 로딩 (규찬님 기존 코드 유지)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);
  
  // 마커 찍기 (규찬님 기존 코드 유지)
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const loc = new window.naver.maps.LatLng(venue.coordinates.latitude, venue.coordinates.longitude);
    const map = new window.naver.maps.Map(mapRef.current, { center: loc, zoom: 17 });
    new window.naver.maps.Marker({ position: loc, map: map });
  }, [mapLoaded, venue]);

  // 네비게이션 버튼 (규찬님 기존 코드 유지)
  const nav = (t: 'naver' | 'kakao' | 'tmap') => {
    const { latitude: la, longitude: lo } = venue.coordinates;
    const sName = encodeURIComponent(venue.name);
    if (t === 'naver') window.open(`https://map.naver.com/v5/search/${sName}?c=${lo},${la},15,0,0,0,dh`, '_blank');
    if (t === 'kakao') window.open(`https://map.kakao.com/link/to/${sName},${la},${lo}`, '_blank');
    if (t === 'tmap') window.location.href = `tmap://route?goalname=${sName}&goaly=${la}&goalx=${lo}`;
  };
  
  return (
    <Section $bgColor={bgColor}>
      <Title>오시는 길</Title>
      <VenueName>{venue.displayName}</VenueName>
      <Address>{venue.address}</Address>
      
      {/* 지도 영역 */}
      <MapContainer ref={mapRef} />
      
      {/* 네비게이션 버튼들 */}
      <ButtonContainer>
        <NavButton onClick={() => nav('naver')} $color="#2DB400">네이버 지도</NavButton>
        <NavButton onClick={() => nav('kakao')} $color="#FEE500" $textColor="#000">카카오맵</NavButton>
        <NavButton onClick={() => nav('tmap')} $color="#000000">TMAP</NavButton>
      </ButtonContainer>

      {/* 👇 여기서부터 디자인 업그레이드 (교통 정보) */}
      <TransportInfoBox>
        
        {/* 지하철 */}
        <TransportItem>
          <Icon>🚇</Icon>
          <TransportDetail>
            <TransportTitle>지하철 이용 시</TransportTitle>
            {venue.transportation.subway.split('\n').map((line: string, i: number) => (
              <TransportText key={i}>{line}</TransportText>
            ))}
          </TransportDetail>
        </TransportItem>

        <Divider />

        {/* 버스 (정렬 문제 해결!) */}
        <TransportItem>
          <Icon>🚌</Icon>
          <TransportDetail>
            <TransportTitle>버스 이용 시</TransportTitle>
            {venue.transportation.bus.split('\n').map((line: string, i: number) => (
              <TransportText 
                key={i} 
                // '○'나 '·'로 시작하면 들여쓰기를 해서 줄을 맞춥니다
                $isBullet={line.trim().startsWith('○') || line.trim().startsWith('·')}
              >
                {line}
              </TransportText>
            ))}
          </TransportDetail>
        </TransportItem>

        <Divider />

        {/* 주차 */}
        <TransportItem>
          <Icon>🅿️</Icon>
          <TransportDetail>
            <TransportTitle>주차 안내</TransportTitle>
            <TransportText>{venue.parking}</TransportText>
          </TransportDetail>
        </TransportItem>

      </TransportInfoBox>
    </Section>
  );
};

// --- 스타일 컴포넌트 ---

const Section = styled.section<{ $bgColor: string }>`
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const Title = styled.h2`
  font-size: 1.5rem; font-weight: 500; margin-bottom: 1.5rem; color: #333;
`;

const VenueName = styled.h3`
  font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem; color: #333;
`;

const Address = styled.p`
  font-size: 1rem; color: #666; margin-bottom: 2rem;
`;

const MapContainer = styled.div`
  width: 100%; height: 250px; margin-bottom: 1rem; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee;
`;

const ButtonContainer = styled.div`
  display: flex; gap: 8px; justify-content: center; margin-bottom: 2.5rem;
`;

const NavButton = styled.button<{ $color: string; $textColor?: string }>`
  flex: 1;
  padding: 0.8rem 0;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$color};
  color: ${props => props.$textColor || 'white'};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

// 🚌 교통 정보 박스 스타일
const TransportInfoBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.03);
  text-align: left;
  border: 1px solid #f0f0f0;
`;

const TransportItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Icon = styled.div`
  font-size: 1.6rem;
  line-height: 1;
  padding-top: 3px;
`;

const TransportDetail = styled.div`
  flex: 1;
`;

const TransportTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const TransportText = styled.p<{ $isBullet?: boolean }>`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.2rem;
  /* 들여쓰기 마법: 특수문자로 시작하면 내어쓰기(text-indent)를 해서 줄을 맞춤 */
  padding-left: ${props => props.$isBullet ? '0.8rem' : '0'};
  text-indent: ${props => props.$isBullet ? '-0.8rem' : '0'};
`;

const Divider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 1.2rem 0;
`;

export default VenueSection;
