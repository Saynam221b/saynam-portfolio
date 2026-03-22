import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SkillsSection = styled.section`
  padding: 5rem 1.5rem;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

const SkillsContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 3.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.5)'
    : 'rgba(255, 255, 255, 0.7)'
  };
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  overflow: hidden;
  
  /* Gradient border on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0), rgba(236, 72, 153, 0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: background 0.4s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.08);
    
    &::before {
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(236, 72, 153, 0.5));
    }
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.01em;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const SkillTag = styled.div`
  padding: 0.5rem 1rem;
  background: ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)'
  };
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.08)'
  };
  border-radius: 100px;
  font-weight: 500;
  font-size: 0.88rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.isDarkMode
      ? 'rgba(124, 58, 237, 0.1)'
      : 'rgba(124, 58, 237, 0.06)'
    };
    transform: translateY(-1px);
  }

  i {
    color: ${props => props.theme.colors.primary};
    font-size: 0.85rem;
  }
`;

// Certifications section
const CertificationsContainer = styled.div`
  margin-top: 2.5rem;
`;

const CertTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &::before, &::after {
    content: '';
    height: 1px;
    width: 60px;
    background: ${props => props.theme.colors.border};
  }
`;

const CertGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

const certShine = keyframes`
  0% { left: -100%; }
  100% { left: 200%; }
`;

const CertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: ${props => props.isDarkMode
    ? 'rgba(245, 158, 11, 0.06)'
    : 'rgba(245, 158, 11, 0.08)'
  };
  border-radius: 100px;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.85rem;
  border: 1px solid rgba(245, 158, 11, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(245, 158, 11, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.1), transparent);
      animation: ${certShine} 0.6s ease;
    }
  }

  i {
    color: #f59e0b;
    font-size: 0.85rem;
  }
`;

const getCategoryIcon = (title) => {
  const icons = {
    "Languages": "fas fa-code",
    "Data Engineering": "fas fa-database",
    "Cloud & DevOps": "fab fa-aws",
    "Frameworks & Libraries": "fas fa-layer-group",
    "Visualization": "fas fa-chart-bar",
  };
  return icons[title] || "fas fa-code";
};

const getSkillIcon = (skill) => {
  const icons = {
    "Python": "fab fa-python",
    "JavaScript": "fab fa-js",
    "SQL": "fas fa-database",
    "Scala": "fas fa-code",
    "Apache Spark": "fas fa-bolt",
    "Airflow": "fas fa-wind",
    "Snowflake": "far fa-snowflake",
    "Databricks": "fas fa-layer-group",
    "Hadoop": "fas fa-server",
    "dbt": "fas fa-cogs",
    "AWS": "fab fa-aws",
    "Azure": "fab fa-microsoft",
    "Docker": "fab fa-docker",
    "Git": "fab fa-git-alt",
    "Django": "fab fa-python",
    "Pandas": "fas fa-table",
    "Scikit-learn": "fas fa-brain",
    "React": "fab fa-react",
    "Tableau": "fas fa-chart-bar",
    "Terraform": "fas fa-cubes",
  };
  return icons[skill] || "fas fa-code";
};

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Scala", "SQL"],
  },
  {
    title: "Data Engineering",
    skills: ["Apache Spark", "Airflow", "Snowflake", "Databricks", "Hadoop", "dbt"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Azure", "Docker", "Git"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Django", "React", "Pandas", "Scikit-learn"],
  },
];

const certifications = [
  "Databricks Certified Data Engineer Associate",
  "Databricks Certified Data Engineer Professional",
  "Python Programming",
  "Apache Spark Lakehouse Fundamentals",
];

const Skills = () => {
  const { isDarkMode } = useTheme();

  return (
    <SkillsSection id="skills">
      <SkillsContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>Technologies</SectionTitle>
          <SectionSubtitle>Tools and technologies I work with daily to build scalable data systems.</SectionSubtitle>
        </AnimatedSection>

        <CategoriesGrid>
          {skillCategories.map((category, catIndex) => (
            <AnimatedSection
              key={category.title}
              animation="fadeUp"
              delay={staggerDelay(catIndex, 0.1, 0.1)}
            >
              <CategoryCard isDarkMode={isDarkMode}>
                <CategoryHeader>
                  <CategoryIcon>
                    <i className={getCategoryIcon(category.title)} />
                  </CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                </CategoryHeader>
                <SkillsGrid>
                  {category.skills.map((skill) => (
                    <SkillTag key={skill} isDarkMode={isDarkMode}>
                      <i className={getSkillIcon(skill)} />
                      {skill}
                    </SkillTag>
                  ))}
                </SkillsGrid>
              </CategoryCard>
            </AnimatedSection>
          ))}
        </CategoriesGrid>

        <AnimatedSection animation="fadeUp" delay={0.3}>
          <CertificationsContainer>
            <CertTitle>Certifications</CertTitle>
            <CertGrid>
              {certifications.map((cert, index) => (
                <CertItem key={index} isDarkMode={isDarkMode}>
                  <i className="fas fa-certificate" />
                  {cert}
                </CertItem>
              ))}
            </CertGrid>
          </CertificationsContainer>
        </AnimatedSection>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;