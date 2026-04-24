import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import RemotionPreview from './RemotionPreview';

const HeroSection = styled.section`
  position: relative;
  min-height: auto;
  padding: clamp(5rem, 8vw, 6.5rem) 1.25rem clamp(3.5rem, 7vw, 5rem);
  display: grid;
  align-items: center;
  overflow: hidden;
`;

const Inner = styled.div`
  width: min(1240px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(420px, 1.12fr);
  gap: clamp(1.6rem, 5vw, 4.2rem);
  align-items: center;

  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const Eyebrow = styled(motion.p)`
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3.4rem, 10vw, 8.8rem);
  font-weight: 900;
  line-height: 0.86;
  max-width: 7.2ch;

  span {
    display: block;
    font-family: var(--font-display);
    color: var(--accent-3);
  }
`;

const Subcopy = styled(motion.p)`
  max-width: 58ch;
  color: var(--text-muted);
  font-size: clamp(1rem, 2vw, 1.18rem);
  line-height: 1.75;
  margin-top: 1.15rem;
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.3rem;
`;

const Button = styled.a`
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid ${props => (props.primary ? 'transparent' : 'var(--line)')};
  background: ${props => (props.primary ? 'var(--accent)' : 'var(--surface-soft)')};
  color: ${props => (props.primary ? 'var(--button-text)' : 'var(--text)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: 0.86rem;
  font-weight: 800;
  transition: transform 0.22s var(--ease-out), border-color 0.22s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: var(--accent);
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  z-index: 1;
  min-width: 0;
`;

const Timeline = styled(motion.div)`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const TimelineItem = styled.div`
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  background: var(--surface-soft);
  padding: 0.76rem;
`;

const TimelineLabel = styled.p`
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 800;
`;

const TimelineMeta = styled.p`
  margin-top: 0.24rem;
  color: var(--text-subtle);
  font-size: 0.78rem;
  line-height: 1.45;
`;

const Track = styled(motion.div)`
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1rem;
  height: 1px;
  background: var(--line-soft);
  transform-origin: 0 50%;

  @media (max-width: 760px) {
    display: none;
  }
`;

const CinematicHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const trackScale = useTransform(scrollYProgress, [0, 0.8], [0.08, 1]);

  return (
    <HeroSection id="home" ref={ref}>
      <Inner>
        <Copy style={{ y: copyY }}>
          <Eyebrow initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}>
            Data engineer + product builder
          </Eyebrow>
          <Title initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.82, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}>
            Saynam <span>Sharma</span>
          </Title>
          <Subcopy initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            I build data systems and product interfaces that make complex operations feel clear, fast, and ready for real users.
          </Subcopy>
          <Actions initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.52, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}>
            <Button primary href="#projects">Watch the work</Button>
            <Button href="#contact">Start a build</Button>
          </Actions>
        </Copy>

        <Stage style={{ y: stageY, scale: stageScale }}>
          <RemotionPreview variant="hero" ariaLabel="Animated Saynam Sharma command center" />
          <Timeline>
            <TimelineItem>
              <TimelineLabel>Data platforms</TimelineLabel>
              <TimelineMeta>ETL, Snowflake, dbt, Databricks</TimelineMeta>
            </TimelineItem>
            <TimelineItem>
              <TimelineLabel>Product systems</TimelineLabel>
              <TimelineMeta>React, Next.js, UX architecture</TimelineMeta>
            </TimelineItem>
            <TimelineItem>
              <TimelineLabel>Delivery mode</TimelineLabel>
              <TimelineMeta>Freelance builds and product teams</TimelineMeta>
            </TimelineItem>
          </Timeline>
        </Stage>
      </Inner>
      <Track style={{ scaleX: trackScale }} />
    </HeroSection>
  );
};

export default CinematicHero;
