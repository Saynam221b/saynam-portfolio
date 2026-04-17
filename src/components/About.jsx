import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 4.7rem 1.25rem 2.1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.9rem;
`;

const Eyebrow = styled.p`
  font-size: 0.71rem;
  color: rgba(170, 194, 245, 0.94);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-size: clamp(1.95rem, 4.3vw, 3.55rem);
  color: ${props => props.theme.colors.text};
  max-width: 900px;
  margin-bottom: 0.85rem;

  span {
    font-family: 'Instrument Serif', Georgia, serif;
    color: #95d6ce;
  }
`;

const Intro = styled.p`
  max-width: 760px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.98rem;
  line-height: 1.74;
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.95rem;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }
`;

const Pane = styled.article`
  border: 1px solid rgba(151, 176, 234, 0.23);
  border-radius: 18px;
  background: rgba(12, 22, 48, 0.5);
  padding: 1.2rem;
`;

const PaneLabel = styled.p`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: rgba(167, 194, 248, 0.95);
  margin-bottom: 0.5rem;
`;

const PaneTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.38rem;
  margin-bottom: 0.55rem;
`;

const PaneCopy = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.93rem;
  line-height: 1.72;
  margin-bottom: 0.82rem;
`;

const PointList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.46rem;
`;

const Point = styled.li`
  color: rgba(202, 218, 249, 0.95);
  font-size: 0.86rem;
  line-height: 1.62;
  padding-left: 0.75rem;
  border-left: 2px solid rgba(96, 168, 255, 0.58);
`;

const About = () => {
  return (
    <Section id="services">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Header>
            <Eyebrow>Service Split</Eyebrow>
            <Title>
              One engineer across <span>data systems</span> and <span>web product delivery</span>.
            </Title>
            <Intro>
              This hybrid model removes handoff friction. Architecture, implementation, and user-facing quality stay aligned from the first
              technical decision to production release.
            </Intro>
          </Header>
        </AnimatedSection>

        <Split>
          <AnimatedSection animation="fadeRight" delay={0.08}>
            <Pane>
              <PaneLabel>Data Engineering</PaneLabel>
              <PaneTitle>ETL, lakehouse, reliability, and observability</PaneTitle>
              <PaneCopy>
                I build robust analytics pipelines that are rerun-safe, cost-aware, and ready for long-term operations.
              </PaneCopy>
              <PointList>
                <Point>Batch and incremental ingestion with strict idempotency and schema drift controls.</Point>
                <Point>dbt model layers with quality checks and audit-ready transformation design.</Point>
                <Point>Operational observability that reduces triage time and pipeline incidents.</Point>
              </PointList>
            </Pane>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.12}>
            <Pane>
              <PaneLabel>Web Development</PaneLabel>
              <PaneTitle>React and Next.js product builds for teams and freelance clients</PaneTitle>
              <PaneCopy>
                I ship production-ready interfaces with strong interaction quality, clear hierarchy, and performance discipline.
              </PaneCopy>
              <PointList>
                <Point>Modern frontend architecture for dashboards, tools, and customer-facing product surfaces.</Point>
                <Point>Full-stack delivery where data-heavy systems still feel clear and easy to use.</Point>
                <Point>Freelance-friendly execution with tight scope, iterative checkpoints, and clean handoff.</Point>
              </PointList>
            </Pane>
          </AnimatedSection>
        </Split>
      </Container>
    </Section>
  );
};

export default About;
