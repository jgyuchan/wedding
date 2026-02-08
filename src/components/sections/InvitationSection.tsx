'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const InvitationSection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const [showModal, setShowModal] = useState(false);
  const { groom, bride } = weddingConfig.invitation;

  const Contact = ({ label, name, tel }: { label: string; name: string; tel: string }) => (
    <Row>
      <span>{label} {name}</span>
      <Btns><a href={`tel:${tel}`}>📞</a><a href={`sms:${tel}`}>✉️</a></Btns>
    </Row>
  );

  return (
    <Container $bgColor={bgColor}>
      <h2>초대합니다</h2>
      <Msg>{weddingConfig.invitation.message}</Msg>
      <Names>
        <p>{groom.father} · {groom.mother} <Label>의 차남</Label> <Name>{groom.name}</Name></p>
        <p>{bride.father} · {bride.mother} <Label>의 장녀</Label> <Name>{bride.name}</Name></p>
      </Names>
      <OpenBtn onClick={() => setShowModal(true)}>혼주에게 연락하기</OpenBtn>
      {showModal && (
        <Overlay onClick={() => setShowModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <Header><h3>혼주에게 연락하기</h3><button onClick={() => setShowModal(false)}>×</button></Header>
            <Body>
              <h4>신랑측</h4>
              <Contact label="신랑" name={groom.name} tel={groom.tel} />
              <Contact label="아버지" name={groom.father} tel={groom.fatherTel} />
              <Contact label="어머니" name={groom.mother} tel={groom.motherTel} />
              <Divider />
              <h4>신부측</h4>
              <Contact label="신부" name={bride.name} tel={bride.tel} />
              <Contact label="아버지" name={bride.father} tel={bride.fatherTel} />
              <Contact label="어머니" name={bride.mother} tel={bride.motherTel} />
            </Body>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

const Container = styled.section<{ $bgColor: string }>` padding: 4rem 1.5rem; text-align: center; background: ${p => p.$bgColor === 'beige' ? '#F8F6F2' : '#fff'}; h2 { margin-bottom: 2rem; font-size: 1.5rem; } `;
const Msg = styled.p` white-space: pre-line; margin-bottom: 3rem; color: #666; line-height: 1.8; `;
const Names = styled.div` margin-bottom: 2.5rem; p { margin: 0.5rem 0; font-size: 1.1rem; } Label { font-size: 0.9rem; color: #888; margin: 0 0.5rem; } Name { font-weight: 500; } `;
const OpenBtn = styled.button` background: #e2d2be; color: #fff; border: none; padding: 0.8rem 2rem; border-radius: 4px; cursor: pointer; `;
const Overlay = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; `;
const Modal = styled.div` background: #fff; width: 90%; max-width: 400px; border-radius: 12px; `;
const Header = styled.div` padding: 1rem; background: #e2d2be; color: #fff; display: flex; justify-content: space-between; border-radius: 12px 12px 0 0; h3 { margin: 0; font-size: 1rem; } button { background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; } `;
const Body = styled.div` padding: 1.5rem; h4 { text-align: left; color: #888; font-size: 0.85rem; margin-bottom: 0.8rem; } `;
const Row = styled.div` display: flex; justify-content: space-between; margin-bottom: 1rem; span { font-size: 1rem; } `;
const Btns = styled.div` display: flex; gap: 1.2rem; a { text-decoration: none; font-size: 1.2rem; } `;
const Divider = styled.div` border-top: 1px solid #eee; margin: 1.5rem 0; `;
const Label = styled.span``; const Name = styled.span``; // 에러 방지용

export default InvitationSection;
