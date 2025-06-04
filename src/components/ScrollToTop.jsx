import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
    font-size: 1rem;
  }
`;

const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowIcon
            initial={{ y: 0 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <i className="fas fa-arrow-up"></i>
          </ArrowIcon>
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 