import React from 'react';
import styled from '@emotion/styled';

const FooterShell = styled.footer`
  padding: clamp(1.55rem, 4vw, 2.2rem) 1.25rem;
  border-top: 1px solid var(--line-soft);
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(1rem, 4vw, 2rem);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const Brand = styled.a`
  color: var(--text);
  font-weight: 900;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem 0.95rem;

  a {
    color: var(--text-muted);
    font-size: 0.88rem;
    font-weight: 760;
    transition: color 0.2s var(--ease-out);
  }

  a:hover,
  a:focus-visible {
    color: var(--accent);
  }

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

const Meta = styled.p`
  max-width: 48ch;
  margin-top: 0.15rem;
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
