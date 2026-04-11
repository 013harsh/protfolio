import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Minus,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  Home,
  Folder,
  LayoutGrid,
} from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";

/**
 * Optimized Dynamic Files Application
 * A truly empty, name-driven file explorer.
 */

const FilesApp = ({ windowId, metadata }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(
    () => minimizeWindow(windowId),
    [minimizeWindow, windowId],
  );
  const handleClose = useCallback(
    () => closeWindow(windowId),
    [closeWindow, windowId],
  );

  const currentPath = metadata.title || "Home";

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={{ top: 32, left: 0, right: 0, bottom: 0 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: isMaximized ? "100vw" : "600px",
        height: isMaximized ? "calc(100vh - 32px)" : "450px",
        top: isMaximized ? "32px" : "0px",
        left: isMaximized ? "0px" : "15%",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      {/* Dynamic Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[46px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5 disabled:opacity-20"
              disabled
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5 disabled:opacity-20"
              disabled
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center px-4 py-1.5 bg-white/5 border border-white/5 rounded-md text-xs font-semibold text-white/90 gap-2">
            <Home size={14} className="opacity-60" />
            <span>{currentPath}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 mr-4">
            <button className="p-2 rounded-md text-white/40 hover:bg-white/5">
              <Search size={16} />
            </button>
            <button className="p-2 rounded-md text-white/40 hover:bg-white/5">
              <LayoutGrid size={16} />
            </button>
            <button className="p-2 rounded-md text-white/40 hover:bg-white/5">
              <Menu size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMinimize}
              className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={toggleMaximize}
              className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 px-3 text-white transition-colors rounded-md bg-red-500/80 hover:bg-red-500"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Empty Content Sidebar */}
        <div className="w-[180px] bg-[#242424] border-r border-white/5 py-4 flex flex-col gap-1">
          <div className="px-6 py-2 text-[11px] font-bold text-white/20 uppercase tracking-widest mb-2">
            Places
          </div>
          <div className="flex items-center gap-3 px-4 py-2 text-[13px] text-white/60 hover:bg-white/5 cursor-pointer transition-all">
            <Folder size={16} className="opacity-40" />
            Recent
          </div>
          <div className="flex items-center gap-3 px-4 py-2 text-[13px] text-white/100 bg-white/10 font-medium cursor-default">
            <Home size={16} className="opacity-60" />
            {currentPath}
          </div>
        </div>

        {/* Empty Grid Main Area */}
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center text-white/10">
          <div className="p-8 mb-4 border rounded-full bg-white/5 border-white/5">
            <Folder size={48} className="opacity-30" />
          </div>
          <h3 className="text-sm font-medium text-white/40">Folder is empty</h3>
          <p className="text-[12px] opacity-40 mt-1 max-w-[200px]">
            No files or folders were found in this directory.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(FilesApp);
