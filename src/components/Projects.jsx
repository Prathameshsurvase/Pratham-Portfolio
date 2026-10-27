import React from 'react';
import { ExternalLink, Smartphone, ShoppingBag, Award, Globe, Layout, BarChart3 } from 'lucide-react';

export default function Projects({ onExploreClick }) {
  const projects = [
    {
      title: 'Crypsii — Crypto News & Analytics Mobile App',
      category: 'Mobile App UI/UX',
      description: 'Designed end-to-end mobile interface for a crypto news platform with intuitive asset trackers, real-time news feeds, and responsive navigation.',
      icon: <Smartphone className="w-5 h-5 text-[#0048DE]" />,
      tags: ['Figma', 'Mobile UI/UX', 'Prototyping', 'Design System'],
    },
    {
      title: 'FarmClub — Plant-Based E-Commerce Platform',
      category: 'Web & Mobile E-Commerce',
      description: 'Crafted clean, conversion-focused mobile and web application experiences for a plant-based e-commerce platform with seamless catalog exploration and checkout.',
      icon: <ShoppingBag className="w-5 h-5 text-[#0048DE]" />,
      tags: ['UI/UX Design', 'E-Commerce', 'Web & Mobile', 'Figma'],
    },
    {
      title: 'vTech Healthcare & University Web Overhaul',
      category: 'Web Revamp & UX Optimization',
      description: 'Spearheaded full UX redesign of healthcare and university portals, achieving 30% lower bounce rates, 50% faster load times, and earning the Best Performer Award.',
      icon: <Award className="w-5 h-5 text-[#0048DE]" />,
      tags: ['UX Audit', 'Performance', 'Webflow', 'Best Performer'],
    },
    {
      title: 'INFOTEK Multi-Vertical Client Websites',
      category: 'Client Solutions & Vibe Coding',
      description: 'Delivered 8+ client websites across real estate, logistics, manufacturing, automotive, and ed-tech with full responsiveness and WhatsApp Cloud API integrations.',
      icon: <Globe className="w-5 h-5 text-[#0048DE]" />,
      tags: ['Claude', 'Antigravity', 'React JS', 'APIs'],
    },
    {
      title: 'IMS Group Corporate Web Presence',
      category: 'No-Code & Layout Optimization',
      description: 'Engineered a professional brand portfolio for IMS Group utilizing Duda and Webflow, streamlining content integration and boosting cross-browser usability.',
      icon: <Layout className="w-5 h-5 text-[#0048DE]" />,
      tags: ['Webflow', 'Duda', 'Layout Optimization', 'Branding'],
    },
    {
      title: 'BMBC Foundation US Client Dashboards',
      category: 'Dashboard UI & Web Revamps',
      description: 'Collaborated with US-based clients to design functional analytics dashboards and website revamps, achieving a 40% increase in stakeholder positive feedback.',
      icon: <BarChart3 className="w-5 h-5 text-[#0048DE]" />,
      tags: ['Dashboard UI', 'US Clients', 'Figma', 'User Research'],
    },
  ];

  return (
    <section id="projects" className="py-22 md:py-28 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0048DE] bg-blue-100/60 px-3.5 py-1.5 rounded-full">
            Portfolio &amp; Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-slate-950 mt-3 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Real-world UI/UX design, mobile applications, and web platforms delivered across diverse industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 hover:border-[#0048DE]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50/80 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100/80 transition-all duration-300">
                  {proj.icon}
                </div>
                <span className="text-[11px] font-bold text-[#0048DE] uppercase tracking-wider">
                  {proj.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5 mb-2.5 group-hover:text-[#0048DE] transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium bg-slate-100/90 text-slate-600 px-2.5 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0048DE] hover:text-[#003dc4] transition-colors cursor-pointer group-hover:translate-x-0.5 duration-200"
                >
                  Discuss Project <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
