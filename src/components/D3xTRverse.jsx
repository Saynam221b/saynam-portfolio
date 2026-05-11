import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import RemotionPreview from './RemotionPreview';

const Page = styled(motion.div)`
  min-height: 100vh;
  padding: clamp(5.5rem, 9vw, 7.5rem) 1.25rem 4rem;
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

const Hero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
  min-height: 72vh;
  perspective: 1200px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Kicker = styled.p`
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
`;

const Title = styled.h1`
  font-size: clamp(3.5rem, 13vw, 10rem);
  font-weight: 900;
  line-height: 0.78;
  max-width: 8ch;

  span {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
  }
`;

const Copy = styled.p`
  max-width: 60ch;
  color: var(--text-muted);
  font-size: 1.02rem;
  line-height: 1.76;
  margin-top: 1rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
`;

const Button = styled.a`
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid ${props => (props.primary ? 'transparent' : 'var(--line)')};
  background: ${props => (props.primary ? 'var(--accent)' : 'var(--surface-soft)')};
  color: ${props => (props.primary ? 'var(--button-text)' : 'var(--text)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.95rem;
  font-size: 0.86rem;
  font-weight: 850;
`;

const StageShell = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border: 1px solid var(--line-soft);
    border-radius: 26px;
    background: var(--surface-soft);
    pointer-events: none;
  }

  &::before {
    inset: 9% -4% auto auto;
    width: 38%;
    height: 30%;
    transform: translateZ(-80px) rotate(7deg);
  }

  &::after {
    inset: auto auto 6% -5%;
    width: 45%;
    height: 22%;
    transform: translateZ(-60px) rotate(-5deg);
  }

  @media (max-width: 920px) {
    &::before,
    &::after {
      display: none;
    }
  }
`;

const StagePlayer = styled.div`
  position: relative;
  z-index: 1;

  > div {
    min-height: 430px;
  }

  @media (max-width: 560px) {
    > div {
      min-height: 340px;
    }
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 2rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  border-top: 1px solid var(--line);
  padding-top: 1rem;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 900;
`;

const CardText = styled.p`
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.68;
  margin-top: 0.55rem;
`;

const cards = [
  ['Competitive layer', 'Tournament and community concepts built around high-skill players and repeatable formats.'],
  ['Technical layer', 'Coding, product experiments, and systems content shaped with practical engineering taste.'],
  ['Creator layer', 'A branded ecosystem that can hold games, software, and community without feeling scattered.'],
];

const D3xTRverse = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const stageRotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const stageRotateY = useTransform(scrollYProgress, [0, 1], [-4, 5]);

  return (
    <Page initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42 }}>
      <Inner>
        <Hero ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            style={{ y: copyY }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <Kicker>Branded sub-story</Kicker>
            <Title>
              D3x <span>TRverse</span>
            </Title>
            <Copy>
              A gaming and coding ecosystem with a sharper cinematic treatment: competitive play, technical depth, and product experiments under one clear brand.
            </Copy>
            <Actions>
              <Button primary href="https://d3xtrverse.vercel.app/" target="_blank" rel="noopener noreferrer">Visit official site</Button>
              <Button href="/#projects">Back to work</Button>
            </Actions>
          </motion.div>

          <StageShell
            initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            style={{ y: stageY, rotateX: stageRotateX, rotateY: stageRotateY }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <StagePlayer>
              <RemotionPreview
                variant="d3x"
                accent="#72f6d1"
                accentAlt="#8fb7ff"
                ariaLabel="D3xTRverse cinematic brand system"
              />
            </StagePlayer>
          </StageShell>
        </Hero>

        <Grid>
          {cards.map(([title, text], index) => (
            <Card
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <CardTitle>{title}</CardTitle>
              <CardText>{text}</CardText>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Page>
  );
};

export default D3xTRverse;
