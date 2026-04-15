import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const OutcomesSection = styled.section`
  padding: 3.6rem 1.25rem 2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (min-width: 880px) {
    grid-template-columns: 0.6fr 1.4fr;
    align-items: end;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.65rem, 3vw, 2.45rem);
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const HeaderCopy = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.98rem;
  line-height: 1.7;
  max-width: 720px;
`;

const OutcomeStrip = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 1fr;
  margin-bottom: 1.2rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const OutcomeCard = styled.div`
  padding: 1.1rem 1rem;
  border-top: 2px solid rgba(84, 153, 255, 0.55);
  border-bottom: 1px solid rgba(126, 151, 214, 0.2);
  background: rgba(10, 22, 52, 0.38);
`;

const OutcomeValue = styled.p`
  font-size: clamp(1.35rem, 3vw, 2rem);
  color: ${props => props.theme.colors.text};
  font-weight: 800;
  margin-bottom: 0.3rem;
`;

const OutcomeLabel = styled.p`
  font-size: 0.8rem;
  color: rgba(168, 192, 244, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin-bottom: 0.35rem;
  font-weight: 700;
`;

const OutcomeBody = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.89rem;
  line-height: 1.62;
`;

const StackPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.95rem;
  margin-top: 0.95rem;

  @media (min-width: 880px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StackColumn = styled.div`
  border: 1px solid rgba(126, 151, 214, 0.2);
  border-radius: 14px;
  background: rgba(11, 24, 54, 0.5);
  padding: 1rem;
`;

const StackTitle = styled.h3`
  font-size: 0.93rem;
  color: rgba(203, 220, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin-bottom: 0.65rem;
`;

const StackItems = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.7;
`;

const Skills = () => {
  return (
    <OutcomesSection id="outcomes">
      <Container>
        <AnimatedSection animation="fadeUp">
          <HeaderRow>
            <Title>Selected Outcomes</Title>
            <HeaderCopy>
              Delivery is measured by stability, speed, and business usefulness. These are representative outcomes from production data and web product work.
            </HeaderCopy>
          </HeaderRow>
        </AnimatedSection>

        <OutcomeStrip>
          <AnimatedSection animation="fadeUp" delay={0.06}>
            <OutcomeCard>
              <OutcomeValue>45-60%</OutcomeValue>
              <OutcomeLabel>Runtime Improvement</OutcomeLabel>
              <OutcomeBody>Optimized Spark pipelines through better partitioning and shuffle reduction.</OutcomeBody>
            </OutcomeCard>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <OutcomeCard>
              <OutcomeValue>Idempotent ETL</OutcomeValue>
              <OutcomeLabel>Reliability</OutcomeLabel>
              <OutcomeBody>Safe reruns and schema drift handling to keep downstream analytics consistent.</OutcomeBody>
            </OutcomeCard>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.14}>
            <OutcomeCard>
              <OutcomeValue>Full-Stack Delivery</OutcomeValue>
              <OutcomeLabel>Web Product Builds</OutcomeLabel>
              <OutcomeBody>Designed and shipped React-driven experiences for community and data-centric products.</OutcomeBody>
            </OutcomeCard>
          </AnimatedSection>
        </OutcomeStrip>

        <StackPanel>
          <AnimatedSection animation="fadeRight" delay={0.12}>
            <StackColumn>
              <StackTitle>Data Stack</StackTitle>
              <StackItems>
                Databricks, PySpark, Airflow, Snowflake, dbt, Delta Lake, AWS, SQL, Python.
              </StackItems>
            </StackColumn>
          </AnimatedSection>
          <AnimatedSection animation="fadeLeft" delay={0.15}>
            <StackColumn>
              <StackTitle>Web Stack</StackTitle>
              <StackItems>
                React, Next.js, TypeScript, API integration, modern UI systems, product-focused frontend architecture.
              </StackItems>
            </StackColumn>
          </AnimatedSection>
        </StackPanel>
      </Container>
    </OutcomesSection>
  );
};

export default Skills;
