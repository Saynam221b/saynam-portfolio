import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

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
  font-size: 1.15rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  
  strong {
    color: ${props => props.theme.colors.primary};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
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
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
  }
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

const highlights = [
  { value: '3+', label: 'Years in Data Engineering' },
  { value: '~50%', label: 'Pipeline Runtime Reduction' },
  { value: 'TB+', label: 'Data Processed at Scale' },
];

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <AboutSection id="about" isDarkMode={isDarkMode}>
      <AboutContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>About Me</SectionTitle>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.15}>
          <Content>
            I'm a <strong>Data Engineer</strong> with 3+ years of experience designing and owning scalable batch and real-time data pipelines on <strong>Databricks</strong>, <strong>AWS</strong>, and <strong>Snowflake</strong>. I specialize in incremental data processing, schema evolution, and performance optimization for production systems handling large-scale datasets.
          </Content>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.25}>
          <Content>
            Strong focus on data reliability, pipeline observability, and building resilient ETL architectures. When I'm not optimizing Spark workloads, I'm building the <a href="https://d3xtrverse.vercel.app/" target="_blank" rel="noopener noreferrer">D3xTRverse</a> community.
          </Content>
        </AnimatedSection>

        <HighlightGrid>
          {highlights.map((item, index) => (
            <AnimatedSection
              key={item.label}
              animation="scaleIn"
              delay={staggerDelay(index, 0.3)}
            >
              <HighlightItem whileHover={{ y: -5 }}>
                <HighlightValue>{item.value}</HighlightValue>
                <HighlightLabel>{item.label}</HighlightLabel>
              </HighlightItem>
            </AnimatedSection>
          ))}
        </HighlightGrid>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;