import React, { useState } from 'react'

const Hero = () => {
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
        <div className="flex items-start justify-between mb-32 md:mb-54">
          {/* Large Name */}
          <div className="flex-1">
            <h1 
              className="font-regular leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
            >
              SUMEET<br />
              TOKARE
            </h1>
          </div>
        </div>

        {/* Project Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative h-50 md:h-50 lg:h-50 rounded-sm overflow-hidden cursor-pointer bg-zinc-900 transition-all duration-400"
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
