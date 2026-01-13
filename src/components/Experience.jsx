import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

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

const Description = styled.ul`
  padding-left: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  
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
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Experience = () => {
  const { isDarkMode } = useTheme();

  const jobs = [
    {
      title: "Data Engineer I",
      company: "KPI Partners",
      date: "09/2022 - Present",
      location: "Pune, India",
      description: [
        "Architected scalable ETL pipelines processing terabytes of data using PySpark and Databricks.",
        "Optimized Snowflake data modeling achieving 40% query performance improvement.",
        "Automated workflows with Apache Airflow, reducing manual intervention by 90%."
      ],
      tech: ["PySpark", "Snowflake", "AWS", "Airflow", "Databricks"]
    },
    {
      title: "Python Intern",
      company: "Entuple Technologies",
      date: "08/2021 - 09/2021",
      location: "Bangalore, India",
      description: [
        "Developed full-stack web applications using Django and React.",
        "Implemented CI/CD pipelines reducing deployment time by 40%."
      ],
      tech: ["Python", "Django", "React", "CI/CD"]
    }
  ];

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <SectionTitle>Experience</SectionTitle>
        <Timeline theme={{ colors: { border: isDarkMode ? '#333' : '#e5e7eb' } }}>
          {jobs.map((job, index) => (
            <ExperienceCard
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <JobTitle>{job.title}</JobTitle>
              <Company>{job.company}</Company>
              <Meta>{job.date} | {job.location}</Meta>
              <Description>
                {job.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Description>
              <TechStack>
                {job.tech.map((t, i) => (
                  <TechTag key={i}>{t}</TechTag>
                ))}
              </TechStack>
            </ExperienceCard>
          ))}
        </Timeline>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;
