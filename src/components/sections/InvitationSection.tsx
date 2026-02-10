'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const InvitationSection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const [showModal, setShowModal] = useState(false);
  const { groom, bride } = weddingConfig.invitation;

  const ContactRow = ({ label, name, tel }: { label: string; name: string; tel: string }) => (
    <Row>
      <ContactInfo>{label} {name}</ContactInfo>
      <Btns>
        <a href={`tel:${tel}`}>📞</a>
        <a href={`sms:${tel}`}>✉️</a>
      </Btns>
    </Row>
  );

  return (
    <Container $bgColor={bgColor}>
      {/* 💐 더 풍성하고 예쁜 부케 스타일의 SVG 꽃 장식 */}
      <SvgBouquet width="100" height="80" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.9">
        <path d="M60 95C60 95 30 70 20 50C10 30 40 10 60 30C80 10 110 30 100 50C90 70 60 95 60 95Z" fill="#F4CCCC"/>
        <circle cx="40" cy="40" r="15" fill="#EAD1DC" stroke="#D5A6BD" strokeWidth="1"/>
        <circle cx="80" cy="40" r="15" fill="#EAD1DC" stroke="#D5A6BD" strokeWidth="1"/>
        <circle cx="60" cy="25" r="18" fill="#F4CCCC" stroke="#EA9999" strokeWidth="1"/>
        <circle cx="30" cy="60" r="12" fill="#FFF2CC" stroke="#D6B656" strokeWidth="1"/>
        <circle cx="90" cy="60" r="12" fill="#FFF2CC" stroke="#D6B656" strokeWidth="1"/>
        <circle cx="60" cy="65" r="10" fill="#D9EAD3" stroke="#B6D7A8" strokeWidth="1"/>
        <path d="M60 95L40 75" stroke="#8FCE00" strokeWidth="2" strokeLinecap="round"/>
        <path d="M60 95L80 75" stroke="#8FCE00" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 50Q10 40 20 30" stroke="#8FCE00" strokeWidth="2" fill="none"/>
        <path d="M100 50Q110 40 100 30" stroke="#8FCE00" strokeWidth="2" fill="none"/>
        </g>
      </SvgBouquet>

      <EngTitle>OUR WEDDING</EngTitle>
      
      <h2>초대합니다</h2>
      
      <Msg>{weddingConfig.invitation.message}</Msg>
      
      <Names>
        <p>{groom.father} · {groom.mother} <small>의 차남</small> <strong>{groom.name}</strong></p>
        <p>{bride.father} · {bride.mother} <small>의 장녀</small> <strong>{bride.name}</strong></p>
      </Names>
      
      <OpenBtn onClick={() => setShowModal(true)}>혼주에게 연락하기</OpenBtn>

      {/* 팝업 기능 (기존 유지) */}
      {showModal && (
        <Overlay onClick={() => setShowModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <Header><h3>혼주에게 연락하기</h3><button onClick={() => setShowModal(false)}>×</button></Header>
            <Body>
              <h4>신랑측 혼주</h4>
              <ContactRow label="신랑" name={groom.name} tel={groom.tel} />
              <ContactRow label="아버지" name={groom.father} tel={groom.fatherTel || ''} />
              <ContactRow label="어머니" name={groom.mother} tel={groom.motherTel || ''} />
              <Divider />
              <h4>신부측 혼주</h4>
              <ContactRow label="신부" name={bride.name} tel={bride.tel} />
              <ContactRow label="아버지" name={bride.father} tel={bride.fatherTel || ''} />
              <ContactRow label="어머니" name={bride.mother} tel={bride.motherTel || ''} />
            </Body>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

// --- 스타일 ---

const Container = styled.section<{ $bgColor: string }>` 
  padding: 4rem 1.5rem; 
  text-align: center; 
  background: ${p => p.$bgColor === 'beige' ? '#F8F6F2' : '#fff'}; 
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 { 
    margin-bottom: 2rem; 
    font-size: 1.3rem; 
    color: #333; 
    font-weight: 500;
  } 
`;

// 💐 부케 스타일
const SvgBouquet = styled.svg`
  margin-bottom: 1rem;
  filter: drop-shadow(0 3px 5px rgba(0,0,0,0.1));
`;

const EngTitle = styled.span`
  font-size: 0.9rem;
  color: #c4a986;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Msg = styled.p` white-space: pre-line; margin-bottom: 3rem; color: #666; line-height: 2; font-size: 0.95rem; font-family: 'Noto Serif KR', serif; `;
const Names = styled.div` margin-bottom: 2.5rem; p { margin: 0.6rem 0; font-size: 1.1rem; color: #444; } small { font-size: 0.85rem; color: #888; margin: 0 0.5rem; } strong { font-weight: 600; color: #333; } `;
const OpenBtn = styled.button` background: #e2d2be; color: #fff; border: none; padding: 0.8rem 2.5rem; border-radius: 50px; cursor: pointer; font-size: 0.95rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.2s; &:hover { background: #d4c0a8; } `;
const Overlay = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; backdrop-filter: blur(2px); `;
const Modal = styled.div` background: #fff; width: 90%; max-width: 360px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: popUp 0.3s ease-out; @keyframes popUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } } `;
const Header = styled.div` padding: 1.2rem; background: #e2d2be; color: #fff; display: flex; justify-content: space-between; align-items: center; h3 { margin: 0; font-size: 1.1rem; font-weight: 500; } button { background: none; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; padding: 0; line-height: 1; } `;
const Body = styled.div` padding: 1.5rem; h4 { text-align: center; color: #c4a986; font-size: 0.95rem; margin-bottom: 1rem; font-weight: 600; } hr { border: 0; border-top: 1px dashed #eee; margin: 1.5rem 0; } `;
const Row = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; padding: 0.5rem 0; border-bottom: 1px solid #f9f9f9; &:last-child { border-bottom: none; } `;
const ContactInfo = styled.span` font-size: 0.95rem; color: #555; `;
const Btns = styled.div` display: flex; gap: 0.8rem; a { text-decoration: none; font-size: 1.3rem; transition: transform 0.2s; } a:hover { transform: scale(1.1); } `;
const Divider = styled.div` border-top: 1px dashed #e0e0e0; margin: 1.5rem 0; `;

export default InvitationSection;
  font-weight: 600;
  text-transform: uppercase;
`;

const Msg = styled.p` white-space: pre-line; margin-bottom: 3rem; color: #666; line-height: 2; font-size: 0.95rem; font-family: 'Noto Serif KR', serif; `;
const Names = styled.div` margin-bottom: 2.5rem; p { margin: 0.6rem 0; font-size: 1.1rem; color: #444; } small { font-size: 0.85rem; color: #888; margin: 0 0.5rem; } strong { font-weight: 600; color: #333; } `;
const OpenBtn = styled.button` background: #e2d2be; color: #fff; border: none; padding: 0.8rem 2.5rem; border-radius: 50px; cursor: pointer; font-size: 0.95rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.2s; &:hover { background: #d4c0a8; } `;
const Overlay = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; backdrop-filter: blur(2px); `;
const Modal = styled.div` background: #fff; width: 90%; max-width: 360px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: popUp 0.3s ease-out; @keyframes popUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } } `;
const Header = styled.div` padding: 1.2rem; background: #e2d2be; color: #fff; display: flex; justify-content: space-between; align-items: center; h3 { margin: 0; font-size: 1.1rem; font-weight: 500; } button { background: none; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; padding: 0; line-height: 1; } `;
const Body = styled.div` padding: 1.5rem; h4 { text-align: center; color: #c4a986; font-size: 0.95rem; margin-bottom: 1rem; font-weight: 600; } hr { border: 0; border-top: 1px dashed #eee; margin: 1.5rem 0; } `;
const Row = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; padding: 0.5rem 0; border-bottom: 1px solid #f9f9f9; &:last-child { border-bottom: none; } `;
const ContactInfo = styled.span` font-size: 0.95rem; color: #555; `;
const Btns = styled.div` display: flex; gap: 0.8rem; a { text-decoration: none; font-size: 1.3rem; transition: transform 0.2s; } a:hover { transform: scale(1.1); } `;
const Divider = styled.div` border-top: 1px dashed #e0e0e0; margin: 1.5rem 0; `;

export default InvitationSection;
