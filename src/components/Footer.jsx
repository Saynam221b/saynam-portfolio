import React from 'react';
import styled from '@emotion/styled';

const FooterShell = styled.footer`
  padding: 2rem 1.25rem;
  border-top: 1px solid var(--line-soft);
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Brand = styled.a`
  color: var(--text);
  font-weight: 900;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  a {
    color: var(--text-muted);
    font-size: 0.88rem;
    font-weight: 760;
  }
`;

const Meta = styled.p`
  color: var(--text-subtle);
  font-size: 0.84rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterShell>
      <Inner>
        <div>
          <Brand href="/#home">Saynam Sharma</Brand>
          <Meta>Motion portfolio, data systems, product engineering. © {currentYear}</Meta>
        </div>
        <Links>
          <a href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:saynam1101@gmail.com">Email</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </Links>
      </Inner>
    </FooterShell>
  );
};

export default Footer;
