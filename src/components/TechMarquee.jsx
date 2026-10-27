import React, { useState, useEffect, useRef } from 'react';

// =========================================================================
// Official & Crisp Vector Logos for Design, AI & Modern Web Stack
// Rendered directly from user's uploaded public/logos/ assets
// =========================================================================

export default function TechMarquee() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleCheck = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;

      // Trigger when the section top has scrolled into view (upper 75% of viewport)
      const inFocalZone = rect.top <= viewportH * 0.75 && rect.bottom >= 80;

      if (inFocalZone) {
        setIsVisible(true);
      } else if (rect.top > viewportH * 0.95 || rect.bottom < 30) {
        // Reset when user scrolls back up above or far below so animations replay seamlessly
        setIsVisible(false);
      }
    };

    handleCheck();
    window.addEventListener('scroll', handleCheck, { passive: true });
    window.addEventListener('resize', handleCheck, { passive: true });

    let lenisUnsub = null;
    const attachLenis = () => {
      if (window.__lenis && !lenisUnsub) {
        window.__lenis.on('scroll', handleCheck);
        lenisUnsub = () => {
          if (window.__lenis) window.__lenis.off('scroll', handleCheck);
        };
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      const poll = setInterval(() => {
        if (attachLenis()) clearInterval(poll);
      }, 100);
      setTimeout(() => clearInterval(poll), 2000);
    }

    return () => {
      window.removeEventListener('scroll', handleCheck);
      window.removeEventListener('resize', handleCheck);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  // Row 1: UI/UX Design, Creative Suite & Prototyping (from uploaded public/logos)
  const row1 = [
    { name: 'Figma', src: '/logos/figma-icon.svg' },
    { name: 'Adobe Illustrator', src: '/logos/adobe-illustrator-icon.svg' },
    { name: 'Adobe Photoshop', src: '/logos/adobe-photoshop-icon.svg' },
    { name: 'Canva', src: '/logos/canva-icon.svg' },
    { name: 'Framer', src: '/logos/framer-black-icon.svg' },
    { name: 'Webflow', src: '/logos/webflow-icon.svg' },
  ];

  // Row 2: AI Intelligence & Vibe Coding Tools (from uploaded public/logos)
  const row2 = [
    { name: 'Google Antigravity', src: '/logos/google-antigravity-icon.svg' },
    { name: 'Claude Code', src: '/logos/claude-code-icon.svg' },
    { name: 'Cursor AI', src: '/logos/cursor-ai-code-icon.svg' },
    { name: 'VS Code', src: '/logos/visual-studio-code-icon.svg' },
    { name: 'GitHub', src: '/logos/github-icon.svg' },
    { name: 'Hostinger', src: '/logos/hostinger-icon.svg' },
  ];

  // Row 3: Modern Web & Frameworks (from uploaded public/logos)
  const row3 = [
    { name: 'React JS', src: '/logos/react-js-icon.svg' },
    { name: 'Next.js', src: '/logos/nextjs-icon.svg' },
    { name: 'JavaScript', src: '/logos/javascript-programming-language-icon.svg' },
    { name: 'HTML5', src: '/logos/html-icon.svg' },
    { name: 'CSS3', src: '/logos/css-icon.svg' },
    { name: 'Duda', src: '/logos/Duda-01.svg' },
  ];

  // 4 sets guarantee seamless infinite looping across all screen sizes (up to 5K)
  const quadRow1 = [...row1, ...row1, ...row1, ...row1];
  const quadRow2 = [...row2, ...row2, ...row2, ...row2];
  const quadRow3 = [...row3, ...row3, ...row3, ...row3];

  const renderLogoItem = (item, index, rowId) => {
    // Domino ripple cascade delay
    const dominoDelay = `${(0.12 + (index % 12) * 0.08).toFixed(2)}s`;

    return (
      <div
        key={`${rowId}-${index}`}
        className="group relative flex items-center justify-center min-w-[76px] h-16 cursor-pointer select-none transition-opacity duration-300 group-hover/row:opacity-40 hover:!opacity-100"
      >
        {/* Layer 1: Domino Ripple Pop Entrance on Scroll */}
        <div
          className={`relative flex items-center justify-center ${
            isVisible ? 'animate-domino-pop' : 'opacity-0'
          }`}
          style={{
            animationDelay: dominoDelay,
          }}
        >
          {/* Layer 2: Interactive Card (Scale, Lift, Ambient Blue Halo) */}
          <div className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:drop-shadow-[0_12px_22px_rgba(0,72,222,0.2)]">
            <img 
              src={item.src} 
              alt={item.name} 
              className="w-9 h-9 max-h-9 max-w-9 object-contain select-none pointer-events-none" 
              loading="lazy"
            />
          </div>

          {/* Layer 3: Floating Sleek Tooltip on Hover */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 translate-y-1 group-hover:translate-y-0">
            <div className="bg-slate-900/95 text-white text-[10.5px] font-medium tracking-wide px-2.5 py-0.5 rounded-md shadow-md whitespace-nowrap backdrop-blur-sm border border-slate-800">
              {item.name}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      id="logos"
      className="py-14 bg-white overflow-hidden select-none relative"
    >
      <style>{`
        /* Eyebrow Title Entrance with Tracking Expand */
        @keyframes marquee-title-reveal {
          0% {
            opacity: 0;
            transform: translateY(-12px);
            letter-spacing: 0.38em;
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.25em;
            filter: blur(0px);
          }
        }
        .animate-marquee-title {
          opacity: 0;
          animation: marquee-title-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          will-change: transform, opacity, filter, letter-spacing;
        }

        /* Rows Cascade In on Scroll */
        @keyframes marquee-row-reveal {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .animate-marquee-row-1 {
          opacity: 0;
          animation: marquee-row-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          will-change: transform, opacity, filter;
        }
        .animate-marquee-row-2 {
          opacity: 0;
          animation: marquee-row-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
          will-change: transform, opacity, filter;
        }
        .animate-marquee-row-3 {
          opacity: 0;
          animation: marquee-row-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
          will-change: transform, opacity, filter;
        }

        /* Domino Ripple Pop: Staggered 3D Spring Bloom */
        @keyframes logo-domino-pop {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.78) rotate(-4deg);
            filter: blur(4px);
          }
          65% {
            transform: translateY(-5px) scale(1.06) rotate(1deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        .animate-domino-pop {
          animation: logo-domino-pop 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
      `}</style>

      {/* Section Eyebrow Title with Scroll Entrance */}
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className={`text-xs uppercase font-semibold text-slate-400 tracking-wider ${isVisible ? 'animate-marquee-title' : 'opacity-0'}`}>
          Tools &amp; Technologies I Design &amp; Build With: UI/UX, AI Workflows &amp; Modern Web
        </p>
      </div>

      {/* Marquee Wrapper with Smooth Left & Right Gradient Fade Edges */}
      <div className="relative flex flex-col gap-6 py-4">
        {/* Left & Right Soft Fade Masks for Infinite Horizon Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* Row 1 - UI/UX Design & Creative Tools (Left to Right) */}
        <div className={`relative overflow-hidden w-full ${isVisible ? 'animate-marquee-row-1' : 'opacity-0'}`}>
          <div className="animate-marquee-left flex items-center gap-14 md:gap-18 group/row">
            {quadRow1.map((item, index) => renderLogoItem(item, index, 'r1'))}
          </div>
        </div>

        {/* Row 2 - AI Intelligence & Vibe Coding Tools (Right to Left) */}
        <div className={`relative overflow-hidden w-full ${isVisible ? 'animate-marquee-row-2' : 'opacity-0'}`}>
          <div className="animate-marquee-right flex items-center gap-14 md:gap-18 group/row">
            {quadRow2.map((item, index) => renderLogoItem(item, index, 'r2'))}
          </div>
        </div>

        {/* Row 3 - Modern Web & Frontend Frameworks (Left to Right) */}
        <div className={`relative overflow-hidden w-full ${isVisible ? 'animate-marquee-row-3' : 'opacity-0'}`}>
          <div className="animate-marquee-left flex items-center gap-14 md:gap-18 group/row">
            {quadRow3.map((item, index) => renderLogoItem(item, index, 'r3'))}
          </div>
        </div>
      </div>
    </section>
  );
}
