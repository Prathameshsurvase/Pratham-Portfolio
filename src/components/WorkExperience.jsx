import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import LanyardPass from './LanyardPass';
import { Award, Plus } from 'lucide-react';

const CHAPTERS = [
  {
    id: 'infotek',
    chapter: '01',
    company: 'INFOTEK Solutions',
    shortName: 'INFOTEK',
    monogram: 'INF',
    isCurrentRole: true,
    role: 'UI/UX Designer',
    period: 'Jun 2025 – Present',
    location: 'Vadodara (On-site)',
    accentColor: '#0048DE',
    strapColor: '#0048DE',
    ticketNumber: 'EMP-0842',
    barcode: 'INFOTEK-PRATHAM-UX',
    strapText: 'INFOTEK SOLUTIONS • UI/UX DESIGN',
    headline: 'Designing enterprise platforms & rapid vibe-coding.',
    domains: ['Real Estate', 'Logistics', 'Manufacturing', 'Ed-Tech'],
    deliverables: [
      'Architected end-to-end UI/UX systems for 8+ enterprise client platforms',
      'Accelerated developer handoff through AI vibe coding using Figma, Claude, & Antigravity',
      'Integrated real-time WhatsApp Cloud API & responsive production interfaces',
    ],
    story:
      'Designing and delivering end-to-end UI/UX architecture for 8+ client platforms across real estate, logistics, manufacturing, automotive, and ed-tech. Bridging design and engineering through AI workflows (“vibe coding”) using Figma, Claude, and Antigravity to accelerate developer handoff and build production-ready interfaces.',
    tags: ['Vibe Coding', 'React & Antigravity', 'Enterprise UI', 'WhatsApp API'],
    takeaway: 'Delivered 8+ client platforms with integrated APIs and fluid interactions.',
  },
  {
    id: 'ims',
    chapter: '02',
    company: 'IMS Group',
    shortName: 'IMS GROUP',
    monogram: 'IMS',
    isCurrentRole: false,
    role: 'Web & Digital Experience Designer',
    period: '2024 – 2025',
    location: 'Ahmedabad, India',
    accentColor: '#2563EB',
    strapColor: '#1E293B',
    ticketNumber: 'IMS-2024',
    barcode: 'IMS-DIGITAL-EXP',
    strapText: 'IMS GROUP • DIGITAL SYSTEMS',
    headline: 'Crafting brand authority through micro-interactions & web portals.',
    domains: ['Corporate Portals', 'Design Systems', 'Micro-Interactions'],
    deliverables: [
      'Engineered high-authority corporate portals and responsive web presences',
      'Optimized layout pacing, typography scale, and fluid micro-interactions with Webflow & Duda',
      'Unified brand design systems boosting cross-device usability and stakeholder engagement',
    ],
    story:
      'Engineered corporate digital presences and web portals with high-precision layout pacing, typography, and responsive micro-interactions. Streamlined content integration using Webflow and Duda, boosting cross-device usability and brand authority.',
    tags: ['Webflow & Duda', 'Design Systems', 'Micro-Interactions', 'Layout Optimization'],
    takeaway: 'Every pixel, space, and transition needs a purpose.',
  },
  {
    id: 'bmbc',
    chapter: '03',
    company: 'BMBC Foundation',
    shortName: 'BMBC',
    monogram: 'BMBC',
    isCurrentRole: false,
    role: 'Product & SaaS UI/UX Designer',
    period: '2024',
    location: 'Remote (US Clients)',
    accentColor: '#0284C7',
    strapColor: '#0F172A',
    ticketNumber: 'BMBC-0424',
    barcode: 'BMBC-GLOBAL-SAAS',
    strapText: 'BMBC FOUNDATION • US CLIENTS',
    headline: 'Untangling complex data into calm SaaS dashboards for US teams.',
    domains: ['SaaS Dashboards', 'Dense Data Workflows', 'US Teams'],
    deliverables: [
      'Overhauled dense multi-variable analytics into calm, scannable SaaS dashboards',
      'Collaborated directly with US product teams on high-conversion dashboard modules',
      'Conducted iterative user research and workflow simplification for rapid data ingestion',
    ],
    story:
      'Collaborating directly with product teams in the US, I overhauled dense analytics dashboards into clean, readable SaaS workflows. It was all about making overwhelming amounts of data feel light, intuitive, and calm.',
    tags: ['SaaS Dashboards', 'US Clients', 'Analytics UI', 'UX Research'],
    takeaway: 'Simplicity is hard work, especially when data is dense.',
  },
  {
    id: 'vtech',
    chapter: '04',
    company: 'Vtech Solutions',
    shortName: 'VTECH',
    monogram: 'VT',
    isCurrentRole: false,
    role: 'UI/UX Designer',
    period: '2023 – 2024',
    location: 'Vadodara, India',
    award: 'Best Performer Award',
    accentColor: '#D97706',
    strapColor: '#92400E',
    ticketNumber: 'VTECH-0941',
    barcode: 'VTECH-HEALTHCARE-UX',
    strapText: 'VTECH SOLUTIONS • BEST PERFORMER',
    headline: 'Emergency healthcare sprint earning the Best Performer Award.',
    domains: ['Healthcare Portals', 'Higher Ed Systems', 'Velocity Sprints'],
    deliverables: [
      'Redesigned core healthcare portals during high-stakes sprints with 1-week turnaround',
      'Slashed page load times by 50% and reduced university portal bounce rates by 30%',
      'Honored with the Best Performer Award for exceptional design delivery velocity and empathy',
    ],
    story:
      'Redesigned core healthcare portals and university systems during high-stakes sprints. Achieved 30% lower bounce rates, 50% faster page load times, and earned the Best Performer Award for high velocity and user empathy.',
    tags: ['Healthcare UX', 'Award Winner 🏆', '30% Lower Bounce', 'Webflow'],
    takeaway: 'Designing with urgency without cutting corners on user empathy.',
  },
  {
    id: 'ch',
    chapter: '05',
    company: 'CH Developers',
    shortName: 'CH DEVS',
    monogram: 'CHD',
    isCurrentRole: false,
    role: 'UI/UX Product Intern',
    period: '2023',
    location: 'Remote',
    accentColor: '#6366F1',
    strapColor: '#312E81',
    ticketNumber: 'CHD-2023',
    barcode: 'CRYPSII-FARMCLUB-UX',
    strapText: 'CH DEVELOPERS • PRODUCT DESIGN',
    headline: 'Translating raw ideas into tactile crypto & commerce prototypes.',
    domains: ['Crypto Intelligence', 'Plant-Based E-Comm', 'Mobile Prototyping'],
    deliverables: [
      'Designed end-to-end interactive mobile prototypes for Crypsii crypto platform',
      'Developed ergonomic touch navigation and checkout flows for FarmClub e-commerce',
      'Executed user touch testing across iOS and Android ergonomics',
    ],
    story:
      'My entry into the product world. From crypto intelligence apps (Crypsii) to plant-based commerce (FarmClub), I designed interactive prototypes, tested ergonomic mobile navigation patterns, and learned firsthand how users touch and swipe.',
    tags: ['Mobile UI/UX', 'Crypsii Crypto', 'FarmClub E-Comm', 'Prototyping'],
    takeaway: 'Curiosity and hands-on experiments formed my foundation.',
  },
];

export default function WorkExperience() {
  const containerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [paddingY, setPaddingY] = useState(130);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Framer Motion scroll tracker mapped to vertical section progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track when user enters the section (from approaching to docked sticky)
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const [mounted, setMounted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isDoodleHovered, setIsDoodleHovered] = useState(false);

  const updateVisibility = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportH = window.innerHeight || 800;
    const servicesEl = document.getElementById('services');
    const servicesTop = servicesEl
      ? servicesEl.getBoundingClientRect().top
      : rect.bottom - viewportH;

    // The 3D ID card must ONLY be active while the user is actively viewing WorkExperience:
    // 1. WorkExperience top has reached/approached viewport top (<= 100px)
    // 2. Services section has NOT entered view (retracts pass cleanly BEFORE What I Do arrives)
    // 3. WorkExperience container hasn't scrolled out above
    const isInside = rect.top <= 100 && servicesTop >= viewportH * 0.85 && rect.bottom >= viewportH * 0.85;

    setHasEntered(isInside);
  }, []);

  useEffect(() => {
    setMounted(true);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });

    let lenisUnsub = null;
    const attachLenis = () => {
      if (window.__lenis && !lenisUnsub) {
        window.__lenis.on('scroll', updateVisibility);
        lenisUnsub = () => {
          if (window.__lenis) {
            window.__lenis.off('scroll', updateVisibility);
          }
        };
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      const pollLenis = setInterval(() => {
        if (attachLenis()) {
          clearInterval(pollLenis);
        }
      }, 100);
      setTimeout(() => clearInterval(pollLenis), 3000);
    }

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      if (lenisUnsub) lenisUnsub();
    };
  }, [updateVisibility]);

  // Calculate dynamic pixel distance to translate the vertical track
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current && rightContainerRef.current) {
        const containerH = rightContainerRef.current.clientHeight;
        const card = trackRef.current.querySelector('.experience-card');
        const cardH = card ? card.offsetHeight : 320;
        const pad = Math.max(40, Math.round((containerH - cardH) / 2));
        setPaddingY(pad);

        const allCards = trackRef.current.querySelectorAll('.experience-card');
        let totalCardsH = 0;
        allCards.forEach((c) => {
          totalCardsH += c.offsetHeight;
        });
        const totalGaps = (allCards.length - 1) * 28; // gap-7 = 28px
        const totalContentH = pad * 2 + totalCardsH + totalGaps;
        
        setScrollRange(Math.max(0, totalContentH - containerH));
      }
    };

    updateDimensions();
    const t1 = setTimeout(updateDimensions, 100);
    const t2 = setTimeout(updateDimensions, 400);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Update active chapter indicator and sync visibility based on scroll progress
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const idx = Math.min(Math.floor(latest * CHAPTERS.length), CHAPTERS.length - 1);
      setActiveChapterIndex(idx);
      updateVisibility();
    });
  }, [scrollYProgress, updateVisibility]);

  // Smooth vertical scroll position via Framer Motion transform
  const y = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const activeChapter = CHAPTERS[activeChapterIndex];

  // Dynamic pass content for the 3D Lanyard ID Card (Pratham Survase)
  const passContent = {
    attendeeName: 'Pratham Survase',
    ticketType: 'UI/UX Designer',
    ticketNumber: 'EMP-0842',
    eventName: '',
    eventDate: '',
    barcodeValue: 'INFOTEK-PRATHAM-UX',
    backText: 'PRATHAM SURVASE • STUDIO',
    strapText: 'PRATHAM SURVASE • UI/UX DESIGN',
  };

  const passLook = {
    paper: '#0A0C12',
    ink: '#FFFFFF',
    accent: '#C3FF48',
    strapColor: '#C3FF48',
    strapStyle: 'flat',
    foil: false,
    photo: '/Images/id card image.png',
    photoFit: 'cover',
    finish: 'gloss',
    sleeve: true,
    sleeveTexture: 'clear',
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-white h-[340vh] sm:h-[380vh] md:h-[420vh] w-full"
    >
      <div id="experience" className="absolute top-0 pointer-events-none" />
      {/* Full Screen Sticky Viewport (100vw, 100vh) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-x-clip select-none border-b border-slate-100 bg-white relative">
        

        {/* ============================================================ */}
        {/* Mobile ID Pass: Rendered in document flow (< lg only)       */}
        {/* ============================================================ */}
        <div className="lg:hidden w-full h-[360px] sm:h-[420px] pointer-events-none z-30 flex items-center justify-center">
          <motion.div
            initial={{ y: '-110vh', x: -24, rotate: -4, opacity: 0, visibility: 'hidden' }}
            animate={
              hasEntered
                ? {
                    y: ['-100vh', '2.6vh', '-1.0vh', '0.3vh', '0vh'],
                    x: [-24, 10, -4, 1.5, 0],
                    rotate: [-4, 2.4, -1.0, 0.3, 0],
                    opacity: 1,
                    visibility: 'visible',
                  }
                : {
                    y: '-110vh',
                    x: -24,
                    rotate: -4,
                    opacity: 0,
                    transitionEnd: {
                      visibility: 'hidden',
                    },
                  }
            }
            transition={
              hasEntered
                ? {
                    y: {
                      duration: 0.95,
                      times: [0, 0.44, 0.66, 0.82, 1],
                      ease: [
                        [0.45, 0, 0.75, 0.25],
                        [0.2, 0.85, 0.35, 1],
                        [0.35, 0, 0.25, 1],
                        [0.35, 0, 0.25, 1],
                      ],
                    },
                    x: {
                      duration: 0.95,
                      times: [0, 0.44, 0.66, 0.82, 1],
                      ease: [
                        [0.45, 0, 0.75, 0.25],
                        [0.2, 0.85, 0.35, 1],
                        [0.35, 0, 0.25, 1],
                        [0.35, 0, 0.25, 1],
                      ],
                    },
                    rotate: {
                      duration: 0.95,
                      times: [0, 0.44, 0.66, 0.82, 1],
                      ease: [
                        [0.45, 0, 0.75, 0.25],
                        [0.2, 0.85, 0.35, 1],
                        [0.35, 0, 0.25, 1],
                        [0.35, 0, 0.25, 1],
                      ],
                    },
                    opacity: {
                      duration: 0.25,
                      ease: 'easeOut',
                    },
                  }
                : {
                    duration: 0.25,
                    ease: 'easeIn',
                  }
            }
            style={{ transformOrigin: 'top center' }}
            className="w-full h-full pointer-events-auto"
          >
            <LanyardPass
              content={passContent}
              look={passLook}
              layout={{ size: 300, thickness: 3.2 }}
              motion={true}
              dropTrigger={hasEntered}
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* Main Stage: Spacer on Left + Vertical Stories on Right       */}
        {/* ============================================================ */}
        <div className="w-full flex-1 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 pb-6 sm:pb-8 my-auto pl-4 sm:pl-6 lg:pl-8 xl:pl-10 relative">
          
          {/* Spacer on Left for 3D Pass on Desktop */}
          <div className="w-full lg:w-[32vw] xl:w-[34vw] max-w-[460px] shrink-0 hidden lg:block -ml-2 sm:-ml-4 lg:-ml-6 pointer-events-none" />

          {/* ========================================================== */}
          {/* RIGHT: REFINED VERTICAL SCROLLING EXPERIENCES TRACK        */}
          {/* ========================================================== */}
          <div className="flex-1 w-full flex flex-col items-center justify-center relative pr-4 sm:pr-6 lg:pr-12">
            {/* Header: Cleanly aligned with the experience cards below */}
            <div className="w-full max-w-[500px] lg:max-w-[540px] mb-3 sm:mb-4 px-1 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-slate-950">
                  Work Experience<span className="text-[#0048DE]">.</span>
                </h2>
                {/* Before / After Interactive Doodle (Screaming pulling hair -> Bald with tears) */}
                <div 
                  onMouseEnter={() => setIsDoodleHovered(true)}
                  onMouseLeave={() => setIsDoodleHovered(false)}
                  onClick={() => setIsDoodleHovered(prev => !prev)}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-17 md:h-17 shrink-0 cursor-pointer select-none -translate-y-1 group/doodle"
                  title="Hover or click me!"
                >
                  {/* Before State (Default): Screaming in panic pulling hair */}
                  <img 
                    src="/Images/doodle-work.png" 
                    alt="Work experience before hover" 
                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-200 ease-out ${
                      isDoodleHovered 
                        ? 'opacity-0 scale-90 -rotate-3' 
                        : 'opacity-100 scale-100 rotate-0'
                    }`}
                  />

                  {/* After State (On Hover / Tap): Hair ripped out, tears streaming down face */}
                  <img 
                    src="/Images/doodle-work-hover.png" 
                    alt="Work experience after hover" 
                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-200 ease-out origin-center ${
                      isDoodleHovered 
                        ? 'opacity-100 scale-[1.28] rotate-1' 
                        : 'opacity-0 scale-95 rotate-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Vertical Scrolling Experience Cards Track */}
            <div
              ref={rightContainerRef}
              className="w-full h-[58vh] sm:h-[62vh] lg:h-[68vh] max-h-[580px] flex items-start justify-center overflow-hidden relative"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              }}
            >
            <motion.div
              ref={trackRef}
              style={{
                y,
                paddingTop: paddingY,
                paddingBottom: paddingY,
              }}
              className="flex flex-col items-center gap-6 sm:gap-7 w-full max-w-[500px] lg:max-w-[540px]"
            >
              {CHAPTERS.map((chap, idx) => {
                const isCurrent = idx === activeChapterIndex;

                return (
                  <div
                    key={chap.id}
                    style={{
                      boxShadow: isCurrent
                        ? '0 12px 32px -8px rgba(15, 23, 42, 0.05), 0 2px 8px -2px rgba(15, 23, 42, 0.02)'
                        : '0 2px 8px -2px rgba(15, 23, 42, 0.02)',
                    }}
                    className={`experience-card relative w-full shrink-0 p-6 sm:p-7 transition-all duration-300 border ${
                      isCurrent
                        ? 'bg-white border-slate-200 opacity-100 scale-100'
                        : 'bg-white/80 border-slate-200/70 opacity-40 scale-[0.985] hover:opacity-75 hover:bg-white'
                    }`}
                  >
                    {/* Corner Plus Markers */}
                    <span className="absolute -top-[7px] -left-[7px] w-3.5 h-3.5 bg-white flex items-center justify-center pointer-events-none select-none z-10">
                      <Plus size={11} strokeWidth={1.3} className={isCurrent ? 'text-[#0048DE]/75' : 'text-slate-300'} />
                    </span>
                    <span className="absolute -top-[7px] -right-[7px] w-3.5 h-3.5 bg-white flex items-center justify-center pointer-events-none select-none z-10">
                      <Plus size={11} strokeWidth={1.3} className={isCurrent ? 'text-[#0048DE]/75' : 'text-slate-300'} />
                    </span>
                    <span className="absolute -bottom-[7px] -left-[7px] w-3.5 h-3.5 bg-white flex items-center justify-center pointer-events-none select-none z-10">
                      <Plus size={11} strokeWidth={1.3} className={isCurrent ? 'text-[#0048DE]/75' : 'text-slate-300'} />
                    </span>
                    <span className="absolute -bottom-[7px] -right-[7px] w-3.5 h-3.5 bg-white flex items-center justify-center pointer-events-none select-none z-10">
                      <Plus size={11} strokeWidth={1.3} className={isCurrent ? 'text-[#0048DE]/75' : 'text-slate-300'} />
                    </span>

                    {/* Header: Role, Company in Signature Blue & Minimal Period Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <h3 className="text-lg sm:text-[20px] font-semibold text-slate-900 tracking-tight leading-snug">
                          {chap.role}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                          <span className="text-[#0048DE] font-semibold">{chap.company}</span>
                          <span className="text-slate-300 font-normal mx-1.5">·</span>
                          <span>{chap.location}</span>
                        </p>
                      </div>

                      {/* Minimal Period Badge with Live Blue Pulse Indicator */}
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200/80 shrink-0">
                        {chap.isCurrentRole && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C3FF48] opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C3FF48] shadow-[0_0_8px_#C3FF48]" />
                          </span>
                        )}
                        {chap.period}
                      </span>
                    </div>

                    {/* Editorial Mandate Quote with Blue Anchor Line */}
                    <div className="my-3 pl-3.5 py-1.5 border-l-2 border-[#0048DE]/70">
                      <p className="text-xs sm:text-[13px] font-normal text-slate-600 leading-snug italic">
                        "{chap.headline}"
                      </p>
                    </div>

                    {/* Focus Industries & Domains */}
                    <div className="mb-3.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Focus Industries &amp; Domains
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {chap.domains.map((dom, domIdx) => (
                          <span
                            key={domIdx}
                            className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-md transition-colors hover:border-[#0048DE]/30 hover:text-[#0048DE] hover:bg-blue-50/40 cursor-default"
                          >
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal mb-3.5">
                      {chap.story}
                    </p>

                    {/* Tech Stack & Award Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {chap.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-normal text-slate-500 bg-slate-50/70 hover:bg-slate-100 hover:text-slate-900 border border-slate-150 px-2 py-0.5 rounded-md transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {chap.award && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-700 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200/80 ml-auto">
                          <Award size={12} className="text-slate-500" />
                          {chap.award}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* Desktop Portal: Attached directly to document.body at z-[60] */}
      {/* Ensures the strap flows smoothly OVER the navbar to top: 0   */}
      {/* ============================================================ */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <motion.div
          initial={{ y: '-110vh', x: -32, rotate: -5, opacity: 0, visibility: 'hidden' }}
          animate={
            hasEntered
              ? {
                  y: ['-100vh', '3vh', '-1.4vh', '0.5vh', '0vh'],
                  x: [-32, 12, -5, 2, 0],
                  rotate: [-5, 3, -1.2, 0.4, 0],
                  opacity: 1,
                  visibility: 'visible',
                }
              : {
                  y: '-110vh',
                  x: -32,
                  rotate: -5,
                  opacity: 0,
                  transitionEnd: {
                    visibility: 'hidden',
                  },
                }
          }
          transition={
            hasEntered
              ? {
                  y: {
                    duration: 0.95,
                    times: [0, 0.44, 0.66, 0.82, 1],
                    ease: [
                      [0.45, 0, 0.75, 0.25],
                      [0.2, 0.85, 0.35, 1],
                      [0.35, 0, 0.25, 1],
                      [0.35, 0, 0.25, 1],
                    ],
                  },
                  x: {
                    duration: 0.95,
                    times: [0, 0.44, 0.66, 0.82, 1],
                    ease: [
                      [0.45, 0, 0.75, 0.25],
                      [0.2, 0.85, 0.35, 1],
                      [0.35, 0, 0.25, 1],
                      [0.35, 0, 0.25, 1],
                    ],
                  },
                  rotate: {
                    duration: 0.95,
                    times: [0, 0.44, 0.66, 0.82, 1],
                    ease: [
                      [0.45, 0, 0.75, 0.25],
                      [0.2, 0.85, 0.35, 1],
                      [0.35, 0, 0.25, 1],
                      [0.35, 0, 0.25, 1],
                    ],
                  },
                  opacity: {
                    duration: 0.25,
                    ease: 'easeOut',
                  },
                }
              : {
                  duration: 0.25,
                  ease: 'easeIn',
                }
          }
          style={{ 
            transformOrigin: 'top center',
            pointerEvents: hasEntered ? 'auto' : 'none',
          }}
          className="hidden lg:block fixed -top-16 bottom-0 left-0 w-[68vw] xl:w-[64vw] max-w-[1020px] min-w-[760px] h-[calc(100%+4rem)] pointer-events-none z-[60]"
        >
          <LanyardPass
            content={passContent}
            look={passLook}
            layout={{ size: 340, thickness: 3.2, targetX: 340 }}
            motion={true}
            dropTrigger={hasEntered}
            className="w-full h-full"
          />
        </motion.div>,
        document.body
      )}
    </section>
  );
}
