import React, { useEffect, useRef, useCallback } from 'react';
import { ASCII_LINES } from './asciiComputerData';

export default function VintagePcAscii() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Interaction and animation tracking refs
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const animFrameRef = useRef(null);
  const isRunningRef = useRef(false);
  const particlesRef = useRef([]);

  // Setup particles once on mount
  useEffect(() => {
    const charWidth = 4.524;
    const lineHeight = 6.0;
    const startX = 14;
    const startY = 15;
    const pts = [];

    for (let r = 0; r < ASCII_LINES.length; r++) {
      const line = ASCII_LINES[r];
      const originY = startY + r * lineHeight;
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch !== ' ') {
          const originX = startX + c * charWidth;
          pts.push({
            ch,
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
          });
        }
      }
    }
    particlesRef.current = pts;
  }, []);

  // Main rendering & physics loop
  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseWidth = 480;
    const baseHeight = 480;

    // Physics constants
    const REPEL_RADIUS = 78;          // Influence radius around cursor
    const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
    const REPEL_STRENGTH = 5.2;       // Outward displacement kick
    const SPRING_K = 0.082;           // Elastic return stiffness
    const FRICTION = 0.81;            // Damping friction
    const MAX_SPEED = 14;             // Velocity safety ceiling

    const loop = () => {
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const len = particles.length;

      ctx.clearRect(0, 0, baseWidth, baseHeight);
      ctx.font = '600 6.2px Consolas, "Courier New", monospace';

      let isMoving = mouse.active;
      let activeColor = '';

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // 1. Repulsion force from cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < REPEL_RADIUS_SQ && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            // Non-linear falloff for punchy repulsion near cursor center
            const factor = Math.pow((REPEL_RADIUS - dist) / REPEL_RADIUS, 1.3);
            const force = factor * REPEL_STRENGTH;
            const angle = Math.atan2(dy, dx);

            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // 2. Spring force pulling back to original home coordinate
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * SPRING_K;
        p.vy += homeDy * SPRING_K;

        // 3. Apply friction / air resistance
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // 4. Speed ceiling
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > MAX_SPEED * MAX_SPEED) {
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // 5. Integrate position
        p.x += p.vx;
        p.y += p.vy;

        // 6. Check motion threshold
        if (!isMoving) {
          if (
            Math.abs(p.vx) > 0.015 ||
            Math.abs(p.vy) > 0.015 ||
            Math.abs(homeDx) > 0.15 ||
            Math.abs(homeDy) > 0.15
          ) {
            isMoving = true;
          }
        }

        // 7. Dynamic color feedback: subtle energetic blue when pushed away from rest
        const dispSq = homeDx * homeDx + homeDy * homeDy;
        const targetColor = dispSq > 16 ? '#0048DE' : '#334155';
        if (targetColor !== activeColor) {
          ctx.fillStyle = targetColor;
          activeColor = targetColor;
        }

        ctx.fillText(p.ch, p.x, p.y);
      }

      // If mouse is inactive and all particles have settled, snap to rest and sleep
      if (!isMoving) {
        ctx.fillStyle = '#334155';
        ctx.clearRect(0, 0, baseWidth, baseHeight);
        for (let i = 0; i < len; i++) {
          const p = particles[i];
          p.x = p.originX;
          p.y = p.originY;
          p.vx = 0;
          p.vy = 0;
          ctx.fillText(p.ch, p.x, p.y);
        }
        isRunningRef.current = false;
        return; // Pause animation loop to maintain 0% CPU consumption
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, []);

  // Initial draw & DPI setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    const baseWidth = 480;
    const baseHeight = 480;

    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;
    ctx.scale(dpr, dpr);

    // Initial render
    ctx.clearRect(0, 0, baseWidth, baseHeight);
    ctx.font = '600 6.2px Consolas, "Courier New", monospace';
    ctx.fillStyle = '#334155';

    const lines = ASCII_LINES;
    const charWidth = 4.524;
    const lineHeight = 6.0;
    const startX = 14;
    const startY = 15;

    for (let r = 0; r < lines.length; r++) {
      const line = lines[r];
      const y = startY + r * lineHeight;
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch !== ' ') {
          const x = startX + c * charWidth;
          ctx.fillText(ch, x, y);
        }
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Pointer event handlers with container evasion + particle repulsion
  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = 480 / rect.width;
    const scaleY = 480 / rect.height;

    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    mouseRef.current.active = true;

    // Macro evasion: container physically steers away from cursor
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const normX = (e.clientX - centerX) / (containerRect.width / 2);
    const normY = (e.clientY - centerY) / (containerRect.height / 2);

    // Smooth elastic dodge (up to 18px away from cursor vector)
    container.style.transform = `translate3d(${-normX * 18}px, ${-normY * 18}px, 0) scale(1.015)`;

    if (!isRunningRef.current) {
      startAnimation();
    }
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;

    const container = containerRef.current;
    if (container) {
      container.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
    }

    if (!isRunningRef.current) {
      startAnimation();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[420px] md:max-w-[460px] aspect-square mx-auto cursor-crosshair transition-transform duration-300 ease-out select-none touch-none"
      title="Hover over the ASCII art to interact with it"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        aria-label="Vintage Computer Hard-Coded ASCII Art Illustration with Interactive Repulsion Physics"
      />
    </div>
  );
}

