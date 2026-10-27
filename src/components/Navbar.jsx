import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onContactClick, onResumeClick, onCaseStudyClick, isModalOpen }) {
  const [activeTab, setActiveTab] = useState('HOME');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [sideResumeHovered, setSideResumeHovered] = useState(false);
  const [isWhatIDoHovered, setIsWhatIDoHovered] = useState(false);
  const [sideWhatIDoHovered, setSideWhatIDoHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [sideAboutHovered, setSideAboutHovered] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);
  const [sideWorkHovered, setSideWorkHovered] = useState(false);
  const [sideWebsitesHovered, setSideWebsitesHovered] = useState(false);
  const [sideArtworkHovered, setSideArtworkHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const linkRefs = useRef({});

  // Top Header Navigation Links (remains untouched in hero section navbar: HOME, ABOUT ME, WORK, WHAT I DO, RESUME)
  const headerNavLinks = [
    { id: 'home', name: 'HOME', label: 'Home', href: '#home' },
    { id: 'about', name: 'ABOUT ME', label: 'About Me', href: '#about' },
    { id: 'work', name: 'WORK', label: 'Work', href: '#experience' },
    { id: 'services', name: 'WHAT I DO', label: 'What I Do', href: '#services' },
    { id: 'resume', name: 'RESUME', label: 'Resume', href: '#resume' },
  ];

  // Right-Side Pinned Navigation Links (adds the 2 sections with short names: WEBSITES and ARTWORK)
  const sideNavLinks = [
    { id: 'home', name: 'HOME', label: 'Home', href: '#home' },
    { id: 'about', name: 'ABOUT ME', label: 'About Me', href: '#about' },
    { id: 'work', name: 'WORK', label: 'Work', href: '#experience' },
    { id: 'services', name: 'WHAT I DO', label: 'What I Do', href: '#services' },
    { id: 'websites', name: 'WEBSITES', label: 'Websites', href: '#live-websites' },
    { id: 'artwork', name: 'ARTWORK', label: 'Artwork', href: '#artwork' },
    { id: 'resume', name: 'RESUME', label: 'Resume', href: '#resume' },
  ];

  const navLinks = headerNavLinks;

  // Re-calculate the sliding indicator position in the top header
  const updateIndicatorPosition = useCallback(() => {
    const target = hoveredTab || activeTab;
    const targetEl = linkRefs.current[target];
    const navEl = navRef.current;

    if (targetEl && navEl) {
      const navRect = navEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      setIndicator({
        left: targetRect.left - navRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeTab, hoveredTab]);

  useLayoutEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition, isWhatIDoHovered, isAboutHovered, isWorkHovered]);

  useEffect(() => {
    updateIndicatorPosition();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        updateIndicatorPosition();
      });
    }

    let animId;
    const startTime = performance.now();
    const animate = () => {
      updateIndicatorPosition();
      if (performance.now() - startTime < 350) {
        animId = requestAnimationFrame(animate);
      }
    };
    animId = requestAnimationFrame(animate);

    const rafId = requestAnimationFrame(updateIndicatorPosition);
    const timeoutId = setTimeout(updateIndicatorPosition, 80);

    return () => {
      cancelAnimationFrame(animId);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [updateIndicatorPosition, hoveredTab, isWhatIDoHovered, isAboutHovered, isWorkHovered]);

  useEffect(() => {
    if (!navRef.current) return;
    const observer = new ResizeObserver(() => {
      updateIndicatorPosition();
    });
    observer.observe(navRef.current);
    window.addEventListener('resize', updateIndicatorPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [updateIndicatorPosition]);

  // Re-sync indicator whenever top header reappears
  useEffect(() => {
    if (!isPastHero) {
      const t = setTimeout(updateIndicatorPosition, 50);
      return () => clearTimeout(t);
    }
  }, [isPastHero, updateIndicatorPosition]);

  // When a modal closes, re-sync active tab based on scroll position
  useEffect(() => {
    if (!isModalOpen && (activeTab === 'RESUME' || activeTab === 'Resume')) {
      const artworkSection = document.getElementById('artwork') || document.getElementById('infinite-canvas') || document.querySelector('[data-section="artwork"]');
      const liveWebsitesSection = document.getElementById('live-websites') || document.getElementById('websites') || document.querySelector('[data-section="websites"]');
      const servicesSection = document.getElementById('services');
      const workSection = document.getElementById('work') || document.getElementById('experience');
      const aboutSection = document.getElementById('about');
      const focalY = Math.min(360, window.innerHeight * 0.45);

      if (artworkSection) {
        const r = artworkSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('ARTWORK');
          return;
        }
      }

      if (liveWebsitesSection) {
        const r = liveWebsitesSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('WEBSITES');
          return;
        }
      }

      if (servicesSection) {
        const r = servicesSection.getBoundingClientRect();
        // If services has already scrolled past focal zone, user is in Live Websites
        if (r.bottom <= focalY) {
          if (!artworkSection || artworkSection.getBoundingClientRect().top > focalY) {
            setActiveTab('WEBSITES');
            return;
          }
        }
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('WHAT I DO');
          return;
        }
      }

      if (workSection) {
        const r = workSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('WORK');
          return;
        }
      }

      if (aboutSection) {
        const r = aboutSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('ABOUT ME');
          return;
        }
      }

      setActiveTab('HOME');
    }
  }, [isModalOpen, activeTab]);

  // Scroll spy to automatically update activeTab and toggle normal header vs right navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // The right sidebar typography navigation appears ONLY after user scrolls down past the logos section.
      // Until then, the normal top header with center navigation links is displayed.
      const logosSection = document.getElementById('logos');
      let isPastLogos = false;
      if (logosSection) {
        const rect = logosSection.getBoundingClientRect();
        // The bottom of the logos section has scrolled past the top sticky header
        isPastLogos = rect.bottom <= 80;
      } else {
        // Fallback pixel threshold if logos section is not in DOM
        isPastLogos = scrollY > 950;
      }

      setIsPastHero(isPastLogos);

      if (isModalOpen) return;

      const artworkSection = document.getElementById('artwork') || document.getElementById('infinite-canvas') || document.querySelector('[data-section="artwork"]');
      const liveWebsitesSection = document.getElementById('live-websites') || document.getElementById('websites') || document.querySelector('[data-section="websites"]');
      const servicesSection = document.getElementById('services');
      const workSection = document.getElementById('work') || document.getElementById('experience');
      const aboutSection = document.getElementById('about');
      const focalY = Math.min(360, window.innerHeight * 0.45);

      // 1. Artwork (Bottom-most section)
      if (artworkSection) {
        const r = artworkSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('ARTWORK');
          return;
        }
      }

      // 2. Live Websites (Between Services and Artwork)
      if (liveWebsitesSection) {
        const r = liveWebsitesSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('WEBSITES');
          return;
        }
      }

      // Fail-safe for Live Websites: If Services has scrolled past focal point, user has entered Live Websites
      if (servicesSection) {
        const r = servicesSection.getBoundingClientRect();
        if (r.bottom <= focalY) {
          if (!artworkSection || artworkSection.getBoundingClientRect().top > focalY) {
            setActiveTab('WEBSITES');
            return;
          }
        }
        // 3. What I Do (Only active while services is actually in the focal window)
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('WHAT I DO');
          return;
        }
      }

      // 4. Work Experience
      if (workSection) {
        const r = workSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('WORK');
          return;
        }
      }

      // 5. About Me
      if (aboutSection) {
        const r = aboutSection.getBoundingClientRect();
        if (r.top <= focalY && r.bottom > 100) {
          setActiveTab('ABOUT ME');
          return;
        }
      }

      // 6. Home
      setActiveTab('HOME');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    let lenisUnsub = null;
    const attachLenis = () => {
      if (window.__lenis && !lenisUnsub) {
        window.__lenis.on('scroll', handleScroll);
        lenisUnsub = () => {
          if (window.__lenis) {
            window.__lenis.off('scroll', handleScroll);
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenisUnsub) lenisUnsub();
    };
  }, [isModalOpen]);

  const handleLinkClick = (e, linkName) => {
    if (e && e.preventDefault) e.preventDefault();
    const upper = linkName.toUpperCase();

    if (upper === 'HOME') {
      setActiveTab('HOME');
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (upper === 'ABOUT ME' || upper === 'ABOUT') {
      setActiveTab('ABOUT ME');
      const el = document.getElementById('about');
      if (window.__lenis && el) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (upper === 'WORK') {
      setActiveTab('WORK');
      const el = document.getElementById('experience') || document.getElementById('work');
      if (window.__lenis && el) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (upper === 'SERVICES' || upper === 'WHAT I DO') {
      setActiveTab('WHAT I DO');
      const el = document.getElementById('services') || document.getElementById('work');
      if (window.__lenis && el) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (upper === 'WEBSITES' || upper === 'LIVE WEBSITES' || upper === 'LIVE SITES') {
      setActiveTab('WEBSITES');
      const el = document.getElementById('live-websites') || document.getElementById('websites');
      if (window.__lenis && el) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (upper === 'ARTWORK' || upper === 'ART' || upper === 'MY ARTWORK') {
      setActiveTab('ARTWORK');
      const el = document.getElementById('artwork') || document.getElementById('infinite-canvas');
      if (window.__lenis && el) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (upper === 'RESUME') {
      setActiveTab('RESUME');
      if (onResumeClick) onResumeClick();
    } else if (linkName === 'Contact' || linkName === 'Contact Us') {
      if (onContactClick) onContactClick();
    }
  };

  return (
    <>
      {/* 1. Sticky Top Header (Smoothly slides up and removes itself when the right navbar appears) */}
      <header 
        className={`w-full sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isPastHero 
            ? 'md:-translate-y-full md:opacity-0 md:pointer-events-none' 
            : 'translate-y-0 opacity-100'
        } ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100/90 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] pt-2 pb-2' 
            : 'bg-transparent border-b border-transparent shadow-none pt-4 sm:pt-6 pb-2'
        }`}
      >
        <style>{`
          @keyframes header-item-drop {
            0% {
              opacity: 0;
              transform: translateY(-18px);
              filter: blur(5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0px);
            }
          }

          .animate-header-logo {
            opacity: 0;
            animation: header-item-drop 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
            will-change: transform, opacity, filter;
          }

          .animate-header-nav-item {
            opacity: 0;
            animation: header-item-drop 1.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            will-change: transform, opacity, filter;
          }

          .animate-header-btn {
            opacity: 0;
            animation: header-item-drop 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.95s forwards;
            will-change: transform, opacity, filter;
          }

          /* Warrior Fox Black Hole emergence at the line below RESUME */
          .fox-portal-wrapper {
            position: absolute;
            left: 100%;
            margin-left: 5px;
            bottom: 0px;
            width: 38px;
            height: 54px;
            pointer-events: none;
            z-index: 60;
          }

          .fox-black-hole {
            position: absolute;
            bottom: -1px;
            left: 50%;
            transform: translateX(-50%) scale(0);
            width: 32px;
            height: 5px;
            border-radius: 50%;
            background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.38) 0%, rgba(15, 23, 42, 0.18) 55%, rgba(0, 72, 222, 0.1) 80%, transparent 100%);
            box-shadow: 0 0 6px rgba(0, 72, 222, 0.25);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out;
            opacity: 0;
            z-index: 1;
          }

          .fox-emerge-clip {
            position: absolute;
            bottom: 2px;
            left: 0px;
            width: 38px;
            height: 52px;
            overflow: hidden;
            z-index: 2;
          }

          .fox-emerge-clip img {
            width: 38px;
            height: 50px;
            object-fit: contain;
            display: block;
            max-width: none;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
            transform-origin: bottom center;
            transform: translateY(54px) scale(0.65);
            transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
          }

          .nav-resume-item:hover .fox-black-hole,
          .nav-resume-item.is-hovered .fox-black-hole,
          .nav-resume-item.is-active .fox-black-hole {
            transform: translateX(-50%) scale(1) !important;
            opacity: 1 !important;
          }

          .nav-resume-item:hover .fox-emerge-clip img,
          .nav-resume-item.is-hovered .fox-emerge-clip img,
          .nav-resume-item.is-active .fox-emerge-clip img {
            transform: translateY(0px) scale(1) !important;
            transition: transform 0.36s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.04s !important;
          }

          /* Side navigation portal */
          .fox-side-portal-wrapper {
            position: absolute;
            right: 100%;
            margin-right: 10px;
            bottom: 2px;
            width: 44px;
            height: 60px;
            pointer-events: none;
            z-index: 60;
          }

          .fox-side-black-hole {
            position: absolute;
            bottom: -1px;
            left: 50%;
            transform: translateX(-50%) scale(0);
            width: 36px;
            height: 6px;
            border-radius: 50%;
            background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.38) 0%, rgba(15, 23, 42, 0.18) 55%, rgba(0, 72, 222, 0.1) 80%, transparent 100%);
            box-shadow: 0 0 6px rgba(0, 72, 222, 0.25);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out;
            opacity: 0;
            z-index: 1;
          }

          .fox-side-emerge-clip {
            position: absolute;
            bottom: 3px;
            left: 0px;
            width: 44px;
            height: 58px;
            overflow: hidden;
            z-index: 2;
          }

          .fox-side-emerge-clip img {
            width: 44px;
            height: 58px;
            object-fit: contain;
            display: block;
            max-width: none;
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.22));
            transform-origin: bottom center;
            transform: translateY(60px) scale(0.65);
            transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
          }

          .side-resume-item:hover .fox-side-black-hole,
          .side-resume-item.is-active .fox-side-black-hole {
            transform: translateX(-50%) scale(1) !important;
            opacity: 1 !important;
          }

          .side-resume-item:hover .fox-side-emerge-clip img,
          .side-resume-item.is-active .fox-side-emerge-clip img {
            transform: translateY(0px) scale(1) !important;
            transition: transform 0.36s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.04s !important;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between relative">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, 'HOME')}
            className="flex items-center gap-2.5 group select-none cursor-pointer animate-header-logo z-20"
          >
            <img 
              src="/Images/favicon.jpg" 
              alt="Pratham Survase" 
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg object-cover border border-slate-200/90 shadow-xs group-hover:scale-105 group-hover:border-[#0048DE]/40 transition-all duration-200 shrink-0"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-[17px] sm:text-[18px] font-bold tracking-tight text-slate-950 group-hover:text-[#0048DE] transition-colors duration-200">
              PRATHAM <span className="font-pixel text-[#0048DE] font-normal tracking-normal text-[1.08em]">SURVASE</span>
            </span>
          </a>

          {/* Center Navigation Links (Visible in Hero section, gracefully fades out on scroll) */}
          <nav 
            ref={navRef}
            onMouseLeave={() => setHoveredTab(null)}
            className={`hidden md:flex items-center gap-7 lg:gap-8 py-1 absolute left-1/2 -translate-x-1/2 font-condensed transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isPastHero 
                ? 'opacity-0 -translate-y-2.5 scale-95 pointer-events-none' 
                : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            }`}
          >
            {navLinks.map((link, idx) => {
              const isResume = link.name === 'RESUME';
              const isWhatIDo = link.name === 'WHAT I DO';
              const isAbout = link.name === 'ABOUT ME';
              const isWork = link.name === 'WORK';
              const isActive = activeTab === link.name || activeTab === link.label;
              const isHovered = hoveredTab === link.name || hoveredTab === link.label;
              const showFox = isResume && (isHovered || isActive || isResumeHovered);
              const showWhatIDo = isWhatIDo && (isHovered || isWhatIDoHovered);
              const showAbout = isAbout && (isHovered || isAboutHovered);
              const showWork = isWork && (isHovered || isWorkHovered);
              const displayText = isWhatIDo && showWhatIDo ? 'WHAT I DID' : link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => {
                    setHoveredTab(link.name);
                    if (isResume) setIsResumeHovered(true);
                    if (isWhatIDo) setIsWhatIDoHovered(true);
                    if (isAbout) setIsAboutHovered(true);
                    if (isWork) setIsWorkHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (isResume) setIsResumeHovered(false);
                    if (isWhatIDo) setIsWhatIDoHovered(false);
                    if (isAbout) setIsAboutHovered(false);
                    if (isWork) setIsWorkHovered(false);
                  }}
                  onClick={(e) => handleLinkClick(e, link.name)}
                  style={{ animationDelay: `${300 + idx * 120}ms` }}
                  className={`relative inline-flex items-center py-1 text-[18px] sm:text-[19px] uppercase tracking-normal transition-colors duration-200 cursor-pointer select-none whitespace-nowrap animate-header-nav-item ${
                    isResume ? 'nav-resume-item' : ''
                  } ${
                    isWhatIDo ? 'nav-what-i-do-item' : ''
                  } ${
                    isAbout ? 'nav-about-item' : ''
                  } ${
                    isWork ? 'nav-work-item' : ''
                  } ${
                    showFox || showWhatIDo || showAbout || showWork || isHovered ? 'is-hovered' : ''
                  } ${
                    isActive ? 'is-active text-slate-950 font-bold' : isHovered ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-950 font-semibold'
                  }`}
                >
                  <span ref={(el) => (linkRefs.current[link.name] = el)} className="transition-all duration-150">
                    {displayText}
                  </span>

                  {/* Work Duck Typing Meme Doodle */}
                  {isWork && (
                    <span 
                      aria-hidden="true" 
                      className="work-doodle-container"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: showWork ? '46px' : '0px',
                        marginLeft: showWork ? '6px' : '0px',
                        opacity: showWork ? 1 : 0,
                        transform: showWork ? 'scale(1) translateY(0px)' : 'scale(0.5) translateY(6px)',
                        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out, transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        verticalAlign: 'middle',
                      }}
                    >
                      <img 
                        src="/Images/doodle-nav-work.png" 
                        alt="Duck working at laptop doodle" 
                        draggable="false"
                        style={{
                          width: '46px',
                          height: '40px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.12))',
                        }}
                      />
                    </span>
                  )}

                  {/* About Me Leaning Meme Doodle */}
                  {isAbout && (
                    <span 
                      aria-hidden="true" 
                      className="about-me-doodle-container"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: showAbout ? '42px' : '0px',
                        marginLeft: showAbout ? '6px' : '0px',
                        opacity: showAbout ? 1 : 0,
                        transform: showAbout ? 'scale(1) translateY(0px)' : 'scale(0.5) translateY(6px)',
                        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out, transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        verticalAlign: 'middle',
                      }}
                    >
                      <img 
                        src="/Images/doodle-about-me.png" 
                        alt="About me cool meme doodle" 
                        draggable="false"
                        style={{
                          width: '42px',
                          height: '42px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.12))',
                        }}
                      />
                    </span>
                  )}

                  {/* What I Did Meme Doodle */}
                  {isWhatIDo && (
                    <span 
                      aria-hidden="true" 
                      className="what-i-did-doodle-container"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: showWhatIDo ? '46px' : '0px',
                        marginLeft: showWhatIDo ? '7px' : '0px',
                        opacity: showWhatIDo ? 1 : 0,
                        transform: showWhatIDo ? 'scale(1) translateY(0px)' : 'scale(0.5) translateY(6px)',
                        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out, transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        verticalAlign: 'middle',
                      }}
                    >
                      <img 
                        src="/Images/doodle-what-i-did.png" 
                        alt="What I did meme doodle" 
                        draggable="false"
                        style={{
                          width: '46px',
                          height: '38px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.12))',
                        }}
                      />
                    </span>
                  )}

                  {/* Warrior Fox emerging from Black Hole portal at the line level beside RESUME */}
                  {isResume && (
                    <span 
                      aria-hidden="true" 
                      className="fox-portal-wrapper"
                      style={{
                        position: 'absolute',
                        left: '100%',
                        marginLeft: '5px',
                        bottom: '0px',
                        width: '38px',
                        height: '54px',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      {/* Black hole portal disc on the line level */}
                      <span
                        className="fox-black-hole"
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          left: '50%',
                          transform: `translateX(-50%) ${showFox ? 'scale(1)' : 'scale(0)'}`,
                          width: '32px',
                          height: '5px',
                          borderRadius: '50%',
                          background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.38) 0%, rgba(15, 23, 42, 0.18) 55%, rgba(0, 72, 222, 0.1) 80%, transparent 100%)',
                          boxShadow: '0 0 6px rgba(0, 72, 222, 0.25)',
                          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out',
                          opacity: showFox ? 1 : 0,
                          zIndex: 1,
                        }}
                      />

                      {/* Emerging fox clip container */}
                      <span
                        className="fox-emerge-clip"
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          left: '0px',
                          width: '38px',
                          height: '52px',
                          overflow: 'hidden',
                          zIndex: 2,
                        }}
                      >
                        <img 
                          src="/Images/doodle-fox.png" 
                          alt="Warrior fox with sword doodle" 
                          draggable="false"
                          style={{
                            width: '38px',
                            height: '50px',
                            objectFit: 'contain',
                            display: 'block',
                            maxWidth: 'none',
                            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
                            transformOrigin: 'bottom center',
                            transform: showFox 
                              ? 'translateY(0px) scale(1)' 
                              : 'translateY(54px) scale(0.65)',
                            transition: showFox
                              ? 'transform 0.36s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.04s'
                              : 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                            willChange: 'transform',
                          }}
                        />
                      </span>
                    </span>
                  )}
                </a>
              );
            })}

            {/* Hardware-accelerated sliding blue underline indicator */}
            <span 
              className="absolute bottom-0 left-0 h-[2.5px] bg-[#0048DE] rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />
          </nav>

          {/* Right Action Button */}
          {/* Right Action Button */}
          <div className="hidden md:flex items-center animate-header-btn z-20">
            <button
              onClick={(e) => handleLinkClick(e, 'Contact')}
              className="group relative overflow-hidden inline-flex items-center justify-center bg-[#0048DE] hover:bg-[#003dc4] text-white w-[148px] h-[38px] rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md hover:shadow-blue-600/20 active:scale-98 cursor-pointer select-none"
            >
              {/* Smug Fish coming in flush from the left (no gap above, below, or on left) */}
              <img 
                src="/Images/doodle-fish.png" 
                alt="Smug fish meme doodle" 
                className="absolute inset-y-0 left-0 h-full w-auto object-cover object-left pointer-events-none select-none -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
              />
              <span className="relative z-20 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                Get in Touch
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center animate-header-btn">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 shadow-lg animate-fadeIn font-condensed">
            {navLinks.map((link) => {
              const isResume = link.name === 'RESUME';
              const isWhatIDo = link.name === 'WHAT I DO';
              const isActive = activeTab === link.name || activeTab === link.label;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link.name);
                  }}
                  className={`flex items-center justify-between py-2.5 px-3 text-lg uppercase tracking-wide rounded-md transition-all duration-200 ${
                    isActive 
                      ? 'text-[#0048DE] font-bold bg-blue-50/70 border-l-3 border-[#0048DE]' 
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.name}</span>
                    {link.name === 'ABOUT ME' && (
                      <img 
                        src="/Images/doodle-about-me.png" 
                        alt="About me leaning meme doodle" 
                        style={{
                          width: '26px',
                          height: '28px',
                          objectFit: 'contain',
                          display: 'inline-block',
                          maxWidth: 'none',
                        }}
                      />
                    )}
                    {link.name === 'WORK' && (
                      <img 
                        src="/Images/doodle-nav-work.png" 
                        alt="Duck working doodle" 
                        style={{
                          width: '28px',
                          height: '24px',
                          objectFit: 'contain',
                          display: 'inline-block',
                          maxWidth: 'none',
                        }}
                      />
                    )}
                    {isResume && (
                      <img 
                        src="/Images/doodle-fox.png" 
                        alt="Warrior fox doodle" 
                        style={{
                          width: '22px',
                          height: '29px',
                          objectFit: 'contain',
                          display: 'inline-block',
                          maxWidth: 'none',
                        }}
                      />
                    )}
                    {isWhatIDo && (
                      <img 
                        src="/Images/doodle-what-i-did.png" 
                        alt="What I did meme doodle" 
                        style={{
                          width: '28px',
                          height: '23px',
                          objectFit: 'contain',
                          display: 'inline-block',
                          maxWidth: 'none',
                        }}
                      />
                    )}
                  </span>
                </a>
              );
            })}
            <div className="pt-2">
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, 'Contact');
                }}
                className="group relative overflow-hidden flex items-center justify-center w-full bg-[#0048DE] hover:bg-[#003dc4] text-white h-[42px] rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer select-none"
              >
                <img 
                  src="/Images/doodle-fish.png" 
                  alt="Smug fish meme doodle" 
                  className="absolute inset-y-0 left-0 h-full w-auto object-cover object-left pointer-events-none select-none -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
                />
                <span className="relative z-20 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5">
                  Get in Touch
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Right-Side Editorial Bold Typography Navigation (Matches screenshot style) */}
      <aside 
        className={`fixed right-6 sm:right-8 lg:right-12 xl:right-14 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isPastHero 
            ? 'opacity-100 translate-x-0 pointer-events-auto' 
            : 'opacity-0 translate-x-10 pointer-events-none'
        }`}
        aria-label="Side typography navigation"
      >
        <nav className="flex flex-col items-end gap-1 sm:gap-1.5 select-none font-condensed">
          {sideNavLinks.map((link) => {
            const isResume = link.name === 'RESUME';
            const isWhatIDo = link.name === 'WHAT I DO';
            const isAbout = link.name === 'ABOUT ME';
            const isWork = link.name === 'WORK';
            const isWebsites = link.name === 'WEBSITES';
            const isArtwork = link.name === 'ARTWORK';
            const isActive = activeTab === link.name || activeTab === link.label;
            const showSideFox = isResume && (sideResumeHovered || isActive);
            const showSideWhatIDo = isWhatIDo && sideWhatIDoHovered;
            const showSideAbout = isAbout && sideAboutHovered;
            const showSideWork = isWork && sideWorkHovered;
            const showSideWebsites = isWebsites && sideWebsitesHovered;
            const showSideArtwork = isArtwork && sideArtworkHovered;
            const sideDisplayText = isWhatIDo && showSideWhatIDo ? 'WHAT I DID' : link.name;

            return (
              <button
                key={link.name}
                onMouseEnter={() => {
                  if (isResume) setSideResumeHovered(true);
                  if (isWhatIDo) setSideWhatIDoHovered(true);
                  if (isAbout) setSideAboutHovered(true);
                  if (isWork) setSideWorkHovered(true);
                  if (isWebsites) setSideWebsitesHovered(true);
                  if (isArtwork) setSideArtworkHovered(true);
                }}
                onMouseLeave={() => {
                  if (isResume) setSideResumeHovered(false);
                  if (isWhatIDo) setSideWhatIDoHovered(false);
                  if (isAbout) setSideAboutHovered(false);
                  if (isWork) setSideWorkHovered(false);
                  if (isWebsites) setSideWebsitesHovered(false);
                  if (isArtwork) setSideArtworkHovered(false);
                }}
                onClick={(e) => handleLinkClick(e, link.name)}
                className={`group flex items-center justify-end text-right text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-black uppercase tracking-[-0.01em] leading-none h-8 sm:h-9 md:h-10 lg:h-12 transition-all duration-200 cursor-pointer focus:outline-none relative ${
                  isResume ? 'side-resume-item' : ''
                } ${
                  isWhatIDo ? 'side-what-i-do-item' : ''
                } ${
                  isAbout ? 'side-about-item' : ''
                } ${
                  isWork ? 'side-work-item' : ''
                } ${
                  isWebsites ? 'side-websites-item' : ''
                } ${
                  isArtwork ? 'side-artwork-item' : ''
                } ${
                  isActive 
                    ? 'is-active text-slate-950 font-black -translate-x-1' 
                    : 'text-slate-300 hover:text-slate-900 font-extrabold hover:-translate-x-1.5'
                }`}
              >
                <span className="relative inline-flex items-center justify-end">
                  {/* Active Indicator Pulse Dot */}
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0048DE] mr-2.5 shrink-0 animate-pulse shadow-sm shadow-blue-500/40" />
                  )}

                  {/* Text Label */}
                  <span className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    {sideDisplayText}
                  </span>

                  {/* Absolute Popup Doodles (Zero in-flow height so all item gaps remain 100% equal) */}
                  {isAbout && (
                    <span 
                      aria-hidden="true" 
                      style={{
                        position: 'absolute',
                        right: '100%',
                        marginRight: showSideAbout ? '12px' : '0px',
                        top: '50%',
                        transform: showSideAbout ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.6)',
                        opacity: showSideAbout ? 1 : 0,
                        transition: 'opacity 0.22s ease-out, transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), margin-right 0.28s ease-out',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      <img 
                        src="/Images/doodle-about-me.png" 
                        alt="About me cool meme doodle" 
                        draggable="false"
                        style={{
                          width: '46px',
                          height: '46px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                        }}
                      />
                    </span>
                  )}

                  {isWork && (
                    <span 
                      aria-hidden="true" 
                      style={{
                        position: 'absolute',
                        right: '100%',
                        marginRight: showSideWork ? '12px' : '0px',
                        top: '50%',
                        transform: showSideWork ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.6)',
                        opacity: showSideWork ? 1 : 0,
                        transition: 'opacity 0.22s ease-out, transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), margin-right 0.28s ease-out',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      <img 
                        src="/Images/doodle-nav-work.png" 
                        alt="Duck working at laptop doodle" 
                        draggable="false"
                        style={{
                          width: '48px',
                          height: '42px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                        }}
                      />
                    </span>
                  )}

                  {isWhatIDo && (
                    <span 
                      aria-hidden="true" 
                      style={{
                        position: 'absolute',
                        right: '100%',
                        marginRight: showSideWhatIDo ? '12px' : '0px',
                        top: '50%',
                        transform: showSideWhatIDo ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.6)',
                        opacity: showSideWhatIDo ? 1 : 0,
                        transition: 'opacity 0.22s ease-out, transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), margin-right 0.28s ease-out',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      <img 
                        src="/Images/doodle-what-i-did.png" 
                        alt="What I did meme doodle" 
                        draggable="false"
                        style={{
                          width: '48px',
                          height: '40px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                        }}
                      />
                    </span>
                  )}

                  {isWebsites && (
                    <span 
                      aria-hidden="true" 
                      style={{
                        position: 'absolute',
                        right: '100%',
                        marginRight: showSideWebsites ? '12px' : '0px',
                        top: '50%',
                        transform: showSideWebsites ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.6)',
                        opacity: showSideWebsites ? 1 : 0,
                        transition: 'opacity 0.22s ease-out, transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), margin-right 0.28s ease-out',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      <img 
                        src="/Images/doodle-cat.png" 
                        alt="Live websites cat doodle" 
                        draggable="false"
                        style={{
                          width: '46px',
                          height: '42px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                        }}
                      />
                    </span>
                  )}

                  {isArtwork && (
                    <span 
                      aria-hidden="true" 
                      style={{
                        position: 'absolute',
                        right: '100%',
                        marginRight: showSideArtwork ? '12px' : '0px',
                        top: '50%',
                        transform: showSideArtwork ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.6)',
                        opacity: showSideArtwork ? 1 : 0,
                        transition: 'opacity 0.22s ease-out, transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), margin-right 0.28s ease-out',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      <img 
                        src="/Images/doodle-artwork.png" 
                        alt="Artwork toast doodle" 
                        draggable="false"
                        style={{
                          width: '44px',
                          height: '42px',
                          objectFit: 'contain',
                          display: 'block',
                          maxWidth: 'none',
                          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                        }}
                      />
                    </span>
                  )}

                  {isResume && (
                    <span 
                      aria-hidden="true" 
                      className="fox-side-portal-wrapper"
                      style={{
                        position: 'absolute',
                        right: '100%',
                        marginRight: '12px',
                        bottom: '1px',
                        width: '44px',
                        height: '60px',
                        pointerEvents: 'none',
                        zIndex: 60,
                      }}
                    >
                      {/* Black hole portal disc on the line level */}
                      <span
                        className="fox-side-black-hole"
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          left: '50%',
                          transform: `translateX(-50%) ${showSideFox ? 'scale(1)' : 'scale(0)'}`,
                          width: '36px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.38) 0%, rgba(15, 23, 42, 0.18) 55%, rgba(0, 72, 222, 0.1) 80%, transparent 100%)',
                          boxShadow: '0 0 6px rgba(0, 72, 222, 0.25)',
                          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out',
                          opacity: showSideFox ? 1 : 0,
                          zIndex: 1,
                        }}
                      />

                      {/* Emerging fox clip container */}
                      <span
                        className="fox-side-emerge-clip"
                        style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '0px',
                          width: '44px',
                          height: '58px',
                          overflow: 'hidden',
                          zIndex: 2,
                        }}
                      >
                        <img 
                          src="/Images/doodle-fox.png" 
                          alt="Warrior fox doodle" 
                          draggable="false"
                          style={{
                            width: '44px',
                            height: '58px',
                            objectFit: 'contain',
                            display: 'block',
                            maxWidth: 'none',
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.22))',
                            transformOrigin: 'bottom center',
                            transform: showSideFox 
                              ? 'translateY(0px) scale(1)' 
                              : 'translateY(60px) scale(0.65)',
                            transition: showSideFox
                              ? 'transform 0.36s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.04s'
                              : 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                            willChange: 'transform',
                          }}
                        />
                      </span>
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
