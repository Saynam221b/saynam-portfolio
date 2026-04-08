import React, { useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const borderShimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ProjectsSection = styled.section`
  padding: 5rem 1.5rem;
  position: relative;
  background-color: ${props => props.theme.colors.background};
`;

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
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

const PremiumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StandardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  perspective: 1000px;
  height: 100%;
`;

const ProjectCard = styled.a`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-8px);
    border-color: transparent;
    box-shadow: 
      0 20px 60px rgba(124, 58, 237, 0.12),
      0 0 0 1px rgba(124, 58, 237, 0.2);
  }
`;

// Gradient header strip
const CardGradientStrip = styled.div`
  height: 4px;
  background: ${props => props.gradient};
  background-size: 200% 200%;
  animation: ${borderShimmer} 4s ease infinite;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${props => props.gradient || props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  color: white;
  transition: transform 0.3s ease;
  
  ${CardWrapper}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.3;
`;

const ProjectDesc = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.span`
  font-size: 0.72rem;
  padding: 0.2rem 0.7rem;
  background: ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)'
  };
  color: ${props => props.theme.colors.textSecondary};
  border-radius: 100px;
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.08)'
  };
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${CardWrapper}:hover & {
    border-color: ${props => props.theme.colors.primary}33;
  }
`;

const CardArrow = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  ${CardWrapper}:hover & {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateX(3px);
  }
`;

const ProjectRole = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  margin-top: -0.25rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HighlightsList = styled.ul`
  margin: 1rem 0 1.5rem 0;
  padding-left: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  
  li {
    margin-bottom: 0.5rem;
    &::marker {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
  flex-wrap: wrap;
`;

const GlowingButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  background: ${props => props.gradient || props.theme.gradients.primary};
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
  position: relative;
  z-index: 10;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
    color: white;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  border: 1px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'};
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  
  &:hover {
    background: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
  }
`;

const projectGradients = [
  'linear-gradient(135deg, #7C3AED, #3B82F6)',
  'linear-gradient(135deg, #EC4899, #F59E0B)',
  'linear-gradient(135deg, #10B981, #3B82F6)',
  'linear-gradient(135deg, #6366F1, #EC4899)',
];

const Projects = () => {
  const { isDarkMode } = useTheme();

  const projects = [
    {
      icon: "fas fa-project-diagram",
      title: "D3xTRverse Flow",
      role: "Creator & Lead Engineer",
      desc: "AST-driven SQL lineage visualizer that transforms nested SQL into deterministic DAGs. Integrates Groq Llama 3 for real-time node logic analysis.",
      highlights: [
        "Path-highlighting engine for dependency tracing",
        "Compound graph layout system for CTE nodes",
        "Browser history state-syncing via lz-string"
      ],
      tags: ["Next.js", "React Flow", "Llama 3", "AST"],
      link: "https://dex-floww.vercel.app/",
      github: "https://github.com/Saynam221b",
      featured: true,
      isPremium: true,
    },
    {
      icon: "fas fa-gamepad",
      title: "D3xTRverse Community",
      role: "Full-Stack Developer",
      desc: "A modern web platform for the gaming and coding community featuring automated tournaments, eFootball card systems, and dynamic event modules.",
      highlights: [
        "High-performance React UI with Vercel edge capabilities",
        "Robust Django and Supabase relational backend architecture",
        "Real-time event and match state orchestration"
      ],
      tags: ["React", "Django", "Supabase", "REST API"],
      link: "https://d3xtrverse.vercel.app/",
      featured: true,
      isPremium: true,
    },
    {
      icon: "fas fa-database",
      title: "Oracle → Snowflake ETL",
      desc: "AWS ETL platform ingesting Oracle BI data into Snowflake with incremental loads and dbt transformations.",
      tags: ["AWS", "Snowflake", "Airflow", "dbt"],
      link: "https://github.com/Saynam221b",
    },
    {
      icon: "fas fa-bolt",
      title: "Databricks Pipelines",
      desc: "Large-scale PySpark batch pipelines achieving 50% runtime reduction via Delta sets.",
      tags: ["PySpark", "Databricks", "Delta Lake"],
      link: "https://github.com/Saynam221b",
    },
    {
      icon: "fas fa-chart-line",
      title: "Data Observability",
      desc: "Python framework validating pipeline telemetry and alerts for rapid monitoring and troubleshooting.",
      tags: ["Python", "Airflow", "Data Quality"],
      link: "https://github.com/Saynam221b",
    }
  ];

  // 3D tilt handler
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -5;
    const rotateY = (x - centerX) / centerX * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  }, []);

  const premiumProjects = projects.filter(p => p.isPremium);
  const standardProjects = projects.filter(p => !p.isPremium);

  const renderCard = (project, gradientIndex, staggerIndex) => (
    <AnimatedSection
      key={project.title}
      animation="fadeUp"
      delay={staggerDelay(staggerIndex, 0.1, 0.1)}
      style={{ height: '100%' }}
    >
      <CardWrapper>
        <ProjectCard
          as={project.isPremium ? 'div' : 'a'}
          href={project.isPremium ? undefined : project.link}
          target={project.isPremium ? undefined : "_blank"}
          rel={project.isPremium ? undefined : "noopener noreferrer"}
          isDarkMode={isDarkMode}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CardGradientStrip gradient={projectGradients[gradientIndex % projectGradients.length]} />
          {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
          <CardContent>
            <ProjectIcon gradient={projectGradients[gradientIndex % projectGradients.length]}>
              <i className={project.icon} />
            </ProjectIcon>
            <ProjectTitle>{project.title}</ProjectTitle>
            {project.role && <ProjectRole>{project.role}</ProjectRole>}
            <ProjectDesc>{project.desc}</ProjectDesc>
            
            {project.highlights && (
              <HighlightsList>
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </HighlightsList>
            )}

            <TagContainer>
              {project.tags.map((tag, i) => (
                <Tag key={i} isDarkMode={isDarkMode}>{tag}</Tag>
              ))}
            </TagContainer>

            {project.isPremium ? (
              <ButtonGroup>
                <GlowingButton 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  gradient={projectGradients[gradientIndex % projectGradients.length]}
                >
                  Launch App <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em', marginLeft: '2px' }} />
                </GlowingButton>
                {project.github && (
                  <SecondaryButton 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    isDarkMode={isDarkMode}
                  >
                    <i className="fab fa-github" /> Repo
                  </SecondaryButton>
                )}
              </ButtonGroup>
            ) : (
              <CardArrow isDarkMode={isDarkMode}>
                <i className="fas fa-arrow-right" />
              </CardArrow>
            )}
          </CardContent>
        </ProjectCard>
      </CardWrapper>
    </AnimatedSection>
  );

  return (
    <ProjectsSection id="projects">
      <ProjectsContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>Featured Work</SectionTitle>
          <SectionSubtitle>Production systems and side projects I've built and scaled.</SectionSubtitle>
        </AnimatedSection>

        <PremiumGrid>
          {premiumProjects.map((project, i) => renderCard(project, i, i))}
        </PremiumGrid>

        <StandardGrid>
          {standardProjects.map((project, i) => renderCard(project, i + premiumProjects.length, i + premiumProjects.length))}
        </StandardGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;
