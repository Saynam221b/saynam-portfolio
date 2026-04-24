import { useRef, useEffect, useState } from 'react';

/**
 * Animation presets for scroll-triggered reveals.
 * Uses opacity + transform only (GPU-accelerated, no layout shifts).
 * Each preset returns CSS properties for hidden and visible states.
 */
const resolveDistance = () => {
  if (typeof window === 'undefined') {
    return 26;
  }
  return Math.max(22, Math.min(44, window.innerHeight * 0.05));
};

const getPresets = distance => ({
  cinematicReveal: {
    hidden: {
      opacity: 0.02,
      filter: 'blur(8px)',
      transform: `translate3d(0, ${distance}px, 0) scale3d(0.985, 0.985, 1)`,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
    },
  },
  fadeUp: {
    hidden: { opacity: 0.02, transform: `translate3d(0, ${distance * 0.72}px, 0)` },
    visible: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  },
  fadeDown: {
    hidden: { opacity: 0.02, transform: `translate3d(0, ${-distance * 0.72}px, 0)` },
    visible: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  },
  fadeLeft: {
    hidden: { opacity: 0.02, transform: `translate3d(${-distance * 0.72}px, 0, 0)` },
    visible: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  },
  fadeRight: {
    hidden: { opacity: 0.02, transform: `translate3d(${distance * 0.72}px, 0, 0)` },
    visible: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  },
  scaleIn: {
    hidden: { opacity: 0.04, transform: 'scale3d(0.975, 0.975, 1)' },
    visible: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
  },
  blurIn: {
    hidden: { opacity: 0.02, filter: 'blur(10px)', transform: `translate3d(0, ${distance * 0.68}px, 0)` },
    visible: { opacity: 1, filter: 'blur(0px)', transform: 'translate3d(0, 0, 0)' },
  },
  clipRevealUp: {
    hidden: { clipPath: 'inset(10% 0 0 0)', opacity: 0.02, filter: 'blur(4px)' },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, filter: 'blur(0px)' },
  },
  clipRevealLeft: {
    hidden: { clipPath: 'inset(0 12% 0 0)', opacity: 0.02, filter: 'blur(4px)' },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, filter: 'blur(0px)' },
  },
  clipRevealRight: {
    hidden: { clipPath: 'inset(0 0 0 12%)', opacity: 0.02, filter: 'blur(4px)' },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, filter: 'blur(0px)' },
  },
  clipRevealCenter: {
    hidden: { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.02, filter: 'blur(4px)' },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, filter: 'blur(0px)' },
  },
});

/**
 * Check if user prefers reduced motion.
 */
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 *
 * Key design decisions to prevent flickering:
 * 1. Uses raw IntersectionObserver (not framer-motion's useInView) for precise control
 * 2. Once triggered, the observer disconnects — no re-triggers
 * 3. Applies styles via CSS properties only (no framer-motion animate/variants toggle)
 * 4. Uses will-change hint during animation, removes it after
 * 5. Uses translate3d/scale3d to force GPU compositing
 *
 * @param {Object} options
 * @param {string} options.animation - Preset name
 * @param {number} options.delay - Delay in seconds
 * @param {number} options.duration - Duration in seconds
 * @param {number} options.threshold - IntersectionObserver threshold (0–1)
 * @param {boolean} options.once - Trigger only once (default: true)
 */
export function useScrollAnimation({
  animation = 'cinematicReveal',
  delay = 0,
  duration = 0.95,
  threshold = 0.08,
  once = true,
} = {}) {
  const ref = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const presets = getPresets(resolveDistance());
  const preset = presets[animation] || presets.cinematicReveal;

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTriggered || reducedMotion) {
      // If reduced motion, make visible immediately
      if (el && reducedMotion) {
        Object.assign(el.style, preset.visible);
        el.style.transition = 'none';
      }
      return;
    }

    // Apply hidden state immediately (no flash — applied before paint)
    Object.assign(el.style, preset.hidden);

    // Hint: will-change for GPU layer promotion
    const willChangeProps = [];
    if (preset.hidden.opacity !== undefined) willChangeProps.push('opacity');
    if (preset.hidden.transform) willChangeProps.push('transform');
    if (preset.hidden.clipPath) willChangeProps.push('clip-path');
    if (preset.hidden.filter) willChangeProps.push('filter');
    el.style.willChange = willChangeProps.join(', ');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Build transition string
          const transitionProps = willChangeProps.map(
            (prop) => `${prop} ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
          );
          el.style.transition = transitionProps.join(', ');

          // Apply visible state on next frame to ensure transition runs
          requestAnimationFrame(() => {
            Object.assign(el.style, preset.visible);
          });

          // Clean up will-change after animation completes
          const cleanupTimer = setTimeout(() => {
            el.style.willChange = 'auto';
          }, (duration + delay) * 1000 + 100);

          setHasTriggered(true);

          if (once) {
            observer.disconnect();
          }

          // Store cleanup timer ref for unmount
          el._cleanupTimer = cleanupTimer;
        }
      },
      { threshold, rootMargin: '0px 0px -12% 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (el._cleanupTimer) clearTimeout(el._cleanupTimer);
    };
  }, [animation, delay, duration, threshold, once, hasTriggered, reducedMotion]); // eslint-disable-line

  return ref;
}

/**
 * Helper to generate stagger delays for list items.
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay before stagger starts
 * @param {number} staggerInterval - Delay between each item
 * @returns {number}
 */
export function staggerDelay(index, baseDelay = 0, staggerInterval = 0.08) {
  return baseDelay + index * staggerInterval;
}

export const presets = getPresets(resolveDistance());
export default useScrollAnimation;
