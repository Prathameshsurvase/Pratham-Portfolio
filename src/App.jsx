import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import TextRevealSection from './components/TextRevealSection';
import AboutUs from './components/AboutUs';
import WorkExperience from './components/WorkExperience';
import OurServices from './components/OurServices';
import DifferentMinds from './components/DifferentMinds';
// import MissionVision from './components/MissionVision';
import InfiniteCanvasSection from './components/InfiniteCanvasSection';
import MotionTilesSection from './components/MotionTilesSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import CaseStudyModal from './components/CaseStudyModal';
import CustomCursor from './components/CustomCursor';
import TopScrollProgressBar from './components/TopScrollProgressBar';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth momentum scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Pause smooth scroll when a modal is open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (contactOpen || resumeOpen || caseStudyOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [contactOpen, resumeOpen, caseStudyOpen]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (lenisRef.current && el) {
      lenisRef.current.scrollTo(el, { offset: -20, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#0048DE] selection:text-white">
      {/* Custom Top Blue Scroll Bar */}
      <TopScrollProgressBar />

      {/* Dynamic 120 FPS Custom Cursor */}
      <CustomCursor />

      {/* 1. Header & Navigation */}
      <Navbar 
        onContactClick={() => setContactOpen(true)} 
        onResumeClick={() => setResumeOpen(true)}
        onCaseStudyClick={() => setCaseStudyOpen(true)}
        isModalOpen={contactOpen || resumeOpen || caseStudyOpen}
      />

      {/* 2. Hero Section (Image 1 in Figma) */}
      <main className="flex-1">
        <Hero 
          onExploreClick={scrollToAbout} 
        />

        {/* 3. Tech Stack & Platform Integrations Marquee (Image 2 in Figma) */}
        <TechMarquee />

        {/* 3.5. Design Philosophy Text Reveal on Scroll (Framer Component) */}
        <TextRevealSection />

        {/* 4. About Us Section with Vintage PC (Image 3 in Figma) */}
        <AboutUs 
          onLearnMoreClick={() => setResumeOpen(true)} 
        />

        {/* 4.5. Work Experience Section with 3D Lanyard Pass */}
        <WorkExperience />

        {/* 5. Our Services Section (Image 4 in Figma) */}
        <OurServices 
          onServiceClick={() => setContactOpen(true)} 
        />

        {/* 5.2. Live Worked Websites — Framer 3D Motion Tiles Showcase */}
        <MotionTilesSection />

        {/* 5.5. Infinite 3D Canvas Showcase (Edoardo Lunardi / Codrops Engine) */}
        <InfiniteCanvasSection />

        {/* 6. Different Minds Section (Figma Banner) */}
        {/* <DifferentMinds /> */}

        {/* 7. Mission & Vision 3D Rotating Cuboid Section */}
        {/* <MissionVision /> */}
      </main>

      {/* 6. Footer */}
      <Footer 
        onContactClick={() => setContactOpen(true)} 
      />

      {/* Modals */}
      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />

      <CaseStudyModal 
        isOpen={caseStudyOpen} 
        onClose={() => setCaseStudyOpen(false)} 
        onContactClick={() => {
          setCaseStudyOpen(false);
          setContactOpen(true);
        }}
      />
    </div>
  );
}
