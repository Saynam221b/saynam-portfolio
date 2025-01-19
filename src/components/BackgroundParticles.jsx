import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.isDarkMode ? 
    'rgba(0, 188, 212, 0.3)' : // More visible in dark mode
    'rgba(0, 188, 212, 0.15)' // Subtle in light mode
  };
  border-radius: ${props => props.shape === 'circle' ? '50%' : '20%'};
  opacity: ${props => props.opacity};
  animation: ${float} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  filter: blur(${props => props.blur}px);
  box-shadow: 0 0 10px ${props => props.isDarkMode ? 
    'rgba(0, 188, 212, 0.2)' : 
    'rgba(0, 188, 212, 0.1)'
  };
`;

function BackgroundParticles() {
  const { isDarkMode } = useTheme();

  const particles = Array(25).fill().map((_, i) => ({
    size: Math.random() * 8 + 3,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    blur: Math.random() * 1 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    shape: Math.random() > 0.5 ? 'circle' : 'square'
  }));

  return (
    <BackgroundContainer>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          size={particle.size}
          opacity={particle.opacity}
          duration={particle.duration}
          delay={particle.delay}
          blur={particle.blur}
          shape={particle.shape}
          isDarkMode={isDarkMode}
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`
          }}
        />
      ))}
    </BackgroundContainer>
  );
}

export default BackgroundParticles; 