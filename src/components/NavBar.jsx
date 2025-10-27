import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const underlineVariants = {
  initial: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.28, ease: 'easeOut' } }
};

export default function NavBar() {
  return (
    <nav className="w-full h-[10vh] flex items-start px-6 py-5 mb-[2rem]">
      <div className="flex flex-col">
        <span className="text-5xl font-semibold leading-tight uppercase">Sumeet</span>
        <span className="text-5xl font-semibold leading-tight uppercase">Tokare</span>
      </div>

      <div className="flex-1 flex flex-col items-end space-y-2 uppercase font-bold text-[0.7rem]">
        
        {/* Resume Download: Kept as <a> */}
        <motion.a
          href="/resume.pdf"
          className="relative inline-block px-1"
          initial="initial"
          whileHover="hover"
        >
          <span>Download Resume</span>
          <motion.span
            className="absolute left-0 -bottom-1 h-[2px] bg-black w-full"
            variants={underlineVariants}
            style={{ transformOrigin: 'left' }}
          />
        </motion.a>

        {/* Email: external link stays <a> */}
        <motion.a
          href="mailto:sumeettokre19@gmail.com"
          className="relative inline-block px-1"
          initial="initial"
          whileHover="hover"
        >
          <span>sumeettokre19@gmail.com</span>
          <motion.span
            className="absolute left-0 -bottom-1 h-[2px] bg-black w-full"
            variants={underlineVariants}
            style={{ transformOrigin: 'left' }}
          />
        </motion.a>

        {/* About Page: React Router link */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="relative inline-block px-1"
        >
          <Link to="/about">
            <span>About</span>
          </Link>
          <motion.span
            className="absolute left-0 -bottom-1 h-[2px] bg-black w-full"
            variants={underlineVariants}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

      </div>
    </nav>
  );
}
