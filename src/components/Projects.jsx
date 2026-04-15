import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 4.2rem 1.25rem 2.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.7rem;
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
  font-size: clamp(1.8rem, 4.1vw, 3rem);
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.p`
  max-width: 760px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.98rem;
  line-height: 1.7;
`;

const CaseBand = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.15rem;
  border-radius: 18px;
  border: 1px solid rgba(126, 151, 214, 0.22);
  background: rgba(10, 22, 52, 0.52);
  margin-bottom: 1rem;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(124, 190, 255, 0.52);
  }

  @media (min-width: 920px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
`;

const CaseBandReverse = styled(CaseBand)`
  @media (min-width: 920px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const CaseLeft = styled.div``;
const CaseRight = styled.div``;

const CaseType = styled.p`
  font-size: 0.74rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: rgba(145, 185, 255, 0.92);
  font-weight: 700;
  margin-bottom: 0.55rem;
`;

const CaseTitle = styled.h3`
  font-size: 1.45rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
`;

const Role = styled.p`
  color: rgba(129, 194, 255, 0.95);
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const Scope = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.94rem;
  line-height: 1.72;
`;

const DetailGrid = styled.div`
  display: grid;
  gap: 0.68rem;
`;

const DetailBlock = styled.div`
  padding: 0.78rem 0.82rem;
  background: rgba(15, 32, 70, 0.55);
  border-left: 2px solid rgba(88, 166, 255, 0.6);
`;

const DetailTitle = styled.p`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-weight: 700;
  color: rgba(168, 198, 250, 0.92);
  margin-bottom: 0.3rem;
`;

const DetailBody = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.65;
`;

const StackRow = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const StackPill = styled.span`
  font-size: 0.72rem;
  padding: 0.22rem 0.62rem;
  border-radius: 999px;
  border: 1px solid rgba(126, 151, 214, 0.3);
  background: rgba(17, 31, 66, 0.65);
  color: rgba(193, 211, 248, 0.95);
`;

const LinkRow = styled.div`
  margin-top: 0.95rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 1rem;
  border-radius: 999px;
  font-size: 0.83rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #2b6cf0 0%, #15b8a6 100%);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const QuietLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 1rem;
  border-radius: 999px;
  font-size: 0.83rem;
  font-weight: 700;
  color: rgba(220, 231, 255, 0.96);
  border: 1px solid rgba(126, 151, 214, 0.45);
  background: rgba(17, 31, 66, 0.45);
`;

const SupportingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
  margin-top: 0.4rem;

  @media (min-width: 780px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SupportingItem = styled.div`
  padding: 1rem;
  border: 1px solid rgba(126, 151, 214, 0.2);
  border-radius: 14px;
  background: rgba(11, 24, 54, 0.42);
`;

const SupportingTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
`;

const SupportingCopy = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.88rem;
  line-height: 1.66;
  margin-bottom: 0.7rem;
`;

const Projects = () => {
  return (
    <Section id="projects">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Header>
            <Eyebrow>Case Studies</Eyebrow>
            <Title>Featured delivery across data platforms and web product builds.</Title>
            <Subtitle>
              These case studies focus on scope, implementation choices, and measurable outcomes. They are selected to show both core data engineering depth and freelance-ready web development capability.
            </Subtitle>
          </Header>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.08}>
          <CaseBand>
            <CaseLeft>
              <CaseType>Data Platform</CaseType>
              <CaseTitle>Oracle Fusion to Snowflake ETL Platform</CaseTitle>
              <Role>Data Engineer</Role>
              <Scope>
                Designed an AWS-based ingestion and transformation flow for Oracle Fusion BI into Snowflake with rerun safety,
                incremental logic, and stronger quality controls for downstream reporting.
              </Scope>
              <StackRow>
                <StackPill>AWS</StackPill>
                <StackPill>Airflow (MWAA)</StackPill>
                <StackPill>Snowflake</StackPill>
                <StackPill>Python</StackPill>
                <StackPill>dbt</StackPill>
                <StackPill>SQL</StackPill>
              </StackRow>
            </CaseLeft>
            <CaseRight>
              <DetailGrid>
                <DetailBlock>
                  <DetailTitle>Scope</DetailTitle>
                  <DetailBody>Incremental ingestion, transformations, quality checks, audit columns, and schema drift handling.</DetailBody>
                </DetailBlock>
                <DetailBlock>
                  <DetailTitle>Outcome</DetailTitle>
                  <DetailBody>Stable reruns and fewer reporting defects through idempotent load design and tighter model governance.</DetailBody>
                </DetailBlock>
                <DetailBlock>
                  <DetailTitle>Result Signal</DetailTitle>
                  <DetailBody>Higher pipeline reliability and faster troubleshooting with structured logs and Snowflake query history.</DetailBody>
                </DetailBlock>
              </DetailGrid>
            </CaseRight>
          </CaseBand>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.12}>
          <CaseBandReverse>
            <CaseRight>
              <CaseType>Web Product + Data Tooling</CaseType>
              <CaseTitle>D3xTRverse Flow</CaseTitle>
              <Role>Creator & Lead Engineer</Role>
              <Scope>
                Built an AST-driven SQL lineage visualizer that converts nested SQL into deterministic DAGs with interactive dependency tracing and node-level insight workflows.
              </Scope>
              <StackRow>
                <StackPill>Next.js</StackPill>
                <StackPill>React Flow</StackPill>
                <StackPill>AST Parsing</StackPill>
                <StackPill>Llama 3 (Groq)</StackPill>
              </StackRow>
              <LinkRow>
                <PrimaryLink href="https://dex-floww.vercel.app/" target="_blank" rel="noopener noreferrer">Launch App</PrimaryLink>
                <QuietLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">Source</QuietLink>
              </LinkRow>
            </CaseRight>
            <CaseLeft>
              <DetailGrid>
                <DetailBlock>
                  <DetailTitle>Scope</DetailTitle>
                  <DetailBody>Dependency tracing, CTE-aware graph layouts, and real-time node logic analysis.</DetailBody>
                </DetailBlock>
                <DetailBlock>
                  <DetailTitle>Outcome</DetailTitle>
                  <DetailBody>Faster SQL debugging and clearer lineage communication for complex analytical workloads.</DetailBody>
                </DetailBlock>
                <DetailBlock>
                  <DetailTitle>Result Signal</DetailTitle>
                  <DetailBody>Demonstrates freelance-ready capability in both frontend UX and data-centric product interaction design.</DetailBody>
                </DetailBlock>
              </DetailGrid>
            </CaseLeft>
          </CaseBandReverse>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.15}>
          <CaseBand>
            <CaseLeft>
              <CaseType>Full-Stack Community Product</CaseType>
              <CaseTitle>D3xTRverse Community</CaseTitle>
              <Role>Full-Stack Developer</Role>
              <Scope>
                Delivered a modern community platform with event and tournament modules, balancing fast frontend interactions with maintainable backend architecture.
              </Scope>
              <StackRow>
                <StackPill>React</StackPill>
                <StackPill>Django</StackPill>
                <StackPill>Supabase</StackPill>
                <StackPill>REST API</StackPill>
              </StackRow>
              <LinkRow>
                <PrimaryLink href="https://d3xtrverse.vercel.app/" target="_blank" rel="noopener noreferrer">Launch App</PrimaryLink>
              </LinkRow>
            </CaseLeft>
            <CaseRight>
              <DetailGrid>
                <DetailBlock>
                  <DetailTitle>Scope</DetailTitle>
                  <DetailBody>Event workflows, stateful interaction modules, and scalable data-backed community features.</DetailBody>
                </DetailBlock>
                <DetailBlock>
                  <DetailTitle>Outcome</DetailTitle>
                  <DetailBody>A production-ready product surface suitable as reference work for freelance web development clients.</DetailBody>
                </DetailBlock>
                <DetailBlock>
                  <DetailTitle>Result Signal</DetailTitle>
                  <DetailBody>Validates end-to-end product delivery from UI/UX to backend integration and deployment.</DetailBody>
                </DetailBlock>
              </DetailGrid>
            </CaseRight>
          </CaseBand>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.18}>
          <SupportingGrid>
            <SupportingItem>
              <SupportingTitle>Databricks Lakehouse Pipelines</SupportingTitle>
              <SupportingCopy>
                Built large-scale PySpark pipelines with Delta merge patterns and achieved ~45-60% runtime reduction through workload tuning.
              </SupportingCopy>
              <QuietLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">Reference</QuietLink>
            </SupportingItem>
            <SupportingItem>
              <SupportingTitle>Data Observability Framework</SupportingTitle>
              <SupportingCopy>
                Implemented telemetry and validation checks for proactive alerting and faster root-cause identification in pipeline operations.
              </SupportingCopy>
              <QuietLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">Reference</QuietLink>
            </SupportingItem>
          </SupportingGrid>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Projects;
