import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Calendar, Code, Rocket, ChevronLeft } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  },
});

const projects = [
  {
    title: "E-Commerce Platform",
    image: <img src="/e.png" alt="nothing" />,
    technologies: ["React", "Node.js", "MongoDB", "AppWrite", "Tailwind CSS"],
    period: "Dec-2025",
    status: "completed",
  },
  {
    title: "StudySync",
    image: <img src="/s.png" alt="nothing" />,
    technologies: ["React", "Express", "Socket.io", "Node.js", "PostgreSQL"],
    period: "Feb-2026",
    status: "in-progress",
  },
  {
    title: "AI Chatbot",
    image: <img src="/ch.png" alt="nothing" />,
    technologies: ["React", "Node.js", "MongoDB", "Gemini API", "Pinecone"],
    period: "Nov-2025",
    status: "completed",
  },
  {
    title: "Web Scraping using Python",
    image: <img src="/ws.png" alt="nothing" />,
    technologies: ["Python", "BeautifulSoup", "Firebase", "React"],
    period: "June-2025",
    status: "completed",
  },
  {
    title: "Van Raksham",
    image: <img src="/v.png" alt="nothing" />,
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    period: "Aug-2025",
    status: "completed",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
    case "in-progress":
      return "bg-amber-500/10 text-amber-400 border-amber-500/25";
    default:
      return "bg-white/10 text-white/60 border-white/20";
  }
};

const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    onClick={onClick}
    variants={fadeUp(0.1 + index * 0.1)}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`cursor-pointer relative overflow-hidden rounded-xl bg-transparent border h-auto min-h-[280px] sm:h-[340px] flex flex-col ${
      project.featured
        ? "border-indigo-500/30 shadow-2xl shadow-indigo-500/20"
        : "border-white/10 shadow-2xl shadow-black/20"
    }`}
  >
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

    <p className="border-t-[8px] border-b-[8px] border-gray-600 text-white/60">
      {project.image}
    </p>

    <div className="relative flex flex-col flex-1 p-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-1 font-medium">
            <h3 className="mb-2 text-lg font-bold tracking-tight text-white">
              {project.title}
            </h3>

            <span className="flex items-center gap-1 text-sm">
              <Calendar size={12} className="text-indigo-400" />
              {project.period}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-px my-3 bg-gray-700"></div>
      <div className="flex  gap-1.5">
        <Cloud size={15} className="text-indigo-400" />
        {project.technologies.slice(0, 4).map((tech, techIndex) => (
          <span key={techIndex} className="flex text-xs text-white/60">
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="flex text-sm text-white/60">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectDetailsView = ({ project, onBack }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="flex flex-col w-full h-full gap-6 px-1 py-2 sm:px-4"
  >
    <button
      onClick={onBack}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-white/5 hover:bg-white/10 rounded-xl w-fit text-white/80"
    >
      <ChevronLeft size={16} /> Back to Projects
    </button>

    <div className="flex flex-col gap-8 md:flex-row">
      <div className="w-full md:w-1/2 p-2 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden h-[300px] md:h-[400px]">
        {React.cloneElement(project.image, {
          className: "w-full h-full object-contain drop-shadow-2xl",
        })}
      </div>

      <div className="flex flex-col w-full gap-6 md:w-1/2">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-indigo-400" />{" "}
              {project.period}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(
                project.status,
              )}`}
            >
              {project.status === "completed" ? "Completed" : "In Progress"}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        <div>
          <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white/90">
            <Code size={18} className="text-indigo-400" /> Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = ({ isMaximized }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <AnimatePresence mode="wait">
      {selectedProject ? (
        <ProjectDetailsView
          key="details"
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      ) : (
        <motion.div
          key="grid"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
          className="flex flex-col w-full gap-8 px-1 py-2 mx-auto"
        >
          <motion.div variants={fadeUp(0.1)} className="flex flex-col gap-4">
            <h1 className="px-4 font-sans text-4xl italic font-bold text-white bg-transparent sm:px-8 sm:text-5xl lg:text-6xl">
              Projects
            </h1>
            <p className="px-4 text-base sm:px-8 text-white/70">
              A collection of my recent work and personal projects
            </p>
          </motion.div>

          {featuredProjects.length > 0 && (
            <>
              <motion.div
                variants={fadeUp(0.4)}
                className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
              />
            </>
          )}

          {otherProjects.length > 0 && (
            <motion.div variants={fadeUp(0.5)} className="flex flex-col">
              <h2 className="flex items-center gap-2 px-4 mb-4 text-xl font-semibold text-white sm:px-8">
                <Code size={16} className="text-indigo-400" />
                All Projects
              </h2>
              <div
                className={`grid gap-4 sm:gap-5 p-4 md:px-[40px] bg-transparent ${
                  isMaximized
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2  "
                }`}
              >
                {otherProjects.map((project, index) => (
                  <ProjectCard
                    key={featuredProjects.length + index}
                    project={project}
                    index={featuredProjects.length + index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Projects;
