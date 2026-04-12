import { motion } from "framer-motion";
import { Briefcase, Sparkles, Star } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

const Experience = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full max-w-2xl gap-6 px-1 py-2 mx-auto sm:gap-8"
    >
      <motion.div variants={fadeUp(0)} className="flex flex-col gap-1.5">
        <h2 className="text-3xl font-bold text-white">Experience</h2>
        <p className="text-base text-white/60">
          My hands-on journey through personal projects and society work.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp(0.08)}
        className="relative p-5 overflow-hidden border rounded-2xl border-indigo-500/30 bg-indigo -500/10 backdrop-blur-sm"
      >
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

      <motion.div
        variants={fadeUp(0.14)}
        className="w-full h-px rounded-full bg-gradient-to-r from-white to-transparent"
      />

      <motion.div
        variants={fadeUp(0.16)}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
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
    </motion.div>
  );
};

export default Experience;
