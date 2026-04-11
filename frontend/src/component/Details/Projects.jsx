import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Code, Rocket } from "lucide-react";

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

const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={fadeUp(0.1 + index * 0.1)}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border aspect-square flex flex-col ${
      project.featured
        ? "border-indigo-500/30 shadow-2xl shadow-indigo-500/20"
        : "border-white/10 shadow-xl shadow-black/20"
    }`}
  >
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

    {project.featured && (
      <div className="absolute z-20 top-4 right-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-300 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm">
          <Rocket size={11} className="animate-pulse" />
          Featured
        </div>
      </div>
    )}

    <p className="flex-1 mb-4 text-xs border-t-[8px] border-b-[8px] border-gray-600 text-white/60">
      {project.image}
    </p>

    <div className="relative flex flex-col flex-1 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-white line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span className="flex items-center gap-1 font-medium">
              <Calendar size={12} className="text-indigo-400" />
              {project.period}
            </span>
            <span
              className={`px-2 py-0.5 text-xs font-semibold rounded-full border backdrop-blur-sm ${getStatusColor(project.status)}`}
            >
              {project.status.replace("-", " ").toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 4).map((tech, techIndex) => (
          <span
            key={techIndex}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded-md bg-gradient-to-r from-white/5 to-white/10 text-white/70 border-white/10 backdrop-blur-sm"
          >
            <Code size={9} className="text-indigo-400" />
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="flex items-center px-2 py-1 text-xs font-medium border rounded-md bg-white/5 text-white/50 border-white/10">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col max-w-4xl gap-8 px-1 py-2 mx-auto"
    >
      <motion.div variants={fadeUp(0.1)} className="flex flex-col gap-4">
        <h1 className="font-sans text-6xl italic font-bold text-white bg-transparent sm:text-4xl">
          Projects
        </h1>
        <p className="text-base text-white/70">
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
        <motion.div variants={fadeUp(0.5)} className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-white">
            <Code size={16} className="text-indigo-400" />
            All Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={featuredProjects.length + index}
                project={project}
                index={featuredProjects.length + index}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;
