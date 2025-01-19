import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
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
  z-index: 0;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.theme.text.accent};
  border-radius: 50%;
  opacity: ${props => props.opacity};
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  filter: blur(${props => props.blur}px);
`;

const GradientOrb = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.theme.isDarkMode ? 
    'radial-gradient(circle, rgba(0, 188, 212, 0.1) 0%, transparent 70%)' : 
    'radial-gradient(circle, rgba(0, 188, 212, 0.05) 0%, transparent 70%)'};
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

function BackgroundParticles() {
  const particles = Array(15).fill().map((_, i) => ({
    size: Math.random() * 4 + 2,
    opacity: Math.random() * 0.3 + 0.1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 2,
    blur: Math.random() * 2 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100
  }));

  const orbs = Array(3).fill().map((_, i) => ({
    size: Math.random() * 300 + 200,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    top: Math.random() * 100,
    left: Math.random() * 100
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
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`
          }}
        />
      ))}
      {orbs.map((orb, index) => (
        <GradientOrb
          key={`orb-${index}`}
          size={orb.size}
          duration={orb.duration}
          delay={orb.delay}
          top={orb.top}
          left={orb.left}
        />
      ))}
    </BackgroundContainer>
  );
}

export default BackgroundParticles; 