import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: clamp(3.2rem, 6vw, 4.8rem) 1.25rem 1.6rem;
  scroll-margin-top: 104px;

  @media (max-width: 640px) {
    padding-inline: 1rem;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-bottom: 1.4rem;

  @media (min-width: 1020px) {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 1.8rem;
    align-items: start;
  }
`;

const Eyebrow = styled.p`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.76rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4.3vw, 4rem);
  color: var(--text);
  line-height: 0.97;
  letter-spacing: 0;
`;

const IntroCopy = styled.p`
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.8;
  max-width: 66ch;
`;

const CapabilityGrid = styled.div`
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1020px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Capability = styled.article`
  padding: 1.2rem 0.1rem;
  border-bottom: 1px solid var(--line-soft);

  @media (min-width: 1020px) {
    border-bottom: none;
    padding: 1.28rem 1rem 1.2rem 0;

    &:first-of-type {
      border-right: 1px solid var(--line-soft);
      padding-right: 1.5rem;
    }

    &:last-of-type {
      padding-left: 1.5rem;
      padding-right: 0;
    }
  }
`;

const CapabilityLabel = styled.p`
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.42rem;
`;

const CapabilityTitle = styled.h3`
  color: var(--text);
  font-size: 1.54rem;
  letter-spacing: 0;
  margin-bottom: 0.5rem;
`;

const CapabilityBody = styled.p`
  color: var(--text-muted);
  font-size: 0.93rem;
  line-height: 1.72;
  margin-bottom: 0.72rem;
`;

const PointList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.4rem;
`;

const Point = styled.li`
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.6;
  padding-left: 0.76rem;
  border-left: 2px solid color-mix(in srgb, var(--accent) 46%, transparent);
`;

const About = () => {
  return (
    <Section id="about">
      <Container>
        <IntroGrid>
          <AnimatedSection animation="fadeRight">
            <Eyebrow>Profile</Eyebrow>
            <Title>Production data systems with product-grade execution.</Title>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.08}>
            <IntroCopy>
              Data Engineer with 3.5+ years building production batch and incremental pipelines across Databricks, AWS, Snowflake, Airflow,
              and dbt. Experienced in enterprise ERP and clinical data platforms, with a focus on Delta Lake, dimensional modeling, data
              quality, and pipeline reliability. Reduced pipeline runtimes by 45–60% through Spark optimization. Databricks Certified
              (Associate & Professional).
            </IntroCopy>
          </AnimatedSection>
        </IntroGrid>

        <CapabilityGrid>
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <Capability>
              <CapabilityLabel>Data Systems</CapabilityLabel>
              <CapabilityTitle>Production pipelines with operational stability</CapabilityTitle>
              <CapabilityBody>
                ETL and lakehouse implementation designed for rerun safety, observability, and durable model behavior.
              </CapabilityBody>
              <PointList>
                <Point>Oracle Fusion to Snowflake ETL with MWAA, dbt, and rerun-safe dimensional models</Point>
                <Point>Delta Lake merge patterns, late-arriving data, and schema evolution at scale</Point>
                <Point>SSIS to Databricks migration for clinical trials and legacy SQL Server workflows</Point>
              </PointList>
            </Capability>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.14}>
            <Capability>
              <CapabilityLabel>Engineering Signal</CapabilityLabel>
              <CapabilityTitle>Product surfaces that prove depth beyond tickets</CapabilityTitle>
              <CapabilityBody>
                Side projects like DexFlow and Automation OS show how data problems become inspectable tools — not separate from the DE narrative.
              </CapabilityBody>
              <PointList>
                <Point>DexFlow — SQL lineage DAGs, AI explanations, and export-ready debugging surfaces</Point>
                <Point>Automation OS — scheduled AI workflows with run tracking and notification routing</Point>
                <Point>D3xTRverse — creator brand and community product at d3xtrverse.com</Point>
              </PointList>
            </Capability>
          </AnimatedSection>
        </CapabilityGrid>
      </Container>
    </Section>
  );
};

export default About;
