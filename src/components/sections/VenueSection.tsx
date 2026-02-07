'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

declare global {
  interface Window {
    naver: any;
  }
}

const formatTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

interface VenueSectionProps {
  bgColor?: 'white' | 'beige';
}

const VenueSection = ({ bgColor = 'white' }: VenueSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  useEffect(() => {
    const loadNaverMapScript = () => {
      if (window.naver && window.naver.maps) {
        setMapLoaded(true);
        return;
      }
      
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => setMapError(true);
      document.head.appendChild(script);

      setTimeout(() => {
        if (document.querySelector('div[style*="position: absolute; z-index: 100000000"]')) {
          setMapError(true);
        }
      }, 3000);
    };

    loadNaverMapScript();
    return () => { if (mapRef.current) mapRef.current.innerHTML = ''; };
  }, []);
  
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapError) return;
    
    const initMap = () => {
      try {
        const venueLocation = new window.naver.maps.LatLng(
          weddingConfig.venue.coordinates.latitude, 
          weddingConfig.venue.coordinates.longitude
        );
        
        const map = new window.naver.maps.Map(mapRef.current, {
          center: venueLocation,
          zoom: parseInt(weddingConfig.venue.mapZoom, 10) || 15,
          zoomControl: true,
        });
        
        const marker = new window.naver.maps.Marker({
          position: venueLocation,
          map: map
        });
        
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:10px;min-width:150px;text-align:center;font-size:14px;"><strong>${weddingConfig.venue.name}</strong></div>`
        });
        
        infoWindow.open(map, marker);
      } catch (error) {
        setMapError(true);
      }
    };
    
    initMap();
  }, [mapLoaded, mapError]);

  // 지도 버튼 주소 (가장 확실한 목적지 전달 방식)
  const navigateToNaver = () => {
    const { latitude, longitude } = weddingConfig.venue.coordinates;
    const name = encodeURIComponent(weddingConfig.venue.name);
    // 앱과 웹 모두 지원하는 범용 검색 URL로 교체
    window.open(`https://map.naver.com/v5/search/${name}?c=${longitude},${latitude},15,0,0,0,dh`, '_blank');
  };
  
  const navigateToKakao = () => {
    const { latitude, longitude } = weddingConfig.venue.coordinates;
    const name = encodeURIComponent(weddingConfig.venue.name);
    window.open(`https://map.kakao.com/link/to/${name},${latitude},${longitude}`, '_blank');
  };
  
  const navigateToTmap = () => {
    const { latitude, longitude } = weddingConfig.venue.coordinates;
    const name = encodeURIComponent(weddingConfig.venue.name);
    // 티맵 앱 실행을 위한 딥링크
    window.location.href = `tmap://route?goalname=${name}&goaly=${latitude}&goalx=${longitude}`;
    setTimeout(() => { if(!document.hidden) window.location.href = 'https://tmap.co.kr'; }, 1000);
  };
  
  return (
    <VenueSectionContainer $bgColor={bgColor}>
      <SectionTitle>장소</SectionTitle>
      
      <VenueInfo>
        <VenueName>{weddingConfig.venue.name}</VenueName>
        <VenueAddress>{formatTextWithLineBreaks(weddingConfig.venue.address)}</VenueAddress>
        <VenueTel href={`tel:${weddingConfig.venue.tel}`}>{weddingConfig.venue.tel}</VenueTel>
      </VenueInfo>
      
      <MapContainer ref={mapRef}>
        {!mapLoaded && <MapLoading>지도를 불러오는 중...</MapLoading>}
      </MapContainer>
      
      <NavigateButtonsContainer>
        <NavigateButton onClick={navigateToNaver} $mapType="naver">네이버 지도</NavigateButton>
        <NavigateButton onClick={navigateToKakao} $mapType="kakao">카카오맵</NavigateButton>
        <NavigateButton onClick={navigateToTmap} $mapType="tmap">TMAP</NavigateButton>
      </NavigateButtonsContainer>
      
      <TransportCard>
        <CardTitle>대중교통 안내</CardTitle>
        <TransportItem>
          <TransportLabel>지하철</TransportLabel>
          <TransportText>{weddingConfig.venue.transportation.subway}</TransportText>
        </TransportItem>
        <TransportItem>
          <TransportLabel>버스</TransportLabel>
          <TransportText>{weddingConfig.venue.transportation.bus}</TransportText>
        </TransportItem>
      </TransportCard>
      
      <ParkingCard>
        <CardTitle>주차 안내</CardTitle>
        <TransportText>{weddingConfig.venue.parking}</TransportText>
      </ParkingCard>
      
      {/* 배차 안내 섹션이 여기서 삭제되었습니다. */}
    </VenueSectionContainer>
  );
};

// 스타일 컴포넌트 생략 (기존 스타일 그대로 유지하시면 됩니다)
const VenueSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;
const SectionTitle = styled.h2` position: relative; display: inline-block; margin-bottom: 2rem; font-weight: 500; font-size: 1.5rem; &::after { content: ''; position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; border-radius: 50%; background-color: var(--secondary-color); } `;
const VenueInfo = styled.div` margin-bottom: 1.5rem; `;
const VenueName = styled.h3` font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 500; `;
const VenueAddress = styled.p` margin-bottom: 0.5rem; `;
const VenueTel = styled.a` color: var(--secondary-color); text-decoration: none; `;
const MapContainer = styled.div` height: 16rem; margin-bottom: 1rem; background-color: #f1f1f1; border-radius: 8px; max-width: 36rem; margin-left: auto; margin-right: auto; position: relative; `;
const MapLoading = styled.div` position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--text-medium); `;
const NavigateButtonsContainer = styled.div` display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; max-width: 36rem; margin-left: auto; margin-right: auto; `;
const NavigateButton = styled.button<{ $mapType?: 'naver' | 'kakao' | 'tmap' }>` flex: 1; min-width: 6rem; background-color: var(--secondary-color); color: white; border: none; border-radius: 4px; padding: 0.5rem 0.5rem; font-size: 0.9rem; cursor: pointer; transition: all 0.2s ease; &:hover { background-color: #c4a986; } `;
const Card = styled.div` background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); padding: 1.5rem; margin-bottom: 1.5rem; max-width: 36rem; margin-left: auto; margin-right: auto; text-align: left; `;
const TransportCard = styled(Card)``;
const ParkingCard = styled(Card)``;
const CardTitle = styled.h4` font-weight: 500; margin-bottom: 1rem; font-size: 1rem; `;
const TransportItem = styled.div` margin-bottom: 1rem; `;
const TransportLabel = styled.p` font-weight: 500; font-size: 0.875rem; `;
const TransportText = styled.p` font-size: 0.875rem; color: var(--text-medium); white-space: pre-line; `;

export default VenueSection;
