import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import VintagePcAscii from './VintagePcAscii';
import { SkillLogoBadge } from './SkillIcons';
import PixelSpeechBubble from './PixelSpeechBubble';

// Comic Book Dialogue & Section Commentary Matrix for Batman Sleeping on Couch
const BATMAN_INTRO_QUOTE = "I'm watching you. I am Batman.";
const LEETCODE_ROAST_QUOTE = "Computer Science Engineer turned designer? In Gotham, that's called 'giving up on LeetCode'.";

const SECTIONS_META = [
  { id: 'home', title: 'HERO HQ', label: 'THE BAT-SIGNAL' },
  { id: 'logos', title: 'TECH ARSENAL', label: 'UTILITY BELT' },
  { id: 'statement', title: 'PHILOSOPHY', label: 'THE MANIFESTO' },
  { id: 'about', title: 'BAT-CAVE', label: "PRATHAM'S LAB" },
  { id: 'work', title: 'EXPERIENCE', label: 'FIELD MISSIONS' },
  { id: 'services', title: 'SERVICES', label: 'SPECIAL OPS' },
  { id: 'live-websites', title: 'LIVE OPS', label: 'SHIPPED CODE' },
  { id: 'infinite-canvas', title: '3D UNIVERSE', label: 'MULTIVERSE' },
  { id: 'contact', title: 'DISPATCH', label: 'SECURE COMM' },
];

const COMIC_QUOTES = {
  home: [
    "Dark mode isn't just an aesthetic choice. It's Batman's natural habitat.",
    "Welcome to Pratham's portfolio. He's probably alt-tabbed scrolling Instagram Reels right now.",
    "He spent 14 hours adjusting this hero gradient instead of paying his pending EMIs.",
    "He claims cutting chai unlocks his creative flow. It's really just sugar and deadline panic.",
    "Client: 'We want out-of-the-box UI!' Pratham: *delivers it*. Client: 'No, not like that, put it back in the box'.",
    "You're scrolling at 100 mph. We both know you're just skimming for case studies.",
    "Still in the hero section? Go ahead, scroll down. See if his Figma auto-layout actually works on web.",
    "Recruiter? Client? Or just another designer stealing his layout while doomscrolling on Insta?",
  ],
  logos: [
    "React, Next.js, Tailwind... Batman's utility belt only needs TypeScript and spite.",
    "Look at all these tech stacks. Can any of them stop Bane? Didn't think so.",
    "Pratham put all these logos here just to intimidate recruiters. Respect.",
    "Vibe coding: when you let AI write the CSS and just pray the z-index holds.",
    "All these frameworks and people still struggle with centering a div. Sad.",
    "Figma, Illustrator, Photoshop... Pratham collects tools like travel reels he can't afford.",
    "Client: 'Give us out-of-the-box thinking!' 3 days later: 'Actually, can you make it look like Apple?'",
    "He put 'Vibe Coding' here. That's designer slang for letting AI write CSS while he sips cutting chai.",
    "Framer, Webflow, React... all these modern tools and his sleep schedule is still stuck in 2004.",
    "Look at all these logos. He has 80 Figma tabs open right now named 'Untitled (4)'.",
    "He dreams of traveling the world. His bank balance saw his pending EMIs and laughed.",
    "Are you impressed by this marquee? He tweaked this while binge-watching anime on monitor 2.",
  ],
  statement: [
    "Deep philosophical design quote... Meanwhile I'm wondering if Wayne Enterprises pays taxes.",
    "'Simplicity is the ultimate sophistication.' Or you just ran out of sprint time.",
    "I also lurk in shadows and obsess over alignment. Designers and vigilantes are basically twins.",
    "Crafting digital experiences with purpose... I just beat criminals in alleys, but great typography.",
    "'Design with purpose...' Translation: Pratham ran out of time before the Monday client review.",
    "Deep design philosophy. Meanwhile, his daily routine is 20 minutes of Figma and 3 hours of PC gaming.",
    "Client: 'We want something bold and out of the box!' 3 days later: 'Can you make the font Arial?'",
    "A full-screen statement on minimalism? That's code for 'Figma crashed so I kept it simple'.",
    "You actually paused to read a design manifesto? You must be profoundly bored today.",
    "He calls it Swiss typography. I call it giant text taking up my prime nap real estate.",
  ],
  about: [
    BATMAN_INTRO_QUOTE,
    LEETCODE_ROAST_QUOTE,
    "Pratham's workstation. 3+ years in UI/UX, 200% confidence until client asks to 'hop on a quick call'.",
    "An engineer who also designs? In Gotham we call that having multiple secret identities.",
    "Look at that CRT monitor. Even the Batcomputer wasn't this vintage back in 1989.",
    "Hey! This is my home couch. Put me back down before Commissioner Gordon radios in.",
    "Fueled by coffee and dark mode. Just like the Dark Knight himself.",
    "Fueled entirely by Vadodara cutting chai, PC gaming, and unfulfilled travel dreams.",
    "Client: 'We want out-of-the-box UI!' Pratham builds it. Client: 'Wait, we hate out-of-the-box UI'.",
    "He says he's 'doing competitor research'. Alfred, he's just binge-watching anime with Figma minimized.",
    "Wanderlust in his bio, pending EMIs in his banking app. A true modern designer tragedy.",
    "He put me on this couch so you wouldn't notice the 40 unorganized pages in his Figma file.",
    "Surviving client review rounds at Infotek without crying into his masala tea. Barely.",
    "Ask him about his design process: 10% Figma, 30% cutting chai, 60% crying over client revisions.",
    "He bought a mechanical keyboard to sound productive while doomscrolling Instagram Reels.",
    "He wants to backpack across Japan and Europe. His bank balance saw his pending EMIs and laughed.",
    "He created 50 button variants in his design system. The client asked for default blue.",
    "His biggest nightmare isn't Bane. It's a Slack message on Friday at 6:45 PM: 'Hey Pratham, quick feedback call?'.",
    "Surviving on cutting chai and deadline adrenaline since 2021.",
  ],
  work: [
    "Look at this neon lime lanyard pass. Does this badge grant me clearance to Arkham Asylum?",
    "Experience: Surviving 47 client feedback rounds without turning into the Joker.",
    "Lead UI/UX at Infotek... Even Bruce Wayne had to do an unpaid internship under Ra's al Ghul.",
    "Interactive 3D card physics? The Wayne Enterprises R&D lab is taking notes.",
    "If you pull on my lanyard too hard, the Bat-Grappling hook activates.",
    "UI/UX Designer at Infotek... Surviving 47 rounds of 'make it pop, but keep it clean'.",
    "He built a 3D physics badge just so someone hires him before his next EMI deduction hits.",
    "Go ahead, yank the lanyard. Pratham spent 8 hours tuning the spring physics instead of working.",
    "Client: 'Give us something out of the box!' Pratham: *redesigns entire flow*. Client: 'Too out of the box'.",
    "Awarded Best Performer at Vtech for a 1-week website sprint. He survived on 14 cups of cutting chai.",
    "Are you checking his case studies, or just swinging his 3D card like a cat toy?",
    "3D badge physics in a portfolio? Peak 'hire me, my bank account is in the single digits' energy.",
  ],
  services: [
    "Full-stack design, design systems, vibe coding... Do you guys tune Batmobiles too?",
    "Client: 'Can you make it pop?' Batman: 'Can you make your project budget pop?'",
    "High-conversion web design guaranteed. Unless Gotham experiences another citywide blackout.",
    "Wireframing, prototyping, user testing... We test our prototypes on Gotham's finest villains.",
    "'Out-of-the-box UI/UX design'... until the client begs to put everything back inside the box.",
    "Client: 'Can we do one tiny tweak?' *proceeds to rewrite the entire design brief on Friday at 7 PM*.",
    "Design systems, wireframes, prototypes... He forgot to list 'panicking over pending EMIs'.",
    "He promises pixel-perfect delivery. Try opening this on an iPad Mini, I dare you.",
    "You pay the invoice, he disappears into dark mode with a cup of cutting chai and emerges with 40 variants.",
    "Hire him for a design system. He desperately needs to pay off his PC gaming rig.",
  ],
  'live-websites': [
    "Real deployed websites in production! Zero bugs. (Except the ones Batman hasn't found yet).",
    "Proof that Pratham actually ships products instead of just napping on couches all day.",
    "Responsive across all screens: Batphone, Batcomputer, and Bruce's gold-plated iPad.",
    "Actual live URLs. Go ahead and click them, no Scarecrow fear toxins inside.",
    "Actual live client websites! Designed in Vadodara, shipped through sheer adrenaline and cutting chai.",
    "Proof Pratham actually ships products instead of just re-designing his portfolio hero every weekend.",
    "Go ahead, click them. Every link you click gets him 1% closer to paying off his EMIs.",
    "Real clients paid real money for these. And yes, they all asked to 'make the logo bigger'.",
    "Look at these cards. He designed these while an anime fight scene was playing on screen 2.",
    "Still browsing? Just hire him already. The man has travel dreams and a zero bank balance.",
  ],
  'infinite-canvas': [
    "Wait, a whole interactive 3D universe? Alfred, fetch my motion sickness pills immediately.",
    "Panning around in 3D WebGL while I'm trying to sleep. The sheer disrespect.",
    "The Batwing has less complicated flight physics than this infinite canvas engine.",
    "Careful where you zoom, you might uncover the Batcave's secret coordinates.",
    "An infinite 3D canvas? Pratham's dream vacation is also infinite, thanks to his pending EMIs.",
    "Alfred, fetch my tea. Pratham built an entire 3D galaxy instead of delivering client mockups on time.",
    "Zoom all you want through this 3D space, you won't find Pratham's savings account in here.",
    "He spent 3 days tuning this 3D canvas while his client was waiting for a mobile navbar revision.",
    "Warning: Spinning this canvas too fast may void your GPU and remind Pratham of his EMI dues.",
  ],
  contact: [
    "The Bat-Signal is illuminated. Drop a message or Bruce Wayne will fund your competitor.",
    "Let's build something legendary together. Or just send coffee. The Dark Knight runs on beans.",
    "You scrolled all the way to the southern border of Gotham. Now hit that 'Schedule a Call' button.",
    "Alfred is monitoring this contact form. Don't send spam or he'll send Robin.",
    "You scrolled through the entire site. Hit that send button, his pending EMIs won't pay themselves.",
    "Drop an inquiry. He's sitting by his phone right now, pretending he's not doomscrolling Instagram.",
    "Need an 'out-of-the-box' UI? Message him now before he loses his sanity to another Canva client.",
    "Don't just ghost him after reading all this. Even the Joker leaves a calling card.",
    "You spent 5 minutes here. At this point, you two are basically best friends. Send a project brief.",
    "Hire him. He wants to travel the world, but his bank account won't even let him leave Gujarat.",
  ],
  dragging: [
    "WHEEE! I'm flying! Well, being aggressively dragged across the DOM.",
    "Careful with the couch! That's genuine Italian Wayne Manor leather!",
    "Is this what being abducted by Superman feels like?!",
    "Alfred! Some random visitor has grabbed my couch and won't let go!",
    "Watch out for that z-index! Don't drop me behind an iframe!",
    "Who gave you sudo permission to displace Gotham's protector?!",
    "Put me down! I have a crime to solve at 3 AM!",
    "Hey! Put the couch down! I'm trying to watch Pratham doomscroll Instagram in peace!",
    "Dragging me across the screen? Pratham, revoke this visitor's cursor privileges!",
    "Is this how recruiters interview designers now? By kidnapping Batman across the DOM?!",
    "Drop me on a broken link and Commissioner Gordon will hear about this!",
    "Careful! I'm balancing a hot cup of cutting chai on this couch!",
    "You have way too much free time. Aren't you supposed to be reviewing Pratham's resume?",
    "Put me down! Pratham's pending EMIs are already stressful enough without you kidnapping me!",
  ],
  reset: [
    "Ah, home sweet couch. Wake me up when Figma 2.0 drops.",
    "Back in my designated corner. Let a vigilante sleep in peace.",
    "Finally, safety. No more turbulent pointer dragging.",
    "Ah, back in my corner. Don't touch me again unless you're offering freelance equity.",
    "Home sweet couch. Now go hire Pratham so he can finally afford a plane ticket.",
    "Finally, peace. Now go read his case studies or whatever you came here to procrastinate on.",
    "Back where I belong. That drag was wilder than Pratham's client review meetings.",
  ],
  pokes: [
    "Stop poking me! I'm trying to sleep through Pratham's daily client standup.",
    "You've clicked me 5 times. Do I look like an interactive Figma prototype to you?",
    "Clicking me won't pay Pratham's pending EMIs, trust me.",
    "Are you looking for an easter egg or do you just really hate reading case studies?",
    "Keep clicking. Maybe on the 50th click, a client will actually approve an out-of-the-box design on version 1.",
    "That's it. Commissioner Gordon has been notified of your aggressive clicking behavior.",
    "Every poke adds ₹500 to Pratham's freelance invoice. Keep going, he has EMIs.",
  ],
  hover: [
    "Don't tap the glass. Batman is resting.",
    "Personal space! I'm off duty right now.",
    "Hovering over me won't lower Pratham's freelance rates.",
    "Are you inspecting my CSS or thinking about dragging me?",
    "Yes, I'm asleep. No, you can't touch the cape.",
    "Move your cursor, you're blocking my nap shadow.",
    "I can feel your cursor breathing on my cowl. Back up.",
  ],
  fastScroll: [
    "Slow down! You're gonna cause a DOM earthquake!",
    "Scrolling at Mach 3? We both know you're not actually reading anything.",
    "Hey speed demon, ease up on the scroll wheel! My cape is flapping!",
    "You're scrolling faster than a client rejecting an out-of-the-box design!",
  ],
  idle: [
    "Zzz... wake me up when a client approves an invoice.",
    "Did you fall asleep or did Pratham's case studies put you out?",
    "Still staring? Hit that contact button already, his EMIs won't pay themselves.",
    "Zzz... dreaming of Wayne Manor... not Pratham's unorganized Figma files...",
  ],
  pass_grab: [
    "Hey! Leave Pratham's employee badge alone! He needs that to get into the office!",
    "Are you checking his job title, or just grabbing his 3D badge like a cat toy?!",
    "Hands off the lanyard! That card is the only proof he actually works at Infotek!",
    "Careful! Don't snap the cord, Pratham's salary slip is linked to that badge!",
    "You're tugging that badge harder than a client tugging at project deadlines.",
    "Stop pulling! The Three.js physics engine is begging for mercy!",
  ],
  pass_bounce: [
    "Whoa! Look at that pass bounce! Pratham spent 8 hours tuning spring physics instead of working.",
    "Bouncing that 3D card? Peak 'please hire me, rent and pending EMIs are due' engineering.",
    "You're having way too much fun making that lanyard spring bounce, aren't you?",
    "Boing! That lanyard badge bounced higher than Pratham's confidence after a client praise.",
    "Keep bouncing it! Maybe the physics will shake loose a freelance contract.",
    "Look at that spring oscillation! That's Computer Science math put to questionable use.",
  ],
  tabSwitch: [
    "Welcome back. Did you find a cheaper UI designer on Fiverr while you were away?",
    "Back from scrolling Reels? Pratham is still here, still sipping cutting chai.",
    "I saw you alt-tabbing. Don't worry, Pratham's Figma was minimized too.",
  ],
  copyText: [
    "Copying text? Pratham's design copyright lawyers in Gotham have been notified.",
    "Stealing Pratham's copy? At least credit him in your Figma file!",
    "Ctrl+C detected. Even Catwoman had more respect for intellectual property.",
  ],
  drop: {
    work: [
      "You dropped me in Work. 47 rounds of 'make it pop'.",
      "Back in the field missions. Watch out for flying 3D badges.",
    ],
    logos: [
      "Dropped in the tech stack. Look at all these frameworks he barely uses.",
      "Right next to Figma. Pratham's natural habitat.",
    ],
    contact: [
      "Dropped at the finish line. Just message him, his EMIs won't pay themselves.",
      "The Bat-Signal is lit right here. Send a project brief.",
    ],
    'infinite-canvas': [
      "Dropped into 3D space! Alfred, fetch my motion sickness pills.",
      "Floating in WebGL coordinates. The sheer disrespect.",
    ],
    general: [
      "Rude landing. At least put the couch back where you found it.",
      "Back on the floor. Pratham, revoke this visitor's drag privileges.",
      "My cape is wrinkled now. I hope you're happy.",
    ],
  },
};

export default function AboutUs({ onLearnMoreClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Free-roaming viewport companion state for Batman on Couch (sticky to viewport)
  const anchorRef = useRef(null);
  const [isFloating, setIsFloating] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasBeenMoved, setHasBeenMoved] = useState(false);
  const dragRef = useRef({ shiftX: 0, shiftY: 0, startX: 0, startY: 0, moved: false });

  // Comic Book Dialogue & Section Tracking State
  const [activeSection, setActiveSection] = useState('about');
  const [hasReachedAbout, setHasReachedAbout] = useState(false);
  const hasStartedIntroRef = useRef(false);
  const [comicQuote, setComicQuote] = useState('');
  const [quoteKey, setQuoteKey] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const isDraggingRef = useRef(false);
  const activeSectionRef = useRef('about');
  const pokeCountRef = useRef(0);
  const aboutStepRef = useRef(1); // 1 = "I am Batman", 2 = LeetCode roast, 3+ = event-driven reactions
  const lastReactionTimeRef = useRef(0);
  const lastReactionTypeRef = useRef('');
  const lastScrollPosRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const lastFastScrollTimeRef = useRef(0);
  const lastHoverTimeRef = useRef(0);
  const idleTimerRef = useRef(null);

  // Central Event-Driven Reaction Engine
  const triggerReaction = (type, payload = {}) => {
    const now = Date.now();

    const isDirectInteraction =
      type === 'click' ||
      type === 'pass_grab' ||
      type === 'pass_bounce' ||
      type === 'drag_start' ||
      type === 'drop' ||
      type === 'reset';

    // Prevent spamming the exact same reaction type within 2.2s
    if (type === lastReactionTypeRef.current && now - lastReactionTimeRef.current < 2200) {
      return;
    }

    // General cooldown for ambient events so speech bubble doesn't thrash
    if (!isDirectInteraction) {
      if (now - lastReactionTimeRef.current < 2000) {
        return;
      }
    }

    let pool = [];

    if (type === 'pass_grab') {
      aboutStepRef.current = 3;
      pool = COMIC_QUOTES.pass_grab;
    } else if (type === 'pass_bounce') {
      aboutStepRef.current = 3;
      pool = COMIC_QUOTES.pass_bounce;
    } else if (type === 'tab_switch') {
      pool = COMIC_QUOTES.tabSwitch;
    } else if (type === 'copy_text') {
      pool = COMIC_QUOTES.copyText;
    } else if (type === 'hover') {
      pool = COMIC_QUOTES.hover;
    } else if (type === 'click') {
      aboutStepRef.current = 3;
      pokeCountRef.current += 1;
      if (pokeCountRef.current === 1) {
        pool = ["Ouch! What was that for?"];
      } else if (pokeCountRef.current === 2) {
        pool = ["I have 3 cracked ribs from fighting Bane, stop poking!"];
      } else if (pokeCountRef.current === 3) {
        pool = ["Do I look like an interactive Figma button to you?!"];
      } else {
        pool = COMIC_QUOTES.pokes;
      }
    } else if (type === 'drag_start') {
      aboutStepRef.current = 3;
      pool = COMIC_QUOTES.dragging;
    } else if (type === 'drop') {
      aboutStepRef.current = 3;
      const sec = payload.section || activeSectionRef.current;
      const dropQuotes = COMIC_QUOTES.drop || {};
      pool = dropQuotes[sec] || dropQuotes.general || COMIC_QUOTES.reset;
    } else if (type === 'scroll_fast') {
      pool = COMIC_QUOTES.fastScroll;
    } else if (type === 'scroll_section') {
      const sec = payload.section || activeSectionRef.current;
      pool = COMIC_QUOTES[sec] || COMIC_QUOTES.about;
      if (sec === 'about') {
        pool = pool.filter((q) => q !== BATMAN_INTRO_QUOTE && q !== LEETCODE_ROAST_QUOTE);
      }
    } else if (type === 'idle') {
      pool = COMIC_QUOTES.idle;
    } else if (type === 'reset') {
      aboutStepRef.current = 3;
      pool = COMIC_QUOTES.reset;
    }

    if (!pool || pool.length === 0) return;

    const others = pool.filter((q) => q !== comicQuote);
    const nextQuote = others.length > 0
      ? others[Math.floor(Math.random() * others.length)]
      : pool[0];

    hasStartedIntroRef.current = true;
    setHasReachedAbout(true);
    lastReactionTimeRef.current = now;
    lastReactionTypeRef.current = type;
    setComicQuote(nextQuote);
    setQuoteKey((k) => k + 1);
    setBubbleOpen(true);
  };

  const handleAutoAdvance = () => {
    // Step 1: "I am Batman" -> auto-advances to LeetCode roast
    if (aboutStepRef.current === 1) {
      aboutStepRef.current = 2;
      setComicQuote(LEETCODE_ROAST_QUOTE);
      setQuoteKey((k) => k + 1);
      return;
    }

    // Step 2 and beyond: smoothly cycle through the collection of quotes & roasts about Pratham
    aboutStepRef.current = 3;
    const currentSection = isFloating ? activeSectionRef.current : 'about';
    const sectionPool = COMIC_QUOTES[currentSection] || COMIC_QUOTES.about;
    const eligible = sectionPool.filter(
      (q) => q !== BATMAN_INTRO_QUOTE && q !== LEETCODE_ROAST_QUOTE && q !== comicQuote
    );
    const nextQuote = eligible.length > 0
      ? eligible[Math.floor(Math.random() * eligible.length)]
      : sectionPool[0];

    setComicQuote(nextQuote);
    setQuoteKey((k) => k + 1);
  };

  const handleBatmanClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // If not started yet, start it
    if (!hasStartedIntroRef.current) {
      hasStartedIntroRef.current = true;
      setHasReachedAbout(true);
      aboutStepRef.current = 1;
      setComicQuote(BATMAN_INTRO_QUOTE);
      setQuoteKey((k) => k + 1);
      setBubbleOpen(true);
      return;
    }
    // If still on step 1, clicking immediately reveals step 2
    if (aboutStepRef.current === 1) {
      aboutStepRef.current = 2;
      setComicQuote(LEETCODE_ROAST_QUOTE);
      setQuoteKey((k) => k + 1);
      return;
    }
    aboutStepRef.current = 3;
    triggerReaction('click');
  };

  const handleBatmanMouseEnter = () => {
    if (isDraggingRef.current) return;
    if (!hasStartedIntroRef.current) return;
    const now = Date.now();
    // 6-second cooldown between hover reactions so cursor hovering isn't hyper-sensitive
    if (now - lastHoverTimeRef.current > 6000) {
      lastHoverTimeRef.current = now;
      if (aboutStepRef.current >= 2) {
        aboutStepRef.current = 3;
        triggerReaction('hover');
      }
    }
  };

  const handlePointerDown = (e) => {
    // Only primary mouse button or touch
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const targetEl = e.currentTarget;
    const rect = targetEl.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    dragRef.current = {
      shiftX,
      shiftY,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };

    setPos({ x: rect.left, y: rect.top });
    if (isFloating) {
      setIsDragging(true);
      isDraggingRef.current = true;
    }

    const handlePointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      const dist = Math.hypot(
        moveEvent.clientX - dragRef.current.startX,
        moveEvent.clientY - dragRef.current.startY
      );
      if (dist > 4) {
        if (!dragRef.current.moved) {
          dragRef.current.moved = true;
          setIsFloating(true);
          setIsDragging(true);
          isDraggingRef.current = true;
          aboutStepRef.current = 3;
          triggerReaction('drag_start');
        }
        setPos({
          x: moveEvent.clientX - dragRef.current.shiftX,
          y: moveEvent.clientY - dragRef.current.shiftY,
        });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      if (dragRef.current.moved) {
        setIsDragging(false);
        isDraggingRef.current = false;
        setHasBeenMoved(true);
        triggerReaction('drop', { section: activeSectionRef.current });
      } else {
        // It was a simple click on Batman!
        setIsDragging(false);
        isDraggingRef.current = false;
        handleBatmanClick();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const handleResetDoodle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!anchorRef.current) {
      setIsFloating(false);
      setHasBeenMoved(false);
      return;
    }

    // Smoothly scroll back to About section if user is elsewhere
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(aboutEl, { offset: -20, duration: 0.9 });
      } else {
        aboutEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Trigger reset quote
    pokeCountRef.current = 0;
    aboutStepRef.current = 3;
    triggerReaction('reset');

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const startX = pos.x;
    const startY = pos.y;
    const targetX = anchorRect.left;
    const targetY = anchorRect.top;

    const startTime = performance.now();
    const duration = 420;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      const curX = startX + (targetX - startX) * ease;
      const curY = startY + (targetY - startY) * ease;
      setPos({ x: curX, y: curY });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsFloating(false);
        setHasBeenMoved(false);
      }
    };

    requestAnimationFrame(step);
  };

  // Scroll listener for About visibility, real-time section detection, velocity & inactivity reactions
  useEffect(() => {
    // Reset inactivity / idle timer on user activity
    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (!isDraggingRef.current && aboutStepRef.current >= 2) {
          triggerReaction('idle');
        }
      }, 22000); // 22 seconds of inactivity
    };

    resetIdleTimer();
    window.addEventListener('mousemove', resetIdleTimer, { passive: true });
    window.addEventListener('keydown', resetIdleTimer, { passive: true });

    const handleScrollAndCheck = () => {
      resetIdleTimer();

      // 1. Check About section visibility for slow CRT terminal animation & Batman intro
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportH = window.innerHeight || 800;
        const inFocalZone = rect.top <= viewportH * 0.65 && rect.bottom >= 120;
        if (inFocalZone) {
          setIsVisible(true);
          if (!hasStartedIntroRef.current) {
            hasStartedIntroRef.current = true;
            setHasReachedAbout(true);
            aboutStepRef.current = 1;
            setComicQuote(BATMAN_INTRO_QUOTE);
            setQuoteKey((k) => k + 1);
            setBubbleOpen(true);
          }
        } else if (rect.top > viewportH * 0.95) {
          setIsVisible(false);
        }
      }

      // 2. Real-time section detection & fast scroll velocity tracking
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const viewportH = window.innerHeight || 800;
        const docHeight = document.documentElement.scrollHeight || 5000;
        const now = Date.now();

        // Calculate scroll velocity (px/ms)
        const dt = Math.max(1, now - lastScrollTimeRef.current);
        const dy = Math.abs(scrollY - lastScrollPosRef.current);
        const velocity = dy / dt;
        lastScrollPosRef.current = scrollY;
        lastScrollTimeRef.current = now;

        // Detect fast scrolling burst (> 3.5 px/ms)
        if (velocity > 3.5 && now - lastFastScrollTimeRef.current > 12000) {
          lastFastScrollTimeRef.current = now;
          if (aboutStepRef.current >= 2) {
            triggerReaction('scroll_fast');
          }
        }

        let detected = 'about';
        if (scrollY < 120) {
          detected = 'home';
        } else if (scrollY + viewportH >= docHeight - 80) {
          detected = 'contact';
        } else {
          const focalY = viewportH * 0.45;
          for (const sec of SECTIONS_META) {
            const el = document.getElementById(sec.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= focalY && rect.bottom >= focalY) {
              detected = sec.id;
              break;
            }
          }
        }

        if (detected !== activeSectionRef.current) {
          activeSectionRef.current = detected;
          setActiveSection(detected);
          pokeCountRef.current = 0;

          if (!isDraggingRef.current) {
            if (detected === 'about') {
              if (!hasStartedIntroRef.current) {
                hasStartedIntroRef.current = true;
                setHasReachedAbout(true);
                aboutStepRef.current = 1;
                setComicQuote(BATMAN_INTRO_QUOTE);
                setQuoteKey((k) => k + 1);
                setBubbleOpen(true);
              } else if (aboutStepRef.current === 1) {
                // Intro is active
              } else if (aboutStepRef.current === 2 && comicQuote === BATMAN_INTRO_QUOTE) {
                setComicQuote(LEETCODE_ROAST_QUOTE);
                setQuoteKey((k) => k + 1);
              } else {
                triggerReaction('scroll_section', { section: 'about' });
              }
            } else if (isFloating) {
              // Only react to new section when user has chosen to drag Batman along
              triggerReaction('scroll_section', { section: detected });
            }
          }
        }
      }
    };

    handleScrollAndCheck();
    window.addEventListener('scroll', handleScrollAndCheck, { passive: true });
    window.addEventListener('resize', handleScrollAndCheck, { passive: true });

    // Custom reaction listener (dispatched from 3D Lanyard Pass, Canvas, etc.)
    const handleBatmanReaction = (e) => {
      if (e?.detail?.type) {
        triggerReaction(e.detail.type, e.detail.payload);
      }
    };
    window.addEventListener('batman-reaction', handleBatmanReaction);

    const handleVisibilityChange = () => {
      if (!document.hidden && aboutStepRef.current >= 2) {
        triggerReaction('tab_switch');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleCopy = () => {
      if (aboutStepRef.current >= 2) {
        triggerReaction('copy_text');
      }
    };
    window.addEventListener('copy', handleCopy);

    let lenisUnsub = null;
    const attachLenis = () => {
      if (window.__lenis && !lenisUnsub) {
        window.__lenis.on('scroll', handleScrollAndCheck);
        lenisUnsub = () => {
          if (window.__lenis) window.__lenis.off('scroll', handleScrollAndCheck);
        };
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      const poll = setInterval(() => {
        if (attachLenis()) clearInterval(poll);
      }, 100);
      setTimeout(() => clearInterval(poll), 2000);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollAndCheck);
      window.removeEventListener('resize', handleScrollAndCheck);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('batman-reaction', handleBatmanReaction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('copy', handleCopy);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  const renderComicBubble = (floatingMode) => {
    if (!hasReachedAbout || !comicQuote) return null;

    const flipDown = floatingMode ? pos.y < 165 : false;
    const alignSide = floatingMode
      ? pos.x < 130
        ? 'left'
        : typeof window !== 'undefined' && pos.x > window.innerWidth - 300
          ? 'right'
          : 'center'
      : 'left';

    return (
      <>
        {bubbleOpen ? (
          <div
            className={`absolute z-40 ${
              flipDown ? 'top-full mt-2.5' : 'bottom-full mb-3'
            } ${
              alignSide === 'left'
                ? 'left-0 translate-x-0'
                : alignSide === 'right'
                  ? 'right-0 left-auto translate-x-0'
                  : 'left-1/2 -translate-x-1/2'
            } w-[205px] sm:w-[218px] md:w-[230px]`}
            style={{
              transformOrigin: flipDown ? 'top center' : 'bottom center',
            }}
          >
            <PixelSpeechBubble
              quoteKey={quoteKey}
              flipDown={flipDown}
              tailSide={alignSide}
              quote={comicQuote}
              onClose={() => setBubbleOpen(false)}
              autoAdvance={true}
              onAutoAdvance={handleAutoAdvance}
              onClick={handleBatmanClick}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          /* Small Comic Talk Badge if Closed */
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleBatmanClick}
            className={`absolute ${
              flipDown ? 'top-full mt-2' : '-top-7'
            } left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#FFE600] text-[#0A0D14] border-[1.5px] border-[#0A0D14] text-[10px] font-condensed font-black uppercase tracking-wider shadow-[2px_2px_0px_#0A0D14] hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center gap-1 select-none z-30 animate-bounce`}
            title="Open Batman's thought bubble 💭"
          >
            <span>💭</span>
            <span>BAT-TALK</span>
          </button>
        )}
      </>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-20 md:py-28 bg-white relative z-40 overflow-visible"
    >
      {/* Option 2: Retro CRT Raster-Scan & Terminal Digital Decode (Slow & Cinematic) */}
      <style>{`
        /* Comic Book Thought Bubble Pop Animation */
        @keyframes comic-bubble-pop {
          0% {
            opacity: 0;
            transform: scale(0.72) translateY(6px);
          }
          60% {
            opacity: 1;
            transform: scale(1.04) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-comic-bubble-pop {
          animation: comic-bubble-pop 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Title Terminal Materialize */
        @keyframes terminal-title-reveal {
          0% {
            opacity: 0;
            transform: translateY(12px);
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
          animation: terminal-title-reveal 1.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          will-change: transform, opacity, letter-spacing;
        }

        /* Blinking Terminal Cursor that fades out after 3 slow blinks */
        @keyframes terminal-cursor-blink {
          0%, 25%, 50%, 75% {
            opacity: 1;
          }
          12.5%, 37.5%, 62.5% {
            opacity: 0;
          }
          85%, 100% {
            opacity: 0;
          }
        }
        .animate-terminal-cursor {
          animation: terminal-cursor-blink 3.4s steps(1) 0.2s forwards;
        }

        /* CRT Raster Scanline Sweep unmasking the ASCII PC - relaxed 2.5s sweep */
        @keyframes crt-raster-unroll {
          0% {
            clip-path: inset(0 0 100% 0);
            opacity: 0.2;
            filter: brightness(1.6) contrast(1.15);
          }
          70% {
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
          animation: crt-raster-unroll 2.5s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
          will-change: clip-path, filter, opacity;
        }

        /* Electric blue raster beam that leads the unmasking scan */
        @keyframes crt-beam-sweep {
          0% {
            top: 0%;
            opacity: 1;
          }
          70% {
            top: 100%;
            opacity: 1;
          }
          88%, 100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-crt-beam {
          animation: crt-beam-sweep 2.5s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
          will-change: top, opacity;
        }

        /* Paragraph Digital Reveal */
        @keyframes terminal-block-fade {
          0% {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .animate-terminal-block {
          opacity: 0;
          animation: terminal-block-fade 1.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }

        /* Underline draw-in */
        @keyframes underline-draw {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .animate-underline-draw {
          transform-origin: left;
          animation: underline-draw 1.3s cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards;
        }
        /* Perpetual Zero-Gravity Ambient Floating for Vintage Workstation */
        @keyframes pc-gentle-bob {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.4deg);
          }
        }
        .animate-pc-float {
          animation: pc-gentle-bob 5.4s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes pc-ambient-pulse {
          0%, 100% {
            filter: drop-shadow(0 14px 28px rgba(0, 72, 222, 0.08));
          }
          50% {
            filter: drop-shadow(0 18px 36px rgba(0, 72, 222, 0.18));
          }
        }
        .animate-pc-ambient-glow {
          animation: pc-ambient-pulse 4.4s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header: Clear About Section Identification */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4.5">
            <h2 
              className={`text-4xl sm:text-5xl md:text-[52px] font-normal tracking-[-0.02em] text-slate-950 leading-[1.18] ${
                isVisible ? 'animate-terminal-title' : 'opacity-0'
              }`}
            >
              Ab<span className="font-pixel text-[#0048DE] inline-block text-[1.14em] relative -top-[0.10em] ml-[4px] mr-[2px] leading-none">o</span>ut <span className="text-[#0048DE]">me</span>
            </h2>
            <img 
              src="/Images/doodle-batman.png" 
              alt="Batman with coffee doodle" 
              className={`w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain select-none pointer-events-auto cursor-pointer -mt-2.5 sm:-mt-3.5 hover:scale-110 hover:rotate-[-4deg] transition-all duration-300 ease-out shrink-0 ${
                isVisible ? 'animate-terminal-title' : 'opacity-0'
              }`}
              style={{ animationDelay: '300ms' }}
              title="Fueled by coffee ☕"
            />
          </div>
          <p className="text-slate-500 text-sm sm:text-base font-normal mt-3 max-w-lg mx-auto">
            A quick glimpse into who I am, what I design, and how I build.
          </p>
        </div>

        {/* 3-Column Editorial Grid: Left Craft, Center Vintage Workstation, Right Velocity */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr_1fr] gap-10 md:gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Pratham Survase */}
          <div className="relative z-30 pt-4 border-t border-slate-200/90 max-w-[380px] mx-auto md:ml-0 md:mr-auto w-full font-sans">
            {/* Batman sleeping on couch - Natural resting state in About Me */}
            {!isFloating ? (
              <div 
                ref={anchorRef}
                onPointerDown={handlePointerDown}
                onMouseEnter={handleBatmanMouseEnter}
                onClick={handleBatmanClick}
                onDoubleClick={handleResetDoodle}
                data-cursor-label="DRAG ME 🛋️"
                className="absolute bottom-full left-0 pointer-events-auto select-none z-30 cursor-grab active:cursor-grabbing touch-none group/batman"
                title="Drag Batman anywhere! Hover or click to get a reaction 💬"
              >
                {renderComicBubble(false)}
                <img 
                  src="/Images/doodle-batman-couch.png" 
                  alt="Batman sleeping on couch doodle" 
                  draggable="false"
                  className="w-36 sm:w-40 md:w-44 h-auto object-contain select-none block translate-y-[2px] pointer-events-none drop-shadow-sm transition-transform duration-200 hover:scale-105 origin-bottom"
                />
              </div>
            ) : (
              /* Persistent placeholder holding anchor position */
              <div 
                ref={anchorRef} 
                className="absolute bottom-full left-0 w-36 sm:w-40 md:w-44 h-20 pointer-events-none" 
              />
            )}

            {/* Editorial Content that animates on scroll */}
            <div 
              className={isVisible ? 'animate-terminal-block' : 'opacity-0'}
              style={{ animationDelay: '750ms' }}
            >
              <h3 className="text-xl sm:text-[22px] font-normal text-slate-900 tracking-tight mb-2.5">
                Pratham Survase
              </h3>
              <p className="text-slate-600 text-[15px] sm:text-[15.5px] leading-[1.8] font-normal">
                I am a UI/UX designer with a background in Computer Science Engineering. Having both a technical foundation and an eye for design helps me create interfaces that are not only visually clean, but also practical, scalable, and easy to use across web and mobile platforms.
              </p>
            </div>
          </div>

          {/* Center Column: Vintage Computer with CRT Raster-Scanline Sweep (Visual Anchor) */}
          <div className="relative z-10 flex flex-col items-center justify-center py-2 md:py-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[430px] lg:max-w-[470px] animate-pc-float animate-pc-ambient-glow">
              
              {/* Hard-Coded Vintage PC ASCII Art */}
              <div className={`w-full flex items-center justify-center overflow-visible ${isVisible ? 'animate-crt-pc' : 'opacity-0'}`}>
                <VintagePcAscii />
              </div>

              {/* Glowing blue scanline raster beam */}
              {isVisible && (
                <div 
                  className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0048DE] to-transparent shadow-[0_0_8px_rgba(0,72,222,0.8)] pointer-events-none animate-crt-beam"
                />
              )}
            </div>
          </div>

          {/* Right Column: Skills & Technologies from Resume */}
          <div 
            className={`relative z-10 pt-4 border-t border-slate-200/90 max-w-[420px] mx-auto md:mr-0 md:ml-auto w-full font-sans ${
              isVisible ? 'animate-terminal-block' : 'opacity-0'
            }`}
            style={{ animationDelay: '1050ms' }}
          >
            <h3 className="text-xl sm:text-[22px] font-normal text-slate-900 tracking-tight mb-3">
              Skills &amp; Technologies
            </h3>
            
            <div className="space-y-3.5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Design &amp; Prototyping
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Figma', 'Illustrator', 'Photoshop', 'Canva', 'Design Systems', 'Wireframing'].map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50/90 border border-slate-200/80 text-[12px] text-slate-700 font-medium hover:border-slate-300 hover:bg-white transition-all shadow-2xs"
                    >
                      <SkillLogoBadge skill={skill} className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Web &amp; Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Webflow', 'Framer', 'Duda'].map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/70 border border-blue-200/60 text-[12px] text-[#0048DE] font-medium hover:bg-blue-50 hover:border-blue-300 transition-all shadow-2xs"
                    >
                      <SkillLogoBadge skill={skill} className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  AI &amp; Vibe Coding
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Antigravity', 'Claude Code', 'Cursor', 'Figma Make', 'Generative AI', 'Hostinger'].map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50/90 border border-slate-200/80 text-[12px] text-slate-700 font-medium hover:border-slate-300 hover:bg-white transition-all shadow-2xs"
                    >
                      <SkillLogoBadge skill={skill} className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Impact Highlights: Pure Swiss Hairline Architecture */}
        <div 
          className={`mt-16 md:mt-20 pt-8 border-t border-slate-200/90 max-w-3xl mx-auto ${
            isVisible ? 'animate-terminal-block' : 'opacity-0'
          }`}
          style={{ animationDelay: '1200ms' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-slate-200/90">
            
            <div className="text-center sm:px-6">
              <div className="text-2xl sm:text-3xl font-normal text-slate-950 tracking-tight">3+ Years</div>
              <div className="text-xs text-slate-500 font-normal mt-1.5">Hands-on Experience</div>
            </div>

            <div className="text-center sm:px-6">
              <div className="text-2xl sm:text-3xl font-normal text-slate-950 tracking-tight">15+</div>
              <div className="text-xs text-slate-500 font-normal mt-1.5">Projects Completed</div>
            </div>

            <div className="text-center sm:px-6">
              <div className="text-2xl sm:text-3xl font-normal text-[#0048DE] tracking-tight">200%</div>
              <div className="text-xs text-slate-500 font-normal mt-1.5">Confidence Until Client Screenshares</div>
            </div>

          </div>
        </div>

        {/* Minimal Action Link */}
        <div 
          className={`mt-12 text-center ${isVisible ? 'animate-terminal-block' : 'opacity-0'}`}
          style={{ animationDelay: '1350ms' }}
        >
          <button
            onClick={onLearnMoreClick}
            className="group inline-flex items-center gap-2 text-slate-900 hover:text-[#0048DE] text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>View Full Resume</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>

      {/* ============================================================== */}
      {/* Free-Roaming Portaled Screen Companion (Sticky to Viewport)   */}
      {/* ============================================================== */}
      {isFloating && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            zIndex: 99999,
            transform: isDragging ? 'scale(1.10) rotate(2deg)' : 'scale(1) rotate(0deg)',
            filter: isDragging 
              ? 'drop-shadow(0 24px 34px rgba(0, 0, 0, 0.40))' 
              : 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.24))',
            transition: isDragging ? 'transform 120ms ease-out, filter 120ms ease-out' : 'transform 200ms ease-out, filter 200ms ease-out',
          }}
          onPointerDown={handlePointerDown}
          onMouseEnter={handleBatmanMouseEnter}
          onClick={handleBatmanClick}
          onDoubleClick={handleResetDoodle}
          data-cursor-label={isDragging ? 'MOVING 😴' : 'DBL-CLICK RESET ↺'}
          className="pointer-events-auto select-none cursor-grab active:cursor-grabbing touch-none group/batman-floating will-change-transform"
          title="Drag Batman anywhere! Double-click to return home 🛋️"
        >
          {renderComicBubble(true)}

          <img 
            src="/Images/doodle-batman-couch.png" 
            alt="Batman sleeping on couch doodle" 
            draggable="false"
            className="w-36 sm:w-40 md:w-44 h-auto object-contain select-none block pointer-events-none"
          />

          {/* Floating Return Home Pill once moved */}
          {hasBeenMoved && !isDragging && (
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleResetDoodle}
              className={`absolute ${
                pos.y < 165 ? '-top-7' : '-bottom-8'
              } left-1/2 -translate-x-1/2 opacity-0 group-hover/batman-floating:opacity-100 transition-all duration-200 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-[#C3FF48] border border-slate-700 text-[10px] font-sans font-medium whitespace-nowrap shadow-lg hover:bg-slate-900 cursor-pointer flex items-center gap-1.5 backdrop-blur-xs select-none z-30`}
              title="Return Batman home"
            >
              <span>Reset position ↺</span>
            </button>
          )}
        </div>,
        document.body
      )}
    </section>
  );
}
