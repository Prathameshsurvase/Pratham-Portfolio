import React from 'react';

export const IconFigma = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </svg>
);

export const IconIllustrator = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32">
    <rect width="32" height="32" rx="7" fill="#330000" />
    <text x="7" y="22" fill="#FF9A00" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">A</text>
    <text x="19" y="22" fill="#FF9A00" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">i</text>
  </svg>
);

export const IconPhotoshop = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32">
    <rect width="32" height="32" rx="7" fill="#001E36" />
    <text x="7" y="22" fill="#31A8FF" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">P</text>
    <text x="17.5" y="22" fill="#31A8FF" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">s</text>
  </svg>
);

export const IconCanva = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32">
    <defs>
      <linearGradient id="canva-skill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C4CC" />
        <stop offset="100%" stopColor="#7D2AE8" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="15" fill="url(#canva-skill-grad)" />
    <text x="16" y="22" fill="#ffffff" textAnchor="middle" fontSize="17" fontWeight="bold" fontStyle="italic" fontFamily="'Brush Script MT', 'Segoe Script', cursive, sans-serif">C</text>
  </svg>
);

export const IconDesignSystems = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconWireframing = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

export const IconReact = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
  </svg>
);

export const IconNextJS = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#000" />
    <path d="M7.5 7.5v9h2v-5.2l6.2 5.2h1.8v-9h-2v5.2L9.3 7.5H7.5z" fill="#fff" />
  </svg>
);

export const IconJavaScript = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32">
    <rect width="32" height="32" rx="6" fill="#F7DF1E" />
    <path d="M18.5 24.5c.8.5 1.8.8 2.8.8 2 0 3.2-1 3.2-2.7v-7.8h-2.5v7.8c0 .8-.5 1.2-1.3 1.2-.5 0-1-.2-1.4-.4l-.8 1.1zm-8.8-.2c1.2.8 2.6 1.1 3.9 1.1 2.5 0 4.1-1.3 4.1-3.5 0-2-1.3-3-3.1-3.7l-.8-.3c-1.1-.5-1.7-.9-1.7-1.7 0-.7.6-1.3 1.6-1.3.9 0 1.7.3 2.3.7l.7-1.4c-.7-.5-1.8-.8-3-.8-2.3 0-3.8 1.4-3.8 3.3 0 1.9 1.3 2.9 3.2 3.6l.8.3c1.2.5 1.7 1 1.7 1.8 0 .9-.8 1.5-2 1.5-1.1 0-2.2-.4-2.9-1l-.7 1.4z" fill="#000" />
  </svg>
);

export const IconHTML5 = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#E34F26">
    <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm17 5.5H5.5l.4 4.5h12.2l-.4 5.3-5.7 1.6-5.7-1.6-.3-3.2H4l.6 6.3L12 20.3l7.4-2.1 1.1-12.7z" />
  </svg>
);

export const IconCSS3 = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1572B6">
    <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm17 5.5H5.5l.4 4.5h12.2l-.4 5.3-5.7 1.6-5.7-1.6-.3-3.2H4l.6 6.3L12 20.3l7.4-2.1 1.1-12.7z" />
  </svg>
);

export const IconWebflow = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#146EF5">
    <path d="M22 6.5l-5.6 11H12l3.4-6.6h-.2C13.5 13 11.2 14.5 9 14.5c-2.4 0-4-1.6-4-4.2 0-3 2.5-5.3 5.6-5.3 2.1 0 3.7 1 4.5 2.5h.2L17 6.5h5z" />
  </svg>
);

export const IconFramer = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#0055FF">
    <path d="M4 2h16v7h-8l8 7H4v-7h8L4 2z" />
  </svg>
);

export const IconDuda = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#F03D5F">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

export const IconAntigravity = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="anti-icon-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="none" stroke="url(#anti-icon-grad)" strokeWidth="2.5" />
    <path d="M16 6l7 14h-4l-3-6-3 6H9l7-14z" fill="url(#anti-icon-grad)" />
  </svg>
);

export const IconClaude = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="#D97757">
    <circle cx="16" cy="16" r="3.6" />
    <path d="M16 2.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0V5A2.5 2.5 0 0 1 16 2.5zm0 17a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 2.5-2.5zm13.5-3.5a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1 0-5h5a2.5 2.5 0 0 1 2.5 2.5zm-17 0a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1 0-5h5a2.5 2.5 0 0 1 2.5 2.5zm11.55-7.05a2.5 2.5 0 0 1 0 3.54l-3.54 3.53a2.5 2.5 0 0 1-3.53-3.53l3.53-3.54a2.5 2.5 0 0 1 3.54 0zm-12.02 12.02a2.5 2.5 0 0 1 0 3.54l-3.54 3.53a2.5 2.5 0 0 1-3.53-3.53l3.53-3.54a2.5 2.5 0 0 1 3.54 0zm0-12.02a2.5 2.5 0 0 1 3.54 0l3.53 3.54a2.5 2.5 0 0 1-3.53 3.53l-3.54-3.53a2.5 2.5 0 0 1 0-3.54zm12.02 12.02a2.5 2.5 0 0 1 3.54 0l3.53 3.54a2.5 2.5 0 0 1-3.53 3.53l-3.54-3.53a2.5 2.5 0 0 1 0-3.54z" />
  </svg>
);

export const IconCursor = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 32 32">
    <rect width="32" height="32" rx="7" fill="#111111" />
    <polygon points="16,7 25,12 16,17 7,12" fill="#888" />
    <polygon points="7,12 16,17 16,25 7,20" fill="#555" />
    <polygon points="16,17 25,12 25,20 16,25" fill="#aaa" />
  </svg>
);

export const IconGemini = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="gem-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1BA1E3" />
        <stop offset="50%" stopColor="#5E5CE6" />
        <stop offset="100%" stopColor="#AF52DE" />
      </linearGradient>
    </defs>
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" fill="url(#gem-icon-grad)" />
  </svg>
);

export const SKILL_ICONS_MAP = {
  Figma: IconFigma,
  Illustrator: IconIllustrator,
  Photoshop: IconPhotoshop,
  Canva: IconCanva,
  'Design Systems': IconDesignSystems,
  Wireframing: IconWireframing,
  'Responsive Design': IconWireframing,
  'React.js': IconReact,
  'React JS': IconReact,
  React: IconReact,
  'Next.js': IconNextJS,
  'Next JS': IconNextJS,
  NextJS: IconNextJS,
  JavaScript: IconJavaScript,
  JS: IconJavaScript,
  HTML5: IconHTML5,
  HTML: IconHTML5,
  CSS3: IconCSS3,
  CSS: IconCSS3,
  Webflow: IconWebflow,
  Framer: IconFramer,
  Duda: IconDuda,
  Antigravity: IconAntigravity,
  'Claude Code': IconClaude,
  Claude: IconClaude,
  Cursor: IconCursor,
  'Figma Make': IconFigma,
  'Generative AI': IconGemini,
  Gemini: IconGemini,
  'Magnific AI': IconGemini,
  DeepSeek: IconClaude,
  Hostinger: IconWebflow,
};

export const SKILL_LOGOS_MAP = {
  Figma: '/logos/figma-icon.svg',
  'Figma Make': '/logos/figma-icon.svg',
  Illustrator: '/logos/adobe-illustrator-icon.svg',
  'Adobe Illustrator': '/logos/adobe-illustrator-icon.svg',
  Photoshop: '/logos/adobe-photoshop-icon.svg',
  'Adobe Photoshop': '/logos/adobe-photoshop-icon.svg',
  Canva: '/logos/canva-icon.svg',
  'React.js': '/logos/react-js-icon.svg',
  'React JS': '/logos/react-js-icon.svg',
  React: '/logos/react-js-icon.svg',
  'Next.js': '/logos/nextjs-icon.svg',
  'Next JS': '/logos/nextjs-icon.svg',
  NextJS: '/logos/nextjs-icon.svg',
  JavaScript: '/logos/javascript-programming-language-icon.svg',
  JS: '/logos/javascript-programming-language-icon.svg',
  HTML5: '/logos/html-icon.svg',
  HTML: '/logos/html-icon.svg',
  CSS3: '/logos/css-icon.svg',
  CSS: '/logos/css-icon.svg',
  Webflow: '/logos/webflow-icon.svg',
  Framer: '/logos/framer-black-icon.svg',
  Duda: '/logos/Duda-01.svg',
  Antigravity: '/logos/google-antigravity-icon.svg',
  'Google Antigravity': '/logos/google-antigravity-icon.svg',
  'Claude Code': '/logos/claude-code-icon.svg',
  Claude: '/logos/claude-code-icon.svg',
  Cursor: '/logos/cursor-ai-code-icon.svg',
  'Cursor AI': '/logos/cursor-ai-code-icon.svg',
  Hostinger: '/logos/hostinger-icon.svg',
  GitHub: '/logos/github-icon.svg',
  'VS Code': '/logos/visual-studio-code-icon.svg',
  'Visual Studio Code': '/logos/visual-studio-code-icon.svg',
};

export const SkillLogoBadge = ({ skill, className = 'w-3.5 h-3.5 object-contain shrink-0' }) => {
  const logoUrl = SKILL_LOGOS_MAP[skill];
  if (logoUrl) {
    return <img src={logoUrl} alt={skill} className={className} loading="lazy" />;
  }
  const Fallback = SKILL_ICONS_MAP[skill];
  if (Fallback) {
    return <Fallback className={className} />;
  }
  return null;
};

