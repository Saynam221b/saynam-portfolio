import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  position: relative;
  padding: clamp(5rem, 8vw, 7.4rem) 1.25rem clamp(3.6rem, 7vw, 6rem);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 78% 12%, color-mix(in srgb, var(--accent-2) 13%, transparent), transparent 34%),
      linear-gradient(180deg, transparent, color-mix(in srgb, var(--surface-soft) 42%, transparent) 42%, transparent);
    pointer-events: none;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  gap: clamp(0.9rem, 2.1vw, 1.35rem);
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(240px, 0.42fr);
  gap: clamp(1rem, 4vw, 3rem);
  align-items: end;
  margin-bottom: 0.35rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
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
  max-width: 12ch;
  font-size: clamp(2.35rem, 6.5vw, 5.8rem);
  color: var(--text);
  line-height: 0.9;
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  max-width: 54ch;
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.72;
`;

const ProofSummary = styled.div`
  display: grid;
  gap: 0.52rem;
`;

const SummaryRow = styled.div`
  border-top: 1px solid var(--line-soft);
  padding-top: 0.58rem;
`;

const SummaryLabel = styled.p`
  color: var(--text-subtle);
  font-size: 0.68rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.14em;
`;

const SummaryValue = styled.p`
  margin-top: 0.18rem;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 850;
`;

const Case = styled.article`
  border: 1px solid var(--line);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.09), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 76%, transparent);
  box-shadow: var(--shadow-soft);
  padding: clamp(1rem, 2.6vw, 1.55rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.95rem;
  overflow: hidden;
  position: relative;
  scroll-margin-top: 110px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.038) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(90deg, #000, transparent 86%);
    pointer-events: none;
  }

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
  border: 1px solid var(--line-soft);
  background: var(--surface-soft);
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
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: var(--surface-soft);
  padding: 0.85rem;
  position: relative;
  z-index: 1;
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
  background: var(--accent);
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
  border: 1px solid var(--line);
  background: var(--surface-soft);
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
          <Intro>
            <div>
              <Eyebrow>Proof deck</Eyebrow>
              <Title>Where the story becomes shipped work.</Title>
            </div>
            <div>
              <Subtitle>
                Data infrastructure, web products, and creator-led product thinking are grouped as one proof system instead of separate portfolio cards.
              </Subtitle>
              <ProofSummary aria-label="Portfolio proof summary">
                <SummaryRow>
                  <SummaryLabel>Profession</SummaryLabel>
                  <SummaryValue>Data engineering systems</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Passion</SummaryLabel>
                  <SummaryValue>Web products and creator output</SummaryValue>
                </SummaryRow>
              </ProofSummary>
            </div>
          </Intro>
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
