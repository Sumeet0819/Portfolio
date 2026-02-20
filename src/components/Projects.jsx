import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const containerRef = useRef(null)
  const tableRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'EMS',
      category: 'Management System',
      year: '2026',
      location: 'Ahmedabad, IN'
    },
    {
      id: 2,
      title: 'Moody Player',
      category: 'Web Design',
      year: '2026',
      location: 'Ahmedabad, IN',
      link: 'https://moody-nu-nine.vercel.app/'
    },
    {
      id: 3,
      title: 'Mocktails',
      category: 'Web Design',
      year: '2023',
      location: 'Ahmedabad, IN',
      link: 'https://mocktails-project.vercel.app/'
    },
    {
      id: 4,
      title: 'Remi8',
      category: 'Development',
      year: '2024',
      location: 'Ahmedabad, IN',
      link: 'https://play.google.com/store/apps/details?id=com.remi8.ai&hl=en_IN'
    },
    {
      id: 5,
      title: 'Bleep',
      category: 'Development',
      year: '2022',
      location: 'Ahmedabad, IN'
    }
  ]

  useGSAP(() => {
    // Header Reveal
    gsap.to('.project-header-text', {
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%'
      }
    })

    const rows = tableRef.current.querySelectorAll('.project-row')
    
    rows.forEach((row, index) => {
      // Border Draw
      gsap.fromTo(row.querySelector('.row-border'),
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%' }
        }
      )
      
      // Text Reveal
      gsap.fromTo(row.querySelectorAll('.reveal-text'),
        { y: '100%' },
        { 
          y: '0%', 
          duration: 1, 
          ease: 'power3.out',
          stagger: 0.05,
          delay: 0.2,
          scrollTrigger: { trigger: row, start: 'top 85%' }
        }
      )
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full py-32 px-6 md:px-12 bg-white dark:bg-[#0A0A0A] text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-24 md:mb-32 px-4">
             <div>
                <h2 className="project-header-text text-5xl md:text-9xl font-regular tracking-tighter translate-y-full p-2">Works</h2>
             </div>
             <span className="hidden md:block text-sm opacity-50 font-mono mb-2 md:mb-4">[ {projects.length} ]</span>
        </div>
        
        {/* Project Table */}
        <div ref={tableRef} className="flex flex-col">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-6 border-b border-black/20 dark:border-white/20 text-xs uppercase tracking-[0.2em] opacity-50 px-6 font-mono mb-8">
                <div className="col-span-5">Project Name</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2 text-right">Year</div>
            </div>

            {/* Rows */}
            {projects.map((project) => (
                <div 
                    key={project.id} 
                    className="project-row group relative cursor-pointer"
                >
                    {/* Border Line */}
                    <div className="row-border absolute bottom-0 left-0 w-full h-[1px] bg-black/10 dark:bg-white/10 origin-left" />

                    {/* Hover Background - "Flip" Effect */}
                    <div className="absolute inset-0 bg-black dark:bg-white scale-y-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100" />
                    
                    {/* Content */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-2 gap-x-4 py-12 md:py-16 px-4 md:px-6 items-center transition-colors duration-300 group-hover:text-white dark:group-hover:text-black">
                        {/* Title */}
                        <div className="col-span-12 md:col-span-5">
                            <h3 className="reveal-text text-3xl md:text-5xl font-medium tracking-tight translate-y-full pb-1">{project.title}</h3>
                        </div>
                        
                        {/* Category */}
                        <div className="col-span-12 md:col-span-3 opacity-70 group-hover:opacity-100 flex items-center gap-2 overflow-hidden">
                            <span className="md:hidden text-xs uppercase opacity-50">Category:</span>
                            <span className="reveal-text text-sm md:text-xl translate-y-full">{project.category}</span>
                        </div>

                        {/* Location */}
                        <div className="col-span-12 md:col-span-2 opacity-60 group-hover:opacity-100 flex items-center gap-2 overflow-hidden">
                             <span className="md:hidden text-xs uppercase opacity-50">Loc:</span>
                             <span className="reveal-text text-sm md:text-base translate-y-full">{project.location}</span>
                        </div>

                        {/* Year */}
                        <div className="col-span-12 md:col-span-2 opacity-60 transition-all duration-500 md:group-hover:opacity-0 md:group-hover:-translate-x-4 text-left md:text-right flex items-center md:block gap-2 overflow-hidden">
                             <span className="md:hidden text-xs uppercase opacity-50">Year:</span>
                             <span className="reveal-text font-mono text-xs md:text-sm translate-y-full">{project.year}</span>
                        </div>
                        
                        {/* Arrow Icon (Only visible on hover) */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:-translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] text-white dark:text-black">
                                 <a href={project.link} target='_blank'>
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                 <line x1="7" y1="17" x2="17" y2="7"></line>
                                 <polyline points="7 7 17 7 17 17"></polyline>
                             </svg>
                                 </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
