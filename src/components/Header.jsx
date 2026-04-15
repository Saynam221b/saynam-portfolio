import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  background: rgba(6, 13, 32, 0.82);
  border-bottom: 1px solid rgba(126, 151, 214, 0.2);
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  ${props => props.scrolled && `
    background: rgba(6, 13, 32, 0.92);
    border-bottom-color: rgba(126, 151, 214, 0.32);
    box-shadow: 0 12px 28px rgba(2, 6, 20, 0.28);
  `}
`;

const HeaderContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  height: 72px;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 1.28rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #f2f6ff;

  span {
    color: #15b8a6;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(227, 235, 255, 0.85);
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0.4rem 0.15rem;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #fff;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 1rem;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #eaf0ff;
  border: 1px solid rgba(126, 151, 214, 0.36);
  background: rgba(23, 37, 74, 0.45);
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(43, 108, 240, 0.32);
    border-color: rgba(90, 148, 255, 0.65);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const SecondaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 0.95rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: rgba(217, 229, 255, 0.95);
  border: 1px solid rgba(126, 151, 214, 0.26);
  background: rgba(16, 28, 58, 0.42);
  transition: border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(126, 171, 255, 0.55);
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  width: 38px;
  height: 38px;
  border: 1px solid rgba(126, 151, 214, 0.36);
  border-radius: 10px;
  color: #f2f6ff;
  background: rgba(16, 28, 58, 0.7);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(43, 108, 240, 0.34);
  }

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(2, 7, 18, 0.55);
  backdrop-filter: blur(3px);
  z-index: 1100;
`;

const MobileSheet = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(85vw, 320px);
  height: 100vh;
  background: rgba(8, 16, 36, 0.97);
  border-left: 1px solid rgba(126, 151, 214, 0.24);
  padding: 1.4rem;
  z-index: 1101;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const MobileLink = styled.a`
  color: rgba(227, 235, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.65rem 0.2rem;
  border-bottom: 1px solid rgba(126, 151, 214, 0.12);
`;

const MobileCTA = styled.a`
  margin-top: 0.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.88rem;
  background: linear-gradient(135deg, #2b6cf0 0%, #15b8a6 100%);
  color: #fff;
`;

const navItems = [
  { label: 'Services', href: '/#services' },
  { label: 'Outcomes', href: '/#outcomes' },
  { label: 'Case Studies', href: '/#projects' },
  { label: 'Credibility', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <HeaderWrapper scrolled={scrolled}>
        <HeaderContainer>
          <Logo href="/#home">
            Saynam<span>.</span>
          </Logo>
          <DesktopNav aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>
          <HeaderActions>
            <SecondaryAction href="/resume.pdf" target="_blank" rel="noopener noreferrer">Hiring? Resume</SecondaryAction>
            <CTAButton href="/#contact">Start a Project</CTAButton>
            <MenuButton
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <i className={open ? 'fas fa-times' : 'fas fa-bars'} />
            </MenuButton>
          </HeaderActions>
        </HeaderContainer>
      </HeaderWrapper>

      <AnimatePresence>
        {open && (
          <>
            <MobileOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <MobileSheet
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.22, ease: [0.3, 0, 0.2, 1] }}
            >
              {navItems.map((item) => (
                <MobileLink key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </MobileLink>
              ))}
              <MobileCTA href="/#contact" onClick={() => setOpen(false)}>
                Start a Project
              </MobileCTA>
              <MobileCTA href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
              </MobileCTA>
            </MobileSheet>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
