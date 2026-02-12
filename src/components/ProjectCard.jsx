import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ProjectCard = ({ project, isHovered, isOtherHovered, onHover, onLeave }) => {
  const cardRef = useRef(null)

  // Animate blur/scale/opacity with GSAP
  useGSAP(() => {
    if (isOtherHovered) {
      gsap.to(cardRef.current, {
        filter: 'blur(4px)',
        scaleY: 0.85,
        transformOrigin: 'bottom',
        opacity: 0.5,
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(cardRef.current, {
        filter: 'blur(0px)',
        scaleY: 1,
        transformOrigin: 'bottom',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }, [isOtherHovered])

  return (
    <div
      ref={cardRef}
      className="group relative h-80 md:h-60 lg:h-60 rounded-sm overflow-hidden cursor-pointer bg-zinc-900"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Project Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          style={{ filter: 'brightness(0.85)' }}
        />
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-400"></div>

      {/* Project Info - Always Visible */}
      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
        <div className="transform transition-all duration-400 group-hover:translate-y-0">
          <h3 className="text-white text-sm md:text-base font-normal tracking-wide mb-1">
            {project.title}
          </h3>
          <p className="text-white/50 text-[0.7rem] md:text-xs font-light tracking-wider uppercase">
            {project.category}
          </p>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-400"></div>
    </div>
  )
}

export default ProjectCard
