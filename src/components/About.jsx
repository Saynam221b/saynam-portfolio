import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const AboutSection = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${props => props.theme.colors.background};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 8rem 2rem;
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  color: ${props => props.theme.colors.text};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: center;
  }
`;

const AboutText = styled.div`
  flex: 1;
`;

const AboutParagraph = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const AboutStats = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: ${props => props.theme.gradients.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
`;

const HighlightText = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const AboutCTA = styled(motion.div)`
  margin-top: 2rem;
  text-align: center;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    text-align: left;
  }
`;

const CTAButton = styled(motion.a)`
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const About = () => {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionTitle>About Me</SectionTitle>
        
        <AboutContent>
          <AboutText>
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              I'm a <HighlightText>Data Engineer</HighlightText> and <HighlightText>Full Stack Developer</HighlightText> with a passion for building data-driven applications and scalable web solutions. With extensive experience in designing and implementing ETL pipelines, data warehousing, and creating interactive web applications, I bring technical expertise and creative problem-solving to every project.
            </AboutParagraph>
            
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              My background in both data engineering and web development allows me to bridge the gap between complex data systems and user-friendly interfaces, creating end-to-end solutions that not only process data efficiently but also present insights in an accessible way.
            </AboutParagraph>
            
            <AboutParagraph
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I'm constantly exploring new technologies and methodologies to enhance my skills and deliver better solutions. Whether it's optimizing data pipelines for performance or creating responsive user interfaces, I'm committed to excellence in every aspect of my work.
            </AboutParagraph>
            
            <AboutCTA
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <CTAButton 
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Experience
              </CTAButton>
            </AboutCTA>
          </AboutText>
          
          <AboutStats>
            <StatCard 
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <StatNumber>5+</StatNumber>
              <StatTitle>Years Experience</StatTitle>
            </StatCard>
            
            <StatCard 
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <StatNumber>20+</StatNumber>
              <StatTitle>Projects Completed</StatTitle>
            </StatCard>
            
            <StatCard 
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <StatNumber>10+</StatNumber>
              <StatTitle>Data Pipelines Built</StatTitle>
            </StatCard>
            
            <StatCard 
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <StatNumber>15+</StatNumber>
              <StatTitle>Web Applications</StatTitle>
            </StatCard>
          </AboutStats>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 