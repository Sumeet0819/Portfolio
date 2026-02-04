import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GitHubContributions = ({ username = 'Sumeet0819' }) => {
  const containerRef = useRef(null)

  // ScrollTrigger animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(containerRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.stat-item', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.5'
    )
  }, { scope: containerRef })

  return (
    <div 
      ref={containerRef}
      className="w-full px-6 md:px-12 py-16 md:py-24"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-light tracking-wide mb-2">
            GitHub Activity
          </h2>
          <p className="text-white/40 text-xs md:text-sm lg:text-base font-light">
            My contribution graph for 2026
          </p>
        </div>

        {/* GitHub Contribution Graph */}
        <div className="relative rounded-lg overflow-hidden bg-zinc-900/50 p-4 md:p-6 lg:p-8 border border-white/5">
          {/* Graph Container */}
          <div className="w-full overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/${username}?from=2026-01-01&to=2026-12-31`}
              alt="GitHub Contribution Graph"
              className="w-full min-w-[600px] h-auto"
              style={{ 
                filter: 'invert(1) hue-rotate(180deg) brightness(1.1) contrast(1.1)',
                imageRendering: 'crisp-edges'
              }}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
            <div className="stat-item text-center">
              <div className="text-white text-2xl md:text-3xl font-light mb-1">
                32
              </div>
              <div className="text-white/40 text-xs md:text-sm font-light tracking-wider uppercase">
                Days (2026)
              </div>
            </div>
            <div className="stat-item text-center">
              <div className="text-white text-2xl md:text-3xl font-light mb-1">
                ~50
              </div>
              <div className="text-white/40 text-xs md:text-sm font-light tracking-wider uppercase">
                Contributions
              </div>
            </div>
            <div className="stat-item text-center">
              <div className="text-white text-2xl md:text-3xl font-light mb-1">
                ~10
              </div>
              <div className="text-white/40 text-xs md:text-sm font-light tracking-wider uppercase">
                Repositories
              </div>
            </div>
            <div className="stat-item text-center">
              <div className="text-white text-2xl md:text-3xl font-light mb-1">
                Active
              </div>
              <div className="text-white/40 text-xs md:text-sm font-light tracking-wider uppercase">
                This Month
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="mt-8 text-center">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-light tracking-wider uppercase transition-colors duration-300"
            >
              <span>View on GitHub</span>
              <svg 
                className="w-4 h-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubContributions
