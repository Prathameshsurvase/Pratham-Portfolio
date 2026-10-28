import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Download, 
  ExternalLink, 
  MapPin, 
  Mail, 
  Phone,
  Award 
} from 'lucide-react';
import LanyardPass from './LanyardPass';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Exact pass content & styling from the Work Experience section
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

  const skillsList = [
    'UI/UX Design',
    'Design Systems',
    'Wireframing',
    'Prototyping',
    'Responsive Layouts',
    'User Research',
    'Design-to-Code',
    'Interaction Design',
    'Vibe Coding'
  ];

  // Exact uploaded software logos from /logos/
  const softwareList = [
    { name: 'Figma', logo: '/logos/figma-icon.svg' },
    { name: 'Adobe Illustrator', logo: '/logos/adobe-illustrator-icon.svg' },
    { name: 'Adobe Photoshop', logo: '/logos/adobe-photoshop-icon.svg' },
    { name: 'React', logo: '/logos/react-js-icon.svg' },
    { name: 'Next.js', logo: '/logos/nextjs-icon.svg' },
    { name: 'Webflow', logo: '/logos/webflow-icon.svg' },
    { name: 'Claude Code', logo: '/logos/claude-code-icon.svg' },
    { name: 'Cursor AI', logo: '/logos/cursor-ai-code-icon.svg' },
    { name: 'Google Antigravity', logo: '/logos/google-antigravity-icon.svg' },
    { name: 'VS Code', logo: '/logos/visual-studio-code-icon.svg' },
    { name: 'Canva', logo: '/logos/canva-icon.svg' },
    { name: 'Framer', logo: '/logos/framer-black-icon.svg' },
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[680px] h-[88vh] sm:h-[90vh] bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_25px_90px_-15px_rgba(15,23,42,0.4)] border border-slate-200/90 overflow-hidden flex flex-col"
      >
        {/* Top-Right Quick Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* ========================================================== */}
        {/* MAIN SCROLLABLE RESUME SHEET (Matching Reference Layout)   */}
        {/* ========================================================== */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-8 select-text">
          
          {/* -------------------------------------------------------- */}
          {/* SECTION 1: Top Hero (Behind the Visuals & 3D Lanyard ID) */}
          {/* -------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-start relative">
            
            {/* LEFT SIDE: Behind the Visuals & Let's Connect */}
            <div className="md:col-span-7 pr-0 md:pr-2">
              <div className="mb-3.5">
                <h1 className="text-4xl sm:text-5xl md:text-[54px] font-condensed font-extrabold uppercase tracking-wide leading-none">
                  <span className="text-slate-950">PRATHAM</span> <span className="text-[#0048DE]">SURVASE</span>
                </h1>
                <div className="text-xs sm:text-[13px] font-condensed font-bold uppercase tracking-wider text-[#0048DE] mt-2.5 flex items-center gap-2">
                  <span>UI/UX Designer</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-slate-600 font-semibold">Product Designer</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-slate-600 font-semibold">Vibe Coder</span>
                </div>
              </div>
              
              <div className="space-y-2.5 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                <p>
                  I'm a <strong>UI/UX &amp; Product Designer</strong> specializing in crafting intuitive, human-centered digital experiences and scalable design systems. Through various client and product challenges, the experience I've gained has helped me stay persistent, eager to learn, and continuously elevate my craft with every interface I create.
                </p>
                <p>
                  My strengths lie in rapid prototyping, clean design systems, user-centric empathy, and the ability to seamlessly bridge Figma designs into interactive code with modern AI-assisted vibe workflows.
                </p>
              </div>

              {/* Let's Connect */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-slate-950 mb-3.5">
                  Let's <span className="text-[#0048DE]">Connect</span>
                </h2>
                
                <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <MapPin size={13} />
                    </span>
                    <span>Vadodara, Gujarat, India</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Mail size={13} />
                    </span>
                    <a 
                      href="mailto:prathameshsurvase31@gmail.com" 
                      className="hover:text-[#0048DE] transition-colors underline-offset-2 hover:underline"
                    >
                      prathameshsurvase31@gmail.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Phone size={13} />
                    </span>
                    <a 
                      href="tel:+919405374711" 
                      className="hover:text-[#0048DE] transition-colors"
                    >
                      +91 9405374711
                    </a>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center gap-3">
                    <img 
                      src="/logos/linkedin-icon.png" 
                      alt="LinkedIn" 
                      className="w-6 h-6 rounded-[5px] object-contain shrink-0" 
                    />
                    <a 
                      href="https://linkedin.com/in/prathamesh-survase" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#0048DE] transition-colors underline-offset-2 hover:underline"
                    >
                      linkedin.com/in/prathamesh-survase
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Exact 3D Lanyard ID Card from Work Experience (dropping from top of popup div) */}
            <div className="md:col-span-5 relative w-full h-[360px] sm:h-[400px] md:h-[420px] -mt-5 sm:-mt-7 md:-mt-8 flex items-center justify-center pointer-events-auto select-none overflow-visible">
              <motion.div
                initial={{ y: '-100%', x: -20, rotate: -4, opacity: 0 }}
                animate={
                  isOpen
                    ? {
                        y: ['-100%', '2.6%', '-1.0%', '0.3%', '0%'],
                        x: [-20, 8, -3, 1, 0],
                        rotate: [-4, 2.4, -1.0, 0.3, 0],
                        opacity: 1,
                      }
                    : { y: '-100%', opacity: 0 }
                }
                transition={{
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
                }}
                style={{ transformOrigin: 'top center' }}
                className="w-full h-full pointer-events-auto"
              >
                <LanyardPass
                  content={passContent}
                  look={passLook}
                  layout={{ size: 255, thickness: 3.2 }}
                  motion={true}
                  dropTrigger={isOpen}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* SECTION 2: Middle Body (Education, Skills, Software | Exp) */}
          {/* -------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-start pt-7 border-t border-slate-100">
            
            {/* LEFT COLUMN: Education, Skills, Software */}
            <div className="md:col-span-5 space-y-6">
              
              {/* 1. Education */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-slate-950 mb-3.5">
                  Education<span className="text-[#0048DE]">.</span>
                </h2>

                <div className="relative pl-5 border-l-2 border-slate-200 ml-1.5">
                  <div className="relative">
                    <span className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-slate-900 border-2 border-white ring-1 ring-slate-200" />
                    <div className="text-xs font-condensed font-bold uppercase tracking-wider text-[#0048DE]">
                      Apr 2019 – Apr 2023
                    </div>
                    <div className="text-sm font-condensed font-bold text-slate-950 uppercase tracking-wide mt-0.5">
                      Parul Institute of Technology
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      Bachelor of Technology — Computer Science Engineering
                    </p>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Vadodara, Gujarat, India
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Skills */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-slate-950 mb-3">
                  Skills<span className="text-[#0048DE]">.</span>
                </h2>

                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs font-condensed font-bold uppercase tracking-wider bg-[#F8F9FA] hover:bg-blue-50/60 hover:text-[#0048DE] hover:border-[#0048DE]/40 text-slate-800 border border-slate-200/80 transition-colors shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Software: Using the exact uploaded logos */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-slate-950 mb-3">
                  Software<span className="text-[#0048DE]">.</span>
                </h2>

                <div className="flex flex-wrap items-center gap-2.5">
                  {softwareList.map((sw) => (
                    <div
                      key={sw.name}
                      title={sw.name}
                      className="w-11 h-11 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center p-2 hover:scale-110 transition-all duration-200 cursor-pointer group relative"
                    >
                      <img
                        src={sw.logo}
                        alt={sw.name}
                        className="w-full h-full object-contain select-none"
                        loading="lazy"
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30 shadow-xs">
                        {sw.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Experience Timeline */}
            <div className="md:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-slate-950 mb-4">
                Experience<span className="text-[#0048DE]">.</span>
              </h2>

              <div className="space-y-6">
                
                {/* 1. INFOTEK SOLUTIONS */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-16 sm:w-18 shrink-0 text-right pt-0.5">
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#0048DE] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50">
                      06/2025
                    </span>
                    <div className="text-[11px] font-condensed font-bold uppercase tracking-wider text-slate-400 mt-1">Present</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-slate-200 pb-2">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#0048DE] border-2 border-white ring-1 ring-blue-300" />
                    
                    <h3 className="text-base sm:text-lg font-condensed font-bold text-[#0048DE] uppercase tracking-wide">
                      INFOTEK SOLUTIONS
                    </h3>
                    <div className="text-xs font-medium text-slate-700 mt-0.5">
                      Role: <span className="text-[#0048DE] font-semibold">UI/UX Designer &amp; Vibe Coder</span>
                    </div>

                    <div className="mt-1.5 text-xs text-slate-600 space-y-1">
                      <div className="font-condensed font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Description:
                      </div>
                      <p>• Engaging in end-to-end design &amp; launch for 8+ client platforms across real estate, logistics, manufacturing, and ed-tech.</p>
                      <p>• Spearheaded AI-assisted design-to-code workflows using Figma, Claude, and Antigravity to accelerate developer delivery.</p>
                      <p>• Architected responsive design systems and production touch &amp; micro-interactions.</p>
                    </div>
                  </div>
                </div>

                {/* 2. IMS GROUP */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-16 sm:w-18 shrink-0 text-right pt-0.5">
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      08/2024
                    </span>
                    <div className="text-[11px] font-condensed font-bold uppercase tracking-wider text-slate-400 mt-1">Jun 2025</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-slate-200 pb-2">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white" />
                    
                    <h3 className="text-base sm:text-lg font-condensed font-bold text-slate-950 uppercase tracking-wide">
                      IMS GROUP
                    </h3>
                    <div className="text-xs font-medium text-slate-700 mt-0.5">
                      Role: Web Designer
                    </div>

                    <div className="mt-1.5 text-xs text-slate-600 space-y-1">
                      <div className="font-condensed font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Description:
                      </div>
                      <p>• Built high-performance corporate landing pages and design systems in Webflow &amp; Duda.</p>
                      <p>• Translated branding concepts into clean, conversion-focused user interfaces.</p>
                    </div>
                  </div>
                </div>

                {/* 3. BMBC FOUNDATION */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-16 sm:w-18 shrink-0 text-right pt-0.5">
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      04/2024
                    </span>
                    <div className="text-[11px] font-condensed font-bold uppercase tracking-wider text-slate-400 mt-1">Jul 2024</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-slate-200 pb-2">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white" />
                    
                    <h3 className="text-base sm:text-lg font-condensed font-bold text-slate-950 uppercase tracking-wide">
                      BMBC FOUNDATION
                    </h3>
                    <div className="text-xs font-medium text-slate-700 mt-0.5">
                      Role: UI/UX Designer (Remote / US Clients)
                    </div>

                    <div className="mt-1.5 text-xs text-slate-600 space-y-1">
                      <div className="font-condensed font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Description:
                      </div>
                      <p>• Overhauled dense multi-variable analytics into clean, scannable SaaS dashboards (+40% positive stakeholder feedback).</p>
                      <p>• Simplified heavy user flows for rapid data ingestion and team collaboration.</p>
                    </div>
                  </div>
                </div>

                {/* 4. VTECH SOLUTIONS */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-16 sm:w-18 shrink-0 text-right pt-0.5">
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                      10/2023
                    </span>
                    <div className="text-[11px] font-condensed font-bold uppercase tracking-wider text-slate-400 mt-1">Mar 2024</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-slate-200 pb-2">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white ring-1 ring-amber-300" />
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-condensed font-bold text-slate-950 uppercase tracking-wide">
                        VTECH SOLUTIONS
                      </h3>
                      <span className="text-[10px] font-condensed font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                        <Award size={11} className="text-amber-700 shrink-0" />
                        <span>Best Performer Award</span>
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-700 mt-0.5">
                      Role: UI/UX Designer
                    </div>

                    <div className="mt-1.5 text-xs text-slate-600 space-y-1">
                      <div className="font-condensed font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Description:
                      </div>
                      <p>• Spearheaded healthcare portal redesign with 1-week turnaround, slashing page load times by 50% and bounce rates by 30%.</p>
                      <p>• Honored with the Best Performer Award for high velocity execution and user empathy.</p>
                    </div>
                  </div>
                </div>

                {/* 5. CH DEVELOPERS */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-16 sm:w-18 shrink-0 text-right pt-0.5">
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      04/2023
                    </span>
                    <div className="text-[11px] font-condensed font-bold uppercase tracking-wider text-slate-400 mt-1">Oct 2023</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-slate-200">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white" />
                    
                    <h3 className="text-base sm:text-lg font-condensed font-bold text-slate-950 uppercase tracking-wide">
                      CH DEVELOPERS
                    </h3>
                    <div className="text-xs font-medium text-slate-700 mt-0.5">
                      Role: UI/UX Product Intern
                    </div>

                    <div className="mt-1.5 text-xs text-slate-600 space-y-1">
                      <div className="font-condensed font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Description:
                      </div>
                      <p>• Designed mobile flows for Crypsii (crypto intelligence platform) and FarmClub (plant-based e-commerce platform).</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>



        </div>

        {/* ========================================================== */}
        {/* BOTTOM MODAL BAR: Quick Action Buttons                     */}
        {/* ========================================================== */}
        <div className="flex items-center justify-end px-5 sm:px-8 py-3 border-t border-slate-100 bg-white/95 backdrop-blur-sm z-30 relative shrink-0">
          <div className="flex items-center gap-2">
            <a
              href="/Pratham_Survase_Resume_Updated.pdf"
              download="Pratham_Survase_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0048DE] hover:bg-[#003dc4] text-white text-xs font-condensed font-bold uppercase tracking-wider shadow-sm hover:shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <a
              href="/Pratham_Survase_Resume_Updated.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-[#0048DE]/40 hover:text-[#0048DE] hover:bg-slate-50 text-slate-700 text-xs font-condensed font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            >
              <ExternalLink size={12} />
              <span>Full PDF</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
