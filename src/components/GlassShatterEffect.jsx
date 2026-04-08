import React, { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Cosmic Energy Burst — on click, a burst of glowing particles
 * radiates outward in the portfolio's purple/pink/blue palette.
 * Pure Canvas 2D with particle physics. Zero React re-renders.
 */

const COLORS = [
  [124, 58, 237],   // purple
  [139, 92, 246],   // lighter purple
  [236, 72, 153],   // pink
  [244, 114, 182],  // lighter pink
  [59, 130, 246],   // blue
  [96, 165, 250],   // lighter blue
  [255, 255, 255],  // white sparkle
];

class Particle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 6;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = 0.012 + Math.random() * 0.018; // how fast it fades
    this.size = 1.5 + Math.random() * 3.5;
    this.color = color;
    this.gravity = 0.02 + Math.random() * 0.03;
    this.friction = 0.98;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.size *= 0.995;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const [r, g, b] = this.color;
    const alpha = this.life * 0.8;

    // Glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fill();
  }

  get alive() {
    return this.life > 0;
  }
}

class RingWave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 50 + Math.random() * 40;
    this.life = 1;
    this.speed = 2 + Math.random() * 2;
    const c = COLORS[Math.floor(Math.random() * 3)]; // stick to purples/pinks
    this.color = c;
  }

  update() {
    this.radius += this.speed;
    this.life = Math.max(0, 1 - this.radius / this.maxRadius);
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const [r, g, b] = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.life * 0.5})`;
    ctx.lineWidth = 1.5 * this.life;
    ctx.stroke();
  }

  get alive() {
    return this.life > 0;
  }
}

const ClickBurstEffect = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const ringsRef = useRef([]);
  const rafRef = useRef(null);
  const isRunningRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.style.width ? parseInt(canvas.style.width) : window.innerWidth;
    const h = canvas.style.height ? parseInt(canvas.style.height) : window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    // Update and draw rings
    const rings = ringsRef.current;
    for (let i = rings.length - 1; i >= 0; i--) {
      rings[i].update();
      rings[i].draw(ctx);
      if (!rings[i].alive) rings.splice(i, 1);
    }

    // Update and draw particles
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (!particles[i].alive) particles.splice(i, 1);
    }

    // Keep running only if there are active entities
    if (particles.length > 0 || rings.length > 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      isRunningRef.current = false;
      // Clear canvas completely when done
      ctx.clearRect(0, 0, w, h);
    }
  }, []);

  const spawnBurst = useCallback((x, y) => {
    // Spawn 25-40 particles
    const count = 25 + Math.floor(Math.random() * 15);
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(new Particle(x, y));
    }

    // Spawn 1-2 ring waves
    const ringCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < ringCount; i++) {
      ringsRef.current.push(new RingWave(x, y));
    }

    // Kick the animation loop if it's not already running
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    resizeCanvas();

    const handleClick = (e) => {
      spawnBurst(e.clientX, e.clientY);
    };

    const handleResize = () => resizeCanvas();

    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas, spawnBurst]);

  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    // Show after 3s
    const showTimer = setTimeout(() => setShowHint(true), 3000);
    // Auto-hide after 9s total (3s delay + 6s visible)
    const hideTimer = setTimeout(() => {
      setShowHint(false);
      setHintDismissed(true);
    }, 9000);

    const dismissOnClick = () => {
      setShowHint(false);
      setHintDismissed(true);
    };
    window.addEventListener('click', dismissOnClick, { once: true });

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('click', dismissOnClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Hint pill */}
      {!hintDismissed && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 50,
            background: 'rgba(124, 58, 237, 0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: 13,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.3px',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: showHint ? 1 : 0,
            transform: showHint ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.15)',
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>✦</span>
          <span>Click anywhere for a surprise</span>
        </div>
      )}
    </>
  );
};

export default ClickBurstEffect;
