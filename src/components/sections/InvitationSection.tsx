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
      {/* 💐 수채화풍 꽃 장식 */}
      <SvgFlower width="120" height="80" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.85">
          <path d="M75 95 C 75 95, 40 70, 30 50 C 20 30, 50 10, 75 25 C 100 10, 130 30, 120 50 C 110 70, 75 95, 75 95 Z" fill="#F4CCCC" stroke="#E6B8B7" strokeWidth="0.5"/>
          <path d="M50 60 Q 35 45, 50 30 Q 65 45, 50 60 Z" fill="#EAD1DC" stroke="#D5A6BD" strokeWidth="0.5"/>
          <path d="M100 60 Q 115 45, 100 30 Q 85 45, 100 60 Z" fill="#EAD1DC" stroke="#D5A6BD" strokeWidth="0.5"/>
          <circle cx="75" cy="40" r="12" fill="#F4CCCC" stroke="#EA9999" strokeWidth="0.5"/>
          <path d="M60 70 Q 75 80, 90 70" stroke="#8FCE00" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M75 95 L 60 80" stroke="#8FCE00" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M75 95 L 90 80" stroke="#8FCE00" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="45" cy="25" r="3" fill="#FFF2CC"/>
          <circle cx="105" cy="25" r="3" fill="#FFF2CC"/>
        </g>
      </SvgFlower>

      <EngTitle>OUR WEDDING</EngTitle>
      
      {/* 💌 초대 문구 카드 (중복 문구 삭제됨) */}
      <MessageCard>
        <h2>초대합니다</h2>
        <Msg>
          저희 두 사람이 사랑과 믿음으로<br/>
          한 가정을 이루게 되었습니다.<br/>
          <br/>
          바쁘시더라도 부디 오셔서<br/>
          저희의 앞날을 축복해 주시고<br/>
          격려해 주시면 더없는 기쁨이 되겠습니다.
        </Msg>
      </MessageCard>

      {/* 📢 화환 사절 안내문 (글자 크기 키움!) */}
      <Notice>
     ※ 쾌적한 예식 진행을 위해<br/>
        화환은 정중히 사양하오니<br/>
        <span className="last-line">축하해 주시는 따뜻한 마음만 감사히 받겠습니다.</span>
      </Notice>
      
      <Names>
        <p>{groom.father} · {groom.mother} <small>의 차남</small> <strong>{groom.name}</strong></p>
        <p>{bride.father} · {bride.mother} <small>의 장녀</small> <strong>{bride.name}</strong></p>
      </Names>
      
      <OpenBtn onClick={() => setShowModal(true)}>혼주에게 연락하기</OpenBtn>

      {/* 팝업 모달 */}
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
`;

const SvgFlower = styled.svg` margin-bottom: 1rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05)); `;
const EngTitle = styled.span` font-size: 0.9rem; color: #c4a986; letter-spacing: 2px; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; `;

// 💌 메인 메시지 카드 (줄바꿈이 예쁘게 나오도록 word-break 설정)
const MessageCard = styled.div`
  background-color: white;
  padding: 2.5rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid #f0f0f0;

  h2 { 
    margin-bottom: 1.5rem; 
    font-size: 1.3rem; 
    color: #333; 
    font-weight: 600; 
  }
`;

const Msg = styled.p` 
  color: #555; 
  line-height: 2.2; 
  font-size: 1rem; 
  font-family: 'Noto Serif KR', serif; 
  font-weight: 500;
  word-break: keep-all; /* 단어 단위로 줄바꿈 (글자 끊김 방지) */
`;

// 📢 화환 사절 안내문 (크기 키움 & 글씨 진하게)
const Notice = styled.p`
  font-size: 0.95rem; /* 기존 0.85rem -> 0.95rem로 확대 */
  color: #666;        /* 색상도 조금 더 진하게 */
  line-height: 1.6;
  margin-bottom: 3rem;
  word-break: keep-all;
  background: #f9f9f9; /* 배경색 살짝 더 밝게 */
  padding: 1.2rem;     /* 여백도 더 넉넉하게 */
  border-radius: 6px;
  font-weight: 500;    /* 글씨 두께감 추가 */
`;

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
