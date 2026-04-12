import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Bot,
  Wrench,
  ChevronRight,
} from "lucide-react";
import useScreenSize from "../../hooks/useScreenSize";
const categories = [
  {
    id: "languages",
    label: "Languages",
    icon: Code2,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/15 border-indigo-500/30",
    techs: ["JavaScript", "C++", "C++ (DSA)", "HTML", "CSS"],
  },
  {
    id: "frontend",
    label: "Frontend & UI",
    icon: Layout,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/15 border-pink-500/30",
    techs: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Vite",
    ],
  },
  {
    id: "backend",
    label: "Backend & Frameworks",
    icon: Server,
    iconColor: "text-white",
    iconBg: "bg-white/10 border-white/20",
    techs: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "WebRtc",
    ],
  },
  {
    id: "databases",
    label: "Databases & Messaging",
    icon: Database,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    techs: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Firebase",
      "Supabase",
      "Pinecone",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/15 border-sky-500/30",
    techs: ["AWS", "Docker", "GitHub Actions", "Vercel", "Render"],
  },

  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/15 border-violet-500/30",
    techs: ["Git", "GitHub", "VS Code", "kiro", "windsurf", "Postman", "Figma"],
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  },
});

const Skills = () => {
  const [active, setActive] = useState(categories[0]);
  const { isMobile } = useScreenSize();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full h-full gap-4 sm:gap-6 px-1 py-2"
    >
      {/* Header */}
      <motion.div variants={fadeUp(0)} className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Tech Stack</h2>
        <p className="text-sm sm:text-lg text-white/60">
          Technologies and tools I work with regularly.
        </p>
      </motion.div>

      {/* Body */}
      {isMobile ? (
        /* Mobile: horizontal tab strip + grid below */
        <motion.div variants={fadeUp(0.08)} className="flex flex-col gap-3 flex-1 min-h-0">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = active.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border transition-all ${
                    isActive
                      ? "bg-white/10 border-white/15 text-white"
                      : "border-transparent text-white/50 hover:text-white/80"
                  }`}
                >
                  <Icon size={12} className={cat.iconColor} />
                  {cat.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 overflow-y-auto">
            {active.techs.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                <span className="text-xs font-medium text-white/85">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Tablet/Desktop: side-by-side layout */
        <motion.div variants={fadeUp(0.08)} className="flex flex-1 gap-4 min-h-0">
        {/* Sidebar */}
        <div className="flex flex-col gap-1 w-[30%] shrink-0">
          <p className="text-[20px] font-bold uppercase tracking-[0.1em] text-white/40 mb-1 px-1">
            Categories
          </p>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = active.id === cat.id;
            return (
              <motion.button
                key={cat.id}
                variants={fadeUp(0.05 + i * 0.04)}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-white/10 border border-white/15"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-lg border shrink-0 ${cat.iconBg} ${cat.iconColor}`}
                >
                  <Icon size={13} />
                </div>
                <span
                  className={`text-lg font-medium flex-1 truncate ${
                    isActive
                      ? "text-white"
                      : "text-white/70 group-hover:text-white/90"
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`text-xs font-medium tabular-nums ${
                    isActive ? "text-white/60" : "text-white/30"
                  }`}
                >
                  {cat.techs.length}
                </span>
                {isActive && (
                  <ChevronRight size={13} className="text-white/50 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px rounded-full bg-gradient-to-b from-white/15 via-white/8 to-transparent shrink-0" />

        {/* Detail Panel */}
        <div className="flex flex-col flex-1 min-w-0 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              {/* Panel header */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border ${active.iconBg} ${active.iconColor}`}
                >
                  {React.createElement(active.icon, { size: 18 })}
                </div>
                <div>
                  <h3 className="text-base font-bold leading-tight text-white">
                    {active.label}
                  </h3>
                  <p className="text-xs text-white/50">
                    {active.techs.length} technologies
                  </p>
                </div>
              </div>

              {/* Tech grid */}
              <div className="grid grid-cols-2 gap-2">
                {active.techs.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                    <span className="text-sm font-medium text-white/85">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      )}
    </motion.div>
  );
};

export default Skills;
