import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SkillsSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SkillCategoryContainer = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.text.light};
    margin-left: 1rem;
    opacity: 0.3;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const SkillName = styled.h4`
  color: ${props => props.theme.text.primary};
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 0.75rem;
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.primary};
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-top: 0.75rem;
  overflow: hidden;
`;

const SkillLevelFill = styled.div`
  height: 100%;
  width: ${props => props.level}%;
  background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
  border-radius: 2px;
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

function Skills() {
  const { isDarkMode } = useTheme();
  
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Java", level: 75 },
        { name: "C++", level: 70 }
      ]
    },
    {
      category: "Data Engineering",
      skills: [
        { name: "Apache Airflow", level: 90 },
        { name: "Spark", level: 85 },
        { name: "Kafka", level: 80 },
        { name: "ETL Pipelines", level: 90 },
        { name: "Data Warehousing", level: 85 }
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "React", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "Express", level: 75 },
        { name: "MongoDB", level: 80 }
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 75 },
        { name: "Kubernetes", level: 70 },
        { name: "Terraform", level: 65 }
      ]
    }
  ];

  return (
    <SkillsSection id="skills">
      <SectionTitle>Skills</SectionTitle>
      <SkillsContainer>
        {skillCategories.map((category, categoryIndex) => (
          <SkillCategoryContainer key={categoryIndex}>
            <CategoryTitle>{category.category}</CategoryTitle>
            <SkillsGrid>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem 
                  key={skillIndex}
                  custom={skillIndex}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={skillVariants}
                >
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel>
                    <SkillLevelFill level={skill.level} />
                  </SkillLevel>
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillCategoryContainer>
        ))}
      </SkillsContainer>
    </SkillsSection>
  );
}

export default Skills; 