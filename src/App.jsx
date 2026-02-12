import React, { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import NavBar from './components/NavBar'
import MainRoutes from './routes/MainRoutes'
import CinematicLoader from './components/CinematicLoader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const lenisRef = useRef()

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis
    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      lenisRef.current?.stop()
    } else {
      lenisRef.current?.start()
    }
  }, [isLoading])

  return (
    <div className='min-h-screen relative' style={{ backgroundColor: '#0A0A0A' }}>
      {/* Cinematic Loader */}
      {isLoading && <CinematicLoader onComplete={handleLoadingComplete} />}

      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: 'url(/noise.png)',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Only render NavBar after loading completes */}
      {!isLoading && <NavBar />}
      <MainRoutes />
    </div>
  )
}

export default App