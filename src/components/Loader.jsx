import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

const sweep = keyframes`
  0% { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #070e22;
`;

const LoaderCard = styled.div`
  width: min(360px, 88vw);
  border-radius: 16px;
  border: 1px solid rgba(126, 151, 214, 0.32);
  background: rgba(13, 25, 54, 0.88);
  padding: 1rem 1rem 0.9rem;
`;

const Brand = styled.h2`
  color: #f2f6ff;
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.45rem;
`;

const Caption = styled.p`
  color: rgba(182, 199, 239, 0.95);
  font-size: 0.82rem;
  margin-bottom: 0.78rem;
`;

const ProgressTrack = styled.div`
  position: relative;
  overflow: hidden;
  height: 5px;
  border-radius: 999px;
  background: rgba(138, 162, 222, 0.2);
`;

const ProgressSweep = styled.div`
  position: absolute;
  inset: 0;
  width: 40%;
  border-radius: 999px;
  background: linear-gradient(90deg, #2b6cf0 0%, #15b8a6 100%);
  animation: ${sweep} 0.7s ease-in-out infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
      <LoaderCard>
        <Brand>Saynam Sharma</Brand>
        <Caption>Loading portfolio snapshot...</Caption>
        <ProgressTrack>
          <ProgressSweep />
        </ProgressTrack>
      </LoaderCard>
    </LoaderContainer>
  );
};

export default Loader;
