import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: calc(24px + env(safe-area-inset-bottom));
  right: calc(24px + env(safe-area-inset-right));
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-elev-strong);
  color: var(--text);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  transition: border-color 0.2s var(--ease-out);

  &:hover,
  &:focus-visible {
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    bottom: calc(18px + env(safe-area-inset-bottom));
    right: calc(18px + env(safe-area-inset-right));
    width: 40px;
    height: 40px;
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { hash, pathname } = useLocation();
  const hashTimersRef = useRef([]);

  const clearHashTimers = () => {
    hashTimersRef.current.forEach(timer => window.clearTimeout(timer));
    hashTimersRef.current = [];
  };

  useEffect(() => {
    clearHashTimers();

    if (!hash) {
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToHash = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
      }
    };
    hashTimersRef.current = [80, 260, 620].map(delay => window.setTimeout(scrollToHash, delay));

    return clearHashTimers;
  }, [hash, pathname]);

  useEffect(() => {
    const handleAnchorClick = event => {
      const anchor = event.target.closest?.('a[href*="#"]');
      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) {
        return;
      }

      event.preventDefault();
      clearHashTimers();
      window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
      target.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 360);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={18} />
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
