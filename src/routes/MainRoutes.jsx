import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default MainRoutes
