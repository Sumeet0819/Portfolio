import React from 'react'
import Hero from '../components/Hero'
import TechStack from '../components/TechStack'
import GitHubContributions from '../components/GitHubContributions'
import EducationTimeline from '../components/EducationTimeline'
import FavoriteSongs from '../components/FavoriteSongs'

const Home = () => {
  return (
    <div>
      <Hero />
      <TechStack />
      <EducationTimeline />
      <GitHubContributions />
      <FavoriteSongs />
    </div>
  )
}

export default Home
