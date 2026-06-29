import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Section = styled.section`
  position: relative;
  padding: clamp(4.2rem, 7vw, 6.2rem) 1.25rem;
  overflow-x: clip;
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

  @media (max-width: 640px) {
    padding-inline: 1rem;
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
    align-items: start;
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
  font-size: clamp(2.16rem, 5.2vw, 4.85rem);
  font-weight: 900;
  line-height: 0.96;

  span {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
    font-weight: 650;
  }

  @media (max-width: 560px) {
    max-width: 13ch;
    font-size: clamp(2rem, 9.6vw, 3.2rem);
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
    gap: 0.55rem;
  }
`;

const DateRail = styled.div`
  display: grid;
  align-content: start;
  gap: 0.8rem;
  padding-top: 1rem;

  @media (max-width: 820px) {
    padding-top: 0;
  }
`;

const Date = styled.p`
  color: var(--accent);
  font-size: clamp(1.28rem, 3vw, 2.25rem);
  font-weight: 900;
  line-height: 0.92;

  @media (max-width: 560px) {
    font-size: 1.32rem;
    line-height: 1.05;
  }
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
  overflow: clip;

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

  > * {
    min-width: 0;
  }

  @media (max-width: 640px) {
    border-radius: 0;
    border-inline: 0;
    padding: 1rem 0;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--surface-soft) 38%, transparent), transparent 82%);
    box-shadow: none;
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
  font-size: clamp(1.36rem, 3vw, 2.35rem);
  font-weight: 900;
  line-height: 1.05;
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
  overflow-wrap: anywhere;
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
  overflow-wrap: anywhere;
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

const PlatformGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.72rem;
  margin-top: 1rem;
`;

const PlatformCard = styled.div`
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: color-mix(in srgb, var(--surface-soft) 55%, transparent);
  padding: 0.85rem 0.95rem;
`;

const PlatformTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 850;
  color: var(--text);
  margin-bottom: 0.45rem;
  line-height: 1.3;
`;

const PlatformBody = styled.p`
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.65;
  margin-bottom: 0.55rem;
`;

const jobs = [
  {
    date: '2022–now',
    role: 'Data Engineer II',
    company: 'KPI Partners',
    location: 'Remote · Pune, India',
    body: 'Three production platform streams across enterprise ERP ingestion, Databricks lakehouse processing, and clinical trials data — all built for rerun safety, observability, and durable downstream reporting.',
    tech: ['Snowflake', 'dbt', 'Airflow', 'MWAA', 'Databricks', 'PySpark', 'Delta Lake', 'AWS', 'SQL'],
    signals: [
      ['System', 'Oracle to Snowflake'],
      ['Motion', '45–60% faster runs'],
      ['Proof', 'SSIS to lakehouse'],
    ],
    platforms: [
      {
        title: 'Oracle Fusion → Snowflake ETL Platform',
        body:
          'Architected AWS-based ingestion from Oracle Fusion BI into Snowflake with MWAA, S3, Python, SQL, and dbt. Built incremental, idempotent loads into dimensional and fact models with dbt data quality checks, schema drift handling, and backfill-safe workflows.',
        tech: ['AWS', 'MWAA', 'S3', 'Snowflake', 'dbt', 'Python'],
      },
      {
        title: 'Databricks & PySpark Lakehouse Pipelines',
        body:
          'Built large-scale PySpark pipelines merging historical DBCS datasets with Fusion data across multi-million-row fact tables. Implemented Delta Lake merge patterns for late-arriving data and schema changes; tuned partitioning and cluster configs for 45–60% runtime reduction.',
        tech: ['Databricks', 'PySpark', 'Delta Lake', 'Spark SQL'],
      },
      {
        title: 'Clinical Trials Data Platform',
        body:
          'Developed SSIS pipelines for clinical trial ingestion, EDC integrations with CTMS/Payments/OPRA, and optimized SQL Server stored procedures. Led migration of legacy SSIS workflows to Databricks, modernizing on-prem architecture into a cloud-native lakehouse.',
        tech: ['SSIS', 'SQL Server', 'SSMS', 'Databricks'],
      },
    ],
  },
  {
    date: '2022',
    role: 'B.E. Electronics and Communication',
    company: 'Sir M Visvesvaraya Institute of Technology',
    location: 'Bangalore, India',
    body: 'Engineering foundation with a practical bias toward systems thinking, scalable data pipelines, and shipping robust solutions.',
    tech: ['Python', 'SQL', 'Systems Design'],
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
                {job.platforms && (
                  <PlatformGrid>
                    {job.platforms.map(platform => (
                      <PlatformCard key={platform.title}>
                        <PlatformTitle>{platform.title}</PlatformTitle>
                        <PlatformBody>{platform.body}</PlatformBody>
                        <Tags>
                          {platform.tech.map(tech => (
                            <Tag key={tech}>{tech}</Tag>
                          ))}
                        </Tags>
                      </PlatformCard>
                    ))}
                  </PlatformGrid>
                )}
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
