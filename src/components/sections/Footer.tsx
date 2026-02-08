'use client';
import styled from 'styled-components';
const Footer = () => (
  <FContainer>
    <p>© 2026 gyuchan and hayoung</p>
    <p style={{fontSize: '0.75rem', color: '#aaa', marginTop: '0.5rem'}}>Made with ❤️</p>
  </FContainer>
);
const FContainer = styled.footer` padding: 4rem 1.5rem; text-align: center; border-top: 1px solid #f0f0f0; color: #888; font-size: 0.875rem; `;
export default Footer;
