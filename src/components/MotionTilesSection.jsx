import React from 'react';
import MotionTiles from './MotionTiles';

export default function MotionTilesSection() {
  return (
    <section 
      id="live-websites" 
      data-section="websites"
      className="relative w-full bg-white border-t border-slate-100"
    >
      <div id="websites" className="absolute top-0 left-0 pointer-events-none" />
      <MotionTiles />
    </section>
  );
}

