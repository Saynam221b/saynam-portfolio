import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';
import { staggerDelay } from '../hooks/useScrollAnimation';

const Section = styled.section`
  padding: 4.1rem 1.25rem 3rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.55rem;
`;

const Eyebrow = styled.p`
  font-size: 0.71rem;
  color: rgba(170, 194, 245, 0.94);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 4vw, 3.2rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.p`
  max-width: 760px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.96rem;
  line-height: 1.72;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 1.6rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.35rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, rgba(116, 164, 255, 0.7) 0%, rgba(116, 164, 255, 0.04) 100%);
  }
`;

const Item = styled.article`
  position: relative;
  padding: 0.2rem 0 1.1rem;
  border-bottom: 1px solid rgba(151, 176, 234, 0.18);
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Dot = styled.span`
  position: absolute;
  left: -1.45rem;
  top: 0.28rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 999px;
  background: linear-gradient(130deg, #2f6dff 0%, #18b6a4 100%);
  box-shadow: 0 0 0 3px rgba(57, 116, 255, 0.2);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 0.42rem;
`;

const Role = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: 0.26rem;
`;

const Company = styled.p`
  color: rgba(150, 212, 255, 0.95);
  font-size: 0.81rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
`;

const Date = styled.p`
  color: rgba(187, 206, 241, 0.95);
  font-size: 0.8rem;
  border: 1px solid rgba(151, 176, 234, 0.3);
  border-radius: 999px;
  padding: 0.24rem 0.7rem;
`;

const Meta = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.84rem;
  margin-bottom: 0.6rem;
`;

const ProjectBlock = styled.div`
  margin-bottom: 0.72rem;
  padding-left: 0.78rem;
  border-left: 2px solid rgba(108, 178, 255, 0.55);

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ProjectTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 0.94rem;
  margin-bottom: 0.32rem;
`;

const PointList = styled.ul`
  padding-left: 1rem;
  color: ${props => props.theme.colors.textSecondary};

  li {
    font-size: 0.86rem;
    line-height: 1.63;
    margin-bottom: 0.3rem;
  }
`;

const TagRow = styled.div`
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  border: 1px solid rgba(151, 176, 234, 0.3);
  border-radius: 999px;
  padding: 0.2rem 0.58rem;
  color: rgba(203, 220, 248, 0.96);
`;

const Education = styled.div`
  margin-top: 1.3rem;
  padding: 0.95rem;
  border: 1px solid rgba(151, 176, 234, 0.22);
  border-radius: 14px;
  background: rgba(10, 20, 44, 0.45);
`;

const EducationTitle = styled.p`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(170, 194, 245, 0.94);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const EducationDegree = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const EducationMeta = styled.p`
  font-size: 0.84rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const jobs = [
  {
    title: 'Data Engineer I',
    company: 'KPI Partners',
    date: 'Sep 2022 - Present',
    location: 'Pune, India',
    subProjects: [
      {
        title: 'Oracle Fusion to Snowflake ETL Platform',
        description: [
          'Designed an AWS-based ETL platform for Oracle Fusion BI ingestion into Snowflake using MWAA, Python, and SQL.',
          'Implemented incremental and idempotent load patterns with dbt transformations and consistent downstream model states.',
          'Improved observability through structured logging and query-level troubleshooting workflows.',
        ],
      },
      {
        title: 'Databricks and PySpark Lakehouse Pipelines',
        description: [
          'Built large-scale PySpark batch pipelines with Delta merge strategies for late-arriving and malformed records.',
          'Reduced runtime by roughly 45-60% through partition tuning and shuffle optimization.',
          'Stabilized recurring failures using rerun-safe design and stronger exception handling.',
        ],
      },
    ],
    tech: ['PySpark', 'Databricks', 'Snowflake', 'dbt', 'Airflow', 'AWS', 'SQL'],
  },
  {
    title: 'Python Intern',
    company: 'Entuple Technologies',
    date: 'Aug 2021 - Sep 2021',
    location: 'Bangalore, India',
    description: [
      'Engineered a full-stack web app using Django and React, increasing user engagement by 25%.',
      'Set up deployment and CI/CD workflows that reduced release time by about 40%.',
      'Improved quality through targeted debugging and test-focused development practices.',
    ],
    tech: ['Python', 'Django', 'React', 'CI/CD'],
  },
];

const Experience = () => {
  return (
    <Section id="experience">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Header>
            <Eyebrow>Experience / Credibility</Eyebrow>
            <Title>Execution history in production environments.</Title>
            <Subtitle>
              Role history that demonstrates ownership across data platforms, full-stack delivery, and collaboration with product-facing teams.
            </Subtitle>
          </Header>
        </AnimatedSection>

        <Timeline>
          {jobs.map((job, index) => (
            <AnimatedSection key={job.title} animation="fadeUp" delay={staggerDelay(index, 0.08, 0.1)}>
              <Item>
                <Dot />
                <Row>
                  <div>
                    <Role>{job.title}</Role>
                    <Company>{job.company}</Company>
                  </div>
                  <Date>{job.date}</Date>
                </Row>
                <Meta>{job.location}</Meta>

                {job.subProjects ? (
                  job.subProjects.map(subProject => (
                    <ProjectBlock key={subProject.title}>
                      <ProjectTitle>{subProject.title}</ProjectTitle>
                      <PointList>
                        {subProject.description.map(point => (
                          <li key={point}>{point}</li>
                        ))}
                      </PointList>
                    </ProjectBlock>
                  ))
                ) : (
                  <ProjectBlock>
                    <PointList>
                      {job.description.map(point => (
                        <li key={point}>{point}</li>
                      ))}
                    </PointList>
                  </ProjectBlock>
                )}

                <TagRow>
                  {job.tech.map(tech => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </TagRow>
              </Item>
            </AnimatedSection>
          ))}
        </Timeline>

        <AnimatedSection animation="fadeUp" delay={0.2}>
          <Education>
            <EducationTitle>Education</EducationTitle>
            <EducationDegree>B.E. in Electronics and Communication</EducationDegree>
            <EducationMeta>Sir M Visvesvaraya Institute of Technology | Bangalore, India | Graduated Aug 2022</EducationMeta>
          </Education>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Experience;
