import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 4.1rem 1.35rem 2.6rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 4vw, 3.5rem);
  color: var(--text);
  margin-bottom: 0.72rem;
`;

const Subtitle = styled.p`
  max-width: 68ch;
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.72;
  margin-bottom: 1.35rem;
`;

const Case = styled.article`
  border-top: 1px solid var(--border);
  padding: 1.1rem 0 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.95rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.02fr 0.98fr;
    gap: 1.25rem;
  }
`;

const Type = styled.p`
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.38rem;
`;

const CaseTitle = styled.h3`
  font-size: clamp(1.28rem, 2.3vw, 1.92rem);
  color: var(--text);
  margin-bottom: 0.32rem;
`;

const Role = styled.p`
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.56rem;
`;

const Scope = styled.p`
  color: var(--text-muted);
  font-size: 0.91rem;
  line-height: 1.72;
  max-width: 60ch;
`;

const StackRow = styled.div`
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Stack = styled.span`
  border: 1px solid var(--border);
  background: var(--surface-elev);
  color: var(--text-muted);
  border-radius: 999px;
  font-size: 0.7rem;
  padding: 0.22rem 0.58rem;
`;

const Detail = styled.div`
  display: grid;
  gap: 0.56rem;
`;

const DetailCard = styled.div`
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface-elev);
  padding: 0.78rem;
`;

const DetailLabel = styled.p`
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.2rem;
`;

const DetailBody = styled.p`
  color: var(--text-muted);
  font-size: 0.87rem;
  line-height: 1.62;
`;

const LinkRow = styled.div`
  margin-top: 0.64rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PrimaryLink = styled.a`
  min-height: 38px;
  border-radius: 999px;
  background: var(--accent-gradient);
  color: var(--button-text);
  padding: 0 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
`;

const QuietLink = styled.a`
  min-height: 38px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-elev-strong);
  color: var(--text);
  padding: 0 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
`;

const Projects = () => {
  return (
    <Section id="projects">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Eyebrow>Selected Work</Eyebrow>
          <Title>Case studies across data and product engineering.</Title>
          <Subtitle>
            These projects show the same operating principle in different contexts: simplify complexity, build with rigor, and ship outcomes
            users can immediately feel.
          </Subtitle>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.06}>
          <Case>
            <div>
              <Type>Data Platform</Type>
              <CaseTitle>Oracle Fusion to Snowflake ETL Platform</CaseTitle>
              <Role>Data Engineer</Role>
              <Scope>
                Designed an AWS-based ingestion and transformation system from Oracle Fusion BI to Snowflake with idempotent incremental logic
                and stable downstream model behavior.
              </Scope>
              <StackRow>
                <Stack>AWS</Stack>
                <Stack>Airflow (MWAA)</Stack>
                <Stack>Snowflake</Stack>
                <Stack>dbt</Stack>
                <Stack>Python</Stack>
                <Stack>SQL</Stack>
              </StackRow>
            </div>
            <Detail>
              <DetailCard>
                <DetailLabel>Outcome</DetailLabel>
                <DetailBody>Fewer reporting defects through deterministic load behavior and model-level quality checks.</DetailBody>
              </DetailCard>
              <DetailCard>
                <DetailLabel>Impact</DetailLabel>
                <DetailBody>Faster incident triage with structured logging and query history driven diagnostics.</DetailBody>
              </DetailCard>
            </Detail>
          </Case>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.1}>
          <Case>
            <div>
              <Type>Product + Data Tooling</Type>
              <CaseTitle>D3xTRverse Flow</CaseTitle>
              <Role>Creator and Lead Engineer</Role>
              <Scope>
                Built a SQL lineage visualizer that transforms nested SQL into deterministic DAGs with node-level inspection for complex
                analytics debugging.
              </Scope>
              <StackRow>
                <Stack>Next.js</Stack>
                <Stack>React Flow</Stack>
                <Stack>AST Parsing</Stack>
                <Stack>LLM</Stack>
              </StackRow>
              <LinkRow>
                <PrimaryLink href="https://dex-floww.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Launch App
                </PrimaryLink>
                <QuietLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">
                  Source
                </QuietLink>
              </LinkRow>
            </div>
            <Detail>
              <DetailCard>
                <DetailLabel>Outcome</DetailLabel>
                <DetailBody>Reduced SQL debugging time by making transformation dependencies immediately visible.</DetailBody>
              </DetailCard>
              <DetailCard>
                <DetailLabel>Signal</DetailLabel>
                <DetailBody>Demonstrates productized thinking on top of deep data engineering constraints.</DetailBody>
              </DetailCard>
            </Detail>
          </Case>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.14}>
          <Case>
            <div>
              <Type>Full-Stack Product</Type>
              <CaseTitle>D3xTRverse Community</CaseTitle>
              <Role>Full-Stack Developer</Role>
              <Scope>
                Delivered a tournament and community surface with responsive interaction design and backend primitives built for iterative
                feature growth.
              </Scope>
              <StackRow>
                <Stack>React</Stack>
                <Stack>Django</Stack>
                <Stack>Supabase</Stack>
                <Stack>PostgreSQL</Stack>
              </StackRow>
              <LinkRow>
                <QuietLink href="https://d3xtrverse.vercel.app/" target="_blank" rel="noopener noreferrer">
                  View Project
                </QuietLink>
              </LinkRow>
            </div>
            <Detail>
              <DetailCard>
                <DetailLabel>Outcome</DetailLabel>
                <DetailBody>Higher engagement through clearer flows and better visual hierarchy in dense screens.</DetailBody>
              </DetailCard>
              <DetailCard>
                <DetailLabel>Signal</DetailLabel>
                <DetailBody>End-to-end freelance-grade delivery from architecture to production release.</DetailBody>
              </DetailCard>
            </Detail>
          </Case>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Projects;
