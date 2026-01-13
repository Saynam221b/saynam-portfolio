import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTheme, useGyro } from '../App';

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

const Spotlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    800px circle at var(--x) var(--y),
    rgba(124, 58, 237, 0.4),
    rgba(59, 130, 246, 0.2),
    transparent 50%
  );
  z-index: 1;
  pointer-events: none;
  filter: blur(20px);
  mix-blend-mode: screen;
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
  background: linear-gradient(90deg, #ff00c1, #00fff9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CrazyLine = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-family: 'Courier New', monospace;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-height: 1.5em; /* Prevent layout shift */
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  transform: translateZ(50px); /* Lift off the page */
`;

const ModernButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  ${props => props.primary ? `
    background: ${props.theme.colors.text};
    color: ${props.theme.colors.background};
    border: 1px solid ${props.theme.colors.text};
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 40px rgba(124, 58, 237, 0.8), inset 0 0 20px rgba(255,255,255,0.2);
    }
  ` : `
    background: rgba(0,0,0,0.3);
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      border-color: #00fff9;
      color: #00fff9;
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(0, 255, 249, 0.3);
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
  transition: all 0.3s ease;
  
  &:hover {
    color: #00fff9;
    transform: scale(1.5) rotate(15deg);
    text-shadow: 0 0 15px #00fff9;
  }
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

    // Delay start slightly
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
    if (isGyroEnabled) return; // Skip mouse logic if gyro is on

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
      // Gamma: Left/Right tilt (-90 to 90) -> Map to Y rotation
      // Beta: Front/Back tilt (-180 to 180) -> Map to X rotation

      const gamma = e.gamma || 0;
      const beta = e.beta || 0;

      // Normalize inputs for smoother effect
      // Clamp values to avoid extreme flips
      const limitedGamma = Math.max(-45, Math.min(45, gamma));
      const limitedBeta = Math.max(-45, Math.min(45, beta));

      // Map to screen coordinates (simulating mouse position)
      const screenX = (limitedGamma + 45) / 90 * window.innerWidth;
      const screenY = (limitedBeta + 45) / 90 * window.innerHeight;

      x.set(screenX);
      y.set(screenY);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isGyroEnabled, x, y]);

  // Scramble Text
  const scrambledText = useScramble("Architecting Data. Broadcasting Chaos.");

  return (
    <HeroSection id="home">
      <Spotlight style={{ '--x': x, '--y': y }} />

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
          DATA ENGINEER | PART-TIME YOUTUBER
        </HeroSubtitle>

        <CrazyLine>
          {scrambledText}
        </CrazyLine>

        <ButtonContainer
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <ModernButton href="#projects" primary theme={{ colors: { text: '#fff', background: '#000', border: '#333' } }}>
            View Work
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
    </HeroSection>
  );
};

export default Hero;