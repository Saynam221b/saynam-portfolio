import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Player } from '@remotion/player';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

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

const StaticFallback = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(1rem, 4vw, 2rem);
  display: grid;
  gap: 0.75rem;
  align-content: center;
  background:
    radial-gradient(circle at 22% 20%, ${props => props.accent}28, transparent 36%),
    radial-gradient(circle at 84% 74%, ${props => props.accentAlt}24, transparent 42%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 36%),
    #080c12;
`;

const StaticFrame = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 24px;
  padding: clamp(1rem, 4vw, 1.4rem);
  background: rgba(255, 255, 255, 0.055);
`;

const StaticLabel = styled.p`
  color: ${props => props.accent};
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const StaticTitle = styled.p`
  max-width: 9ch;
  margin-top: 0.5rem;
  color: #f7f9ff;
  font-size: clamp(2rem, 8vw, 4.2rem);
  font-weight: 900;
  line-height: 0.86;
`;

const StaticLine = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.18)'};
  width: ${props => props.width || '70%'};
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
    headline: 'D3xTRverse Flow',
    subcopy: 'Dense SQL logic becomes an inspectable graph for faster analytics debugging.',
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
    headline: 'D3x TRverse',
    subcopy: 'Competitive play, technical depth, and creator systems held under one sharp brand.',
    sideTitle: 'Signal stack',
    bars: [88, 68, 76, 54],
    chips: ['Gaming', 'Code', 'Brand'],
  },
};

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
};

const usePlayerVisibility = () => {
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

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

const MotionLoop = ({ variant = 'hero', accent = '#72f6d1', accentAlt = '#8fb7ff' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = variantMap[variant] || variantMap.hero;
  const loopFrames = fps * 8;
  const loop = frame % loopFrames;
  const progress = loop / loopFrames;
  const enter = interpolate(frame, [0, fps * 1.15], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    ...clamp,
  });
  const scanX = interpolate(progress, [0, 1], [-22, 114], clamp);
  const panelY = interpolate(progress, [0, 0.5, 1], [0, -34, 0], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const orbit = interpolate(progress, [0, 0.5, 1], [-8, 8, -8], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const glow = interpolate(progress, [0, 0.45, 1], [0.18, 0.78, 0.18], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.09), transparent 34%), linear-gradient(180deg, #080c12, #101724)',
        color: '#f7f9ff',
        fontFamily: 'Inter, Avenir Next, sans-serif',
        overflow: 'hidden',
        opacity: enter,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(rgba(255,255,255,0.052) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 50% 48%, #000 0%, transparent 78%)',
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '9% 7%',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: 36,
          background: 'rgba(255,255,255,0.045)',
          boxShadow: '0 38px 120px rgba(0,0,0,0.38)',
          transform: `translateY(${interpolate(enter, [0, 1], [28, 0])}px) rotateX(${orbit * 0.18}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${scanX}%`,
          top: '7%',
          bottom: '7%',
          width: 118,
          transform: 'skewX(-13deg)',
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
          filter: 'blur(14px)',
          opacity: 0.78,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '7%',
          top: '12%',
          width: '41%',
          height: '74%',
          display: 'grid',
          alignContent: 'space-between',
          transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
        }}
      >
        <div>
          <div style={{ color: accent, fontSize: 18, fontWeight: 900, letterSpacing: 0, textTransform: 'uppercase' }}>
            {scene.label}
          </div>
          <div style={{ marginTop: 16, maxWidth: 430, fontSize: 64, lineHeight: 0.86, fontWeight: 900 }}>
            {scene.headline}
          </div>
          <div style={{ marginTop: 18, maxWidth: 430, color: 'rgba(247,249,255,0.72)', fontSize: 20, lineHeight: 1.45 }}>
            {scene.subcopy}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {scene.chips.map((chip, index) => (
            <div
              key={chip}
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 999,
                padding: '9px 13px',
                background: index === 0 ? `${accent}20` : 'rgba(255,255,255,0.075)',
                color: index === 0 ? accent : 'rgba(247,249,255,0.78)',
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: '7%',
          top: '12%',
          width: '42%',
          height: '74%',
          transform: `translateY(${panelY}px) rotateY(${orbit}deg) rotateX(${orbit * -0.26}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {[0, 1, 2].map(index => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: index * 34,
              right: index * 14,
              top: index * 74,
              minHeight: 152,
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 28,
              padding: 22,
              background: index === 0 ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
              backdropFilter: 'blur(18px)',
              transform: `translateZ(${(2 - index) * 26}px)`,
            }}
          >
            <div style={{ color: index === 0 ? accent : 'rgba(247,249,255,0.62)', fontSize: 15, fontWeight: 900 }}>
              {index === 0 ? scene.sideTitle : index === 1 ? 'Live graph' : 'Proof loop'}
            </div>
            <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
              {scene.bars.map((bar, barIndex) => {
                const width = interpolate((progress + barIndex * 0.11 + index * 0.06) % 1, [0, 1], [bar * 0.58, bar], {
                  easing: Easing.bezier(0.45, 0, 0.55, 1),
                });
                return (
                  <div
                    key={barIndex}
                    style={{
                      height: 12,
                      width: `${width}%`,
                      borderRadius: 999,
                      background: barIndex % 3 === 1 ? accentAlt : barIndex % 3 === 2 ? '#ffb86b' : accent,
                      opacity: 0.56 + glow * 0.34,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <svg
          viewBox="0 0 360 140"
          style={{
            position: 'absolute',
            left: 48,
            right: 20,
            bottom: 22,
            width: '76%',
            height: 120,
            overflow: 'visible',
            filter: `drop-shadow(0 0 ${14 + glow * 20}px ${accent}55)`,
          }}
        >
          <polyline
            points="0,112 48,82 92,96 146,42 196,66 248,24 316,50 360,18"
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="420"
            strokeDashoffset={interpolate(progress, [0, 1], [180, -160])}
          />
          {[0, 92, 196, 316].map((x, index) => (
            <circle key={x} cx={x} cy={[112, 96, 66, 50][index]} r="8" fill={index % 2 ? accentAlt : accent} />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const RemotionPreview = memo(({ variant = 'hero', accent = '#72f6d1', accentAlt = '#8fb7ff', ariaLabel }) => {
  const reducedMotion = useReducedMotion();
  const [shellRef, visible] = usePlayerVisibility();
  const inputProps = useMemo(() => ({ variant, accent, accentAlt }), [variant, accent, accentAlt]);
  const scene = variantMap[variant] || variantMap.hero;

  return (
    <Shell ref={shellRef} aria-label={ariaLabel || `${scene.headline} motion preview`}>
      {reducedMotion || !visible ? (
        <StaticFallback accent={accent} accentAlt={accentAlt}>
          <StaticFrame>
            <StaticLabel accent={accent}>{scene.label}</StaticLabel>
            <StaticTitle>{scene.headline}</StaticTitle>
          </StaticFrame>
          <StaticLine color={accent} width="46%" />
          <StaticLine color="rgba(255,255,255,0.22)" width="84%" />
          <StaticLine color={accentAlt} width="64%" />
          <StaticLine color="rgba(255,255,255,0.16)" width="74%" />
        </StaticFallback>
      ) : (
        <Player
          component={MotionLoop}
          inputProps={inputProps}
          durationInFrames={240}
          fps={30}
          compositionWidth={1280}
          compositionHeight={800}
          loop
          autoPlay
          muted
          controls={false}
          acknowledgeRemotionLicense
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </Shell>
  );
});

RemotionPreview.displayName = 'RemotionPreview';

export default RemotionPreview;
