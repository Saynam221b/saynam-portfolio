import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const ExperienceContainer = styled(motion.div)`
      padding: 2rem;
    `;
    
    const Title = styled(motion.h2)`
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    `;
    
    const ExperienceList = styled(motion.ul)`
      list-style: none;
      padding: 0;
    `;
    
    const ExperienceItem = styled(motion.li)`
      background-color: #2a2a2a;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      margin-bottom: 1rem;
    `;
    
    const JobTitle = styled.h3`
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    `;
    
    const Company = styled.h4`
      font-size: 1.2rem;
      color: #00bcd4;
      margin-bottom: 0.5rem;
    `;
    
    const Duration = styled.p`
      color: #ddd;
      margin-bottom: 1rem;
    `;
    
    const Description = styled.p`
      color: #ddd;
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
    
    function Experience() {
      const experiences = [
        {
          jobTitle: 'Senior Data Engineer',
          company: 'Tech Solutions Inc.',
          duration: '2020 - Present',
          description: 'Led the development of scalable data pipelines and data warehousing solutions. Implemented real-time data processing systems using Kafka and Flink.',
        },
        {
          jobTitle: 'Data Engineer',
          company: 'Data Analytics Corp.',
          duration: '2018 - 2020',
          description: 'Developed and maintained ETL processes, built data models, and created dashboards for data visualization.',
        },
      ];
    
      return (
        <ExperienceContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>My Experience</Title>
          <ExperienceList>
            {experiences.map((experience, index) => (
              <ExperienceItem key={index} variants={itemVariants}>
                <JobTitle>{experience.jobTitle}</JobTitle>
                <Company>{experience.company}</Company>
                <Duration>{experience.duration}</Duration>
                <Description>{experience.description}</Description>
              </ExperienceItem>
            ))}
          </ExperienceList>
        </ExperienceContainer>
      );
    }
    
    export default Experience;
