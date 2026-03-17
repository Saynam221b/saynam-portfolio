import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const ExperienceSection = styled.section`
  padding: 4rem 1.5rem;
`;

const ExperienceContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const Timeline = styled.div`
  position: relative;
  border-left: 2px solid ${props => props.theme.colors.border};
  padding-left: 2rem;
  margin-left: 1rem;
`;

const ExperienceCard = styled(motion.div)`
  margin-bottom: 3rem;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: '';
    position: absolute;
    left: -2.6rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.background};
    z-index: 1;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.text};
`;

const Company = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-weight: 500;
`;

const SubProject = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubProjectTitle = styled.h5`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: ${props => props.theme.colors.cardBg};
  border-left: 3px solid ${props => props.theme.colors.primary};
  border-radius: 0 6px 6px 0;
  display: inline-block;
`;

const Description = styled.ul`
  padding-left: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  
  li {
    margin-bottom: 0.5rem;
    font-size: 0.93rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

// Education
const EducationSection = styled.div`
  margin-top: 3rem;
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const EducationCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem 2rem;
  text-align: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const EduDegree = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const EduInstitution = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const EduMeta = styled.p`
  font-size: 0.9rem;
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
        </AnimatedSection>

        <Timeline theme={{ colors: { border: isDarkMode ? '#333' : '#e5e7eb' } }}>
          {jobs.map((job, index) => (
            <AnimatedSection
              key={index}
              animation="fadeLeft"
              delay={staggerDelay(index, 0.1, 0.15)}
            >
              <ExperienceCard>
                <JobTitle>{job.title}</JobTitle>
                <Company>{job.company}</Company>
                <Meta>{job.date} | {job.location}</Meta>

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

                <TechStack>
                  {job.tech.map((t, i) => (
                    <TechTag key={i}>{t}</TechTag>
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
            <EducationCard whileHover={{ y: -3 }}>
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
