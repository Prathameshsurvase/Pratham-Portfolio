import React from 'react';

/**
 * DiaTextReveal Component ported from Framer:
 * https://framer.com/m/Dia-Text-Reveal-hPz5OY.js@H6IEki3iBAi6Q3NOPjFg
 *
 * Implements the signature Framer Dia chromatic rainbow sweep:
 * - Sweeps the exact Framer rainbow colors across the word on page load:
 *   #c679c4 (violet), #fa3d1d (coral/red), #ffb005 (gold), #e1e1fe (ice), #0358f7 (electric blue)
 * - 100% opaque at all times: NEVER transparent, NEVER blank, NEVER missing
 * - Settles permanently into solid black (#020617 / text-slate-950)
 * - Inherits exact font-family, weight, line-height, and size from parent text
 * - Hardware-accelerated CSS animation: plays strictly ONCE on page load, never loops on re-renders
 */
export default function DiaTextReveal({
  text = 'portfolio.',
  textItems,
  textColor = '#020617', // Slate-950 deep black matching headline text exactly
  colors = ['#c679c4', '#fa3d1d', '#ffb005', '#e1e1fe', '#0358f7'],
  duration = 1.4,
  delay = 1.5,
  className = '',
  style = {},
}) {
  const displayText = textItems && textItems.length > 0 ? textItems[0] : text;

  const color0 = colors[0] || '#c679c4';
  const color1 = colors[1] || '#fa3d1d';
  const color2 = colors[2] || '#ffb005';
  const color3 = colors[3] || '#e1e1fe';
  const color4 = colors[4] || '#0358f7';

  return (
    <span
      className={`relative inline-block align-baseline font-inherit select-text ${className}`}
      style={{
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        verticalAlign: 'baseline',
        ...style,
      }}
    >
      <style>{`
        @keyframes framer-dia-sweep {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .dia-chromatic-text {
          display: inline-block;
          vertical-align: baseline;
          font-family: inherit;
          font-weight: inherit;
          color: ${textColor};
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 280% 100%;
          background-repeat: no-repeat;
          background-position: 0% 50%;
          background-image: linear-gradient(
            90deg,
            ${textColor} 0%,
            ${textColor} 36%,
            ${color0} 39%,
            ${color1} 45%,
            ${color2} 50%,
            ${color3} 55%,
            ${color4} 61%,
            ${textColor} 64%,
            ${textColor} 100%
          );
          animation: framer-dia-sweep ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both;
          will-change: background-position;
        }
      `}</style>

      <span className="dia-chromatic-text">
        {displayText}
      </span>
    </span>
  );
}
