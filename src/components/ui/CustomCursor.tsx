/* eslint-disable */
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  // Springs for smooth animations
  const cursorSpring = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const ringSpringX = useSpring(ringX, { stiffness: 150, damping: 15, mass: 0.1 });
  const ringSpringY = useSpring(ringY, { stiffness: 150, damping: 15, mass: 0.1 });

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      setIsMobile(isTouch || isSmallScreen || hasCoarsePointer);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle cursor visibility and movement
  useEffect(() => {
    if (isMobile) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX -8);
      cursorY.set(e.clientY -8);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Enhanced hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('img, span, button, a, input, textarea, [role="button"], .interactive, .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  // Return null for mobile, but ensure all hooks are called
  if (isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{ 
              x: cursorSpring, 
              y: cursorYSpring 
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isHovering ? 3 : 1,
              transition: { duration: 0.2 }
            }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50" />
          </motion.div>

          {/* Outer ring */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{ 
              x: ringSpringX, 
              y: ringSpringY 
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isHovering ? 2 : 1.2,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="w-8 h-8 rounded-full border border-primary/30" />
          </motion.div>

          {/* Glow effect */}
          {/* <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{ 
              x: ringSpringX, 
              y: ringSpringY 
            }}
            animate={{ 
              scale: isHovering ? 3 : 0,
              opacity: isHovering ? 0.1 : 0,
              transition: { duration: 0.3 }
            }}
          >
            <div className="w-8 h-8 rounded-full" />
          </motion.div> */}
        </>
      )}
    </AnimatePresence>
  );
};
