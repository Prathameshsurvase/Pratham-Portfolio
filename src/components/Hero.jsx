import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import DiaTextReveal from './DiaTextReveal';

const PILLAR_COUNT = 41;
const CENTER_INDEX = Math.floor(PILLAR_COUNT / 2); // 20

// High-contrast, tactile frosted glass micro-noise texture
const FROSTED_NOISE_SVG = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.10  0 0 0 0 0.25  0 0 0 0 0.50  0 0 0 0.90 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

const ROLES = [
  'UI/UX Designer',
  'Product Designer',
  'Graphic Designer',
  'Vibe Coder',
];

const DIA_COLORS = ['#c679c4', '#fa3d1d', '#ffb005', '#e1e1fe', '#0358f7'];
const DIA_TEXT = ['portfolio.'];

const FONT_CONFIG = {
  urban: {
    fontFamily: "'Urban Graffiti', cursive, sans-serif",
    viewBox: '0 0 586 130',
    textY: 96,
    fontSize: 100,
    strokes: [
      // P: center 70.1
      {
        d: 'M 52,18 L 52,104 M 52,24 C 92,24 100,42 100,56 C 100,72 88,76 52,76',
        len: 260,
        duration: 350,
        delay: 150,
        strokeWidth: 56,
      },
      // O: center 129.6 (full closed loop reaching top Y=16, len 300)
      {
        d: 'M 129,16 C 90,18 86,102 129,104 C 172,102 168,18 129,16',
        len: 300,
        duration: 320,
        delay: 360,
        strokeWidth: 62,
      },
      // R: center 194.1
      {
        d: 'M 175,18 L 175,104 M 175,24 C 215,24 222,42 222,56 C 222,70 208,74 175,74 L 225,104',
        len: 290,
        duration: 360,
        delay: 570,
        strokeWidth: 56,
      },
      // T: center 262.7
      {
        d: 'M 230,24 L 296,24 M 263,24 L 263,104',
        len: 190,
        duration: 270,
        delay: 800,
        strokeWidth: 56,
      },
      // F: center 321.4
      {
        d: 'M 308,18 L 308,104 M 308,24 L 354,24 M 308,60 L 348,60',
        len: 230,
        duration: 300,
        delay: 990,
        strokeWidth: 56,
      },
      // O: center 376.1 (full closed loop reaching top Y=16, len 300)
      {
        d: 'M 376,16 C 338,18 334,102 376,104 C 418,102 414,18 376,16',
        len: 300,
        duration: 320,
        delay: 1180,
        strokeWidth: 62,
      },
      // L: center 433.4
      {
        d: 'M 416,18 L 416,104 L 462,104',
        len: 180,
        duration: 250,
        delay: 1390,
        strokeWidth: 56,
      },
      // I: center 474.4 (strokeWidth 32: perfectly tailored to I's narrow width)
      {
        d: 'M 474,18 L 474,104',
        len: 110,
        duration: 210,
        delay: 1550,
        strokeWidth: 32,
      },
      // O: center 516.6 (full closed loop reaching top Y=16, len 300)
      {
        d: 'M 517,16 C 478,18 474,102 517,104 C 560,102 556,18 517,16',
        len: 300,
        duration: 320,
        delay: 1680,
        strokeWidth: 62,
      },
    ],
  },
  dela: {
    fontFamily: "'Dela Gothic One', cursive, sans-serif",
    viewBox: '0 0 880 130',
    textY: 96,
    fontSize: 90,
    strokes: [
      {
        d: 'M 100,22 L 100,98 M 100,28 C 146,28 158,45 158,58 C 158,74 142,78 100,78',
        len: 260,
        duration: 360,
        delay: 150,
      },
      {
        d: 'M 219,24 C 177,28 172,94 219,97 C 266,94 261,28 219,24',
        len: 240,
        duration: 340,
        delay: 370,
      },
      {
        d: 'M 312,22 L 312,98 M 312,28 C 358,28 370,45 370,58 C 370,74 353,78 312,78 L 373,98',
        len: 280,
        duration: 370,
        delay: 580,
      },
      {
        d: 'M 397,28 L 479,28 M 438,28 L 438,98',
        len: 200,
        duration: 280,
        delay: 810,
      },
      {
        d: 'M 502,22 L 502,98 M 502,28 L 562,28 M 502,60 L 552,60',
        len: 230,
        duration: 310,
        delay: 1000,
      },
      {
        d: 'M 619,24 C 577,28 572,94 619,97 C 666,94 661,28 619,24',
        len: 240,
        duration: 340,
        delay: 1200,
      },
      {
        d: 'M 708,22 L 708,97 L 768,97',
        len: 180,
        duration: 260,
        delay: 1420,
      },
      {
        d: 'M 781,24 L 781,98',
        len: 110,
        duration: 210,
        delay: 1590,
      },
      {
        d: 'M 863,24 C 821,28 816,94 863,97 C 910,94 905,28 863,24',
        len: 240,
        duration: 340,
        delay: 1720,
      },
    ],
  },
};

export default function Hero({ onExploreClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  // const [selectedFont, setSelectedFont] = useState('urban'); // Temporarily commented out with graffiti

  // Continuous auto-rotation for the role ticker (resilient to scroll and tab changes)
  useEffect(() => {
    let intervalId = null;

    const startInterval = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        setCurrentIndex((curr) => {
          setPrevIndex(curr);
          return (curr + 1) % ROLES.length;
        });
      }, 2800);
    };

    startInterval();

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        startInterval();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Clean transition cleanup: resets prevIndex after animation completes (500ms)
  useEffect(() => {
    if (prevIndex === null) return;
    const timer = setTimeout(() => {
      setPrevIndex(null);
    }, 500);

    return () => clearTimeout(timer);
  }, [prevIndex]);

  return (
    <section id="home" className="relative min-h-[720px] md:min-h-[820px] -mt-24 sm:-mt-28 pt-24 sm:pt-28 flex items-center justify-center overflow-hidden bg-white">
      {/* Direct embedded keyframes for zero-latency 60fps hardware-accelerated motion */}
      <style>{`
        @keyframes hero-flow-left {
          0% {
            transform: translate3d(-60px, 15px, 0) scale(0.96);
            opacity: 0.82;
          }
          50% {
            transform: translate3d(140px, -30px, 0) scale(1.14);
            opacity: 1;
          }
          100% {
            transform: translate3d(-60px, 15px, 0) scale(0.96);
            opacity: 0.82;
          }
        }
        @keyframes hero-flow-anchor {
          0% {
            transform: translate3d(-40px, -20px, 0) scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(80px, 25px, 0) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translate3d(-40px, -20px, 0) scale(0.95);
            opacity: 0.8;
          }
        }
        @keyframes hero-flow-center {
          0% {
            transform: translate3d(50px, -20px, 0) scale(1.02);
            opacity: 0.82;
          }
          50% {
            transform: translate3d(-130px, 30px, 0) scale(1.16);
            opacity: 1;
          }
          100% {
            transform: translate3d(50px, -20px, 0) scale(1.02);
            opacity: 0.82;
          }
        }
        @keyframes hero-flow-right {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
            opacity: 0.76;
          }
          50% {
            transform: translate3d(-110px, -35px, 0) scale(1.12);
            opacity: 0.98;
          }
          100% {
            transform: translate3d(0px, 0px, 0) scale(1);
            opacity: 0.76;
          }
        }
        @keyframes hero-pillar-light {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.98;
          }
        }

        /* Reload Entrance Animations (Slow, Unhurried & Luxurious) */
        @keyframes hero-text-reveal {
          0% {
            opacity: 0;
            transform: translateY(115%) rotateX(-12deg);
            filter: blur(7px);
          }
          100% {
            opacity: 1;
            transform: translateY(0%) rotateX(0deg);
            filter: blur(0px);
          }
        }
        .animate-hero-text-reveal {
          opacity: 0;
          animation: hero-text-reveal 1.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }

        @keyframes hero-pixel-shine {
          0%, 30% {
            filter: drop-shadow(0 0 0px rgba(0, 72, 222, 0));
          }
          65% {
            filter: drop-shadow(0 0 18px rgba(0, 72, 222, 0.45)) drop-shadow(0 0 32px rgba(56, 189, 248, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 0px rgba(0, 72, 222, 0));
          }
        }
        .animate-hero-pixel-reveal {
          opacity: 0;
          animation: 
            hero-text-reveal 1.85s cubic-bezier(0.16, 1, 0.3, 1) 550ms forwards,
            hero-pixel-shine 2.8s ease-in-out 1.5s forwards;
          will-change: transform, opacity, filter;
        }

        @keyframes hero-cta-reveal {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes hero-badge-reveal {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-hero-badge {
          opacity: 0;
          animation: hero-badge-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards;
          will-change: transform, opacity;
        }

        /* Smooth Non-Clipping Concurrent Role Slide Keyframes */
        @keyframes role-slide-out {
          0% {
            transform: translateY(0%) scale(1);
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            transform: translateY(-115%) scale(0.96);
            opacity: 0;
            filter: blur(3px);
          }
        }

        @keyframes role-slide-in {
          0% {
            transform: translateY(115%) scale(0.96);
            opacity: 0;
            filter: blur(3px);
          }
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
            filter: blur(0px);
          }
        }

        .animate-role-slide-out {
          animation: role-slide-out 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }

        .animate-role-slide-in {
          animation: role-slide-in 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }

        .animate-hero-cta {
          opacity: 0;
          animation: hero-cta-reveal 1.55s cubic-bezier(0.16, 1, 0.3, 1) 1.95s forwards;
          will-change: transform, opacity;
        }

        @keyframes hero-pillars-entrance {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.97);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }
        .animate-hero-pillars {
          opacity: 0;
          animation: hero-pillars-entrance 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
          will-change: transform, opacity;
        }

        @keyframes hero-orbs-entrance {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-hero-orbs {
          opacity: 0;
          animation: hero-orbs-entrance 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: opacity;
        }

        @keyframes graffiti-entrance {
          0% {
            opacity: 0;
            transform: scale(0.96);
            filter: blur(4px);
          }
          100% {
            opacity: 0.88;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        .animate-graffiti-bg {
          animation: graffiti-entrance 2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          will-change: transform, opacity, filter;
        }

        /* Genuine Stroke-by-Stroke Handwriting Keyframes */
        @keyframes handwrite-draw {
          0% {
            stroke-dashoffset: var(--stroke-len);
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-handwrite-mask {
          stroke-dasharray: var(--stroke-len);
          stroke-dashoffset: var(--stroke-len);
          animation: handwrite-draw var(--duration) cubic-bezier(0.35, 0, 0.25, 1) var(--delay) forwards;
          will-change: stroke-dashoffset;
        }

        @keyframes mask-full-reveal {
          0%, 88% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-mask-full-reveal {
          opacity: 0;
          animation: mask-full-reveal 2.25s ease-out forwards;
        }
      `}</style>

      {/* Dynamic visibly moving gradient elements behind the fluted pillars - seamlessly blended */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none animate-hero-orbs">
        {/* Soft ambient base glow - light celestial airy wash */}
        <div 
          className="absolute left-[38%] -translate-x-1/2 top-[26%] w-[1020px] h-[500px] bg-gradient-to-r from-blue-400/5 via-sky-300/7 to-indigo-400/03 rounded-full blur-[110px] pointer-events-none animate-subtle-glow" 
        />

        {/* Far-Left Anchor Glow - soft light celestial blue */}
        <div className="absolute -left-[14%] sm:-left-[8%] md:-left-[4%] top-[2%] pointer-events-none">
          <div 
            className="w-[500px] md:w-[640px] h-[560px] md:h-[720px] rounded-full blur-[60px]"
            style={{
              background: 'radial-gradient(circle at 45% 38%, rgba(56, 140, 255, 0.11) 0%, rgba(56, 189, 248, 0.07) 42%, rgba(147, 197, 253, 0.03) 68%, transparent 88%)',
              animation: 'hero-flow-anchor 5.5s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Visible Moving Element 1: Dynamic Left Gliding Orb - light & soft */}
        <div className="absolute -left-[6%] sm:-left-[2%] md:left-[2%] lg:left-[4%] top-[6%] pointer-events-none">
          <div 
            className="w-[520px] md:w-[640px] h-[500px] md:h-[640px] rounded-full blur-[56px]"
            style={{
              background: 'radial-gradient(circle at 40% 36%, rgba(56, 140, 255, 0.12) 0%, rgba(56, 189, 248, 0.075) 42%, rgba(147, 197, 253, 0.035) 68%, transparent 88%)',
              animation: 'hero-flow-left 5s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Visible Moving Element 2: Left-Center Gliding Orb */}
        <div className="absolute left-[24%] sm:left-[28%] md:left-[32%] -translate-x-1/2 top-[30%] pointer-events-none">
          <div 
            className="w-[480px] md:w-[620px] h-[320px] md:h-[420px] rounded-full blur-[54px]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.095) 0%, rgba(56, 189, 248, 0.06) 40%, rgba(147, 197, 253, 0.025) 66%, transparent 88%)',
              animation: 'hero-flow-center 6.5s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Visible Moving Element 3: Right Gliding Orb */}
        <div className="absolute right-[4%] sm:right-[8%] md:right-[12%] top-[8%] pointer-events-none">
          <div 
            className="w-[420px] md:w-[540px] h-[440px] md:h-[580px] rounded-full blur-[52px]"
            style={{
              background: 'radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.085) 0%, rgba(56, 189, 248, 0.055) 40%, rgba(147, 197, 253, 0.025) 66%, transparent 88%)',
              animation: 'hero-flow-right 6s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      </div>

      {/* Fluted Pillars in U-Shape - light, clearly visible 3D glass ribs with bright highlights */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        {/* Array of 41 fluted pillars matching original clean blue fluted glass aesthetics */}
        <div className="flex items-center justify-center shrink-0 z-0 animate-hero-pillars">
          {Array.from({ length: PILLAR_COUNT }).map((_, i) => {
            const d = Math.abs(i - CENTER_INDEX);
            
            // Central dip to keep headline area crisp and readable
            const centerProgress = Math.min(1, d / 12);
            const centerDip = (1 - Math.pow(centerProgress, 1.4)) * 125;

            // Outer flanks: left and right pillars extend significantly longer from the top
            const isOuter = d >= 5;
            const outerRatio = isOuter ? (d - 5) / (CENTER_INDEX - 5) : 0;

            // Rhythmic organ-pipe pattern: "some" pillars on left and right stretch noticeably higher
            const staggerPattern = [0, 45, 15, 75, 25, 100, 45, 125, 60, 145, 75, 160, 90, 175, 105];
            const staggerIdx = Math.min(staggerPattern.length - 1, Math.max(0, d - 5));
            const staggerBonus = isOuter ? staggerPattern[staggerIdx] : 0;

            // Extra top reach: outer pillars grow upward while remaining grounded
            const extraTopReach = outerRatio * 75 + staggerBonus * 0.85;
            const pillarHeight = 540 + extraTopReach;
            const shiftY = centerDip - (extraTopReach / 2) - 15;

            // Balanced natural opacity across width
            const opacity = Math.max(0.74, 0.92 - Math.pow(d / CENTER_INDEX, 3) * 0.20);

            return (
              <div
                key={i}
                className="relative w-[84px] sm:w-[90px] shrink-0 pointer-events-none overflow-hidden"
                style={{
                  height: `${pillarHeight}px`,
                  transform: `translateY(${shiftY}px)`,
                  opacity,
                  animation: 'hero-pillar-light 4.5s ease-in-out infinite',
                  animationDelay: `${(i - CENTER_INDEX) * 0.08}s`,
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.0) 3%, rgba(0, 0, 0, 0.22) 12%, rgba(0, 0, 0, 0.70) 26%, rgba(0, 0, 0, 0.86) 50%, rgba(0, 0, 0, 0.70) 74%, rgba(0, 0, 0, 0.22) 88%, rgba(0, 0, 0, 0.0) 97%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.0) 3%, rgba(0, 0, 0, 0.22) 12%, rgba(0, 0, 0, 0.70) 26%, rgba(0, 0, 0, 0.86) 50%, rgba(0, 0, 0, 0.70) 74%, rgba(0, 0, 0, 0.22) 88%, rgba(0, 0, 0, 0.0) 97%, transparent 100%)',
                }}
              >
                {/* 1. Base Fluted Glass Gradient (blurred for smooth refraction) */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(56, 140, 255, 0.085) 0%, rgba(96, 165, 250, 0.05) 22%, rgba(224, 242, 254, 0.02) 48%, rgba(255, 255, 255, 0.46) 74%, rgba(56, 140, 255, 0.095) 100%)',
                    filter: 'blur(1.2px)',
                  }}
                />

                {/* 2. Refined frosted noise grain layer (unblurred) */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-32 mix-blend-multiply"
                  style={{
                    backgroundImage: `url("${FROSTED_NOISE_SVG}")`,
                    backgroundRepeat: 'repeat',
                  }}
                />

                {/* 3. Subtle specular glass sheen highlight */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("${FROSTED_NOISE_SVG}")`,
                    backgroundRepeat: 'repeat',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BACKGROUND: Authentic Hand-Written "PORTFOLIO" in Brand Blue (#0048DE)
          (Temporarily commented out - do not delete, will revisit later)
          ========================================================================= */}
      {/*
      <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 flex flex-col items-center justify-end overflow-hidden pointer-events-none select-none z-10 px-4">
        {(() => {
          const cfg = FONT_CONFIG[selectedFont] || FONT_CONFIG.urban;
          return (
            <svg
              key={selectedFont}
              viewBox={cfg.viewBox}
              className="w-[90vw] sm:w-[84vw] md:w-[74vw] lg:w-[680px] xl:w-[740px] h-auto overflow-visible select-none origin-bottom transition-all duration-300 mx-auto"
              style={{
                filter: 'drop-shadow(0 8px 32px rgba(0, 72, 222, 0.20))',
              }}
            >
              <defs>
                <mask id={`mask-hw-${selectedFont}`}>
                  {cfg.strokes.map((stroke, sIdx) => (
                    <path
                      key={`s-${sIdx}`}
                      d={stroke.d}
                      fill="none"
                      stroke="white"
                      strokeWidth={stroke.strokeWidth || 56}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-handwrite-mask"
                      style={{
                        '--stroke-len': stroke.len,
                        '--duration': `${stroke.duration}ms`,
                        '--delay': `${stroke.delay}ms`,
                      }}
                    />
                  ))}
                  // Safety full reveal: ensures 100% of every letter outline, loop, and flourish is completely revealed once written
                  <rect width="100%" height="100%" fill="white" className="animate-mask-full-reveal" />
                </mask>
              </defs>

              // The full word rendered as pure unified text, perfectly centered with normal kerning
              <text
                x="50%"
                y={cfg.textY}
                textAnchor="middle"
                fill="#0048DE"
                fontSize={cfg.fontSize}
                fontFamily={cfg.fontFamily}
                letterSpacing="normal"
                mask={`url(#mask-hw-${selectedFont})`}
              >
                PORTFOLIO
              </text>
            </svg>
          );
        })()}
      </div>
      */}

      {/* =========================================================================
          FOREGROUND: Headline, Role Badge, and CTA Button
          ========================================================================= */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-20 -translate-y-2 sm:-translate-y-4 md:-translate-y-5 text-center z-20">
        
        {/* Status / Role Badge: Clean Neutral Frosted Glass Capsule with smooth role rotation */}
        <div 
          className="mb-5 sm:mb-6 inline-flex items-center justify-center gap-x-2 sm:gap-x-2.5 px-3 sm:px-3.5 py-1 rounded-full transition-all duration-300 select-none animate-hero-badge cursor-default group/badge"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow:
              '0 4px 20px -2px rgba(15, 23, 42, 0.07), 0 2px 6px -1px rgba(15, 23, 42, 0.03), inset 0 1px 1px 0 rgba(255, 255, 255, 1)',
          }}
        >
          {/* Animated Role Title Slot */}
          <div className="relative inline-flex items-center justify-center h-[26px] sm:h-[28px] overflow-hidden min-w-[102px] sm:min-w-[114px] px-1">
            {prevIndex !== null && (
              <span 
                key={`badge-prev-${prevIndex}`}
                className="absolute inset-0 flex items-center justify-center text-[13.5px] sm:text-[14.5px] font-medium text-slate-800 tracking-[-0.015em] whitespace-nowrap animate-role-slide-out pointer-events-none"
              >
                {ROLES[prevIndex]}
              </span>
            )}
            <span 
              key={`badge-curr-${currentIndex}`}
              className={`flex items-center justify-center text-[13.5px] sm:text-[14.5px] font-medium text-slate-800 tracking-[-0.015em] whitespace-nowrap ${
                prevIndex !== null ? 'animate-role-slide-in' : ''
              }`}
            >
              {ROLES[currentIndex]}
            </span>
          </div>
        </div>

        {/* Main Title with staggered line-by-line masked text entrance on page reload */}
        <h1 className="text-4xl sm:text-5xl md:text-[58px] lg:text-[64px] font-normal text-slate-950 tracking-[-0.015em] leading-[1.22] md:leading-[1.24] max-w-5xl mx-auto [perspective:1000px]">
          <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
            <span className="inline-block animate-hero-text-reveal" style={{ animationDelay: '300ms' }}>
              Hey, I'm
            </span>
          </span>{' '}
          <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
            <span 
              className="font-pixel text-[#0048DE] font-normal tracking-normal inline-block text-[0.98em] align-baseline animate-hero-pixel-reveal"
            >
              Pratham.
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2 mt-1 sm:mt-2">
            <span className="inline-block animate-hero-text-reveal" style={{ animationDelay: '850ms' }}>
              Welcome to my{' '}
              <DiaTextReveal
                textItems={DIA_TEXT}
                textColor="#020617"
                colors={DIA_COLORS}
                duration={1.4}
                delay={1.5}
              />
            </span>
          </span>
        </h1>

        {/* Explore More CTA Button with smooth entrance reveal */}
        <div className="mt-11 sm:mt-14 flex justify-center animate-hero-cta">
          <div className="relative inline-block group">
            {/* Peeking Spy Doodle (Hiding behind the button, looking sideways towards 'Explore My Work') */}
            <img 
              src="/Images/doodle-spy.png" 
              alt="Peeking spy doodle" 
              className="absolute bottom-[calc(100%-3px)] left-5 sm:left-7 w-13 sm:w-15 md:w-16 h-auto object-contain pointer-events-none select-none z-10 translate-y-3 sm:translate-y-3.5 group-hover:translate-y-0 transition-transform duration-300 ease-out"
            />
            <button
              onClick={onExploreClick}
              className="relative z-20 inline-flex items-center gap-2.5 bg-[#0048DE] hover:bg-[#003dc4] text-white px-7 py-3 rounded-lg text-sm sm:text-[15px] font-medium transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-blue-600/20 active:scale-98 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      {/* Quick Compare Toggle: Urban Graffiti vs Dela Gothic One (Commented out for now) */}
      {/*
      <div className="absolute bottom-2.5 right-3 sm:right-6 z-30 flex items-center gap-1.5 p-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md">
        <button
          onClick={() => setSelectedFont('urban')}
          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-150 cursor-pointer ${
            selectedFont === 'urban'
              ? 'bg-[#0048DE] text-white font-semibold shadow-sm scale-105'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Urban Graffiti (Active)
        </button>
        <button
          onClick={() => setSelectedFont('dela')}
          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-150 cursor-pointer ${
            selectedFont === 'dela'
              ? 'bg-[#0048DE] text-white font-semibold shadow-sm scale-105'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Dela Gothic One
        </button>
      </div>
      */}
    </section>
  );
}
