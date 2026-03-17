import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Reusable wrapper that applies scroll-triggered animations to children.
 * 
 * Uses raw IntersectionObserver + CSS transitions (NOT framer-motion animate/variants)
 * to avoid flickering caused by React re-renders triggering animation state changes.
 *
 * Usage:
 *   <AnimatedSection animation="fadeUp" delay={0.2}>
 *     <YourContent />
 *   </AnimatedSection>
 *
 * Available animations:
 *   fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, blurIn,
 *   clipRevealUp, clipRevealLeft, clipRevealRight, clipRevealCenter
 */
const AnimatedSection = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.7,
  threshold = 0.12,
  once = true,
  className,
  style,
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useScrollAnimation({
    animation,
    delay,
    duration,
    threshold,
    once,
  });

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;
