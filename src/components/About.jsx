import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const AboutSection = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${props => props.isDarkMode ? 
    props.theme.colors.background : 
    'rgba(249, 250, 251, 0.5)'
  };
  
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutText = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const AboutDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const AboutImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.5) 0%, rgba(236, 72, 153, 0.5) 100%);
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HighlightText = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const EducationContainer = styled(motion.div)`
  margin-top: 3rem;
  padding: 2rem;
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 1.5rem;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
`;

const EducationItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DegreeName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const InstitutionName = styled.h5`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const EducationDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const GraduationDate = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const GPA = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.accent};
`;

const Location = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const About = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <AboutSection id="about" isDarkMode={isDarkMode}>
      <AboutContainer>
        <SectionTitle>About Me</SectionTitle>
        
        <AboutContent>
          <AboutText
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AboutDescription>
              Hello! I'm Saynam Sharma, a passionate <HighlightText>Data Engineer</HighlightText> with expertise in building scalable data pipelines and solutions. I specialize in designing and implementing <HighlightText>end-to-end ETL processes</HighlightText>, working with technologies like <HighlightText>AWS</HighlightText>, <HighlightText>Snowflake</HighlightText>, <HighlightText>Airflow</HighlightText>, and <HighlightText>Databricks</HighlightText>.
            </AboutDescription>
            
            <AboutDescription>
              My journey in the data world has equipped me with strong skills in <HighlightText>Python</HighlightText>, <HighlightText>SQL</HighlightText>, and <HighlightText>Spark</HighlightText>. I'm passionate about transforming raw data into meaningful insights that drive business decisions. I enjoy tackling complex data challenges and building efficient, scalable solutions.
            </AboutDescription>
            
            <AboutDescription>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enhancing my skills through continuous learning. I'm always eager to collaborate on innovative data projects and solve real-world problems through data engineering.
            </AboutDescription>
            
            <EducationContainer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <EducationTitle>Education</EducationTitle>
              
              <EducationItem>
                <DegreeName>B.E in Electronics and Communication</DegreeName>
                <InstitutionName>Sir M Visvesvaraya Institute of Technology</InstitutionName>
                <EducationDetails>
                  <GraduationDate>Graduated: August 2022</GraduationDate>
                  <GPA>7.0 CGPA</GPA>
                </EducationDetails>
                <Location>Bangalore, India</Location>
              </EducationItem>
            </EducationContainer>
          </AboutText>
          
          <AboutImageContainer
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AboutImage 
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              alt="Data Engineering Visualization" 
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Data+Engineering";
              }}
            />
          </AboutImageContainer>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 