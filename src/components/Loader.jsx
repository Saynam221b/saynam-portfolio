import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LoaderCircle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  background-size: 200% 200%;
  animation: ${gradient} 2s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.5);
  
  &:before {
    content: '';
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${props => props.theme.colors.background};
    z-index: 1;
  }
`;

const LoaderText = styled(motion.h2)`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  letter-spacing: 0.5px;
  text-align: center;
`;

const CreativeText = styled(motion.span)`
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${gradient} 3s linear infinite;
`;

const LoadingBar = styled(motion.div)`
  width: 200px;
  height: 4px;
  background: rgba(124, 58, 237, 0.2);
  border-radius: 4px;
  margin-top: 1.5rem;
  overflow: hidden;
  position: relative;
`;

const LoadingBarFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: 4px;
`;

const LoaderRing = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #ec4899;
  border-left-color: #8b5cf6;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: 0.5,
      duration: 0.5
    }
  }
};

const barVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delay: 0.8,
      duration: 0.5
    }
  }
};

const fillVariants = {
  hidden: { width: 0 },
  visible: { 
    width: '100%',
    transition: { 
      delay: 1,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

const phrases = [
  "Brewing data magic...",
  "Crafting digital experiences...",
  "Transforming code into art...",
  "Assembling digital brilliance...",
  "Igniting innovation...",
  "Unleashing creativity..."
];

const Loader = ({ finishLoading }) => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  
  useEffect(() => {
    // Change phrase every 500ms
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prev => {
        const currentIndex = phrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % phrases.length;
        return phrases[nextIndex];
      });
    }, 500);
    
    // Set timeout for finishing loading
    const timer = setTimeout(() => {
      finishLoading();
    }, 3000); // 3 seconds loading time

    return () => {
      clearTimeout(timer);
      clearInterval(phraseInterval);
    };
  }, [finishLoading]);

  return (
    <LoaderContainer
      as={motion.div}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <LoaderCircle>
        <LoaderRing />
      </LoaderCircle>
      
      <LoaderText variants={textVariants}>
        <CreativeText>{currentPhrase}</CreativeText>
      </LoaderText>
      
      <LoadingBar variants={barVariants}>
        <LoadingBarFill variants={fillVariants} />
      </LoadingBar>
    </LoaderContainer>
  );
};

export default Loader; 