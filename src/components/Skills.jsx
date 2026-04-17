import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 3.3rem 1.25rem 2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.7rem;
  margin-bottom: 1.4rem;

  @media (min-width: 960px) {
    grid-template-columns: 0.7fr 1.3fr;
    align-items: end;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.85rem, 4vw, 3.3rem);
  color: ${props => props.theme.colors.text};
`;

const Copy = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  max-width: 760px;
  font-size: 0.96rem;
  line-height: 1.74;
`;

const OutcomeStrip = styled.div`
  border-top: 1px solid rgba(151, 176, 234, 0.28);
  border-bottom: 1px solid rgba(151, 176, 234, 0.2);
`;

const OutcomeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Outcome = styled.div`
  padding: 1.15rem 0.95rem 1.1rem;
  border-bottom: 1px solid rgba(151, 176, 234, 0.16);

  @media (min-width: 860px) {
    border-bottom: none;
    border-right: 1px solid rgba(151, 176, 234, 0.16);

    &:last-of-type {
      border-right: none;
    }
  }
`;

const OutcomeValue = styled.p`
  font-size: clamp(1.5rem, 3.2vw, 2.3rem);
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  margin-bottom: 0.35rem;
`;

const OutcomeLabel = styled.p`
  font-size: 0.71rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-weight: 700;
  color: rgba(164, 194, 248, 0.94);
  margin-bottom: 0.33rem;
`;

const OutcomeBody = styled.p`
  font-size: 0.87rem;
  line-height: 1.64;
  color: ${props => props.theme.colors.textSecondary};
`;

const CapabilityRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 1.1rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Capability = styled.div`
  padding: 0.95rem 0.95rem 0.9rem;
  background: rgba(11, 22, 48, 0.46);
  border: 1px solid rgba(151, 176, 234, 0.2);
  border-radius: 14px;
`;

const CapabilityTitle = styled.p`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
  color: rgba(164, 194, 248, 0.94);
  margin-bottom: 0.52rem;
`;

const CapabilityBody = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.66;
`;

const Skills = () => {
  return (
    <Section id="outcomes">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Header>
            <Title>Selected Outcomes</Title>
            <Copy>
              The goal is measurable impact, not visual noise. These outcomes represent delivery quality across both production data engineering
              and modern web product work.
            </Copy>
          </Header>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.07}>
          <OutcomeStrip>
            <OutcomeRow>
              <Outcome>
                <OutcomeValue>45-60%</OutcomeValue>
                <OutcomeLabel>Runtime Improvement</OutcomeLabel>
                <OutcomeBody>Spark workloads optimized through partition strategy and shuffle reduction.</OutcomeBody>
              </Outcome>
              <Outcome>
                <OutcomeValue>Idempotent ETL</OutcomeValue>
                <OutcomeLabel>Reliability</OutcomeLabel>
                <OutcomeBody>Safe reruns and schema evolution controls for stable downstream analytics.</OutcomeBody>
              </Outcome>
              <Outcome>
                <OutcomeValue>End-to-End Delivery</OutcomeValue>
                <OutcomeLabel>Web + Data</OutcomeLabel>
                <OutcomeBody>Built data-heavy products where engineering depth and UI quality ship together.</OutcomeBody>
              </Outcome>
            </OutcomeRow>
          </OutcomeStrip>
        </AnimatedSection>

        <CapabilityRow>
          <AnimatedSection animation="fadeRight" delay={0.12}>
            <Capability>
              <CapabilityTitle>Data Stack</CapabilityTitle>
              <CapabilityBody>Databricks, PySpark, Airflow, Snowflake, dbt, Delta Lake, AWS, SQL, Python.</CapabilityBody>
            </Capability>
          </AnimatedSection>
          <AnimatedSection animation="fadeLeft" delay={0.14}>
            <Capability>
              <CapabilityTitle>Web Stack</CapabilityTitle>
              <CapabilityBody>React, Next.js, TypeScript, API integration, frontend systems, and product-focused architecture.</CapabilityBody>
            </Capability>
          </AnimatedSection>
        </CapabilityRow>
      </Container>
    </Section>
  );
};

export default Skills;
