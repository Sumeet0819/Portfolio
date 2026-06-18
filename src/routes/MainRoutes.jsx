import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../components/About'
import ProjectShowcase from '../pages/ProjectShowcase'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/project/:id" element={<ProjectShowcase />} />
    </Routes>
  )
}

export default MainRoutes
