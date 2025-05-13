import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const ProjectsContainer = styled.section`
  padding: 6rem 2rem;
  background: transparent;
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

const ProjectFilters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text.secondary};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.text.secondary}30;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '500'};
  
  &:hover {
    background: ${props => props.active ? props.theme.primary : props.theme.text.secondary}10;
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.cardBg};
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.text.primary}10;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const ProjectImage = styled.div`
  height: 180px;
  width: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${props => props.theme.cardBg} 100%
    );
    opacity: 0.3;
    transition: opacity 0.3s ease;
  }
  
  ${ProjectCard}:hover &::before {
    opacity: 0.1;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  margin-bottom: 1.2rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.primary}15;
  color: ${props => props.theme.text.accent};
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.primary}25;
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.text.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const NoProjectsMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.text.secondary};
  font-size: 1.1rem;
  margin: 3rem 0;
`;

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectData = [
    {
      id: 1,
      title: "Healthcare Data Platform",
      description: "Built a scalable healthcare data platform with ETL pipelines to process patient records with HIPAA compliance, powering analytics dashboards for medical staff.",
      image: "https://i.imgur.com/Dn0qiUP.png",
      techStack: ["Python", "Apache Spark", "Airflow", "AWS", "Snowflake"],
      liveLink: "#",
      githubLink: "https://github.com/Saynam221b",
      category: "data"
    },
    {
      id: 2,
      title: "Financial Analytics Dashboard",
      description: "Created an interactive financial analytics dashboard that processes market data in real-time, features predictive analytics, and generates automated reports.",
      image: "https://i.imgur.com/7jIfrJF.png",
      techStack: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      liveLink: "#",
      githubLink: "https://github.com/Saynam221b",
      category: "web"
    },
    {
      id: 3,
      title: "E-Commerce Recommendation Engine",
      description: "Designed a product recommendation system using collaborative filtering and machine learning algorithms that increased conversion rates by 18% for an e-commerce client.",
      image: "https://i.imgur.com/pKUfMRj.png",
      techStack: ["Python", "TensorFlow", "Flask", "AWS Lambda", "MongoDB"],
      liveLink: "#",
      githubLink: "https://github.com/Saynam221b",
      category: "ml"
    },
    {
      id: 4,
      title: "Supply Chain Optimization Tool",
      description: "Developed an end-to-end data solution for supply chain optimization that processed inventory data, predicted stockouts, and reduced overall inventory costs by 22%.",
      image: "https://i.imgur.com/9lYmQFj.png",
      techStack: ["PySpark", "Kafka", "Azure", "Power BI", "Python"],
      liveLink: "#",
      githubLink: "https://github.com/Saynam221b",
      category: "data"
    },
    {
      id: 5,
      title: "NLP-Powered Social Media Analytics",
      description: "Built a real-time social media analytics platform that uses NLP to analyze sentiment and identify emerging trends across multiple platforms.",
      image: "https://i.imgur.com/cIru0MG.png",
      techStack: ["Python", "NLTK", "TensorFlow", "React", "Kubernetes"],
      liveLink: "#",
      githubLink: "https://github.com/Saynam221b",
      category: "ml"
    },
    {
      id: 6,
      title: "Full-Stack E-Commerce Platform",
      description: "Designed and built a complete e-commerce solution with product catalog, shopping cart, payment processing, and admin dashboard for inventory management.",
      image: "https://i.imgur.com/BcFDPZU.png",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      liveLink: "#",
      githubLink: "https://github.com/Saynam221b",
      category: "web"
    }
  ];
  
  const filterProjects = (category) => {
    setActiveFilter(category);
  };
  
  const filteredProjects = activeFilter === 'all' 
    ? projectData 
    : projectData.filter(project => project.category === activeFilter);
    
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
    <ProjectsContainer id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </SectionTitle>
      
      <ProjectFilters>
        <FilterButton 
          active={activeFilter === 'all'} 
          onClick={() => filterProjects('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'data'} 
          onClick={() => filterProjects('data')}
        >
          Data Engineering
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'web'} 
          onClick={() => filterProjects('web')}
        >
          Web Development
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'ml'} 
          onClick={() => filterProjects('ml')}
        >
          Machine Learning
        </FilterButton>
      </ProjectFilters>
      
      {filteredProjects.length > 0 ? (
        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} variants={itemVariants}>
              <ProjectImage image={project.image} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.techStack.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </ProjectLink>
                  <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> Source Code
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      ) : (
        <NoProjectsMessage>No projects found in this category.</NoProjectsMessage>
      )}
    </ProjectsContainer>
  );
}

export default Projects;
