"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <section className="w-full bg-white text-black px-10 py-12 flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex justify-between items-center uppercase font-bold text-[4rem] leading-none">

          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            About
          </motion.h1>

          {/* Close button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-6 text-[0.8rem] font-medium cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="w-20 h-[1px] bg-black inline-block" />
            <span>x</span>
            <span>Close</span>
          </motion.button>

        </div>

        {/* Bio text */}
        <motion.p
          className="mt-10 max-w-3xl text-[0.75rem] leading-relaxed tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: "easeOut" }}
          whileHover={{
            y: -4,
            opacity: 1,
            transition: { duration: 0.25 }
          }}
        >
          I’M SUMEET TOKARE, A FRONTEND DEVELOPER BASED IN INDIA. I BUILD
          SMOOTH, MOTION-FIRST WEBSITES WITH A STRONG FOCUS ON USER EXPERIENCE,
          VISUAL DETAIL, AND RESPONSIVE SYSTEMS. FROM DESIGN-DRIVEN UI TO FAST
          FULL-STACK APPLICATIONS, I LOVE TURNING IDEAS INTO DIGITAL PRODUCTS.
          WHEN I’M NOT CODING, YOU’LL FIND ME EXPLORING TECH, MUSIC, AND GOOD COFFEE.
        </motion.p>

        {/* Grid Section */}
        <div className="grid grid-cols-3 gap-20 mt-16 uppercase text-[0.6rem] tracking-widest">
          
          {/* Reusable motion props */}
          {[
            {
              title: "Location",
              content: (
                <>
                  <p>India</p>
                  <p className="text-[0.55rem] opacity-60 mt-1">
                    23° N 72° E
                  </p>
                </>
              ),
              delay: 0.45
            },
            {
              title: "Socials",
              content: (
                <ul className="space-y-1 font-semibold">
                  {["Github", "LinkedIn", "Instagram", "Email"].map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{
                        x: 6,
                        transition: { type: "tween", duration: 0.25 }
                      }}
                      className="cursor-pointer"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ),
              delay: 0.55
            },
            {
              title: "Stack",
              content: (
                <ul className="space-y-[2px] font-semibold">
                  {["HTML", "CSS / Tailwind", "JavaScript", "React.js", "Next.js", "Node.js", "MongoDB"].map(
                    (tech, i) => (
                      <li key={i}>{tech}</li>
                    )
                  )}
                </ul>
              ),
              delay: 0.65
            }
          ].map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: block.delay, duration: 0.55, ease: "easeOut" }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 18 }
              }}
              className="cursor-default"
            >
              <h4 className="opacity-40 mb-3">{block.title}</h4>
              {block.content}
            </motion.div>
          ))}

        </div>
      </div>

      {/* Bottom Giant Symbol */}
      <motion.div
        className="flex justify-between items-end w-full"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.65, ease: "easeOut" }}
      >
        <motion.span
          className="text-[6rem] font-black leading-none"
          whileHover={{ rotate: -15, scale: 1.15, transition: { duration: 0.3 } }}
        >
          *
        </motion.span>
      </motion.div>

    </section>
  );
}
