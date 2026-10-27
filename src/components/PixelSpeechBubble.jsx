import React, { useState, useEffect, useRef } from 'react';

/**
 * PixelSpeechBubble
 * Recreates the exact retro 16-bit / 8-bit comic speech bubble:
 * - Stepped pixelated corners
 * - Pure white background (#FFFFFF)
 * - Two-tone lavender/periwinkle bottom shadow (#DDE4FE & #B8C6F8)
 * - Character-by-character typewriter effect with retro blinking cursor
 * - Automatic progression timer (no manual shuffle button required)
 */
export default function PixelSpeechBubble({
  flipDown = false,
  tailSide = 'left',
  quote = '',
  onClose,
  autoAdvance = false,
  onAutoAdvance,
  onClick,
  onPointerDown,
  className = '',
  quoteKey,
}) {
  const isRight = tailSide === 'right';

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef(null);
  const autoAdvanceRef = useRef(null);

  useEffect(() => {
    // Reset when quote changes
    setDisplayedText('');
    setIsTyping(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);

    if (!quote) return;

    let index = 0;
    let isMounted = true;

    // Balanced typewriter speed tuned to natural reading pace (~20 chars/sec)
    const typeNextChar = () => {
      if (!isMounted) return;
      index++;
      if (index <= quote.length) {
        setDisplayedText(quote.slice(0, index));
        const currentChar = quote[index - 1];
        
        let delay = 46; // Natural reading pace (~21 chars/sec)
        if (currentChar === '.' || currentChar === '?' || currentChar === '!') {
          delay = 90; // Subtle beat at sentence ends without halting
        } else if (currentChar === ',' || currentChar === ';' || currentChar === ':') {
          delay = 65; // Micro comma breath
        }
        
        timerRef.current = setTimeout(typeNextChar, delay);
      } else {
        timerRef.current = null;
        setIsTyping(false);

        // Auto-advance after comfortable reading pause
        if (autoAdvance && onAutoAdvance) {
          const pauseTime = quote.length < 20 ? 3200 : quote.length < 55 ? 5200 : 6800;
          autoAdvanceRef.current = setTimeout(() => {
            onAutoAdvance();
          }, pauseTime);
        }
      }
    };

    // Quick 60ms breath before beginning to type
    timerRef.current = setTimeout(typeNextChar, 60);

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [quote, quoteKey, autoAdvance]);

  // Click behavior: if still typing -> instant complete; if already typed -> advance to next quote
  const handleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isTyping) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      setDisplayedText(quote);
      setIsTyping(false);

      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      if (autoAdvance && onAutoAdvance) {
        const pauseTime = quote.length < 20 ? 3200 : quote.length < 55 ? 5200 : 6800;
        autoAdvanceRef.current = setTimeout(() => {
          if (onAutoAdvance) onAutoAdvance();
        }, pauseTime);
      }
    } else {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      if (onAutoAdvance) {
        onAutoAdvance();
      } else if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onClick={handleClick}
      className={`relative select-none cursor-pointer group/bubble animate-comic-bubble-pop transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      title={isTyping ? 'Click to finish text' : 'Click for next thought'}
    >
      {/* Pixel Art SVG Bubble Background */}
      <img
        src={flipDown ? '/Images/pixel_bubble_up.svg?v=3' : '/Images/pixel_bubble_down.svg?v=3'}
        alt=""
        draggable="false"
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none drop-shadow-[2.5px_2.5px_0px_rgba(0,0,0,0.16)] transition-all duration-150 ${
          isRight ? '-scale-x-100' : ''
        }`}
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      />

      {/* Foreground Content */}
      <div
        className={`relative z-10 ${
          flipDown
            ? 'px-3.5 pt-4 pb-2.5 sm:px-4 sm:pt-4.5 sm:pb-3 pr-6'
            : 'px-3.5 pt-2.5 pb-4 sm:px-4 sm:pt-3 sm:pb-4.5 pr-6'
        }`}
      >
        {/* Subtle top-right close button */}
        {onClose && (
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose(e);
            }}
            className={`absolute ${
              flipDown ? 'top-3.5' : 'top-2.5'
            } right-2.5 w-4 h-4 rounded-full text-slate-400 hover:text-red-500 hover:bg-black/5 flex items-center justify-center text-[10px] font-bold transition-colors cursor-pointer shrink-0 z-20`}
            title="Close thought bubble"
          >
            ✕
          </button>
        )}

        {/* Typewriter Dialogue Text */}
        <p className="font-sans font-bold text-[11px] sm:text-[11.5px] leading-[1.38] text-slate-900 tracking-[-0.01em] min-h-[2.8em]">
          "{displayedText}"
          {isTyping && (
            <span className="inline-block w-[3px] h-[11px] bg-[#0A0D14] ml-0.5 -mb-[1px] animate-pulse align-middle" />
          )}
        </p>
      </div>
    </div>
  );
}
