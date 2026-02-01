import React from 'react'
import NavBar from './components/NavBar'
import MainRoutes from './routes/MainRoutes'

const App = () => {
  return (
    <div className='min-h-screen relative' style={{ backgroundColor: '#0A0A0A' }}>
      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: 'url(/noise.png)',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />
      
      <NavBar />
      <MainRoutes />
    </div>
  )
}

export default App