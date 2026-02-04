"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen bg-white dark:bg-black text-black dark:text-white px-10 py-12 pt-24 flex flex-col justify-between transition-colors duration-300">
      
      {/* Header */}
      <div>
        <div className="flex justify-between items-center uppercase font-bold text-5xl md:text-6xl lg:text-[4rem] leading-none">

          {/* Title */}
          <h1 className="hover:scale-105 transition-transform duration-300">
            About
          </h1>

          {/* Close button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 md:gap-6 text-[0.7rem] md:text-[0.8rem] font-medium cursor-pointer hover:scale-105 active:scale-90 transition-transform"
          >
            <span className="w-12 md:w-20 h-[1px] bg-black dark:bg-white inline-block" />
            <span>x</span>
            <span>Close</span>
          </button>

        </div>

        {/* Bio text */}
        <p className="mt-8 md:mt-10 max-w-3xl text-[0.7rem] md:text-[0.75rem] leading-relaxed tracking-tight hover:-translate-y-1 transition-transform duration-250">
          I'M SUMEET TOKARE, A FRONTEND DEVELOPER BASED IN INDIA. I BUILD
          SMOOTH, MOTION-FIRST WEBSITES WITH A STRONG FOCUS ON USER EXPERIENCE,
          VISUAL DETAIL, AND RESPONSIVE SYSTEMS. FROM DESIGN-DRIVEN UI TO FAST
          FULL-STACK APPLICATIONS, I LOVE TURNING IDEAS INTO DIGITAL PRODUCTS.
          WHEN I'M NOT CODING, YOU'LL FIND ME EXPLORING TECH, MUSIC, AND GOOD COFFEE.
        </p>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 mt-12 md:mt-16 uppercase text-[0.6rem] tracking-widest">
          
          {/* Location */}
          <div className="cursor-default hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300">
            <h4 className="opacity-40 mb-3">Location</h4>
            <p>India</p>
            <p className="text-[0.55rem] opacity-60 mt-1">
              23° N 72° E
            </p>
          </div>

          {/* Socials */}
          <div className="cursor-default hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300">
            <h4 className="opacity-40 mb-3">Socials</h4>
            <ul className="space-y-1 font-semibold">
              {["Github", "LinkedIn", "Instagram", "Email"].map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer hover:translate-x-1.5 transition-transform duration-250"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="cursor-default hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300">
            <h4 className="opacity-40 mb-3">Stack</h4>
            <ul className="space-y-[2px] font-semibold">
              {["HTML", "CSS / Tailwind", "JavaScript", "React.js", "Next.js", "Node.js", "MongoDB"].map(
                (tech, i) => (
                  <li key={i}>{tech}</li>
                )
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Giant Symbol */}
      <div className="flex justify-between items-end w-full">
        <span className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-black leading-none hover:rotate-[-15deg] hover:scale-115 transition-all duration-300">
          *
        </span>
      </div>

    </section>
  );
}
