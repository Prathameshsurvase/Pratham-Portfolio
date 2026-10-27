import React from 'react';
import { X, Download, ExternalLink, Award, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header Profile */}
        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100 pr-8">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0048DE] to-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-600/20 shrink-0">
            PS
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Pratham Survase</h3>
              <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0048DE] font-semibold border border-blue-200/50">
                UI/UX Designer
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              prathameshsurvase31@gmail.com • +91 9405374711 • Vadodara, India
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700">
          
          {/* Key Award Banner */}
          <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-xl border border-amber-200/70 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0">
              <Award size={20} />
            </div>
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-amber-900">
                Best Performer Award — Vtech Solutions
              </div>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Awarded for revamping the old vTech healthcare website within an accelerated 1-week turnaround.
              </p>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase size={16} className="text-[#0048DE]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Professional Experience
              </h4>
            </div>

            <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
              
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-bold text-slate-900 text-sm">UI/UX Designer — INFOTEK Solutions</span>
                  <span className="text-xs text-[#0048DE] font-semibold">Jun 2025 – Present</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">Vadodara, India (On-site)</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Designed and delivered end-to-end UI/UX for 8+ client websites across real estate, logistics, manufacturing, automotive, and ed-tech verticals.</li>
                  <li>Applied AI-assisted design-to-code workflows (“vibe coding”) using Figma, Claude, and Antigravity to accelerate developer handoff.</li>
                  <li>Resolved cross-device UI glitches, animation issues, and integrated WhatsApp Cloud & CRM APIs into production.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-bold text-slate-900 text-sm">Web Designer — IMS Group</span>
                  <span className="text-xs text-slate-500">Aug 2024 – Jun 2025</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">Ahmedabad, India</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Utilized Duda and Webflow to build responsive, visually compelling corporate web presence and portfolio.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-bold text-slate-900 text-sm">UI/UX Designer — BMBC Foundation</span>
                  <span className="text-xs text-slate-500">Apr 2024 – Jul 2024</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">Remote</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Collaborated with US-based clients on high-conversion dashboards and website revamps (+40% positive stakeholder feedback).</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-bold text-slate-900 text-sm">UI/UX Designer — Vtech Solutions</span>
                  <span className="text-xs text-slate-500">Oct 2023 – Mar 2024</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">Vadodara, India</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Drove e-commerce redesign (+25% conversion), cut university bounce rates by 30%, and slashed page load times by 50%.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-bold text-slate-900 text-sm">UI/UX Intern — CH Developers</span>
                  <span className="text-xs text-slate-500">Apr 2023 – Oct 2023</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">Remote</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Designed Crypsii (crypto news platform mobile app) and FarmClub (plant-based e-commerce platform).</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles size={16} className="text-[#0048DE]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Skills &amp; Technologies
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="block font-bold text-xs text-slate-900 mb-1">Design &amp; Prototyping</span>
                <span className="text-xs text-slate-600 leading-relaxed">
                  Figma, Illustrator, Photoshop, Canva, Wireframing, Responsive Design, Design Systems
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="block font-bold text-xs text-slate-900 mb-1">Web &amp; Frameworks</span>
                <span className="text-xs text-slate-600 leading-relaxed">
                  React JS, Next JS, JavaScript, HTML, CSS, Webflow, Framer, Duda
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="block font-bold text-xs text-slate-900 mb-1">AI &amp; Vibe Coding</span>
                <span className="text-xs text-slate-600 leading-relaxed">
                  Antigravity, Claude Code, Cursor, Figma Make, Magnific AI, Gemini, DeepSeek, Hostinger
                </span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="flex items-start gap-3 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100/70">
            <GraduationCap size={20} className="text-[#0048DE] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Bachelor of Technology — Computer Science Engineering
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Parul Institute of Technology (Apr 2019 – Apr 2023) • Vadodara, India
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-4 border-t border-slate-100">
          <a
            href="/Pratham_Survase_Resume_Updated.pdf"
            download="Pratham_Survase_Resume.pdf"
            className="flex-1 bg-[#0048DE] hover:bg-[#003dc4] text-white py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition-all cursor-pointer text-center"
          >
            <Download size={16} />
            <span>Download Resume (PDF)</span>
          </a>
          <a
            href="/Pratham_Survase_Resume_Updated.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:w-auto px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <span>View Full PDF</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
