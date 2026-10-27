# 🎬 Animation Catalog & Design System

A central registry and documentation of interactive, entrance, and continuous animations built into the **INFOTEK** website. Use this document as a reference and copy-paste boilerplate for future animations and project reuse.

---

## 📑 Table of Contents
1. [Design Philosophy & Rules](#design-philosophy--rules)
2. [1. Staggered Masked Text Reveal (Kinetic Typography)](#1-staggered-masked-text-reveal-kinetic-typography)
3. [2. Header Waterfall Cascade & Accent Pop](#2-header-waterfall-cascade--accent-pop)
4. [3. Majestic Pillar Curtain Elevation](#3-majestic-pillar-curtain-elevation)
5. [4. Brand Pixel Specular Shine](#4-brand-pixel-specular-shine)
6. [5. Continuous 60fps Ambient Drift Flows](#5-continuous-60fps-ambient-drift-flows)
7. [6. Retro CRT Raster-Scan & Terminal Decode (About Us)](#6-retro-crt-raster-scan--terminal-decode-about-us)
8. [7. Tech Marquee: Zero-Gravity Float, Shimmer & Spotlight Hover](#7-tech-marquee-zero-gravity-float-shimmer--spotlight-hover)
9. [8. Different Minds: Cinematic Iris Sweep, Split-Word Kinetic Reveal & 3D Gyroscopic Parallax](#8-different-minds-cinematic-iris-sweep-split-word-kinetic-reveal--3d-gyroscopic-parallax)
10. [9. Mission & Vision: 3D Rectangular Cube Flip & Dynamic Perspective Depth](#9-mission--vision-3d-rectangular-cube-flip--dynamic-perspective-depth)
11. [Template for Adding Future Animations](#template-for-adding-future-animations)

---

## 🎨 Design Philosophy & Rules

1. **Hardware Acceleration**: Always animate `transform` (`translate3d`, `scale`, `rotateX`) and `opacity`. Never animate `top`, `left`, `margin`, `width`, or `height` to prevent layout re-flows (maintains locked 60fps).
2. **Apple / Linear Natural Deceleration**: Use `cubic-bezier(0.16, 1, 0.3, 1)` for entrances. It starts with high inertia and smoothly glides to an ultra-soft stop.
3. **Descender Safety (`pb-2 -mb-2`)**: When masking text inside `overflow: hidden`, always pad the bottom (`pb-2`) and counter with negative margin (`-mb-2`) so hanging letters like `g`, `y`, `p`, `q`, and `j` are never clipped.
4. **Natural Stagger Interval**: Between consecutive words or navigation links, keep intervals between `120ms` (energetic) to `180ms` (relaxed/luxurious).

---

## 1. Staggered Masked Text Reveal (Kinetic Typography)

- **Alternative Names**: *Split-Text Overflow Reveal*, *Kinetic Cascade*, *Depth-of-Field Text Reveal*
- **Primary Use**: Hero section headlines, prominent value propositions, feature titles.
- **Effect**: Words emerge from an invisible baseline mask with a 3D upward tilt, soft de-blur, and smooth deceleration.

### CSS Keyframes & Utility Class
```css
@keyframes hero-text-reveal {
  0% {
    opacity: 0;
    transform: translateY(115%) rotateX(-12deg);
    filter: blur(7px);
  }
  100% {
    opacity: 1;
    transform: translateY(0%) rotateX(0deg);
    filter: blur(0px);
  }
}

.animate-hero-text-reveal {
  opacity: 0;
  animation: hero-text-reveal 1.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity, filter;
}
```

### React / HTML Usage Pattern
```jsx
<h1 className="text-5xl font-normal max-w-5xl [perspective:1000px]">
  {/* Word 1 */}
  <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
    <span 
      className="inline-block animate-hero-text-reveal" 
      style={{ animationDelay: '300ms' }}
    >
      Delivering
    </span>
  </span>{' '}

  {/* Word 2 (with brand styling) */}
  <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
    <span 
      className="inline-block animate-hero-text-reveal"
      style={{ animationDelay: '550ms' }}
    >
      Tomorrow's Solutions
    </span>
  </span>
</h1>
```

### Timing Reference
| Item | Delay | Duration | Easing |
| :--- | :--- | :--- | :--- |
| First Word | `300ms` | `1.75s` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Second Word / Phrase | `550ms` | `1.75s` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Line 2 Words (Cascade) | `+180ms` step | `1.75s` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 2. Header Waterfall Cascade & Accent Pop

- **Primary Use**: Sticky navbar, top bars, breadcrumb rows.
- **Effect**: Logo and menu links drop down smoothly from above, cascading from left to right, while logo accents perform an energetic spring pop.

### CSS Keyframes & Utility Classes
```css
/* Smooth item drop */
@keyframes header-item-drop {
  0% {
    opacity: 0;
    transform: translateY(-18px);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

.animate-header-logo {
  opacity: 0;
  animation: header-item-drop 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  will-change: transform, opacity, filter;
}

.animate-header-nav-item {
  opacity: 0;
  animation: header-item-drop 1.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity, filter;
}

.animate-header-btn {
  opacity: 0;
  animation: header-item-drop 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.95s forwards;
  will-change: transform, opacity, filter;
}

/* Playful spring pop for logo accents */
@keyframes logo-accent-drop {
  0% {
    opacity: 0;
    transform: translateY(-12px) scale(0.5);
  }
  65% {
    opacity: 1;
    transform: translateY(2px) scale(1.22);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-logo-accent {
  animation: logo-accent-drop 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
  will-change: transform, opacity;
}
```

### React / HTML Usage Pattern
```jsx
{navLinks.map((link, idx) => (
  <a
    key={link.name}
    href={link.href}
    style={{ animationDelay: `${300 + idx * 160}ms` }}
    className="animate-header-nav-item"
  >
    {link.name}
  </a>
))}
```

---

## 3. Majestic Pillar Curtain Elevation

- **Primary Use**: Large decorative background pillars, grid rows, fluted card backdrops.
- **Effect**: Rises smoothly from 32px below while de-blurring into focus, then hands over seamlessly to an infinite breathing cycle.

### CSS Keyframes & Utility Class
```css
@keyframes hero-pillars-entrance {
  0% {
    opacity: 0;
    transform: translateY(32px) scale(0.97);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
    filter: blur(0px);
  }
}

.animate-hero-pillars {
  opacity: 0;
  animation: hero-pillars-entrance 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
  will-change: transform, opacity;
}
```

---

## 4. Brand Pixel Specular Shine

- **Primary Use**: Pixelated text, badges, premium tier tags, accent slogans.
- **Effect**: Triggers an ethereal specular color bloom shortly after the element finishes sliding into view.

### CSS Keyframes & Utility Class
```css
@keyframes hero-pixel-shine {
  0%, 30% {
    filter: drop-shadow(0 0 0px rgba(0, 72, 222, 0));
  }
  65% {
    filter: drop-shadow(0 0 18px rgba(0, 72, 222, 0.45)) drop-shadow(0 0 32px rgba(56, 189, 248, 0.3));
  }
  100% {
    filter: drop-shadow(0 0 0px rgba(0, 72, 222, 0));
  }
}

.animate-hero-pixel-reveal {
  opacity: 0;
  animation: 
    hero-text-reveal 1.85s cubic-bezier(0.16, 1, 0.3, 1) 550ms forwards,
    hero-pixel-shine 2.8s ease-in-out 1.5s forwards;
  will-change: transform, opacity, filter;
}
```

---

## 5. Continuous 60fps Ambient Drift Flows

- **Primary Use**: Ambient color orbs, mesh gradients, backdrop glow elements.
- **Effect**: Hardware-accelerated, infinite gentle floating motion with out-of-phase cycle durations (5s, 5.5s, 6.5s) to eliminate visible repetition.

### CSS Keyframes Sample
```css
@keyframes hero-flow-left {
  0%, 100% {
    transform: translate3d(-60px, 15px, 0) scale(0.96);
    opacity: 0.82;
  }
  50% {
    transform: translate3d(140px, -30px, 0) scale(1.14);
    opacity: 1;
  }
}

@keyframes hero-flow-anchor {
  0%, 100% {
    transform: translate3d(-40px, -20px, 0) scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: translate3d(80px, 25px, 0) scale(1.1);
    opacity: 1;
  }
}
```

---

## 6. Retro CRT Raster-Scan & Terminal Decode (About Us)

- **Primary Use**: Heritage showcases, retro tech illustrations, terminal & developer sections.
- **Trigger**: Scroll-triggered using `IntersectionObserver` with threshold `0.15` and `rootMargin: '0px 0px -40px 0px'`.
- **Effect**:
  1. **Title**: "About Us" materializes accompanied by a brand-blue blinking terminal cursor (`|`) that blinks twice and fades away.
  2. **Vintage PC**: 100% hard-coded ASCII art React component (`src/components/VintagePcAscii.jsx`) rendering a 76-line by 100-column authentic retro computing glyph grid onto an ultra-sharp Retina HiDPI Canvas with locked 1:1 square aspect ratio. An electric-blue raster beam sweep (`2.5s`) unrolls the computer line-by-line with authentic CRT terminal scanlines on pure white canvas.
  3. **Copy Blocks**: Left and right paragraphs resolve into view with digital stagger and subtle focus settling.
  4. **Accent Underline**: Blue underline under "7 years" draws in from left to right.

### CSS Keyframes & Utility Classes
```css
/* Title Terminal Materialize */
@keyframes terminal-title-reveal {
  0% {
    opacity: 0;
    transform: translateY(10px);
    letter-spacing: 0.05em;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: -0.015em;
  }
}
.animate-terminal-title {
  opacity: 0;
  animation: terminal-title-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
  will-change: transform, opacity, letter-spacing;
}

/* Blinking Terminal Cursor (Fades out after 3 blinks) */
@keyframes terminal-cursor-blink {
  0%, 25%, 50%, 75% { opacity: 1; }
  12.5%, 37.5%, 62.5% { opacity: 0; }
  85%, 100% { opacity: 0; }
}
.animate-terminal-cursor {
  animation: terminal-cursor-blink 2.4s steps(1) 0.2s forwards;
}

/* CRT Raster Scanline Sweep */
@keyframes crt-raster-unroll {
  0% {
    clip-path: inset(0 0 100% 0);
    opacity: 0.2;
    filter: brightness(1.6) contrast(1.15);
  }
  65% {
    clip-path: inset(0 0 0% 0);
    opacity: 1;
    filter: brightness(1.2) contrast(1.05);
  }
  100% {
    clip-path: inset(0 0 0% 0);
    opacity: 1;
    filter: brightness(1) contrast(1);
  }
}
.animate-crt-pc {
  opacity: 0;
  animation: crt-raster-unroll 1.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
  will-change: clip-path, filter, opacity;
}

/* Electric Blue Scanline Raster Beam */
@keyframes crt-beam-sweep {
  0% { top: 0%; opacity: 1; }
  65% { top: 100%; opacity: 1; }
  85%, 100% { top: 100%; opacity: 0; }
}
.animate-crt-beam {
  animation: crt-beam-sweep 1.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
  will-change: top, opacity;
}

/* Paragraph Digital Fade */
@keyframes terminal-block-fade {
  0% {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}
.animate-terminal-block {
  opacity: 0;
  animation: terminal-block-fade 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity, filter;
}
```

### React Implementation Pattern
```jsx
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef(null);

useEffect(() => {
  const el = sectionRef.current;
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  observer.observe(el);
  return () => observer.disconnect();
}, []);
```

### Interactive Magnetic ASCII Particle Repulsion & Cursor Evasion (`VintagePcAscii.jsx`)
- **Physics Engine**:
  - **Repulsion Field**: Calculates radial vector `(dx, dy)` between cursor position and individual ASCII glyph positions in a 76×100 coordinate space.
  - **Force Falloff**: Non-linear power decay `((REPEL_RADIUS - dist) / REPEL_RADIUS) ^ 1.3 * 5.2` within a `78px` radius.
  - **Elastic Restitution**: Hooke's Law spring-back force `homeDx * 0.082` with viscous air damping `friction = 0.81`.
  - **Evasive Macro Tilt**: The wrapper element applies `translate3d(-normX * 18px, -normY * 18px, 0)` smoothly guiding the container away from the incoming cursor vector.
  - **Dynamic Energy Color Shift**: Displaced characters dynamically illuminate in `#0048DE` (brand electric blue) and restore to `#334155` at rest.
  - **CPU-Sleep Mode**: Automatically pauses `requestAnimationFrame` when all particle velocities fall below `0.015px/frame` at zero cursor activity, maintaining 0% idle CPU usage.

---

## 7. Tech Marquee: Zero-Gravity Float, Shimmer & Spotlight Hover

- **Primary Use**: Technology stack badges, partner logos, client marquees, horizontal tool strips.
- **Triggers**:
  - **Scroll Entrance**: Triggers via `IntersectionObserver` (`threshold: 0.15`) as user scrolls down from the Hero section.
  - **Continuous Micro-Motion**: Staggered organic sine-wave floating ("Zero-Gravity") or specular shimmer.
  - **Interactive Hover**: Cursor hover pauses marquee gliding, lifts the active badge with soft brand glow, spotlights it against dimmed siblings, and reveals a micro-badge tooltip.

### 1. Scroll Entrance Cascading Keyframes
```css
/* Eyebrow Title Entrance with Tracking Expand */
@keyframes marquee-title-reveal {
  0% {
    opacity: 0;
    transform: translateY(-12px);
    letter-spacing: 0.38em;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: 0.25em;
    filter: blur(0px);
  }
}
.animate-marquee-title {
  opacity: 0;
  animation: marquee-title-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
  will-change: transform, opacity, filter, letter-spacing;
}

/* Rows Staggered Slide-Up Cascade */
@keyframes marquee-row-reveal {
  0% {
    opacity: 0;
    transform: translateY(28px) scale(0.97);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}
.animate-marquee-row-1 {
  opacity: 0;
  animation: marquee-row-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
  will-change: transform, opacity, filter;
}
.animate-marquee-row-2 {
  opacity: 0;
  animation: marquee-row-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
  will-change: transform, opacity, filter;
}
.animate-marquee-row-3 {
  opacity: 0;
  animation: marquee-row-reveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
  will-change: transform, opacity, filter;
}
```

### 2. Selected Production Pattern: Domino Ripple Pop Keyframes
```css
/* Domino Ripple Pop: Staggered 3D Spring Bloom */
@keyframes logo-domino-pop {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.78) rotate(-4deg);
    filter: blur(4px);
  }
  65% {
    transform: translateY(-5px) scale(1.06) rotate(1deg);
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
    filter: blur(0px);
  }
}
.animate-domino-pop {
  animation: logo-domino-pop 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity, filter;
}
```

### 3. Alternative Motion Variations
- **Option 1 (Zero-Gravity Wave Float)**: Staggered vertical sinusoidal breathing (`4.2s` cycle, `translateY(-5px)` to `+4px`).
- **Option 2 (Specular Shimmer Beam)**: Polished diagonal light sheen sweep (`4.5s` cycle, linear gradient gloss).

### 4. Interactive Spotlight & Tooltip Pattern
```jsx
<div className="group/row flex items-center gap-14 md:gap-18">
  {logos.map((item, index) => (
    <div
      key={index}
      className="group relative flex items-center justify-center min-w-[76px] h-16 cursor-pointer select-none transition-opacity duration-300 group-hover/row:opacity-40 hover:!opacity-100"
    >
      {/* Floating container (prevents transform collisions with hover) */}
      <div 
        className="animate-logo-float" 
        style={{ animationDelay: `${((index % 9) * 0.35).toFixed(2)}s` }}
      >
        {/* Interactive card: lift + scale + soft drop glow */}
        <div className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:drop-shadow-[0_12px_22px_rgba(0,72,222,0.2)]">
          {item.comp}
        </div>

        {/* Floating Tooltip Pill */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 translate-y-1 group-hover:translate-y-0">
          <div className="bg-slate-900/95 text-white text-[10.5px] font-medium tracking-wide px-2.5 py-0.5 rounded-md shadow-md whitespace-nowrap backdrop-blur-sm border border-slate-800">
            {item.name}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
```

---

## 8. Different Minds: Cinematic Iris Sweep, Split-Word Kinetic Reveal & 3D Gyroscopic Parallax

- **Primary Use**: Full-width statement banners, collaborative ethos showcases, philosophy transitions.
- **Trigger**: Scroll-triggered using `IntersectionObserver` with threshold `0.15` and `rootMargin: '0px 0px -40px 0px'`.
- **Effect**:
  1. **Background Arrival**: Drops in from `scale(1.12)` with optical de-blur (`blur(14px) -> blur(0px)`) over `2.2s cubic-bezier(0.16, 1, 0.3, 1)`.
  2. **Specular Sheen Sweep**: A diagonal luminous light sheen (`skewX(-24deg)`) sweeps across the halftone print artwork.
  3. **Split-Word Kinetic 3D Cascade**: "DIFFERENT" and "MINDS" emerge independently from masked baselines with 3D upward tilt (`rotateX(-18deg)`), staggered by `190ms`.
  4. **Electric Brand Energy Line**: Expanding neon laser divider line (`scaleX(0) -> scaleX(1)`) in `#0048DE` with soft blue specular bloom.
  5. **Subtitle Dual-Phrase Stagger**: Two phrases de-blur and glide upward sequentially.
  6. **Interactive 3D Gyroscopic Parallax**: Cursor position creates physical depth separation between the counter-moving background artwork and the 3D-tilting typography.

### CSS Keyframes & Utility Classes
```css
/* Split-Word Kinetic 3D Mask Reveal */
@keyframes word-masked-reveal {
  0% {
    opacity: 0;
    transform: translateY(125%) rotateX(-18deg);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0%) rotateX(0deg);
    filter: blur(0px);
  }
}
.animate-word-different {
  opacity: 0;
  animation: word-masked-reveal 1.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
  will-change: transform, opacity, filter;
}
.animate-word-minds {
  opacity: 0;
  animation: word-masked-reveal 1.85s cubic-bezier(0.16, 1, 0.3, 1) 0.44s forwards;
  will-change: transform, opacity, filter;
}

/* Electric Brand Energy Line */
@keyframes energy-line-expand {
  0% { opacity: 0; transform: scaleX(0); }
  50% { opacity: 1; box-shadow: 0 0 20px rgba(0, 72, 222, 0.9); }
  100% { opacity: 0.85; transform: scaleX(1); box-shadow: 0 0 12px rgba(0, 72, 222, 0.6); }
}
.animate-energy-line {
  opacity: 0;
  animation: energy-line-expand 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.72s forwards;
  will-change: transform, opacity, box-shadow;
}
```

---

## 9. Mission & Vision: 3D Rectangular Cube Flip & Dynamic Perspective Depth

- **Primary Use**: Mission & Vision switcher, dual-perspective brand showcases, interactive card reveals.
- **Trigger**: **Scroll-Triggered** via sticky pinned viewport (`190vh` scroll track) with threshold detection at 45% progress; synchronized with interactive tab clicks ("Vision" / "Mission").
- **Effect**:
  1. **Scroll-Driven 3D Revolution**: As the user scrolls down through the pinned section, crossing the 45% scroll threshold, the 3D rectangular cube automatically rotates 90 degrees along the X-axis into the **Vision** face. Scrolling up returns it to **Mission**.
  2. **3D Cuboid Geometry**: Built with `[perspective: 2200px]` and `[transform-style: preserve-3d]`, using dynamic `translateZ(H / 2)` calculation to maintain physical rectangular prism accuracy across all screen widths.
  3. **Synchronized Programmatic Scrolling**: Clicking the "Vision" or "Mission" tabs smoothly scrolls the browser directly to the corresponding scroll position, executing the 3D cube rotation seamlessly.
  4. **Ground Ambient Shadow**: Elliptical ambient shadow underneath that contracts at mid-turn and expands as each face docks flat.
  5. **Micro-Motion Illustrations**:
     - Mission: Low-poly green mountain summit with winding trail, red flag, and drifting clouds (`animate-cloud-drift`).
     - Vision: Golden lightbulb capsule explorer with twinkling star sparkles (`animate-sparkle`) and drifting clouds.

### CSS & 3D Transform Architecture
```css
/* Container 3D Viewport */
.perspective-viewport {
  perspective: 2200px;
}

/* 3D Rotating Cuboid */
.cuboid-core {
  transform-style: preserve-3d;
  transition: transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Front Face */
.face-mission {
  transform: rotateX(0deg) translateZ(var(--half-depth));
  backface-visibility: hidden;
}

/* Bottom Face */
.face-vision {
  transform: rotateX(-90deg) translateZ(var(--half-depth));
  backface-visibility: hidden;
}
```

---

## 📝 Template for Adding Future Animations


When adding new animations to this catalog, copy and paste this template:

```markdown
### [Animation Name]
- **Primary Use**: [e.g., Card hover, modal entrance, scroll reveal]
- **Trigger**: [e.g., On Mount, On Scroll, On Hover]
- **Effect Description**: [1-2 sentences explaining what it does]

#### CSS Keyframes & Utility
```css
/* Keyframes here */
```

#### React / HTML Implementation
```jsx
/* JSX snippet here */
```

#### Timings & Settings
- **Duration**: `X.Xs`
- **Delay / Stagger**: `XXXms`
- **Easing**: `cubic-bezier(...)` or `ease-in-out`
```
