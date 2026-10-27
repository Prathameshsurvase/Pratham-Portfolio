import React from 'react';
import TextRevealOnScroll from './TextRevealOnScroll';

export default function TextRevealSection() {
  const statement =
    'I design clean, modern interfaces that look great and actually work. With a background in both design and code, I turn complex ideas into simple, easy-to-use digital experiences.';

  return (
    <section
      id="statement"
      className="relative pt-28 sm:pt-36 md:pt-44 pb-44 sm:pb-56 md:pb-64 bg-white overflow-hidden select-none"
    >
      {/* Subtle Background Radial Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[850px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(0,72,222,0.035),rgba(255,255,255,0)_70%)] blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Pure Framer Text Reveal on Scroll with calibrated completion trigger */}
        <TextRevealOnScroll
          text={statement}
          mode="word"
          mutedColor="#cbd5e1"
          primaryColor="#0f172a"
          replay={true}
          offset={['start 0.82', 'center 0.48']}
          transition={{ duration: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-medium tracking-[-0.03em] leading-[1.35] sm:leading-[1.3] md:leading-[1.26] max-w-5xl mx-auto"
        />
      </div>
    </section>
  );
}
