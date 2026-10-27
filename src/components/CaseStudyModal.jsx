import React, { useState } from 'react';
import { X, ExternalLink, Smartphone, ShoppingBag, Award, Globe, CheckCircle2, ArrowRight, Layers, Target, TrendingUp, Sparkles } from 'lucide-react';

export default function CaseStudyModal({ isOpen, onClose, onContactClick }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!isOpen) return null;

  const caseStudies = [
    {
      id: 'crypsii',
      title: 'Crypsii — Crypto Analytics & News Mobile App',
      tagline: 'Streamlining complex crypto market signals into a frictionless mobile-first experience.',
      role: 'Lead UI/UX Designer',
      timeline: '4 Months (2025)',
      category: 'Mobile App UI/UX & Design System',
      icon: <Smartphone className="w-5 h-5 text-[#0048DE]" />,
      badge: '4.8/5 Beta Usability',
      metrics: [
        { label: 'Task Speed', value: '+42%', note: 'Faster portfolio check' },
        { label: 'Onboarding', value: '88%', note: 'Completed without drop-off' },
        { label: 'Satisfaction', value: '4.8/5', note: 'Usability benchmark' },
      ],
      challenge:
        'Cryptocurrency applications are notoriously intimidating for non-expert traders: dense candlestick data, hidden transaction flows, and fragmented news updates caused severe user cognitive overload and churn within the first 48 hours.',
      solution:
        'Designed an ergonomic 3-tier visual hierarchy separating instant price alerts, portfolio balances, and verified editorial news. Developed custom micro-interactions for rapid watchlist switching and created high-contrast dark/light design tokens in Figma for readability on OLED screens.',
      keyTakeaways: [
        'Built full Figma design system with 80+ reusable modular components and auto-layout variants.',
        'Conducted moderated usability testing sessions with 25 active crypto traders to refine tab bar touch ergonomics.',
        'Engineered animated asset cards and tactile haptic feedback prototypes for price shift notifications.',
      ],
      tags: ['Figma', 'Mobile UI/UX', 'Design Systems', 'Micro-interactions', 'Prototyping', 'FinTech'],
    },
    {
      id: 'farmclub',
      title: 'FarmClub — Plant-Based E-Commerce Experience',
      tagline: 'Designing a modern, high-converting digital storefront for farm-to-table health lifestyle.',
      role: 'Product Designer & UI Specialist',
      timeline: '3 Months (2024)',
      category: 'E-Commerce UX & Web Platform',
      icon: <ShoppingBag className="w-5 h-5 text-[#0048DE]" />,
      badge: '+25% Conversion Rate',
      metrics: [
        { label: 'Checkout Lift', value: '+25%', note: 'Conversion uplift' },
        { label: 'Cart Drop-off', value: '-35%', note: 'Frictionless checkout' },
        { label: 'Session Time', value: '3.4m', note: 'Higher product engagement' },
      ],
      challenge:
        'A clunky 5-step legacy checkout and confusing ingredient taxonomy led to 68% cart abandonment on mobile devices. Shoppers struggled to explore customizable meal subscriptions on smaller touchscreens.',
      solution:
        'Redesigned the purchasing journey into a frictionless 2-step modular drawer checkout. Created vibrant food photography layout templates, clear allergen and nutrition pills, and instant one-tap subscription schedule customizers.',
      keyTakeaways: [
        'Streamlined mobile navigation with sticky bottom checkout trays and one-click Apple Pay/Google Pay integration.',
        'Engineered an interactive nutrition slider allowing users to filter recipes by dietary preferences in real time.',
        'Delivered responsive desktop & mobile responsive prototypes ready for clean frontend developer handoff.',
      ],
      tags: ['UI/UX Design', 'E-Commerce', 'Mobile Web', 'Figma', 'User Research', 'Design System'],
    },
    {
      id: 'vtech',
      title: 'vTech Solutions — Healthcare & University Web Overhaul',
      tagline: 'Cutting bounce rates by 30% and speeding up page performance by 50% through UX audits.',
      role: 'UI/UX Designer (Best Performer Award)',
      timeline: '6 Months (2023 - 2024)',
      category: 'Enterprise Portal & UX Architecture',
      icon: <Award className="w-5 h-5 text-[#0048DE]" />,
      badge: 'Best Performer Award',
      metrics: [
        { label: 'Bounce Rate', value: '-30%', note: 'From 65% down to 35%' },
        { label: 'Page Load Speed', value: '+50%', note: 'Sub-2s page speed' },
        { label: 'Patient Inquiries', value: '+38%', note: 'Direct portal bookings' },
      ],
      challenge:
        'Overly complicated navigation schemas, bloated legacy assets, and unaccessible contrast ratios made university admissions and patient clinic portals sluggish and difficult to navigate, leading to frequent support call escalations.',
      solution:
        'Conducted comprehensive heuristic UX audits. Re-architected site navigation trees, unified typographic scales to meet WCAG AA standards, and engineered modular page templates in Webflow and clean HTML/CSS.',
      keyTakeaways: [
        'Eliminated 4 redundant sub-menu levels, reducing patient appointment booking steps from 6 down to 2.',
        'Honored with the "Best Performer Award" for cross-functional collaboration and exceeding client KPI targets.',
        'Established accessible design tokens (color contrast ratios >= 4.5:1) ensuring ADA and WCAG compliance.',
      ],
      tags: ['UX Audit', 'Webflow', 'Accessibility (WCAG)', 'Information Architecture', 'Healthcare UX'],
    },
    {
      id: 'infotek',
      title: 'INFOTEK — Multi-Vertical Client Platforms',
      tagline: 'Delivering 8+ production client web solutions with AI-accelerated vibe coding.',
      role: 'UI/UX Designer & Vibe Coder',
      timeline: 'Ongoing (2025 - Present)',
      category: 'Client Platforms & Vibe Coding',
      icon: <Globe className="w-5 h-5 text-[#0048DE]" />,
      badge: '8+ Live Deployments',
      metrics: [
        { label: 'Live Sites', value: '8+', note: 'Real estate, ed-tech, auto' },
        { label: 'Delivery Cycle', value: '3x', note: 'Faster design-to-code' },
        { label: 'Integration', value: '100%', note: 'WhatsApp Cloud & CRM' },
      ],
      challenge:
        'Modern businesses require end-to-end solutions that look premium, convert visitors, and ship quickly without the months-long drag of traditional handoff bottlenecks.',
      solution:
        'Pioneered AI-assisted design-to-code pipelines ("vibe coding") using Figma, Claude Code, and Antigravity. Delivered custom interactive features, responsive typography, and direct WhatsApp CRM lead funnels.',
      keyTakeaways: [
        'Bridged design intent directly into React, Tailwind CSS, and Vite production builds with zero fidelity loss.',
        'Engineered responsive animations and micro-interactions optimized for smooth 60fps mobile scrolling.',
        'Connected WhatsApp Cloud API for automated lead routing and real-time customer engagement.',
      ],
      tags: ['Vibe Coding', 'React JS', 'Tailwind CSS', 'Claude Code', 'Antigravity', 'WhatsApp API'],
    },
  ];

  const current = caseStudies[selectedIdx];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-blue-100/70 flex items-center justify-center text-[#0048DE]">
              <Sparkles size={16} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">Case Studies &amp; Deep Dives</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0048DE] px-2 py-0.5 rounded-full border border-blue-200/50">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Explore design rationale, metrics, and technical execution</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Case Study Tab Switcher Bar */}
        <div data-lenis-prevent className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-slate-100 overflow-x-auto scrollbar-none bg-white">
          {caseStudies.map((cs, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedIdx(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0048DE] text-white shadow-sm shadow-blue-600/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <span>{cs.id === 'crypsii' ? '📱 Crypsii' : cs.id === 'farmclub' ? '🌿 FarmClub' : cs.id === 'vtech' ? '🏥 vTech UX' : '🌐 INFOTEK'}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div data-lenis-prevent className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main Case Title & Badge */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-[#0048DE] uppercase tracking-wider">
                {current.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                {current.badge}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
              {current.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {current.tagline}
            </p>
          </div>

          {/* Quick Meta Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/70 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">Role</span>
              <span className="font-bold text-slate-900">{current.role}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">Timeline</span>
              <span className="font-bold text-slate-900">{current.timeline}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">Deliverables</span>
              <span className="font-bold text-slate-900">Research, Wireframes, UI, System</span>
            </div>
          </div>

          {/* Key Impact Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              <TrendingUp size={15} className="text-[#0048DE]" />
              <span>Measurable Impact &amp; Results</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.metrics.map((m, mIdx) => (
                <div key={mIdx} className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col justify-between">
                  <div className="text-2xl font-black text-[#0048DE] tracking-tight">{m.value}</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{m.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/40 rounded-xl border border-rose-100/80">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                <Target size={15} className="text-rose-600" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.challenge}
              </p>
            </div>

            <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100/80">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#0048DE]">
                <Layers size={15} className="text-[#0048DE]" />
                <span>The Design Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.solution}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Implementation Takeaways */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Core Design Highlights
            </h4>
            <div className="space-y-2.5">
              {current.keyTakeaways.map((item, kIdx) => (
                <div key={kIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-[#0048DE] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {current.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            Interested in seeing detailed Figma prototypes or case documentation?
          </div>
          <button
            onClick={() => {
              onClose();
              if (onContactClick) onContactClick();
            }}
            className="inline-flex items-center gap-2 bg-[#0048DE] hover:bg-[#003dc4] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <span>Discuss This Case</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
