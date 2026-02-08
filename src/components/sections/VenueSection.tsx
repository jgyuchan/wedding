'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

declare global { interface Window { naver: any; } }

const VenueSection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  const venue = weddingConfig.venue;
  const displayName = (venue as any).displayName || venue.name; // 표시용 이름 사용

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => setMapLoaded(true);
    script.onerror = () => setMapError(true);
    document.head.appendChild(script);
  }, []);
  
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapError) return;
    try {
      const location = new window.naver.maps.LatLng(venue.coordinates.latitude, venue.coordinates.longitude);
      const map = new window.naver.maps.Map(mapRef.current, { center: location, zoom: 17 });
      const marker = new window.naver.maps.Marker({ position: location, map: map });
      const info = new window.naver.maps.InfoWindow({ content: `<div style="padding:10px;text-align:center;font-size:14px;"><strong>${displayName}</strong></div>` });
      info.open(map, marker);
    } catch (e) { setMapError(true); }
  }, [mapLoaded, mapError, venue, displayName]);

  const navigate = (type: 'naver' | 'kakao' | 'tmap') => {
    const { latitude, longitude } = venue.coordinates;
    const searchName = encodeURIComponent(venue.name); // 검색은 '원미동장로교회'로
    if (type === 'naver') window.open(`https://map.naver.com/v5/search/${searchName}?c=${longitude},${latitude},15,0,0,0,dh`, '_blank');
    if (type === 'kakao') window.open(`https://map.kakao.com/link/to/${searchName},${latitude},${longitude}`, '_blank');
    if (type === 'tmap') {
      window.location.href = `tmap://route?goalname=${searchName}&goaly=${latitude}&goalx=${longitude}`;
      setTimeout(() => { if(!document.hidden) window.location.href = 'https://tmap.co.kr'; }, 1000);
    }
  };
  
  return (
    <VenueSectionContainer $bgColor={bgColor}>
      <SectionTitle>장소</SectionTitle>
      <VenueInfo>
        <VenueName>{displayName}</VenueName> {/* 화면에는 '원미동교회 본당' 표시 */}
        <p>{venue.address}</p>
        <VenueTel href={`tel:${venue.tel}`}>{venue.tel}</VenueTel>
      </VenueInfo>
      <MapContainer ref={mapRef}>{!mapLoaded && <p>지도를 불러오는 중...</p>}</MapContainer>
      <NavigateButtonsContainer>
        <NavBtn onClick={() => navigate('naver')}>네이버 지도</NavBtn>
        <NavBtn onClick={() => navigate('kakao')}>카카오맵</NavBtn>
        <NavBtn onClick={() => navigate('tmap')}>TMAP</NavBtn>
      </NavigateButtonsContainer>
      <Card><h4>대중교통 안내</h4><p>{venue.transportation.subway}</p><p>{venue.transportation.bus}</p></Card>
      <Card><h4>주차 안내</h4><p>{venue.parking}</p></Card>
    </VenueSectionContainer>
  );
};

const VenueSectionContainer = styled.section<{ $bgColor: string }>` padding: 4rem 1.5rem; text-align: center; background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'}; `;
const SectionTitle = styled.h2` margin-bottom: 2rem; font-size: 1.5rem; position: relative; display: inline-block; &::after { content: ''; position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; border-radius: 50%; background-color: #c4a986; } `;
const VenueInfo = styled.div` margin-bottom: 1.5rem; `;
const VenueName = styled.h3` font-size: 1.25rem; margin-bottom: 0.5rem; `;
const VenueTel = styled.a` color: #c4a986; text-decoration: none; `;
const MapContainer = styled.div` height: 16rem; margin: 0 auto 1rem; background: #eee; border-radius: 8px; max-width: 36rem; position: relative; display: flex; align-items: center; justify-content: center; `;
const NavigateButtonsContainer = styled.div` display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; max-width: 36rem; margin-left: auto; margin-right: auto; `;
const NavBtn = styled.button` flex: 1; min-width: 6rem; background: #c4a986; color: white; border: none; border-radius: 4px; padding: 0.6rem; cursor: pointer; `;
const Card = styled.div` background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 1.5rem; margin: 0 auto 1.5rem; max-width: 36rem; text-align: left; h4 { margin-bottom: 0.5rem; } p { font-size: 0.9rem; color: #666; white-space: pre-line; } `;

export default VenueSection;
