import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';

const meshMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const orbitSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const orbitSpinReverse = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${props => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
  
  /* Subtle mesh gradient background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 30% 40%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(236, 72, 153, 0.06) 0%, transparent 50%);
    background-size: 200% 200%;
    animation: ${meshMove} 8s ease infinite;
  }
`;

const OrbitalSystem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoreDot = styled(motion.div)`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7C3AED, #EC4899);
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.2);
  z-index: 2;
`;

const OrbitRing = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid transparent;
`;

const Ring1 = styled(OrbitRing)`
  width: 60px;
  height: 60px;
  border-top-color: rgba(124, 58, 237, 0.6);
  border-right-color: rgba(124, 58, 237, 0.15);
  animation: ${orbitSpin} 2s linear infinite;
`;

const Ring2 = styled(OrbitRing)`
  width: 85px;
  height: 85px;
  border-bottom-color: rgba(236, 72, 153, 0.5);
  border-left-color: rgba(236, 72, 153, 0.1);
  animation: ${orbitSpinReverse} 3s linear infinite;
`;

const Ring3 = styled(OrbitRing)`
  width: 100px;
  height: 100px;
  border-top-color: rgba(59, 130, 246, 0.3);
  animation: ${orbitSpin} 5s linear infinite;
`;

const LoaderText = styled(motion.div)`
  margin-top: 2.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const BrandName = styled(motion.h2)`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  
  span {
    background: linear-gradient(135deg, #7C3AED, #EC4899);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StatusText = styled(motion.p)`
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  color: ${props => props.theme.colors.textLight};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const ProgressTrack = styled(motion.div)`
  width: 160px;
  height: 2px;
  background: ${props => props.theme.colors.border};
  border-radius: 2px;
  margin-top: 1.25rem;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #7C3AED, #EC4899);
  border-radius: 2px;
`;

const phrases = [
  "initializing",
  "loading assets",
  "building layout",
  "almost ready",
];

const Loader = ({ finishLoading }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex(prev => Math.min(prev + 1, phrases.length - 1));
    }, 600);
    
    const timer = setTimeout(() => {
      finishLoading();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearInterval(phraseInterval);
    };
  }, [finishLoading]);

  return (
    <LoaderContainer
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <OrbitalSystem>
        <Ring3 />
        <Ring2 />
        <Ring1 />
        <CoreDot
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        />
      </OrbitalSystem>
      
      <LoaderText>
        <BrandName
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Saynam<span>.</span>
        </BrandName>
        
        <AnimatePresence mode="wait">
          <StatusText
            key={phraseIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {phrases[phraseIndex]}
          </StatusText>
        </AnimatePresence>
        
        <ProgressTrack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              delay: 0.6,
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          />
        </ProgressTrack>
      </LoaderText>
    </LoaderContainer>
  );
};

export default Loader;