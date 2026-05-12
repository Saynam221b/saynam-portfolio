import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Section = styled.section`
  position: relative;
  padding: clamp(4.2rem, 7vw, 6.2rem) 1.25rem;
  overflow: hidden;
  scroll-margin-top: 104px;

  &::before {
    content: '';
    position: absolute;
    inset: 8% auto 12% 0;
    width: min(30vw, 360px);
    background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 13%, transparent), transparent);
    filter: blur(24px);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--line), transparent);
    opacity: 0.8;
  }
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Intro = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(0, 0.76fr) minmax(280px, 0.48fr);
  gap: clamp(1.4rem, 5vw, 4rem);
  align-items: end;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Kicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  margin-bottom: 0.85rem;

  &::before {
    content: '';
    width: 34px;
    height: 1px;
    background: currentColor;
    opacity: 0.86;
  }
`;

const Title = styled.h2`
  max-width: 12ch;
  font-size: clamp(2.24rem, 5.7vw, 5.15rem);
  font-weight: 900;
  line-height: 0.88;

  span {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
    font-weight: 650;
  }
`;

const IntroCopy = styled.p`
  color: var(--text-muted);
  font-size: clamp(1rem, 2vw, 1.14rem);
  line-height: 1.72;
`;

const Timeline = styled.div`
  display: grid;
  gap: clamp(0.85rem, 1.8vw, 1.15rem);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: clamp(4.6rem, 12vw, 8.6rem);
    top: 1rem;
    bottom: 1rem;
    width: 1px;
    background: linear-gradient(var(--accent), var(--accent-2), var(--accent-3));
    opacity: 0.72;
  }

  @media (max-width: 820px) {
    &::before {
      display: none;
    }
  }
`;

const Item = styled(motion.article)`
  position: relative;
  display: grid;
  grid-template-columns: clamp(4.8rem, 12vw, 9rem) minmax(0, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: stretch;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const DateRail = styled.div`
  display: grid;
  align-content: start;
  gap: 0.8rem;
  padding-top: 1rem;
`;

const Date = styled.p`
  color: var(--accent);
  font-size: clamp(1.28rem, 3vw, 2.25rem);
  font-weight: 900;
  line-height: 0.92;
`;

const Dot = styled.span`
  width: 13px;
  height: 13px;
  border: 2px solid var(--bg);
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 0 30px color-mix(in srgb, var(--accent) 54%, transparent);

  @media (max-width: 820px) {
    display: none;
  }
`;

const Panel = styled.div`
  border: 1px solid var(--line);
  border-radius: 26px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.085), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 78%, transparent);
  box-shadow: var(--shadow-soft);
  padding: clamp(1rem, 3vw, 1.45rem);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 36px 36px;
    mask-image: linear-gradient(90deg, #000, transparent 78%);
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Top = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

const Role = styled.h3`
  font-size: clamp(1.45rem, 3.4vw, 2.55rem);
  font-weight: 900;
  line-height: 0.95;
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
  position: relative;
  z-index: 1;
  color: var(--text-muted);
  font-size: 0.96rem;
  line-height: 1.72;
  max-width: 76ch;
`;

const Tags = styled.div`
  position: relative;
  z-index: 1;
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

const SignalGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.48rem;
  margin-top: 1rem;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const Signal = styled.div`
  border-top: 1px solid var(--line-soft);
  padding-top: 0.65rem;
`;

const SignalLabel = styled.p`
  color: var(--text-subtle);
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
`;

const SignalValue = styled.p`
  margin-top: 0.22rem;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 850;
  line-height: 1.35;
`;

const jobs = [
  {
    date: '2022-now',
    role: 'Data Engineer II',
    company: 'KPI Partners',
    location: 'Remote - Pune, India',
    body: 'Architected an end-to-end AWS-based ETL platform ingesting Oracle Fusion BI report data into Snowflake. Built large-scale batch pipelines on Databricks using PySpark, optimizing workloads to achieve 45-60% reduction in pipeline runtime. Led migration of legacy SSIS workflows to a Databricks lakehouse stack.',
    tech: ['Snowflake', 'dbt', 'Airflow', 'Databricks', 'PySpark', 'AWS', 'SQL'],
    signals: [
      ['System', 'Oracle to Snowflake'],
      ['Motion', 'Runtime tuning'],
      ['Proof', '45-60% faster runs'],
    ],
  },
  {
    date: '2022',
    role: 'B.E. Electronics and Communication',
    company: 'Sir M Visvesvaraya Institute of Technology',
    location: 'Bangalore, India',
    body: 'Engineering foundation with a practical bias toward systems thinking, scalable data pipelines, and shipping robust solutions.',
    tech: ['Python', 'Scala', 'Hadoop', 'SQL', 'Docker'],
    signals: [
      ['System', 'Engineering base'],
      ['Motion', 'Systems thinking'],
      ['Proof', 'Scalable pipelines'],
    ],
  },
];

const Experience = () => {
  return (
    <Section id="experience">
      <Inner>
        <Intro
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <Kicker>Experience timeline</Kicker>
            <Title>
              Production work <span>without the noise.</span>
            </Title>
          </div>
          <IntroCopy>
            The scroll film resolves here: real systems work, product building, and the operating habits behind the motion.
          </IntroCopy>
        </Intro>

        <Timeline>
          {jobs.map((job, index) => (
            <Item
              key={`${job.role}-${job.company}`}
              initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.26 }}
              transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <DateRail>
                <Date>{job.date}</Date>
                <Dot />
              </DateRail>
              <Panel>
                <Top>
                  <div>
                    <Role>{job.role}</Role>
                    <Company>{job.company}</Company>
                  </div>
                  <Pill>{job.location}</Pill>
                </Top>
                <Body>{job.body}</Body>
                <SignalGrid>
                  {job.signals.map(([label, value]) => (
                    <Signal key={label}>
                      <SignalLabel>{label}</SignalLabel>
                      <SignalValue>{value}</SignalValue>
                    </Signal>
                  ))}
                </SignalGrid>
                <Tags>
                  {job.tech.map(tech => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </Tags>
              </Panel>
            </Item>
          ))}
        </Timeline>
      </Inner>
    </Section>
  );
};

export default Experience;
