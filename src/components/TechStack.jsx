import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Icons (Simple Paths) ---
const getIcon = (name) => {
  switch (name) {
    case 'JavaScript': return <path d="M10.5 4h3c2.5 0 4.5 2 4.5 4.5v7c0 2.5-2 4.5-4.5 4.5h-3c-2.5 0-4.5-2-4.5-4.5v-7C6 6 8 4 10.5 4z M13 14h-2v2h2v-2z" />;
    case 'TypeScript': return <path d="M4 4h16v16H4V4z M14 14h-2v2h2v-2z" />; 
    case 'React': return <g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2.5"/><path d="M12 21.5c4.1 0 7.5-3.5 8.5-6.5C21.5 12 18 8.5 12 8.5S2.5 12 2.5 15c1 3 4.4 6.5 8.5 6.5z" transform="rotate(60 12 12)"/><path d="M12 2.5c-4.1 0-7.5 3.5-8.5 6.5C2.5 12 6 15.5 12 15.5s9.5-3.5 9.5-6.5c-1-3-4.4-6.5-8.5-6.5z" transform="rotate(60 12 12)"/></g>;
    case 'Node.js': return <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2l6 3.5v7L12 18l-6-3.5v-7L12 4z" />;
    case 'HTML5': return <path d="M4 2l2 18 6 2 6-2 2-18H4zm12 16l-4 1.5L8 18l-1-11h10l-1 11z" />;
    case 'CSS3': return <path d="M4 2l2 18 6 2 6-2 2-18H4zm12 16l-4 1.5L8 18l-1-11h10l-1 11z" />;
    case 'Tailwind CSS': return <path d="M6 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5zm1 0c0 2 1.5 3 4 3s4-1 4-3-1.5-3-4-3-4 1-4 3z" />;
    case 'Python': return <path d="M12 2c-3 0-5 2-5 5v2h2V7c0-2 1.5-3 3-3s3 1 3 3v2h2V7c0-3-2-5-5-5zM7 12v2c0 3 2 5 5 5s5-2 5-5v-2h-2v2c0 2-1.5 3-3 3s-3-1-3-3v-2H7z" />;
    case 'MongoDB': return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M12 6v12" />; 
    case 'PostgreSQL': return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v-4h-2v4zm0-6h2V8h-2v2z" />; 
    case 'Git': return <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z M12 8a2 2 0 100 4 2 2 0 000-4z" />;
    case 'Redux': return <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 16a6 6 0 110-12 6 6 0 010 12z" />;
    case 'Linux': return <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />;
    case 'Odoo': return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />; // Simplified 'O'
    default: return <circle cx="12" cy="12" r="8" />;
  }
}

const TECH_SKILLS = [
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#339933' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Python', color: '#3776AB' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Git', color: '#F05032' },
  { name: 'Redux', color: '#764ABC' },
  { name: 'Linux', color: '#FCC624' },
  { name: 'Odoo', color: '#7C70FF' },
]

const TechStack = () => {
  const containerRef = useRef(null)
  
  // Divide skills into 2 rows
  const midPoint = Math.ceil(TECH_SKILLS.length / 2)
  const row1 = TECH_SKILLS.slice(0, midPoint)
  const row2 = TECH_SKILLS.slice(midPoint)

  useGSAP(() => {
    // Reveal Header
    gsap.fromTo('.tech-header-text',
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )

    // Entrance: Slide rows in from sides
    gsap.fromTo('.marquee-row-left',
       { x: -100, opacity: 0 },
       { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out', 
         scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } 
       }
    )
    gsap.fromTo('.marquee-row-right',
       { x: 100, opacity: 0 },
       { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2,
         scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } 
       }
    )

    // Background Gradient Pulse
    gsap.to('.tech-bg-gradient', {
      opacity: 0.6,
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full py-32 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="tech-bg-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-700/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 relative z-10 text-center">
        <h2 className="tech-header-text text-white text-4xl md:text-6xl font-light tracking-tighter mb-6">
          <span className="block text-white/40 text-lg md:text-xl font-normal tracking-widest uppercase mb-4">Innovation & Code</span>
          My Arsenal
        </h2>
      </div>

      <div className="space-y-12 relative z-10 -rotate-2">
         {/* Row 1 - Left to Right */}
         <div className="marquee-row-left">
            <MarqueeRow skills={row1} speed={40} direction="left" />
         </div>
         
         {/* Row 2 - Right to Left */}
         <div className="marquee-row-right">
            <MarqueeRow skills={row2} speed={35} direction="right" />
         </div>
      </div>
    </div>
  )
}

const MarqueeRow = ({ skills, speed, direction }) => {
  const rowRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const tweenRef = useRef(null)

  useGSAP(() => {
    const el = rowRef.current
    const content = el.querySelector('.content')
    const width = content.offsetWidth
    
    // Set initial position
    if (direction === 'right') {
      gsap.set(el, { x: -width / 2 })
    }

    const toVal = direction === 'left' ? -width / 2 : 0
    const fromVal = direction === 'left' ? 0 : -width / 2

    tweenRef.current = gsap.fromTo(el, 
      { x: fromVal },
      { 
        x: toVal,
        duration: speed, 
        ease: 'none', 
        repeat: -1 
      }
    )

    // Scroll Velocity Effect: Speed up on scroll
    ScrollTrigger.create({
      trigger: document.body,
      onUpdate: (self) => {
         if (!tweenRef.current) return;
         // Calculate velocity factor (1 = normal, higher = faster)
         const velocity = Math.abs(self.getVelocity())
         const timeScale = 1 + (velocity / 2000) // gentle speed up
         
         // Only apply if not hovered
         if (!isHovered) {
            gsap.to(tweenRef.current, { timeScale: timeScale, duration: 0.1, overwrite: true })
            // Return to normal speed after scroll stops
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, delay: 0.1 })
         }
      }
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [speed, direction]) 

  // Handle Hover Pause
  useGSAP(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: isHovered ? 0.2 : 1, 
        duration: 0.5
      })
    }
  }, [isHovered])

  return (
    <div 
      className="relative w-full overflow-hidden" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={rowRef}
        className="flex w-max"
      >
        {/* Render 8 sets to ensure seamless infinite loop for small lists */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="content flex px-4">
            {skills.map((skill, idx) => (
              <SkillItem key={`${i}-${idx}`} skill={skill} />
            ))}
          </div>
        ))}
      </div>
      
       {/* Fade Edges */}
       <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
       <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
    </div>
  )
}

const SkillItem = ({ skill }) => (
  <div className="group relative mx-3 md:mx-6">
    <div 
      className="relative px-8 py-4 bg-[#111] border border-white/10 rounded-2xl flex items-center gap-4 transition-all duration-300 group-hover:border-white/30 group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)]"
    >
       {/* Icon */}
       <div className="w-8 h-8 flex items-center justify-center">
         <svg 
           viewBox="0 0 24 24" 
           fill="currentColor" 
           className="w-full h-full transition-colors duration-300"
           style={{ color: skill.color }}
         >
           {getIcon(skill.name)}
         </svg>
       </div>
       
       <span className="text-xl text-zinc-400 font-light tracking-wide group-hover:text-white transition-colors">
         {skill.name}
       </span>
    </div>
  </div>
)

export default TechStack
