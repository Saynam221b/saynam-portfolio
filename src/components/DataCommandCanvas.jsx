import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useMotionValueEvent } from 'framer-motion';

const CanvasShell = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  background:
    radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 34%),
    radial-gradient(circle at 78% 70%, color-mix(in srgb, var(--accent-3) 10%, transparent), transparent 36%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const StaticFrame = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 1.6rem);
  background:
    radial-gradient(circle at 24% 20%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 32%),
    radial-gradient(circle at 78% 74%, color-mix(in srgb, var(--accent-3) 10%, transparent), transparent 36%),
    rgba(255, 255, 255, 0.025);
`;

const StaticSvg = styled.svg`
  width: min(100%, 760px);
  height: auto;
  overflow: visible;

  .grid {
    stroke: rgba(255, 255, 255, 0.08);
  }

  .path-primary {
    fill: none;
    stroke: var(--accent);
    stroke-width: 3;
    stroke-linecap: round;
    filter: drop-shadow(0 0 16px color-mix(in srgb, var(--accent) 56%, transparent));
  }

  .path-secondary {
    fill: none;
    stroke: var(--accent-2);
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.82;
  }

  .node {
    fill: color-mix(in srgb, var(--surface-strong) 86%, transparent);
    stroke: var(--line);
    stroke-width: 1;
  }

  .node-hot {
    fill: color-mix(in srgb, var(--accent) 26%, var(--surface-strong));
    stroke: var(--accent);
  }

  text {
    fill: var(--text);
    font-family: var(--font-sans);
    font-weight: 900;
    letter-spacing: 0;
  }

  .meta {
    fill: var(--text-subtle);
    font-size: 10px;
    text-transform: uppercase;
  }
`;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = value => Math.min(1, Math.max(0, value));

const cssColor = (name, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

const makeNode = (THREE, label, position, color) => {
  const group = new THREE.Group();
  group.position.set(position[0], position[1], position[2]);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 24, 18),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.94 })
  );
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 18),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  const ring = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(
      new THREE.EllipseCurve(0, 0, 0.42, 0.18, 0, Math.PI * 2).getPoints(72).map(point => new THREE.Vector3(point.x, point.y, 0))
    ),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.36 })
  );
  ring.rotation.x = Math.PI / 2.7;

  group.add(halo, ring, core);
  group.userData = { core, halo, ring, label };
  return group;
};

const makePath = (THREE, points, color, opacity = 0.72) => {
  const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(point[0], point[1], point[2])));
  const sampled = curve.getPoints(96);
  const geometry = new THREE.BufferGeometry().setFromPoints(sampled);
  geometry.setDrawRange(0, 2);
  const line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
    })
  );
  line.userData = { total: sampled.length, baseOpacity: opacity };
  return line;
};

const StaticCommandVisual = () => (
  <StaticFrame aria-hidden="true">
    <StaticSvg viewBox="0 0 720 420" role="img" aria-label="Static data command graph">
      <defs>
        <linearGradient id="commandGlow" x1="0" x2="1">
          <stop stopColor="var(--accent)" />
          <stop offset="0.58" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent-3)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 10 }).map((_, index) => (
        <line key={`v-${index}`} className="grid" x1={60 + index * 66} y1="40" x2={60 + index * 66} y2="380" />
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <line key={`h-${index}`} className="grid" x1="42" y1={70 + index * 54} x2="678" y2={70 + index * 54} />
      ))}
      <path className="path-primary" d="M92 210 C178 112 254 116 342 204 C432 296 520 286 622 150" />
      <path className="path-secondary" d="M118 290 C230 238 330 246 452 322 C520 362 594 342 648 292" />
      <path className="path-secondary" d="M190 138 C280 190 342 180 430 110 C494 60 568 70 632 118" />
      {[
        ['Oracle', 92, 210, true],
        ['dbt', 342, 204, true],
        ['Snowflake', 622, 150, true],
        ['DAG', 452, 322, false],
        ['Creator', 632, 292, false],
      ].map(([label, x, y, hot]) => (
        <g key={label}>
          <circle className={hot ? 'node-hot' : 'node'} cx={x} cy={y} r="34" />
          <circle cx={x} cy={y} r="48" fill="none" stroke={hot ? 'var(--accent)' : 'var(--line)'} opacity="0.25" />
          <text x={x} y={y - 2} textAnchor="middle" fontSize="15">{label}</text>
          <text className="meta" x={x} y={y + 17} textAnchor="middle">signal</text>
        </g>
      ))}
      <text x="58" y="58" fontSize="17" fill="url(#commandGlow)">SAYNAM OS / DATA COMMAND FILM</text>
    </StaticSvg>
  </StaticFrame>
);

const DataCommandCanvas = ({ progress, activeIndex = 0, reducedMotion = false }) => {
  const mountRef = useRef(null);
  const progressRef = useRef(0);
  const activeRef = useRef(activeIndex);

  useMotionValueEvent(progress, 'change', latest => {
    progressRef.current = latest;
  });

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (reducedMotion || !mountRef.current) return undefined;

    const mount = mountRef.current;
    let cleanupScene;
    let cancelled = false;

    const init = async () => {
      const THREE = await import('three');
      if (cancelled || !mount.isConnected) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      mount.appendChild(renderer.domElement);

      const accent = new THREE.Color(cssColor('--accent', '#72f6d1'));
      const accent2 = new THREE.Color(cssColor('--accent-2', '#8fb7ff'));
      const accent3 = new THREE.Color(cssColor('--accent-3', '#ffb86b'));
      const muted = new THREE.Color('#4b5568');

      const root = new THREE.Group();
      const dataLayer = new THREE.Group();
      const orbitLayer = new THREE.Group();
      scene.add(root);
      root.add(dataLayer, orbitLayer);

      const grid = new THREE.GridHelper(9, 26, muted, muted);
      grid.position.y = -1.45;
      grid.material.transparent = true;
      grid.material.opacity = 0.18;
      root.add(grid);

      const backGrid = new THREE.GridHelper(8, 18, muted, muted);
      backGrid.rotation.x = Math.PI / 2;
      backGrid.position.z = -2.6;
      backGrid.position.y = 0.9;
      backGrid.material.transparent = true;
      backGrid.material.opacity = 0.1;
      root.add(backGrid);

      const nodes = [
        makeNode(THREE, 'identity', [-2.7, 0.12, 0.25], accent),
        makeNode(THREE, 'oracle', [-1.55, -0.46, -0.25], accent2),
        makeNode(THREE, 'dbt', [0, 0.08, 0.35], accent),
        makeNode(THREE, 'snowflake', [1.72, -0.28, -0.16], accent2),
        makeNode(THREE, 'interface', [0.92, 0.9, -0.52], accent3),
        makeNode(THREE, 'creator', [2.72, 0.48, 0.4], accent3),
        makeNode(THREE, 'proof', [0.12, -1.05, 0.58], accent),
      ];
      nodes.forEach(node => dataLayer.add(node));

      const paths = [
        makePath(THREE, [[-2.7, 0.12, 0.25], [-1.55, -0.46, -0.25], [0, 0.08, 0.35], [1.72, -0.28, -0.16]], accent, 0.68),
        makePath(THREE, [[0, 0.08, 0.35], [0.92, 0.9, -0.52], [2.72, 0.48, 0.4]], accent3, 0.58),
        makePath(THREE, [[-1.55, -0.46, -0.25], [0.12, -1.05, 0.58], [1.72, -0.28, -0.16]], accent2, 0.46),
        makePath(THREE, [[2.72, 0.48, 0.4], [1.35, -0.95, 0.2], [0.12, -1.05, 0.58], [-2.7, 0.12, 0.25]], accent, 0.35),
      ];
      paths.forEach(path => dataLayer.add(path));

      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 220;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 7.8;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3.8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4.2;
      }
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: accent,
          size: 0.014,
          transparent: true,
          opacity: 0.36,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      orbitLayer.add(particles);

      let raf = 0;

      const resize = () => {
        const rect = mount.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(mount);
      resize();

      const render = time => {
        const t = clamp01(progressRef.current);
        const chapter = activeRef.current;
        const pulse = (Math.sin(time * 0.0026) + 1) / 2;
        const cameraEase = t * t * (3 - 2 * t);

        root.rotation.x = lerp(0.34, -0.12, cameraEase) + Math.sin(time * 0.0006) * 0.018;
        root.rotation.y = lerp(-0.48, 0.38, cameraEase) + Math.sin(time * 0.0004) * 0.035;
        root.position.x = lerp(0.42, -0.42, cameraEase);
        dataLayer.rotation.z = lerp(-0.03, 0.04, cameraEase);
        orbitLayer.rotation.y += 0.0014;

        camera.position.set(lerp(0.85, -0.62, cameraEase), lerp(1.1, 0.34, cameraEase), lerp(5.2, 3.7, cameraEase));
        camera.lookAt(0.08, -0.14, 0);

        nodes.forEach((node, index) => {
          const localStart = index / (nodes.length + 1);
          const revealed = clamp01((t - localStart * 0.72) * 3.2);
          const chapterBoost = Math.abs(index - (chapter + 1)) <= 1 ? 1 : 0.62;
          const scale = (0.72 + revealed * 0.52 + pulse * 0.08) * chapterBoost;
          node.scale.setScalar(scale);
          node.userData.core.material.opacity = 0.42 + revealed * 0.54;
          node.userData.halo.material.opacity = 0.045 + revealed * 0.16 + pulse * 0.045;
          node.userData.ring.rotation.z += 0.007 + index * 0.001;
        });

        paths.forEach((path, index) => {
          const draw = clamp01((t - index * 0.14) * 2.2);
          path.geometry.setDrawRange(0, Math.max(2, Math.floor(path.userData.total * draw)));
          path.material.opacity = path.userData.baseOpacity * (0.4 + draw * 0.72 + pulse * 0.12);
        });

        particles.material.opacity = 0.22 + pulse * 0.18;
        renderer.render(scene, camera);
        raf = window.requestAnimationFrame(render);
      };

      raf = window.requestAnimationFrame(render);

      cleanupScene = () => {
        window.cancelAnimationFrame(raf);
        ro.disconnect();
        scene.traverse(object => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    init();

    return () => {
      cancelled = true;
      if (cleanupScene) cleanupScene();
    };
  }, [progress, reducedMotion]);

  if (reducedMotion) {
    return <StaticCommandVisual />;
  }

  return <CanvasShell ref={mountRef} aria-hidden="true" />;
};

export { StaticCommandVisual };
export default DataCommandCanvas;
