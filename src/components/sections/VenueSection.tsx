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
  
  // 지도 로딩
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);
  
  // 마커 찍기
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const loc = new window.naver.maps.LatLng(venue.coordinates.latitude, venue.coordinates.longitude);
    const map = new window.naver.maps.Map(mapRef.current, { center: loc, zoom: 17 });
    new window.naver.maps.Marker({ position: loc, map: map });
  }, [mapLoaded, venue]);

  // 네비게이션 버튼
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
      
      <MapContainer ref={mapRef} />
      
      <ButtonContainer>
        <NavButton onClick={() => nav('naver')} $color="#2DB400">네이버 지도</NavButton>
        <NavButton onClick={() => nav('kakao')} $color="#FEE500" $textColor="#000">카카오맵</NavButton>
        <NavButton onClick={() => nav('tmap')} $color="#000000">TMAP</NavButton>
      </ButtonContainer>

      <TransportInfoBox>
        {/* 1호선 부천역 출발 */}
        <TransportItem>
          <Icon>🚌</Icon>
          <TransportDetail>
            <TransportTitle>1호선 부천역에서 오실 때</TransportTitle>
            <TransportText>• 3번 출구 → 소신여객터미널에서 탑승</TransportText>
            <TransportText>• <Highlight>일반버스 3번</Highlight> 승차</TransportText>
            <TransportText>• '조마루삼거리' 하차</TransportText>
          </TransportDetail>
        </TransportItem>

        <DividerLine />

        {/* 7호선 종합운동장역 출발 */}
        <TransportItem>
          <Icon>🚌</Icon>
          <TransportDetail>
            <TransportTitle>7호선 부천종합운동장역에서 오실 때</TransportTitle>
            <TransportText>• 4번 출구 → 앞 버스정류장에서 탑승</TransportText>
            <TransportText>• <Highlight>마을버스 013-1, 013-2번</Highlight></TransportText>
            <TransportText>• <Highlight>일반버스 3, 56-1번</Highlight> 승차</TransportText>
            <TransportText>• '조마루삼거리' 하차</TransportText>
          </TransportDetail>
        </TransportItem>

        <DividerLine />

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

// --- 스타일 ---
const Section = styled.section<{ $bgColor: string }>` padding: 4rem 1.5rem; text-align: center; background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'}; `;
const Title = styled.h2` font-size: 1.5rem; font-weight: 500; margin-bottom: 1.5rem; color: #333; `;
const VenueName = styled.h3` font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem; color: #333; `;
const Address = styled.p` font-size: 1rem; color: #666; margin-bottom: 2rem; `;
const MapContainer = styled.div` width: 100%; height: 250px; margin-bottom: 1rem; border-radius: 12px; overflow: hidden; border: 1px solid #eee; `;
const ButtonContainer = styled.div` display: flex; gap: 8px; justify-content: center; margin-bottom: 2.5rem; `;
const NavButton = styled.button<{ $color: string; $textColor?: string }>` flex: 1; padding: 0.8rem 0; border: none; border-radius: 8px; background-color: ${props => props.$color}; color: ${props => props.$textColor || 'white'}; font-size: 0.9rem; font-weight: 600; cursor: pointer; `;
const TransportInfoBox = styled.div` background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.03); text-align: left; border: 1px solid #f0f0f0; `;
const TransportItem = styled.div` display: flex; align-items: flex-start; gap: 12px; `;
const Icon = styled.div` font-size: 1.6rem; line-height: 1; padding-top: 3px; `;
const TransportDetail = styled.div` flex: 1; `;
const TransportTitle = styled.h4` font-size: 1rem; font-weight: 700; color: #333; margin-bottom: 0.5rem; `;
const TransportText = styled.p` font-size: 0.95rem; color: #555; line-height: 1.8; margin-bottom: 0.2rem; `;
const Highlight = styled.span` font-weight: 600; color: #c4a986; `; // 버스 번호 강조색
const DividerLine = styled.div` height: 1px; background-color: #eee; margin: 1.2rem 0; `;

export default VenueSection;
