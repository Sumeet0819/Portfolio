"use client";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function About() {
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const container = useRef(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Staggered entry animation for all improved elements
      tl.from(".animate-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      })
      .from(".animate-symbol", {
         scale: 0, 
         opacity: 0,
         rotation: -180,
         duration: 1.5,
         ease: "elastic.out(1, 0.5)"
      }, "-=0.8");

      // Continuous rotation for the giant symbol
      gsap.to(".animate-symbol span", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
      
    },
    { scope: container }
  );

  return (
    <section 
      ref={container} 
      className="w-full h-screen bg-white dark:bg-[#121212] text-black dark:text-white px-6 md:px-10 py-12 pt-24 flex flex-col justify-between transition-colors duration-500 overflow-hidden relative"
    >
      
      {/* Background Micro-interaction Elements (Optional) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-100 to-transparent dark:from-[#1a1a1a] dark:to-transparent rounded-full blur-3xl opacity-50 pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />

      {/* Header */}
      <div>
        <div className="flex justify-between items-start md:items-center uppercase leading-none">

          {/* Title */}
          <h1 className="animate-item font-extrabold text-6xl md:text-8xl lg:text-[7rem] tracking-tighter hover:tracking-normal transition-all duration-700 cursor-default">
            About
          </h1>

          {/* Close button */}
          <button
            onClick={() => navigate("/")}
            className="animate-item flex items-center gap-3 md:gap-4 text-xs md:text-sm font-medium cursor-pointer group"
          >
            <span className="w-8 md:w-16 h-[1px] bg-black dark:bg-white inline-block transition-all duration-300 group-hover:w-24" />
            <div className="overflow-hidden h-4 md:h-5 relative w-12 md:w-16 text-left">
                <span className="absolute top-0 left-0 transition-transform duration-300 group-hover:-translate-y-full">Close</span>
                <span className="absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">Back</span>
            </div>
          </button>

        </div>

        {/* Bio text */}
        <div className="animate-item mt-12 md:mt-16 max-w-4xl">
          <p className="text-sm md:text-lg leading-relaxed md:leading-relaxed text-gray-800 dark:text-gray-200 uppercase tracking-wide">
            I'm <span className="font-bold text-black dark:text-white">Sumeet Tokare</span>, a frontend developer based in India. I build smooth, motion-first websites with a strong focus on user experience, visual detail, and responsive systems. From design-driven UI to fast full-stack applications, I love turning ideas into digital products.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 md:gap-x-12 mt-16 md:mt-24 uppercase text-xs md:text-sm tracking-widest">
          
          {/* Location */}
          <div className="animate-item group cursor-default">
            <h4 className="text-gray-400 dark:text-gray-600 mb-4 text-[10px] md:text-xs font-bold">Location</h4>
            <div className="transform transition-transform duration-300 group-hover:translate-x-2">
                <p className="font-semibold">India</p>
                <p className="text-[10px] opacity-60 mt-1 font-mono">
                23° N 72° E &bull; {time}
                </p>
            </div>
          </div>

          {/* Socials */}
          <div className="animate-item group">
            <h4 className="text-gray-400 dark:text-gray-600 mb-4 text-[10px] md:text-xs font-bold">Socials</h4>
            <ul className="space-y-2 font-medium">
              {["Github", "LinkedIn", "Instagram", "Email"].map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer transition-all duration-300 hover:text-gray-500 dark:hover:text-gray-300 hover:translate-x-2 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-black dark:bg-white rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="animate-item group">
            <h4 className="text-gray-400 dark:text-gray-600 mb-4 text-[10px] md:text-xs font-bold">Stack</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-medium max-w-[200px]">
              {["HTML", "CSS", "JS", "React", "Next.js", "Node", "MongoDB", "GSAP"].map(
                (tech, i) => (
                  <span key={i} className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 cursor-default">{tech}</span>
                )
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Giant Symbol */}
      <div className="animate-symbol p-5 absolute bottom-[-5%] right-[-5%] md:right-10 md:bottom-0 pointer-events-none opacity-10 dark:opacity-5 select-none ">
        <span className="block text-[15rem] md:text-[25rem] leading-none font-black text-black dark:text-white transform origin-center">
          *
        </span>
      </div>

    </section>
  );
}
