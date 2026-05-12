import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const chapters = [
  {
    id: 'identity',
    eyebrow: 'Command center',
    title: 'Data engineer by profession. Builder by instinct.',
    accent:
      'Saynam Sharma turns raw systems, product ideas, and creator energy into one operating story.',
    proof: ['Data Engineer', 'Web Developer', 'Content Creator'],
    role: 'Saynam OS',
  },
  {
    id: 'data',
    eyebrow: 'Professional core',
    title: 'Production data systems that stay calm under pressure.',
    accent:
      'Oracle, Snowflake, dbt, PySpark, and warehouse logic become rerun-safe, observable, and ready for business decisions.',
    proof: ['Idempotent loads', 'Warehouse modeling', 'Recovery paths'],
    role: 'Data Engineering',
  },
  {
    id: 'web',
    eyebrow: 'Passion layer',
    title: 'Web interfaces that make complex work feel usable.',
    accent:
      'The same systems thinking becomes React product surfaces, dashboards, lineage graphs, and polished interaction design.',
    proof: ['React systems', 'Product UI', 'D3xTRverse Flow'],
    role: 'Web Development',
  },
  {
    id: 'content',
    eyebrow: 'Voice layer',
    title: 'Content turns the work into a visible signal.',
    accent:
      'Technical thinking becomes explainers, build logs, portfolio proof, and creator-ready stories people can actually follow.',
    proof: ['Build notes', 'Explainers', 'Creator workflow'],
    role: 'Content Creation',
  },
  {
    id: 'proof',
    eyebrow: 'Proof layer',
    title: 'One profile, three signals, one reason to trust the build.',
    accent:
      'The story resolves into proof: production ownership, product craft, and a clear path to start the next serious build.',
    proof: ['Experience', 'Selected work', 'Contact path'],
    role: 'Proof + Contact',
  },
];

const chapterWindows = [
  { start: 0, end: 0.17 },
  { start: 0.16, end: 0.39 },
  { start: 0.37, end: 0.61 },
  { start: 0.59, end: 0.82 },
  { start: 0.79, end: 1 },
];

const FilmSection = styled.section`
  position: relative;
  min-height: 430vh;
  overflow: visible;

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
  padding: clamp(5.3rem, 8vw, 6.8rem) 1.25rem clamp(2.8rem, 6vw, 4.4rem);
  display: grid;
  align-items: center;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 900px) {
    position: relative;
    min-height: auto;
    padding-top: 5.2rem;
  }
`;

const Inner = styled.div`
  width: min(1260px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(450px, 1.22fr);
  gap: clamp(1.4rem, 4vw, 4rem);
  align-items: center;

  @media (max-width: 1080px) {
    grid-template-columns: minmax(0, 0.86fr) minmax(380px, 1.14fr);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const TextStage = styled.div`
  position: relative;
  z-index: 2;
  min-height: 590px;
  perspective: 1200px;
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
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
`;

const ChapterTitle = styled.h1`
  max-width: 10ch;
  font-size: clamp(3rem, 7.4vw, 7.7rem);
  font-weight: 950;
  line-height: 0.83;

  .serif {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
    font-weight: 650;
  }
`;

const Copy = styled.p`
  max-width: 60ch;
  margin-top: 1.12rem;
  color: var(--text-muted);
  font-size: clamp(1rem, 1.7vw, 1.17rem);
  line-height: 1.72;
`;

const ProofStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
  margin-top: 1.24rem;
`;

const Proof = styled(motion.span)`
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-muted);
  padding: 0.42rem 0.68rem;
  font-size: 0.8rem;
  font-weight: 800;
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
  font-weight: 900;
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
  z-index: 1;
  min-height: min(68vw, 720px);
  perspective: 1500px;
  transform-style: preserve-3d;
`;

const World = styled(motion.div)`
  position: absolute;
  inset: 4% 1% 3%;
  transform-style: preserve-3d;
`;

const Aurora = styled(motion.div)`
  position: absolute;
  inset: 5% 1% 4%;
  border-radius: 44px;
  background:
    radial-gradient(circle at 18% 22%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 34%),
    radial-gradient(circle at 72% 20%, color-mix(in srgb, var(--accent-2) 26%, transparent), transparent 37%),
    radial-gradient(circle at 55% 82%, color-mix(in srgb, var(--accent-3) 22%, transparent), transparent 40%);
  filter: blur(12px);
  opacity: 0.84;
`;

const CommandFrame = styled(motion.div)`
  position: absolute;
  inset: 6% 2% 5%;
  border: 1px solid var(--line);
  border-radius: 36px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.11), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 82%, transparent);
  box-shadow: var(--shadow);
  overflow: hidden;
  transform-style: preserve-3d;
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at 52% 48%, #000 0%, transparent 74%);
  opacity: 0.62;
`;

const Scan = styled(motion.div)`
  position: absolute;
  top: 8%;
  bottom: 8%;
  width: 118px;
  transform: skewX(-12deg);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 36%, transparent), transparent);
  filter: blur(16px);
  opacity: 0.86;
`;

const ObjectLayer = styled(motion.div)`
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter;
`;

const IdentityCard = styled.div`
  width: min(390px, 44vw);
  border: 1px solid var(--line);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 42%),
    rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-soft);
  padding: clamp(1rem, 2vw, 1.45rem);
  backdrop-filter: blur(20px);
`;

const IdentityLabel = styled.p`
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const IdentityName = styled.p`
  margin-top: 0.5rem;
  color: var(--text);
  font-size: clamp(2rem, 5.2vw, 4.6rem);
  font-weight: 950;
  line-height: 0.84;

  span {
    display: block;
    color: var(--accent-3);
    font-family: var(--font-display);
    font-weight: 650;
  }
`;

const RoleOrbit = styled.div`
  display: grid;
  gap: 0.42rem;
  margin-top: 1rem;
`;

const RoleChip = styled.span`
  width: max-content;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-strong) 70%, transparent);
  color: var(--text-muted);
  padding: 0.34rem 0.62rem;
  font-size: 0.78rem;
  font-weight: 850;
`;

const Panel = styled.div`
  min-width: 260px;
  border: 1px solid var(--line);
  border-radius: 25px;
  background:
    radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 38%),
    color-mix(in srgb, var(--surface-strong) 84%, transparent);
  box-shadow: var(--shadow-soft);
  padding: 1rem;
  backdrop-filter: blur(20px);
`;

const PanelMeta = styled.p`
  color: var(--text-subtle);
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const PanelTitle = styled.p`
  margin-top: 0.52rem;
  color: var(--text);
  font-size: 1.2rem;
  font-weight: 950;
  line-height: 1.08;
`;

const PanelCopy = styled.p`
  margin-top: 0.52rem;
  color: var(--text-muted);
  font-size: 0.82rem;
  line-height: 1.5;
`;

const PipelineCanvas = styled.div`
  position: relative;
  width: min(440px, 44vw);
  min-height: 260px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.09), transparent 36%),
    color-mix(in srgb, var(--surface-strong) 80%, transparent);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  backdrop-filter: blur(18px);
`;

const PipeSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;

  path {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    filter: drop-shadow(0 0 18px color-mix(in srgb, var(--accent) 52%, transparent));
  }
`;

const SourceNode = styled.div`
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
  min-width: 94px;
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.09);
  color: var(--text);
  padding: 0.62rem;
  font-size: 0.76rem;
  font-weight: 850;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);

  span {
    display: block;
    margin-top: 0.18rem;
    color: var(--text-subtle);
    font-size: 0.64rem;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const BrowserSlab = styled.div`
  width: min(430px, 42vw);
  border: 1px solid var(--line);
  border-radius: 25px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 82%, transparent);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  backdrop-filter: blur(20px);
`;

const BrowserTop = styled.div`
  height: 42px;
  border-bottom: 1px solid var(--line-soft);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.85rem;

  span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--accent);
    opacity: ${props => props.opacity || 1};
  }
`;

const InterfaceGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 0.72fr;
  gap: 0.7rem;
`;

const CodePanel = styled.div`
  min-height: 160px;
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: rgba(5, 8, 13, 0.5);
  padding: 0.72rem;
  display: grid;
  gap: 0.44rem;
`;

const CodeLine = styled.span`
  height: 9px;
  width: ${props => props.width || '80%'};
  border-radius: 999px;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.18)'};
`;

const WidgetPanel = styled.div`
  min-height: 160px;
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
  padding: 0.7rem;
  display: flex;
  align-items: end;
  gap: 0.34rem;
`;

const WidgetBar = styled.span`
  flex: 1;
  min-width: 12px;
  height: ${props => props.height};
  border-radius: 999px 999px 7px 7px;
  background: ${props => props.color || 'var(--accent)'};
  opacity: 0.82;
`;

const CreatorFrame = styled.div`
  width: min(360px, 36vw);
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    radial-gradient(circle at 22% 12%, color-mix(in srgb, var(--accent-3) 18%, transparent), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 82%, transparent);
  box-shadow: var(--shadow-soft);
  padding: 0.86rem;
  backdrop-filter: blur(20px);
`;

const ReelScreen = styled.div`
  aspect-ratio: 9 / 12;
  border: 1px solid var(--line-soft);
  border-radius: 22px;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.14), transparent 44%),
    radial-gradient(circle at 60% 34%, color-mix(in srgb, var(--accent-2) 22%, transparent), transparent 38%),
    rgba(255, 255, 255, 0.07);
  padding: 0.85rem;
  display: grid;
  align-content: end;
  gap: 0.42rem;
  overflow: hidden;
`;

const ReelLine = styled.span`
  height: ${props => props.height || '11px'};
  width: ${props => props.width || '72%'};
  border-radius: 999px;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.24)'};
`;

const ProofDashboard = styled.div`
  width: min(470px, 45vw);
  border: 1px solid var(--line);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.13), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 84%, transparent);
  box-shadow: var(--shadow);
  padding: 1rem;
  backdrop-filter: blur(22px);
`;

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.52rem;
  margin-top: 0.85rem;
`;

const ProofCard = styled.div`
  min-height: 96px;
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: var(--surface-soft);
  padding: 0.66rem;
`;

const ProofValue = styled.p`
  color: var(--text);
  font-size: 1.42rem;
  font-weight: 950;
  line-height: 0.95;
`;

const ProofLabel = styled.p`
  margin-top: 0.34rem;
  color: var(--text-subtle);
  font-size: 0.68rem;
  font-weight: 850;
  text-transform: uppercase;
`;

const ChapterRail = styled.div`
  position: absolute;
  right: 2.35rem;
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
    gap: 1rem;
  }
`;

const MobileRail = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
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
`;

const MobilePreview = styled.div`
  position: relative;
  min-height: 190px;
  border: 1px solid var(--line-soft);
  border-radius: 22px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.052) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    rgba(255, 255, 255, 0.06);
  background-size: 34px 34px, 34px 34px, auto;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const MobileOrb = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  box-shadow: var(--shadow-soft);
  transform: translate3d(${props => props.x}, ${props => props.y}, 0) rotate(${props => props.rotate});
`;

const MobileTitle = styled.h2`
  margin-top: 0.65rem;
  font-size: clamp(2.08rem, 12vw, 4rem);
  line-height: 0.88;
`;

const SceneText = ({ chapter, index, progress }) => {
  const { start, end } = chapterWindows[index];
  const firstOpacity = useTransform(progress, [0, 0.22, 0.3], [1, 1, 0]);
  const sceneOpacity = useTransform(progress, [start, start + 0.055, end - 0.055, end], [0, 1, 1, 0]);
  const firstY = useTransform(progress, [0, 0.3], [0, -38]);
  const sceneY = useTransform(progress, [start, start + 0.12, end], [52, 0, -38]);
  const firstScale = useTransform(progress, [0, 0.3], [1, 1.08]);
  const sceneScale = useTransform(progress, [start, start + 0.14, end], [0.92, 1, 0.96]);
  const rotateX = useTransform(progress, [start, end], [index % 2 === 0 ? 6 : -5, index % 2 === 0 ? -7 : 5]);
  const opacity = index === 0 ? firstOpacity : sceneOpacity;
  const y = index === 0 ? firstY : sceneY;
  const scale = index === 0 ? firstScale : sceneScale;

  return (
    <SceneCopy style={{ opacity, y, scale, rotateX }}>
      <Kicker>{chapter.eyebrow}</Kicker>
      <ChapterTitle>
        {index === 0 ? (
          <>
            Saynam <span className="serif">Sharma</span>
          </>
        ) : (
          chapter.title
        )}
      </ChapterTitle>
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

const PipelineVisual = () => (
  <PipelineCanvas>
    <PipeSvg viewBox="0 0 440 260" aria-hidden="true">
      <path d="M82 72 C148 70 152 128 220 128 C284 128 292 76 360 78" stroke="var(--accent)" />
      <path d="M82 184 C158 174 164 136 220 136 C282 136 292 184 360 184" stroke="var(--accent-2)" />
      <path d="M220 128 C226 98 246 86 292 86" stroke="var(--accent-3)" />
    </PipeSvg>
    <SourceNode left="7%" top="16%">Oracle<span>source</span></SourceNode>
    <SourceNode left="38%" top="42%">dbt<span>transform</span></SourceNode>
    <SourceNode left="69%" top="18%">Snowflake<span>warehouse</span></SourceNode>
    <SourceNode left="68%" top="63%">Checks<span>observe</span></SourceNode>
  </PipelineCanvas>
);

const WebVisual = () => (
  <BrowserSlab>
    <BrowserTop>
      <span />
      <span style={{ opacity: 0.65 }} />
      <span style={{ opacity: 0.4 }} />
    </BrowserTop>
    <InterfaceGrid>
      <CodePanel>
        <CodeLine width="62%" color="var(--accent)" />
        <CodeLine width="88%" />
        <CodeLine width="74%" color="var(--accent-2)" />
        <CodeLine width="54%" />
        <CodeLine width="82%" color="var(--accent-3)" />
        <CodeLine width="66%" />
      </CodePanel>
      <WidgetPanel>
        <WidgetBar height="42%" color="var(--accent-2)" />
        <WidgetBar height="76%" />
        <WidgetBar height="58%" color="var(--accent-3)" />
        <WidgetBar height="88%" />
      </WidgetPanel>
    </InterfaceGrid>
  </BrowserSlab>
);

const ContentVisual = () => (
  <CreatorFrame>
    <ReelScreen>
      <ReelLine width="38%" color="var(--accent)" />
      <ReelLine width="82%" height="16px" />
      <ReelLine width="62%" />
      <ReelLine width="48%" color="var(--accent-3)" />
    </ReelScreen>
  </CreatorFrame>
);

const ProofVisual = () => (
  <ProofDashboard>
    <PanelMeta>Portfolio signal</PanelMeta>
    <PanelTitle>Professional data work, product builds, and creator proof in one profile.</PanelTitle>
    <ProofGrid>
      <ProofCard>
        <ProofValue>01</ProofValue>
        <ProofLabel>Data job</ProofLabel>
      </ProofCard>
      <ProofCard>
        <ProofValue>02</ProofValue>
        <ProofLabel>Web craft</ProofLabel>
      </ProofCard>
      <ProofCard>
        <ProofValue>03</ProofValue>
        <ProofLabel>Creator voice</ProofLabel>
      </ProofCard>
    </ProofGrid>
    <Actions>
      <Button primary href="#contact">Start a build</Button>
      <Button href="#experience">See experience</Button>
    </Actions>
  </ProofDashboard>
);

const ScrollFilmStage = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 92, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const next = Math.min(chapters.length - 1, Math.max(0, Math.floor(latest * chapters.length)));
    setActiveIndex(next);
  });

  const worldRotateX = useTransform(smoothProgress, [0, 0.5, 1], [6, -5, 4]);
  const worldRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-9, 7, -4]);
  const auroraScale = useTransform(smoothProgress, [0, 0.42, 1], [0.95, 1.08, 0.99]);
  const auroraRotate = useTransform(smoothProgress, [0, 1], [-4, 6]);
  const scanX = useTransform(smoothProgress, [0, 1], ['-18%', '112%']);

  const identityX = useTransform(smoothProgress, [0, 0.2, 0.48, 1], [26, -24, -210, -260]);
  const identityY = useTransform(smoothProgress, [0, 0.22, 0.56, 1], [24, -18, 18, 54]);
  const identityScale = useTransform(smoothProgress, [0, 0.18, 0.43, 1], [0.94, 1.08, 0.76, 0.64]);
  const identityOpacity = useTransform(smoothProgress, [0, 0.26, 0.5], [1, 1, 0.28]);

  const pipelineX = useTransform(smoothProgress, [0, 0.17, 0.36, 0.62, 1], [330, 78, -18, -90, -240]);
  const pipelineY = useTransform(smoothProgress, [0, 0.24, 0.48, 1], [118, 22, -12, -82]);
  const pipelineScale = useTransform(smoothProgress, [0, 0.22, 0.38, 0.62, 1], [0.68, 1.04, 1.12, 0.86, 0.7]);
  const pipelineOpacity = useTransform(smoothProgress, [0, 0.12, 0.2, 0.58, 0.74], [0, 0.22, 1, 1, 0.18]);

  const webX = useTransform(smoothProgress, [0, 0.33, 0.52, 0.78, 1], [360, 250, 28, -50, -120]);
  const webY = useTransform(smoothProgress, [0, 0.38, 0.58, 1], [-130, -84, -20, -44]);
  const webScale = useTransform(smoothProgress, [0, 0.42, 0.58, 0.82, 1], [0.62, 0.8, 1.1, 0.96, 0.82]);
  const webOpacity = useTransform(smoothProgress, [0, 0.36, 0.48, 0.82, 0.94], [0, 0, 1, 1, 0.32]);

  const contentX = useTransform(smoothProgress, [0, 0.53, 0.7, 0.92, 1], [-270, -170, 66, 10, -44]);
  const contentY = useTransform(smoothProgress, [0, 0.56, 0.73, 1], [150, 118, 34, -20]);
  const contentScale = useTransform(smoothProgress, [0, 0.58, 0.72, 0.94, 1], [0.56, 0.68, 1.08, 1, 0.88]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.56, 0.68, 0.94], [0, 0, 1, 1]);

  const proofX = useTransform(smoothProgress, [0, 0.72, 0.88, 1], [260, 180, 22, -10]);
  const proofY = useTransform(smoothProgress, [0, 0.72, 0.88, 1], [160, 90, 26, -10]);
  const proofScale = useTransform(smoothProgress, [0, 0.76, 0.9, 1], [0.62, 0.76, 1.06, 1]);
  const proofOpacity = useTransform(smoothProgress, [0, 0.74, 0.84, 1], [0, 0, 1, 1]);

  const reducedCards = (
    <MobileStack style={{ display: 'grid' }}>
      <MobileRail aria-hidden="true">
        {chapters.map((chapter, index) => (
          <MobileRailDot key={chapter.id} active={activeIndex === index} />
        ))}
      </MobileRail>
      {chapters.map(chapter => (
        <MobileCard key={chapter.id}>
          <MobilePreview aria-hidden="true">
            <MobileOrb x="24px" y="28px" rotate="-10deg" />
            <MobileOrb x="144px" y="62px" rotate="9deg" />
          </MobilePreview>
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
  );

  if (reduceMotion) {
    return (
      <FilmSection id="motion" aria-label="Portfolio story">
        <Anchor id="home" />
        <Anchor id="about" style={{ top: '18%' }} />
        <StickyFrame>{reducedCards}</StickyFrame>
      </FilmSection>
    );
  }

  return (
    <FilmSection id="motion" ref={ref} aria-label="Scroll-driven portfolio story">
      <Anchor id="home" />
      <Anchor id="about" style={{ top: '18%' }} />
      <StickyFrame>
        <Inner>
          <TextStage>
            {chapters.map((chapter, index) => (
              <SceneText key={chapter.id} chapter={chapter} index={index} progress={smoothProgress} />
            ))}
          </TextStage>

          <VisualStage aria-hidden="true">
            <Aurora style={{ scale: auroraScale, rotate: auroraRotate }} />
            <World style={{ rotateX: worldRotateX, rotateY: worldRotateY }}>
              <CommandFrame>
                <GridLines />
              </CommandFrame>
              <Scan style={{ left: scanX }} />

              <ObjectLayer
                style={{
                  left: '13%',
                  top: '22%',
                  x: identityX,
                  y: identityY,
                  scale: identityScale,
                  rotateY: -16,
                  z: 120,
                  opacity: identityOpacity,
                }}
              >
                <IdentityCard>
                  <IdentityLabel>Command identity</IdentityLabel>
                  <IdentityName>
                    Saynam <span>Sharma</span>
                  </IdentityName>
                  <RoleOrbit>
                    <RoleChip>Data Engineer</RoleChip>
                    <RoleChip>Web Developer</RoleChip>
                    <RoleChip>Content Creator</RoleChip>
                  </RoleOrbit>
                </IdentityCard>
              </ObjectLayer>

              <ObjectLayer
                style={{
                  right: '7%',
                  top: '30%',
                  x: pipelineX,
                  y: pipelineY,
                  scale: pipelineScale,
                  rotateY: -10,
                  z: 80,
                  opacity: pipelineOpacity,
                }}
              >
                <PipelineVisual />
              </ObjectLayer>

              <ObjectLayer
                style={{
                  left: '41%',
                  top: '13%',
                  x: webX,
                  y: webY,
                  scale: webScale,
                  rotateX: -8,
                  rotateY: 8,
                  z: 150,
                  opacity: webOpacity,
                }}
              >
                <WebVisual />
              </ObjectLayer>

              <ObjectLayer
                style={{
                  left: '7%',
                  bottom: '10%',
                  x: contentX,
                  y: contentY,
                  scale: contentScale,
                  rotateY: 12,
                  z: 110,
                  opacity: contentOpacity,
                }}
              >
                <ContentVisual />
              </ObjectLayer>

              <ObjectLayer
                style={{
                  right: '6%',
                  bottom: '12%',
                  x: proofX,
                  y: proofY,
                  scale: proofScale,
                  rotateY: -7,
                  z: 170,
                  opacity: proofOpacity,
                }}
              >
                <ProofVisual />
              </ObjectLayer>

              <ObjectLayer
                style={{
                  left: '9%',
                  top: '10%',
                  opacity: pipelineOpacity,
                  scale: 0.86,
                  rotateZ: -3,
                  z: 40,
                }}
              >
                <Panel>
                  <PanelMeta>Data proof</PanelMeta>
                  <PanelTitle>Reliable pipelines are the professional base.</PanelTitle>
                  <PanelCopy>That is the job signal: stability, models, operations, and fast recovery.</PanelCopy>
                </Panel>
              </ObjectLayer>
            </World>
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
              initial={index === 0 ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)' } : { opacity: 0, y: 44, scale: 0.96, rotateX: 8, filter: 'blur(14px)', clipPath: 'inset(9% 0 0 0)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ duration: 0.82, delay: Math.min(index * 0.08, 0.24), ease: [0.16, 1, 0.3, 1] }}
            >
              <MobilePreview aria-hidden="true">
                <MobileOrb x="22px" y="26px" rotate="-10deg" />
                <MobileOrb x="132px" y="58px" rotate="9deg" />
                <MobileOrb x="245px" y="22px" rotate="18deg" />
              </MobilePreview>
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
