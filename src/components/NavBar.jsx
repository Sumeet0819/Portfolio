import React, { useState, useEffect } from 'react'

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px]  px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand */}
          <div className="flex-1">
            <a 
              href="#" 
              className="text-white font-light tracking-[0.2em] uppercase hover:text-white/70 transition-colors duration-300"
              style={{ fontSize: 'clamp(0.7rem, calc((0.8 - (0.7 - 0.8) / (90 - 20) * 20) * 1rem + (0.7 - 0.8) / (90 - 20) * 100vw), 0.8rem)' }}
            >
             Sumeet Tokare
            </a>
          </div>

          {/* Center Navigation */}
          <div className="flex-1 flex justify-center">
            <a 
              href="#work" 
              className="relative text-white font-light tracking-[0.15em] uppercase group"
              style={{ fontSize: 'clamp(0.7rem, calc((0.8 - (0.7 - 0.8) / (90 - 20) * 20) * 1rem + (0.7 - 0.8) / (90 - 20) * 100vw), 0.8rem)' }}
            >
              <span className="relative z-10">Work</span>
              <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
            </a>
          </div>

          {/* Right Navigation */}
          <div className="flex-1 flex justify-end items-center gap-6 md:gap-10">
            <a 
              href="#feed" 
              className="relative text-white font-light tracking-[0.15em] uppercase group"
              style={{ fontSize: 'clamp(0.7rem, calc((0.8 - (0.7 - 0.8) / (90 - 20) * 20) * 1rem + (0.7 - 0.8) / (90 - 20) * 100vw), 0.8rem)' }}
            >
              <span className="relative z-10">Feed</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
            </a>
            <a 
              href="#archive" 
              className="relative text-white font-light tracking-[0.15em] uppercase group"
              style={{ fontSize: 'clamp(0.7rem, calc((0.8 - (0.7 - 0.8) / (90 - 20) * 20) * 1rem + (0.7 - 0.8) / (90 - 20) * 100vw), 0.8rem)' }}
            >
              <span className="relative z-10">Archive</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar