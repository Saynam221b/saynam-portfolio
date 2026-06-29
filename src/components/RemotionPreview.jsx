import React, { memo, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/**
 * Lightweight CSS-animated preview that replaces the heavy Remotion player (~280KB saved).
 * Uses pure CSS animations + minimal JS for intersection-based lazy activation.
 */

const sweep = keyframes`
  0% { transform: translateX(-30%); }
  100% { transform: translateX(130%); }
`;

const float1 = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const float2 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-1deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.85; }
`;

const barGrow = keyframes`
  0% { width: 40%; }
  50% { width: 92%; }
  100% { width: 40%; }
`;

const Shell = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    radial-gradient(circle at 18% 16%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 34%),
    rgba(8, 12, 18, 0.9);
  box-shadow: var(--shadow-soft);
  isolation: isolate;

  @media (max-width: 720px) {
    border-radius: 22px;
  }
`;

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.052) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 50% 48%, #000 0%, transparent 78%);
  opacity: 0.72;
`;

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  top: 7%;
  bottom: 7%;
  width: 118px;
  transform: skewX(-13deg);
  background: linear-gradient(90deg, transparent, ${props => props.accent}55, transparent);
  filter: blur(14px);
  opacity: 0.78;
  animation: ${sweep} 4s ease-in-out infinite;
`;

const ContentFrame = styled.div`
  position: absolute;
  inset: 9% 7%;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.045);
  box-shadow: 0 38px 120px rgba(0, 0, 0, 0.38);
`;

const LeftPanel = styled.div`
  position: absolute;
  left: 7%;
  top: 12%;
  width: 41%;
  height: 74%;
  display: grid;
  align-content: space-between;
  color: #f7f9ff;
`;

const Label = styled.div`
  color: ${props => props.accent};
  font-size: clamp(0.6rem, 1.4vw, 1.1rem);
  font-weight: 900;
  text-transform: uppercase;
`;

const Headline = styled.div`
  margin-top: clamp(0.5rem, 1.2vw, 1rem);
  max-width: 430px;
  font-size: clamp(1.4rem, 5vw, 4rem);
  line-height: 0.86;
  font-weight: 900;
  color: #f7f9ff;
`;

const Subcopy = styled.div`
  margin-top: clamp(0.5rem, 1.2vw, 1.1rem);
  max-width: 430px;
  color: rgba(247, 249, 255, 0.72);
  font-size: clamp(0.6rem, 1.6vw, 1.25rem);
  line-height: 1.45;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 0.8vw, 10px);
`;

const Chip = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: clamp(4px, 0.7vw, 9px) clamp(6px, 1vw, 13px);
  background: ${props => props.$first ? `${props.accent}20` : 'rgba(255, 255, 255, 0.075)'};
  color: ${props => props.$first ? props.accent : 'rgba(247, 249, 255, 0.78)'};
  font-size: clamp(0.5rem, 1.2vw, 0.94rem);
  font-weight: 800;
`;

const RightPanel = styled.div`
  position: absolute;
  right: 7%;
  top: 12%;
  width: 42%;
  height: 74%;
  transform-style: preserve-3d;
`;

const FloatingCard = styled.div`
  position: absolute;
  left: ${props => props.$index * 34}px;
  right: ${props => props.$index * 14}px;
  top: ${props => props.$index * 74}px;
  min-height: 100px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: clamp(16px, 2.2vw, 28px);
  padding: clamp(0.6rem, 1.6vw, 1.4rem);
  background: ${props => props.$index === 0 ? 'rgba(255, 255, 255, 0.13)' : 'rgba(255, 255, 255, 0.07)'};
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
  transform: translateZ(${props => (2 - props.$index) * 26}px);
  animation: ${props => props.$index === 0 ? float1 : float2} ${props => 3.5 + props.$index * 0.8}s ease-in-out infinite;
  animation-delay: ${props => props.$index * 0.3}s;
  color: #f7f9ff;

  @media (max-width: 720px) {
    left: ${props => props.$index * 18}px;
    right: ${props => props.$index * 8}px;
    top: ${props => props.$index * 50}px;
    min-height: 70px;
  }
`;

const CardLabel = styled.div`
  color: ${props => props.$highlight ? props.accent : 'rgba(247, 249, 255, 0.62)'};
  font-size: clamp(0.5rem, 1.2vw, 0.94rem);
  font-weight: 900;
`;

const BarContainer = styled.div`
  display: grid;
  gap: clamp(4px, 0.8vw, 10px);
  margin-top: clamp(0.5rem, 1.4vw, 1.1rem);
`;

const AnimatedBar = styled.div`
  height: clamp(6px, 1vw, 12px);
  border-radius: 999px;
  background: ${props => props.color};
  opacity: 0.7;
  animation: ${pulse} ${props => 2 + props.$offset * 0.5}s ease-in-out infinite;
  animation-delay: ${props => props.$offset * 0.2}s;
  width: ${props => props.width};
`;

const GraphLine = styled.svg`
  position: absolute;
  left: 48px;
  right: 20px;
  bottom: 22px;
  width: 76%;
  height: clamp(60px, 10vw, 120px);
  overflow: visible;
  filter: drop-shadow(0 0 18px ${props => props.accent}55);
`;

const variantMap = {
  hero: {
    label: 'Command OS',
    headline: 'Saynam OS',
    subcopy: 'Data systems, product craft, and delivery motion in one operating layer.',
    sideTitle: 'Portfolio signal',
    bars: [86, 62, 74, 50],
    chips: ['Data', 'Product', 'Motion'],
  },
  data: {
    label: 'Pipeline layer',
    headline: 'Oracle to Snowflake',
    subcopy: 'Loads, checks, and transformations move as one observable system.',
    sideTitle: 'Rerun-safe flow',
    bars: [92, 74, 58, 80],
    chips: ['Snowflake', 'dbt', 'Recovery'],
  },
  product: {
    label: 'Product layer',
    headline: 'DexFlow',
    subcopy: 'Dense SQL logic becomes an inspectable lineage graph for faster analytics debugging.',
    sideTitle: 'Graph UX',
    bars: [66, 88, 46, 72],
    chips: ['AST', 'DAG', 'UX'],
  },
  systems: {
    label: 'Runtime layer',
    headline: 'Batch to insight',
    subcopy: 'Partitioning, Delta strategy, and exception paths tuned for calm operations.',
    sideTitle: '45-60% faster',
    bars: [52, 78, 64, 92],
    chips: ['PySpark', 'Delta', 'MWAA'],
  },
  delivery: {
    label: 'Delivery layer',
    headline: 'Clean handoff',
    subcopy: 'Architecture, UI, and implementation stay connected through the finish.',
    sideTitle: 'Ready to act',
    bars: [72, 58, 90, 66],
    chips: ['Scope', 'Build', 'Ship'],
  },
  d3x: {
    label: 'Creator OS',
    headline: 'D3xTRverse',
    subcopy: 'Competitive play, technical depth, and creator systems at d3xtrverse.com.',
    sideTitle: 'Signal stack',
    bars: [88, 68, 76, 54],
    chips: ['Gaming', 'Code', 'Brand'],
  },
};

const useVisibility = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '220px 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return [ref, visible];
};

const barColors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent)'];
const cardLabels = ['Portfolio signal', 'Live graph', 'Proof loop'];

const RemotionPreview = memo(({ variant = 'hero', accent = '#72f6d1', accentAlt = '#8fb7ff', ariaLabel }) => {
  const [shellRef, visible] = useVisibility();
  const scene = variantMap[variant] || variantMap.hero;
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Shell ref={shellRef} role="img" aria-label={ariaLabel || `${scene.headline} motion preview`}>
      {visible && (
        <>
          <GridBg />
          {!reducedMotion && <ScanLine accent={accent} />}
          <ContentFrame />

          <LeftPanel>
            <div>
              <Label accent={accent}>{scene.label}</Label>
              <Headline>{scene.headline}</Headline>
              <Subcopy>{scene.subcopy}</Subcopy>
            </div>
            <Chips>
              {scene.chips.map((chip, i) => (
                <Chip key={chip} $first={i === 0} accent={accent}>{chip}</Chip>
              ))}
            </Chips>
          </LeftPanel>

          <RightPanel>
            {[0, 1, 2].map(index => (
              <FloatingCard key={index} $index={index} style={reducedMotion ? { animation: 'none' } : undefined}>
                <CardLabel $highlight={index === 0} accent={accent}>
                  {index === 0 ? scene.sideTitle : cardLabels[index]}
                </CardLabel>
                <BarContainer>
                  {scene.bars.map((bar, barIndex) => (
                    <AnimatedBar
                      key={barIndex}
                      color={barColors[barIndex % barColors.length]}
                      width={`${bar}%`}
                      $offset={barIndex + index}
                      style={reducedMotion ? { animation: 'none' } : undefined}
                    />
                  ))}
                </BarContainer>
              </FloatingCard>
            ))}

            <GraphLine accent={accent} viewBox="0 0 360 140">
              <polyline
                points="0,112 48,82 92,96 146,42 196,66 248,24 316,50 360,18"
                fill="none"
                stroke={accent}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
              {[0, 92, 196, 316].map((x, i) => (
                <circle key={x} cx={x} cy={[112, 96, 66, 50][i]} r="8" fill={i % 2 ? accentAlt : accent} opacity="0.8" />
              ))}
            </GraphLine>
          </RightPanel>
        </>
      )}
    </Shell>
  );
});

RemotionPreview.displayName = 'RemotionPreview';

export default RemotionPreview;
