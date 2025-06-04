import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { useTheme } from '../App';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 80px 1.5rem 0;
  
  @media (max-width: 768px) {
    padding-top: 70px;
    min-height: calc(100vh - 10px);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 2rem 0;
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  text-align: center;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    text-align: left;
  }
`;

const gradientText = keyframes`
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

const HeroTitle = styled(motion.h1)`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${props => props.theme.gradients.primary};
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientText} 4s ease infinite;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 3.2rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background: ${props => props.theme.colors.primary}10;
  }
`;

const AnimationContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 500px;
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  opacity: 0.1;
  z-index: -1;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.cardBg};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const Hero = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <HeroSection id="home">
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm Saynam Sharma
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Data Engineer & Full Stack Developer
          </HeroSubtitle>
          
          <HeroText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I specialize in building robust data pipelines and creating scalable web applications. 
            With expertise in both data engineering and full-stack development, I deliver end-to-end 
            solutions that transform data into valuable insights.
          </HeroText>
          
          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PrimaryButton 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </PrimaryButton>
            
            <SecondaryButton 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </SecondaryButton>
          </ButtonContainer>
          
          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SocialLink 
              href="https://www.linkedin.com/in/saynam-sharma/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
            
            <SocialLink 
              href="https://github.com/Saynam221b" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </SocialLink>
            
            <SocialLink 
              href="mailto:saynam1101@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-envelope"></i>
            </SocialLink>
            
            <SocialLink 
              href="https://twitter.com/saynam_sharma" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-twitter"></i>
            </SocialLink>
          </SocialLinks>
        </HeroContent>
        
        <AnimationContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BackgroundCircle
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json"
            style={{ width: '100%', height: '100%' }}
          />
        </AnimationContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero; 