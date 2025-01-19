import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled(motion.button)`
  background: ${props => props.theme.toggleBg};
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.headerShadow};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const IconWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem;
    color: ${props => props.theme.toggleIcon};
  }
`;

const sunVariants = {
  initial: { y: 30, opacity: 0, rotate: -90 },
  enter: { 
    y: 0, 
    opacity: 1, 
    rotate: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    y: -30, 
    opacity: 0,
    rotate: 90,
    transition: { 
      duration: 0.5,
      ease: "easeIn"
    }
  }
};

const moonVariants = {
  initial: { y: 30, opacity: 0, scale: 0.5 },
  enter: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    y: -30, 
    opacity: 0,
    scale: 1.5,
    transition: { 
      duration: 0.5,
      ease: "easeIn"
    }
  }
};

// Add a glow effect
const Glow = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.isDarkMode ? 
    'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)' : 
    'radial-gradient(circle, rgba(255, 166, 0, 0.2) 0%, transparent 70%)'};
`;

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Glow
        isDarkMode={isDarkMode}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <AnimatePresence mode='wait'>
        {isDarkMode ? (
          <IconWrapper
            key="sun"
            variants={sunVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <FaSun />
          </IconWrapper>
        ) : (
          <IconWrapper
            key="moon"
            variants={moonVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <FaMoon />
          </IconWrapper>
        )}
      </AnimatePresence>
    </ToggleButton>
  );
}

export default ThemeToggle; 