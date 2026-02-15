import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TECH_NODES = [
  { name: 'REACT', type: 'LIBRARY', status: 'ACTIVE' },
  { name: 'NEXT.JS', type: 'FRAMEWORK', status: 'ACTIVE' },
  { name: 'PYTHON', type: 'LANGUAGE', status: 'STANDBY' },
  { name: 'NODE.JS', type: 'BACKEND', status: 'RUNNING' },
  { name: 'TAILWIND', type: 'STYLING', status: 'OPTIMIZED' },
  { name: 'MYSQL', type: 'DATA', status: 'CONNECTED' },
  { name: 'HTML5', type: 'CORE', status: 'Standard' },
  { name: 'GIT', type: 'VERSION', status: 'TRACKING' },
  { name: 'GRAPHQL', type: 'QUERY', status: 'CACHED' },
  { name: 'GITHUB', type: 'OPS', status: 'ONLINE' },
  { name: 'JAVA', type: 'LANGUAGE', status: 'COMPILED' },
  { name: 'DJANGO', type: 'FRAMEWORK', status: 'STABLE' },
  { name: 'PHP', type: 'LANGUAGE', status: 'LEGACY' },
  { name: 'LARAVEL', type: 'FRAMEWORK', status: 'SECURE' },
  { name: 'THREE.JS', type: '3D', status: 'RENDERED' },
  { name: 'C++', type: 'LANGUAGE', status: 'NATIVE' },
]

const TechStack = () => {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    // Header Text Reveal (Masked Slide Up)
    gsap.fromTo('.tech-header-text',
      { y: '100%' },
      { 
        y: '0%', 
        duration: 1.5, 
        ease: 'power4.out',
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: 'top 80%' 
        } 
      }
    )

    // Header Border Expand
    gsap.fromTo('.tech-header-border',
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 1.5, 
        ease: 'power3.inOut',
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: 'top 80%' 
        } 
      }
    )

    // Grid Animation: Staggered Blur + Fade + Slide Up
    gsap.fromTo('.tech-node',
      { 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)',
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.05, 
        ease: 'power2.out',
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: 'top 70%' // Start a bit later so header is visible first
        }
      }
    )
    
    // Status Blink
    gsap.to('.status-dot', {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full bg-white dark:bg-black text-black dark:text-white py-24 px-4 md:px-12 lg:px-24 overflow-hidden uppercase">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-end mb-6 pb-4 relative">
          
          {/* Animated Border Line */}
          <div className="tech-header-border absolute bottom-0 left-0 w-full h-[1px] bg-black/10 dark:bg-white/10 origin-left"></div>

          <div>
             <div className="overflow-hidden">
                <h2 className="tech-header-text text-5xl md:text-7xl font-bold tracking-tighter translate-y-full">
                  TECH_STACK
                </h2>
             </div>
          </div>
          
          <div className="overflow-hidden mt-4 md:mt-0">
             <div className="tech-header-text flex items-center gap-3 text-sm md:text-base font-medium opacity-60 translate-y-full">
                <span className="status-dot w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                <span>/// SYSTEM_OPTIMIZED</span>
             </div>
          </div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 border-l border-t border-black/10 dark:border-white/10">
          {TECH_NODES.map((node, i) => (
            <TechNode key={i} node={node} />
          ))}
        </div>

        {/* System Footer */}
        <div className="flex justify-between text-[10px] md:text-xs opacity-40 mt-4 tracking-widest">
          <span>TOTAL_NODES: {TECH_NODES.length}</span>
          <span>MEMORY_USAGE: 128MB</span>
        </div>

      </div>
    </div>
  )
}

const TechNode = ({ node }) => {
  return (
    <div className="tech-node group relative border-r border-b border-black/10 dark:border-white/10 p-6 md:p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 cursor-pointer">
      <div className="flex flex-col h-full justify-between gap-4">
        
        {/* Top Label */}
        <div className="flex justify-between items-start opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] tracking-widest">&gt;_ {node.type}</span>
        </div>
        
        {/* Main Text */}
        <div className="relative">
          <h3 className="text-lg md:text-xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
            {node.name}
          </h3>
          
          {/* Hover Status */}
          <span className="absolute -bottom-6 left-0 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold tracking-wider">
            STATUS: {node.status}
          </span>
        </div>
        
        {/* Corner Accent (only on hover) */}
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}

export default TechStack
