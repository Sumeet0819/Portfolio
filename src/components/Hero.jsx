"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(null);

  const projects = [
    { id: "001", title: "FERTILE AGENCY", img: "https://images.unsplash.com/photo-1760915170483-3e943d42f29a?auto=format&fit=crop&q=80&w=687" },
    { id: "002", title: "CAMILLE JUTEL", img: "https://images.unsplash.com/photo-1761198047035-577c8a197375?auto=format&fit=crop&q=80&w=715" },
    { id: "003", title: "AMOURATROI", img: "https://plus.unsplash.com/premium_photo-1761292485688-66093738b49c?auto=format&fit=crop&q=80&w=687" },
    { id: "004", title: "MARINE BENABOU", img: "https://images.unsplash.com/photo-1761138414056-99c8e870d3a8?auto=format&fit=crop&q=80&w=709" },
  ];

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.22 } },
  };

  const cardVariants = {
    hidden: { y: 200, opacity: 0, rotate: 10, filter: "grayscale(100%)" },
    show: {
      y: 0,
      opacity: 1,
      rotate: 0,
      filter: "grayscale(100%)",
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full h-[80vh] px-10 py-20 flex flex-col lg:flex-row justify-between gap-12">

      {/* Left list */}
      <div className="uppercase text-xs tracking-wider w-[65%]">
        <p className="mb-6 flex items-center gap-2">
          Projects <span className="rotate-90 text-xs">➜</span>
        </p>
        <ul className="space-y-0">
          {projects.map((p, idx) => (
            <li
              key={p.id}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex gap-4 text-[0.7rem] font-bold cursor-pointer transition
                ${activeIndex === idx ? "opacity-100" : "opacity-60"}`}
            >
              <span className="w-10">{p.id}</span>
              <span>{p.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Animated images */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="w-full flex"
      >
        <div className="flex flex-col gap-6 w-full -translate-x-20">
         {projects.map((item, idx) => {
  const isActive = activeIndex === idx;
  return (
    <motion.div
      key={item.id}
      variants={cardVariants}
      animate={{
        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
        scale: isActive ? 1.05 : 1,
        zIndex: isActive ? 10 : 1,
        opacity: isActive ? 1 : 0.85,
      }}
      whileHover={{
        filter: "grayscale(0%)",
        scale: 1.02,
        opacity: 1,
        zIndex: 20,
      }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setActiveIndex(idx)}
      onMouseLeave={() => setActiveIndex(null)}
      style={{
        backgroundImage: `url(${item.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-1/2 h-[200px] bg-gray-300 rounded-xs shadow-md cursor-pointer"
    />
  );
})}

        </div>
      </motion.div>
    </div>
  );
}
