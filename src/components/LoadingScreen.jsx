import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          // Call onComplete after a short delay to show 100%
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        // Increment by random amount for more realistic loading
        const increment = Math.random() * 12 + 3;
        return Math.min(prevProgress + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl px-8">
        {/* Progress Bar Container */}
        <div className="relative">
          {/* Background line - full width from left to right corner */}
          <div className="w-full h-0.5 bg-gray-200">
            {/* Progress line */}
            <motion.div
              className="h-full bg-black origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
          
          {/* Percentage text */}
          <motion.div
            className="absolute top-6 left-0 text-black text-sm font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;