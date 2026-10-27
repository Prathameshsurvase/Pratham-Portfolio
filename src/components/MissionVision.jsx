import React, { useState, useEffect, useRef, useCallback } from 'react';
import mountainImg from '../assets/Mission.png';
import lightbulbImg from '../assets/Vission.png';

export default function MissionVision() {
  // activeTab: 0 = Mission, 1 = Vision
  const [activeTab, setActiveTab] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [cubeHeight, setCubeHeight] = useState(440);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const lastScrollY = useRef(0);
  const isUserClicking = useRef(false);
  const clickLockTimeout = useRef(null);
  const lastZoneRef = useRef(0);

  // Measure dynamic height for precise 3D translateZ depth (H / 2)
  useEffect(() => {
    const updateDimensions = () => {
      if (cubeRef.current) {
        setCubeHeight(cubeRef.current.offsetHeight || 440);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Entrance visibility observer
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Direct Click Rotation: Instant, smooth, and 100% reliable
  const rotateTo = useCallback((targetTab) => {
    if (clickLockTimeout.current) {
      clearTimeout(clickLockTimeout.current);
    }
    isUserClicking.current = true;
    setActiveTab(targetTab);
    setRotationAngle(targetTab === 1 ? 90 : 0);

    // Keep scroll listener from immediately reverting user's choice
    clickLockTimeout.current = setTimeout(() => {
      isUserClicking.current = false;
    }, 2500);
  }, []);

  // Scroll Trigger: Automatically triggers 3D cube rotation only when crossing zone boundaries
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY.current;
          lastScrollY.current = currentY;

          // If the user recently clicked a tab, don't let scroll override their manual choice
          if (isUserClicking.current) {
            ticking = false;
            return;
          }

          // Trigger zones:
          // Crossing threshold when top of section reaches 35% of viewport
          const triggerThreshold = windowHeight * 0.35;
          const currentZone = (rect.top <= triggerThreshold && rect.bottom >= windowHeight * 0.25) ? 1 : 0;

          // Only trigger on crossing the zone boundary
          if (currentZone !== lastZoneRef.current) {
            lastZoneRef.current = currentZone;
            if (currentZone === 1 && scrollingDown) {
              setActiveTab(1);
              setRotationAngle(90);
            } else if (currentZone === 0 && !scrollingDown) {
              setActiveTab(0);
              setRotationAngle(0);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickLockTimeout.current) {
        clearTimeout(clickLockTimeout.current);
      }
    };
  }, []);

  // Wheel trigger over the card (smooth interaction)
  const handleWheel = (e) => {
    if (isUserClicking.current) return;
    if (Math.abs(e.deltaY) < 35) return;
    if (e.deltaY > 0 && activeTab === 0) {
      rotateTo(1);
    } else if (e.deltaY < 0 && activeTab === 1) {
      rotateTo(0);
    }
  };

  const halfDepth = cubeHeight / 2;

  return (
    <section 
      ref={sectionRef} 
      id="mission-vision" 
      onWheel={handleWheel}
      className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden select-none"
    >
      {/* 3D Keyframe Animations (strictly without filter to preserve 3D hit testing) */}
      <style>{`
        /* Card Section Entrance */
        @keyframes cube-container-entrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        .animate-cube-entrance {
          animation: cube-container-entrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* 3D Perspective Viewport */}
        <div 
          className={`relative w-full [perspective:2200px] ${
            isVisible ? 'animate-cube-entrance' : 'opacity-0'
          }`}
        >
          {/* 3D Cuboid Perspective Viewport */}
          <div
            ref={cubeRef}
            className="relative w-full h-[460px] sm:h-[440px] md:h-[430px] lg:h-[420px] [transform-style:preserve-3d]"
          >
            
            {/* FACE 0: MISSION */}
            <div
              className={`absolute inset-0 w-full h-full bg-[#0139cc] text-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl [backface-visibility:hidden] flex flex-col justify-between transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === 0 ? 'pointer-events-auto z-20 opacity-100' : 'pointer-events-none z-10 opacity-0'
              }`}
              style={{
                transform: `rotateX(${activeTab === 0 ? 0 : 90}deg) translateZ(${halfDepth}px)`,
              }}
            >
              {/* Halftone & Subtle Light Sheen Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/15 via-transparent to-white/10" />

              {/* Main Content Grid */}
              <div className="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                
                {/* Upper Area: Heading + Paragraph */}
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] items-start gap-4 md:gap-8">
                  {/* Active Heading: Design Craft */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold text-white tracking-tight leading-none">
                      Design Craft
                    </h3>
                  </div>

                  {/* Paragraph Text */}
                  <div className="max-w-xl md:max-w-2xl pr-0 md:pr-48 lg:pr-64">
                    <p className="text-white text-sm sm:text-base md:text-[15px] lg:text-[16px] leading-relaxed font-normal text-white/95">
                      I approach every project with user-first empathy, systematic wireframing, and scalable Figma component architectures. My priority is always clarity, ergonomic interaction, and measurable retention — transforming complex functional requirements into digital products that feel effortless and intuitive.
                    </p>
                  </div>
                </div>

                {/* Horizontal Divider Line */}
                <div className="relative w-full my-auto py-2">
                  <div className="w-full h-[1px] bg-white/20" />
                </div>

                {/* Lower Area: Inactive Clickable Tab (AI Workflows) */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      rotateTo(1);
                    }}
                    className="group/btn text-left focus:outline-none cursor-pointer py-2 pr-6 -ml-2 pl-2 rounded-xl hover:bg-white/10 transition-all duration-200 relative z-30 pointer-events-auto"
                    aria-label="Click to switch to AI Workflows"
                  >
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/40 group-hover/btn:text-white transition-colors duration-300 inline-block">
                      AI Workflows
                    </span>
                  </button>
                </div>

              </div>

              {/* Mountain Illustration Positioned on Right (Original public/Images/Mission.png) */}
              <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 w-[270px] sm:w-[320px] md:w-[370px] lg:w-[410px] flex items-end justify-end">
                <img
                  src={mountainImg}
                  alt="Mission Achievement Mountain"
                  className="w-full h-auto object-contain object-bottom-right pointer-events-none"
                />
              </div>
            </div>

            {/* FACE 1: VISION */}
            <div
              className={`absolute inset-0 w-full h-full bg-[#0139cc] text-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl [backface-visibility:hidden] flex flex-col justify-between transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === 1 ? 'pointer-events-auto z-20 opacity-100' : 'pointer-events-none z-10 opacity-0'
              }`}
              style={{
                transform: `rotateX(${activeTab === 1 ? 0 : -90}deg) translateZ(${halfDepth}px)`,
              }}
            >
              {/* Halftone & Subtle Light Sheen Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/15 via-transparent to-white/10" />

              {/* Main Content Grid */}
              <div className="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                
                {/* Upper Area: Heading + Paragraph */}
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] items-start gap-4 md:gap-8">
                  {/* Active Heading: AI Workflows */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold text-white tracking-tight leading-none">
                      AI Workflows
                    </h3>
                  </div>

                  {/* Paragraph Text */}
                  <div className="max-w-xl md:max-w-2xl pr-0 md:pr-48 lg:pr-64">
                    <p className="text-white text-sm sm:text-base md:text-[15px] lg:text-[16px] leading-relaxed font-normal text-white/95">
                      By fusing next-generation AI tools (Claude Code, Antigravity, Cursor, and Figma Make) with production frontend engineering (React, Next.js, and modern CSS), I rapidly iterate from wireframe to functional code — delivering developer-ready prototypes with unprecedented velocity and polish.
                    </p>
                  </div>
                </div>

                {/* Horizontal Divider Line */}
                <div className="relative w-full my-auto py-2">
                  <div className="w-full h-[1px] bg-white/20" />
                </div>

                {/* Lower Area: Inactive Clickable Tab (Design Craft) */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      rotateTo(0);
                    }}
                    className="group/btn text-left focus:outline-none cursor-pointer py-2 pr-6 -ml-2 pl-2 rounded-xl hover:bg-white/10 transition-all duration-200 relative z-30 pointer-events-auto"
                    aria-label="Click to switch to Design Craft"
                  >
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/40 group-hover/btn:text-white transition-colors duration-300 inline-block">
                      Design Craft
                    </span>
                  </button>
                </div>

              </div>

              {/* Lightbulb & Explorer Illustration Positioned on Right (Original public/Images/Vission.png) */}
              <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 w-[280px] sm:w-[330px] md:w-[390px] lg:w-[430px] flex items-end justify-end">
                <img
                  src={lightbulbImg}
                  alt="Vision Discovery Lightbulb Explorer"
                  className="w-full h-auto object-contain object-bottom-right pointer-events-none"
                />
              </div>
            </div>

          </div>

          {/* Dynamic 3D Ground Ambient Shadow */}
          <div 
            className="w-[90%] mx-auto h-8 bg-blue-950/25 rounded-full blur-xl -mt-4 transition-transform duration-700 ease-out pointer-events-none"
            style={{
              transform: `scale(${1 - Math.abs(Math.sin((rotationAngle * Math.PI) / 180)) * 0.15})`,
              opacity: 0.35 + Math.abs(Math.cos((rotationAngle * Math.PI) / 180)) * 0.25,
            }}
          />

        </div>

      </div>
    </section>
  );
}
