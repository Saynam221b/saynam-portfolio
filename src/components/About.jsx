import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const floatOrb = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.05); }
  66% { transform: translate(-15px, 15px) scale(0.95); }
`;

const AboutSection = styled.section`
  padding: 5rem 1.5rem;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

// Decorative floating orbs
const FloatingOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(60px);
`;

const Orb1 = styled(FloatingOrb)`
  width: 300px;
  height: 300px;
  top: 10%;
  right: -5%;
  background: rgba(124, 58, 237, 0.08);
  animation: ${floatOrb} 15s ease-in-out infinite;
`;

const Orb2 = styled(FloatingOrb)`
  width: 200px;
  height: 200px;
  bottom: 10%;
  left: -3%;
  background: rgba(236, 72, 153, 0.06);
  animation: ${floatOrb} 18s ease-in-out infinite reverse;
`;

const AboutContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.85;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HighlightItem = styled(motion.div)`
  padding: 2rem 1.5rem;
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    border-color: ${props => props.theme.colors.primary}33;
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(124, 58, 237, 0.08);
  }
`;

const HighlightValue = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: ${props => props.theme.gradients.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
`;

const HighlightLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  line-height: 1.4;
`;

// Animated counter hook
const useCounter = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    const numericEnd = parseInt(end, 10);
    if (isNaN(numericEnd)) {
      setCount(end);
      return;
    }

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return { count, ref };
};

const highlights = [
  { value: '3', suffix: '+', label: 'Years in Data Engineering' },
  { value: '50', prefix: '~', suffix: '%', label: 'Pipeline Runtime Reduction' },
  { value: 'TB', suffix: '+', label: 'Data Processed at Scale', isText: true },
];

const CounterValue = ({ item }) => {
  const { count, ref } = useCounter(item.isText ? 0 : item.value);
  
  if (item.isText) {
    return <HighlightValue ref={ref}>{item.value}{item.suffix}</HighlightValue>;
  }
  
  return (
    <HighlightValue ref={ref}>
      {item.prefix || ''}{count}{item.suffix || ''}
    </HighlightValue>
  );
};

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <AboutSection id="about">
      <Orb1 />
      <Orb2 />
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
              <HighlightItem isDarkMode={isDarkMode} whileHover={{ y: -5 }}>
                <CounterValue item={item} />
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