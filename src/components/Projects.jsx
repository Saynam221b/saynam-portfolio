import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 4rem 1.25rem 2.45rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.8rem;
`;

const Eyebrow = styled.p`
  font-size: 0.71rem;
  color: rgba(170, 194, 245, 0.94);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const Title = styled.h2`
  font-size: clamp(1.95rem, 4.1vw, 3.35rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.8rem;
`;

const Subtitle = styled.p`
  max-width: 760px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.96rem;
  line-height: 1.74;
`;

const CaseBand = styled.article`
  border-top: 1px solid rgba(151, 176, 234, 0.28);
  padding: 1.1rem 0 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-top-color: rgba(158, 214, 255, 0.75);
  }

  @media (min-width: 960px) {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 1.2rem;
    align-items: start;
  }
`;

const CaseBandAlt = styled(CaseBand)`
  @media (min-width: 960px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const Lead = styled.div``;

const Type = styled.p`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(170, 194, 245, 0.94);
  font-weight: 700;
  margin-bottom: 0.43rem;
`;

const CaseTitle = styled.h3`
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.33rem;
`;

const Role = styled.p`
  color: rgba(150, 212, 255, 0.95);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-weight: 700;
  margin-bottom: 0.67rem;
`;

const Scope = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.92rem;
  line-height: 1.72;
  max-width: 58ch;
`;

const Detail = styled.div`
  display: grid;
  gap: 0.62rem;
`;

const DetailItem = styled.div`
  padding: 0.72rem 0.78rem;
  border-left: 2px solid rgba(104, 176, 255, 0.65);
  background: rgba(10, 20, 45, 0.5);
`;

const DetailTitle = styled.p`
  font-size: 0.69rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(170, 194, 245, 0.94);
  font-weight: 700;
  margin-bottom: 0.22rem;
`;

const DetailBody = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.88rem;
  line-height: 1.64;
`;

const StackRow = styled.div`
  margin-top: 0.72rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Stack = styled.span`
  font-size: 0.71rem;
  padding: 0.22rem 0.62rem;
  border-radius: 999px;
  border: 1px solid rgba(151, 176, 234, 0.34);
  color: rgba(206, 220, 248, 0.96);
`;

const LinkRow = styled.div`
  margin-top: 0.84rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.58rem;
`;

const PrimaryLink = styled.a`
  min-height: 38px;
  padding: 0 0.95rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(130deg, #2f6dff 0%, #18b6a4 100%);
`;

const QuietLink = styled.a`
  min-height: 38px;
  padding: 0 0.95rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: rgba(233, 240, 255, 0.96);
  border: 1px solid rgba(151, 176, 234, 0.42);
  background: rgba(13, 24, 50, 0.56);
`;

const MiniGrid = styled.div`
  border-top: 1px solid rgba(151, 176, 234, 0.28);
  margin-top: 0.4rem;
  padding-top: 0.95rem;
  display: grid;
  gap: 0.7rem;
  grid-template-columns: 1fr;

  @media (min-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Mini = styled.div`
  padding: 0.84rem;
  border: 1px solid rgba(151, 176, 234, 0.2);
  border-radius: 13px;
  background: rgba(11, 21, 45, 0.42);
`;

const MiniTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 0.96rem;
  margin-bottom: 0.26rem;
`;

const MiniCopy = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.86rem;
  line-height: 1.63;
`;

const Projects = () => {
  return (
    <Section id="projects">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Header>
            <Eyebrow>Featured Case Studies</Eyebrow>
            <Title>Selected work across data platforms and web product builds.</Title>
            <Subtitle>
              Each case study highlights role, scope, stack, and result signals so clients and hiring teams can evaluate execution quality quickly.
            </Subtitle>
          </Header>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.06}>
          <CaseBand>
            <Lead>
              <Type>Data Platform</Type>
              <CaseTitle>Oracle Fusion to Snowflake ETL Platform</CaseTitle>
              <Role>Role: Data Engineer</Role>
              <Scope>
                Designed and shipped an AWS-based ingestion and transformation flow from Oracle Fusion BI into Snowflake with idempotent
                incremental logic and stronger governance for analytics consumers.
              </Scope>
              <StackRow>
                <Stack>AWS</Stack>
                <Stack>Airflow (MWAA)</Stack>
                <Stack>Snowflake</Stack>
                <Stack>Python</Stack>
                <Stack>dbt</Stack>
                <Stack>SQL</Stack>
              </StackRow>
            </Lead>
            <Detail>
              <DetailItem>
                <DetailTitle>Scope</DetailTitle>
                <DetailBody>Incremental ingestion, transformations, audit columns, and schema evolution controls.</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailTitle>Outcome</DetailTitle>
                <DetailBody>Fewer reporting defects through deterministic load behavior and model-level quality checks.</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailTitle>Result Signal</DetailTitle>
                <DetailBody>Higher reliability with faster triage using structured logs and Snowflake query history.</DetailBody>
              </DetailItem>
            </Detail>
          </CaseBand>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.1}>
          <CaseBandAlt>
            <Detail>
              <DetailItem>
                <DetailTitle>Scope</DetailTitle>
                <DetailBody>AST parsing, CTE-aware graph layouts, and interactive SQL dependency tracing.</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailTitle>Outcome</DetailTitle>
                <DetailBody>Clearer lineage communication and faster debugging for complex analytical SQL workloads.</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailTitle>Result Signal</DetailTitle>
                <DetailBody>Strong proof of freelance web capability on data-centric product interaction design.</DetailBody>
              </DetailItem>
            </Detail>
            <Lead>
              <Type>Web Product + Data Tooling</Type>
              <CaseTitle>D3xTRverse Flow</CaseTitle>
              <Role>Role: Creator and Lead Engineer</Role>
              <Scope>
                Built a productized SQL lineage visualizer converting nested SQL into deterministic DAGs with node-level logic inspection and
                usable graph interactions.
              </Scope>
              <StackRow>
                <Stack>Next.js</Stack>
                <Stack>React Flow</Stack>
                <Stack>AST Parsing</Stack>
                <Stack>Groq / LLM</Stack>
              </StackRow>
              <LinkRow>
                <PrimaryLink href="https://dex-floww.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Launch App
                </PrimaryLink>
                <QuietLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">
                  Source
                </QuietLink>
              </LinkRow>
            </Lead>
          </CaseBandAlt>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.14}>
          <CaseBand>
            <Lead>
              <Type>Full-Stack Product</Type>
              <CaseTitle>D3xTRverse Community</CaseTitle>
              <Role>Role: Full-Stack Developer</Role>
              <Scope>
                Delivered a community and tournament product with responsive frontend interactions and maintainable backend architecture for
                ongoing feature growth.
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
            </Lead>
            <Detail>
              <DetailItem>
                <DetailTitle>Scope</DetailTitle>
                <DetailBody>Interactive product surface, event modules, and backend structure for stable iteration.</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailTitle>Outcome</DetailTitle>
                <DetailBody>Improved user engagement through cleaner navigation, stronger visual hierarchy, and better flow.</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailTitle>Result Signal</DetailTitle>
                <DetailBody>Demonstrates end-to-end freelance execution from architecture to production release.</DetailBody>
              </DetailItem>
            </Detail>
          </CaseBand>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.18}>
          <MiniGrid>
            <Mini>
              <MiniTitle>Reliability and Observability Patterns</MiniTitle>
              <MiniCopy>Reusable monitoring and rerun strategies applied across production ETL pipelines.</MiniCopy>
            </Mini>
            <Mini>
              <MiniTitle>UI Systems for Data-Heavy Products</MiniTitle>
              <MiniCopy>Interaction patterns that simplify complex datasets without sacrificing analytical depth.</MiniCopy>
            </Mini>
          </MiniGrid>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Projects;
