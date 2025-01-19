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
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
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
  margin-bottom: 2rem;
  font-weight: 600;
  opacity: 0.95;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 2rem;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
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
      </IntroText>
    </IntroContainer>
  );
}

export default Introduction;
