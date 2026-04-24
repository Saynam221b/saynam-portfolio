import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

const sweep = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(260%); }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    var(--bg);
  background-size: 44px 44px;
`;

const Frame = styled.div`
  width: min(520px, 90vw);
`;

const Label = styled.p`
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 0.55rem;
`;

const Brand = styled.h2`
  color: var(--text);
  font-size: clamp(2.2rem, 8vw, 4.7rem);
  line-height: 0.88;
  font-weight: 900;
  margin-bottom: 1rem;

  span {
    display: block;
    font-family: var(--font-display);
    color: var(--accent-3);
  }
`;

const Track = styled.div`
  position: relative;
  height: 2px;
  overflow: hidden;
  background: var(--line-soft);
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 44%;
  background: linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent);
  animation: ${sweep} 0.9s var(--ease-out) infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }}>
      <Frame>
        <Label>Composing portfolio</Label>
        <Brand>
          Saynam <span>Sharma</span>
        </Brand>
        <Track>
          <Bar />
        </Track>
      </Frame>
    </LoaderContainer>
  );
};

export default Loader;
