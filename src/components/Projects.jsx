import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

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
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const ProjectDesc = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
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
      title: "Real-time Data Streaming Pipeline",
      desc: "Built a low-latency pipeline using Kafka and Spark Streaming to process IoT sensor data, enabling sub-second analytics.",
      tags: ["Spark Streaming", "Kafka", "Scala"],
      link: "https://github.com/Saynam221b"
    },
    {
      title: "Cloud Data Warehouse Migration",
      desc: "Led the migration of on-premise Oracle data warehouses to Snowflake, reducing operational costs by 35%.",
      tags: ["Snowflake", "AWS DMS", "PL/SQL"],
      link: "https://github.com/Saynam221b"
    },
    {
      title: "Automated Data Quality Framework",
      desc: "Developed a Python-based framework running on Airflow to automatically validate data quality across 50+ pipelines.",
      tags: ["Python", "Airflow", "Great Expectations"],
      link: "https://github.com/Saynam221b"
    },
    {
      title: "D3xTRverse Community Platform",
      desc: "A modern web platform for the gaming and coding community, featuring events, forums, and content sharing.",
      tags: ["React", "Node.js", "Firebase"],
      link: "https://d3xtrverse.vercel.app/"
    }
  ];

  return (
    <ProjectsSection id="projects" isDarkMode={isDarkMode}>
      <ProjectsContainer>
        <SectionTitle>Featured Work</SectionTitle>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              href={project.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CardContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDesc>{project.desc}</ProjectDesc>
                <TagContainer>
                  {project.tags.map((tag, i) => (
                    <Tag key={i}>{tag}</Tag>
                  ))}
                </TagContainer>
              </CardContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;
