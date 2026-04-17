import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

const sweep = keyframes`
  0% { transform: translateX(-110%); }
  100% { transform: translateX(120%); }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 14% 22%, rgba(47, 109, 255, 0.15), transparent 34%),
    radial-gradient(circle at 86% 70%, rgba(24, 182, 164, 0.12), transparent 36%),
    #060b1a;
`;

const Frame = styled.div`
  width: min(460px, 90vw);
  border: 1px solid rgba(152, 177, 236, 0.3);
  border-radius: 18px;
  padding: 1.1rem 1.1rem 0.95rem;
  background: rgba(13, 23, 51, 0.82);
  box-shadow: 0 20px 48px rgba(3, 8, 26, 0.42);
`;

const Label = styled.p`
  font-size: 0.7rem;
  color: rgba(175, 197, 245, 0.92);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: 0.45rem;
`;

const Brand = styled.h2`
  font-size: clamp(1.28rem, 2.8vw, 1.62rem);
  font-weight: 600;
  color: #f6f8ff;
  margin-bottom: 0.72rem;

  span {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    color: #8dd6ce;
  }
`;

const Track = styled.div`
  height: 5px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(136, 160, 220, 0.2);
`;

const Sweep = styled.div`
  width: 36%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #2f6dff 0%, #18b6a4 100%);
  animation: ${sweep} 0.66s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <Frame>
        <Label>Studio Loading</Label>
        <Brand>
          Saynam <span>Sharma</span>
        </Brand>
        <Track>
          <Sweep />
        </Track>
      </Frame>
    </LoaderContainer>
  );
};

export default Loader;
