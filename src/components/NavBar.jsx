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
    
    // Animate center nav
    tl.from(centerNavRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.6')
    
    // Animate right nav items (same as brand)
    tl.from(rightNavRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.6')
  }, [])

  // Scroll-triggered animations for nav items
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
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-[1400px] px-4 md:px-6 lg:px-12">
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

          {/* Center Navigation - Hidden on mobile */}
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
            <Link 
              to="/about" 
              className="nav-item relative text-white font-light tracking-[0.1em] md:tracking-[0.15em] uppercase group px-3 md:px-4 py-2 hover:backdrop-blur-md hover:bg-white/5 hover:border-white/10 transition-all duration-500 border border-transparent rounded-full"
              style={{ fontSize: 'clamp(0.55rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
              <span className="relative z-10">About</span>
            </Link>
            <a 
              href="#feed" 
              className="hidden sm:inline-flex nav-item relative text-white font-light tracking-[0.1em] md:tracking-[0.15em] uppercase group px-3 md:px-4 py-2 hover:backdrop-blur-md hover:bg-white/5 hover:border-white/10 transition-all duration-500 border border-transparent rounded-full"
              style={{ fontSize: 'clamp(0.55rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
              <span className="relative z-10">Feed</span>
            </a>
            <a 
              href="#archive" 
              className="hidden sm:inline-flex nav-item relative text-white font-light tracking-[0.1em] md:tracking-[0.15em] uppercase group px-3 md:px-4 py-2 hover:backdrop-blur-md hover:bg-white/5 hover:border-white/10 transition-all duration-500 border border-transparent rounded-full"
              style={{ fontSize: 'clamp(0.55rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
              <span className="relative z-10">Archive</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar