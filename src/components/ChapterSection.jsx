import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Section = styled.section`
  position: relative;
  padding: clamp(5rem, 10vw, 9rem) 1.25rem;
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  max-width: ${props => (props.compact ? '740px' : '980px')};
  margin-bottom: clamp(1.8rem, 4vw, 3rem);
`;

const Kicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.8rem;

  &::before {
    content: '';
    width: 34px;
    height: 1px;
    background: currentColor;
    opacity: 0.86;
  }
`;

const Title = styled.h2`
  max-width: 980px;
  font-size: clamp(2.4rem, 7vw, 6.8rem);
  font-weight: 900;
  line-height: 0.92;
  margin-bottom: 1rem;

  span {
    font-family: var(--font-display);
    font-weight: 650;
    color: var(--accent-3);
  }
`;

const Copy = styled.p`
  max-width: 68ch;
  color: var(--text-muted);
  font-size: clamp(1rem, 2vw, 1.16rem);
  line-height: 1.75;
`;

const ChapterSection = ({ id, eyebrow, title, accent, children, compact = false }) => {
  return (
    <Section id={id}>
      <Inner>
        {(eyebrow || title) && (
          <Header
            compact={compact}
            initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow && <Kicker>{eyebrow}</Kicker>}
            {title && <Title dangerouslySetInnerHTML={{ __html: title }} />}
            {accent && <Copy>{accent}</Copy>}
          </Header>
        )}
        {children}
      </Inner>
    </Section>
  );
};

export default ChapterSection;
