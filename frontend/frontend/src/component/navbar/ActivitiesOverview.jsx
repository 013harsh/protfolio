import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Search } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";

const ActivitiesOverview = ({ isOpen, onClose }) => {
  const { openApp } = useWindowContext();
  const [activeToggle, setActiveToggle] = useState("all");

  const apps = [
    {
      name: "Photos",
      icon: <img src="/scalable/mimetypes/image-x-generic.svg" alt="Photos" />,
    },
    {
      name: "Videos",
      icon: <img src="/scalable/mimetypes/video-x-generic.svg" alt="Videos" />,
    },
    {
      name: "Contacts",
      icon: <img src="/scalable/status/avatar-default.svg" alt="Contacts" />,
    },
    {
      name: "Camera",
      icon: <img src="/scalable/devices/camera-web.svg" alt="Camera" />,
    },
    {
      name: "Music",
      icon: <img src="/scalable/devices/audio-headphones.svg" alt="Music" />,
    },
    {
      name: "Clocks",
      icon: <img src="/scalable/places/clock-svgrepo-com.svg" alt="Clocks" />,
    },

    {
      name: "Maps",
      icon: <img src="/scalable/places/maps.svg" alt="Maps" />,
    },
    {
      name: "Settings",
      icon: <img src="/scalable/places/Settings_icon.svg" alt="Settings" />,
    },

    {
      name: "Terminal",
      icon: <img src="/scalable/places/Terminal.svg" alt="Terminal" />,
    },
  ];

  const dockApps = [
    {
      name: "chrome",
      icon: <img src="/scalable/places/chrome-svgrepo-com.svg" alt="Files" />,
      isRunning: true,
    },
    {
      name: "Files",
      icon: <img src="/scalable/places/folder-drag-accept.svg" alt="Files" />,
      isRunning: true,
    },
    {
      name: "Photos",
      icon: <img src="/scalable/mimetypes/image-x-generic.svg" alt="Photos" />,
      isRunning: false,
    },
    {
      name: "Terminal",
      icon: <img src="/scalable/places/Terminal.svg" alt="Terminal" />,
      isRunning: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md flex flex-col items-center"
        >
          {/* search bar */}
          <div
            className="flex justify-center w-full px-6 mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group w-full max-w-[480px]">
              <Search
                size={18}
                className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-white/30 group-focus-within:text-blue-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 bg-[#242424]/80 border border-white/5 rounded-xl pl-12 pr-4 text-[14px] text-white outline-none focus:bg-[#2d2d2d] focus:border-blue-500/50 transition-all shadow-inner"
                autoFocus
              />
            </div>
          </div>
          {/* app grid */}
          <div className="relative flex items-center justify-between flex-1 w-full px-12 overflow-hidden">
            {/* dock */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="absolute left-4 top-center -translate-y-1/2 flex flex-col gap-3 p-2 bg-white/5 border border-white/10 rounded-[16px] shadow-2xl backdrop-blur-2xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {dockApps.map((app, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, x: 14 }}
                  whileTap={{ scale: 1.05 }}
                  onClick={() => {
                    openApp(app.name);
                    onClose();
                  }}
                  className="w-14 h-14 flex flex-col items-center justify-center rounded-[12px] bg-white/0 hover:bg-white/10 transition-all cursor-pointer group relative smooth-scroll"
                >
                  <div className="flex items-center justify-center w-full h-full p-1">
                    {app.icon}
                  </div>

                  <div className="absolute left-16 px-3 py-1.5 bg-[#1a1a1a] text-white text-[12px] font-medium rounded-lg shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 pointer-events-none transition-all duration-200 whitespace-nowrap z-50">
                    {app.name}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1a1a1a] border-l border-b border-white/10 rotate-45" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* App Grid */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mx-auto w-full max-w-[1000px] grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4  gap-y-10 gap-x-10 py-20 overflow-y-auto no-scrollbar"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {apps.map((app, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.05 }}
                  onClick={() => {
                    openApp(app.name);
                    onClose();
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-[48px] h-[48px] flex items-center justify-center rounded-[24px] bg-white/5 group-hover:bg-white/10 transition-all duration-300 shadow-lg">
                    {app.icon}
                  </div>
                  <span className="mt-3 text-[13px] font-medium text-white/70 group-hover:text-white transition-colors">
                    {app.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* toggle */}
          <div
            className="flex flex-col items-center w-full gap-6 pt-4 pb-8 bg-gradient-to-t from-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex p-1 border bg-white/5 rounded-xl border-white/10">
              <button
                onClick={() => setActiveToggle("frequent")}
                className={`px-6 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeToggle === "frequent"
                    ? "bg-white/10 text-red-500"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                Frequent
              </button>

              <button
                onClick={() => setActiveToggle("all")}
                className={`px-6 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeToggle === "all"
                    ? "bg-white/10 text-red-500"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivitiesOverview;
