import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutSection = () => {
  const container = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    // Split text into words (simple implementation without splitting library)
    const words = textRef.current.querySelectorAll('.word')
    
    gsap.fromTo(words, 
      { 
        opacity: 0.2,
        color: "#555" // Dim color
      },
      {
        opacity: 1,
        color: "#fff", // Highlight color (assuming dark mode mainly)
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        }
      }
    )
  }, { scope: container })

  const text = "I'm Sumeet Tokare, a frontend developer based in India. I build smooth, motion-first websites with a strong focus on user experience, visual detail, and responsive systems. From design-driven UI to fast full-stack applications, I love turning ideas into digital products."

  return (
    <section 
      ref={container} 
      className="w-full py-32 px-6 md:px-12 bg-[#0A0A0A] text-white flex justify-start items-center min-h-[50vh]"
    >
      <div className="max-w-7xl mx-auto text-left">
         <h2 className="text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest">About Me</h2>
         <p ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight">
            {text.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-3 md:mr-4">
                    {word}
                </span>
            ))}
         </p>
      </div>
    </section>
  )
}

export default AboutSection
