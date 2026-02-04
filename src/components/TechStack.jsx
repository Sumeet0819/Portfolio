import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  RiJavascriptFill, 
  RiReactjsFill, 
  RiNodejsFill, 
  RiHtml5Fill, 
  RiCss3Fill, 
  RiTailwindCssFill,
  RiGitBranchFill,
  RiDatabase2Fill,
  RiTerminalBoxFill
} from 'react-icons/ri'
import { 
  SiTypescript, 
  SiPython, 
  SiMongodb, 
  SiPostgresql, 
  SiRedux, 
  SiOdoo 
} from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const TECH_SKILLS = [
  { name: 'JavaScript', color: '#F7DF1E', icon: RiJavascriptFill },
  { name: 'TypeScript', color: '#3178C6', icon: SiTypescript },
  { name: 'React', color: '#61DAFB', icon: RiReactjsFill },
  { name: 'Node.js', color: '#339933', icon: RiNodejsFill },
  { name: 'HTML5', color: '#E34F26', icon: RiHtml5Fill },
  { name: 'CSS3', color: '#1572B6', icon: RiCss3Fill },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: RiTailwindCssFill },
  { name: 'Python', color: '#3776AB', icon: SiPython },
  { name: 'MongoDB', color: '#47A248', icon: SiMongodb },
  { name: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql },
  { name: 'Git', color: '#F05032', icon: RiGitBranchFill },
  { name: 'Redux', color: '#764ABC', icon: SiRedux },
  { name: 'Linux', color: '#FCC624', icon: RiTerminalBoxFill },
  { name: 'Odoo', color: '#7C70FF', icon: SiOdoo },
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

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20 lg:mb-24 relative z-10 text-center">
        <h2 className="tech-header-text text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
          <span className="block text-white/50 text-sm md:text-base lg:text-lg font-medium tracking-[0.3em] uppercase mb-3 md:mb-4">Tech Stack</span>
          <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Tools I Master
          </span>
        </h2>
        <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto mt-4">
          A curated collection of technologies I use to build exceptional digital experiences
        </p>
      </div>

      <div className="space-y-8 md:space-y-12 relative z-10">
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
      className="relative w-full overflow-hidden py-4" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={rowRef}
        className="flex w-max py-2"
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="content flex px-2 md:px-4">
            {skills.map((skill, idx) => (
              <SkillItem key={`${i}-${idx}`} skill={skill} />
            ))}
          </div>
        ))}
      </div>
      
       {/* Enhanced Fade Edges with Gradient */}
       <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />
       <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />
    </div>
  )
}

const SkillItem = ({ skill }) => {
  const Icon = skill.icon
  
  return (
    <div className="group relative mx-2 md:mx-3 lg:mx-4">
      <div 
        className="relative px-4 py-2.5 md:px-5 lg:px-6 md:py-3 lg:py-3.5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2.5 md:gap-3 lg:gap-4 transition-all duration-300 ease-out group-hover:border-white/30 group-hover:-translate-y-1 group-hover:bg-white/10"
      >
         {/* Icon */}
         <Icon 
           className="w-5 h-5 md:w-6 lg:w-7 md:h-6 lg:h-7 transition-all duration-300 ease-out" 
           style={{ color: skill.color }}
         />
         
         <span className="text-sm md:text-base lg:text-lg text-white/70 font-medium tracking-wide group-hover:text-white transition-all duration-300 ease-out">
           {skill.name}
         </span>
      </div>
    </div>
  )
}

export default TechStack
