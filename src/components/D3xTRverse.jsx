import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const BrandStage = styled.div`
  position: relative;
  min-height: 430px;
  border: 1px solid var(--line);
  border-radius: 34px;
  background:
    radial-gradient(circle at 18% 16%, color-mix(in srgb, var(--accent-2) 20%, transparent), transparent 34%),
    radial-gradient(circle at 84% 72%, color-mix(in srgb, var(--accent-3) 18%, transparent), transparent 38%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 34%),
    var(--surface);
  box-shadow: var(--shadow);
  overflow: hidden;

  @media (max-width: 560px) {
    min-height: 340px;
  }
`;

const BrandGrid = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 42px 42px;
  opacity: 0.58;
`;

const BrandPanel = styled.div`
  position: absolute;
  border: 1px solid var(--line-soft);
  border-radius: 24px;
  background: color-mix(in srgb, var(--surface-strong) 84%, transparent);
  box-shadow: var(--shadow-soft);
  padding: 1rem;
  backdrop-filter: blur(18px);
`;

const MainPanel = styled(BrandPanel)`
  left: 8%;
  top: 18%;
  width: min(420px, 78%);
  transform: rotateY(-10deg) rotateX(5deg);
`;

const SidePanel = styled(BrandPanel)`
  right: 7%;
  bottom: 10%;
  width: min(260px, 46%);
  transform: rotateY(14deg) rotate(-3deg);

  @media (max-width: 560px) {
    width: 58%;
  }
`;

const BrandLabel = styled.p`
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const BrandTitle = styled.p`
  margin-top: 0.5rem;
  color: var(--text);
  font-size: clamp(1.65rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 0.9;

  span {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
  }
`;

const BrandCopy = styled.p`
  margin-top: 0.65rem;
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.5;
`;

const SignalBars = styled.div`
  display: grid;
  gap: 0.45rem;
  margin-top: 0.9rem;
`;

const Signal = styled.div`
  height: 9px;
  width: ${props => props.width};
  border-radius: 999px;
  background: ${props => props.color || 'var(--accent)'};
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
            <BrandStage aria-label="D3xTRverse layered brand system">
              <BrandGrid />
              <MainPanel>
                <BrandLabel>Creator operating system</BrandLabel>
                <BrandTitle>
                  D3x <span>TRverse</span>
                </BrandTitle>
                <BrandCopy>Gaming, code experiments, and product ideas held under one sharper brand layer.</BrandCopy>
                <SignalBars>
                  <Signal width="86%" />
                  <Signal width="62%" color="var(--accent-2)" />
                  <Signal width="74%" color="var(--accent-3)" />
                </SignalBars>
              </MainPanel>
              <SidePanel>
                <BrandLabel>Signal stack</BrandLabel>
                <BrandCopy>Competitive play, technical depth, and creator systems moving together.</BrandCopy>
              </SidePanel>
            </BrandStage>
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
