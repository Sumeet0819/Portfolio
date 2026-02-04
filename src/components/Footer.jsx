import React from 'react'
import { Link } from 'react-router-dom'
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill, RiTwitterXFill, RiArrowUpLine } from 'react-icons/ri'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-white text-xl md:text-2xl font-light tracking-tight">
              Sumeet Tokare
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Frontend Developer crafting exceptional digital experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white/80 text-sm font-medium tracking-wider uppercase">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                About
              </Link>
              <a 
                href="#work" 
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                Work
              </a>
              <a 
                href="#contact" 
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white/80 text-sm font-medium tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex gap-3">
              <a 
                href="https://github.com/Sumeet0819" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <RiGithubFill className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </a>
              <a 
                href="https://linkedin.com/in/sumeet-tokare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <RiLinkedinBoxFill className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </a>
              <a 
                href="https://twitter.com/sumeet_tokare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <RiTwitterXFill className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:sumeettokare@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <RiMailFill className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs md:text-sm">
            © {currentYear} Sumeet Tokare. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/60 hover:text-white text-xs md:text-sm transition-colors duration-300"
          >
            <span>Back to top</span>
            <RiArrowUpLine className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
