import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const IntroContainer = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 1400px;
  padding: 2rem;
  scroll-margin-top: 80px;
`;

const IntroContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const IntroText = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    text-align: center;
    max-width: 100%;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 400px;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: ${props => props.theme.cardShadow};
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.secondary} 100%);
  opacity: 0.1;
  z-index: 0;
  
  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }
`;

const Greeting = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    width: 40px;
    height: 2px;
    background-color: ${props => props.theme.primary};
    margin-right: 1rem;
    display: inline-block;
  }
  
  @media (max-width: 1024px) {
    justify-content: center;
    
    &:before {
      display: none;
    }
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.primary};
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.75rem;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 1.5rem;
  font-weight: 600;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 2rem;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    margin: 0 auto 2rem;
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.a)`
  background: ${props => props.theme.buttonGradient};
  color: white;
  padding: 0.8rem 2rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(2, 132, 199, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.4);
    background: ${props => props.theme.buttonHoverGradient};
  }
`;

const SecondaryButton = styled(motion.a)`
  background: transparent;
  color: ${props => props.theme.text.primary};
  padding: 0.8rem 2rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
  border: 2px solid ${props => props.theme.text.primary};
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.text.secondary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-3px);
  }
`;

function Introduction() {
  const { isDarkMode } = useTheme();
  
  return (
    <IntroContainer id="introduction">
      <IntroContent>
        <IntroText>
          <Greeting
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hello, I'm
          </Greeting>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Saynam Sharma
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Data Engineer & Full Stack Developer
          </Subtitle>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            I specialize in building robust data pipelines and creating scalable web applications. 
            With expertise in both data engineering and full-stack development, I deliver end-to-end 
            solutions that transform data into valuable insights.
          </Description>
          
          <ButtonsContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <PrimaryButton href="#contact">Get In Touch</PrimaryButton>
            <SecondaryButton 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download Resume
            </SecondaryButton>
          </ButtonsContainer>
          
          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <SocialLink 
              href="https://www.linkedin.com/in/saynam-sharma/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <i className="fab fa-linkedin"></i>
            </SocialLink>
            <SocialLink 
              href="https://github.com/Saynam221b" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink 
              href="mailto:saynam1101@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <i className="fas fa-envelope"></i>
            </SocialLink>
          </SocialLinks>
        </IntroText>
        
        <ImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BackgroundCircle
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <ProfileImage 
            src="/profile.jpg" 
            alt="Saynam Sharma" 
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/350x350.png?text=Saynam+Sharma";
            }}
          />
        </ImageContainer>
      </IntroContent>
    </IntroContainer>
  );
}

export default Introduction;
