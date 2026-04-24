import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100svh - 76px);
  padding: 4.4rem 1.35rem 3.1rem;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 8% 18%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 36%),
    radial-gradient(circle at 94% 28%, color-mix(in srgb, var(--accent-2) 28%, transparent), transparent 40%);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;

  @media (min-width: 1040px) {
    grid-template-columns: 1.08fr 0.92fr;
    gap: 2rem;
    align-items: center;
  }
`;

const LeftRail = styled(motion.div)`
  max-width: 740px;
`;

const Eyebrow = styled(motion.p)`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: var(--text-subtle);
  margin-bottom: 0.8rem;
`;

const Heading = styled(motion.h1)`
  font-size: clamp(2.5rem, 7vw, 6.9rem);
  line-height: 0.92;
  color: var(--text);
  letter-spacing: 0;
  margin-bottom: 0.9rem;

  i {
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
    font-weight: 500;
    font-style: italic;
    color: color-mix(in srgb, var(--text) 82%, var(--accent) 18%);
  }
`;

const Subcopy = styled(motion.p)`
  max-width: 58ch;
  font-size: clamp(1rem, 1.95vw, 1.16rem);
  color: var(--text-muted);
  line-height: 1.78;
  margin-bottom: 1.2rem;
`;

const CtaRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.62rem;
  margin-bottom: 0.72rem;
`;

const PrimaryButton = styled.a`
  min-height: 48px;
  border-radius: 999px;
  background: var(--accent-gradient);
  color: var(--button-text);
  padding: 0 1.28rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  box-shadow: var(--shadow-md);
`;

const SecondaryButton = styled.a`
  min-height: 48px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: var(--surface-elev-strong);
  color: var(--text);
  padding: 0 1.22rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
`;

const Caption = styled.p`
  color: var(--text-subtle);
  font-size: 0.84rem;
  line-height: 1.6;
`;

const VisualStage = styled(motion.aside)`
  border-radius: 30px;
  border: 1px solid var(--border);
  background: var(--surface-elev);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-md);
  padding: 1.05rem;
  position: relative;
  overflow: hidden;
`;

const Orb = styled(motion.div)`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  top: -70px;
  right: -50px;
  background: radial-gradient(circle at 32% 32%, color-mix(in srgb, var(--accent) 78%, #ffffff 22%), color-mix(in srgb, var(--accent-2) 74%, transparent 26%));
  filter: blur(10px);
  opacity: 0.6;
`;

const StageGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.58rem;
`;

const StageTile = styled(motion.div)`
  border-radius: 16px;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  min-height: 112px;
  padding: 0.78rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TileLabel = styled.p`
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-subtle);
  font-weight: 700;
`;

const TileValue = styled.p`
  font-size: 1.02rem;
  color: var(--text);
  font-weight: 700;
  line-height: 1.2;
`;

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 66]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.52]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -42]);

  return (
    <HeroSection id="home" ref={sectionRef}>
      <Glow />
      <Container>
        <LeftRail style={{ y: copyY, opacity: copyOpacity }}>
          <Eyebrow initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
            Creative Technologist Portfolio
          </Eyebrow>
          <Heading initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.04 }}>
            Product-grade systems, built with <i>engineering precision</i>.
          </Heading>
          <Subcopy initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46, delay: 0.08 }}>
            I design and ship digital experiences where data architecture, interface clarity, and delivery discipline work as one system.
            The outcome is software that feels premium and scales cleanly.
          </Subcopy>
          <CtaRow initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.14 }}>
            <PrimaryButton href="#projects">View Case Studies</PrimaryButton>
            <SecondaryButton href="#contact">Book a Conversation</SecondaryButton>
          </CtaRow>
          <Caption>Open to focused freelance builds and long-term product engineering roles.</Caption>
        </LeftRail>

        <VisualStage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ y: stageY, scale: stageScale }}
        >
          <Orb style={{ y: orbY }} />
          <StageGrid>
            <StageTile whileHover={{ y: -2 }}>
              <TileLabel>Runtime Gains</TileLabel>
              <TileValue>45-60% faster batch pipelines</TileValue>
            </StageTile>
            <StageTile whileHover={{ y: -2 }}>
              <TileLabel>Reliability</TileLabel>
              <TileValue>Idempotent ETL with schema-safe reruns</TileValue>
            </StageTile>
            <StageTile whileHover={{ y: -2 }}>
              <TileLabel>Product Work</TileLabel>
              <TileValue>React and Next.js systems with clear UX</TileValue>
            </StageTile>
            <StageTile whileHover={{ y: -2 }}>
              <TileLabel>Delivery Mode</TileLabel>
              <TileValue>Freelance execution and team ownership</TileValue>
            </StageTile>
          </StageGrid>
        </VisualStage>
      </Container>
    </HeroSection>
  );
};

export default Hero;
