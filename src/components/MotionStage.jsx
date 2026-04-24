import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import RemotionPreview from './RemotionPreview';

const StageSection = styled.section`
  position: relative;
  padding: clamp(5rem, 9vw, 8rem) 1.25rem;
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 820px;
  margin-bottom: clamp(1.4rem, 3vw, 2.2rem);
`;

const Kicker = styled.p`
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.7rem;
`;

const Title = styled.h2`
  font-size: clamp(2.15rem, 6vw, 5.2rem);
  font-weight: 900;
  max-width: 11ch;
`;

const Rail = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const Scene = styled.article`
  min-height: 560px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1rem;
  border: 1px solid var(--line);
  border-radius: 26px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  padding: 1rem;

  @media (max-width: 1120px) {
    min-height: auto;
    grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
    grid-template-rows: auto;
    align-items: stretch;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem;
`;

const SceneNumber = styled.p`
  color: var(--text-subtle);
  font-size: 0.84rem;
  font-weight: 800;
`;

const SceneTitle = styled.h3`
  font-size: clamp(1.55rem, 3vw, 2.6rem);
  font-weight: 900;
`;

const SceneBody = styled.p`
  color: var(--text-muted);
  font-size: 0.94rem;
  line-height: 1.68;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
`;

const Tag = styled.span`
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  color: var(--text-muted);
  background: var(--surface-soft);
  padding: 0.34rem 0.62rem;
  font-size: 0.78rem;
`;

const scenes = [
  {
    number: '01',
    title: 'Ingest without fragility',
    body: 'Oracle Fusion data lands with idempotent loads, structured recovery paths, and downstream models that do not collapse during reruns.',
    tags: ['MWAA', 'Python', 'Snowflake', 'dbt'],
    variant: 'data',
    accent: '#72f6d1',
    accentAlt: '#8fb7ff',
  },
  {
    number: '02',
    title: 'Tune the heavy work',
    body: 'Lakehouse pipelines become faster through partition strategy, Delta merge discipline, and query patterns that respect the runtime.',
    tags: ['PySpark', 'Databricks', 'Delta', 'SQL'],
    variant: 'systems',
    accent: '#ffb86b',
    accentAlt: '#72f6d1',
  },
  {
    number: '03',
    title: 'Productize the insight',
    body: 'Complex system behavior gets translated into clean interfaces, clear states, and product surfaces teams can actually operate.',
    tags: ['React', 'Next.js', 'UX systems', 'LLM tools'],
    variant: 'product',
    accent: '#8fb7ff',
    accentAlt: '#ff6f91',
  },
];

const MotionStage = () => {
  return (
    <StageSection id="motion">
      <Inner>
        <Header>
          <Kicker>Systems in motion</Kicker>
          <Title>Three operating modes, no broken scroll.</Title>
        </Header>
        <Rail>
          {scenes.map((scene, index) => (
            <Scene
              key={scene.title}
              as={motion.article}
              initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Copy>
                <div>
                  <SceneNumber>{scene.number}</SceneNumber>
                  <SceneTitle>{scene.title}</SceneTitle>
                </div>
                <SceneBody>{scene.body}</SceneBody>
                <Tags>
                  {scene.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </Copy>
              <RemotionPreview variant={scene.variant} accent={scene.accent} accentAlt={scene.accentAlt} ariaLabel={`${scene.title} motion preview`} />
            </Scene>
          ))}
        </Rail>
      </Inner>
    </StageSection>
  );
};

export default MotionStage;
