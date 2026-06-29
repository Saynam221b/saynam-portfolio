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
import DataCommandCanvas from './DataCommandCanvas';

const storyChapters = [
  {
    id: 'identity',
    eyebrow: 'Identity layer',
    title: 'Saynam Sharma',
    copy: 'A data engineer, web builder, and creator working from one command system: calm infrastructure, sharp interfaces, visible proof.',
    proof: ['Data Engineer', 'Web Developer', 'Creator'],
    visualState: 'identity',
    cta: [
      { label: 'Watch the work', href: '#projects', primary: true },
      { label: 'Start a build', href: '#contact' },
    ],
  },
  {
    id: 'data',
    eyebrow: 'Data systems',
    title: 'Pipelines that stay calm under pressure.',
    copy: 'Oracle, Snowflake, dbt, Airflow, and PySpark are framed as a reliable operating layer: rerun-safe, observable, and ready for recovery.',
    proof: ['Oracle Fusion', 'Snowflake', 'dbt checks'],
    visualState: 'pipeline',
  },
  {
    id: 'product',
    eyebrow: 'Product interfaces',
    title: 'Complex logic becomes visible product flow.',
    copy: 'SQL lineage, DAGs, dashboards, and debugging surfaces turn dense backend behavior into interfaces people can inspect and trust.',
    proof: ['D3xTRverse Flow', 'React UI', 'Lineage graphs'],
    visualState: 'interface',
  },
  {
    id: 'creator',
    eyebrow: 'Creator signal',
    title: 'Technical work becomes a story people can follow.',
    copy: 'Build notes, explainers, portfolio proof, and creator systems make the engineering signal visible beyond the codebase.',
    proof: ['Explainers', 'Build logs', 'Brand system'],
    visualState: 'creator',
  },
  {
    id: 'proof',
    eyebrow: 'Proof layer',
    title: 'One profile. Three signals. A clear next step.',
    copy: 'The film resolves into practical proof: production data ownership, product craft, and a direct path to start the next serious build.',
    proof: ['Experience', 'Selected work', 'Contact path'],
    visualState: 'proof',
    cta: [
      { label: 'Start a build', href: '#contact', primary: true },
      { label: 'See experience', href: '#experience' },
    ],
  },
];

const chapterWindows = [
  { start: 0, end: 0.2 },
  { start: 0.18, end: 0.4 },
  { start: 0.38, end: 0.62 },
  { start: 0.6, end: 0.82 },
  { start: 0.8, end: 1 },
];

const FilmSection = styled.section`
  position: relative;
  min-height: ${props => (props.$reduced ? 'auto' : '430vh')};
  overflow: visible;
  scroll-margin-top: 100px;

  @media (max-width: 900px) {
    min-height: auto;
    overflow: hidden;
    scroll-margin-top: 88px;
  }
`;

const Anchor = styled.span`
  position: absolute;
  top: -92px;
  width: 1px;
  height: 1px;
`;

const StickyFrame = styled.div`
  position: ${props => (props.$reduced ? 'relative' : 'sticky')};
  top: 0;
  min-height: 100svh;
  padding: clamp(5.6rem, 8vw, 7.1rem) 1.25rem clamp(2.8rem, 6vw, 4.4rem);
  display: grid;
  align-items: center;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 28%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 30%),
      radial-gradient(circle at 84% 24%, color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 34%),
      linear-gradient(180deg, transparent, color-mix(in srgb, var(--bg) 74%, transparent) 88%);
    pointer-events: none;
  }

  @media (max-width: 900px) {
    position: relative;
    min-height: auto;
    padding: 0.9rem 1rem 3.2rem;
    align-items: start;
  }
`;

const DesktopStage = styled.div`
  position: relative;
  z-index: 1;
  width: min(1280px, 100%);
  min-height: min(74vw, 760px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(470px, 1.18fr);
  gap: clamp(1.4rem, 4vw, 4.2rem);
  align-items: center;

  @media (max-width: 1080px) {
    grid-template-columns: minmax(0, 0.9fr) minmax(380px, 1.1fr);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const CopyStage = styled.div`
  position: relative;
  min-height: 590px;
  z-index: 2;
`;

const SceneCopy = styled(motion.article)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
`;

const Kicker = styled.p`
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 950;
  margin-bottom: 0.82rem;
  text-transform: uppercase;
`;

const ChapterTitle = styled.h1`
  max-width: 11ch;
  color: var(--text);
  font-size: clamp(3rem, 6.6vw, 7rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.88;
`;

const Copy = styled.p`
  max-width: 62ch;
  margin-top: 1.1rem;
  color: var(--text-muted);
  font-size: clamp(1rem, 1.55vw, 1.14rem);
  line-height: 1.72;

  @media (max-width: 560px) {
    font-size: 0.96rem;
    line-height: 1.62;
  }
`;

const ProofStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
  margin-top: 1.18rem;

  @media (max-width: 560px) {
    gap: 0.4rem;
    margin-top: 0.92rem;
  }
`;

const Proof = styled.span`
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-strong) 66%, transparent);
  color: var(--text-muted);
  padding: 0.42rem 0.68rem;
  font-size: 0.8rem;
  font-weight: 850;

  @media (max-width: 560px) {
    padding: 0.36rem 0.58rem;
    font-size: 0.76rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.32rem;
  pointer-events: auto;

  @media (max-width: 560px) {
    gap: 0.52rem;
    margin-top: 1rem;
  }
`;

const Button = styled.a`
  min-height: 48px;
  border: 1px solid ${props => (props.$primary ? 'transparent' : 'var(--line)')};
  border-radius: 999px;
  background: ${props => (props.$primary ? 'var(--accent)' : 'color-mix(in srgb, var(--surface-strong) 74%, transparent)')};
  color: ${props => (props.$primary ? 'var(--button-text)' : 'var(--text)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.06rem;
  font-size: 0.84rem;
  font-weight: 950;
  transition: transform 0.22s var(--ease-out), border-color 0.22s var(--ease-out), background 0.22s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: var(--accent);
  }

  @media (max-width: 560px) {
    min-height: 46px;
    padding: 0 0.9rem;
    font-size: 0.8rem;
  }
`;

const VisualStage = styled.div`
  position: relative;
  min-height: min(64vw, 720px);
  border-radius: 0;
  background:
    radial-gradient(ellipse at 24% 18%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 46%),
    radial-gradient(ellipse at 82% 72%, color-mix(in srgb, var(--accent-3) 18%, transparent), transparent 48%),
    radial-gradient(ellipse at 52% 46%, color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 54%),
    linear-gradient(115deg, color-mix(in srgb, var(--bg) 8%, transparent) 0%, rgba(255,255,255,0.045) 42%, color-mix(in srgb, var(--bg) 18%, transparent) 100%);
  overflow: hidden;
  transform-style: preserve-3d;
  mask-image: linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 3% -8% 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.052) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.034) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at 52% 48%, #000 0%, transparent 72%);
    opacity: 0.48;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -1px -10%;
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--bg) 70%, transparent), transparent 24%, transparent 74%, color-mix(in srgb, var(--bg) 66%, transparent)),
      linear-gradient(180deg, color-mix(in srgb, var(--bg) 22%, transparent), transparent 42%, color-mix(in srgb, var(--bg) 60%, transparent));
    pointer-events: none;
  }
`;

const HudPanel = styled(motion.div)`
  position: absolute;
  left: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: 3;
  width: min(410px, 58%);
  padding-left: 1rem;
  border-left: 2px solid var(--accent);
  text-shadow: 0 18px 46px rgba(0, 0, 0, 0.55);
`;

const HudLabel = styled.p`
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 950;
  text-transform: uppercase;
`;

const HudTitle = styled.p`
  margin-top: 0.42rem;
  color: var(--text);
  font-size: clamp(1.05rem, 2vw, 1.42rem);
  font-weight: 950;
  line-height: 1.12;
`;

const SignalStack = styled.div`
  display: grid;
  gap: 0.42rem;
  margin-top: 0.78rem;
`;

const SignalBar = styled.span`
  height: 5px;
  width: ${props => props.$width};
  border-radius: 999px;
  background: ${props => props.$color};
  opacity: 0.78;
`;

const ChapterRail = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  z-index: 4;
  display: grid;
  gap: 0.48rem;
  transform: translateY(-50%);

  @media (max-width: 900px) {
    display: none;
  }
`;

const RailDot = styled.span`
  width: 10px;
  height: ${props => (props.$active ? '36px' : '10px')};
  border: 1px solid ${props => (props.$active ? 'var(--accent)' : 'var(--line)')};
  border-radius: 999px;
  background: ${props => (props.$active ? 'var(--accent)' : 'var(--surface-soft)')};
  transition: height 0.24s var(--ease-out), background 0.24s var(--ease-out), border-color 0.24s var(--ease-out);
`;

const MobileStack = styled.div`
  display: none;

  @media (max-width: 900px) {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.78rem;
    width: min(100%, 680px);
    margin: 0 auto;
  }
`;

const MobileRail = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.45rem;
  padding: 0 0.12rem;
`;

const MobileRailDot = styled.span`
  height: 4px;
  border-radius: 999px;
  background: ${props => (props.$active ? 'var(--accent)' : 'var(--line-soft)')};
  box-shadow: ${props => (props.$active ? '0 0 22px color-mix(in srgb, var(--accent) 44%, transparent)' : 'none')};
`;

const MobileCard = styled(motion.article)`
  border-top: 1px solid var(--line-soft);
  border-radius: 0;
  background:
    radial-gradient(circle at 22% 14%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 36%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-soft) 30%, transparent), transparent 70%);
  overflow: visible;
  padding: clamp(0.9rem, 3.5vw, 1.25rem) 0 1.25rem;
  scroll-margin-top: 92px;
`;

const MobileVisualFrame = styled.div`
  position: relative;
  min-height: clamp(158px, 48vw, 300px);
  margin-bottom: 0.86rem;
  border: 0;
  border-radius: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    radial-gradient(circle at 32% 24%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 38%),
    rgba(255, 255, 255, 0.045);
  background-size: 38px 38px, 38px 38px, auto, auto;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
`;

const MobileSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  path {
    fill: none;
    stroke-linecap: round;
  }

  text {
    font-family: var(--font-sans);
    font-weight: 900;
    fill: var(--text);
    letter-spacing: 0;
  }
`;

const MobileTitle = styled.h2`
  max-width: 12ch;
  color: var(--text);
  font-size: clamp(1.85rem, 9vw, 3.2rem);
  font-weight: 950;
  line-height: 1;
`;

const MobileVisual = ({ state }) => {
  const title = {
    identity: 'Saynam OS',
    pipeline: 'ETL Flow',
    interface: 'Lineage UI',
    creator: 'Signal Loop',
    proof: 'Proof Grid',
  }[state];

  return (
    <MobileVisualFrame aria-hidden="true">
      <MobileSvg viewBox="0 0 420 260">
        <path d="M46 136 C106 72 166 76 214 132 C270 198 330 184 378 88" stroke="var(--accent)" strokeWidth="4" />
        <path d="M72 190 C140 150 222 158 300 214 C336 238 366 224 392 198" stroke="var(--accent-2)" strokeWidth="2.5" opacity="0.74" />
        <path d="M120 72 C182 118 238 106 292 62 C324 36 360 42 386 70" stroke="var(--accent-3)" strokeWidth="2.5" opacity={state === 'creator' ? 0.92 : 0.58} />
        {[
          [58, 136, '01'],
          [214, 132, '02'],
          [378, 88, '03'],
          [300, 214, '04'],
        ].map(([x, y, label], index) => (
          <g key={label}>
            <circle cx={x} cy={y} r={state === 'proof' && index === 3 ? 35 : 29} fill="color-mix(in srgb, var(--surface-strong) 88%, transparent)" stroke={index % 2 ? 'var(--accent-2)' : 'var(--accent)'} />
            <circle cx={x} cy={y} r="44" fill="none" stroke={index % 2 ? 'var(--accent-2)' : 'var(--accent)'} opacity="0.18" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="14">{label}</text>
          </g>
        ))}
        <text x="28" y="40" fontSize="18">{title}</text>
        <text x="28" y="62" fontSize="10" fill="var(--text-subtle)">DATA COMMAND FILM</text>
      </MobileSvg>
    </MobileVisualFrame>
  );
};

const SceneText = ({ chapter, index, progress }) => {
  const { start, end } = chapterWindows[index];
  const opacity = useTransform(progress, [start, start + 0.055, end - 0.055, end], index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.14, end], index === 0 ? [0, 0, -28] : [42, 0, -28]);
  const scale = useTransform(progress, [start, start + 0.14, end], index === 0 ? [1, 1, 0.98] : [0.97, 1, 0.985]);

  return (
    <SceneCopy style={{ opacity, y, scale }}>
      <Kicker>{chapter.eyebrow}</Kicker>
      <ChapterTitle as={index === 0 ? 'h1' : 'h2'}>{chapter.title}</ChapterTitle>
      <Copy>{chapter.copy}</Copy>
      <ProofStrip>
        {chapter.proof.map(item => (
          <Proof key={item}>{item}</Proof>
        ))}
      </ProofStrip>
      {chapter.cta && (
        <Actions>
          {chapter.cta.map(action => (
            <Button key={action.href} href={action.href} $primary={action.primary}>
              {action.label}
            </Button>
          ))}
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 96, damping: 32, restDelta: 0.001 });
  const glassY = useTransform(smoothProgress, [0, 0.5, 1], ['2%', '-4%', '2%']);
  const hudOpacity = useTransform(smoothProgress, [0, 0.08, 0.9, 1], [0, 1, 1, 0.82]);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const next = Math.min(storyChapters.length - 1, Math.max(0, Math.floor(latest * storyChapters.length)));
    setActiveIndex(next);
  });

  return (
    <FilmSection id="motion" ref={ref} aria-label="Scroll-driven portfolio story" $reduced={reduceMotion}>
      <Anchor id="home" />
      <StickyFrame $reduced={reduceMotion}>
        <DesktopStage>
          <CopyStage>
            {storyChapters.map((chapter, index) => (
              <SceneText key={chapter.id} chapter={chapter} index={index} progress={smoothProgress} />
            ))}
          </CopyStage>

          <VisualStage>
            <DataCommandCanvas progress={smoothProgress} activeIndex={activeIndex} reducedMotion={reduceMotion} />
            <HudPanel style={{ opacity: hudOpacity, y: glassY }}>
              <HudLabel>{storyChapters[activeIndex].eyebrow}</HudLabel>
              <HudTitle>{storyChapters[activeIndex].title}</HudTitle>
              <SignalStack aria-hidden="true">
                <SignalBar $width="82%" $color="var(--accent)" />
                <SignalBar $width={activeIndex > 1 ? '72%' : '48%'} $color="var(--accent-2)" />
                <SignalBar $width={activeIndex > 2 ? '64%' : '34%'} $color="var(--accent-3)" />
              </SignalStack>
            </HudPanel>
          </VisualStage>
        </DesktopStage>

        <MobileStack>
          <MobileRail aria-hidden="true">
            {storyChapters.map((chapter, index) => (
              <MobileRailDot key={chapter.id} $active={activeIndex === index} />
            ))}
          </MobileRail>
          {storyChapters.map((chapter, index) => (
            <MobileCard
              key={chapter.id}
              initial={{ opacity: 0, y: 34, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.62, delay: Math.min(index * 0.06, 0.18), ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileVisual state={chapter.visualState} />
              <Kicker>{chapter.eyebrow}</Kicker>
              <MobileTitle>{chapter.title}</MobileTitle>
              <Copy>{chapter.copy}</Copy>
              <ProofStrip>
                {chapter.proof.map(item => (
                  <Proof key={item}>{item}</Proof>
                ))}
              </ProofStrip>
              {chapter.cta && (
                <Actions>
                  {chapter.cta.map(action => (
                    <Button key={action.href} href={action.href} $primary={action.primary}>
                      {action.label}
                    </Button>
                  ))}
                </Actions>
              )}
            </MobileCard>
          ))}
        </MobileStack>

        <ChapterRail aria-hidden="true">
          {storyChapters.map((chapter, index) => (
            <RailDot key={chapter.id} $active={activeIndex === index} />
          ))}
        </ChapterRail>
      </StickyFrame>
    </FilmSection>
  );
};

export default ScrollFilmStage;
