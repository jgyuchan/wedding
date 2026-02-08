'use client';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>© 2026 gyuchan and hayoung</Copyright>
      <MadeWith>Made with ❤️</MadeWith>
      <GithubLink href="https://github.com/jgyuchan/wedding" target="_blank" rel="noreferrer">GitHub 저장소 바로가기</GithubLink>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer` padding: 4rem 1.5rem; text-align: center; background-color: white; border-top: 1px solid #f0f0f0; `;
const Copyright = styled.p` font-size: 0.875rem; color: #888; margin-bottom: 0.5rem; `;
const MadeWith = styled.p` font-size: 0.75rem; color: #aaa; margin-bottom: 1.5rem; `;
const GithubLink = styled.a` font-size: 0.75rem; color: #ccc; text-decoration: underline; `;

export default Footer;
