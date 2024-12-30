import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const ProjectsContainer = styled(motion.div)`
      padding: 2rem;
    `;
    
    const Title = styled(motion.h2)`
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    `;
    
    const ProjectList = styled(motion.ul)`
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    `;
    
    const ProjectItem = styled(motion.li)`
      background-color: #2a2a2a;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    
      &:hover {
        transform: translateY(-5px);
      }
    `;
    
    const ProjectTitle = styled.h3`
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    `;
    
    const ProjectDescription = styled.p`
      color: #ddd;
      margin-bottom: 1rem;
    `;
    
    const ProjectLink = styled.a`
      color: #00bcd4;
      text-decoration: none;
      font-weight: bold;
    
      &:hover {
        text-decoration: underline;
      }
    `;
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
    
    function Projects() {
      const projects = [
        {
          title: 'Data Pipeline Project',
          description: 'A robust data pipeline built using Apache Airflow and Spark for processing large datasets.',
          link: '#',
        },
        {
          title: 'Real-Time Analytics Dashboard',
          description: 'A real-time dashboard using Kafka, Flink, and React to visualize streaming data.',
          link: '#',
        },
        {
          title: 'Cloud Data Warehouse',
          description: 'A data warehouse solution on AWS using Redshift and S3 for efficient data storage and analysis.',
          link: '#',
        },
      ];
    
      return (
        <ProjectsContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>My Projects</Title>
          <ProjectList>
            {projects.map((project, index) => (
              <ProjectItem key={index} variants={itemVariants}>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLink href={project.link}>View Project</ProjectLink>
              </ProjectItem>
            ))}
          </ProjectList>
        </ProjectsContainer>
      );
    }
    
    export default Projects;
