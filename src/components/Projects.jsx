import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const ProjectsSection = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${props => props.isDarkMode ? 
    props.theme.colors.background : 
    'rgba(249, 250, 251, 0.5)'
  };
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem 3rem;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 8rem 2rem;
  }
`;

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  color: ${props => props.theme.colors.text};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 2rem auto 3rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.isActive ? 
    props.theme.gradients.primary : 
    'transparent'
  };
  color: ${props => props.isActive ? 
    'white' : 
    props.theme.colors.text
  };
  border: 2px solid ${props => props.isActive ? 
    'transparent' : 
    props.theme.colors.border
  };
  padding: 0.5rem 1.3rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.isActive ? 
      props.theme.shadows.md : 
      'none'
    };
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.gradients.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover:before {
    opacity: ${props => props.isActive ? 0 : 0.1};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  min-height: 400px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
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
  font-size: 1.15rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.ul`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  flex: 1;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
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
    'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.theme.colors.textSecondary};
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
  &:hover {
    transform: translateX(3px);
  }
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  
  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
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
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.3
    }
  }
};

const buttonVariants = {
  tap: { scale: 0.95 }
};

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Cloud-Enabled ETL Transformation",
      description: [
        "Orchestrated data transfer from Oracle DB to S3 using Databricks Notebooks, enhancing reusability and reducing development time by 30%.",
        "Conducted data profiling and analysis, improving data quality by 25% through effective outlier detection and statistical evaluations.",
        "Executed stage layer transformations, including deduplication and audit column addition, resulting in a 15% reduction in data redundancy.",
        "Created Delta tables in S3 using SQL files, optimizing data processing and achieving a 40% improvement in query performance.",
        "Configured the serve layer with DDL for target tables, translating SQL to Spark DataFrames, which enhanced processing speed by 20%.",
        "Applied Apache Airflow for pipeline orchestration, ensuring efficient scheduling and monitoring that reduced workflow execution time by 35%."
      ],
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      techStack: ["Databricks", "Oracle DB", "AWS S3", "Delta Lake", "SQL", "Apache Airflow", "Spark"],
      liveLink: "#",
      githubLink: "#",
      category: "data"
    },
    {
      id: 2,
      title: "Data Prediction Machine Learning Model",
      description: [
        "Developed a machine learning model for predictions using a user-uploaded CSV dataset, achieving an accuracy rate of 85%.",
        "Created a user-friendly web interface for CSV file uploads, enhancing user engagement and reducing upload time by 40%.",
        "Trained and deployed the machine learning model, improving prediction speed by 30% compared to previous methods.",
        "Integrated the model into a web platform, providing seamless data prediction that resulted in a 25% increase in user satisfaction."
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      techStack: ["Python", "Scikit-learn", "Pandas", "Django", "HTML/CSS", "JavaScript"],
      liveLink: "#",
      githubLink: "#",
      category: "ml"
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'data', name: 'Data Engineering' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'web', name: 'Web Development' }
  ];
  
  return (
    <ProjectsSection id="projects" isDarkMode={isDarkMode}>
      <ProjectsContainer>
        <SectionTitle>Projects</SectionTitle>
        <SectionSubtitle>
          Here are some of my key projects showcasing my technical skills and problem-solving abilities
        </SectionSubtitle>
        
        <FilterContainer>
          {categories.map(category => (
            <FilterButton 
              key={category.id}
              isActive={filter === category.id} 
              onClick={() => setFilter(category.id)}
              whileTap="tap"
              variants={buttonVariants}
            >
              {category.name}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <ProjectsGrid
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  custom={index}
                  variants={projectVariants}
                  layout
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
                    <ProjectDescription>
                      {project.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ProjectDescription>
                    
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
          ) : (
            <EmptyState
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-folder-open"></i>
              <h3>No Projects Found</h3>
              <p>There are no projects in this category yet.</p>
            </EmptyState>
          )}
        </AnimatePresence>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;
