import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const ExperienceContainer = styled.section`
  padding: 6rem 2rem;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 700;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: ${props => props.theme.primary};
    margin: 0.8rem auto 0;
    border-radius: 5px;
  }
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 3px;
    background: linear-gradient(to bottom, 
      ${props => props.theme.primary}50, 
      ${props => props.theme.primary}20
    );
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    &::after {
      left: 31px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => (props.position === 'right' ? '50%' : '0')};
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
    top: 50%;
    right: ${props => (props.position === 'left' ? '-48px' : 'auto')};
    left: ${props => (props.position === 'right' ? '-48px' : 'auto')};
    transform: translateY(-50%);
    z-index: 1;
    box-shadow: 0 0 0 5px ${props => props.theme.primary}20;
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding-left: 70px;
    margin-bottom: 2rem;

    &::before {
      left: 23px;
    }
  }
`;

const ExperienceCard = styled(motion.div)`
  background-color: ${props => props.theme.cardBg};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.text.primary}10;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${props => props.theme.primary};
    border-radius: 5px 0 0 5px;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-5px);
    background-color: ${props => props.theme.cardHoverBg};
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const CompanyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const CompanyName = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const JobTitle = styled.h4`
  color: ${props => props.theme.text.accent};
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Duration = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.ul`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-left: 1.2rem;

  li {
    margin-bottom: 0.8rem;
    position: relative;
    
    &::marker {
      color: ${props => props.theme.primary};
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.5rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.primary}15;
  color: ${props => props.theme.text.accent};
  padding: 0.4rem 0.9rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.primary}30;
  
  &:hover {
    background-color: ${props => props.theme.primary}25;
    transform: translateY(-2px);
  }
`;

function Experience() {
  const experiences = [
    {
      company: "Cognizant",
      title: "Senior Data Engineer",
      duration: "Jan 2022 - Present",
      description: [
        "Lead a team of 5 data engineers to build and maintain ETL pipelines processing 15TB+ of healthcare data daily",
        "Designed and implemented data quality monitoring framework that reduced data errors by 60%",
        "Optimized Spark processing jobs resulting in 40% reduction in cloud computing costs",
        "Collaborated with data science team to deploy ML models into production for real-time patient risk assessment"
      ],
      techStack: ["Python", "Apache Spark", "AWS", "Snowflake", "Airflow", "Kubernetes"]
    },
    {
      company: "Tata Consultancy Services",
      title: "Data Engineer",
      duration: "Aug 2019 - Dec 2021",
      description: [
        "Developed and maintained data pipelines using Apache Airflow for financial services clients",
        "Implemented data governance processes that ensured 99.9% regulatory compliance",
        "Reduced data processing time by 50% through query optimization and parallel processing",
        "Built real-time dashboards using Tableau for executive leadership"
      ],
      techStack: ["Python", "SQL", "Databricks", "Azure", "Tableau", "Git"]
    },
    {
      company: "Infosys",
      title: "Associate Developer",
      duration: "Jun 2017 - Jul 2019",
      description: [
        "Developed RESTful APIs and microservices using Node.js and Express",
        "Created and maintained MongoDB databases for e-commerce applications",
        "Implemented CI/CD pipelines that reduced deployment time by 70%",
        "Collaborated with UX designers to improve front-end applications"
      ],
      techStack: ["JavaScript", "Node.js", "MongoDB", "React", "Docker", "Jenkins"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ExperienceContainer id="experience">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Work Experience
      </SectionTitle>
      
      <TimelineContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <TimelineItem 
            key={index} 
            position={index % 2 === 0 ? 'left' : 'right'}
            variants={itemVariants}
          >
            <ExperienceCard
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <CompanyWrapper>
                <CompanyName>{exp.company}</CompanyName>
              </CompanyWrapper>
              <JobTitle>
                <FaBriefcase style={{ color: 'inherit', fontSize: '0.9rem' }} />
                {exp.title}
              </JobTitle>
              <Duration>
                <FaCalendarAlt style={{ color: 'inherit', fontSize: '0.8rem' }} />
                {exp.duration}
              </Duration>
              <Description>
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Description>
              <TechStack>
                {exp.techStack.map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechStack>
            </ExperienceCard>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </ExperienceContainer>
  );
}

export default Experience;
