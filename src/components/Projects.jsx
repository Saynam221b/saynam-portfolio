import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const ProjectsSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${props => props.isDarkMode ?
    props.theme.colors.background :
    'transparent'
  };
`;

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.a)`
  display: block;
  background: ${props => props.theme.colors.cardBg};
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.12), 0 0 0 1px ${props => props.theme.colors.primary}33;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const ProjectIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  color: white;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.text};
`;

const ProjectDesc = styled.p`
  font-size: 0.93rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.65;
  margin-bottom: 1.5rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  border-radius: 100px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const Projects = () => {
  const { isDarkMode } = useTheme();

  const projects = [
    {
      icon: "fas fa-database",
      title: "Oracle Fusion → Snowflake ETL Platform",
      desc: "End-to-end AWS ETL platform ingesting Oracle Fusion BI data into Snowflake with incremental loads, dbt transformations, schema drift handling, and built-in data quality checks.",
      tags: ["AWS", "Snowflake", "Airflow", "dbt", "Python", "SQL"],
      link: "https://github.com/Saynam221b"
    },
    {
      icon: "fas fa-bolt",
      title: "Databricks Lakehouse Pipelines",
      desc: "Large-scale PySpark batch pipelines on Databricks achieving ~50% runtime reduction through optimized partitioning, Delta Lake merge patterns, and structured error handling.",
      tags: ["PySpark", "Databricks", "Delta Lake", "Spark SQL"],
      link: "https://github.com/Saynam221b"
    },
    {
      icon: "fas fa-gamepad",
      title: "D3xTRverse Community Platform",
      desc: "A modern web platform for the gaming and coding community featuring events, tournaments, eFootball card systems, and AI-powered content — built with React and Django.",
      tags: ["React", "Django", "Supabase", "Vercel"],
      link: "https://d3xtrverse.vercel.app/"
    },
    {
      icon: "fas fa-chart-line",
      title: "Data Quality & Observability Framework",
      desc: "Python-based framework running on Airflow to automatically validate data quality across pipelines with structured logging, audit tables, and alerting for faster troubleshooting.",
      tags: ["Python", "Airflow", "Snowflake", "dbt Tests"],
      link: "https://github.com/Saynam221b"
    }
  ];

  return (
    <ProjectsSection id="projects" isDarkMode={isDarkMode}>
      <ProjectsContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>Featured Work</SectionTitle>
        </AnimatedSection>

        <ProjectGrid>
          {projects.map((project, index) => (
            <AnimatedSection
              key={index}
              animation="fadeUp"
              delay={staggerDelay(index, 0.1, 0.1)}
            >
              <ProjectCard
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardContent>
                  <ProjectIcon>
                    <i className={project.icon} />
                  </ProjectIcon>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDesc>{project.desc}</ProjectDesc>
                  <TagContainer>
                    {project.tags.map((tag, i) => (
                      <Tag key={i}>{tag}</Tag>
                    ))}
                  </TagContainer>
                </CardContent>
              </ProjectCard>
            </AnimatedSection>
          ))}
        </ProjectGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;
