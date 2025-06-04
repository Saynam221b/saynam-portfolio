import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const SectionSubtitle = styled.p`
  color: ${props => props.theme.text.secondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
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
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };
  color: ${props => props.theme.text.accent};
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.text.accent};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateX(3px);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background: ${props => props.isActive ? 
    props.theme.buttonGradient : 
    'transparent'
  };
  color: ${props => props.isActive ? 
    'white' : 
    props.theme.text.primary
  };
  border: 2px solid ${props => props.isActive ? 
    'transparent' : 
    props.theme.text.light
  };
  padding: 0.5rem 1.25rem;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.isActive ? 
      '0 4px 12px rgba(2, 132, 199, 0.2)' : 
      'none'
    };
  }
`;

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

function Projects() {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      title: "Data Pipeline Automation",
      description: "Designed and implemented an end-to-end ETL pipeline using Apache Airflow, processing over 1TB of data daily with automated error handling and monitoring.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      techStack: ["Python", "Airflow", "AWS", "SQL"],
      liveLink: "#",
      githubLink: "#",
      category: "data"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Built a responsive dashboard visualizing real-time data streams using React, D3.js and WebSockets, reducing decision-making time by 40% for business stakeholders.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      techStack: ["React", "D3.js", "Node.js", "WebSocket"],
      liveLink: "#",
      githubLink: "#",
      category: "web"
    },
    {
      title: "Machine Learning Recommendation Engine",
      description: "Developed a recommendation system using collaborative filtering and content-based algorithms, improving user engagement by 25% and increasing average session duration.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      techStack: ["Python", "TensorFlow", "Flask", "MongoDB"],
      liveLink: "#",
      githubLink: "#",
      category: "ml"
    },
    {
      title: "Cloud-based Data Warehouse",
      description: "Architected and deployed a scalable data warehouse solution on AWS Redshift, optimizing query performance and implementing automated data quality checks.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      techStack: ["AWS Redshift", "Python", "dbt", "Terraform"],
      liveLink: "#",
      githubLink: "#",
      category: "data"
    },
    {
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce application with secure payment processing, inventory management, and a responsive user interface for both web and mobile.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      techStack: ["React", "Node.js", "MongoDB", "Stripe API"],
      liveLink: "#",
      githubLink: "#",
      category: "web"
    },
    {
      title: "Sentiment Analysis Tool",
      description: "Created an NLP-based sentiment analysis tool that processes customer feedback and social media mentions to provide actionable insights for product improvement.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      techStack: ["Python", "NLTK", "SpaCy", "FastAPI"],
      liveLink: "#",
      githubLink: "#",
      category: "ml"
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <ProjectsSection id="projects">
      <SectionTitle>Projects</SectionTitle>
      <SectionSubtitle>
        Here are some of my recent projects showcasing my skills and experience.
      </SectionSubtitle>
      
      <ProjectsContainer>
        <FilterContainer>
          <FilterButton 
            isActive={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All Projects
          </FilterButton>
          <FilterButton 
            isActive={filter === 'data'} 
            onClick={() => setFilter('data')}
          >
            Data Engineering
          </FilterButton>
          <FilterButton 
            isActive={filter === 'web'} 
            onClick={() => setFilter('web')}
          >
            Web Development
          </FilterButton>
          <FilterButton 
            isActive={filter === 'ml'} 
            onClick={() => setFilter('ml')}
          >
            Machine Learning
          </FilterButton>
        </FilterContainer>
        
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={projectVariants}
              isDarkMode={isDarkMode}
            >
              <ProjectImageContainer>
                <ProjectImage 
                  src={project.image} 
                  alt={project.title} 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400?text=Project+Image";
                  }}
                />
              </ProjectImageContainer>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TechStack>
                  {project.techStack.map((tech, i) => (
                    <TechTag key={i} isDarkMode={isDarkMode}>{tech}</TechTag>
                  ))}
                </TechStack>
                
                <ProjectLinks>
                  <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    Live Demo <i className="fas fa-external-link-alt"></i>
                  </ProjectLink>
                  <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    GitHub <i className="fab fa-github"></i>
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
}

export default Projects;
