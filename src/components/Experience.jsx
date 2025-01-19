import React from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: ${props => props.theme.text.accent};
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    &::after {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => (props.position === 'right' ? '50%' : '0')};

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
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding-left: 70px;

    &::before {
      left: 23px;
    }
  }
`;

const ExperienceCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };

  &:hover {
    transform: translateY(-5px);
    background-color: ${props => props.theme.cardHoverBg};
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const CompanyName = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const JobTitle = styled.h4`
  color: ${props => props.theme.text.accent};
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Duration = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const Description = styled.ul`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-left: 1.2rem;

  li {
    margin-bottom: 0.5rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.mainBg};
  color: ${props => props.theme.text.accent};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
`;

function Experience() {
  const experiences = [
    {
      company: "Tech Company A",
      title: "Senior Data Engineer",
      duration: "2022 - Present",
      description: [
        "Led development of ETL pipelines processing 10TB+ data daily",
        "Optimized data warehouse performance by 40%",
        "Implemented real-time data streaming architecture"
      ],
      techStack: ["Python", "Apache Airflow", "AWS", "Snowflake"]
    },
    {
      company: "Tech Company B",
      title: "Data Engineer",
      duration: "2020 - 2022",
      description: [
        "Developed and maintained data pipelines using Apache Airflow",
        "Reduced processing time by 50% through optimization",
        "Collaborated with data science team on ML pipeline deployment"
      ],
      techStack: ["Python", "SQL", "Databricks", "Azure"]
    }
  ];

  return (
    <ExperienceContainer id="experience">
      <SectionTitle>Experience</SectionTitle>
      <TimelineContainer>
        {experiences.map((exp, index) => (
          <TimelineItem 
            key={index} 
            position={index % 2 === 0 ? 'left' : 'right'}
          >
            <ExperienceCard>
              <CompanyName>{exp.company}</CompanyName>
              <JobTitle>{exp.title}</JobTitle>
              <Duration>{exp.duration}</Duration>
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
