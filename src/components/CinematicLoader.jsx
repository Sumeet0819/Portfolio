import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CinematicLoader = ({ onComplete }) => {
  const leftDoorRef = useRef(null)
  const rightDoorRef = useRef(null)
  const loaderRef = useRef(null)
  const timelineRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    timelineRef.current = tl

    // Initial state - doors closed
    tl.set([leftDoorRef.current, rightDoorRef.current], {
      rotationY: 0
    })

    // Hold for a moment
    tl.to({}, { duration: 1 })

    // Open doors with 3D rotation
    tl.to(leftDoorRef.current, {
      rotationY: -90,
      x: '-50%',
      duration: 2,
      ease: 'power4.inOut'
    })
    .to(rightDoorRef.current, {
      rotationY: 90,
      x: '50%',
      duration: 2,
      ease: 'power4.inOut'
    }, '<')

    // Fade out the entire loader
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4')

  }, [onComplete])

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999]"
      style={{ perspective: '2000px' }}
    >
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black flex items-center justify-end pr-4 md:pr-8 lg:pr-12"
        style={{ 
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Logo/text on left door */}
        <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40">
          SUMEET
        </div>
      </div>

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black flex items-center justify-start pl-4 md:pl-8 lg:pl-12"
        style={{ 
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Logo/text on right door */}
        <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40">
          TOKARE
        </div>
      </div>

      {/* Noise Texture Overlay on doors */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'url(/noise.png)',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  )
}

export default CinematicLoader
