import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const SkillsSection = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${props => props.isDarkMode ? 
    props.theme.colors.background : 
    'rgba(249, 250, 251, 0.5)'
  };
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 8rem 2rem;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
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
    font-size: 2.5rem;
  }
`;

const SkillCategoryContainer = styled(motion.div)`
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 1.5rem;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.gradients.primary};
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkillIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-size: 1.25rem;
`;

const SkillName = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const SkillLevelFill = styled.div`
  height: 100%;
  width: ${props => props.level}%;
  background: ${props => props.theme.gradients.primary};
  border-radius: 4px;
  transition: width 1s ease;
`;

const SkillLevelText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 0.5rem;
`;

const CertificationsContainer = styled.div`
  margin-top: 4rem;
`;

const CertificationsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CertificationItem = styled(motion.li)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &:before {
    content: '🏆';
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const skillVariants = {
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Function to get appropriate icon for each skill
const getSkillIcon = (skill) => {
  const skillIcons = {
    // Programming Languages
    "Python": "fab fa-python",
    "JavaScript": "fab fa-js",
    "Java": "fab fa-java",
    "SQL": "fas fa-database",
    "Scala": "fas fa-code",
    
    // Data Engineering
    "Apache Airflow": "fas fa-stream",
    "Spark": "fas fa-fire",
    "Kafka": "fas fa-exchange-alt",
    "ETL Pipelines": "fas fa-project-diagram",
    "Data Warehousing": "fas fa-warehouse",
    "Snowflake": "fas fa-snowflake",
    "Databricks": "fas fa-bolt",
    
    // Web Development
    "React": "fab fa-react",
    "Node.js": "fab fa-node-js",
    "HTML/CSS": "fab fa-html5",
    "Django": "fab fa-python",
    
    // Cloud & DevOps
    "AWS": "fab fa-aws",
    "Docker": "fab fa-docker",
    "CI/CD": "fas fa-sync",
    "Kubernetes": "fas fa-dharmachakra",
    "Terraform": "fas fa-cubes",
    "Azure": "fab fa-microsoft",
    
    // Data Science & ML
    "Pandas": "fas fa-table",
    "Scikit-learn": "fas fa-brain",
    "Tableau": "fas fa-chart-bar",
    
    // Version Control
    "Git": "fab fa-git-alt"
  };
  
  return skillIcons[skill] || "fas fa-code";
};

const Skills = () => {
  const { isDarkMode } = useTheme();
  
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 90 },
        { name: "Scala", level: 85 },
        { name: "JavaScript", level: 80 }
      ]
    },
    {
      category: "Data Engineering",
      skills: [
        { name: "Apache Airflow", level: 90 },
        { name: "Spark", level: 90 },
        { name: "Snowflake", level: 85 },
        { name: "Databricks", level: 85 },
        { name: "ETL Pipelines", level: 90 }
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Terraform", level: 75 },
        { name: "Azure", level: 70 }
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "Django", level: 80 },
        { name: "React", level: 75 },
        { name: "HTML/CSS", level: 85 }
      ]
    },
    {
      category: "Data Science & ML",
      skills: [
        { name: "Pandas", level: 90 },
        { name: "Scikit-learn", level: 80 },
        { name: "Tableau", level: 75 }
      ]
    },
    {
      category: "Version Control",
      skills: [
        { name: "Git", level: 90 }
      ]
    }
  ];
  
  const certifications = [
    "Databricks Certified Data Engineer Associate",
    "Databricks Certified Data Engineer Professional",
    "Python Programming",
    "Apache Spark Lake House Fundamentals"
  ];
  
  return (
    <SkillsSection id="skills" isDarkMode={isDarkMode}>
      <SkillsContainer>
        <SectionTitle>Technical Skills</SectionTitle>
        
        {skillCategories.map((category, index) => (
          <SkillCategoryContainer
            key={category.category}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <CategoryTitle>{category.category}</CategoryTitle>
            
            <SkillsGrid>
              {category.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  custom={i}
                  variants={skillVariants}
                >
                  <SkillHeader>
                    <SkillIconWrapper>
                      <i className={getSkillIcon(skill.name)}></i>
                    </SkillIconWrapper>
                    <SkillName>{skill.name}</SkillName>
                  </SkillHeader>
                  
                  <SkillLevel isDarkMode={isDarkMode}>
                    <SkillLevelFill level={skill.level} />
                  </SkillLevel>
                  
                  <SkillLevelText>
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </SkillLevelText>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillCategoryContainer>
        ))}
        
        <CertificationsContainer>
          <CategoryTitle>Certifications</CategoryTitle>
          <CertificationsList>
            {certifications.map((cert, index) => (
              <CertificationItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {cert}
              </CertificationItem>
            ))}
          </CertificationsList>
        </CertificationsContainer>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills; 