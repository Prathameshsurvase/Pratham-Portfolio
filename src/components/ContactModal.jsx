import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  Mail,
  Phone
} from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct prefilled mailto link so inquiry goes straight to Pratham
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
`Hi Pratham,

I would like to discuss a project with you.

— Contact Details —
Name: ${formData.name}
Email: ${formData.email}
Company / Organization: ${formData.company || 'N/A'}

— Project Details / Message —
${formData.message}

Looking forward to your response!`
    );

    const mailtoUrl = `mailto:prathameshsurvase31@gmail.com?subject=${subject}&body=${body}`;

    try {
      window.open(mailtoUrl, '_blank');
    } catch {
      window.location.href = mailtoUrl;
    }

    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_25px_80px_-15px_rgba(15,23,42,0.3)] border border-slate-200/90 overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
      >
        {/* Top-Right Quick Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* ======================================================== */}
        {/* LEFT COLUMN: Visual Artwork Panel                        */}
        {/* ======================================================== */}
        <div className="w-full md:w-[40%] lg:w-[42%] p-2.5 sm:p-3 flex flex-col shrink-0">
          <div className="relative h-full w-full rounded-2xl bg-[#395036] border border-black/5 overflow-hidden flex flex-col justify-between p-4 sm:p-5 select-none min-h-[220px] md:min-h-0 group shadow-inner">
            
            {/* Visual Art: Man with vintage computer in green field saying 'hey' */}
            <img
              src="/Images/contact-hey.jpg"
              alt="Retro computer in a tranquil green field saying hey"
              draggable="false"
              className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
            />

            {/* Subtle top gradient for badge contrast */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/25 via-black/5 to-transparent pointer-events-none" />

            {/* Top Status Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-slate-900 text-[10.5px] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-condensed font-bold uppercase tracking-wider">Available for work</span>
              </div>
            </div>

            {/* Bottom spacer */}
            <div className="relative z-10 pointer-events-none" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Clean Content & Form (Reference Layout)    */}
        {/* ======================================================== */}
        <div className="flex-1 p-5 sm:p-6 md:p-7 flex flex-col justify-between overflow-y-auto">
          {submitted ? (
            /* Submission Confirmation Screen */
            <div className="py-10 sm:py-14 text-center space-y-4 my-auto animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center mx-auto text-[#0048DE] shadow-sm">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-condensed font-extrabold uppercase tracking-wide text-slate-950">
                  Message Dispatched!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                  Thank you for reaching out, <strong className="text-slate-900">{formData.name}</strong>! Pratham will review your message and reply within 24 hours.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-condensed font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Reference Header: ← Back Button */}
              <button 
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors w-fit mb-3 cursor-pointer group"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                <span>Back</span>
              </button>

              {/* Title & Subhead Matching Website Typography */}
              <div className="mb-4">
                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-[#0048DE] mb-1">
                  Get in touch
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-[34px] font-condensed font-extrabold uppercase tracking-wide text-slate-950 leading-[1.08]">
                  Where Ideas <br />
                  Come Alive.
                </h3>
              </div>

              {/* Streamlined Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* 1. Full Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-[#ECEEF2] focus:bg-white border border-transparent focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/15 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all font-normal"
                  />
                </div>

                {/* 2. Email Address */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-[#ECEEF2] focus:bg-white border border-transparent focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/15 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all font-normal"
                  />
                </div>

                {/* 3. Company / Organization (Optional) */}
                <div>
                  <input
                    type="text"
                    placeholder="Company or project name (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-[#ECEEF2] focus:bg-white border border-transparent focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/15 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all font-normal"
                  />
                </div>

                {/* 4. Project Details or Inquiry */}
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell me about your project, goals, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-[#ECEEF2] focus:bg-white border border-transparent focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/15 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all resize-none font-normal"
                  />
                </div>

                {/* Send Message Button */}
                <div className="pt-0.5">
                  <button
                    type="submit"
                    className="w-full bg-[#0048DE] hover:bg-[#003dc4] text-white py-2.5 sm:py-3 rounded-xl font-condensed font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-blue-600/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send size={15} />
                  </button>
                </div>
              </form>

              {/* Minimal, Simple Call & Email Row (Clean & in-theme, No AI buttons) */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a 
                  href="mailto:prathameshsurvase31@gmail.com" 
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0048DE] transition-colors font-medium group min-w-0"
                >
                  <span className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-[#0048DE] flex items-center justify-center shrink-0 transition-colors">
                    <Mail size={12} />
                  </span>
                  <span className="truncate text-[11.5px]">prathameshsurvase31@gmail.com</span>
                </a>

                <a 
                  href="tel:+919405374711" 
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0048DE] transition-colors font-medium group shrink-0"
                >
                  <span className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-[#0048DE] flex items-center justify-center shrink-0 transition-colors">
                    <Phone size={12} />
                  </span>
                  <span className="text-[11.5px]">+91 9405374711</span>
                </a>
              </div>

              {/* Bottom Signature Branding Footer */}
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="font-condensed font-bold uppercase tracking-wider text-slate-800">
                  PRATHAM <span className="font-pixel text-[#0048DE] font-normal tracking-normal text-[1.08em]">SURVASE</span>
                </div>
                <div className="text-[10.5px]">
                  UI/UX &amp; Product Design • Vadodara, India
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
