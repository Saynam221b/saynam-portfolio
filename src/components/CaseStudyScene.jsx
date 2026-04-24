import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import RemotionPreview from './RemotionPreview';

const Grid = styled.div`
  display: grid;
  gap: 1rem;
`;

const Case = styled(motion.article)`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(1rem, 3vw, 1.6rem);
  align-items: center;
  padding: clamp(1rem, 3vw, 1.35rem) 0;
  border-top: 1px solid var(--line-soft);

  &:last-of-type {
    border-bottom: 1px solid var(--line-soft);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Meta = styled.p`
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.55rem;
`;

const Title = styled.h3`
  font-size: clamp(1.8rem, 5vw, 4.2rem);
  font-weight: 900;
  max-width: 9ch;
`;

const Body = styled.p`
  max-width: 58ch;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.72;
  margin-top: 0.9rem;
`;

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
  margin-top: 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Proof = styled.div`
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  background: var(--surface-soft);
  padding: 0.78rem;
`;

const ProofLabel = styled.p`
  color: var(--text-subtle);
  font-size: 0.76rem;
  margin-bottom: 0.22rem;
`;

const ProofText = styled.p`
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.42;
  font-weight: 700;
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
`;

const Link = styled.a`
  min-height: 42px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: ${props => (props.primary ? 'var(--accent)' : 'var(--surface-soft)')};
  color: ${props => (props.primary ? 'var(--button-text)' : 'var(--text)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.95rem;
  font-size: 0.84rem;
  font-weight: 800;
`;

const cases = [
  {
    type: 'Data platform',
    title: 'Oracle Fusion to Snowflake',
    body: 'A production ingestion and transformation platform built for stable reporting, deterministic reruns, and cleaner diagnostics.',
    variant: 'data',
    accent: '#72f6d1',
    accentAlt: '#8fb7ff',
    proof: [
      ['Operating result', 'Rerun-safe incremental loads'],
      ['System quality', 'dbt checks and structured logging'],
    ],
  },
  {
    type: 'Product tool',
    title: 'D3xTRverse Flow',
    body: 'A SQL lineage visualizer that turns dense transformations into inspectable DAGs for faster analytics debugging.',
    variant: 'product',
    accent: '#8fb7ff',
    accentAlt: '#ff6f91',
    proof: [
      ['User value', 'Dependencies become visible'],
      ['Product signal', 'AST parsing plus usable graph UX'],
    ],
    links: [
      { label: 'Launch app', href: 'https://dex-floww.vercel.app/', primary: true },
      { label: 'GitHub', href: 'https://github.com/Saynam221b' },
    ],
  },
  {
    type: 'Lakehouse systems',
    title: 'Databricks runtime work',
    body: 'PySpark pipelines tuned around partitioning, Delta merge strategy, and exception paths that preserve operational confidence.',
    variant: 'systems',
    accent: '#ffb86b',
    accentAlt: '#72f6d1',
    proof: [
      ['Performance', '45-60% faster batch runs'],
      ['Reliability', 'Fewer recurring failure loops'],
    ],
  },
];

const CaseStudyScene = () => {
  return (
    <Grid>
      {cases.map((item, index) => (
        <Case
          key={item.title}
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.72, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <Meta>{item.type}</Meta>
            <Title>{item.title}</Title>
            <Body>{item.body}</Body>
            <ProofGrid>
              {item.proof.map(([label, text]) => (
                <Proof key={label}>
                  <ProofLabel>{label}</ProofLabel>
                  <ProofText>{text}</ProofText>
                </Proof>
              ))}
            </ProofGrid>
            {item.links && (
              <LinkRow>
                {item.links.map(link => (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" primary={link.primary}>
                    {link.label}
                  </Link>
                ))}
              </LinkRow>
            )}
          </div>
          <RemotionPreview variant={item.variant} accent={item.accent} accentAlt={item.accentAlt} ariaLabel={`${item.title} animated project preview`} />
        </Case>
      ))}
    </Grid>
  );
};

export default CaseStudyScene;
