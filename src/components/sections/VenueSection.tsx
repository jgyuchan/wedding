'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

declare global { interface Window { naver: any; } }

const VenueSection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const v = weddingConfig.venue;
  const dName = (v as any).displayName || v.name;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);
  
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const loc = new window.naver.maps.LatLng(v.coordinates.latitude, v.coordinates.longitude);
    const map = new window.naver.maps.Map(mapRef.current, { center: loc, zoom: 17 });
    new window.naver.maps.Marker({ position: loc, map: map });
  }, [mapLoaded, v]);

  const nav = (t: 'naver' | 'kakao' | 'tmap') => {
    const { latitude: la, longitude: lo } = v.coordinates;
    const sName = encodeURIComponent(v.name);
    if (t === 'naver') window.open(`https://map.naver.com/v5/search/${sName}?c=${lo},${la},15,0,0,0,dh`, '_blank');
    if (t === 'kakao') window.open(`https://map.kakao.com/link/to/${sName},${la},${lo}`, '_blank');
    if (t === 'tmap') window.location.href = `tmap://route?goalname=${sName}&goaly=${la}&goalx=${lo}`;
  };
  
  return (
    <VContainer $bgColor={bgColor}>
      <h2>장소</h2>
      <VInfo><h3>{dName}</h3><p>{v.address}</p><a href={`tel:${v.tel}`}>{v.tel}</a></VInfo>
      <MContainer ref={mapRef} />
      <Bts><button onClick={() => nav('naver')}>네이버 지도</button><button onClick={() => nav('kakao')}>카카오맵</button><button onClick={() => nav('tmap')}>TMAP</button></Bts>
      <Card><h4>교통 안내</h4><p>{v.transportation.bus}</p></Card>
      <Card><h4>주차 안내</h4><p>{v.parking}</p></Card>
    </VContainer>
  );
};

const VContainer = styled.section<{ $bgColor: string }>` padding: 4rem 1.5rem; text-align: center; background: ${p => p.$bgColor === 'beige' ? '#F8F6F2' : '#fff'}; h2 { margin-bottom: 2rem; font-size: 1.5rem; } `;
const VInfo = styled.div` margin-bottom: 2rem; h3 { font-size: 1.2rem; margin-bottom: 0.5rem; } a { color: #c4a986; text-decoration: none; } `;
const MContainer = styled.div` height: 16rem; background: #eee; border-radius: 8px; max-width: 36rem; margin: 0 auto 1.5rem; `;
const Bts = styled.div` display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; button { flex: 1; max-width: 8rem; padding: 0.6rem; background: #c4a986; color: white; border: none; border-radius: 4px; cursor: pointer; } `;
const Card = styled.div` background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 0 auto 1rem; max-width: 36rem; text-align: left; h4 { margin-bottom: 0.5rem; font-size: 1rem; } p { font-size: 0.9rem; color: #666; white-space: pre-line; } `;

export default VenueSection;
