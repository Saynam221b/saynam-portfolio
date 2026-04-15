import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const ServicesSection = styled.section`
  padding: 4.8rem 1.25rem 1.5rem;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const Eyebrow = styled.p`
  color: rgba(164, 188, 244, 0.95);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const Title = styled.h2`
  font-size: clamp(1.75rem, 4vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: ${props => props.theme.colors.text};
  max-width: 760px;
  margin-bottom: 0.8rem;
`;

const Intro = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  max-width: 760px;
  font-size: 1rem;
  line-height: 1.75;
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ServicePane = styled.article`
  padding: 1.35rem 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(126, 151, 214, 0.22);
  background: rgba(10, 22, 52, 0.55);
`;

const ServiceTitle = styled.h3`
  font-size: 1.22rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
`;

const ServiceCopy = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.75;
  margin-bottom: 0.95rem;
`;

const ServicePoints = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.45rem;
`;

const ServicePoint = styled.li`
  font-size: 0.87rem;
  color: rgba(198, 214, 247, 0.95);
  line-height: 1.6;
  display: flex;
  gap: 0.55rem;

  &::before {
    content: '•';
    color: #59b5ff;
  }
`;

const About = () => {
  return (
    <ServicesSection id="services">
      <Container>
        <AnimatedSection animation="fadeUp">
          <SectionHeader>
            <Eyebrow>Service Split</Eyebrow>
            <Title>What I build: dependable data platforms and polished web products.</Title>
            <Intro>
              I work across data and frontend delivery so teams can move from architecture decisions to production outcomes with less handoff friction.
              You get a builder who can ship robust pipelines, but also package them into usable product experiences.
            </Intro>
          </SectionHeader>
        </AnimatedSection>

        <SplitGrid>
          <AnimatedSection animation="fadeRight" delay={0.08}>
            <ServicePane>
              <ServiceTitle>Data Engineering</ServiceTitle>
              <ServiceCopy>
                Production ETL and lakehouse work focused on reliability, cost-aware performance, and clean downstream analytics.
              </ServiceCopy>
              <ServicePoints>
                <ServicePoint>Batch + incremental pipelines on Databricks, AWS, Airflow, and Snowflake.</ServicePoint>
                <ServicePoint>Schema evolution, idempotent reruns, and data quality guardrails with dbt.</ServicePoint>
                <ServicePoint>Observability-first design to reduce incident response time and on-call fatigue.</ServicePoint>
              </ServicePoints>
            </ServicePane>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.12}>
            <ServicePane>
              <ServiceTitle>Web Development</ServiceTitle>
              <ServiceCopy>
                Product-grade web interfaces and full-stack experiences that communicate complex systems clearly and convert users effectively.
              </ServiceCopy>
              <ServicePoints>
                <ServicePoint>React and Next.js product interfaces with strong visual hierarchy and performance discipline.</ServicePoint>
                <ServicePoint>Full-stack delivery for dashboards, community products, and data-driven interaction flows.</ServicePoint>
                <ServicePoint>Freelance-friendly execution: scoped delivery, rapid iteration, and production-ready handoff.</ServicePoint>
              </ServicePoints>
            </ServicePane>
          </AnimatedSection>
        </SplitGrid>
      </Container>
    </ServicesSection>
  );
};

export default About;
