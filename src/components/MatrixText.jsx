import React, { useState, useEffect, useRef } from 'react';

const MatrixText = ({ 
  children, 
  className = '',
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  glitchDuration = 800
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(children);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
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
        }
      }, speed);

      // Auto-reset after duration
      timeoutRef.current = setTimeout(() => {
        setDisplayText(originalText);
      }, glitchDuration);
    } else {
      setDisplayText(children);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, children, speed, characters, glitchDuration]);

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
