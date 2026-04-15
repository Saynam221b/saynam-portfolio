import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100svh - 72px);
  display: flex;
  align-items: center;
  padding: 4.1rem 1.25rem 3.1rem;
  overflow: hidden;
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 12% 24%, rgba(43, 108, 240, 0.24), transparent 35%),
    radial-gradient(circle at 86% 28%, rgba(21, 184, 166, 0.2), transparent 34%),
    linear-gradient(180deg, rgba(7, 14, 34, 0.08) 0%, rgba(7, 14, 34, 0) 44%);
`;

const GridTexture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.22;
  background-image:
    linear-gradient(rgba(143, 167, 226, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(143, 167, 226, 0.14) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 88%);
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.05rem;
  position: relative;
  z-index: 1;
`;

const Eyebrow = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #9fc2ff;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.73rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    width: 24px;
    height: 1px;
    background: rgba(159, 194, 255, 0.7);
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.25rem, 8vw, 5rem);
  line-height: 0.93;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
  color: #f2f6ff;
  max-width: 980px;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  color: rgba(209, 222, 255, 0.9);
  max-width: 760px;
  margin-bottom: 1.25rem;
`;

const TrustLine = styled(motion.p)`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(167, 196, 255, 0.9);
  margin-bottom: 1.2rem;
`;

const CTAGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border-radius: 999px;
  padding: 0 1.3rem;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #fff;
  background: linear-gradient(135deg, #2b6cf0 0%, #15b8a6 100%);
  box-shadow: 0 12px 26px rgba(17, 102, 232, 0.32);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 16px 28px rgba(17, 102, 232, 0.38);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border-radius: 999px;
  padding: 0 1.3rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(228, 236, 255, 0.95);
  border: 1px solid rgba(126, 151, 214, 0.45);
  background: rgba(17, 31, 66, 0.65);
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(126, 171, 255, 0.72);
    background: rgba(29, 47, 93, 0.72);
  }
`;

const TertiaryText = styled.p`
  font-size: 0.9rem;
  color: rgba(177, 200, 250, 0.95);
  font-weight: 500;

  a {
    color: #75c9ff;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const StatRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  max-width: 720px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(126, 151, 214, 0.26);
  background: rgba(15, 28, 58, 0.72);
  padding: 0.95rem 0.95rem 0.85rem;
`;

const StatValue = styled.p`
  font-size: 1.18rem;
  line-height: 1.1;
  font-weight: 800;
  color: #f2f6ff;
  margin-bottom: 0.22rem;
`;

const StatLabel = styled.p`
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(167, 190, 244, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const SidePanel = styled(motion.aside)`
  border-radius: 18px;
  border: 1px solid rgba(126, 151, 214, 0.22);
  background: rgba(11, 22, 49, 0.62);
  box-shadow: 0 16px 44px rgba(2, 6, 20, 0.28);
  padding: 1.1rem;
  max-width: 880px;
`;

const PanelTitle = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  color: #f2f6ff;
  margin-bottom: 0.9rem;
`;

const PanelList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.7rem;
  margin-bottom: 0.9rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PanelItem = styled.li`
  padding: 0.72rem;
  border-radius: 12px;
  background: rgba(19, 34, 72, 0.7);
  border: 1px solid rgba(126, 151, 214, 0.2);

  strong {
    display: block;
    font-size: 0.89rem;
    color: #eff4ff;
    margin-bottom: 0.2rem;
  }

  span {
    font-size: 0.8rem;
    color: rgba(173, 195, 245, 0.9);
  }
`;

const PanelFoot = styled.p`
  font-size: 0.78rem;
  color: rgba(173, 195, 245, 0.88);
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <Atmosphere />
      <GridTexture />
      <HeroContainer>
        <div>
          <Eyebrow initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Saynam Sharma Studio
          </Eyebrow>
          <HeroTitle initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
            Data systems and premium web products, designed and delivered end-to-end.
          </HeroTitle>
          <HeroSubtitle initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
            I help teams launch reliable ETL and lakehouse pipelines while also shipping production-grade web experiences in React and Next.js.
            The goal is the same in both worlds: faster delivery, fewer failures, better outcomes.
          </HeroSubtitle>
          <TrustLine initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.14 }}>
            Open to select freelance builds and full-time product/data engineering opportunities.
          </TrustLine>
          <CTAGroup initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
            <PrimaryButton href="#contact">Start a Project</PrimaryButton>
            <SecondaryButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View Resume
            </SecondaryButton>
          </CTAGroup>
          <TertiaryText>
            Available for select freelance and full-time roles. <a href="#contact">See availability and contact lanes</a>.
          </TertiaryText>
          <StatRow initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.24 }}>
            <StatCard>
              <StatValue>45-60%</StatValue>
              <StatLabel>Pipeline Runtime Reduction</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>3+ yrs</StatValue>
              <StatLabel>Production Data Engineering</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>Multi-TB</StatValue>
              <StatLabel>Scale Processed</StatLabel>
            </StatCard>
          </StatRow>
        </div>

        <SidePanel initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46, delay: 0.22 }}>
          <PanelTitle>Recent Delivery Highlights</PanelTitle>
          <PanelList>
            <PanelItem>
              <strong>Oracle Fusion to Snowflake ETL</strong>
              <span>Idempotent incremental loads with dbt quality gates and schema drift handling.</span>
            </PanelItem>
            <PanelItem>
              <strong>Databricks Lakehouse Pipelines</strong>
              <span>Delta merge patterns for late-arriving records, rerun safety, and operational stability.</span>
            </PanelItem>
            <PanelItem>
              <strong>Observability and Alerting</strong>
              <span>Structured telemetry for faster failure triage and lower on-call effort.</span>
            </PanelItem>
          </PanelList>
          <PanelFoot>Tools: Databricks, Spark, Airflow, dbt, Snowflake, AWS, Python, SQL</PanelFoot>
        </SidePanel>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
