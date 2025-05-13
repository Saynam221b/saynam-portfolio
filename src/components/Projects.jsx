import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.section`
  padding: 4rem 2rem;
  background: transparent;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
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

const ProjectTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };
  color: ${props => props.theme.text.accent};
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.text.accent};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

function Projects() {
  const projects = [
    {
      title: "Data Pipeline Automation",
      description: "Automated ETL pipeline using Apache Airflow and Python for processing large-scale data.",
      techStack: ["Python", "Airflow", "AWS", "SQL"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Built a real-time analytics dashboard using React and D3.js with WebSocket integration.",
      techStack: ["React", "D3.js", "Node.js", "WebSocket"],
      liveLink: "#",
      githubLink: "#"
    },
    // Add more projects as needed
  ];

  return (
    <ProjectsContainer id="projects">
      <SectionTitle>Projects</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.techStack.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </TechStack>
            <ProjectLinks>
              <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                Live Demo →
              </ProjectLink>
              <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                GitHub →
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
}

export default Projects;
