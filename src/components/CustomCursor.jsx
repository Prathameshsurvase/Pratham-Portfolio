import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * Crisp 8-bit Retro Pixel Pointer matching the Pix32 typography and Vintage ASCII aesthetic.
 * - Hardware-accelerated 0ms latency direct pointer tracking (translate3d)
 * - Authentic 8-bit pixel arrow with vibrant electric-blue (#0048DE) triangle core
 * - 8-bit pixel pointing hand with electric-blue cuff on interactive hover
 * - Zero background glow blur/aura, zero trailing dots
 * - Mechanical tactile click feedback (2px depression on mousedown)
 * - Safely disabled on touch/mobile devices
 */

function RetroPixelArrow() {
  return (
    <svg 
      viewBox="0 0 16 20" 
      width="24" 
      height="30" 
      className="will-change-transform"
      style={{ shapeRendering: 'crispEdges' }}
    >
      {/* 1. Black outer contour */}
      <path 
        d="M0,0h1v1h-1z M0,1h1v1h-1z M1,1h1v1h-1z M0,2h1v1h-1z M2,2h1v1h-1z M0,3h1v1h-1z M3,3h1v1h-1z M0,4h1v1h-1z M4,4h1v1h-1z M0,5h1v1h-1z M5,5h1v1h-1z M0,6h1v1h-1z M6,6h1v1h-1z M0,7h1v1h-1z M7,7h1v1h-1z M0,8h1v1h-1z M8,8h1v1h-1z M0,9h1v1h-1z M9,9h1v1h-1z M0,10h1v1h-1z M10,10h1v1h-1z M0,11h1v1h-1z M10,11h1v1h-1z M11,11h1v1h-1z M0,12h1v1h-1z M6,12h1v1h-1z M7,12h1v1h-1z M8,12h1v1h-1z M9,12h1v1h-1z M0,13h1v1h-1z M4,13h1v1h-1z M5,13h1v1h-1z M0,14h1v1h-1z M3,14h1v1h-1z M4,14h1v1h-1z M6,14h1v1h-1z M0,15h1v1h-1z M2,15h1v1h-1z M3,15h1v1h-1z M5,15h1v1h-1z M7,15h1v1h-1z M0,16h1v1h-1z M1,16h1v1h-1z M2,16h1v1h-1z M5,16h1v1h-1z M7,16h1v1h-1z M0,17h1v1h-1z M6,17h1v1h-1z M8,17h1v1h-1z M6,18h1v1h-1z M8,18h1v1h-1z M7,19h1v1h-1z M8,19h1v1h-1z" 
        fill="#050811" 
      />
      {/* 2. Crisp white outer edge */}
      <path 
        d="M1,2h1v1h-1z M1,3h1v1h-1z M2,3h1v1h-1z M1,4h1v1h-1z M3,4h1v1h-1z M1,5h1v1h-1z M4,5h1v1h-1z M1,6h1v1h-1z M5,6h1v1h-1z M1,7h1v1h-1z M6,7h1v1h-1z M1,8h1v1h-1z M7,8h1v1h-1z M1,9h1v1h-1z M8,9h1v1h-1z M1,10h1v1h-1z M9,10h1v1h-1z M1,11h1v1h-1z M6,11h1v1h-1z M7,11h1v1h-1z M8,11h1v1h-1z M9,11h1v1h-1z M1,12h1v1h-1z M4,12h1v1h-1z M5,12h1v1h-1z M1,13h1v1h-1z M3,13h1v1h-1z M1,14h1v1h-1z M2,14h1v1h-1z M5,14h1v1h-1z M1,15h1v1h-1z M6,15h1v1h-1z M6,16h1v1h-1z M7,17h1v1h-1z M7,18h1v1h-1z" 
        fill="#ffffff" 
      />
      {/* 3. Electric-Blue core brand accent (#0048DE) in the inner triangle */}
      <path 
        d="M2,4h1v1h-1z M2,5h1v1h-1z M3,5h1v1h-1z M2,6h1v1h-1z M3,6h1v1h-1z M4,6h1v1h-1z M2,7h1v1h-1z M3,7h1v1h-1z M4,7h1v1h-1z M5,7h1v1h-1z M2,8h1v1h-1z M3,8h1v1h-1z M4,8h1v1h-1z M5,8h1v1h-1z M6,8h1v1h-1z M2,9h1v1h-1z M3,9h1v1h-1z M4,9h1v1h-1z M5,9h1v1h-1z M6,9h1v1h-1z M7,9h1v1h-1z M2,10h1v1h-1z M3,10h1v1h-1z M4,10h1v1h-1z M5,10h1v1h-1z M6,10h1v1h-1z M7,10h1v1h-1z M8,10h1v1h-1z M2,11h1v1h-1z M3,11h1v1h-1z M4,11h1v1h-1z M5,11h1v1h-1z M2,12h1v1h-1z M3,12h1v1h-1z M2,13h1v1h-1z" 
        fill="#0048DE" 
      />
      {/* 4. Cyan core highlight spark */}
      <path 
        d="M3,6h1v1h-1z M3,7h1v1h-1z M4,7h1v1h-1z M3,8h1v1h-1z M4,8h1v1h-1z" 
        fill="#60a5fa" 
      />
    </svg>
  );
}

function RetroPixelHand() {
  return (
    <svg 
      viewBox="0 0 16 20" 
      width="25" 
      height="31" 
      className="will-change-transform"
      style={{ shapeRendering: 'crispEdges' }}
    >
      {/* 1. Black outer contour */}
      <path 
        d="M4,0h1v1h-1z M5,0h1v1h-1z M3,1h1v1h-1z M6,1h1v1h-1z M7,1h1v1h-1z M3,2h1v1h-1z M6,2h1v1h-1z M8,2h1v1h-1z M3,3h1v1h-1z M6,3h1v1h-1z M8,3h1v1h-1z M3,4h1v1h-1z M6,4h1v1h-1z M8,4h1v1h-1z M3,5h1v1h-1z M6,5h1v1h-1z M8,5h1v1h-1z M11,5h1v1h-1z M12,5h1v1h-1z M3,6h1v1h-1z M6,6h1v1h-1z M8,6h1v1h-1z M9,6h1v1h-1z M10,6h1v1h-1z M13,6h1v1h-1z M3,7h1v1h-1z M6,7h1v1h-1z M8,7h1v1h-1z M11,7h1v1h-1z M14,7h1v1h-1z M2,8h1v1h-1z M3,8h1v1h-1z M6,8h1v1h-1z M8,8h1v1h-1z M11,8h1v1h-1z M14,8h1v1h-1z M1,9h1v1h-1z M6,9h1v1h-1z M7,9h1v1h-1z M8,9h1v1h-1z M11,9h1v1h-1z M14,9h1v1h-1z M0,10h1v1h-1z M11,10h1v1h-1z M12,10h1v1h-1z M14,10h1v1h-1z M0,11h1v1h-1z M15,11h1v1h-1z M0,12h1v1h-1z M15,12h1v1h-1z M0,13h1v1h-1z M15,13h1v1h-1z M1,14h1v1h-1z M14,14h1v1h-1z M2,15h1v1h-1z M13,15h1v1h-1z M3,16h1v1h-1z M4,16h1v1h-1z M5,16h1v1h-1z M6,16h1v1h-1z M7,16h1v1h-1z M8,16h1v1h-1z M9,16h1v1h-1z M10,16h1v1h-1z M11,16h1v1h-1z M4,17h1v1h-1z M11,17h1v1h-1z M4,18h1v1h-1z M11,18h1v1h-1z M4,19h1v1h-1z M5,19h1v1h-1z M6,19h1v1h-1z M7,19h1v1h-1z M8,19h1v1h-1z M9,19h1v1h-1z M10,19h1v1h-1z M11,19h1v1h-1z" 
        fill="#050811" 
      />
      {/* 2. Solid white glove */}
      <path 
        d="M4,1h1v1h-1z M5,1h1v1h-1z M4,2h1v1h-1z M5,2h1v1h-1z M4,3h1v1h-1z M5,3h1v1h-1z M4,4h1v1h-1z M5,4h1v1h-1z M4,5h1v1h-1z M5,5h1v1h-1z M4,6h1v1h-1z M5,6h1v1h-1z M11,6h1v1h-1z M12,6h1v1h-1z M4,7h1v1h-1z M5,7h1v1h-1z M9,7h1v1h-1z M10,7h1v1h-1z M13,7h1v1h-1z M4,8h1v1h-1z M5,8h1v1h-1z M9,8h1v1h-1z M10,8h1v1h-1z M13,8h1v1h-1z M2,9h1v1h-1z M3,9h1v1h-1z M4,9h1v1h-1z M5,9h1v1h-1z M9,9h1v1h-1z M10,9h1v1h-1z M13,9h1v1h-1z M1,10h1v1h-1z M2,10h1v1h-1z M5,10h1v1h-1z M6,10h1v1h-1z M7,10h1v1h-1z M8,10h1v1h-1z M9,10h1v1h-1z M10,10h1v1h-1z M13,10h1v1h-1z M1,11h1v1h-1z M6,11h1v1h-1z M7,11h1v1h-1z M8,11h1v1h-1z M9,11h1v1h-1z M10,11h1v1h-1z M11,11h1v1h-1z M12,11h1v1h-1z M13,11h1v1h-1z M14,11h1v1h-1z M1,12h1v1h-1z M6,12h1v1h-1z M7,12h1v1h-1z M8,12h1v1h-1z M9,12h1v1h-1z M10,12h1v1h-1z M11,12h1v1h-1z M12,12h1v1h-1z M13,12h1v1h-1z M14,12h1v1h-1z M1,13h1v1h-1z M2,13h1v1h-1z M5,13h1v1h-1z M6,13h1v1h-1z M7,13h1v1h-1z M8,13h1v1h-1z M9,13h1v1h-1z M10,13h1v1h-1z M11,13h1v1h-1z M12,13h1v1h-1z M13,13h1v1h-1z M14,13h1v1h-1z M2,14h1v1h-1z M3,14h1v1h-1z M4,14h1v1h-1z M5,14h1v1h-1z M6,14h1v1h-1z M7,14h1v1h-1z M8,14h1v1h-1z M9,14h1v1h-1z M10,14h1v1h-1z M11,14h1v1h-1z M12,14h1v1h-1z M13,14h1v1h-1z M3,15h1v1h-1z M4,15h1v1h-1z M5,15h1v1h-1z M6,15h1v1h-1z M7,15h1v1h-1z M8,15h1v1h-1z M9,15h1v1h-1z M10,15h1v1h-1z M11,15h1v1h-1z M12,15h1v1h-1z" 
        fill="#ffffff" 
      />
      {/* 3. Electric-Blue thumb & cuff accents (#0048DE) */}
      <path 
        d="M3,10h1v1h-1z M4,10h1v1h-1z M2,11h1v1h-1z M3,11h1v1h-1z M4,11h1v1h-1z M5,11h1v1h-1z M2,12h1v1h-1z M3,12h1v1h-1z M4,12h1v1h-1z M5,12h1v1h-1z M3,13h1v1h-1z M4,13h1v1h-1z M5,17h1v1h-1z M6,17h1v1h-1z M7,17h1v1h-1z M8,17h1v1h-1z M9,17h1v1h-1z M10,17h1v1h-1z M5,18h1v1h-1z M6,18h1v1h-1z M7,18h1v1h-1z M8,18h1v1h-1z M9,18h1v1h-1z M10,18h1v1h-1z" 
        fill="#0048DE" 
      />
      {/* 4. Cyan cuff highlight */}
      <path 
        d="M6,17h1v1h-1z M7,17h1v1h-1z M8,17h1v1h-1z M9,17h1v1h-1z" 
        fill="#60a5fa" 
      />
    </svg>
  );
}

function RetroPixelCrosshair() {
  return (
    <svg 
      viewBox="0 0 16 17" 
      width="24" 
      height="26" 
      className="will-change-transform"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <path 
        d="M7,0h1v1h-1z M8,0h1v1h-1z M7,1h1v1h-1z M9,1h1v1h-1z M7,2h1v1h-1z M9,2h1v1h-1z M7,3h1v1h-1z M9,3h1v1h-1z M7,4h1v1h-1z M9,4h1v1h-1z M7,5h1v1h-1z M9,5h1v1h-1z M7,6h1v1h-1z M9,6h1v1h-1z M0,7h1v1h-1z M1,7h1v1h-1z M2,7h1v1h-1z M3,7h1v1h-1z M4,7h1v1h-1z M5,7h1v1h-1z M6,7h1v1h-1z M10,7h1v1h-1z M11,7h1v1h-1z M12,7h1v1h-1z M13,7h1v1h-1z M14,7h1v1h-1z M15,7h1v1h-1z M0,8h1v1h-1z M15,8h1v1h-1z M0,9h1v1h-1z M1,9h1v1h-1z M2,9h1v1h-1z M3,9h1v1h-1z M4,9h1v1h-1z M5,9h1v1h-1z M6,9h1v1h-1z M10,9h1v1h-1z M11,9h1v1h-1z M12,9h1v1h-1z M13,9h1v1h-1z M14,9h1v1h-1z M15,9h1v1h-1z M7,10h1v1h-1z M9,10h1v1h-1z M7,11h1v1h-1z M9,11h1v1h-1z M7,12h1v1h-1z M9,12h1v1h-1z M7,13h1v1h-1z M9,13h1v1h-1z M7,14h1v1h-1z M9,14h1v1h-1z M7,15h1v1h-1z M9,15h1v1h-1z M7,16h1v1h-1z M8,16h1v1h-1z" 
        fill="#050811" 
      />
      <path 
        d="M8,1h1v1h-1z M8,2h1v1h-1z M8,3h1v1h-1z M8,4h1v1h-1z M8,5h1v1h-1z M8,6h1v1h-1z M1,8h1v1h-1z M2,8h1v1h-1z M3,8h1v1h-1z M4,8h1v1h-1z M5,8h1v1h-1z M6,8h1v1h-1z M10,8h1v1h-1z M11,8h1v1h-1z M12,8h1v1h-1z M13,8h1v1h-1z M14,8h1v1h-1z M8,10h1v1h-1z M8,11h1v1h-1z M8,12h1v1h-1z M8,13h1v1h-1z M8,14h1v1h-1z M8,15h1v1h-1z" 
        fill="#ffffff" 
      />
      <path 
        d="M8,8h1v1h-1z" 
        fill="#0048DE" 
      />
    </svg>
  );
}

function RetroPixelIBeam() {
  return (
    <svg 
      viewBox="0 0 10 15" 
      width="16" 
      height="24" 
      className="will-change-transform"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <path 
        d="M0,0h1v1h-1z M1,0h1v1h-1z M2,0h1v1h-1z M3,0h1v1h-1z M4,0h1v1h-1z M5,0h1v1h-1z M6,0h1v1h-1z M7,0h1v1h-1z M8,0h1v1h-1z M9,0h1v1h-1z M0,1h1v1h-1z M9,1h1v1h-1z M0,2h1v1h-1z M1,2h1v1h-1z M2,2h1v1h-1z M3,2h1v1h-1z M6,2h1v1h-1z M7,2h1v1h-1z M8,2h1v1h-1z M9,2h1v1h-1z M3,3h1v1h-1z M6,3h1v1h-1z M3,4h1v1h-1z M6,4h1v1h-1z M3,5h1v1h-1z M6,5h1v1h-1z M3,6h1v1h-1z M6,6h1v1h-1z M3,7h1v1h-1z M6,7h1v1h-1z M3,8h1v1h-1z M6,8h1v1h-1z M3,9h1v1h-1z M6,9h1v1h-1z M3,10h1v1h-1z M6,10h1v1h-1z M3,11h1v1h-1z M6,11h1v1h-1z M0,12h1v1h-1z M1,12h1v1h-1z M2,12h1v1h-1z M3,12h1v1h-1z M6,12h1v1h-1z M7,12h1v1h-1z M8,12h1v1h-1z M9,12h1v1h-1z M0,13h1v1h-1z M9,13h1v1h-1z M0,14h1v1h-1z M1,14h1v1h-1z M2,14h1v1h-1z M3,14h1v1h-1z M4,14h1v1h-1z M5,14h1v1h-1z M6,14h1v1h-1z M7,14h1v1h-1z M8,14h1v1h-1z M9,14h1v1h-1z" 
        fill="#050811" 
      />
      <path 
        d="M1,1h1v1h-1z M2,1h1v1h-1z M3,1h1v1h-1z M4,1h1v1h-1z M5,1h1v1h-1z M6,1h1v1h-1z M7,1h1v1h-1z M8,1h1v1h-1z M1,13h1v1h-1z M2,13h1v1h-1z M3,13h1v1h-1z M4,13h1v1h-1z M5,13h1v1h-1z M6,13h1v1h-1z M7,13h1v1h-1z M8,13h1v1h-1z" 
        fill="#ffffff" 
      />
      <path 
        d="M4,2h1v1h-1z M5,2h1v1h-1z M4,3h1v1h-1z M5,3h1v1h-1z M4,4h1v1h-1z M5,4h1v1h-1z M4,5h1v1h-1z M5,5h1v1h-1z M4,6h1v1h-1z M5,6h1v1h-1z M4,7h1v1h-1z M5,7h1v1h-1z M4,8h1v1h-1z M5,8h1v1h-1z M4,9h1v1h-1z M5,9h1v1h-1z M4,10h1v1h-1z M5,10h1v1h-1z M4,11h1v1h-1z M5,11h1v1h-1z M4,12h1v1h-1z M5,12h1v1h-1z" 
        fill="#0048DE" 
      />
    </svg>
  );
}

export default function CustomCursor() {
  const cursorRef = useRef(null);

  const [cursorState, setCursorState] = useState('arrow'); // 'arrow' | 'pointer' | 'drag' | 'text' | 'labeled'
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only run on fine-pointer desktop devices
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    // Enable custom cursor styles on document body
    document.body.classList.add('retro-cursor-enabled');

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      // Instant 0ms hardware transform on primary cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Context-aware target evaluation
      const target = e.target;
      if (!target) return;

      const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');
      const interactiveEl = target.closest('a, button, [role="button"], .cursor-pointer, summary, select');
      const dragEl = target.closest('[data-cursor="drag"], canvas, .experience-card');
      const textEl = target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]');

      if (customLabel) {
        setCursorState('labeled');
        setCursorLabel(customLabel);
      } else if (interactiveEl) {
        setCursorState('pointer');
        setCursorLabel('');
      } else if (dragEl) {
        setCursorState('drag');
        setCursorLabel('');
      } else if (textEl) {
        setCursorState('text');
        setCursorLabel('');
      } else {
        setCursorState('arrow');
        setCursorLabel('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      document.body.classList.remove('retro-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body.retro-cursor-enabled,
          body.retro-cursor-enabled a,
          body.retro-cursor-enabled button,
          body.retro-cursor-enabled input,
          body.retro-cursor-enabled textarea,
          body.retro-cursor-enabled [role="button"],
          body.retro-cursor-enabled .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Global Cursor Container: Highest z-index, strictly pointer-events-none */}
      <div 
        className={`hidden md:block fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {/* Primary 8-Bit Pixel Pointer (0ms hardware latency, crisp edges, mechanical depression) */}
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
          style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        >
          <div 
            className={`relative transition-transform duration-75 ease-out select-none ${
              isClicking ? 'translate-x-[2px] translate-y-[2px]' : ''
            }`}
          >
            {/* 1. Default Retro Pixel Arrow (Hotspot: 0, 0) */}
            {cursorState === 'arrow' && (
              <div className="relative top-0 left-0">
                <RetroPixelArrow />
              </div>
            )}

            {/* 2. Interactive Retro Pixel Hand Pointer (Hotspot: index finger tip at -7px, 0px) */}
            {cursorState === 'pointer' && (
              <div className="relative -left-[7px] top-0">
                <RetroPixelHand />
              </div>
            )}

            {/* 3. Drag / 3D Canvas Crosshair (Hotspot: center at -12px, -13px) */}
            {cursorState === 'drag' && (
              <div className="relative -left-[12px] -top-[13px]">
                <RetroPixelCrosshair />
              </div>
            )}

            {/* 4. Text Terminal I-Beam (Hotspot: center at -8px, -12px) */}
            {cursorState === 'text' && (
              <div className="relative -left-[8px] -top-[12px]">
                <RetroPixelIBeam />
              </div>
            )}

            {/* 5. Contextual Action Badge (Retro Terminal Tag) */}
            {cursorLabel && (
              <div className="absolute left-6 top-3 flex items-center gap-1.5 px-2 py-0.5 bg-slate-950/95 border border-slate-700 rounded shadow-md whitespace-nowrap">
                <span className="font-pixel text-[9px] uppercase tracking-wider text-white font-normal select-none">
                  {cursorLabel}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
