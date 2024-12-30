import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const ProjectsContainer = styled(motion.div)`
      padding: 2rem;
      min-height: calc(100vh - 60px);
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
      background-color: #475569;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    
      &:hover {
        transform: translateY(-5px);
      }
    `;
    
    const ProjectTitle = styled(motion.h3)`
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    `;
    
    const ProjectDescription = styled(motion.p)`
      color: #ddd;
      margin-bottom: 1rem;
    `;
    
    const ProjectTech = styled(motion.div)`
      color: #ddd;
      margin-bottom: 1rem;
      font-style: italic;
    `;
    
    const ProjectLink = styled(motion.a)`
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
          title: "Cloud-Enabled ETL Transformation",
          description: [
            <>
              • Orchestrated data transfer from Oracle DB to S3 using Databricks Notebooks, enhancing reusability and reducing development time by 30%.<br />
              • Conducted data profiling and analysis, improving data quality by 25% through effective outlier detection and statistical evaluations.<br />
              • Executed stage layer transformations, including deduplication and audit column addition, resulting in a 15% reduction in data redundancy.<br />
              • Created Delta tables in S3 using SQL files, optimizing data processing and achieving a 40% improvement in query performance.<br />
              • Configured the serve layer with DDL for target tables, translating SQL to Spark DataFrames, which enhanced processing speed by 20%.<br />
              • Applied Apache Airflow for pipeline orchestration, ensuring efficient scheduling and monitoring that reduced workflow execution time by 35%.
            </>
          ],
          tech: ["Python", "SQL", "Databricks", "PySpark"],
          github: "",
          live: ""
        },
        {
          title: "Data Prediction Machine Learning Model",
          description: [
            <>
              • Developed a machine learning model for predictions using a user-uploaded CSV dataset, achieving an accuracy rate of 85%.<br />
              • Created a user-friendly web interface for CSV file uploads, enhancing user engagement and reducing upload time by 40%.<br />
              • Trained and deployed the machine learning model, improving prediction speed by 30% compared to previous methods.<br />
              • Integrated the model into a web platform, providing seamless data prediction that resulted in a 25% increase in user satisfaction.
            </>
          ],
          tech: ["ML", "Python", "HTML", "CSS", "JavaScript"],
          github: "",
          live: ""
        }
      ];
    
      return (
        <ProjectsContainer
          id="projects"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants}>My Projects</Title>
          <ProjectList>
            {projects.map((project, index) => (
              <ProjectItem key={index} variants={itemVariants}>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTech>{project.tech.join(", ")}</ProjectTech>
                <ProjectLink href={project.link}>View Project</ProjectLink>
              </ProjectItem>
            ))}
          </ProjectList>
        </ProjectsContainer>
      );
    }
    
    export default Projects;
