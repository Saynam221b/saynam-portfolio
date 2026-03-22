import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const waveAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const DividerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  position: relative;
  z-index: 1;
`;

const DividerLine = styled.div`
  width: 120px;
  height: 3px;
  border-radius: 3px;
  background: ${props => props.theme.gradients.primary};
  background-size: 200% 200%;
  animation: ${waveAnimation} 4s ease infinite;
  opacity: 0.5;
`;

const SectionDivider = () => {
  return (
    <DividerWrapper>
      <DividerLine />
    </DividerWrapper>
  );
};

export default SectionDivider;
