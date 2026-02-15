import React, { useRef, useState } from 'react'
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
    grade: 'CGPA: 7.98/10',
    image: './modasa.png'
  },
  {
    id: 4,
    year: '2019 - 2022',
    degree: 'Diploma of Computer Engineering',
    institution: 'Prime College of Diploma, Navsari',
    description: 'Specialized in Computer Engineering fundamentals, Electronics, and Programming basics.',
    grade: 'CGPA: 9.0/10',
    image: './navsari.png '
  },
  {
    id: 2,
    year: '2020 - 2022',
    degree: 'Higher Secondary Education',
    institution: 'Government High School, Silvassa',
    description: 'Specialized in Science with Mathematics and Computer Science.',
    grade: 'Percentage: 56%',
    image: './silvassa.png'
  },
  {
    id: 3,
    year: '2019 - 2020',
    degree: 'Secondary Education',
    institution: 'Gyanmata English High School, Khanvel',
    description: 'Foundation in Science, Mathematics, and Computer Applications.',
    grade: 'Percentage: 63%',
    image: './khanvel.png'
  }
]

const EducationTimeline = () => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const yearRef = useRef(null)
  
  // Initial Year - Null to hide on first slide
  const [activeYear, setActiveYear] = useState('')

  useGSAP(() => {
    const track = trackRef.current
    const container = containerRef.current
    
    // Calculate scroll amount: Total Width - Viewport Width
    const getScrollAmount = () => {
      return -(track.scrollWidth - window.innerWidth)
    }

    // Main Horizontal Scroll
    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        anticipatePin: 1, // Smooths out pinning
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })

    // Update active year based on visible card
    const cards = gsap.utils.toArray('.edu-card')
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tween,
        start: "left center",
        end: "right center",
        onEnter: () => setActiveYear(EDUCATION_DATA[index].year.split(' - ')[0]),
        onEnterBack: () => setActiveYear(EDUCATION_DATA[index].year.split(' - ')[0]),
      })
    })

    // Clear year when scrolling back to intro
    ScrollTrigger.create({
        trigger: track.querySelector('.intro-section'), // We need to add this class
        containerAnimation: tween,
        start: "left center",
        end: "right center",
        onEnter: () => setActiveYear(''),
        onEnterBack: () => setActiveYear('')
    })
    
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] text-white">
        
        {/* Fixed UI Elements */}
        
        {/* Background Year Display */}
        <div className="absolute top-12 left-12 md:left-24 z-0 pointer-events-none opacity-20 select-none">
            <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-white/5 transition-all duration-300">
                {activeYear}
            </h1>
        </div>

        {/* Progress Bar (Bottom) */}
        {/* <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10 z-50">
            <div ref={progressBarRef} className="h-full bg-white origin-left scale-x-0"></div>
        </div> */}

        {/* Horizontal Track */ }
        <div ref={trackRef} className="flex h-full w-fit">
            
            {/* Intro Section */}
             <div className="intro-section w-[100vw] h-full flex items-center justify-center px-4 md:px-12 flex-shrink-0 z-10 relative">
                 <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left: Text Content */}
                     <div className="space-y-8">
                        <span className="text-sm font-mono text-white/40 tracking-[0.2em] uppercase block">
                            est. 2019 — 2026
                        </span>
                        
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white leading-[0.9]">
                            Academic<br/>
                            <span className="opacity-50 italic font-serif">Journey</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-lg border-l-2 border-white/20 pl-6">
                            My educational path has been defined by a constant pursuit of technical excellence and creative problem solving.
                        </p>
                        
                        <div className="pt-8 flex items-center gap-4 text-white/40 animate-pulse">
                            <span className="text-sm uppercase tracking-widest">Start Scroll</span>
                            <div className="w-12 h-[1px] bg-white/40"></div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                     </div>

                    {/* Right: Decorative Visual */}
                    <div className="hidden md:flex flex-col justify-center items-end opacity-20 select-none pointer-events-none">
                        <div className="text-[12rem] leading-none font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>
                            EDU
                        </div>
                        <div className="text-[12rem] leading-none font-black text-white">
                            CATION
                        </div>
                    </div>

                 </div>
             </div>

            {/* Education Cards - One per screen view */}
            {EDUCATION_DATA.map((item) => (
                <div key={item.id} className="edu-card w-[100vw] h-full flex items-center justify-center p-6 md:p-12 flex-shrink-0 relative z-10">
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        
                        {/* Left: Content */}
                        <div className="order-2 md:order-1 space-y-8">
                             <div className="inline-block px-4 py-2 rounded-full border border-white/20 text-sm font-mono text-white/60 bg-white/5 backdrop-blur-sm">
                                 {item.year}
                             </div>
                             
                             <div>
                                 <h3 className="text-3xl md:text-5xl font-medium mb-4 leading-tight">{item.degree}</h3>
                                 <div className="text-xl text-white/50 font-light">{item.institution}</div>
                             </div>

                             <p className="text-white/70 leading-relaxed text-lg max-w-md">
                                 {item.description}
                             </p>

                             {item.grade && (
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-12 bg-white/20"></div>
                                    <span className="text-white/90 font-mono text-sm">{item.grade}</span>
                                </div>
                             )}
                        </div>

                        {/* Right: Image Container */}
                        <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group">
                             {/* Image Overlay */}
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                             
                             {/* Actual Image (Placeholder populated) */}
                             <img 
                                src={item.image} 
                                alt={item.degree}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                             />
                             
                             {/* Corner Accents */}
                             <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/50 z-20"></div>
                             <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/50 z-20"></div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EducationTimeline
