import React, { useState, useCallback, memo } from "react";
import { motion, useDragControls } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Minus,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
} from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import useScreenSize from "../../hooks/useScreenSize";

/**
 * Web Browser Application (Chrome-style)
 */

const BrowserApp = ({ windowId, metadata }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();

  const defaultUrl = metadata.url || "https://www.google.com/search?igu=1";
  const displayUrl = metadata.displayUrl || "google.com";

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  const forceFullscreen = isMobile;

  const getWindowSize = () => {
    if (isMobile) {
      return { width: "100vw", height: "calc(100vh - 32px)", top: "32px", left: "0px" };
    }
    if (isTablet) {
      return { width: "min(1000px, 96vw)", height: "min(700px, 88vh)", top: "36px", left: "2vw" };
    }
    return { width: "1000px", height: "700px", top: "0px", left: "10%" };
  };

  const windowSize = getWindowSize();

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      whileDrag={{ scale: 1.01, zIndex: 100 }}
      initial={{ scale: 0.95, opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 0 : 50 }}
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
      {/* Browser Tool Bar */}
      <div
        onPointerDown={(e) => !forceFullscreen && dragControls.start(e)}
        className="px-3 sm:px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          {/* Tab Control Mockup */}
          <div className="flex items-center gap-1 bg-[#1e1e1e] px-2 sm:px-3 py-1.5 rounded-t-lg border-t border-x border-white/10 max-w-[120px] sm:max-w-[160px]">
            <img src="/scalable/places/chrome-svgrepo-com.svg" className="w-3.5 h-3.5 shrink-0" alt="chrome" />
            <span className="text-[10px] text-white/80 truncate font-medium">New Tab</span>
            <X size={10} className="ml-2 text-white/30 hover:text-white shrink-0" />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {!isMobile && (
              <button
                onClick={() => minimizeWindow(windowId)}
                className="p-1 px-2 sm:px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
              >
                <Minus size={14} />
              </button>
            )}
            <button
              onClick={toggleMaximize}
              className="p-1 px-2 sm:px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 px-2 sm:px-3 text-white transition-colors rounded-md bg-red-500/80 hover:bg-red-500"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Address Bar Row */}
        <div className="flex items-center gap-2 sm:gap-4 mb-1">
          {!isMobile && (
            <div className="flex items-center gap-2 text-white/40">
              <ChevronLeft size={16} />
              <ChevronRight size={16} />
              <RotateCw size={14} />
            </div>
          )}

          <div className="flex-1 flex items-center bg-[#1a1a1a] border border-white/10 rounded-full px-3 sm:px-4 py-1 gap-2">
            <Lock size={12} className="text-green-500/60 shrink-0" />
            <span className="text-[12px] text-white/40 flex-1 truncate">{displayUrl}</span>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-2 text-white/40">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full border border-blue-500/20" />
            </div>
          )}
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white relative">
        <iframe
          src={defaultUrl}
          className="w-full h-full border-none"
          title="browser-content"
        />
      </div>
    </motion.div>
  );
};

export default memo(BrowserApp);
