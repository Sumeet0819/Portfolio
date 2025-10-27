"use client";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";

export default function ProjectView() {
  const { state: project } = useLocation();
  const { id } = useParams();


  if (!project) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl opacity-60">Project details not found...</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen px-4 sm:px-8 lg:px-16 py-5 flex flex-col items-center gap-12 sm:gap-16 lg:gap-20">

      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-bold tracking-tight text-[#B8A8A3] leading-[0.9]">
            {project.title.split(" ")[0]}
            <br />
            {project.title.split(" ")[1] || ""}
          </h1>
        </div>

        <p className="text-[6vw] sm:text-[4vw] font-semibold text-[#B8A8A3]">
          {project.id}
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
        
        <div className="flex flex-col gap-6 sm:gap-8 text-[0.65rem] sm:text-[0.75rem] tracking-wide font-semibold">

          <div className="flex gap-2 sm:gap-4">
            <span className="opacity-40 w-8 sm:w-10">{project.id}</span>
            <span className="truncate">{project.title}</span>
          </div>

          <div className="space-y-2 sm:space-y-3 uppercase text-[0.55rem] sm:text-[0.65rem]">
            <Info label="Type" value={project.type} />
            <Info label="Date" value={project.date} />
            <Info label="Role" value={project.role} />

            <p className="w-full sm:w-[280px] normal-case leading-relaxed font-normal pt-4">
              {project.description}
            </p>

            <div className="pt-6">
              <p className="opacity-40">TOOLS</p>
              <ul className="mt-2 space-y-1">
                {project.tools?.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.div
          layoutId={`project-image-${project.id}`}
          whileHover={{ scale: 1.02 }}
          transition={{ layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="w-full sm:w-[50vw] lg:w-[35vw] h-[40vw] sm:h-[30vw] lg:h-[20vw] rounded-md bg-cover bg-center"
          style={{ backgroundImage: `url(${project.img})` }}
        />

        <div className="flex flex-row sm:flex-col justify-between sm:justify-between items-end text-[0.65rem] sm:text-[0.75rem] gap-4 sm:gap-0">
          <button className="flex items-center gap-2 sm:gap-3">
            OPEN
            <div className="w-8 sm:w-12 h-[1px] bg-black" />
          </button>
          <button
            className="flex items-center gap-2 sm:gap-3"
            onClick={() => window.open(project?.liveUrl, "_blank")}
          >
            VISIT LIVE ↗
            <div className="w-8 sm:w-12 h-[1px] bg-black" />
          </button>
        </div>
      </div>

      <div className="pt-16 animate-bounce text-lg">⌄</div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <p className="flex gap-10">
      <span className="opacity-40 w-12">{label}</span>
      <span className="font-normal">{value}</span>
    </p>
  );
}
