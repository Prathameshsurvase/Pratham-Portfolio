import React, { useState, useEffect, useRef } from 'react';
import bannerImage from '../assets/different-minds-banner.png';

export default function DifferentMinds() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  // Scroll entrance trigger using IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth 60fps Mouse Parallax Tracking
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={sectionRef} 
      id="different-minds" 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[440px] sm:h-[520px] md:h-[580px] lg:h-[630px] xl:h-[660px] flex items-center justify-center overflow-hidden bg-slate-950 select-none group"
    >
      {/* Hardware-Accelerated Cinematic Animation Suite */}
      <style>{`
        /* 1. Cinematic Background Arrival: Depth Zoom & Optical De-Blur */
        @keyframes banner-bg-cinematic {
          0% {
            opacity: 0;
            transform: scale(1.12) translateY(24px);
            filter: blur(14px) brightness(1.25);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px) brightness(1);
          }
        }
        .animate-banner-bg-cinematic {
          animation: banner-bg-cinematic 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }

        /* 2. Continuous Ambient Breathing (Living Background) */
        @keyframes banner-ambient-drift {
          0%, 100% {
            transform: scale(1.02) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.045) translate3d(-6px, -4px, 0);
          }
        }
        .animate-ambient-drift {
          animation: banner-ambient-drift 16s ease-in-out infinite alternate;
        }

        /* 3. Luminous Specular Sheen Beam across Artwork */
        @keyframes specular-beam-sweep {
          0% {
            transform: translateX(-140%) skewX(-24deg);
            opacity: 0;
          }
          20% {
            opacity: 0.65;
          }
          70% {
            opacity: 0.45;
          }
          100% {
            transform: translateX(240%) skewX(-24deg);
            opacity: 0;
          }
        }
        .animate-specular-beam {
          animation: specular-beam-sweep 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          will-change: transform, opacity;
        }

        /* Continuous subtle shimmer every 10s */
        @keyframes continuous-sheen-sweep {
          0%, 65% {
            transform: translateX(-140%) skewX(-24deg);
            opacity: 0;
          }
          75% {
            opacity: 0.35;
          }
          85% {
            opacity: 0.25;
          }
          95%, 100% {
            transform: translateX(240%) skewX(-24deg);
            opacity: 0;
          }
        }
        .animate-continuous-sheen {
          animation: continuous-sheen-sweep 11s ease-in-out 3.5s infinite;
        }

        /* 4. Kinetic Split-Word Reveal for "DIFFERENT" & "MINDS" */
        @keyframes word-masked-reveal {
          0% {
            opacity: 0;
            transform: translateY(125%) rotateX(-18deg);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0%) rotateX(0deg);
            filter: blur(0px);
          }
        }
        .animate-word-different {
          opacity: 0;
          animation: word-masked-reveal 1.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
          will-change: transform, opacity, filter;
        }
        .animate-word-minds {
          opacity: 0;
          animation: word-masked-reveal 1.85s cubic-bezier(0.16, 1, 0.3, 1) 0.44s forwards;
          will-change: transform, opacity, filter;
        }

        /* 5. Electric Brand Energy Line (Expanding Center Laser Divider) */
        @keyframes energy-line-expand {
          0% {
            opacity: 0;
            transform: scaleX(0);
            box-shadow: 0 0 0px rgba(0, 72, 222, 0);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(0, 72, 222, 0.9), 0 0 35px rgba(56, 189, 248, 0.8);
          }
          100% {
            opacity: 0.85;
            transform: scaleX(1);
            box-shadow: 0 0 12px rgba(0, 72, 222, 0.6);
          }
        }
        .animate-energy-line {
          opacity: 0;
          animation: energy-line-expand 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.72s forwards;
          will-change: transform, opacity, box-shadow;
        }

        /* 6. Subtitle Dual-Phrase Staggered Glide */
        @keyframes sub-phrase-glide {
          0% {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .animate-sub-line-1 {
          opacity: 0;
          animation: sub-phrase-glide 1.7s cubic-bezier(0.16, 1, 0.3, 1) 0.85s forwards;
          will-change: transform, opacity, filter;
        }
        .animate-sub-line-2 {
          opacity: 0;
          animation: sub-phrase-glide 1.7s cubic-bezier(0.16, 1, 0.3, 1) 1.02s forwards;
          will-change: transform, opacity, filter;
        }

        /* 9. Title Specular Energy Flash */
        @keyframes title-specular-flash {
          0%, 75% {
            filter: drop-shadow(0 4px 22px rgba(0, 0, 0, 0.65));
          }
          88% {
            filter: drop-shadow(0 0 24px rgba(0, 72, 222, 0.8)) drop-shadow(0 0 45px rgba(56, 189, 248, 0.6)) drop-shadow(0 4px 22px rgba(0, 0, 0, 0.65));
          }
          100% {
            filter: drop-shadow(0 4px 22px rgba(0, 0, 0, 0.65));
          }
        }
        .animate-title-specular {
          animation: title-specular-flash 3.2s ease-in-out 1.2s forwards;
        }
      `}</style>

      {/* Background Graphic Layer with Interactive Depth Parallax */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: isHovered 
            ? `translate3d(${-mousePos.x * 12}px, ${-mousePos.y * 10}px, 0) scale(1.04)`
            : 'translate3d(0, 0, 0) scale(1)',
        }}
      >
        <div className={`w-full h-full ${isVisible ? 'animate-ambient-drift' : ''}`}>
          <img
            src={bannerImage}
            alt="Different Minds - Collaborative Teamwork"
            className={`w-full h-full object-cover object-center ${
              isVisible ? 'animate-banner-bg-cinematic' : 'opacity-0'
            }`}
            loading="lazy"
          />
        </div>

        {/* Luminous Specular Sheen Beam Sweeps */}
        {isVisible && (
          <>
            <div className="absolute inset-0 w-[45%] h-full bg-gradient-to-r from-transparent via-white/18 to-transparent pointer-events-none animate-specular-beam" />
            <div className="absolute inset-0 w-[35%] h-full bg-gradient-to-r from-transparent via-blue-200/12 to-transparent pointer-events-none animate-continuous-sheen" />
          </>
        )}

        {/* Balanced contrast overlay & radial vignette for crisp text legibility */}
        <div className="absolute inset-0 bg-slate-950/25 sm:bg-slate-950/20 backdrop-brightness-[0.94]" />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.38) 0%, rgba(15, 23, 42, 0.15) 55%, rgba(15, 23, 42, 0.48) 100%)',
          }}
        />
      </div>

      {/* Centered Typography Container with 3D Gyroscopic Perspective */}
      <div 
        className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center [perspective:1200px] transition-transform duration-500 ease-out"
        style={{
          transform: isHovered 
            ? `perspective(1200px) rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 7}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 5}px, 15px)`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
        }}
      >
        {/* Main Headline: DIFFERENT MINDS (Split-Word Kinetic 3D Cascade) */}
        <div className={`overflow-hidden pb-1 -mb-1 ${isVisible ? 'animate-title-specular' : ''}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold text-white tracking-normal uppercase leading-[1.08] flex items-center justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
            {/* Word 1: DIFFERENT */}
            <span className="inline-block overflow-hidden pb-2 -mb-2 align-bottom">
              <span className={`inline-block ${isVisible ? 'animate-word-different' : 'opacity-0'}`}>
                DIFFERENT
              </span>
            </span>

            {/* Word 2: MINDS */}
            <span className="inline-block overflow-hidden pb-2 -mb-2 align-bottom">
              <span className={`inline-block ${isVisible ? 'animate-word-minds' : 'opacity-0'}`}>
                MINDS
              </span>
            </span>
          </h2>
        </div>

        {/* Electric Brand Energy Divider Line (Laser Center Expansion) */}
        <div className="relative my-3 sm:my-4 flex items-center justify-center w-full">
          <div 
            className={`w-24 sm:w-32 md:w-36 h-[2px] bg-gradient-to-r from-transparent via-[#0048DE] to-transparent rounded-full ${
              isVisible ? 'animate-energy-line' : 'opacity-0'
            }`} 
          />
        </div>

        {/* Subtitle: 2 Balanced Lines with Staggered Upward Float */}
        <div className="text-white text-base sm:text-lg md:text-xl lg:text-[22px] font-semibold leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
          {/* Line 1 */}
          <div className="overflow-hidden pb-1 -mb-1">
            <p className={`m-0 ${isVisible ? 'animate-sub-line-1' : 'opacity-0'}`}>
              Bringing design, technology, and AI workflows together
            </p>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden pb-1 -mb-1">
            <p className={`mt-0.5 sm:mt-1 font-semibold text-white/95 ${isVisible ? 'animate-sub-line-2' : 'opacity-0'}`}>
              to build meaningful, human-centered digital experiences.
            </p>
          </div>
        </div>

      </div>

      {/* Subtle Bottom Ambient Gradient Blend */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
    </section>
  );
}
