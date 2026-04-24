import React from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import RemotionPreview from './RemotionPreview';

const StackShell = styled(motion.div)`
  position: relative;
  min-height: 620px;
  display: grid;
  align-items: center;

  @media (max-width: 820px) {
    min-height: auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Metrics = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Metric = styled(motion.article)`
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: var(--surface);
  padding: 1rem;
  box-shadow: var(--shadow-soft);
`;

const MetricValue = styled.p`
  color: var(--text);
  font-size: clamp(1.8rem, 5vw, 3.6rem);
  font-weight: 900;
  line-height: 0.95;
`;

const MetricLabel = styled.p`
  margin-top: 0.4rem;
  color: var(--text-subtle);
  font-size: 0.86rem;
  line-height: 1.55;
`;

const Stage = styled(motion.div)`
  position: relative;
  perspective: 1200px;
`;

const FloatCard = styled(motion.div)`
  position: absolute;
  z-index: 3;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(12, 17, 25, 0.76);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-soft);
  padding: 0.9rem;
  color: var(--text);

  @media (max-width: 760px) {
    position: relative;
    inset: auto !important;
    margin-top: 0.7rem;
  }
`;

const MiniTitle = styled.p`
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const MiniCopy = styled.p`
  margin-top: 0.35rem;
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.5;
`;

const metrics = [
  { value: '45-60%', label: 'runtime reduction through partition tuning and shuffle strategy' },
  { value: '0->1', label: 'product surfaces shipped from architecture to interaction detail' },
  { value: 'rerun-safe', label: 'pipeline behavior designed for recovery, not manual heroics' },
];

const InterfaceStack = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0.12, 0.42], [7, -3]);
  const y = useTransform(scrollYProgress, [0.12, 0.42], [32, -20]);

  return (
    <StackShell>
      <Grid>
        <Metrics>
          {metrics.map((metric, index) => (
            <Metric
              key={metric.value}
              initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.64, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <MetricValue>{metric.value}</MetricValue>
              <MetricLabel>{metric.label}</MetricLabel>
            </Metric>
          ))}
        </Metrics>

        <Stage style={{ y, rotateX: rotate }}>
          <RemotionPreview variant="hero" ariaLabel="Animated command center preview" />
          <FloatCard style={{ top: '8%', right: '-4%' }}>
            <MiniTitle>Decision Layer</MiniTitle>
            <MiniCopy>Clean interfaces over complex data movement.</MiniCopy>
          </FloatCard>
          <FloatCard style={{ left: '-5%', bottom: '10%' }}>
            <MiniTitle>Execution Layer</MiniTitle>
            <MiniCopy>ETL, product UI, and deployment quality moving together.</MiniCopy>
          </FloatCard>
        </Stage>
      </Grid>
    </StackShell>
  );
};

export default InterfaceStack;
