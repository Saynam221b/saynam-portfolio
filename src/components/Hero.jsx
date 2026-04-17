import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100svh - 72px);
  display: flex;
  align-items: center;
  padding: 3.8rem 1.25rem 3.25rem;
  overflow: hidden;
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 10% 16%, rgba(57, 116, 255, 0.22), transparent 34%),
    radial-gradient(circle at 88% 30%, rgba(22, 188, 170, 0.16), transparent 36%);
`;

const Texture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(157, 181, 237, 0.36) 1px, transparent 1px),
    linear-gradient(90deg, rgba(157, 181, 237, 0.36) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 88%);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.1rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: end;
  }
`;

const Left = styled.div``;

const Eyebrow = styled(motion.p)`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: rgba(178, 202, 250, 0.94);
  margin-bottom: 0.9rem;
`;

const Heading = styled(motion.h1)`
  font-size: clamp(2.4rem, 7.5vw, 5.9rem);
  line-height: 0.88;
  color: #f6f8ff;
  max-width: 10.7em;
  margin-bottom: 1rem;

  i {
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-style: italic;
    color: #9dd9d2;
  }
`;

const Subcopy = styled(motion.p)`
  max-width: 700px;
  font-size: clamp(1rem, 2.2vw, 1.18rem);
  color: rgba(210, 222, 248, 0.92);
  line-height: 1.72;
  margin-bottom: 1.35rem;
`;

const TrustLine = styled(motion.p)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(167, 195, 250, 0.96);
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CtaRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 0.68rem;
`;

const PrimaryButton = styled.a`
  min-height: 46px;
  padding: 0 1.3rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #ffffff;
  background: linear-gradient(132deg, #2f6dff 0%, #18b6a4 100%);
  box-shadow: 0 12px 30px rgba(23, 85, 210, 0.34);
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.a`
  min-height: 46px;
  padding: 0 1.28rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(233, 240, 255, 0.97);
  border: 1px solid rgba(151, 176, 234, 0.45);
  background: rgba(14, 27, 57, 0.6);
  transition: border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(173, 211, 255, 0.8);
  }
`;

const TertiaryText = styled.p`
  font-size: 0.9rem;
  color: rgba(184, 205, 246, 0.95);

  a {
    color: #9fd6ff;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Right = styled(motion.aside)`
  padding: 1.1rem;
  border-radius: 18px;
  border: 1px solid rgba(151, 176, 234, 0.25);
  background: rgba(12, 21, 46, 0.62);
`;

const SideLabel = styled.p`
  color: rgba(172, 196, 246, 0.92);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: 0.85rem;
`;

const ProofList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.74rem;
  margin-bottom: 0.86rem;
`;

const ProofItem = styled.li`
  padding-bottom: 0.74rem;
  border-bottom: 1px solid rgba(151, 176, 234, 0.16);

  strong {
    display: block;
    font-size: 1.02rem;
    color: #f2f6ff;
    margin-bottom: 0.2rem;
  }

  span {
    font-size: 0.84rem;
    color: rgba(184, 203, 241, 0.93);
    line-height: 1.58;
  }
`;

const SideFooter = styled.p`
  font-size: 0.8rem;
  color: rgba(178, 198, 239, 0.92);
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <Atmosphere />
      <Texture />
      <Container>
        <Left>
          <Eyebrow initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
            Saynam Sharma Studio
          </Eyebrow>

          <Heading initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.04 }}>
            Data systems and <i>web products</i> designed for speed, reliability, and business outcomes.
          </Heading>

          <Subcopy initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46, delay: 0.08 }}>
            I deliver production ETL and lakehouse pipelines, then translate that same engineering rigor into premium React and Next.js experiences.
            Teams work with me for both freelance project execution and long-term product ownership.
          </Subcopy>

          <TrustLine initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.12 }}>
            Freelance web projects + data engineering opportunities
          </TrustLine>

          <CtaRow initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.16 }}>
            <PrimaryButton href="#contact">Start a Project</PrimaryButton>
            <SecondaryButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View Resume
            </SecondaryButton>
          </CtaRow>

          <TertiaryText>
            Available for select freelance and full-time roles. <a href="#contact">Check availability lanes</a>.
          </TertiaryText>
        </Left>

        <Right initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <SideLabel>Recent Result Signals</SideLabel>
          <ProofList>
            <ProofItem>
              <strong>45-60% pipeline runtime reduction</strong>
              <span>Spark workload tuning with partition and shuffle strategy updates.</span>
            </ProofItem>
            <ProofItem>
              <strong>Idempotent ETL at production scale</strong>
              <span>Reliable incremental reruns with schema drift handling in dbt and Snowflake.</span>
            </ProofItem>
            <ProofItem>
              <strong>Freelance-ready web delivery</strong>
              <span>React/Next.js product builds with clear scope, rapid execution, and production handoff.</span>
            </ProofItem>
          </ProofList>
          <SideFooter>Stack: Databricks, Airflow, Snowflake, dbt, React, Next.js, TypeScript, AWS</SideFooter>
        </Right>
      </Container>
    </HeroSection>
  );
};

export default Hero;
