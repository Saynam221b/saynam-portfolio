import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  position: relative;
  padding: clamp(3.8rem, 6vw, 5.4rem) 1.25rem;
  overflow-x: clip;
  scroll-margin-top: 104px;

  &::before {
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
`;

const Kicker = styled.p`
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  max-width: 14ch;
  font-size: clamp(2rem, 4.8vw, 4.2rem);
  font-weight: 900;
  line-height: 0.96;
  margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Group = styled.div`
  border: 1px solid var(--line-soft);
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface-soft) 58%, transparent);
  padding: clamp(0.9rem, 2vw, 1.2rem);
`;

const GroupLabel = styled.p`
  color: var(--text-subtle);
  font-size: 0.68rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 0.55rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
`;

const Tag = styled.span`
  color: var(--text-muted);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  padding: 0.26rem 0.56rem;
  font-size: 0.76rem;
  line-height: 1.35;
`;

const skillGroups = [
  { label: 'Languages', tags: ['Python', 'SQL'] },
  {
    label: 'Big Data & Lakehouse',
    tags: ['Apache Spark', 'PySpark', 'Spark SQL', 'Databricks', 'Delta Lake'],
  },
  {
    label: 'Data Engineering',
    tags: [
      'ETL/ELT',
      'Incremental Loads',
      'Idempotent Pipelines',
      'Backfills',
      'Data Quality',
      'Schema Evolution',
      'Dimensional Modeling',
    ],
  },
  {
    label: 'Orchestration & Transform',
    tags: ['Apache Airflow', 'AWS MWAA', 'dbt', 'Databricks Jobs'],
  },
  {
    label: 'Cloud & Warehousing',
    tags: ['AWS (S3, MWAA)', 'Snowflake', 'Azure (basic)'],
  },
  {
    label: 'Databases & Sources',
    tags: ['Oracle Fusion', 'SQL Server', 'Supabase'],
  },
  {
    label: 'Legacy & Migration',
    tags: ['SSIS', 'SSMS', 'On-Prem to Cloud Migration'],
  },
  {
    label: 'Tools',
    tags: ['Git', 'Docker', 'Structured Logging', 'Pipeline Observability'],
  },
];

const Skills = () => {
  return (
    <Section id="skills">
      <Inner>
        <AnimatedSection animation="fadeUp">
          <Kicker>Stack depth</Kicker>
          <Title>Skills aligned to production data work.</Title>
        </AnimatedSection>

        <Grid>
          {skillGroups.map((group, index) => (
            <AnimatedSection key={group.label} animation="fadeUp" delay={index * 0.04}>
              <Group>
                <GroupLabel>{group.label}</GroupLabel>
                <Tags>
                  {group.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </Group>
            </AnimatedSection>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};

export default Skills;
