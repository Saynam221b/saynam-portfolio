import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

const IntroContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 1400px;
  scroll-margin-top: 80px;
`;

const IntroContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const IntroText = styled(motion.div)`
  text-align: left;
  max-width: 600px;
  padding: 2rem;
  border-radius: 10px;
  
  @media (max-width: 992px) {
    text-align: center;
    padding: 1rem;
  }
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: url('https://i.imgur.com/sGXQRvY.jpg') center/cover no-repeat;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg, 
      ${props => props.theme.primary}20 0%, 
      transparent 50%, 
      ${props => props.theme.primary}20 100%
    );
    z-index: 1;
  }
`;

const ProfileImageBorder = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 20px;
  z-index: -1;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.text.accent};
  margin-bottom: 1.5rem;
  font-weight: 600;
  opacity: 0.95;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 992px) {
    align-items: center;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text.secondary};
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateX(3px);
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 2rem;
  font-weight: 400;
`;

const HighlightedText = styled.span`
  color: ${props => props.theme.primary};
  font-weight: 600;
`;

const SocialLinksWrapper = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-3px);
  }
`;

const ButtonsWrapper = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 0.8rem 2rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, ${props => props.theme.primary}80, transparent);
    z-index: -1;
    transition: all 0.3s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px ${props => props.theme.primary}40;
  }

  &:hover:before {
    opacity: 1;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${props => props.theme.text.primary};
  border: 2px solid ${props => props.theme.primary};
  
  &:before {
    background: linear-gradient(45deg, ${props => props.theme.primary}40, transparent);
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

function Introduction() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <IntroContainer id="introduction">
      <IntroContentWrapper>
        <IntroText
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5 }}
        >
          <SocialLinksWrapper
            variants={socialVariants}
            initial="hidden"
            animate="visible"
          >
            <SocialLink 
              href="https://www.linkedin.com/in/saynam-sharma/" 
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              <FaLinkedin />
            </SocialLink>
            <SocialLink 
              href="https://github.com/Saynam221b" 
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              <FaGithub />
            </SocialLink>
            <SocialLink 
              href="https://saynam-portfolio-19qy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              <FaTwitter />
            </SocialLink>
          </SocialLinksWrapper>
          
          <Title
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I'm Saynam Sharma
          </Title>
          
          <Subtitle
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Data Engineer & Full Stack Developer
          </Subtitle>
          
          <ContactInfo
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <ContactItem href="mailto:saynam1101@gmail.com">
              <FaEnvelope /> saynam1101@gmail.com
            </ContactItem>
            <ContactItem href="tel:+919419271101">
              <FaPhone /> +91 9419271101
            </ContactItem>
          </ContactInfo>
          
          <Description
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I specialize in building <HighlightedText>scalable data pipelines</HighlightedText> and 
            <HighlightedText> modern web applications</HighlightedText>. With expertise in both data engineering and 
            full-stack development, I bridge the gap between data and user-facing applications to create 
            end-to-end solutions.
          </Description>
          
          <ButtonsWrapper
            variants={socialVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PrimaryButton 
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              Download Resume
            </PrimaryButton>
            
            <SecondaryButton
              href="#contact"
              variants={itemVariants}
            >
              Contact Me
            </SecondaryButton>
          </ButtonsWrapper>
        </IntroText>
        
        <ProfileImageWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileImage />
          <ProfileImageBorder
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </ProfileImageWrapper>
      </IntroContentWrapper>
    </IntroContainer>
  );
}

export default Introduction;
