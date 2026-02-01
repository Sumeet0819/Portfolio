import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#0A0A0A' }}>
      <NavBar />
      <Hero />
    </div>
  )
}

export default App