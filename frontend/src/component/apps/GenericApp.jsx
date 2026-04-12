import React, { memo, useCallback, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Minus,
  FolderOpen,
  AlertCircle,
} from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import useScreenSize from "../../hooks/useScreenSize";

/**
 * Generic Dynamic App Component
 * A fallback for any folder or system app that is empty.
 */

const GenericApp = ({ windowId, metadata }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(
    () => minimizeWindow(windowId),
    [minimizeWindow, windowId],
  );
  const handleClose = useCallback(
    () => closeWindow(windowId),
    [closeWindow, windowId],
  );

  // Responsive window dimensions
  const getWindowSize = () => {
    if (isMobile) {
      return {
        width: "100vw",
        height: "calc(100vh - 32px)",
        top: "32px",
        left: "0px",
      };
    }
    if (isTablet) {
      return {
        width: "min(600px, 92vw)",
        height: "min(400px, 80vh)",
        top: "40px",
        left: "4vw",
      };
    }
    return {
      width: "600px",
      height: "400px",
      top: "0px",
      left: "20%",
    };
  };

  const windowSize = getWindowSize();
  const forceFullscreen = isMobile;

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{
        scale: 0.95,
        opacity: 0,
        x: isMobile ? 0 : 150,
        y: isMobile ? 0 : 150,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        width: forceFullscreen || isMaximized ? "100vw" : windowSize.width,
        height:
          forceFullscreen || isMaximized
            ? "calc(100vh - 32px)"
            : windowSize.height,
        top: forceFullscreen || isMaximized ? "32px" : windowSize.top,
        left: forceFullscreen || isMaximized ? "0px" : windowSize.left,
        x: forceFullscreen || isMaximized ? 0 : undefined,
        y: forceFullscreen || isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      {/* Title Bar (Drag Handle) */}
      <div
        onPointerDown={(e) => !forceFullscreen && dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[46px] select-none"
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <FolderOpen size={16} className="text-white/70" />
          <span className="text-xs font-semibold text-white/90">
            {metadata.title || "Folder"}
          </span>
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

      {/* Dynamic Empty Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-8 text-center select-none text-white/20">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="p-10 mb-6 rounded-full bg-white/5"
        >
          <AlertCircle size={48} className="opacity-50" />
        </motion.div>
        <h3 className="mb-1 text-lg font-medium text-white/50">
          {metadata.title} is empty
        </h3>
        <p className="max-w-[200px] text-sm leading-relaxed">
          No files or folders found.
        </p>
      </div>
    </motion.div>
  );
};

export default memo(GenericApp);
