import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactContainer = styled(motion.div)`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: calc(100vh - 60px);
  background: transparent;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00bcd4, #2196f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(5px);
  padding: 2rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
`;

const ContactLink = styled.a`
  color: #00bcd4;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #2196f3;
    transform: translateX(5px);
  }
`;

const SocialIcons = styled(motion.div)`
  display: flex;
  gap: 30px;
  font-size: 2.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    color: #00bcd4;
    transform: translateY(-3px);
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

function Contact() {
  return (
    <ContactContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Title variants={itemVariants}>Contact Me</Title>
      <ContactInfo variants={itemVariants}>
        <ContactLink href="mailto:saynamsharma221b@gmail.com">
          <FaEnvelope />
          saynamsharma221b@gmail.com
        </ContactLink>
      </ContactInfo>
      <SocialIcons variants={itemVariants}>
        <SocialLink href="https://github.com/saynam221b" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/saynam-sharma" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </SocialLink>
      </SocialIcons>
    </ContactContainer>
  );
}

export default Contact;
