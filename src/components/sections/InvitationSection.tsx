'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const InvitationSection = ({ bgColor = 'white' }: { bgColor?: 'white' | 'beige' }) => {
  const [showContact, setShowContact] = useState(false);
  const { groom, bride } = weddingConfig.invitation;

  const ContactItem = ({ label, name, tel }: { label: string; name: string; tel: string }) => (
    <ContactRow>
      <ContactInfo>{label} {name}</ContactInfo>
      <IconGroup>
        <IconBtn href={`tel:${tel}`}>📞</IconBtn>
        <IconBtn href={`sms:${tel}`}>✉️</IconBtn>
      </IconGroup>
    </ContactRow>
  );

  return (
    <SectionContainer $bgColor={bgColor}>
      <Title>초대합니다</Title>
      <Message>{weddingConfig.invitation.message}</Message>
      
      <NamesContainer>
        <ParentGroup>
          {groom.father} · {groom.mother} <Label>의 차남</Label> <Name>{groom.name}</Name>
        </ParentGroup>
        <ParentGroup>
          {bride.father} · {bride.mother} <Label>의 장녀</Label> <Name>{bride.name}</Name>
        </ParentGroup>
      </NamesContainer>

      <ContactBtn onClick={() => setShowContact(true)}>혼주에게 연락하기</ContactBtn>

      {showContact && (
        <ModalOverlay onClick={() => setShowContact(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>혼주에게 연락하기</h3>
              <CloseBtn onClick={() => setShowContact(false)}>×</CloseBtn>
            </ModalHeader>
            <ModalBody>
              <h4>신랑측 혼주</h4>
              <ContactItem label="신랑" name={groom.name} tel={groom.tel} />
              <ContactItem label="아버지" name={groom.father} tel={groom.fatherTel} />
              <ContactItem label="어머니" name={groom.mother} tel={groom.motherTel} />
              <Divider />
              <h4>신부측 혼주</h4>
              <ContactItem label="신부" name={bride.name} tel={bride.tel} />
              <ContactItem label="아버지" name={bride.father} tel={bride.fatherTel} />
              <ContactItem label="어머니" name={bride.mother} tel={bride.motherTel} />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionContainer>
  );
};

// 스타일 컴포넌트 생략 (기존 스타일 유지하면서 Modal 관련 스타일만 추가)
const SectionContainer = styled.section<{ $bgColor: string }>` padding: 4rem 1.5rem; text-align: center; background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'}; `;
const Title = styled.h2` font-size: 1.5rem; margin-bottom: 2rem; color: #555; `;
const Message = styled.p` white-space: pre-line; line-height: 1.8; color: #666; font-size: 0.95rem; margin-bottom: 3rem; `;
const NamesContainer = styled.div` margin-bottom: 2rem; `;
const ParentGroup = styled.div` margin-bottom: 0.5rem; font-size: 1rem; color: #444; `;
const Label = styled.span` font-size: 0.85rem; color: #888; margin: 0 0.5rem; `;
const Name = styled.span` font-weight: 500; `;
const ContactBtn = styled.button` background-color: #e2d2be; color: white; border: none; border-radius: 4px; padding: 0.8rem 2rem; font-size: 0.95rem; cursor: pointer; `;
const ModalOverlay = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; `;
const ModalContent = styled.div` background: white; width: 90%; max-width: 400px; border-radius: 12px; overflow: hidden; `;
const ModalHeader = styled.div` padding: 1rem; background: #e2d2be; color: white; display: flex; justify-content: space-between; align-items: center; `;
const CloseBtn = styled.button` background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; `;
const ModalBody = styled.div` padding: 1.5rem; h4 { margin: 1rem 0 0.5rem; font-size: 0.9rem; color: #888; } `;
const ContactRow = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; `;
const ContactInfo = styled.span` font-size: 1rem; color: #444; `;
const IconGroup = styled.div` display: flex; gap: 1rem; `;
const IconBtn = styled.a` text-decoration: none; font-size: 1.2rem; `;
const Divider = styled.div` height: 1px; background: #eee; margin: 1.5rem 0; `;

export default InvitationSection;
