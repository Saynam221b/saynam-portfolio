import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../App';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const HeaderShell = styled.header`
  position: sticky;
  top: 0.7rem;
  z-index: 1000;
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto -2.5rem;
  border: 1px solid var(--line-soft);
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.095), transparent 42%),
    var(--surface);
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(22px);
  transition: background 0.24s var(--ease-out), border-color 0.24s var(--ease-out), box-shadow 0.24s var(--ease-out);

  &.scrolled {
    border-color: var(--line);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.095), transparent 42%),
      var(--surface-strong);
    box-shadow: var(--shadow-soft);
  }

  @media (max-width: 760px) {
    top: 0.55rem;
    width: min(100% - 1rem, 640px);
    margin-bottom: 0.9rem;
    border-radius: 22px;
  }
`;

const HeaderInner = styled.div`
  min-height: 58px;
  margin: 0 auto;
  padding: 0 0.56rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 420px) {
    gap: 0.6rem;
    padding-left: 0.82rem;
  }
`;

const Brand = styled.a`
  color: var(--text);
  font-size: 0.96rem;
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

  @media (max-width: 520px) {
    small {
      display: none;
    }
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.16rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  padding: 0.18rem;

  @media (max-width: 980px) {
    display: none;
  }
`;

const NavLink = styled.a`
  min-height: 34px;
  border-radius: 999px;
  color: ${props => (props.$active ? 'var(--button-text)' : 'var(--text-muted)')};
  background: ${props => (props.$active ? 'var(--accent)' : 'transparent')};
  padding: 0 0.72rem;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 760;
  transition: color 0.2s var(--ease-out), background 0.2s var(--ease-out), transform 0.2s var(--ease-out);

  &:hover,
  &:focus-visible {
    color: ${props => (props.$active ? 'var(--button-text)' : 'var(--text)')};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  background: var(--surface-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s var(--ease-out), border-color 0.2s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Pill = styled.a`
  min-height: 38px;
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
  transition: transform 0.2s var(--ease-out), border-color 0.2s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

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

const MobileSheet = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(86vw, 340px);
  min-height: 100vh;
  max-height: 100vh;
  z-index: 1101;
  padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
  border-left: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const MobileLink = styled.a`
  min-height: 48px;
  border-bottom: 1px solid var(--line-soft);
  color: var(--text);
  font-size: 1rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
`;

const navItems = [
  { label: 'Story', href: '/#motion' },
  { label: 'Work', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Profile', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('motion');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const sections = ['motion', 'about', 'projects', 'experience', 'skills', 'contact'];
      const current = [...sections].reverse().find(sectionId => {
        const element = document.getElementById(sectionId);
        return element ? element.getBoundingClientRect().top <= Math.min(360, window.innerHeight * 0.42) : false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <HeaderShell className={scrolled ? 'scrolled' : ''}>
        <HeaderInner>
          <Brand href="/#home">
            Saynam <small>Data Engineer</small>
          </Brand>

          <DesktopNav aria-label="Primary">
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href} $active={item.href.endsWith(`#${activeSection}`)}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>

          <Actions>
            <IconButton type="button" onClick={toggleTheme} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </IconButton>
            <Pill hideCompact href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</Pill>
            <Pill primary hideCompact href="/#contact">Start</Pill>
            <MenuButton type="button" onClick={() => setOpen(prev => !prev)} aria-label={open ? 'Close menu' : 'Open menu'}>
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </MenuButton>
          </Actions>
        </HeaderInner>
      </HeaderShell>

      <AnimatePresence>
        {open && (
          <>
            <MobileOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <MobileSheet
              aria-label="Mobile navigation"
              initial={{ x: 340 }}
              animate={{ x: 0 }}
              exit={{ x: 340 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
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
