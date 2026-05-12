import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
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
    bottom: 18px;
    right: 18px;
    width: 40px;
    height: 40px;
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

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
