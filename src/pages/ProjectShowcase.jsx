import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import MatrixText from '../components/MatrixText';

const ProjectShowcase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollWrapperRef = useRef(null);
  const lenisRef = useRef(null);
  const containerRef = useRef(null);
  
  // Find current project
  const currentIndex = projects.findIndex(p => p.id === parseInt(id));
  const project = projects[currentIndex];
  
  // Scroll to top on mount and id change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (scrollWrapperRef.current) {
        scrollWrapperRef.current.scrollTo(0, 0);
    }
    if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [id]);

  useGSAP(() => {
    gsap.fromTo('.right-panel', 
      { y: '100vh' },
      { y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
    );
  }, { dependencies: [id], scope: containerRef });

  const handleNextProject = (e, nextId) => {
    e.preventDefault();
    gsap.to('.right-panel', {
      y: '-100vh',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        navigate(`/project/${nextId}`);
      }
    });
  };

  useEffect(() => {
    if (!scrollWrapperRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollWrapperRef.current,
      content: scrollWrapperRef.current.firstElementChild,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <button onClick={() => navigate('/')} className="underline">Return Home</button>
        </div>
      </div>
    );
  }

  // Calculate next project
  const nextProjectIndex = (currentIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white font-mono md:h-screen md:overflow-hidden">
      <div className="showcase-content w-full h-full flex flex-col md:flex-row">
      {/* Left Fixed Panel */}
      <div className="left-panel w-full md:w-[40%] lg:w-[35%] md:h-full p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 z-10 bg-[#0A0A0A]">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-medium tracking-tighter mb-16 uppercase break-words [word-break:break-word] hyphens-auto">
            <MatrixText speed={20} glitchDuration={600}>{project.title}</MatrixText>
          </h1>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-xs tracking-widest opacity-70 mb-16 uppercase">
            <div>
              <div className="mb-4">Year</div>
              <div><MatrixText speed={30} glitchDuration={400}>{project.year}</MatrixText></div>
            </div>
            <div>
              <div className="mb-4">Services</div>
              <div>
                {project.services.map((service, index) => (
                  <div key={index}><MatrixText speed={30} glitchDuration={400}>{service}</MatrixText></div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4">Live Site</div>
              <a href={project.link} target="_blank" rel="noreferrer">
                <MatrixText speed={30} glitchDuration={400}>{project.liveSite}</MatrixText> ↗
              </a>
            </div>
            <div>
              <div className="mb-4">Carbon Footprint</div>
              <div className="text-green-500 mb-2"><MatrixText speed={30} glitchDuration={400}>{project.carbonFootprint}</MatrixText></div>
              <div className="opacity-50 text-[10px] leading-relaxed">
                Cleaner than 85% of web pages. <br/>
                Source: websitecarbon.com ↗
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-sm">
            <MatrixText speed={10} glitchDuration={800}>{project.description}</MatrixText>
          </p>
        </div>
      </div>

      {/* Right Scrolling Panel */}
      <div 
        ref={scrollWrapperRef}
        className="right-panel w-full md:w-[60%] lg:w-[65%] flex flex-col relative z-0 md:h-full md:overflow-y-auto"
        data-lenis-prevent="true"
      >
        <div className="p-4 md:p-8 space-y-4 md:space-y-8">
          {/* Images Section */}
          {project.images.map((imageClass, index) => (
            <div 
              key={index} 
              className={`w-full aspect-[4/3] md:aspect-video rounded-md ${imageClass} shadow-2xl flex items-center justify-center text-white/50 text-2xl font-sans bg-cover bg-center`}
            >
              {!imageClass.includes('url') && `Placeholder Image ${index + 1}`}
            </div>
          ))}
        </div>

        {/* Next Project Banner */}
        <div className="mt-8 md:mt-16 p-4 md:p-8 pt-0">
            <a href={`/project/${nextProject.id}`} onClick={(e) => handleNextProject(e, nextProject.id)} className="block relative group overflow-hidden rounded-md aspect-[21/9] bg-[#111] flex items-center justify-center">
               <div className={`absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-700 ${nextProject.images[0]} bg-cover bg-center`} />
               <div className="relative z-10 text-center">
                  <span className="text-xs uppercase tracking-widest opacity-70 mb-2 block font-mono">Next Project</span>
                  <h2 className="text-4xl md:text-6xl font-sans font-medium uppercase tracking-tighter group-hover:scale-105 transition-transform duration-700">{nextProject.title}</h2>
               </div>
            </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
