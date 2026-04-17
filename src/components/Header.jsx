import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  background: rgba(6, 11, 26, 0.72);
  border-bottom: 1px solid rgba(144, 168, 227, 0.16);
  transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  ${props =>
    props.scrolled &&
    `
    background: rgba(6, 11, 26, 0.9);
    border-bottom-color: rgba(144, 168, 227, 0.3);
    box-shadow: 0 12px 32px rgba(3, 8, 26, 0.4);
  `}
`;

const HeaderInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  height: 72px;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 0.28rem;
  color: #f6f8ff;
  font-weight: 700;
  font-size: 1.14rem;
  letter-spacing: -0.02em;

  small {
    font-size: 0.64rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: rgba(173, 196, 244, 0.88);
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 980px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(219, 230, 255, 0.9);
  font-size: 0.86rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.45rem 0.1rem;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #ffffff;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

const QuietCta = styled.a`
  height: 38px;
  border-radius: 999px;
  padding: 0 0.95rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.77rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(229, 236, 255, 0.95);
  border: 1px solid rgba(144, 168, 227, 0.34);
  background: rgba(14, 27, 57, 0.58);
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(167, 204, 255, 0.74);
    transform: translateY(-1px);
  }

  @media (max-width: 1120px) {
    display: none;
  }
`;

const PrimaryCta = styled.a`
  height: 38px;
  border-radius: 999px;
  padding: 0 1.05rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.77rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(130deg, #2f6dff 0%, #18b6a4 100%);
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(144, 168, 227, 0.36);
  background: rgba(14, 27, 57, 0.7);
  color: #f5f8ff;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(28, 50, 100, 0.76);
  }

  @media (max-width: 980px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(3, 8, 24, 0.62);
  backdrop-filter: blur(3px);
  z-index: 1100;
`;

const MobileSheet = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(84vw, 320px);
  height: 100vh;
  z-index: 1101;
  padding: 1.2rem 1.15rem;
  background: rgba(8, 15, 34, 0.96);
  border-left: 1px solid rgba(144, 168, 227, 0.28);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const MobileLink = styled.a`
  padding: 0.7rem 0.2rem;
  border-bottom: 1px solid rgba(144, 168, 227, 0.12);
  color: rgba(227, 236, 255, 0.95);
  font-size: 0.95rem;
  font-weight: 600;
`;

const MobilePrimary = styled.a`
  margin-top: 0.7rem;
  min-height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.83rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  background: linear-gradient(130deg, #2f6dff 0%, #18b6a4 100%);
`;

const MobileQuiet = styled.a`
  min-height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.83rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(227, 236, 255, 0.95);
  border: 1px solid rgba(144, 168, 227, 0.34);
  background: rgba(14, 27, 57, 0.58);
`;

const navItems = [
  { label: 'Services', href: '/#services' },
  { label: 'Outcomes', href: '/#outcomes' },
  { label: 'Work', href: '/#projects' },
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <HeaderShell scrolled={scrolled}>
        <HeaderInner>
          <Brand href="/#home">
            Saynam Sharma <small>Studio</small>
          </Brand>

          <DesktopNav aria-label="Primary">
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>

          <Actions>
            <QuietCta href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View Resume
            </QuietCta>
            <PrimaryCta href="/#contact">Start a Project</PrimaryCta>
            <MenuButton type="button" onClick={() => setOpen(prev => !prev)} aria-label={open ? 'Close menu' : 'Open menu'}>
              <i className={open ? 'fas fa-times' : 'fas fa-bars'} />
            </MenuButton>
          </Actions>
        </HeaderInner>
      </HeaderShell>

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
              {navItems.map(item => (
                <MobileLink key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </MobileLink>
              ))}
              <MobilePrimary href="/#contact" onClick={() => setOpen(false)}>
                Start a Project
              </MobilePrimary>
              <MobileQuiet href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
              </MobileQuiet>
            </MobileSheet>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
