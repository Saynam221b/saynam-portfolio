import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const IntroText = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 700;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 2.5rem;
  font-weight: 600;
  opacity: 0.95;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 3rem;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
`;

const DownloadButton = styled(motion.a)`
  background-color: #6b7280;
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
  border: 2px solid #6b7280;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #9ca3af, transparent);
    z-index: -1;
    transition: all 0.3s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
  }

  &:hover:before {
    opacity: 1;
  }
`;

const introVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

function Introduction() {
  return (
    <IntroContainer id="introduction">
      <IntroText>
        <Title>
          Hi, I'm Saynam Sharma
        </Title>
        <Subtitle>
          Data Engineer & Full Stack Developer
        </Subtitle>
        <Description>
          Passionate about transforming data into meaningful insights and building scalable applications.
        </Description>
        <DownloadButton
          href="https://5nhj4mbbqhp4fsgg.public.blob.vercel-storage.com/resume-g4oaCPtkMcxj6VcTzAMSbwmhaFBemF.pdf"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Download Resume
        </DownloadButton>
      </IntroText>
    </IntroContainer>
  );
}

export default Introduction;
