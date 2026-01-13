import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

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

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const SkillTag = styled(motion.div)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 100px;
  font-weight: 500;
  font-size: 1rem;
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
  }
`;

const CertificationsContainer = styled.div`
  text-align: center;
`;

const CertTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CertGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

const CertItem = styled(motion.a)`
  display: block;
  padding: 1rem 1.5rem;
  background: ${props => props.theme.colors.cardBg};
  border-radius: 12px;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const getSkillIcon = (skill) => {
  const icons = {
    "Python": "fab fa-python",
    "JavaScript": "fab fa-js",
    "SQL": "fas fa-database",
    "Scala": "fas fa-code",
    "Apache Airflow": "fas fa-wind",
    "Spark": "fas fa-bolt",
    "Kafka": "fas fa-project-diagram",
    "Snowflake": "far fa-snowflake",
    "Databricks": "fas fa-layer-group",
    "AWS": "fab fa-aws",
    "Docker": "fab fa-docker",
    "Git": "fab fa-git-alt",
    "React": "fab fa-react",
    "Django": "fab fa-python",
    "Pandas": "fas fa-table",
    "Terraform": "fas fa-cubes"
  };
  return icons[skill] || "fas fa-code";
};

const Skills = () => {
  const { isDarkMode } = useTheme();

  const skills = [
    "Python", "Scala", "SQL", "Apache Airflow", "Spark", "Kafka",
    "Snowflake", "Databricks", "AWS", "Docker", "Git", "Terraform",
    "React", "Django", "Pandas"
  ];

  const certifications = [
    "Databricks Certified Data Engineer Associate",
    "Databricks Certified Data Engineer Professional",
    "Apache Spark Lake House Fundamentals"
  ];

  return (
    <SkillsSection id="skills" isDarkMode={isDarkMode}>
      <SkillsContainer>
        <SectionTitle>Technologies</SectionTitle>

        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillTag
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <i className={getSkillIcon(skill)}></i>
              {skill}
            </SkillTag>
          ))}
        </SkillsGrid>

        <CertificationsContainer>
          <CertTitle>Certifications</CertTitle>
          <CertGrid>
            {certifications.map((cert, index) => (
              <CertItem
                href="#"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <i className="fas fa-certificate" style={{ marginRight: '8px', color: '#f59e0b' }}></i>
                {cert}
              </CertItem>
            ))}
          </CertGrid>
        </CertificationsContainer>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills; 