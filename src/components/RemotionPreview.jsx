import React, { memo, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Player } from '@remotion/player';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

const Shell = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 26px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 34%),
    rgba(8, 12, 18, 0.88);
  box-shadow: var(--shadow-soft);

  @media (max-width: 720px) {
    border-radius: 18px;
  }
`;

const StaticFallback = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(1rem, 4vw, 2rem);
  display: grid;
  gap: 0.7rem;
  align-content: center;
  background:
    linear-gradient(120deg, rgba(114, 246, 209, 0.14), transparent 38%),
    linear-gradient(300deg, rgba(143, 183, 255, 0.16), transparent 42%),
    rgba(9, 13, 20, 0.96);
`;

const StaticLine = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.2)'};
  width: ${props => props.width || '70%'};
`;

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

const MotionLoop = ({ variant = 'hero', accent = '#72f6d1', accentAlt = '#8fb7ff' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loop = frame % (fps * 6);
  const drift = interpolate(loop, [0, fps * 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const enter = interpolate(frame, [0, fps * 1.1], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = interpolate(loop, [0, fps * 1.5, fps * 3, fps * 4.5, fps * 6], [0.18, 0.86, 0.32, 0.76, 0.18], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const isData = variant === 'data';
  const isProduct = variant === 'product';
  const isSystems = variant === 'systems';

  const panelShift = interpolate(drift, [0, 1], [0, isSystems ? -46 : -28]);
  const ribbonWidth = interpolate(pulse, [0, 1], [26, 76]);
  const chartHeight = interpolate(pulse, [0, 1], [34, 74]);
  const scanX = interpolate(drift, [0, 1], [-18, 112]);

  const label = isData ? 'PIPELINE' : isProduct ? 'PRODUCT' : isSystems ? 'SYSTEMS' : 'COMMAND';
  const headline = isData ? 'Oracle to Snowflake' : isProduct ? 'D3xTRverse Flow' : isSystems ? 'Batch to insight' : 'Saynam OS';

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.09), transparent 34%), linear-gradient(180deg, #080c12, #101724)',
        color: '#f7f9ff',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        opacity: enter,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 28,
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: 30,
          background: 'rgba(255,255,255,0.045)',
          boxShadow: '0 38px 110px rgba(0,0,0,0.38)',
          transform: `translateY(${interpolate(enter, [0, 1], [26, 0])}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${scanX}%`,
          top: 26,
          bottom: 26,
          width: 90,
          transform: 'skewX(-12deg)',
          background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`,
          filter: 'blur(12px)',
        }}
      />
      <div style={{ position: 'absolute', inset: 54, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 24 }}>
        <div style={{ display: 'grid', alignContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 18, color: accent, fontWeight: 800 }}>{label}</div>
            <div style={{ marginTop: 12, fontSize: 58, lineHeight: 0.9, fontWeight: 900 }}>{headline}</div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[0, 1, 2].map(index => (
              <div
                key={index}
                style={{
                  height: 12,
                  width: `${interpolate((pulse + index * 0.2) % 1, [0, 1], [42, 92])}%`,
                  borderRadius: 999,
                  background: index === 1 ? accentAlt : 'rgba(255,255,255,0.22)',
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', transform: `translateY(${panelShift}px)` }}>
          {[0, 1, 2].map(index => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: index * 28,
                right: index * 12,
                top: index * 78,
                minHeight: 144,
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 24,
                padding: 22,
                background: index === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
                boxShadow: '0 22px 70px rgba(0,0,0,0.28)',
              }}
            >
              <div style={{ height: 9, width: `${ribbonWidth + index * 8}%`, borderRadius: 999, background: index === 0 ? accent : accentAlt }} />
              <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, display: 'flex', alignItems: 'end', gap: 10 }}>
                {[0, 1, 2, 3, 4].map(bar => (
                  <div
                    key={bar}
                    style={{
                      width: 18,
                      height: chartHeight + bar * 9 - index * 7,
                      borderRadius: 999,
                      background: bar % 2 ? accentAlt : accent,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const RemotionPreview = memo(({ variant = 'hero', accent = '#72f6d1', accentAlt = '#8fb7ff', ariaLabel }) => {
  const reducedMotion = useReducedMotion();
  const inputProps = useMemo(() => ({ variant, accent, accentAlt }), [variant, accent, accentAlt]);

  return (
    <Shell aria-label={ariaLabel || 'Motion graphic preview'}>
      {reducedMotion ? (
        <StaticFallback>
          <StaticLine color={accent} width="46%" />
          <StaticLine color="rgba(255,255,255,0.22)" width="84%" />
          <StaticLine color={accentAlt} width="64%" />
          <StaticLine color="rgba(255,255,255,0.16)" width="74%" />
        </StaticFallback>
      ) : (
        <Player
          component={MotionLoop}
          inputProps={inputProps}
          durationInFrames={180}
          fps={30}
          compositionWidth={960}
          compositionHeight={600}
          loop
          autoPlay
          muted
          controls={false}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </Shell>
  );
});

RemotionPreview.displayName = 'RemotionPreview';

export default RemotionPreview;
