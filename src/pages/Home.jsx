import Hero from '../components/Hero'
import TechStack from '../components/TechStack'
import Projects from '../components/Projects'
import GitHubContributions from '../components/GitHubContributions'
import EducationTimeline from '../components/EducationTimeline'
import FavoriteSongs from '../components/FavoriteSongs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <TechStack />
      <Projects />
      <EducationTimeline />
      <GitHubContributions />
      {/* <FavoriteSongs /> */}
      <Footer />
    </div>
  )
}

export default Home
