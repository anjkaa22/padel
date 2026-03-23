import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cursor = cursorRef.current;
    const text = textRef.current;
    const ball = ballRef.current;

    if (!cursor || !text || !ball || isMobile) {
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }

    // Set initial position off-screen
    gsap.set(cursor, { x: -100, y: -100 });

    // Use quickSetter for high-performance updates
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.magnetic')) {
        setIsHovering(true);
        gsap.to(ball, {
          scale: 3,
          duration: 0.3,
          ease: 'back.out(1.5)',
        });
        if (target.closest('.view-project')) {
          gsap.to(text, { opacity: 1, duration: 0.2 });
        }
      } else {
        setIsHovering(false);
        gsap.to(ball, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
    >
      <div 
        ref={ballRef}
        className="w-5 h-5 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.4)] relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: '#ccff00' }}
      >
        {/* Padel ball curved lines */}
        <div className="absolute top-[-4px] left-[-4px] w-6 h-6 border-[1.5px] border-white/60 rounded-full" />
        <div className="absolute bottom-[-4px] right-[-4px] w-6 h-6 border-[1.5px] border-white/60 rounded-full" />
        
        <div ref={textRef} className="absolute opacity-0 text-[5px] font-black text-black uppercase tracking-widest text-center leading-none z-10">
          View
        </div>
      </div>
    </div>
  );
};
