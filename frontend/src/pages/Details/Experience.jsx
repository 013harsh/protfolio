import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calendar,
  MapPin,
  ChevronLeft,
  CodeXml,
  Target,
  Zap,
  Code,
  FileText,
  FileBadge,
  ExternalLink,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

/* 
=============================================================================
  HOW TO ADD A NEW INTERNSHIP OR EXPERIENCE:
  1. Copy one of the objects inside the `experiences` array (from { to },).
  2. Paste it below or above the existing ones.
  3. Change the `id` to a unique number.
  4. Fill in your new details (title, company, dates, etc.).
  5. If you have a logo image in your public folder, put the exact path in `logo` 
     (e.g., logo: "/policybazaar.png"). If logo is null, it uses the fallback icon.
=============================================================================
*/
const experiences = [
  {
    id: 1,
    title: "Trainee Technology Intern (Backend Developer)",
    company: "Policybazaar for Business",
    employmentType: "Internship",
    dateRange: "Jun 2026 - Aug 2026",
    duration: "3 mos",
    location: "Gurugram, Haryana, India",
    locationType: "On-site",
    logo: "/pbfblogo.png",
    icon: <Building2 size={24} className="text-white/80" />,

    // Details shown when clicked
    points: [
      "Building backend features using .NET, C#, and MSSQL, following Agile workflows with task tracking in Jira and team communication via Slack.",
      "Managing version control and CI/CD pipelines using Bitbucket and Jenkins, developing primarily in Visual Studio 2022.",
      "Testing and debugging REST APIs using cURL and browser DevTools (Network tab) to trace requests and diagnose issues.",
      "Leveraging AI-assisted tools (Kiro/ChatGPT/Claude) to accelerate code review, debugging, and documentation, improving development efficiency.",
      "Gaining hands-on exposure to Meta for Business tools alongside core backend development.",
    ],
    technologies: [
      "C#",
      ".NET",
      "MSSQL",
      "Rest API",
      "Jenkins",
      "Jira",
      "Git Bash",
      "Slack",
    ],
    offerLetter: "/offerletter.pdf",
    completionLetter: "/Harshkumarcomplection-letter.pdf",
    projectLink: "https://sme.policybazaar.com/",
  },
  // ADD NEW EXPERIENCES HERE...
];

const leadership = [];

// ================= LIST VIEW =================

const ExperienceItem = ({ exp, delay, onClick }) => {
  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      animate="visible"
      className="flex gap-4 p-3 -mx-3 transition-all border border-transparent cursor-pointer sm:gap-5 group sm:p-5 sm:-mx-5 rounded-2xl hover:bg-white/5 hover:border-white/10"
      onClick={onClick}
    >
      {/* Logo/Icon block */}
      <div className="mt-1 shrink-0">
        {exp.logo ? (
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] object-cover rounded-sm"
          />
        ) : (
          <div className="flex items-center justify-center w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-sm border border-white/10 bg-white/5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
            {exp.icon}
          </div>
        )}
      </div>

      {/* Content block - LinkedIn Style */}
      <div className="flex items-start justify-between flex-1">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[17px] sm:text-[19px] font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors">
            {exp.title}
          </h3>
          <p className="text-[15px] text-white/90 leading-snug">
            {exp.company} {exp.employmentType && `· ${exp.employmentType}`}
          </p>
          <p className="text-sm leading-snug text-white/50">
            {exp.dateRange} {exp.duration && `· ${exp.duration}`}
          </p>
          <p className="text-sm leading-snug text-white/50">
            {exp.location} {exp.locationType && `· ${exp.locationType}`}
          </p>
        </div>

        {/* Chevron on the right */}
        <div className="hidden mt-2 transition-colors text-white/20 group-hover:text-white/60 sm:block">
          <ChevronLeft size={20} className="rotate-180" />
        </div>
      </div>
    </motion.div>
  );
};

// ================= DETAILS VIEW =================

const ExperienceDetailsView = ({ experience, onBack }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col w-full max-w-4xl gap-6 px-1 py-2 pb-12 mx-auto"
    >
      <button
        onClick={onBack}
        className="z-20 flex items-center gap-2 px-4 py-2 mb-2 text-sm font-medium transition-colors bg-white/5 hover:bg-white/10 rounded-xl w-fit text-white/80"
      >
        <ChevronLeft size={16} /> Back to Experience
      </button>

      {/* Header Banner */}
      <motion.div
        variants={itemVariants}
        className="relative w-full h-48 overflow-hidden border rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-indigo-900/40 border-white/10"
      >
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/30 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/30 blur-[90px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 flex items-center p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="flex flex-col gap-2 mt-auto">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-fit px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full backdrop-blur-md border shadow-lg text-indigo-300 bg-indigo-500/20 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              Experience Details
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Card (overlapping banner) */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 mx-2 sm:mx-8 -mt-20 border bg-black/50 backdrop-blur-2xl rounded-3xl border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="flex items-center gap-5">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="flex items-center justify-center w-16 h-16 overflow-hidden text-white border shadow-xl shrink-0 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br border-white/20 from-indigo-500 via-purple-500 to-pink-500 shadow-indigo-500/20"
            >
              {experience.logo ? (
                <img
                  src={experience.logo}
                  alt={experience.company}
                  className="object-cover w-full h-full"
                />
              ) : (
                experience.icon
              )}
            </motion.div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-extrabold text-transparent sm:text-2xl bg-clip-text bg-gradient-to-r from-white to-white/60">
                {experience.title}
              </h1>
              <p className="text-lg font-semibold text-indigo-400">
                {experience.company}
              </p>
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-3 md:flex-col md:items-end">
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium border shadow-inner text-white/80 bg-white/5 rounded-xl border-white/10">
              <Calendar size={16} className="text-indigo-400" />
              <span>{experience.dateRange}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium border shadow-inner text-white/80 bg-white/5 rounded-xl border-white/10">
              <MapPin size={16} className="text-emerald-400" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div>
              <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-white">
                <Target size={20} className="text-pink-400" />
                Impact & Responsibilities
              </h3>

              <div className="flex flex-col gap-4">
                {experience.points.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      x: 8,
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-start gap-4 p-4 transition-colors border rounded-2xl border-white/5 bg-white/[0.02]"
                  >
                    <div className="p-1.5 mt-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)] shrink-0">
                      <Zap size={16} />
                    </div>
                    <span className="text-base leading-relaxed text-white/85">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Action Buttons */}
            {(experience.offerLetter ||
              experience.completionLetter ||
              experience.projectLink) && (
              <div className="flex flex-col gap-3">
                {experience.offerLetter && (
                  <motion.a
                    href={experience.offerLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)] cursor-pointer w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileBadge size={24} className="shrink-0" />
                    <span className="font-semibold">Offer Letter</span>
                  </motion.a>
                )}

                {experience.completionLetter && (
                  <motion.a
                    href={experience.completionLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText size={24} className="shrink-0" />
                    <span className="font-semibold">Completion Letter</span>
                  </motion.a>
                )}

                {experience.projectLink && (
                  <motion.a
                    href={experience.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-sky-500/20 to-blue-500/10 border border-sky-500/30 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.15)] cursor-pointer w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink size={24} className="shrink-0" />
                    <span className="font-semibold">Company Website</span>
                  </motion.a>
                )}
              </div>
            )}

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5">
              <h3 className="flex items-center gap-2 mb-5 text-xl font-bold text-white">
                <Code size={20} className="text-emerald-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-sm font-semibold border rounded-lg bg-white/5 border-white/10 text-white/80 shadow-sm cursor-default transition-all hover:bg-white/10 hover:border-white/20"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <AnimatePresence mode="wait">
        {selectedExperience ? (
          <ExperienceDetailsView
            key="details"
            experience={selectedExperience}
            onBack={() => setSelectedExperience(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="w-full max-w-4xl px-4 py-8 mx-auto sm:px-8 sm:py-16"
          >
            <motion.div variants={fadeUp(0)} className="mb-14">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Experience
              </h1>
              <p className="max-w-xl mt-4 text-lg leading-relaxed text-white/60">
                Building innovative solutions and leading development teams
                across various domains.
              </p>
            </motion.div>

            <div className="flex flex-col gap-2">
              {experiences.map((exp, index) => (
                <ExperienceItem
                  key={exp.id}
                  exp={exp}
                  delay={0.1 + index * 0.1}
                  onClick={() => setSelectedExperience(exp)}
                />
              ))}
            </div>

            {leadership.length > 0 && (
              <>
                <motion.div variants={fadeUp(0.4)} className="mt-16 mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Leadership & Activities
                  </h2>
                </motion.div>

                <div className="flex flex-col gap-2">
                  {leadership.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={fadeUp(0.5 + index * 0.1)}
                      className="flex gap-4 p-3 -mx-3 border sm:gap-5 sm:p-5 sm:-mx-5 rounded-2xl bg-white/5 border-white/10"
                    >
                      <div className="mt-1 shrink-0">
                        <div className="flex items-center justify-center w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-sm border border-white/10 bg-black/40">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[17px] sm:text-[19px] font-bold text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[15px] text-white/90 leading-snug mt-0.5">
                          {item.company}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
