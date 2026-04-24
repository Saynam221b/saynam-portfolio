import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../App';

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${props => (props.scrolled ? 'var(--line-soft)' : 'transparent')};
  background: ${props => (props.scrolled ? 'rgba(7, 9, 13, 0.78)' : 'rgba(7, 9, 13, 0.42)')};
  backdrop-filter: blur(18px);
  transition: background 0.24s var(--ease-out), border-color 0.24s var(--ease-out);

  :root[data-theme='light'] & {
    background: ${props => (props.scrolled ? 'rgba(245, 247, 251, 0.82)' : 'rgba(245, 247, 251, 0.54)')};
  }
`;

const HeaderInner = styled.div`
  width: min(1240px, 100%);
  min-height: 72px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Brand = styled.a`
  color: var(--text);
  font-size: 1rem;
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 0.56rem;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 22px var(--accent);
  }

  small {
    color: var(--text-subtle);
    font-size: 0.76rem;
    font-weight: 700;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 980px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-muted);
  font-size: 0.84rem;
  font-weight: 760;
  transition: color 0.2s var(--ease-out);

  &:hover,
  &:focus-visible {
    color: var(--text);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  background: var(--surface-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Pill = styled.a`
  min-height: 40px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: ${props => (props.primary ? 'var(--accent)' : 'var(--surface-soft)')};
  color: ${props => (props.primary ? 'var(--button-text)' : 'var(--text)')};
  padding: 0 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.84rem;
  font-weight: 850;

  @media (max-width: 1120px) {
    display: ${props => (props.hideCompact ? 'none' : 'inline-flex')};
  }
`;

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 980px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.34);
`;

const MobileSheet = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(86vw, 340px);
  min-height: 100vh;
  z-index: 1101;
  padding: 1rem;
  border-left: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileLink = styled.a`
  min-height: 48px;
  border-bottom: 1px solid var(--line-soft);
  color: var(--text);
  font-size: 1rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
`;

const navItems = [
  { label: 'Big picture', href: '/#about' },
  { label: 'Motion', href: '/#motion' },
  { label: 'Builds', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <HeaderShell scrolled={scrolled}>
        <HeaderInner>
          <Brand href="/#home">
            Saynam <small>motion portfolio</small>
          </Brand>

          <DesktopNav aria-label="Primary">
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>

          <Actions>
            <IconButton type="button" onClick={toggleTheme} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'} />
            </IconButton>
            <Pill hideCompact href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</Pill>
            <Pill primary href="/#contact">Start</Pill>
            <MenuButton type="button" onClick={() => setOpen(prev => !prev)} aria-label={open ? 'Close menu' : 'Open menu'}>
              <i className={open ? 'fas fa-times' : 'fas fa-bars'} />
            </MenuButton>
          </Actions>
        </HeaderInner>
      </HeaderShell>

      <AnimatePresence>
        {open && (
          <>
            <MobileOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <MobileSheet initial={{ x: 340 }} animate={{ x: 0 }} exit={{ x: 340 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              {navItems.map(item => (
                <MobileLink key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </MobileLink>
              ))}
              <Pill primary href="/#contact" onClick={() => setOpen(false)}>Start a build</Pill>
              <Pill href="/resume.pdf" target="_blank" rel="noopener noreferrer">View resume</Pill>
            </MobileSheet>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
