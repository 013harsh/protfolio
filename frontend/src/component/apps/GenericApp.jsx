import React, { memo, useCallback, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2, Minus, FolderOpen, AlertCircle } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";

/**
 * Generic Dynamic App Component
 * A fallback for any folder or system app that is empty.
 */

const GenericApp = ({ windowId, metadata }) => {
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
      initial={{ scale: 0.95, opacity: 0, x: 150, y: 150 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: isMaximized ? "100vw" : "600px",
        height: isMaximized ? "calc(100vh - 32px)" : "400px",
        top: isMaximized ? "32px" : "0px",
        left: isMaximized ? "0px" : "20%",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      {/* Title Bar (Drag Handle) */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[46px] select-none"
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <FolderOpen size={16} className="text-white/70" />
          <span className="text-xs font-semibold text-white/90">{metadata.title || "Folder"}</span>
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

      {/* Dynamic Empty Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white/20 select-none">
         <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="p-10 bg-white/5 rounded-full mb-6"
         >
            <AlertCircle size={48} className="opacity-50" />
         </motion.div>
         <h3 className="text-lg font-medium text-white/50 mb-1">
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
