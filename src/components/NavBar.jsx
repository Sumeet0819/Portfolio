import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const NavBar = () => {
  const navRef = useRef(null)
  const brandRef = useRef(null)
  const centerNavRef = useRef(null)
  const rightNavRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(mobileMenuRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power3.out',
        display: 'flex'
      })
      gsap.fromTo('.mobile-nav-link', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(mobileMenuRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.in',
        display: 'none'
      })
    }
  }, [isMenuOpen])

  // Initial entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Animate brand
    tl.from(brandRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      clearProps: 'all'
    })
    
    // Animate center nav (desktop only)
    tl.from(centerNavRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.6')
    
    // Animate right nav items
    tl.from(rightNavRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.6')
  }, [])

  // Scroll-triggered animations for nav items (Desktop)
  useGSAP(() => {
    const navItems = navRef.current.querySelectorAll('.nav-item')
    
    navItems.forEach((item) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top-=20',
          end: 'top top-=21',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.to(item, {
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              duration: 0.5,
              ease: 'power2.out'
            })
          },
          onLeaveBack: () => {
            gsap.to(item, {
              backdropFilter: 'blur(0px)',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              borderColor: 'rgba(255, 255, 255, 0)',
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        }
      })
    })
  }, [])

  return (
    <>
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand */}
          <div className="flex-1 flex items-center gap-3" ref={brandRef}>
            <Link 
              to="/" 
              className="nav-item text-white font-light tracking-[0.15em] md:tracking-[0.2em] uppercase hover:text-white/70 hover:backdrop-blur-md hover:bg-white/5 hover:border-white/10 transition-all duration-500 px-3 md:px-4 py-2 inline-flex items-center gap-2 border border-transparent rounded-full"
              style={{ fontSize: 'clamp(0.55rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
              <img src="/favicon.ico" alt="Logo" className="w-4 h-4" />
              <span className="hidden sm:inline">Sumeet Tokare</span>
              <div className="relative flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex flex-1 justify-center" ref={centerNavRef}>
            <a 
              href="#work" 
              className="nav-item relative text-white font-light tracking-[0.15em] uppercase group px-4 py-2 hover:backdrop-blur-md hover:bg-white/5 hover:border-white/10 transition-all duration-500 border border-transparent rounded-full"
              style={{ fontSize: 'clamp(0.6rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
              <span className="relative z-10">Work</span>
            </a>
          </div>

          {/* Right Navigation */}
          <div className="flex-1 flex justify-end items-center gap-2 md:gap-3 lg:gap-4" ref={rightNavRef}>
             {/* Desktop About Link */}
            <Link 
              to="/about" 
              className="hidden md:inline-flex nav-item relative text-white font-light tracking-[0.1em] md:tracking-[0.15em] uppercase group px-3 md:px-4 py-2 hover:backdrop-blur-md hover:bg-white/5 hover:border-white/10 transition-all duration-500 border border-transparent rounded-full"
              style={{ fontSize: 'clamp(0.55rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
              <span className="relative z-10">About</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
                onClick={toggleMenu}
                className="md:hidden text-white p-2 z-50 relative focus:outline-none"
            >
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Fullscreen Menu */}
    <div 
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#0A0A0A] z-40 hidden flex-col justify-center items-center text-white"
    >
        <div className="flex flex-col gap-8 text-center">
            <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="mobile-nav-link text-4xl font-light tracking-widest uppercase hover:text-white/70 transition-colors"
            >
                Home
            </Link>
            <a 
                href="#work" 
                onClick={() => setIsMenuOpen(false)}
                className="mobile-nav-link text-4xl font-light tracking-widest uppercase hover:text-white/70 transition-colors"
            >
                Work
            </a>
            <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="mobile-nav-link text-4xl font-light tracking-widest uppercase hover:text-white/70 transition-colors"
            >
                About
            </Link>
        </div>
    </div>
    </>
  )
}

export default NavBar