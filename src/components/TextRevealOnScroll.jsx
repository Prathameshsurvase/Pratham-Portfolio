import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';

/**
 * Spring easing helper ported directly from Framer element:
 * https://framer.com/m/Text-Reveal-on-Scroll-iAEwo4.js@r5fIqIUYTgYRry5w2nRx
 */
function toSpringOptions(transition) {
  const hasSpringValues =
    typeof transition?.stiffness === 'number' ||
    typeof transition?.damping === 'number' ||
    typeof transition?.mass === 'number';

  if (!hasSpringValues && typeof transition?.duration === 'number') {
    const duration = Math.max(transition.duration, 0.05);
    return {
      stiffness: 170 / (duration * duration),
      damping: 26 / duration,
      mass: 1,
      restDelta: 0.001,
    };
  }

  return {
    stiffness: typeof transition?.stiffness === 'number' ? transition.stiffness : 100,
    damping: typeof transition?.damping === 'number' ? transition.damping : 30,
    mass: typeof transition?.mass === 'number' ? transition.mass : 1,
    restDelta: 0.001,
  };
}

/**
 * TextRevealOnScroll
 * High-performance scroll-driven typography reveal with conversion gradient
 */
export default function TextRevealOnScroll({
  text = 'Framer text reveal on scroll effect',
  mutedColor = '#cbd5e1',
  primaryColor = '#0f172a',
  highlightGradient = 'linear-gradient(120deg, #0048DE 0%, #1D63FF 45%, #38BDF8 75%, #0048DE 100%)',
  font = {},
  balance = true,
  replay = true,
  mode = 'word',
  style = {},
  className = '',
  transition = { duration: 0.4 },
  offset = ['start 0.85', 'end 0.35'],
}) {
  const containerRef = useRef(null);

  // Track scroll progress of container through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
    layoutEffect: false,
  });

  const maxProgress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > maxProgress.get()) {
      maxProgress.set(latest);
    }
  });

  const sourceProgress = replay ? scrollYProgress : maxProgress;
  const progressToUse = useSpring(sourceProgress, toSpringOptions(transition));

  const renderText = () => {
    if (!text) return null;

    let items = [];
    if (mode === 'character') {
      // Split string into characters including spaces
      items = text.split('');
    } else if (mode === 'word') {
      // Split into exact word blocks and space blocks
      items = text.match(/([\S]+|\s+)/g) || [];
    } else if (mode === 'sentence') {
      // Split into sentence strings and spaces/returns
      items = text.match(/[^.!?\n]+(?:[.!?]+)?|\n|\s+/g) || [];
    }

    // Count how many trackable items (non-whitespace) exist for % offsets
    let totalValids = 0;
    items.forEach((item) => {
      if (item.trim().length > 0) totalValids++;
    });

    let currentIdx = 0;

    return items.map((itemStr, idx) => {
      // Spaces & indentation rendered as standard text nodes
      if (itemStr.trim().length === 0 && itemStr !== '\n') {
        return <React.Fragment key={`${mode}-space-${idx}`}>{itemStr}</React.Fragment>;
      }

      if (itemStr === '\n') {
        return <br key={`${mode}-br-${idx}`} />;
      }

      const safeTotal = Math.max(totalValids, 1);
      // Map entire reveal to complete earlier (by 85% of scroll progress track) so 100% of words and doodles are completely revealed
      const maxRevealProgress = 0.85;
      const start = (currentIdx / safeTotal) * maxRevealProgress;
      const end = Math.min(maxRevealProgress, Math.max(start + 0.0001, ((currentIdx + 1) / safeTotal) * maxRevealProgress));
      currentIdx++;

      const isActuallyWork = itemStr.toLowerCase() === 'work.';
      const isComplex = itemStr.toLowerCase().replace(/[^a-z]/g, '') === 'complex';
      const isDigitalExperiences = itemStr.toLowerCase() === 'experiences.' || itemStr.toLowerCase() === 'experiences';

      if (isActuallyWork) {
        return (
          <React.Fragment key={`${mode}-${idx}`}>
            <RevealItem
              progress={progressToUse}
              range={[start, end]}
              mutedColor={mutedColor}
              primaryColor={primaryColor}
              highlightGradient={highlightGradient}
            >
              work
            </RevealItem>
            <DoodleStareItem progress={progressToUse} range={[start, end]} />
            <RevealItem
              progress={progressToUse}
              range={[start, end]}
              mutedColor={mutedColor}
              primaryColor={primaryColor}
              highlightGradient={highlightGradient}
            >
              .
            </RevealItem>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={`${mode}-${idx}`}>
          <RevealItem
            progress={progressToUse}
            range={[start, end]}
            mutedColor={mutedColor}
            primaryColor={primaryColor}
            highlightGradient={highlightGradient}
          >
            {itemStr}
          </RevealItem>
          {isComplex && (
            <DoodleComplexItem progress={progressToUse} range={[start, end]} />
          )}
          {isDigitalExperiences && (
            <DoodleFireFrogItem progress={progressToUse} range={[start, end]} />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <motion.div
      ref={containerRef}
      role="region"
      aria-label={typeof text === 'string' ? text : 'Scroll revealed statement'}
      className={className}
      style={{
        ...style,
        ...font,
        textWrap: balance ? 'balance' : 'wrap',
        whiteSpace: 'pre-wrap',
        display: 'block',
        color: mutedColor,
      }}
    >
      <span aria-hidden="true">{renderText()}</span>
    </motion.div>
  );
}

const RevealItem = ({
  children,
  progress,
  range,
  mutedColor,
  primaryColor,
  highlightGradient,
}) => {
  const [start, end] = range;
  const span = Math.max(end - start, 0.005);
  const p1 = start;
  const p2 = start + span * 0.35;
  const p3 = start + span * 0.65;
  const p4 = end;

  // Base text color transitioning smoothly: grey -> electric blue -> crisp black
  const color = useTransform(
    progress,
    [p1, p2, p3, p4],
    [mutedColor, '#0048DE', '#0048DE', primaryColor]
  );

  // Blue gradient overlay layer active during the conversion window
  const gradientOpacity = useTransform(
    progress,
    [p1, p2, p3, p4],
    [0, 1, 1, 0]
  );

  return (
    <span className="relative inline-block" style={{ verticalAlign: 'baseline' }}>
      {/* Base text layer */}
      <motion.span
        style={{
          color,
          display: 'inline-block',
          willChange: 'color',
        }}
      >
        {children}
      </motion.span>

      {/* Luminous blue gradient active specifically during conversion */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          opacity: gradientOpacity,
          backgroundImage: highlightGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          willChange: 'opacity',
          filter: 'drop-shadow(0 0 10px rgba(0, 72, 222, 0.45))',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const DoodleStareItem = ({ progress, range }) => {
  const [start, end] = range;
  // Fade in and spring scale up as scroll passes "actually work."
  const opacity = useTransform(progress, [Math.max(0, start - 0.04), end], [0.35, 1]);
  const scale = useTransform(progress, [Math.max(0, start - 0.04), end], [0.88, 1]);
  const y = useTransform(progress, [Math.max(0, start - 0.04), end], [5, 0]);

  return (
    <motion.span
      style={{
        opacity,
        scale,
        y,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      className="inline-block align-middle ml-1.5 sm:ml-2 md:ml-2.5 mr-0.5 relative group/doodlestare select-none cursor-pointer"
      title="...and actually work."
    >
      <img
        src="/Images/doodle-computer-stare.png"
        alt="Actually work meme doodle"
        draggable="false"
        className="w-13 sm:w-16 md:w-20 lg:w-[88px] h-auto object-contain inline-block transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover/doodlestare:scale-115 group-hover/doodlestare:-rotate-2"
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
          verticalAlign: 'middle',
        }}
      />
    </motion.span>
  );
};

const DoodleComplexItem = ({ progress, range }) => {
  const [start, end] = range;
  // Fade in and spring scale up as scroll reaches "...complex"
  const opacity = useTransform(progress, [Math.max(0, start - 0.04), end], [0.35, 1]);
  const scale = useTransform(progress, [Math.max(0, start - 0.04), end], [0.88, 1]);
  const y = useTransform(progress, [Math.max(0, start - 0.04), end], [4, 0]);

  return (
    <motion.span
      style={{
        opacity,
        scale,
        y,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      className="inline-block align-middle ml-1.5 sm:ml-2 md:ml-2.5 mr-1 relative group/doodlecomplex select-none cursor-pointer -translate-y-0.5 sm:-translate-y-1"
      title="...complex ideas 🌀"
    >
      <img
        src="/Images/doodle-complex.png"
        alt="Complex ideas tangle scribble doodle"
        draggable="false"
        className="w-10 sm:w-12 md:w-15 lg:w-[62px] h-auto object-contain inline-block transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover/doodlecomplex:scale-120 group-hover/doodlecomplex:rotate-6"
        style={{
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
          verticalAlign: 'middle',
        }}
      />
    </motion.span>
  );
};

const DoodleFireFrogItem = ({ progress, range }) => {
  const [start, end] = range;
  // Fade in and spring scale up as scroll reaches "...digital experiences."
  const opacity = useTransform(progress, [Math.max(0, start - 0.04), end], [0.35, 1]);
  const scale = useTransform(progress, [Math.max(0, start - 0.04), end], [0.88, 1]);
  const y = useTransform(progress, [Math.max(0, start - 0.04), end], [5, 0]);

  return (
    <motion.span
      style={{
        opacity,
        scale,
        y,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      className="inline-block align-middle ml-2 sm:ml-2.5 md:ml-3 mr-1 relative group/doodlefire select-none cursor-pointer"
      title="...digital experiences 🔥"
    >
      <img
        src="/Images/doodle-fire-frog.png"
        alt="Digital experiences fire meme doodle"
        draggable="false"
        className="w-10 sm:w-12 md:w-14 lg:w-[58px] h-auto object-contain inline-block transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover/doodlefire:scale-120 group-hover/doodlefire:rotate-3"
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
          verticalAlign: 'middle',
        }}
      />
    </motion.span>
  );
};

export { TextRevealOnScroll };
