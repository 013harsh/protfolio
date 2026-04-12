import React, { useState, useCallback, memo, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2, Minus, Info } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import useScreenSize from "../../hooks/useScreenSize";

/**
 * Reusable Window Wrapper for Detail Pages
 * Wraps any component (About, Skills, etc.) in a classic GNOME window.
 */

const DetailWindow = ({ windowId, metadata, children }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  const forceFullscreen = isMobile;

  const getWindowSize = () => {
    if (isMobile) {
      return { width: "100vw", height: "calc(100vh - 32px)", top: "32px", left: "0px" };
    }
    if (isTablet) {
      return { width: "min(750px, 94vw)", height: "min(550px, 85vh)", top: "40px", left: "3vw" };
    }
    return { width: "750px", height: "550px", top: "0px", left: "15%" };
  };

  const windowSize = getWindowSize();

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      whileDrag={{ scale: 1.01, zIndex: 100 }}
      initial={{ scale: 0.95, opacity: 0, x: isMobile ? 0 : 150, y: isMobile ? 0 : 100 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: forceFullscreen || isMaximized ? "100vw" : windowSize.width,
        height: forceFullscreen || isMaximized ? "calc(100vh - 32px)" : windowSize.height,
        top: forceFullscreen || isMaximized ? "32px" : windowSize.top,
        left: forceFullscreen || isMaximized ? "0px" : windowSize.left,
        x: (forceFullscreen || isMaximized) ? 0 : undefined,
        y: (forceFullscreen || isMaximized) ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      {/* Title Bar (The Drag Handle) */}
      <div
        onPointerDown={(e) => !forceFullscreen && dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[48px] z-20 select-none"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pointer-events-none">
            <div className="p-1.5 bg-blue-500/20 rounded-md">
              <Info size={14} className="text-blue-400" />
            </div>
            <span className="text-xs font-semibold text-white/90 truncate max-w-[160px] sm:max-w-[200px]">
              {metadata.title || "Details"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={toggleMinimize}
              className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
              title="Minimize"
            >
              <Minus size={14} />
            </button>
          )}
          {!isMobile && (
            <button
              onClick={toggleMaximize}
              className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
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
      <div className="flex-1 overflow-y-auto bg-[#1a1a1a] p-3 sm:p-6 text-white/90 custom-scrollbar">
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              isMaximized: isMaximized || forceFullscreen,
            })
          : children}
      </div>
    </motion.div>
  );
};

export default memo(DetailWindow);
