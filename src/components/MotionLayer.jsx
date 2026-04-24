import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const LayerShell = styled(motion.div)`
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter;
`;

const MotionLayer = ({ children, depth = 0, transformTemplate, ...props }) => {
  const template =
    transformTemplate ||
    ((_, generatedTransform) => `${generatedTransform} translateZ(${depth}px)`);

  return (
    <LayerShell transformTemplate={template} {...props}>
      {children}
    </LayerShell>
  );
};

export default MotionLayer;
