import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const SongCard = ({ song, isActive, onClick, position, distanceFromCenter }) => {
  const cardRef = useRef(null)

  // Calculate curved 3D transform based on distance from center
  const getTransform = () => {
    const distance = Math.abs(distanceFromCenter)
    
    if (isActive) {
      // Center card: slightly forward, slight tilt
      return {
        transform: 'translateX(0px) translateY(0px) translateZ(80px) rotateY(0deg) rotateX(5deg)',
        scale: 1.1,
        brightness: 1
      }
    }
    
    // Calculate curve parameters - matching reference image
    const angle = distanceFromCenter * 35 // Stronger rotation (35 degrees per card)
    const xOffset = distanceFromCenter * 340 // Wider horizontal spacing
    const yOffset = Math.abs(distanceFromCenter) * 50 // More vertical drift
    const zOffset = -distance * 180 // Deeper push back
    const scale = 1 - (distance * 0.18) // More scale reduction
    const brightness = 1 - (distance * 0.3) // More darkening
    
    return {
      transform: `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${zOffset}px) rotateY(${-angle}deg) rotateX(${8 + distance * 3}deg)`,
      scale,
      brightness
    }
  }

  const transformData = getTransform()

  return (
    <div
      ref={cardRef}
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm overflow-hidden cursor-pointer transition-all duration-700 flex-shrink-0"
      style={{
        transformStyle: 'preserve-3d',
        transform: transformData.transform,
        width: '270px',
        height: '400px',
        backgroundColor: song.bgColor || '#f5f5dc',
        opacity: isActive ? 1 : 0.7,
        zIndex: isActive ? 50 : 10 - Math.abs(distanceFromCenter)
      }}
      onClick={onClick}
    >
      {/* Polaroid Card */}
      <div className="absolute inset-0 p-4 flex flex-col">
        {/* Album Cover Area */}
        <div className="relative flex-1 bg-black mb-4 overflow-hidden">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          
          {/* Play Button Overlay - Only on Active */}
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
              <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Song Info - Polaroid Bottom */}
        <div className="text-left space-y-1">
          <h3 className={`font-bold tracking-tight transition-all duration-300 ${
            isActive ? 'text-lg' : 'text-base'
          }`} style={{ color: '#1a1a1a' }}>
            {song.title}
          </h3>
          <p className={`font-normal transition-all duration-300 ${
            isActive ? 'text-sm' : 'text-xs'
          }`} style={{ color: '#4a4a4a' }}>
            {song.artist}
          </p>
          {isActive && (
            <p className="text-xs font-light" style={{ color: '#6a6a6a' }}>
              {song.year}
            </p>
          )}
        </div>
      </div>

      {/* Polaroid Shadow */}
      <div className="absolute inset-0 shadow-2xl pointer-events-none rounded-sm" 
        style={{ 
          boxShadow: isActive 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
        }} 
      />
    </div>
  )
}

const FavoriteSongs = () => {
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Container entrance animation
  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 3.2,
        ease: 'power3.out'
      }
    )
  }, [])

  const songs = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      year: '2020',
      bgColor: '#ff6b6b',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Levitating',
      artist: 'Dua Lipa',
      year: '2020',
      bgColor: '#d4e09b',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Starboy',
      artist: 'The Weeknd',
      year: '2016',
      bgColor: '#f4a261',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      year: '2020',
      bgColor: '#e9c46a',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      year: '2021',
      bgColor: '#95d5b2',
      cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop'
    }
  ]

  const scrollToCard = (index) => {
    setActiveIndex(index)
  }

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : songs.length - 1
    scrollToCard(newIndex)
  }

  const handleNext = () => {
    const newIndex = activeIndex < songs.length - 1 ? activeIndex + 1 : 0
    scrollToCard(newIndex)
  }

  return (
    <div 
      ref={containerRef}
      className="w-full px-6 md:px-12 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-white/90 text-3xl md:text-4xl font-light tracking-wide mb-3" 
            style={{ fontFamily: 'Georgia, serif' }}>
            Current Playlist
          </h2>
          <p className="text-white/40 text-sm md:text-base font-light">
            Music that inspires my work
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 3D Carousel Stage */}
          <div 
            className="relative w-full overflow-hidden"
            style={{ 
              height: '500px',
              perspective: '1200px',
              perspectiveOrigin: 'center 45%'
            }}
          >


            {/* Cards Container */}
            <div 
              className="absolute inset-0"
              style={{ 
                transformStyle: 'preserve-3d'
              }}
            >
              {songs.map((song, index) => {
                // Calculate circular distance for infinite scrolling feel
                const length = songs.length
                let distanceFromCenter = index - activeIndex
                const half = Math.floor(length / 2)
                
                // Wrap logic
                if (distanceFromCenter > half) {
                  distanceFromCenter -= length
                } else if (distanceFromCenter < -half) {
                  distanceFromCenter += length
                }
                
                // Determine position
                let position = 'center'
                if (distanceFromCenter < 0) position = 'left'
                if (distanceFromCenter > 0) position = 'right'
                
                // Only render if within visible range (optimization for many items)
                const isVisible = Math.abs(distanceFromCenter) <= 2
                
                if (!isVisible) return null

                return (
                  <SongCard 
                    key={song.id}
                    song={song} 
                    isActive={index === activeIndex}
                    position={position}
                    distanceFromCenter={distanceFromCenter}
                    onClick={() => scrollToCard(index)}
                  />
                )
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {songs.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'w-8 h-2 bg-white' 
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoriteSongs
