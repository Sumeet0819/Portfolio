import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EDUCATION_DATA = [
  {
    id: 1,
    year: '2022 - 2026',
    degree: 'Bachelor of Technology',
    institution: 'Government College of Engineering and Technology, Modasa',
    description: 'Computer Science and Engineering. Focusing on Full Stack Development, Data Structures, and Algorithms.',
    grade: 'CGPA: 7.98/10'
  },
  {
    id: 4,
    year: '2019 - 2022',
    degree: 'Diploma of Computer Engineering',
    institution: 'Prime College of Diploma, Navsari',
    description: 'Specialized in Computer Engineering fundamentals, Electronics, and Programming basics.',
    grade: 'CGPA: 9.0/10'
  },
  {
    id: 2,
    year: '2020 - 2022',
    degree: 'Higher Secondary Education',
    institution: 'Government High School, Silvassa',
    description: 'Specialized in Science with Mathematics and Computer Science.',
    grade: 'Percentage: 56%'
  },
  {
    id: 3,
    year: '2019 - 2020',
    degree: 'Secondary Education',
    institution: 'Gyanmata English High School, Khanvel',
    description: 'Foundation in Science, Mathematics, and Computer Applications.',
    grade: 'Percentage: 63%'
  }
]

const EducationTimeline = () => {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Header animation
    tl.fromTo('.education-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Line drawing animation
    tl.fromTo(lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.5, ease: 'power3.inOut', transformOrigin: 'top' },
      '-=0.4'
    )

    // Items animation
    const items = gsap.utils.toArray('.timeline-item')
    items.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full py-24 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="education-header mb-12 md:mb-16 lg:mb-24">
          <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Education
          </h2>
          <div className="h-1 w-20 bg-white/20 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div 
            ref={lineRef}
            className="absolute left-[20px] md:left-1/2 top-4 bottom-0 w-0.5 bg-gradient-to-b from-white/10 via-white/20 to-transparent -translate-x-1/2"
          />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {EDUCATION_DATA.map((item, index) => (
              <div 
                key={item.id} 
                className={`timeline-item relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/30 z-10 mt-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <div className="w-full h-full rounded-full bg-white animate-pulse opacity-50" />
                </div>

                {/* Spacer for proper alignment in grid */}
                <div className="hidden md:block w-1/2" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                }`}>
                  <div className="group relative">
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    
                    {/* Card Content */}
                    <div className="relative p-4 md:p-6 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors duration-300">
                      <span className="text-white/40 text-sm font-mono tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="text-white text-xl md:text-2xl font-light mt-2 mb-1">
                        {item.degree}
                      </h3>
                      <div className="text-white/70 font-medium text-sm mb-4">
                        {item.institution}
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      {item.grade && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-white/60 ${
                          index % 2 === 0 && 'md:flex-row-reverse'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                          {item.grade}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationTimeline
