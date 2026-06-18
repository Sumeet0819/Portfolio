import React, { useState, useEffect, useRef } from 'react';

const MatrixText = ({ 
  children, 
  className = '',
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  glitchDuration = 800
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [displayText, setDisplayText] = useState(children);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsAnimating(true);
  }, [children]);

  useEffect(() => {
    if (isHovered || isAnimating) {
      const originalText = children;
      const textLength = originalText.length;
      let iterations = 0;

      // Clear any existing intervals
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Matrix glitch effect
      intervalRef.current = setInterval(() => {
        setDisplayText(
          originalText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              
              if (index < iterations) {
                return originalText[index];
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iterations += 1 / 3;

        if (iterations >= textLength) {
          clearInterval(intervalRef.current);
          setDisplayText(originalText);
          setIsAnimating(false);
        }
      }, speed);

      // Auto-reset after duration
      timeoutRef.current = setTimeout(() => {
        setDisplayText(originalText);
        setIsAnimating(false);
      }, glitchDuration);
    } else {
      setDisplayText(children);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, isAnimating, children, speed, characters, glitchDuration]);

  return (
    <span
      className={`relative inline-block cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

export default MatrixText;
