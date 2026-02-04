import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ProjectCard from './ProjectCard'
import MatrixText from './MatrixText'

const Hero = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentTime, setCurrentTime] = useState('')
  const nameRef = useRef(null)
  const infoRef = useRef(null)
  const gridRef = useRef(null)

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
    const projectCards = gridRef.current.children
    
    // Set initial states - hide everything
    gsap.set(words, {
      opacity: 0,
      y: 100
    })
    
    gsap.set(infoRef.current, {
      opacity: 0,
      y: 60
    })

    gsap.fromTo(projectCards, 
      {
        opacity: 0,
        y: 400
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        stagger: 0.2,
        ease: 'power3.out'
      }
    )
    
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

  const projects = [
    {
      id: 1,
      title: 'V4',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      category: 'Branding'
    },
    {
      id: 2,
      title: 'Live Longer, Better',
      image: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 3,
      title: 'ATLAS',
      image: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=300&fit=crop',
      category: 'Product Design'
    },
    {
      id: 4,
      title: 'Portfolio',
      image: 'https://images.unsplash.com/photo-1618556450783-a4f8e6b0c3f1?w=400&h=300&fit=crop',
      category: 'Development'
    },
    {
      id: 5,
      title: 'Live Performance',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop',
      category: 'Photography'
    }
  ]

  return (
    <div className="min-h-screen text-white pt-32 pb-16 px-6 md:px-12" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Hero Content */}
      <div className="flex-1">
        {/* Top Section with Name and Labels */}
        <div className="flex items-end justify-between mb-32 md:mb-45 lg:mb-50">
          {/* Large Name */}
          <div className="flex-1" ref={nameRef} style={{ perspective: '1000px' }}>
            <h1 
              className="font-regular leading-[0.85] tracking-tight overflow-hidden"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
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
          <div className="flex flex-row items-end justify-end gap-4 text-right" ref={infoRef}>
            {/* Role */}
            <div 
              className="text-white/60 font-light tracking-[0.3em] uppercase"
              style={{ fontSize: 'clamp(0.6rem, calc((0.7 - (0.6 - 0.7) / (90 - 20) * 20) * 1rem + (0.6 - 0.7) / (90 - 20) * 100vw), 0.7rem)' }}
            >
               <span className='text-red-500'>[ </span><MatrixText>Frontend Developer</MatrixText> <span className='text-red-500'>]</span>
            </div>
            
            {/* Time & Timezone */}
            <div className="flex flex-col items-end gap-1">
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

        {/* Project Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 overflow-hidden" ref={gridRef}>
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              isHovered={hoveredCard === project.id}
              isOtherHovered={hoveredCard !== null && hoveredCard !== project.id}
              onHover={() => setHoveredCard(project.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div> */}
    </div>
  )
}

export default Hero
