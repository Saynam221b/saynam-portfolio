import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ChapterSection from './ChapterSection';

const Timeline = styled.div`
  position: relative;
  display: grid;
  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 1px;
    background: linear-gradient(var(--accent), var(--accent-2), var(--accent-3));

    @media (max-width: 760px) {
      display: none;
    }
  }
`;

const Item = styled(motion.article)`
  position: relative;
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  gap: 1rem;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Date = styled.div`
  position: relative;
  z-index: 1;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 900;
  padding-top: 0.4rem;
`;

const Panel = styled.div`
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  padding: clamp(1rem, 3vw, 1.35rem);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

const Role = styled.h3`
  font-size: clamp(1.35rem, 3vw, 2.2rem);
  font-weight: 900;
`;

const Company = styled.p`
  color: var(--text-subtle);
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

const Pill = styled.p`
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-muted);
  padding: 0.3rem 0.65rem;
  font-size: 0.82rem;
`;

const Body = styled.p`
  color: var(--text-muted);
  font-size: 0.96rem;
  line-height: 1.72;
  max-width: 80ch;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.9rem;
`;

const Tag = styled.span`
  color: var(--text-muted);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  padding: 0.28rem 0.58rem;
  font-size: 0.78rem;
`;

const jobs = [
  {
    date: '2022-now',
    role: 'Data Engineer I',
    company: 'KPI Partners',
    location: 'Pune, India',
    body: 'Owned production data work across Oracle Fusion ingestion, Snowflake transformations, Databricks pipelines, and runtime optimization. The strongest work focused on reliability, observability, and performance in systems that cannot afford messy reruns.',
    tech: ['Snowflake', 'dbt', 'MWAA', 'Databricks', 'PySpark', 'AWS', 'SQL'],
  },
  {
    date: '2021',
    role: 'Python Intern',
    company: 'Entuple Technologies',
    location: 'Bangalore, India',
    body: 'Built and shipped full-stack web app work with Django and React, plus deployment workflows that shortened iteration cycles and improved delivery confidence.',
    tech: ['Python', 'Django', 'React', 'CI/CD'],
  },
  {
    date: '2022',
    role: 'B.E. Electronics and Communication',
    company: 'Sir M Visvesvaraya Institute of Technology',
    location: 'Bangalore, India',
    body: 'Engineering foundation with a practical bias toward systems thinking, debugging, and shipping working products.',
    tech: ['Engineering', 'Systems', 'Product craft'],
  },
];

const Experience = () => {
  return (
    <ChapterSection
      id="experience"
      eyebrow="Experience timeline"
      title={'Production ownership, shaped into a <span>clean delivery arc.</span>'}
      accent="A compact view of the work behind the visuals: data systems, web products, and the operating habits that connect both."
    >
      <Timeline>
        {jobs.map((job, index) => (
          <Item
            key={`${job.role}-${job.company}`}
            initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.68, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Date>{job.date}</Date>
            <Panel>
              <Top>
                <div>
                  <Role>{job.role}</Role>
                  <Company>{job.company}</Company>
                </div>
                <Pill>{job.location}</Pill>
              </Top>
              <Body>{job.body}</Body>
              <Tags>
                {job.tech.map(tech => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </Tags>
            </Panel>
          </Item>
        ))}
      </Timeline>
    </ChapterSection>
  );
};

export default Experience;
