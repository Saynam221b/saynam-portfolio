import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const SkillsSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${props => props.isDarkMode ?
    props.theme.colors.background :
    'transparent'
  };
`;

const SkillsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const CategoryBlock = styled.div`
  margin-bottom: 2.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    width: 3px;
    height: 1.2rem;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SkillTag = styled.div`
  padding: 0.6rem 1.25rem;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 100px;
  font-weight: 500;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.sm};
  }

  i {
    color: ${props => props.theme.colors.primary};
    font-size: 0.9rem;
  }
`;

const CertificationsContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const CertTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CertGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const CertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${props => props.theme.colors.cardBg};
  border-radius: 12px;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  i {
    color: #f59e0b;
  }
`;

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
  {
    title: "Visualization",
    skills: ["Tableau"],
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
    <SkillsSection id="skills" isDarkMode={isDarkMode}>
      <SkillsContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>Technologies</SectionTitle>
        </AnimatedSection>

        {skillCategories.map((category, catIndex) => (
          <AnimatedSection
            key={category.title}
            animation="fadeUp"
            delay={staggerDelay(catIndex, 0.1, 0.1)}
          >
            <CategoryBlock>
              <CategoryTitle>{category.title}</CategoryTitle>
              <SkillsGrid>
                {category.skills.map((skill, skillIndex) => (
                  <SkillTag
                    key={skill}
                  >
                    <i className={getSkillIcon(skill)} />
                    {skill}
                  </SkillTag>
                ))}
              </SkillsGrid>
            </CategoryBlock>
          </AnimatedSection>
        ))}

        <AnimatedSection animation="fadeUp" delay={0.3}>
          <CertificationsContainer>
            <CertTitle>Certifications</CertTitle>
            <CertGrid>
              {certifications.map((cert, index) => (
                <CertItem
                  key={index}
                >
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