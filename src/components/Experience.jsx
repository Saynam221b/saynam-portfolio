import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const ExperienceSection = styled.section`
  padding: 6rem 1.5rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem 3rem;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 8rem 2rem;
  }
`;

const ExperienceContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
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

const ExperienceCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ExperienceCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: 3rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${props => props.theme.gradients.primary};
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.1)'
  };
  position: relative;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  position: absolute;
  top: -25px;
  right: 30px;
  box-shadow: ${props => props.theme.shadows.md};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    left: -25px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const HeaderContent = styled.div`
  padding-right: 80px;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding-right: 0;
    padding-left: 50px;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const CompanyName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const JobLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  
  i {
    color: ${props => props.theme.colors.primary};
  }
`;

const JobDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  padding: 0.35rem 1rem;
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.05)'
  };
  border-radius: 20px;
  
  i {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-left: auto;
  }
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const JobDescription = styled.ul`
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  li {
    position: relative;
    padding-left: 1.5rem;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.7rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${props => props.theme.gradients.primary};
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.1)'
  };
`;

const TechTag = styled.span`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.theme.colors.textSecondary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.gradients.primary};
    color: white;
  }
  
  i {
    font-size: 1rem;
  }
`;

const experienceData = [
  {
    id: 1,
    title: "Data Engineer I",
    company: "KPI Partners",
    location: "Pune, India",
    date: "09/2022 - Present",
    logo: "KP",
    description: [
      "Spearheaded the design and implementation of an end-to-end ETL pipeline processing over 100 GB of AR module data monthly from Oracle Fusion to Snowflake, enabling real-time reporting and analytics.",
      "Implemented incremental data load logic in Airflow and reduced data processing time by 60% by handling over 1 million records per iteration efficiently, while ensuring scalable and efficient data handling.",
      "Automated data extraction via Oracle BI API and UCM integration, delivering secure and seamless data transfers to AWS S3 with advanced encryption and decryption mechanisms.",
      "Developed and deployed DBT models for data transformations, improving data quality by performing comprehensive validations such as null handling, and schema drift detection and each model execution is logged in the audit table.",
      "Deployed containerized DBT models using Docker and AWS ECS clusters, achieving a scalable, high-performance transformation pipeline.",
      "Streamlined AWS infrastructure provisioning and pipeline automation using Terraform, ensuring consistent, scalable, and repeatable deployments across MWAA, ECS, and S3 services.",
      "Enhanced pipeline observability by integrating monitoring tools like AWS CloudWatch and Snowflake Query History, improving performance visibility and troubleshooting.",
      "Strengthened data security by leveraging AWS KMS for encryption and enforcing role-based access controls in Snowflake, ensuring compliance with data protection standards.",
      "Collaborated cross-functionally to define pipeline requirements and drove the delivery of insights that supported data-driven decision-making at scale.",
      "Developed real-time data pipelines using PySpark to process and transform large datasets with low-latency requirements, ensuring timely insights for business decision-making.",
      "Designed and implemented serverless ETL workflows using AWS Glue, processing real-time data streams from various sources such as S3, databases, and APIs.",
      "Optimized Databricks clusters to handle high-throughput real-time data processing, reducing job execution times by up to 45% while maintaining data consistency and accuracy.",
      "Ensured seamless monitoring and auditing of real-time pipelines by integrating AWS CloudWatch and audit tables, providing real-time insights and traceability of data flows."
    ],
    techStack: [
      { name: "Python", icon: "fab fa-python" },
      { name: "Airflow", icon: "fas fa-stream" },
      { name: "AWS", icon: "fab fa-aws" },
      { name: "Snowflake", icon: "fas fa-snowflake" },
      { name: "Docker", icon: "fab fa-docker" },
      { name: "Terraform", icon: "fas fa-cubes" },
      { name: "PySpark", icon: "fas fa-fire" },
      { name: "AWS Glue", icon: "fas fa-cogs" },
      { name: "Databricks", icon: "fas fa-bolt" }
    ]
  },
  {
    id: 2,
    title: "Python Intern",
    company: "Entuple Technologies",
    location: "Bangalore, India",
    date: "08/2021 - 09/2021",
    logo: "ET",
    description: [
      "Engineered a full-stack web application utilizing Django for the backend and React with CSS for the frontend, resulting in a 25% increase in user engagement.",
      "Deployed the application on Heroku, implementing CI/CD pipelines that streamlined the deployment process and reduced deployment time by 40%.",
      "Conducted comprehensive testing and debugging, achieving a 30% reduction in reported issues and enhancing overall application stability.",
      "Leveraged Django's robust features for scalable development, optimizing performance to accommodate a 50% increase in concurrent users."
    ],
    techStack: [
      { name: "Python", icon: "fab fa-python" },
      { name: "Django", icon: "fab fa-python" },
      { name: "React", icon: "fab fa-react" },
      { name: "CSS", icon: "fab fa-css3-alt" },
      { name: "Heroku", icon: "fas fa-cloud" },
      { name: "CI/CD", icon: "fas fa-sync" }
    ]
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Experience = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <ExperienceSection id="experience" isDarkMode={isDarkMode}>
      <ExperienceContainer>
        <SectionTitle>Professional Experience</SectionTitle>
        
        <ExperienceCards>
          {experienceData.map((job, index) => (
            <ExperienceCard
              key={job.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <CompanyLogo>{job.logo}</CompanyLogo>
              
              <CardHeader isDarkMode={isDarkMode}>
                <HeaderContent>
                  <JobTitle>{job.title}</JobTitle>
                  <CompanyName>{job.company}</CompanyName>
                  
                  <JobMeta>
                    <JobLocation>
                      <i className="fas fa-map-marker-alt"></i>
                      {job.location}
                    </JobLocation>
                    
                    <JobDate isDarkMode={isDarkMode}>
                      <i className="far fa-calendar-alt"></i>
                      {job.date}
                    </JobDate>
                  </JobMeta>
                </HeaderContent>
              </CardHeader>
              
              <CardBody>
                <JobDescription>
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </JobDescription>
                
                <TechStack isDarkMode={isDarkMode}>
                  {job.techStack.map((tech, i) => (
                    <TechTag key={i} isDarkMode={isDarkMode}>
                      <i className={tech.icon}></i>
                      {tech.name}
                    </TechTag>
                  ))}
                </TechStack>
              </CardBody>
            </ExperienceCard>
          ))}
        </ExperienceCards>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;
