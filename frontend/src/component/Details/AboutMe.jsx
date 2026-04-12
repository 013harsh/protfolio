import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Mail,
  Trophy,
  Dot,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  },
});

const education = [
  {
    degree: "Bachelor of Technology — Computer Science",
    institution: "Guru Tegh Bahadur 4th Centenary Engineering College",
    period: "2023–2027",
    marks: "CGPA: 7.45 || GGSIPU,Delhi",
    desc: "Focused on software engineering, algorithms, and modern web technologies. Active participant in hackathons and coding competitions.",
  },
  {
    degree: "Higher Secondary (XII) — Science",
    institution: "Thukral Public Sr. Sec. School, Loharu",
    period: "2021–2022",
    marks: "Percentage: 70% || CBSE,Haryana",
    desc: "Graduated with distinction. Introduced to programming through Python and C++, which sparked a passion for software development.",
  },
];

const achievements = [
  {
    title:
      "Badminton captain at 𝙁𝙄𝙀𝙍𝘾𝙀 𝙁𝘼𝙇𝘾𝙊𝙉𝙎, the official society of GTB4CEC",
  },
  {
    title: "Graphic Designer at tech society of GTB4CEC",
  },
];

const AboutMe = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full max-w-2xl gap-6 px-1 py-2 mx-auto sm:gap-8"
    >
      <motion.div
        variants={fadeUp(0.5)}
        className="relative flex flex-col items-start w-36"
      >
        <div
          className="absolute pointer-events-none -top-1 -bottom-1 -left-1 -right-1 rounded-2xl"
          style={{
            border: "2px solid white",
          }}
        />
        <motion.img
          src="/harsh.jpeg"
          alt="Harsh Kumar"
          className="relative z-10 object-cover border border-white shadow-2xl w-36 h-36 rounded-2xl"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        />
      </motion.div>

      <motion.div variants={fadeUp(0.1)} className="flex flex-col gap-1.5">
        <h1
          className="font-sans text-4xl font-bold leading-tight text-transparent sm:text-5xl lg:text-6xl bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #ffffff 30%, rgba(255,255,255,0.45))",
          }}
        >
          Harsh Kumar
        </h1>

        <p className="text-base font-semibold tracking-widest text-indigo-400 uppercase">
          Full Stack Developer
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-base text-white/80">
            <MapPin size={14} className="shrink-0" />
            New Delhi, India
          </span>
          <span className="flex items-center gap-1.5 text-base text-white/80">
            <Mail size={14} className="shrink-0" />
            <a href="mailto:hkaggarwal013@gmail.com">hkaggarwal013@gmai.com</a>
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-base text-white/80">
          <a href="https://github.com/013harsh">
            <img src="/github.svg" alt="" width={30} height={30} />
          </a>
          <a href="https://www.linkedin.com/in/harsh-kumar-b1ab9b272/">
            <img src="/linkedin.svg" alt="" width={30} height={30} />
          </a>
          <a href="https://www.instagram.com/hkaggarwal013">
            <img src="/instagram.svg" alt="" width={30} height={30} />
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp(0.18)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      <motion.div variants={fadeUp(0.22)} className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-white ">About Me</h2>
        <p className="text-base text-white/80">
          I am a passionate developer who enjoys creating meaningful digital
          experiences and turning ideas into real-world projects. I like
          building solutions that are simple, efficient, and easy for people to
          use. I am always curious to learn new things, improve my thinking and
          problem-solving ability, and continue growing as a developer while
          working on projects that make a real impact.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp(0.3)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      {/* Stats Row */}
      <motion.div
        variants={fadeUp(0.2)}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { value: "17+", label: "Projects" },
          { value: "0", label: "Internships" },
          { value: "7.45", label: "CGPA" },
          { value: "15+", label: "Tech Stack" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.22 + i * 0.07)}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col items-center justify-center gap-1 px-2 py-4 border rounded-xl border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="text-2xl font-bold text-indigo-400">
              {stat.value}
            </span>
            <span className="text-xs tracking-wide text-white/60">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp(0.3)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      <motion.div variants={fadeUp(0.34)} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-white">Education</h2>

        <div className="flex flex-col">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={fadeUp(0.38 + i * 0.1)}
              className="flex items-start gap-5"
            >
              <div className="flex flex-col items-center shrink-0 pt-0.5">
                <div className="flex items-center justify-center w-8 h-8 border rounded-xl bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                  <GraduationCap size={14} />
                </div>
                {i < education.length - 1 && (
                  <div className="flex-1 w-px my-2 min-h-8 bg-gradient-to-b from-emerald-400/25 to-transparent" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 pb-7">
                <h3 className="text-base font-bold leading-snug text-white">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-indigo-400">
                  {edu.institution}
                </p>
                <span className="flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <Calendar size={14} />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-white/80">
                  {edu.marks}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        variants={fadeUp(0.44)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      {/* Achievements Section */}
      <motion.div variants={fadeUp(0.48)} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-white">Achievements</h2>

        <div className="flex flex-col">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              variants={fadeUp(0.52 + i * 0.1)}
              className="flex items-start gap-5"
            >
              <div className="flex flex-col items-center shrink-0 pt-0.5">
                <div className="flex items-center justify-center w-8 h-8 border rounded-xl">
                  <Dot size={100} />
                </div>
                {i < achievements.length - 1 && (
                  <div className="flex-1 w-px my-2 min-h-8 bg-gradient-to-b from-amber-400/25 to-transparent" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 pb-7">
                <h3 className="text-base leading-snug text-white/80">
                  {ach.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
