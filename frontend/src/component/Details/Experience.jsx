import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code2,
  ExternalLink,
  Sparkles,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

// ── Project / Experience data ──────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Full-Stack Chat Application",
    role: "Solo Developer",
    type: "Personal Project",
    period: "Jan 2025 – Mar 2025",
    status: "Completed",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    dotColor: "bg-emerald-400",
    description:
      "Built a real-time chat platform with room-based messaging, user authentication, and live presence indicators. Implemented WebSocket communication using Socket.io and a scalable REST API with Express.",
    tech: ["React.js", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    links: { github: "#", live: "#" },
  },
  {
    id: 2,
    title: "E-Commerce Store",
    role: "Solo Developer",
    type: "Personal Project",
    period: "Oct 2024 – Dec 2024",
    status: "Completed",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    dotColor: "bg-emerald-400",
    description:
      "Developed a fully functional e-commerce web app featuring product listing, cart management, Stripe payment integration, and an admin dashboard for product/order management.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Stripe", "Redux"],
    links: { github: "#", live: "#" },
  },
  {
    id: 3,
    title: "AI Study Assistant",
    role: "Solo Developer",
    type: "College Project",
    period: "Jul 2024 – Sep 2024",
    status: "In Progress",
    statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    dotColor: "bg-amber-400",
    description:
      "An intelligent Q&A tool that ingests PDF study material, embeds it into a vector store (Pinecone), and answers student questions using OpenAI's GPT model — RAG architecture.",
    tech: ["React.js", "Node.js", "Pinecone", "OpenAI API", "Firebase"],
    links: { github: "#" },
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status, color }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color}`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-current" />
    {status}
  </span>
);

const TechPill = ({ label }) => (
  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/8 border border-white/12 text-white/70">
    {label}
  </span>
);

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp(0.1 + index * 0.08)}
      className="flex items-start gap-5"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center pt-1 shrink-0">
        <div
          className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-transparent shrink-0"
          style={{
            backgroundColor:
              project.dotColor === "bg-emerald-400"
                ? "#34d399"
                : project.dotColor === "bg-amber-400"
                  ? "#fbbf24"
                  : "#38bdf8",
          }}
        />
        {index < projects.length - 1 && (
          <div className="flex-1 w-px mt-2 min-h-16 bg-gradient-to-b from-white/15 to-transparent" />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="flex-1 pb-8 group"
      >
        <div className="overflow-hidden border rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Card header */}
          <div className="flex flex-col gap-3 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-indigo-300">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-indigo-400">
                  {project.role}
                </p>
              </div>
              <StatusBadge
                status={project.status}
                color={project.statusColor}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {project.period}
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 size={12} />
                {project.type}
              </span>
            </div>
          </div>

          {/* Expandable description */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 px-5 pb-5">
                  {/* Divider */}
                  <div className="w-full h-px rounded-full bg-white/8" />

                  <p className="text-sm leading-relaxed text-white/75">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <TechPill key={t} label={t} />
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/8 border border-white/12 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200"
                      >
                        <Github size={13} />
                        GitHub
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/35 transition-all duration-200"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <button
            onClick={() => setExpanded((p) => !p)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-white/40 hover:text-white/70 border-t border-white/8 transition-colors duration-200"
          >
            {expanded ? (
              <>
                <ChevronUp size={13} /> Show Less
              </>
            ) : (
              <>
                <ChevronDown size={13} /> Show Details
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────
const Experience = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col max-w-2xl gap-8 px-1 py-2 mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp(0)} className="flex flex-col gap-1.5">
        <h2 className="text-3xl font-bold text-white">Experience</h2>
        <p className="text-base text-white/60">
          My hands-on journey through personal projects and society work.
        </p>
      </motion.div>

      {/* ── Open-to-Work Banner ── */}
      <motion.div
        variants={fadeUp(0.08)}
        className="relative p-5 overflow-hidden border rounded-2xl border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"
      >
        {/* subtle glow */}
        <div className="absolute w-40 h-40 rounded-full pointer-events-none -top-10 -right-10 bg-indigo-500/20 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 text-indigo-400 border rounded-xl bg-indigo-500/20 border-indigo-500/30 shrink-0">
            <Sparkles size={18} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              Open to Internships &amp; Opportunities
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-white/65">
              I'm a BTech CS student (2023–2027) actively looking for my{" "}
              <strong className="text-white/85">first internship</strong>. While
              I haven't had a formal office role yet, I've built real full-stack
              products end-to-end and am eager to contribute to a team, learn
              fast, and grow professionally.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        variants={fadeUp(0.14)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      {/* Stats row */}
      <motion.div variants={fadeUp(0.16)} className="grid grid-cols-3 gap-3">
        {[
          {
            icon: Star,
            value: "0",
            label: "Internships",
            color: "text-amber-400",
            bg: "bg-amber-500/10  border-amber-500/20",
          },
          {
            icon: Briefcase,
            value: "Seeking",
            label: "Status",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
          },
        ].map(({ icon: Icon, value, label, color, bg }, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.18 + i * 0.06)}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className={`flex flex-col items-center justify-center gap-1.5 px-2 py-4 rounded-xl border ${bg} backdrop-blur-sm`}
          >
            <Icon size={18} className={color} />
            <span className={`text-xl font-bold ${color}`}>{value}</span>
            <span className="text-xs tracking-wide text-white/50">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div
        variants={fadeUp(0.26)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      {/* Project Timeline */}
      <motion.div variants={fadeUp(0.3)} className="flex flex-col gap-2">
        <h3 className="mb-3 text-xl font-semibold text-white">
          Project Timeline
        </h3>
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;
