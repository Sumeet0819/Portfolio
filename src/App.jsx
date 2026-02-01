import React, { useState } from 'react'
import NavBar from './components/NavBar'
import MainRoutes from './routes/MainRoutes'
import CinematicLoader from './components/CinematicLoader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

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