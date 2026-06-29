import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  position: relative;
  padding: clamp(5rem, 8vw, 7.4rem) 1.25rem clamp(3.6rem, 7vw, 6rem);
  overflow-x: clip;
  scroll-margin-top: 104px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 78% 12%, color-mix(in srgb, var(--accent-2) 13%, transparent), transparent 34%),
      linear-gradient(180deg, transparent, color-mix(in srgb, var(--surface-soft) 22%, transparent) 42%, transparent);
    pointer-events: none;
  }

  @media (max-width: 640px) {
    padding-inline: 1rem;
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
    align-items: start;
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
  font-size: clamp(2.25rem, 5.8vw, 5.35rem);
  color: var(--text);
  line-height: 0.96;
  margin-bottom: 0;

  @media (max-width: 560px) {
    max-width: 13ch;
    font-size: clamp(2.05rem, 10vw, 3.3rem);
  }
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
  overflow: clip;
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

  > * {
    min-width: 0;
  }

  @media (min-width: 980px) {
    grid-template-columns: 1.02fr 0.98fr;
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    border-radius: 0;
    border-inline: 0;
    padding: 1.1rem 0;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--surface-soft) 44%, transparent), transparent 80%);
    box-shadow: none;
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
  line-height: 1.08;
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
  overflow-wrap: anywhere;
`;

const Detail = styled.div`
  display: grid;
  gap: 0.56rem;
`;

const DetailCard = styled.div`
  border-top: 1px solid var(--line-soft);
  border-radius: 0;
  background: transparent;
  padding: 0.72rem 0 0;
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
  min-height: 44px;
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
  overflow-wrap: anywhere;
`;

const QuietLink = styled.a`
  min-height: 44px;
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
  overflow-wrap: anywhere;
`;

const CaseCompact = styled(Case)`
  opacity: 0.94;

  @media (min-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const CaseVisual = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid var(--line-soft);
  border-radius: 20px;
  background:
    radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 42%),
    color-mix(in srgb, var(--surface-soft) 80%, transparent);
  min-height: 140px;
  padding: 1rem;
  display: grid;
  align-content: center;
  gap: 0.45rem;
`;

const VisualLabel = styled.p`
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-subtle);
  font-weight: 750;
`;

const VisualTitle = styled.p`
  font-size: 0.92rem;
  font-weight: 850;
  color: var(--text);
  line-height: 1.35;
`;

const VisualMeta = styled.p`
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
`;

const PrivateBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  border-radius: 999px;
  border: 1px dashed var(--line);
  color: var(--text-subtle);
  padding: 0 0.92rem;
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
                Enterprise data platforms first, then product experiments that prove depth beyond day-job delivery.
              </Subtitle>
              <ProofSummary aria-label="Portfolio proof summary">
                <SummaryRow>
                  <SummaryLabel>Profession</SummaryLabel>
                  <SummaryValue>Data engineering · KPI Partners</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Signal</SummaryLabel>
                  <SummaryValue>DexFlow · Automation OS · D3xTRverse</SummaryValue>
                </SummaryRow>
              </ProofSummary>
            </div>
          </Intro>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.06}>
          <Case>
            <div>
              <Type>Enterprise · KPI Partners</Type>
              <CaseTitle>Oracle Fusion → Snowflake ETL Platform</CaseTitle>
              <Role>Data Engineer</Role>
              <Scope>
                Architected an AWS-based ETL platform ingesting Oracle Fusion BI data into Snowflake with MWAA Airflow, S3, Python, SQL, and
                dbt. Designed incremental, idempotent, and rerun-safe loading into dimensional and fact models with embedded data quality
                checks, schema drift handling, and backfill-safe workflows.
              </Scope>
              <StackRow>
                <Stack>AWS</Stack>
                <Stack>MWAA</Stack>
                <Stack>Snowflake</Stack>
                <Stack>dbt</Stack>
                <Stack>Python</Stack>
                <Stack>SQL</Stack>
              </StackRow>
            </div>
            <Detail>
              <CaseVisual aria-hidden="true">
                <VisualLabel>Pipeline signal</VisualLabel>
                <VisualTitle>Oracle Fusion → S3 → MWAA → dbt → Snowflake</VisualTitle>
                <VisualMeta>Incremental loads · audit columns · query history monitoring · MTTR reduction</VisualMeta>
              </CaseVisual>
              <DetailCard>
                <DetailLabel>Outcome</DetailLabel>
                <DetailBody>Fewer downstream reporting failures through deterministic load behavior and model-level quality checks.</DetailBody>
              </DetailCard>
              <DetailCard>
                <DetailLabel>Impact</DetailLabel>
                <DetailBody>Improved observability with structured logging, audit tables, and Snowflake query history monitoring.</DetailBody>
              </DetailCard>
            </Detail>
          </Case>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.1}>
          <Case>
            <div>
              <Type>Product + Data Tooling</Type>
              <CaseTitle>DexFlow</CaseTitle>
              <Role>Creator and Lead Engineer</Role>
              <Scope>
                SQL lineage tool that parses complex queries into interactive DAG-based lineage graphs with deterministic explanations,
                Groq-based AI enrichment, URL state sharing, rate limiting, caching, and PNG/SVG export.
              </Scope>
              <StackRow>
                <Stack>React</Stack>
                <Stack>Node.js</Stack>
                <Stack>node-sql-parser</Stack>
                <Stack>React Flow</Stack>
                <Stack>Groq API</Stack>
              </StackRow>
              <LinkRow>
                <PrimaryLink href="https://dex-floww.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Launch DexFlow
                </PrimaryLink>
                <QuietLink href="https://github.com/Saynam221b/dex-floww" target="_blank" rel="noopener noreferrer">
                  Source
                </QuietLink>
              </LinkRow>
            </div>
            <Detail>
              <CaseVisual aria-hidden="true">
                <VisualLabel>Lineage graph</VisualLabel>
                <VisualTitle>AST parse → Dagre layout → inspectable DAG</VisualTitle>
                <VisualMeta>Table dependencies · transformation flow · query impact across complex SQL workloads</VisualMeta>
              </CaseVisual>
              <DetailCard>
                <DetailLabel>Outcome</DetailLabel>
                <DetailBody>Reduced SQL debugging time by making transformation dependencies immediately visible.</DetailBody>
              </DetailCard>
              <DetailCard>
                <DetailLabel>Signal</DetailLabel>
                <DetailBody>Productized data engineering thinking — lineage, explainability, and shareable debugging surfaces.</DetailBody>
              </DetailCard>
            </Detail>
          </Case>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.14}>
          <Case>
            <div>
              <Type>AI Workflow Platform</Type>
              <CaseTitle>Automation OS</CaseTitle>
              <Role>Builder</Role>
              <Scope>
                Private automation platform for scheduled AI workflows including job discovery, AI-based matching, investment review
                summaries, and notification routing with workflow run tracking, input validation, and automated tests.
              </Scope>
              <StackRow>
                <Stack>Python</Stack>
                <Stack>PostgreSQL</Stack>
                <Stack>Supabase</Stack>
                <Stack>Docker</Stack>
                <Stack>Telegram API</Stack>
                <Stack>Email APIs</Stack>
              </StackRow>
              <LinkRow>
                <PrivateBadge>Private build</PrivateBadge>
              </LinkRow>
            </div>
            <Detail>
              <DetailCard>
                <DetailLabel>Outcome</DetailLabel>
                <DetailBody>Extensible workflow platform with secure access, reusable jobs, and structured execution history.</DetailBody>
              </DetailCard>
              <DetailCard>
                <DetailLabel>Signal</DetailLabel>
                <DetailBody>Reliability-minded automation — persistence, validation, notifications, and test coverage beyond scripts.</DetailBody>
              </DetailCard>
            </Detail>
          </Case>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.18}>
          <CaseCompact>
            <div>
              <Type>Creator · D3xTRverse</Type>
              <CaseTitle>D3xTRverse Community</CaseTitle>
              <Role>Full-Stack Developer</Role>
              <Scope>
                Tournament and community surface with responsive interaction design, Django + Supabase backend, and a brand system that
                holds competitive play and product experiments under d3xtrverse.com.
              </Scope>
              <StackRow>
                <Stack>React</Stack>
                <Stack>Django</Stack>
                <Stack>Supabase</Stack>
                <Stack>PostgreSQL</Stack>
              </StackRow>
              <LinkRow>
                <QuietLink href="https://d3xtrverse.com" target="_blank" rel="noopener noreferrer">
                  d3xtrverse.com
                </QuietLink>
                <QuietLink href="/d3xtrverse">Brand story</QuietLink>
              </LinkRow>
            </div>
            <Detail>
              <DetailCard>
                <DetailLabel>Signal</DetailLabel>
                <DetailBody>Secondary creator proof — full-stack delivery and brand craft alongside the data engineering narrative.</DetailBody>
              </DetailCard>
            </Detail>
          </CaseCompact>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Projects;
