import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      // Direct positioning for the main dot for instant response
      gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
      
      // Smooth following for the outer ring
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    const onMouseDown = () => {
        gsap.to([cursorRef.current, followerRef.current], { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
        // We use a ref or simple check, but since 'hovered' is state, be careful. 
        // For simplicity, just reset to 1 or active scale.
        gsap.to([cursorRef.current, followerRef.current], { scale: 1, duration: 0.1 }); 
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      document.documentElement.style.cursor = 'auto'; // Restore
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Separate effect for hover listeners to handle DOM changes
  useEffect(() => {
    const addListeners = () => {
        const hoverables = document.querySelectorAll('a, button, .cursor-pointer, input, textarea, [data-cursor-text]');
        
        hoverables.forEach((el) => {
            // Remove old listeners first to avoid duplication if re-run
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mouseleave', onMouseLeave);
            
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });
    };

    const onMouseEnter = (e) => {
        setHovered(true);
        const el = e.currentTarget;
        const customText = el.getAttribute('data-cursor-text');
        if (customText) setText(customText);
        
        gsap.to(followerRef.current, { 
            scale: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderColor: 'transparent', 
            mixBlendMode: 'difference' 
        });
        gsap.to(cursorRef.current, { opacity: 0 }); 
    };

    const onMouseLeave = () => {
        setHovered(false);
        setText('');
        
        gsap.to(followerRef.current, { 
            scale: 1, 
            backgroundColor: 'transparent', 
            borderColor: 'white', 
            mixBlendMode: 'normal' 
        });
        gsap.to(cursorRef.current, { opacity: 1 }); 
    };

    // Initial load
    addListeners();

    // Observer for dynamic content
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
        const hoverables = document.querySelectorAll('a, button, .cursor-pointer, input, textarea, [data-cursor-text]');
         hoverables.forEach((el) => {
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mouseleave', onMouseLeave);
        });
        observer.disconnect();
    };
  }, []); // Run once on mount to set up observer

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      
      {/* Follower Ring */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-300"
      >
          {text && (
              <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest whitespace-nowrap absolute">
                  {text}
              </span>
          )}
      </div>
    </>
  );
};

export default CustomCursor;
