import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import MotionLayer from './MotionLayer';
import RemotionPreview from './RemotionPreview';

const chapters = [
  {
    id: 'identity',
    eyebrow: 'Identity layer',
    title: 'Saynam Sharma builds the operating layer.',
    accent: 'Data systems, product interfaces, and delivery discipline pulled into one clear story.',
    proof: ['Data engineer + product builder', 'Pune, India', 'Freelance and product teams'],
  },
  {
    id: 'systems',
    eyebrow: 'Data systems',
    title: 'Pipelines stop being fragile blocks.',
    accent: 'Oracle, Snowflake, dbt, Databricks, and PySpark work becomes rerun-safe, observable, and fast enough for real operations.',
    proof: ['45-60% faster batch runs', 'Idempotent loads', 'Structured recovery paths'],
  },
  {
    id: 'product',
    eyebrow: 'Product craft',
    title: 'Complex behavior turns into usable surfaces.',
    accent: 'Interfaces translate technical depth into readable product moments: lineage graphs, workflow states, and decision-ready proof.',
    proof: ['React + Next.js systems', 'D3xTRverse Flow', 'UX architecture'],
  },
  {
    id: 'delivery',
    eyebrow: 'Delivery mode',
    title: 'The ending is calm, useful, and ready to act.',
    accent: 'The film resolves into proof, experience, and a direct path to start the right build.',
    proof: ['Production ownership', 'Clean handoff', 'Focused execution'],
  },
];

const chapterWindows = [
  { start: 0, end: 0.18 },
  { start: 0.21, end: 0.52 },
  { start: 0.5, end: 0.78 },
  { start: 0.75, end: 1 },
];

const FilmSection = styled.section`
  position: relative;
  min-height: 460vh;

  @media (max-width: 900px) {
    min-height: auto;
    overflow: hidden;
  }
`;

const Anchor = styled.span`
  position: absolute;
  top: -88px;
  width: 1px;
  height: 1px;
`;

const StickyFrame = styled.div`
  position: sticky;
  top: 0;
  min-height: 100svh;
  padding: clamp(5rem, 8vw, 6.6rem) 1.25rem clamp(2.8rem, 6vw, 4.5rem);
  display: grid;
  align-items: center;
  overflow: hidden;

  @media (max-width: 900px) {
    position: relative;
    min-height: auto;
    padding-top: 5.2rem;
  }
`;

const Inner = styled.div`
  width: min(1240px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(430px, 1.18fr);
  gap: clamp(1.4rem, 4vw, 4rem);
  align-items: center;

  @media (max-width: 1050px) {
    grid-template-columns: minmax(0, 0.88fr) minmax(360px, 1.12fr);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const TextStage = styled.div`
  position: relative;
  min-height: 560px;
  perspective: 1100px;
`;

const SceneCopy = styled(motion.article)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform-style: preserve-3d;
  pointer-events: none;
`;

const Kicker = styled.p`
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
`;

const Title = styled.h1`
  max-width: 9ch;
  font-size: clamp(3.25rem, 8.3vw, 8.6rem);
  font-weight: 900;
  line-height: 0.82;
  letter-spacing: 0;

  .serif {
    display: block;
    font-family: var(--font-display);
    color: var(--accent-3);
  }
`;

const ChapterTitle = styled.h2`
  max-width: 10ch;
  font-size: clamp(2.8rem, 7vw, 7.4rem);
  font-weight: 900;
  line-height: 0.86;
`;

const Copy = styled.p`
  max-width: 58ch;
  margin-top: 1.1rem;
  color: var(--text-muted);
  font-size: clamp(1rem, 1.8vw, 1.18rem);
  line-height: 1.72;
`;

const ProofStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
  margin-top: 1.25rem;
`;

const Proof = styled(motion.span)`
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-muted);
  padding: 0.42rem 0.68rem;
  font-size: 0.8rem;
  font-weight: 760;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.35rem;
`;

const Button = styled.a`
  min-height: 48px;
  border-radius: 999px;
  border: 1px solid ${props => (props.primary ? 'transparent' : 'var(--line)')};
  background: ${props => (props.primary ? 'var(--accent)' : 'var(--surface-soft)')};
  color: ${props => (props.primary ? 'var(--button-text)' : 'var(--text)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.05rem;
  font-size: 0.84rem;
  font-weight: 850;
  pointer-events: auto;
  transition: transform 0.22s var(--ease-out), border-color 0.22s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: var(--accent);
  }
`;

const VisualStage = styled.div`
  position: relative;
  min-height: min(66vw, 690px);
  perspective: 1300px;
  transform-style: preserve-3d;
`;

const Halo = styled(motion.div)`
  position: absolute;
  inset: 8% 4%;
  border-radius: 42px;
  background:
    radial-gradient(circle at 20% 18%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 34%),
    radial-gradient(circle at 80% 28%, color-mix(in srgb, var(--accent-2) 24%, transparent), transparent 38%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 36%);
  filter: blur(8px);
  opacity: 0.82;
`;

const Frame = styled.div`
  position: absolute;
  inset: 7% 2% 5%;
  border: 1px solid var(--line);
  border-radius: 34px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.09), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 82%, transparent);
  box-shadow: var(--shadow);
  overflow: hidden;
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, transparent, #000 14%, #000 86%, transparent);
  opacity: 0.58;
`;

const NamePlate = styled.div`
  width: min(390px, 44vw);
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-soft);
  padding: clamp(1rem, 2vw, 1.4rem);
  backdrop-filter: blur(18px);
`;

const NameLabel = styled.p`
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 850;
  text-transform: uppercase;
`;

const NameValue = styled.p`
  margin-top: 0.5rem;
  color: var(--text);
  font-size: clamp(2.1rem, 5.2vw, 4.7rem);
  font-weight: 900;
  line-height: 0.84;

  span {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
    font-weight: 650;
  }
`;

const Panel = styled.div`
  min-width: 250px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: color-mix(in srgb, var(--surface-strong) 82%, transparent);
  box-shadow: var(--shadow-soft);
  padding: 1rem;
  backdrop-filter: blur(20px);
`;

const PanelMeta = styled.p`
  color: var(--text-subtle);
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
`;

const PanelTitle = styled.p`
  margin-top: 0.52rem;
  color: var(--text);
  font-size: 1.22rem;
  font-weight: 900;
  line-height: 1.1;
`;

const PanelCopy = styled.p`
  margin-top: 0.52rem;
  color: var(--text-muted);
  font-size: 0.82rem;
  line-height: 1.5;
`;

const Pipeline = styled.div`
  display: grid;
  gap: 0.54rem;
  margin-top: 0.85rem;
`;

const Pipe = styled.div`
  height: 11px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
  width: ${props => props.width || '72%'};
  opacity: ${props => props.opacity || 1};
`;

const MiniGraph = styled.div`
  display: flex;
  align-items: end;
  gap: 0.42rem;
  height: 74px;
  margin-top: 0.85rem;
`;

const Bar = styled.div`
  flex: 1;
  min-width: 16px;
  height: ${props => props.height};
  border-radius: 999px 999px 8px 8px;
  background: ${props => props.color || 'var(--accent)'};
  opacity: 0.8;
`;

const ChapterRail = styled.div`
  position: absolute;
  right: 2.4rem;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  gap: 0.5rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const RailDot = styled.button`
  width: 10px;
  height: ${props => (props.active ? '34px' : '10px')};
  border: 1px solid ${props => (props.active ? 'var(--accent)' : 'var(--line)')};
  border-radius: 999px;
  background: ${props => (props.active ? 'var(--accent)' : 'var(--surface-soft)')};
  transition: height 0.24s var(--ease-out), background 0.24s var(--ease-out), border-color 0.24s var(--ease-out);
`;

const MobileStack = styled.div`
  display: none;
  width: min(100%, 680px);
  margin: 0 auto;

  @media (max-width: 900px) {
    display: grid;
    gap: 1.05rem;
  }
`;

const MobileRail = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.42rem;
    margin-bottom: 0.2rem;
  }
`;

const MobileRailDot = styled.span`
  height: 4px;
  border-radius: 999px;
  background: ${props => (props.active ? 'var(--accent)' : 'var(--line-soft)')};
  box-shadow: ${props => (props.active ? '0 0 22px color-mix(in srgb, var(--accent) 44%, transparent)' : 'none')};
  transition: background 0.24s var(--ease-out), box-shadow 0.24s var(--ease-out);
`;

const MobileCard = styled(motion.article)`
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 26px;
  background:
    radial-gradient(circle at 18% 10%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 38%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 34%),
    var(--surface);
  box-shadow: var(--shadow-soft);
  padding: clamp(1rem, 5vw, 1.35rem);
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    left: -22%;
    top: -40%;
    width: 70%;
    height: 130%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
    transform: rotate(18deg);
    pointer-events: none;
  }
`;

const MobilePreview = styled.div`
  margin: -0.1rem 0 1rem;
`;

const MobileTitle = styled.h2`
  margin-top: 0.65rem;
  font-size: clamp(2.15rem, 12vw, 4rem);
  line-height: 0.9;
`;

const SceneText = ({ chapter, index, progress }) => {
  const { start, end } = chapterWindows[index];
  const firstOpacity = useTransform(progress, [0, 0.13, 0.18], [1, 1, 0]);
  const sceneOpacity = useTransform(progress, [start, start + 0.06, end - 0.06, end], [0, 1, 1, 0]);
  const firstY = useTransform(progress, [0, end], [0, -34]);
  const sceneY = useTransform(progress, [start, start + 0.09, end], [44, 0, -34]);
  const firstScale = useTransform(progress, [0, end], [1, 1.12]);
  const sceneScale = useTransform(progress, [start, start + 0.12, end], [0.92, 1, 0.96]);
  const rotateX = useTransform(progress, [start, end], [index === 0 ? 6 : -4, index === 0 ? -7 : 5]);
  const opacity = index === 0 ? firstOpacity : sceneOpacity;
  const y = index === 0 ? firstY : sceneY;
  const scale = index === 0 ? firstScale : sceneScale;

  return (
    <SceneCopy style={{ opacity, y, scale, rotateX }}>
      <Kicker>{chapter.eyebrow}</Kicker>
      {index === 0 ? (
        <Title>
          Saynam <span className="serif">Sharma</span>
        </Title>
      ) : (
        <ChapterTitle>{chapter.title}</ChapterTitle>
      )}
      <Copy>{chapter.accent}</Copy>
      <ProofStrip>
        {chapter.proof.map(item => (
          <Proof key={item}>{item}</Proof>
        ))}
      </ProofStrip>
      {index === 0 && (
        <Actions>
          <Button primary href="#projects">Watch the work</Button>
          <Button href="#contact">Start a build</Button>
        </Actions>
      )}
    </SceneCopy>
  );
};

const ScrollFilmStage = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const next = Math.min(chapters.length - 1, Math.max(0, Math.floor(latest * chapters.length)));
    setActiveIndex(next);
  });

  const haloScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.96, 1.08, 0.98]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [-4, 6]);
  const nameX = useTransform(scrollYProgress, [0, 0.18, 0.38, 1], [34, -18, -210, -260]);
  const nameY = useTransform(scrollYProgress, [0, 0.24, 0.64, 1], [26, -18, 18, 54]);
  const nameScale = useTransform(scrollYProgress, [0, 0.18, 0.42, 1], [0.94, 1.1, 0.76, 0.64]);
  const nameRotateY = useTransform(scrollYProgress, [0, 0.35, 1], [-18, 8, 22]);
  const pipelineX = useTransform(scrollYProgress, [0, 0.22, 0.5, 0.78], [310, 88, -42, -210]);
  const pipelineY = useTransform(scrollYProgress, [0, 0.32, 0.7, 1], [118, 36, -16, -86]);
  const pipelineScale = useTransform(scrollYProgress, [0, 0.28, 0.48, 0.78], [0.72, 1.08, 0.96, 0.75]);
  const pipelineRotate = useTransform(scrollYProgress, [0, 0.48, 1], [18, -9, -22]);
  const productX = useTransform(scrollYProgress, [0, 0.42, 0.7, 1], [360, 250, 40, -60]);
  const productY = useTransform(scrollYProgress, [0, 0.46, 0.72, 1], [-126, -72, -22, -34]);
  const productScale = useTransform(scrollYProgress, [0, 0.5, 0.74, 1], [0.62, 0.82, 1.1, 0.96]);
  const productRotateX = useTransform(scrollYProgress, [0.42, 0.75, 1], [18, -8, 4]);
  const productRotateY = useTransform(scrollYProgress, [0.42, 0.75, 1], [-24, 7, -5]);
  const deliveryX = useTransform(scrollYProgress, [0, 0.66, 0.86, 1], [-260, -160, 72, 24]);
  const deliveryY = useTransform(scrollYProgress, [0, 0.66, 0.86, 1], [154, 122, 46, -4]);
  const deliveryScale = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [0.58, 0.7, 1, 1.08]);
  const pipelineOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.72, 0.86], [0, 0.2, 1, 1, 0.34]);
  const productOpacity = useTransform(scrollYProgress, [0, 0.42, 0.56, 0.92], [0, 0, 1, 1]);
  const deliveryOpacity = useTransform(scrollYProgress, [0, 0.66, 0.8, 1], [0, 0, 0.95, 1]);
  const scanX = useTransform(scrollYProgress, [0, 1], ['-20%', '112%']);
  const frameRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, -4, 3]);
  const frameRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-7, 5, -3]);

  if (reduceMotion) {
    return (
      <FilmSection id="motion">
        <Anchor id="home" />
        <Anchor id="about" style={{ top: '24%' }} />
        <Anchor id="projects" style={{ top: '62%' }} />
        <StickyFrame>
          <MobileStack style={{ display: 'grid' }}>
            <MobileRail aria-hidden="true">
              {chapters.map((chapter, index) => (
                <MobileRailDot key={chapter.id} active={activeIndex === index} />
              ))}
            </MobileRail>
            {chapters.map(chapter => (
              <MobileCard key={chapter.id}>
                <Kicker>{chapter.eyebrow}</Kicker>
                <MobileTitle>{chapter.title}</MobileTitle>
                <Copy>{chapter.accent}</Copy>
                <ProofStrip>
                  {chapter.proof.map(item => (
                    <Proof key={item}>{item}</Proof>
                  ))}
                </ProofStrip>
              </MobileCard>
            ))}
          </MobileStack>
        </StickyFrame>
      </FilmSection>
    );
  }

  return (
    <FilmSection id="motion" ref={ref} aria-label="Scroll-driven portfolio story">
      <Anchor id="home" />
      <Anchor id="about" style={{ top: '22%' }} />
      <Anchor id="projects" style={{ top: '58%' }} />
      <StickyFrame>
        <Inner>
          <TextStage>
            {chapters.map((chapter, index) => (
              <SceneText key={chapter.id} chapter={chapter} index={index} progress={scrollYProgress} />
            ))}
          </TextStage>

          <VisualStage aria-hidden="true">
            <Halo style={{ scale: haloScale, rotate: haloRotate }} />
            <MotionLayer
              depth={-120}
              style={{
                inset: '6% 2% 5%',
                rotateX: frameRotateX,
                rotateY: frameRotateY,
              }}
            >
              <Frame>
                <GridLines />
              </Frame>
            </MotionLayer>

            <motion.div
              style={{
                position: 'absolute',
                left: scanX,
                top: '8%',
                bottom: '8%',
                width: 120,
                transform: 'skewX(-12deg)',
                background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 34%, transparent), transparent)',
                filter: 'blur(16px)',
                opacity: 0.88,
              }}
            />

            <MotionLayer
              depth={120}
              style={{
                left: '14%',
                top: '22%',
                x: nameX,
                y: nameY,
                scale: nameScale,
                rotateY: nameRotateY,
              }}
            >
              <NamePlate>
                <NameLabel>Command identity</NameLabel>
                <NameValue>
                  Saynam <span>Sharma</span>
                </NameValue>
              </NamePlate>
            </MotionLayer>

            <MotionLayer
              depth={70}
              style={{
                right: '8%',
                top: '34%',
                x: pipelineX,
                y: pipelineY,
                scale: pipelineScale,
                rotateY: pipelineRotate,
                opacity: pipelineOpacity,
              }}
            >
              <Panel>
                <PanelMeta>Pipeline layer</PanelMeta>
                <PanelTitle>Oracle to Snowflake without rerun panic</PanelTitle>
                <PanelCopy>Loads, checks, and transformations move as one observable system.</PanelCopy>
                <Pipeline>
                  <Pipe width="92%" />
                  <Pipe width="74%" opacity="0.78" />
                  <Pipe width="58%" opacity="0.62" />
                </Pipeline>
              </Panel>
            </MotionLayer>

            <MotionLayer
              depth={150}
              style={{
                left: '42%',
                top: '12%',
                x: productX,
                y: productY,
                scale: productScale,
                rotateX: productRotateX,
                rotateY: productRotateY,
                opacity: productOpacity,
              }}
            >
              <Panel>
                <PanelMeta>Product layer</PanelMeta>
                <PanelTitle>D3xTRverse Flow turns SQL into a visible graph</PanelTitle>
                <PanelCopy>Dense transformation logic becomes inspectable, navigable, and useful.</PanelCopy>
                <MiniGraph>
                  <Bar height="44%" color="var(--accent-2)" />
                  <Bar height="72%" />
                  <Bar height="38%" color="var(--accent-3)" />
                  <Bar height="86%" />
                  <Bar height="58%" color="var(--accent-2)" />
                </MiniGraph>
              </Panel>
            </MotionLayer>

            <MotionLayer
              depth={100}
              style={{
                left: '8%',
                bottom: '13%',
                x: deliveryX,
                y: deliveryY,
                scale: deliveryScale,
                rotateY: -8,
                opacity: deliveryOpacity,
              }}
            >
              <Panel>
                <PanelMeta>Delivery layer</PanelMeta>
                <PanelTitle>Architecture, UI, and handoff stay connected</PanelTitle>
                <PanelCopy>Less fog between system decisions, frontend detail, and what teams can operate.</PanelCopy>
                <Actions>
                  <Button primary href="#contact">Start a build</Button>
                </Actions>
              </Panel>
            </MotionLayer>
          </VisualStage>
        </Inner>

        <MobileStack>
          <MobileRail aria-hidden="true">
            {chapters.map((chapter, index) => (
              <MobileRailDot key={chapter.id} active={activeIndex === index} />
            ))}
          </MobileRail>
          {chapters.map((chapter, index) => (
            <MobileCard
              key={chapter.id}
              initial={{ opacity: 0, y: 44, scale: 0.96, rotateX: 8, filter: 'blur(14px)', clipPath: 'inset(9% 0 0 0)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ duration: 0.82, delay: Math.min(index * 0.08, 0.24), ease: [0.16, 1, 0.3, 1] }}
            >
              {index === 0 && (
                <MobilePreview>
                  <RemotionPreview
                    variant="hero"
                    accent="#72f6d1"
                    accentAlt="#8fb7ff"
                    ariaLabel="Mobile cinematic Saynam OS preview"
                  />
                </MobilePreview>
              )}
              <Kicker>{chapter.eyebrow}</Kicker>
              <MobileTitle>{index === 0 ? 'Saynam Sharma' : chapter.title}</MobileTitle>
              <Copy>{chapter.accent}</Copy>
              <ProofStrip>
                {chapter.proof.map((item, proofIndex) => (
                  <Proof
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.42, delay: 0.16 + proofIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item}
                  </Proof>
                ))}
              </ProofStrip>
              {index === 0 && (
                <Actions>
                  <Button primary href="#projects">Watch the work</Button>
                  <Button href="#contact">Start a build</Button>
                </Actions>
              )}
            </MobileCard>
          ))}
        </MobileStack>

        <ChapterRail aria-hidden="true">
          {chapters.map((chapter, index) => (
            <RailDot key={chapter.id} active={activeIndex === index} tabIndex={-1} aria-label={`Chapter ${index + 1}: ${chapter.eyebrow}`} />
          ))}
        </ChapterRail>
      </StickyFrame>
    </FilmSection>
  );
};

export default ScrollFilmStage;
