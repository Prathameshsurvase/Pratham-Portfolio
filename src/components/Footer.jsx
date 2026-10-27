import React from 'react';

export default function Footer({ onContactClick }) {
  const handleNav = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'home') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const el = document.getElementById(targetId);
    if (window.__lenis && el) {
      window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-white border-t border-slate-200 py-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a href="#home" onClick={(e) => handleNav(e, 'home')} className="flex items-center group cursor-pointer">
            <span className="text-[15px] font-bold tracking-tight text-slate-950 group-hover:text-[#0048DE] transition-colors duration-200">
              PRATHAM <span className="font-pixel text-[#0048DE] font-normal tracking-normal text-[1.08em]">SURVASE</span>
            </span>
          </a>
          <span className="hidden sm:inline text-slate-300">|</span>
          <p className="text-xs text-slate-500">
            UI/UX Designer • Product Designer • Graphic Designer • Vibe Coder
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-slate-600">
          <a href="#home" onClick={(e) => handleNav(e, 'home')} className="hover:text-[#0048DE] transition-colors cursor-pointer">Home</a>
          <a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-[#0048DE] transition-colors cursor-pointer">About</a>
          <a href="#services" onClick={(e) => handleNav(e, 'services')} className="hover:text-[#0048DE] transition-colors cursor-pointer">What I Do</a>
          <button onClick={onContactClick} className="hover:text-[#0048DE] transition-colors cursor-pointer">Contact</button>
          <a 
            href="/Pratham_Survase_Resume_Updated.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#0048DE] font-semibold hover:underline"
          >
            Resume (PDF)
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-400 text-center md:text-right">
          © {new Date().getFullYear()} Pratham Survase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
