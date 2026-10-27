import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import myCollageImg from '../assets/my-image-collage.jpeg';

export default function OurServices({ onServiceClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [tappedIndex, setTappedIndex] = useState(0);
  const sectionRef = useRef(null);

  // Precision Viewport Tracker: Only triggers when user actually scrolls into the section
  // Prevents premature completion while user is still viewing WorkExperience above
  useEffect(() => {
    const handleCheck = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;

      // Trigger when the section top has scrolled well into the focal viewport area
      // (52% from viewport top, guaranteeing WorkExperience pass has fully retracted and What I Do is in center view)
      const inFocalZone = rect.top <= viewportH * 0.52 && rect.bottom >= 140;

      if (inFocalZone) {
        setIsVisible(true);
      } else if (rect.top > viewportH * 0.78 || rect.bottom < 50) {
        // Reset when user scrolls back up above or completely past
        setIsVisible(false);
      }
    };

    handleCheck();
    window.addEventListener('scroll', handleCheck, { passive: true });
    window.addEventListener('resize', handleCheck, { passive: true });

    let lenisUnsub = null;
    if (window.__lenis) {
      window.__lenis.on('scroll', handleCheck);
      lenisUnsub = () => {
        if (window.__lenis) window.__lenis.off('scroll', handleCheck);
      };
    } else {
      const poll = setInterval(() => {
        if (window.__lenis) {
          window.__lenis.on('scroll', handleCheck);
          lenisUnsub = () => {
            if (window.__lenis) window.__lenis.off('scroll', handleCheck);
          };
          clearInterval(poll);
        }
      }, 200);
      setTimeout(() => clearInterval(poll), 2000);
    }

    return () => {
      window.removeEventListener('scroll', handleCheck);
      window.removeEventListener('resize', handleCheck);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  const services = [
    {
      title: 'UI/UX Designer',
      shortTitle: 'UI/UX Designer',
      description:
        'Moving rectangles in Figma for 6 hours just to have someone say: "Looks great, but can we make the logo bigger and add more pop?"',
      tags: ['Logo Bigger Pls', 'Auto-Layout Hell', 'Frame 492_Final_v2', '4px vs 8px Crisis'],
    },
    {
      title: 'Product Designer',
      shortTitle: 'Product Designer',
      description:
        'Turning a simple 2-click feature into an 8-week strategic roadmap with 64 design tokens that developers will immediately hardcode anyway.',
      tags: ['Hardcoded Anyway', 'Stakeholder Alignment', 'Design Token Bloat', 'Quarterly Roadmap'],
    },
    {
      title: 'Vibe Coding',
      shortTitle: 'Vibe Coding',
      description:
        'Aggressively smashing Tab in Cursor at 2 AM, praying to AI gods, and pretending I completely understand why that one useEffect fixed the entire app.',
      tags: ['Tab-Tab-Accept', 'Prompt & Inshallah', 'Works On My Machine', "Don't Touch That Div"],
    },
    {
      title: 'Graphic Designing',
      shortTitle: 'Graphic Design',
      description:
        'Refusing to open Photoshop or Illustrator because I do all my graphic design directly in Figma — and honestly, it just works out.',
      tags: ['Figma For Everything', 'Who Needs Illustrator', 'It Just Works', 'Pure Instinct'],
    },
    {
      title: 'Videography (Little Bit)',
      shortTitle: 'Videography',
      description:
        'Learned videography from Instagram reels and YouTube tutorials, shot exactly one property shoot and one product shoot, and added it to my portfolio.',
      tags: ['YouTube University', '1 Property Shoot', '1 Product Shoot', 'Insta Reel Certified'],
    },
  ];

  // Motion Variants for Section-Level Orchestrated Entrance
  const headerVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        delay: 0.12 + i * 0.09,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 45, y: 30, scale: 0.92 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} id="services" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[850px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(0,72,222,0.03),transparent_70%)] blur-2xl" />
      </div>

      {/* Hardware-Accelerated Animation Styles */}
      <style>{`
        /* Zero-Gravity Organic Floating Motion */
        @keyframes float-gentle-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.5deg); }
        }
        .animate-card-float {
          animation: float-gentle-bob 5.2s ease-in-out infinite;
          will-change: transform;
        }

        /* Subtle Ambient Card Glow Pulse */
        @keyframes card-glow-ambient {
          0%, 100% { filter: drop-shadow(0 14px 26px rgba(0, 72, 222, 0.10)); }
          50% { filter: drop-shadow(0 18px 34px rgba(0, 72, 222, 0.18)); }
        }
        .animate-card-ambient-glow {
          animation: card-glow-ambient 4.2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Kinetic Reveal when scrolled in */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-14 md:mb-18"
        >
          <div className="relative inline-block [perspective:1000px]">
            <h2 className="text-4xl sm:text-5xl md:text-[52px] font-normal text-slate-950 tracking-[-0.02em] leading-[1.18] inline-block">
              What I Do
            </h2>

            {/* Shrug Meme Doodle - anchored to right so heading remains dead-center */}
            <img 
              src="/Images/doodle-what-i-do.png" 
              alt="What I do shrug meme doodle" 
              className="absolute left-full top-1/2 -translate-y-[52%] ml-2 sm:ml-3 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain select-none cursor-pointer hover:scale-115 hover:rotate-3 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shrink-0"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))' }}
              title="What I Do ¯\_(ツ)_/¯"
            />
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-3.5 text-balance">
            Areas of focus spanning design, code, and creative media — hover over each for the unfiltered reality.
          </p>
        </motion.div>

        {/* 2-Column Split: Services List on Left, Aesthetic Compact Artwork on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column (cols 1-7): Clean Minimal Services List */}
          <div 
            className="lg:col-span-7 w-full border-t border-slate-200/80"
            onMouseLeave={() => setHoveredIndex(0)}
          >
            {services.map((service, index) => {
              const isExpanded =
                hoveredIndex === index || (hoveredIndex === null && tappedIndex === index);

              return (
                <motion.div
                  key={service.title}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => {
                    setTappedIndex(tappedIndex === index ? null : index);
                    setHoveredIndex(index);
                  }}
                  className="group relative cursor-pointer py-4.5 sm:py-5 border-b border-slate-200/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 pr-3">
                      {/* Clean Title */}
                      <h3
                        className={`text-lg sm:text-xl md:text-[22px] font-normal tracking-tight transition-colors duration-200 ${
                          isExpanded
                            ? 'text-[#0048DE]'
                            : 'text-slate-900 group-hover:text-[#0048DE]'
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Expandable Content */}
                      <div
                        className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                          isExpanded
                            ? 'grid-rows-[1fr] opacity-100 mt-2 sm:mt-2.5'
                            : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                        }`}
                      >
                        <div className="overflow-hidden pt-0.5">
                          {/* Short, to-the-point description */}
                          <p className="text-slate-600 text-xs sm:text-[14px] font-normal leading-relaxed max-w-[520px]">
                            {service.description}
                          </p>

                          {/* Minimal Tags */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5 text-[11px] sm:text-xs text-slate-400 font-medium">
                            {service.tags.map((tag, i) => (
                              <React.Fragment key={tag}>
                                <span className="text-slate-500 hover:text-slate-800 transition-colors">{tag}</span>
                                {i < service.tags.length - 1 && <span className="text-slate-300">/</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Minimal Arrow CTA Button with Electric Neon Lime (#C3FF48) Accent */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onServiceClick) onServiceClick(service);
                      }}
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0 cursor-pointer focus:outline-none mt-0.5 ${
                        isExpanded
                          ? 'bg-[#C3FF48] text-slate-950 font-bold shadow-[0_0_18px_rgba(195,255,72,0.45)] scale-105'
                          : 'text-slate-400 group-hover:text-slate-950 group-hover:bg-[#C3FF48] group-hover:shadow-[0_0_12px_rgba(195,255,72,0.35)]'
                      }`}
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? 'translate-x-0.5 -translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`}
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column (cols 8-12): Compact Layered Editorial Studio Card with Entrance Pop */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-center items-center mt-6 lg:mt-0">
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="relative w-full max-w-[260px] sm:max-w-[275px] md:max-w-[285px] lg:max-w-[290px]"
            >
              {/* Zero-Gravity Organic Floating Motion */}
              <div className="animate-card-float group/showcase relative">
                
                {/* Layer 1: Ambient Soft Glow */}
                <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-tr from-[#0048DE]/20 via-indigo-500/15 to-sky-400/15 blur-xl opacity-70 animate-card-ambient-glow" />

                {/* Layer 2: Tilted Blueprint Ghost Card Behind */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-slate-100/60 border border-blue-200/50 -rotate-3 transition-transform duration-500 group-hover/showcase:-rotate-5 shadow-sm" />

                {/* Layer 3: Main Artwork Frame */}
                <div className="relative rounded-2xl bg-white p-2.5 shadow-[0_20px_45px_-12px_rgba(0,72,222,0.16),0_10px_20px_-8px_rgba(15,23,42,0.06)] border border-slate-200/90 rotate-1 group-hover/showcase:rotate-0 transition-transform duration-500 ease-out">
                  
                  {/* Top Bar: macOS Window Header */}
                  <div className="flex items-center px-2 pt-1 pb-2 border-b border-slate-100 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400/80 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80 inline-block" />
                    </div>
                  </div>

                  {/* The Image with constrained height and soft inner radius */}
                  <div className="relative rounded-xl overflow-hidden mt-2 bg-slate-900 shadow-inner">
                    <img
                      src={myCollageImg}
                      alt="Pratham Survase - Workstation Collage"
                      className="w-full h-[320px] sm:h-[350px] object-cover object-top select-none transition-transform duration-700 ease-out group-hover/showcase:scale-[1.03]"
                      loading="lazy"
                    />

                    {/* Subtle vignette gradient overlay at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Bar: Active Service Indicator */}
                  <div className="flex items-center justify-center pt-2.5 px-1.5 text-[11px] font-mono">
                    <span className="text-[#0048DE] font-medium bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 text-[10.5px]">
                      {hoveredIndex !== null ? services[hoveredIndex].shortTitle : 'Design & Code'}
                    </span>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
