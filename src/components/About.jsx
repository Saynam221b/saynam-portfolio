import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const AboutSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${props => props.isDarkMode ?
    props.theme.colors.background :
    'transparent'
  };
`;

const AboutContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  
  strong {
    color: ${props => props.theme.colors.primary};
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const HighlightItem = styled(motion.div)`
  padding: 1.5rem;
  background: ${props => props.theme.colors.cardBg};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const HighlightValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  background: ${props => props.theme.gradients.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HighlightLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <AboutSection id="about" isDarkMode={isDarkMode}>
      <AboutContainer>
        <SectionTitle>About Me</SectionTitle>
        <Content>
          I build <strong>high-performance data engines</strong>. With a background in electronics and a passion for distributed systems, I specialize in taming massive datasets using Spark, Airflow, and Cloud Architectures.
        </Content>
        <Content>
          When I'm not optimizing pipelines, I'm building the <strong><a href="https://d3xtrverse.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>D3xTRverse</a></strong> community.
        </Content>

        <HighlightGrid>
          <HighlightItem whileHover={{ y: -5 }}>
            <HighlightValue>3+</HighlightValue>
            <HighlightLabel>Years Experience</HighlightLabel>
          </HighlightItem>
          <HighlightItem whileHover={{ y: -5 }}>
            <HighlightValue>TB+</HighlightValue>
            <HighlightLabel>Data Processed Daily</HighlightLabel>
          </HighlightItem>
          <HighlightItem whileHover={{ y: -5 }}>
            <HighlightValue>40%</HighlightValue>
            <HighlightLabel>Latency Reduced</HighlightLabel>
          </HighlightItem>
        </HighlightGrid>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;