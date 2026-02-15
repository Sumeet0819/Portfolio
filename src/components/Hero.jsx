import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import MatrixText from './MatrixText'

const Hero = () => {
  const [currentTime, setCurrentTime] = useState('')
  const nameRef = useRef(null)
  const infoRef = useRef(null)

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
      setCurrentTime(timeString)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Entrance animations - timeline
  useGSAP(() => {
    const words = nameRef.current.querySelectorAll('.word')
    
    // Set initial states - hide everything
    gsap.set(words, {
      opacity: 0,
      y: 100
    })
    
    gsap.set(infoRef.current, {
      opacity: 0,
      y: 60
    })
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Animate name words with stagger
    tl.to(words, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      delay: 2.5  // 2s delay + 0.5s original delay
    })
    
    // Animate info panel from bottom
    .to(infoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.4')
  }, [])

  return (
    <div className="relative min-h-screen text-white pt-35 pb-12 md:pb-24 px-6 md:px-12 overflow-hidden flex flex-col justify-end">
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80 scale-150 header-video"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Optional Overlay if video is too bright, or to blend with theme */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0A0A0A]/50 z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full">
        {/* Top Section with Name and Labels */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0">
          {/* Large Name */}
          <div className="flex-1" ref={nameRef} style={{ perspective: '1000px' }}>
            <h1 
              className="font-regular leading-[0.85] tracking-tight overflow-hidden"
              style={{ fontSize: 'clamp(2.5rem, 14vw, 14rem)' }}
            >
              <div className="word inline-block">
                <MatrixText>SUMEET</MatrixText>
              </div>
              <br />
              <div className="word inline-block">
                <MatrixText>TOKARE</MatrixText>
              </div>
            </h1>
          </div>

          {/* Right Side Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-start sm:justify-end gap-4 text-left sm:text-right w-full md:w-auto" ref={infoRef}>
            {/* Role */}
            <div 
              className="text-white/60 font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase"
              style={{ fontSize: 'clamp(0.55rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
               <span className='text-red-500'>[ </span><MatrixText>Frontend Developer</MatrixText> <span className='text-red-500'>]</span>
            </div>
            
            {/* Time & Timezone */}
            <div className="flex flex-col items-start sm:items-end gap-1">
              <div 
                className="text-white font-light tracking-wider"
                style={{ fontSize: 'clamp(0.6rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
              >
                {currentTime}
              </div>
              <div 
                className="text-white/40 font-light tracking-[0.2em] uppercase"
                style={{ fontSize: 'clamp(0.6rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
              >
                IST (GMT+5:30)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
