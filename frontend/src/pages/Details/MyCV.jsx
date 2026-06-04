import React from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  },
});

const MyCV = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full max-w-2xl gap-6 px-1 py-2 mx-auto sm:gap-8"
    >
      <motion.div variants={fadeUp(0)} className="flex flex-col gap-1.5">
        <h2 className="text-3xl font-bold text-white">My CV</h2>
        <p className="text-base text-white/60">
          Here you can view or download my resume.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp(0.1)}
        className="flex items-center gap-4 mt-2"
      >
        <a
          href="/harshkumarresume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 text-sm font-semibold text-white transition-all bg-indigo-500/80 rounded-lg hover:bg-indigo-500 border border-indigo-400/30 w-fit shadow-lg shadow-indigo-500/20"
        >
          View Resume
        </a>
        <a
          href="/harshkumarresume.pdf"
          download="Harsh_Kumar_Resume.pdf"
          className="px-6 py-2.5 text-sm font-semibold text-white transition-all border rounded-lg bg-white/5 border-white/10 hover:bg-white/10 w-fit"
        >
          Download PDF
        </a>
      </motion.div>
    </motion.div>
  );
};

export default MyCV;
