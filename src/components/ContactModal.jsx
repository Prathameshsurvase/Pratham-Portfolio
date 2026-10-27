import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  User, 
  Building2, 
  MessageSquare, 
  ArrowRight, 
  ExternalLink,
  Calendar
} from 'lucide-react';

const SERVICE_OPTIONS = [
  'UI/UX Design',
  'Web Development',
  'Design Systems',
  'AI & Vibe Coding',
  'Website Revamp',
  'Advisory / Other'
];

const TIMELINE_OPTIONS = [
  '< 2 Weeks',
  '2–4 Weeks',
  '1–2 Months',
  'Flexible'
];

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedServices, setSelectedServices] = useState(['UI/UX Design']);
  const [selectedTimeline, setSelectedTimeline] = useState('2–4 Weeks');
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

  // Prevent background scroll when open
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

  const toggleService = (service) => {
    setSelectedServices((prev) => 
      prev.includes(service)
        ? prev.length > 1 ? prev.filter((s) => s !== service) : prev
        : [...prev, service]
    );
  };

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('prathameshsurvase31@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct prefilled mailto link so inquiry goes straight to Pratham
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name} [${selectedServices.join(', ')}]`);
    const body = encodeURIComponent(
`Hi Pratham,

I would like to discuss a project with you.

— Contact Details —
Name: ${formData.name}
Email: ${formData.email}
Company / Organization: ${formData.company || 'N/A'}
Services Needed: ${selectedServices.join(', ')}
Estimated Timeline: ${selectedTimeline}

— Project Brief & Goals —
${formData.message}

Looking forward to hearing from you!`
    );

    const mailtoUrl = `mailto:prathameshsurvase31@gmail.com?subject=${subject}&body=${body}`;

    // Trigger email client in new tab/window
    try {
      window.open(mailtoUrl, '_blank');
    } catch {
      window.location.href = mailtoUrl;
    }

    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_-15px_rgba(15,23,42,0.35)] border border-slate-200/90 overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* ======================================================== */}
        {/* LEFT COLUMN: Studio Brand & Direct Dispatch Channels     */}
        {/* ======================================================== */}
        <div className="w-full md:w-[330px] lg:w-[360px] bg-gradient-to-b from-slate-950 via-[#0B101E] to-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
          
          {/* Subtle Ambient Glow Behind Studio Identity */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/08 rounded-full blur-2xl pointer-events-none" />

          {/* Top: Availability & Headline */}
          <div className="relative z-10">
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Work</span>
            </div>

            {/* Studio Name & Title */}
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              <span>PRATHAM </span>
              <span className="font-pixel text-[#0048DE] font-normal tracking-normal text-[1.12em]">
                SURVASE
              </span>
            </div>

            <h3 className="text-2xl sm:text-[26px] font-normal tracking-[-0.02em] leading-[1.25] text-slate-100 mb-3">
              Let's craft something <span className="text-[#3b82f6] font-medium">remarkable.</span>
            </h3>

            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
              Have an early-stage product, a design system to scale, or need high-converting web UI? Let's discuss scope and timeline.
            </p>
          </div>

          {/* Middle: Direct Connect Channels */}
          <div className="relative z-10 my-6 space-y-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
              Direct Channels
            </div>

            {/* Email Card with 1-Click Copy */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full text-left p-2.5 sm:p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] font-mono text-slate-400 uppercase">Email</div>
                  <div className="text-xs font-medium text-slate-200 truncate group-hover:text-white transition-colors">
                    prathameshsurvase31@gmail.com
                  </div>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {copiedEmail ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                    <Check size={11} /> Copied!
                  </span>
                ) : (
                  <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
                    <Copy size={13} />
                  </span>
                )}
              </div>
            </button>

            {/* WhatsApp / Phone Direct Link */}
            <a
              href="https://wa.me/919405374711?text=Hi%20Pratham,%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-[10.5px] font-mono text-slate-400 uppercase">WhatsApp / Direct</div>
                  <div className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                    +91 9405374711
                  </div>
                </div>
              </div>
              <ExternalLink size={13} className="text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0" />
            </a>

            {/* Location & Timezone Chip */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800/50 text-[11px] text-slate-400">
              <MapPin size={13} className="text-blue-400 shrink-0" />
              <span>Vadodara, India • IST (GMT+5:30)</span>
            </div>
          </div>

          {/* Bottom: Signature Peeking Spy Doodle */}
          <div className="relative z-10 pt-3 border-t border-slate-850 flex items-center justify-between">
            <div className="text-[11px] text-slate-400 font-normal">
              ⚡ Replies within <strong className="text-slate-200 font-semibold">12–24 hours</strong>
            </div>
            <div className="relative group/peeking">
              <img
                src="/Images/doodle-spy.png"
                alt="Peeking doodle"
                className="w-10 h-auto object-contain select-none -mb-3 transition-transform duration-300 group-hover/peeking:-translate-y-1"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Interactive Bespoke Inquiry Form           */}
        {/* ======================================================== */}
        <div className="flex-1 p-6 sm:p-8 md:p-9 overflow-y-auto max-h-[85vh] md:max-h-none">
          {submitted ? (
            /* Submission Confirmation Screen */
            <div className="py-12 sm:py-16 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center mx-auto text-[#0048DE] shadow-sm animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  Inquiry Dispatched!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  Your email client has been launched with your project details. <strong className="text-[#0048DE]">Pratham</strong> will review your inquiry and follow up within 24 hours.
                </p>
              </div>

              {/* Direct Follow-up Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:prathameshsurvase31@gmail.com?subject=Project Inquiry from ${encodeURIComponent(formData.name)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0048DE] hover:bg-[#003dc4] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Re-open Email Client</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Form Section Header */}
              <div className="pb-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#0048DE] font-semibold bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    Project Intake
                  </span>
                  <span className="text-xs text-slate-400">• Step 1 of 1</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                  Tell me about your vision
                </h4>
              </div>

              {/* 1. Interactive Service Pills (Multi-Select) */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-2">
                  What services do you need? <span className="text-slate-400 font-normal">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 select-none ${
                          isSelected
                            ? 'bg-[#0048DE] text-white border-[#0048DE] shadow-sm shadow-blue-600/20 active:scale-98'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90 active:scale-98'
                        }`}
                      >
                        {isSelected && <Sparkles size={11} className="shrink-0" />}
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Client Name & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-[#0048DE] focus:ring-3 focus:ring-[#0048DE]/15 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400 font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-1.5">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-[#0048DE] focus:ring-3 focus:ring-[#0048DE]/15 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400 font-normal"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Company & Estimated Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-1.5">
                    Company / Organization <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Acme Inc. or Project Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-[#0048DE] focus:ring-3 focus:ring-[#0048DE]/15 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400 font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-1.5">
                    Target Timeline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {TIMELINE_OPTIONS.map((timeline) => (
                      <button
                        key={timeline}
                        type="button"
                        onClick={() => setSelectedTimeline(timeline)}
                        className={`text-[11px] py-2 px-1 rounded-lg border text-center font-medium transition-all cursor-pointer whitespace-nowrap ${
                          selectedTimeline === timeline
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
                        }`}
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Project Details Textarea */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-1.5">
                  Project Brief & Requirements <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about what you're building, target goals, deliverables, or share any existing Figma/product links..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-[#0048DE] focus:ring-3 focus:ring-[#0048DE]/15 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400 resize-none font-normal"
                  />
                </div>
              </div>

              {/* 5. Submit Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  🔒 No spam, direct communication with Pratham.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0048DE] hover:bg-[#003dc4] text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-blue-600/25 active:scale-98 cursor-pointer"
                >
                  <span>Dispatch Inquiry</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
