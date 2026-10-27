import React, { useEffect, useRef } from 'react';

/**
 * TopScrollProgressBar
 * Subtle, ultra-smooth scroll progress bar at the very top of the browser viewport.
 * - Solid brand electric-blue (#0048DE) with zero glow, zero shadows, zero blur
 * - Direct GPU compositor transform (scaleX) with zero React re-renders for buttery 120 FPS
 * - 1:1 synchronization with Lenis momentum scroll and native scroll
 * - Optional subtle scrubbing on click or drag
 */
export default function TopScrollProgressBar() {
  const barRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Direct hardware-accelerated style update - zero React re-renders, zero layout reflow
    const setProgress = (progress) => {
      if (isDraggingRef.current) return;
      const clamped = Math.min(1, Math.max(0, progress));
      bar.style.transform = `scaleX(${clamped})`;
    };

    const getNativeProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      return scrollTop / scrollHeight;
    };

    // Handler for Lenis scroll callback
    const handleLenisScroll = (e) => {
      if (e && typeof e.progress === 'number') {
        setProgress(e.progress);
      } else if (e && typeof e.scroll === 'number' && typeof e.limit === 'number' && e.limit > 0) {
        setProgress(e.scroll / e.limit);
      } else {
        setProgress(getNativeProgress());
      }
    };

    // Fallback handler for native scroll & window resize
    const handleNativeScroll = () => {
      if (window.__lenis && typeof window.__lenis.progress === 'number') {
        setProgress(window.__lenis.progress);
      } else {
        setProgress(getNativeProgress());
      }
    };

    // Initial progress computation
    handleNativeScroll();

    // Hook to Lenis when available
    let isLenisAttached = false;
    const attachLenis = () => {
      if (window.__lenis && !isLenisAttached) {
        window.__lenis.on('scroll', handleLenisScroll);
        isLenisAttached = true;
        if (typeof window.__lenis.progress === 'number') {
          setProgress(window.__lenis.progress);
        }
      }
    };

    attachLenis();
    const checkInterval = setInterval(() => {
      if (!isLenisAttached && window.__lenis) {
        attachLenis();
      }
    }, 150);

    // Also listen to window scroll and resize
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleNativeScroll, { passive: true });

    return () => {
      clearInterval(checkInterval);
      if (isLenisAttached && window.__lenis) {
        window.__lenis.off('scroll', handleLenisScroll);
      }
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleNativeScroll);
    };
  }, []);

  // Scrubbing on pointer down / drag
  const handlePointerDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;

    const scrub = (clientX) => {
      const width = window.innerWidth;
      const ratio = Math.min(1, Math.max(0, clientX / width));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = ratio * maxScroll;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }

      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { immediate: false });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'auto' });
      }
    };

    scrub(e.clientX);

    const onPointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      scrub(moveEvent.clientX);
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div
      role="progressbar"
      aria-label="Scroll progress"
      title="Scroll progress"
      onPointerDown={handlePointerDown}
      className="fixed top-0 left-0 right-0 z-[99999] h-[3px] bg-slate-200/40 cursor-pointer select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Subtle, crisp solid blue progress bar without any glow */}
      <div
        ref={barRef}
        className="h-full w-full bg-[#0048DE] origin-left"
        style={{
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
