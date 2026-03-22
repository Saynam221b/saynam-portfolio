import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0); }
`;

const ExperienceSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${props => props.theme.colors.background};
`;

const ExperienceContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 3.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 3rem;
  margin-left: 1rem;
  
  /* Animated gradient timeline line */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      180deg,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primary}40 40%,
      ${props => props.theme.colors.border} 100%
    );
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    padding-left: 2rem;
  }
`;

const ExperienceCard = styled.div`
  margin-bottom: 3rem;
  position: relative;
  padding: 2rem;
  border-radius: 16px;
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.4)'
    : 'rgba(255, 255, 255, 0.7)'
  };
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  transition: all 0.3s ease;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary}33;
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.06);
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

/* Pulsing gradient timeline dot */
const TimelineDot = styled.div`
  position: absolute;
  left: -3.65rem;
  top: 2.25rem;
  width: 14px;
  height: 14px;
  background: ${props => props.theme.gradients.primary};
  border-radius: 50%;
  border: 3px solid ${props => props.theme.colors.background};
  z-index: 1;
  animation: ${pulse} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    left: -2.65rem;
    width: 12px;
    height: 12px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const HeaderLeft = styled.div``;

const JobTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.text};
`;

const Company = styled.h4`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DateBadge = styled.div`
  padding: 0.35rem 1rem;
  background: ${props => props.isDarkMode
    ? 'rgba(124, 58, 237, 0.1)'
    : 'rgba(124, 58, 237, 0.08)'
  };
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(124, 58, 237, 0.2)'
    : 'rgba(124, 58, 237, 0.15)'
  };
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  white-space: nowrap;
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  i {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

const SubProject = styled.div`
  margin-bottom: 1.25rem;
  padding-left: 1rem;
  border-left: 2px solid ${props => props.theme.colors.primary}30;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubProjectTitle = styled.h5`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Description = styled.ul`
  padding-left: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  
  li {
    margin-bottom: 0.4rem;
    font-size: 0.88rem;
    
    &::marker {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
`;

const TechTag = styled.span`
  font-size: 0.75rem;
  padding: 0.2rem 0.7rem;
  background: ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)'
  };
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.08)'
  };
  border-radius: 20px;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

// Education
const EducationSection = styled.div`
  margin-top: 3rem;
`;

const EducationTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &::before, &::after {
    content: '';
    height: 1px;
    width: 60px;
    background: ${props => props.theme.colors.border};
  }
`;

const EducationCard = styled(motion.div)`
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.4)'
    : 'rgba(255, 255, 255, 0.7)'
  };
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  border-radius: 16px;
  padding: 1.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  max-width: 500px;
  margin: 0 auto;

  &:hover {
    border-color: ${props => props.theme.colors.primary}33;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.06);
  }
`;

const EduDegree = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const EduInstitution = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const EduMeta = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const jobs = [
  {
    title: "Data Engineer I",
    company: "KPI Partners",
    date: "09/2022 – Present",
    location: "Pune, India",
    subProjects: [
      {
        title: "Oracle Fusion → Snowflake ETL Platform",
        description: [
          "Designed an AWS-based ETL platform ingesting Oracle Fusion BI data into Snowflake using MWAA (Airflow), S3, Python, and SQL.",
          "Implemented incremental and idempotent load strategies with dbt transformations, ensuring safe reruns and consistent downstream states.",
          "Built dbt layers with embedded data quality checks, audit columns, and schema drift handling — reducing reporting issues significantly.",
          "Improved pipeline observability through structured logging and Snowflake query history, enabling faster troubleshooting.",
        ],
      },
      {
        title: "Databricks & PySpark Lakehouse Pipelines",
        description: [
          "Built large-scale batch pipelines on Databricks using PySpark and Spark SQL to merge historical DBCS datasets with Fusion source data.",
          "Implemented Delta Lake merge patterns handling late-arriving data, malformed records, and schema changes without corruption.",
          "Optimized Spark workloads processing millions of records per run — achieving ~45–60% runtime reduction through better partitioning and shuffle reduction.",
          "Stabilized unreliable pipelines with structured error handling and rerun-safe mechanisms, reducing on-call effort.",
        ],
      },
    ],
    tech: ["PySpark", "Snowflake", "AWS", "Airflow", "Databricks", "dbt", "Delta Lake", "SQL"],
  },
  {
    title: "Python Intern",
    company: "Entuple Technologies",
    date: "08/2021 – 09/2021",
    location: "Bangalore, India",
    description: [
      "Engineered a full-stack web app using Django and React, resulting in a 25% increase in user engagement.",
      "Deployed on Heroku with CI/CD pipelines, reducing deployment time by 40%.",
      "Achieved 30% reduction in reported issues through comprehensive testing and debugging.",
    ],
    tech: ["Python", "Django", "React", "CI/CD", "Heroku"],
  },
];

const Experience = () => {
  const { isDarkMode } = useTheme();

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>Experience</SectionTitle>
          <SectionSubtitle>Building and scaling production data systems.</SectionSubtitle>
        </AnimatedSection>

        <Timeline>
          {jobs.map((job, index) => (
            <AnimatedSection
              key={index}
              animation="fadeLeft"
              delay={staggerDelay(index, 0.1, 0.15)}
            >
              <ExperienceCard isDarkMode={isDarkMode}>
                <TimelineDot />
                <CardHeader>
                  <HeaderLeft>
                    <JobTitle>{job.title}</JobTitle>
                    <Company>{job.company}</Company>
                  </HeaderLeft>
                  <DateBadge isDarkMode={isDarkMode}>{job.date}</DateBadge>
                </CardHeader>
                <Meta>
                  <i className="fas fa-map-marker-alt" />
                  {job.location}
                </Meta>

                {job.subProjects ? (
                  job.subProjects.map((sp, spIndex) => (
                    <SubProject key={spIndex}>
                      <SubProjectTitle>{sp.title}</SubProjectTitle>
                      <Description>
                        {sp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </Description>
                    </SubProject>
                  ))
                ) : (
                  <Description>
                    {job.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </Description>
                )}

                <TechStack isDarkMode={isDarkMode}>
                  {job.tech.map((t, i) => (
                    <TechTag key={i} isDarkMode={isDarkMode}>{t}</TechTag>
                  ))}
                </TechStack>
              </ExperienceCard>
            </AnimatedSection>
          ))}
        </Timeline>

        {/* Education */}
        <AnimatedSection animation="fadeUp" delay={0.2}>
          <EducationSection>
            <EducationTitle>Education</EducationTitle>
            <EducationCard isDarkMode={isDarkMode} whileHover={{ y: -3 }}>
              <EduDegree>B.E. in Electronics & Communication</EduDegree>
              <EduInstitution>Sir M Visvesvaraya Institute of Technology</EduInstitution>
              <EduMeta>Graduated 08/2022 | Bangalore, India | 7.0 CGPA</EduMeta>
            </EducationCard>
          </EducationSection>
        </AnimatedSection>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;
