import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ShieldCheck } from 'lucide-react';

/**
 * All 13 Live Production Client & Portfolio Platforms
 * Powered by high-definition, instant-load visual previews (0ms load time, 100% weightless)
 */
export const LIVE_WEBSITES = [
  {
    id: 1,
    title: 'Infotek India',
    domain: 'infotekindia.in',
    liveUrl: 'https://infotekindia.in/',
    previewImg: '/Images/previews/site-1.png',
    category: 'Enterprise Tech & Digital Solutions',
    badge: 'Enterprise Platform',
    accent: '#0048DE',
    description: 'Flagship enterprise IT consulting and digital transformation portal delivering web, mobile, and software platforms for global clients.',
  },
  {
    id: 2,
    title: 'Brydgy',
    domain: 'brydgy.com',
    liveUrl: 'https://brydgy.com/',
    previewImg: '/Images/previews/site-2.png',
    category: 'Strategic Brand & Tech Platform',
    badge: 'Supply Ecosystem',
    accent: '#0D9488',
    description: 'Strategic program management and multi-tier component sourcing ecosystem unifying automotive and industrial supply chains.',
  },
  {
    id: 3,
    title: 'ZaunTrip',
    domain: 'zauntrip.com',
    liveUrl: 'https://zauntrip.com/',
    previewImg: '/Images/previews/site-3.png',
    category: 'Travel & Experiential Portal',
    badge: 'Travel Platform',
    accent: '#E11D48',
    description: 'Bespoke travel and experiential booking platform featuring dynamic discovery itineraries and curated luxury stays.',
  },
  {
    id: 4,
    title: 'Zen Real Estates',
    domain: 'zenrealestates.in',
    liveUrl: 'https://zenrealestates.in/',
    previewImg: '/Images/previews/site-4.png',
    category: 'Luxury Property & Real Estate',
    badge: 'Luxury Realty',
    accent: '#D97706',
    description: 'High-end luxury residential and commercial property showcase with architectural villa tours and interactive inquiries.',
  },
  {
    id: 5,
    title: 'Ziplogyx',
    domain: 'ziplogyx.com',
    liveUrl: 'https://ziplogyx.com/',
    previewImg: '/Images/previews/site-5.png',
    category: 'Logistics & Supply Chain Tech',
    badge: 'Freight Intelligence',
    accent: '#2563EB',
    description: 'Next-generation multimodal freight transportation and supply chain intelligence platform with real-time shipment tracking.',
  },
  {
    id: 6,
    title: 'Zventures',
    domain: 'posts-circle-12781155.figma.site',
    liveUrl: 'https://posts-circle-12781155.figma.site/',
    previewImg: '/Images/previews/site-6.png',
    category: 'Venture Capital & Innovation Studio',
    badge: 'Venture Studio',
    accent: '#7C3AED',
    description: 'Early-stage venture capital and startup incubation studio platform backing visionary founders across technology sectors.',
  },
  {
    id: 7,
    title: 'Ziplogyx Platform',
    domain: 'ziplogyx.infotekindia.net',
    liveUrl: 'https://ziplogyx.infotekindia.net/',
    previewImg: '/Images/previews/site-7.png',
    category: 'Supply Chain Operations & Fleet Ops',
    badge: 'Operations Hub',
    accent: '#0284C7',
    description: 'Enterprise operations command center managing warehouse dispatch, multi-stop delivery routes, and real-time cargo statuses.',
  },
  {
    id: 8,
    title: 'Ziplogyx Suite',
    domain: 'ziplogyx.netlify.app',
    liveUrl: 'https://ziplogyx.netlify.app/',
    previewImg: '/Images/previews/site-8.png',
    category: 'Fleet Dispatch & Routing Engine',
    badge: 'Dispatch Engine',
    accent: '#4F46E5',
    description: 'Cloud dispatch and driver assignment console designed for rapid freight scheduling and logistics optimization.',
  },
  {
    id: 9,
    title: 'Helix Hi-Tech',
    domain: 'helixhitech.com',
    liveUrl: 'https://www.helixhitech.com/',
    previewImg: '/Images/previews/site-9.png',
    category: 'Precision Industrial Engineering',
    badge: 'Industrial Tech',
    accent: '#EA580C',
    description: 'Industrial automation, precision manufacturing solutions, and smart 4K interactive classroom display ecosystems.',
  },
  {
    id: 10,
    title: 'HHG India',
    domain: 'hhgindia.com',
    liveUrl: 'https://hhgindia.com/',
    previewImg: '/Images/previews/site-10.png',
    category: 'Corporate Hospitality & Living',
    badge: 'Executive Living',
    accent: '#059669',
    description: 'Corporate hospitality management group providing bespoke serviced accommodations and enterprise executive living.',
  },
  {
    id: 11,
    title: 'Tulsi Petrochemicals',
    domain: 'tulsipetrochemicals.com',
    liveUrl: 'https://tulsipetrochemicals.com/',
    previewImg: '/Images/previews/site-11.png',
    category: 'Petrochemical & Energy Solutions',
    badge: 'Energy & Polymers',
    accent: '#16A34A',
    description: 'Industrial polymer distribution and chemical raw material trading portal serving global plastic manufacturers.',
  },
  {
    id: 12,
    title: 'FluxLab',
    domain: 'fluxlab.in',
    liveUrl: 'https://fluxlab.in/',
    previewImg: '/Images/previews/site-12.png',
    category: 'Next-Gen Research & Design Lab',
    badge: 'Design Lab',
    accent: '#9333EA',
    description: 'Design research lab exploring spatial interfaces, interactive web experiments, and modern digital brand systems.',
  },
  {
    id: 13,
    title: 'Lyndryve',
    domain: 'lyndryve.com',
    liveUrl: 'https://lyndryve.com/',
    previewImg: '/Images/previews/site-13.png',
    category: 'Automotive & Mobility Tech',
    badge: 'Mobility Tech',
    accent: '#0891B2',
    description: 'Connected vehicle telemetry and smart mobility ecosystem streamlining commercial fleet maintenance and driver safety.',
  },
];

/**
 * 3D Isometric Card in the Centered Stacking Deck
 * - Instant visual rendering with real, crystal-clear website screenshots (0ms latency)
 * - Zero third-party scripts, zero lag, silky smooth 60–120 FPS
 * - Snappy, hardware-accelerated spring hover
 * - Full exit animation back to 0 opacity when scrolling back up
 * - Generous breathing room between cards
 */
function IsometricDeckCard({
  site,
  idx,
  total,
  smoothProgress,
  activeIdx,
  setActiveIdx,
  isInteracting,
  setIsInteracting,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Echelon spacing across cards (generous breathing room between cards)
  const center = (total - 1) / 2;
  const spacingX = total > 8 ? 36 : 55;
  const spacingZ = total > 8 ? 48 : 75;

  // Resting slot coordinates in 3D isometric cascade
  const baseX = (idx - center) * spacingX;
  const baseZ = (idx - center) * spacingZ;

  // Staggered scroll slice calculation for arrival
  const stackStart = 0.03;
  const stackEnd = 0.85;
  const step = (stackEnd - stackStart) / total;
  const lockP = stackStart + (idx + 1) * step;

  // Gentle, low 4-point flight arc from RIGHT BOTTOM
  const flight = step * 1.4;
  const p0 = Math.max(0.005, lockP - flight);       // Launch
  const p1 = p0 + (lockP - p0) * 0.42;              // Gentle glide in & slight forward arc
  const p2 = p0 + (lockP - p0) * 0.78;              // Soft deceleration right over deck slot
  const p3 = lockP;                                 // Final smooth magnetic dock

  // 1. Dynamic X Sweep: From the RIGHT (+240px -> baseX)
  const cardX = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [baseX + 240, baseX + 240, baseX + 90, baseX + 16, baseX, baseX],
    { clamp: true }
  );

  // 2. Dynamic Y Sweep: Low and grounded (+150px -> 0px)
  const cardY = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [150, 150, 55, 10, 0, 0],
    { clamp: true }
  );

  // 3. 3D Z Arc: Gentle clearance (+68px max) to clear adjacent card with generous breathing room
  const cardZ = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [baseZ + 20, baseZ + 20, baseZ + 68, baseZ + 16, baseZ, baseZ],
    { clamp: true }
  );

  // 4. Subtle Hand-dealt Roll (rotateZ: -2.2deg -> 0deg)
  const cardRotZ = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [-2.2, -2.2, -0.9, -0.2, 0, 0],
    { clamp: true }
  );

  // 5. Gentle Pitch (rotateX: -5deg -> 0deg)
  const cardRotX = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [-5, -5, -1.8, -0.3, 0, 0],
    { clamp: true }
  );

  // 6. Gentle Yaw (rotateY: +3deg -> 0deg)
  const cardRotY = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [3, 3, 1, 0.2, 0, 0],
    { clamp: true }
  );

  // 7. Scale: Eases gently from 0.96 to 1.0
  const cardScale = useTransform(
    smoothProgress,
    [0, p0, p1, p2, p3, 1],
    [0.96, 0.96, 0.988, 1.004, 1.0, 1.0],
    { clamp: true }
  );

  // 8. Opacity: Fades in smoothly as soon as it launches, and completely fades to 0 when scrolled back up
  const pFade = p0 + (p3 - p0) * 0.28;
  const cardOpacity = useTransform(
    smoothProgress,
    [0, p0, pFade, p3, 1],
    [0, 0, 0.95, 1, 1],
    { clamp: true }
  );

  // 9. Specular Glass Light Sheen Sweep upon landing
  const sheenX = useTransform(
    smoothProgress,
    [0, p0, p2, p3, 1],
    ['-130%', '-130%', '25%', '150%', '150%'],
    { clamp: true }
  );
  const sheenOpacity = useTransform(
    smoothProgress,
    [0, p1, p2, p3, Math.min(0.99, p3 + 0.03), 1],
    [0, 0.35, 0.65, 0.3, 0, 0],
    { clamp: true }
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Calculate dynamic 3D clearance so ANY card lifts cleanly in front of the entire cascade (+140px beyond front-most)
  const maxZ = (total - 1 - center) * spacingZ;
  const cardBaseZ = (idx - center) * spacingZ;
  const hoverZ = maxZ - cardBaseZ + 140;

  const isCardActive = activeIdx === idx;
  const isElevated = isHovered || (isCardActive && isInteracting);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsInteracting(true);
    setActiveIdx(idx);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsInteracting(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    setIsInteracting(true);
    setActiveIdx(idx);
    if (site?.liveUrl) {
      window.open(site.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 'calc(50% - 155px)',
        left: 'calc(50% - 250px)',
        transformStyle: 'preserve-3d',
        x: cardX,
        y: cardY,
        z: cardZ,
        scale: cardScale,
        rotateX: cardRotX,
        rotateY: cardRotY,
        rotateZ: cardRotZ,
        opacity: cardOpacity,
        zIndex: isElevated ? 999 : idx + 10,
        willChange: 'transform, opacity',
      }}
    >
      {/* Inner Interactive Card Layer with Full 3D Elevation, Tilt & Glow */}
      <motion.div
        className={`group relative w-[500px] h-[310px] bg-white rounded-2xl overflow-hidden border cursor-pointer select-none transition-all duration-300 ease-out ${
          isElevated
            ? 'border-blue-500/35 ring-2 ring-blue-500/10 shadow-[0_28px_60px_-15px_rgba(15,23,42,0.20),0_10px_22px_-8px_rgba(15,23,42,0.10)]'
            : 'border-slate-200/90 hover:border-slate-300 shadow-[0_10px_28px_rgba(0,0,0,0.06)]'
        }`}
        title={`Click to open ${site.title} (${site.domain}) in new tab`}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
          }
        }}
        animate={{
          z: isElevated ? hoverZ : 0,
          y: isElevated ? -55 : 0,
          x: isElevated ? -18 : 0,
          rotateX: isElevated ? 8 - mousePos.y * 14 : 0,
          rotateY: isElevated ? -12 + mousePos.x * 16 : 0,
          rotateZ: isElevated ? 1.2 : 0,
          scale: isElevated ? 1.055 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 350,
          mass: 0.45,
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Holographic Specular Light Sheen tracking cursor */}
        {isElevated && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.10) 35%, transparent 65%)`,
            }}
          />
        )}

        {/* Specular Light Reflection Sweep during entrance */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.35) 55%, transparent 80%)',
            x: sheenX,
            opacity: sheenOpacity,
          }}
        />

        {/* Sleek macOS Browser Window Header */}
        <div className="h-9 px-3.5 bg-slate-100/95 border-b border-slate-200 flex items-center justify-between z-20 relative">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          {/* Clean URL address pill */}
          <div className={`px-3 py-0.5 rounded-md border text-xs font-mono truncate max-w-[220px] flex items-center gap-1.5 shadow-2xs transition-colors duration-200 ${
            isElevated ? 'bg-slate-50/90 border-slate-300/80 text-slate-800' : 'bg-white border-slate-200/90 text-slate-700'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-slate-400 font-sans text-[11px]">https://</span>
            <span className="font-medium">{site.domain}</span>
          </div>

          {/* Live status badge */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9.5px] font-semibold text-slate-600 uppercase tracking-wide">
              Live
            </span>
          </div>
        </div>

        {/* Card Stage: Instant-Loading Visual Website Showcase (0ms latency, zero GPU/CPU lag) */}
        <div className="relative w-full h-[calc(100%-36px)] bg-slate-900 overflow-hidden">
          {/* Real Website High-Resolution Screenshot Preview */}
          <img
            src={site.previewImg}
            alt={site.title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out select-none ${
              isElevated ? 'scale-[1.04]' : 'scale-100'
            }`}
          />

          {/* Bottom subtle gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />

          {/* Card footer with Title & External Link Button */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white z-20">
            <div>
              <div className="font-semibold text-xs sm:text-sm text-white drop-shadow-sm tracking-tight truncate max-w-[280px]">
                {site.title}
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/80 font-mono truncate max-w-[280px]">
                {site.category || site.domain}
              </div>
            </div>

            <a
              href={site.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`group/btn px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer pointer-events-auto active:scale-95 ${
                isElevated
                  ? 'bg-[#0048DE] hover:bg-[#0038b0] text-white shadow-[0_4px_16px_rgba(0,72,222,0.45)] scale-105'
                  : 'bg-white hover:bg-slate-100 text-slate-900'
              }`}
            >
              <span>Visit Site</span>
              <ExternalLink className={`w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 ${isElevated ? 'text-white' : 'text-[#0048DE]'}`} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MotionTiles({
  websites = LIVE_WEBSITES,
  className = '',
}) {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [stackedCount, setStackedCount] = useState(1);

  // Guards against 60fps re-render thrashing during scroll
  const lastLockedRef = useRef(1);
  const lastActiveRef = useRef(0);

  // Framer Motion native useScroll tracker across the outer container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive spring momentum for organic 3D parallax response
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 110,
    mass: 0.6,
  });

  // 3D Isometric Pitch, Yaw & Roll of the deck as scroll progresses
  const deckRotateX = useTransform(smoothProgress, [0, 0.5, 1], [-21, -23, -25]);
  const deckRotateY = useTransform(smoothProgress, [0, 0.5, 1], [31, 35, 39]);
  const deckRotateZ = useTransform(smoothProgress, [0, 0.5, 1], [-2, 0, 2]);
  const deckScale = useTransform(smoothProgress, [0, 0.5, 1], [0.98, 1.01, 0.99]);

  // Section Heading Scroll Entrance
  const headingOpacity = useTransform(smoothProgress, [0, 0.05], [0.2, 1]);
  const headingY = useTransform(smoothProgress, [0, 0.05], [16, 0]);

  // Track stacking progress and auto-focus currently arriving card with state guarding
  useEffect(() => {
    const total = websites.length;
    const stackStart = 0.03;
    const stackEnd = 0.85;
    const step = (stackEnd - stackStart) / total;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      // Calculate how many cards are currently locked into the stack (0 when scrolled back up)
      let locked = 0;
      for (let i = 0; i < total; i++) {
        const lockP = stackStart + (i + 1) * step;
        if (latest >= lockP - step * 0.25) {
          locked = i + 1;
        }
      }
      
      // ONLY trigger React re-render when the locked count actually changes
      if (locked !== lastLockedRef.current) {
        lastLockedRef.current = locked;
        setStackedCount(locked);
      }

      // Spotlight the currently incoming or newly stacked card if not manually hovering
      if (!isInteracting) {
        const currentIncoming = Math.min(total - 1, Math.max(0, locked > 0 ? locked - 1 : 0));
        if (currentIncoming !== lastActiveRef.current) {
          lastActiveRef.current = currentIncoming;
          setActiveIdx(currentIncoming);
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, isInteracting, websites.length]);

  const currentSite = websites[activeIdx] || websites[0];

  return (
    // Outer scroll track: (websites.length + 1) * 36vh gives smooth, effortless pacing
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${(websites.length + 1) * 36}vh` }}
    >
      {/* Sticky Full-Viewport Stage: Remains pinned at top: 0 while scrolling */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-white">
        
        {/* Soft Ambient Radial Depth Glow Behind Deck */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[520px] rounded-full blur-[140px] opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(0, 72, 222, 0.16) 0%, rgba(59, 130, 246, 0.04) 55%, transparent 75%)',
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* SECTION HEADING: Aligned with Portfolio Design System        */}
        {/* ============================================================ */}
        <motion.div 
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute top-12 sm:top-16 md:top-20 lg:top-24 left-1/2 -translate-x-1/2 flex flex-col items-center text-center px-4 max-w-3xl pointer-events-auto z-30"
        >
          <div className="flex items-center justify-center gap-0 sm:gap-0.5 flex-wrap sm:flex-nowrap">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-slate-950 font-sans cursor-text select-text">
              Live Websites <span className="text-[#0048DE]">I</span> Worked On<span className="text-[#0048DE]">.</span>
            </h2>
            <img 
              src="/Images/doodle-cat.png" 
              alt="Live websites cat doodle" 
              className="w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] object-contain select-none cursor-pointer -translate-y-1 sm:-translate-y-2 -ml-2 sm:-ml-3 md:-ml-4 shrink-0 hover:scale-115 hover:rotate-6 active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }}
              title="Live Websites Cat 🐾"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed mt-1 sm:mt-1.5 max-w-lg text-balance cursor-text select-text">
            Real products built for real businesses. Here are the websites and digital platforms I’ve designed, built, and brought to life.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* DESKTOP & TABLET: Grand 3D Isometric Stacking Deck Stage     */}
        {/* ============================================================ */}
        <div className="hidden sm:flex relative items-center justify-center w-full h-full max-h-[760px]">
          <div
            className="relative w-[420px] h-[340px] translate-y-12 md:translate-y-14 lg:translate-y-16"
            style={{
              perspective: '1500px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                rotateX: deckRotateX,
                rotateY: deckRotateY,
                rotateZ: deckRotateZ,
                scale: deckScale,
              }}
            >
              {websites.map((site, idx) => (
                <IsometricDeckCard
                  key={site.id}
                  site={site}
                  idx={idx}
                  total={websites.length}
                  smoothProgress={smoothProgress}
                  activeIdx={activeIdx}
                  setActiveIdx={setActiveIdx}
                  isInteracting={isInteracting}
                  setIsInteracting={setIsInteracting}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE VIEW: Single Focus Visual Card with Stack             */}
        {/* ============================================================ */}
        <div className="sm:hidden w-full max-w-sm px-4 flex flex-col items-center pt-20">
          <div 
            onClick={() => {
              if (currentSite?.liveUrl) {
                window.open(currentSite.liveUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            title={`Click to open ${currentSite.title} (${currentSite.domain}) in new tab`}
            role="link"
            tabIndex={0}
            className="w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl cursor-pointer active:scale-[0.98] transition-transform select-none"
          >
            {/* Mobile Browser Window Bar */}
            <div className="h-9 px-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-[11px] font-mono text-slate-600 truncate max-w-[170px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{currentSite.domain}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Mobile Card Visual Preview (Instant local asset, zero lag) */}
            <div className="relative w-full aspect-[1.38/1] bg-slate-900 overflow-hidden">
              <img
                src={currentSite.previewImg}
                alt={currentSite.title}
                className="w-full h-full object-cover object-top select-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />

              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 z-20">
                {stackedCount} of {websites.length} stacked
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-20">
                <div>
                  <div className="text-white text-xs font-semibold drop-shadow-md truncate max-w-[170px]">
                    {currentSite.title}
                  </div>
                  <div className="text-[10px] text-white/70 font-mono">
                    {currentSite.domain}
                  </div>
                </div>

                <a
                  href={currentSite.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 rounded-md bg-white text-slate-900 text-xs font-semibold shadow-md flex items-center gap-1.5 active:scale-95"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3 text-[#0048DE]" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
