import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useTheme, useGyro } from '../App';

// ─── Animated mesh gradient background ───
const meshMove = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(30px, -40px) rotate(90deg) scale(1.1); }
  50% { transform: translate(-20px, 20px) rotate(180deg) scale(0.95); }
  75% { transform: translate(40px, 10px) rotate(270deg) scale(1.05); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-50px, 30px) rotate(120deg); }
  66% { transform: translate(30px, -50px) rotate(240deg); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -30px) scale(1.15); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 1.5rem;
  background: ${props => props.theme.colors.background};
  perspective: 1000px;
`;

// Animated mesh gradient overlay
const MeshGradient = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(16, 185, 129, 0.08) 0%, transparent 40%);
  background-size: 200% 200%;
  animation: ${meshMove} 20s ease infinite;
  z-index: 0;
  pointer-events: none;
`;

// Floating geometric shapes for depth
const FloatingShape = styled.div`
  position: absolute;
  border-radius: ${props => props.shape === 'circle' ? '50%' : props.shape === 'ring' ? '50%' : '8px'};
  pointer-events: none;
  z-index: 1;
  
  ${props => props.shape === 'ring' && css`
    border: 2px solid rgba(124, 58, 237, ${props.opacity || 0.15});
    background: transparent;
  `}
  
  ${props => props.shape === 'circle' && css`
    background: radial-gradient(circle, rgba(124, 58, 237, ${props.opacity || 0.08}), transparent);
  `}
  
  ${props => props.shape === 'square' && css`
    background: rgba(236, 72, 153, ${props.opacity || 0.06});
    transform: rotate(45deg);
  `}
`;

const Shape1 = styled(FloatingShape)`
  width: 120px;
  height: 120px;
  top: 15%;
  left: 8%;
  animation: ${float1} 18s ease-in-out infinite;
`;

const Shape2 = styled(FloatingShape)`
  width: 80px;
  height: 80px;
  top: 70%;
  right: 12%;
  animation: ${float2} 15s ease-in-out infinite;
`;

const Shape3 = styled(FloatingShape)`
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 15%;
  animation: ${float3} 12s ease-in-out infinite;
`;

const Shape4 = styled(FloatingShape)`
  width: 200px;
  height: 200px;
  top: 10%;
  right: 5%;
  animation: ${float2} 22s ease-in-out infinite reverse;
`;

const Shape5 = styled(FloatingShape)`
  width: 40px;
  height: 40px;
  top: 45%;
  left: 60%;
  animation: ${float1} 14s ease-in-out infinite;
`;

const Spotlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    600px circle at var(--x) var(--y),
    rgba(124, 58, 237, 0.25),
    rgba(59, 130, 246, 0.12),
    transparent 50%
  );
  z-index: 1;
  pointer-events: none;
  filter: blur(30px);
  mix-blend-mode: screen;
  transition: background 0.15s ease;
`;

const TiltContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 2;
  text-align: center;
  transform-style: preserve-3d;
`;

const glitch = keyframes`
  0% { transform: translate(0); text-shadow: none; }
  20% { transform: translate(-2px, 2px); text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9; }
  40% { transform: translate(-2px, -2px); text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; }
  60% { transform: translate(2px, 2px); text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9; }
  80% { transform: translate(2px, -2px); text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; }
  100% { transform: translate(0); text-shadow: none; }
`;

const GlitchTitle = styled(motion.h1)`
  font-size: clamp(3rem, 12vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
  
  &:hover {
    animation: ${glitch} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
  }

  &::before, &::after {
    display: none;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 2.5rem);
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff00c1, #00fff9, #ff00c1);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite;
`;

const CrazyLine = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-family: 'Courier New', monospace;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-height: 1.5em;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  transform: translateZ(50px);
  flex-wrap: wrap;
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(124, 58, 237, 0.1); }
  50% { box-shadow: 0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.2); }
`;

const ModernButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  /* Shimmer overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::after {
    left: 100%;
  }
  
  ${props => props.primary ? `
    background: ${props.theme.colors.text};
    color: ${props.theme.colors.background};
    border: 1px solid ${props.theme.colors.text};
    animation: ${glowPulse} 3s ease-in-out infinite;
    
    &:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 0 50px rgba(124, 58, 237, 0.8), inset 0 0 20px rgba(255,255,255,0.2);
    }
  ` : `
    background: rgba(0,0,0,0.2);
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      border-color: #00fff9;
      color: #00fff9;
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 0 30px rgba(0, 255, 249, 0.3), inset 0 0 10px rgba(0, 255, 249, 0.05);
    }
  `}
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  transform: translateZ(30px);
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #00fff9;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #00fff9;
    transform: scale(1.4) translateY(-3px);
    text-shadow: 0 0 20px rgba(0, 255, 249, 0.5);
    
    &::after {
      transform: translateX(-50%) scale(1);
    }
  }
`;

// Scroll indicator
const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  
  @media (max-width: 768px) {
    bottom: 1rem;
  }
`;

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.5; }
`;

const ScrollDot = styled.div`
  width: 20px;
  height: 32px;
  border: 2px solid ${props => props.theme.colors.textLight};
  border-radius: 12px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 6px;
    border-radius: 2px;
    background: ${props => props.theme.colors.primary};
    animation: ${scrollBounce} 2s ease-in-out infinite;
  }
`;

const ScrollText = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
`;

// Scramble Hook
const useScramble = (text) => {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    setTimeout(startScramble, 1000);

    return () => clearInterval(interval);
  }, [text]);

  return display;
};

const Hero = () => {
  const { isGyroEnabled } = useGyro();

  // Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(x, [0, window.innerWidth], [-10, 10]);

  // Handle Mouse Move for Tilt & Spotlight (Desktop / Default)
  useEffect(() => {
    if (isGyroEnabled) return;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y, isGyroEnabled]);

  // Handle Gyroscope (Mobile)
  useEffect(() => {
    if (!isGyroEnabled) return;

    const handleOrientation = (e) => {
      const gamma = e.gamma || 0;
      const beta = e.beta || 0;

      const limitedGamma = Math.max(-45, Math.min(45, gamma));
      const limitedBeta = Math.max(-45, Math.min(45, beta));

      const screenX = (limitedGamma + 45) / 90 * window.innerWidth;
      const screenY = (limitedBeta + 45) / 90 * window.innerHeight;

      x.set(screenX);
      y.set(screenY);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isGyroEnabled, x, y]);

  // Scramble Text
  const scrambledText = useScramble("Building data systems that scale.");

  // Parallax scroll for spotlight
  const { scrollY } = useScroll();
  const spotlightY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <HeroSection id="home">
      <MeshGradient />
      <Shape1 shape="ring" opacity={0.12} />
      <Shape2 shape="circle" opacity={0.06} />
      <Shape3 shape="square" opacity={0.05} />
      <Shape4 shape="ring" opacity={0.08} />
      <Shape5 shape="circle" opacity={0.1} />
      
      <Spotlight style={{ '--x': x, '--y': y, y: spotlightY }} />

      <TiltContainer style={{ rotateX, rotateY }}>
        <GlitchTitle
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        >
          SAYNAM SHARMA
        </GlitchTitle>

        <HeroSubtitle
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          DATA ENGINEER | PIPELINE ARCHITECT
        </HeroSubtitle>

        <CrazyLine>
          {scrambledText}
        </CrazyLine>

        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ModernButton href="#projects" primary>
            View Work
          </ModernButton>
          <ModernButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </ModernButton>
          <ModernButton href="#contact">
            Contact Me
          </ModernButton>
        </ButtonContainer>

        <SocialLinks
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <SocialLink href="https://github.com/Saynam221b" target="_blank"><i className="fab fa-github"></i></SocialLink>
          <SocialLink href="https://www.linkedin.com/in/saynam-sharma/" target="_blank"><i className="fab fa-linkedin-in"></i></SocialLink>
          <SocialLink href="https://twitter.com/saynam_sharma" target="_blank"><i className="fab fa-twitter"></i></SocialLink>
          <SocialLink href="https://d3xtrverse.vercel.app/" target="_blank"><i className="fas fa-gamepad"></i></SocialLink>
        </SocialLinks>
      </TiltContainer>
      
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <ScrollDot />
        <ScrollText>Scroll</ScrollText>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;