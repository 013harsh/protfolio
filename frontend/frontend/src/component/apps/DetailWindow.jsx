import React, { useState, useCallback, memo, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2, Minus, Info } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";

/**
 * Reusable Window Wrapper for Detail Pages
 * Wraps any component (About, Skills, etc.) in a classic GNOME window.
 */

const DetailWindow = ({ windowId, metadata, children }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      whileDrag={{ scale: 1.01, zIndex: 100 }}
      initial={{ scale: 0.95, opacity: 0, x: 150, y: 100 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: isMaximized ? "100vw" : "750px",
        height: isMaximized ? "calc(100vh - 32px)" : "550px",
        top: isMaximized ? "32px" : "0px",
        left: isMaximized ? "0px" : "15%",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      {/* Title Bar (The Drag Handle) */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[48px] z-20 select-none"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pointer-events-none">
            <div className="p-1.5 bg-blue-500/20 rounded-md">
              <Info size={14} className="text-blue-400" />
            </div>
            <span className="text-xs font-semibold text-white/90 truncate max-w-[200px]">
              {metadata.title || "Details"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMinimize}
            className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
            title="Minimize"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={toggleMaximize}
            className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={handleClose}
            className="p-1 px-3 text-white transition-colors rounded-md bg-red-500/80 hover:bg-red-500"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#1a1a1a] p-6 text-white/90 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};

export default memo(DetailWindow);
