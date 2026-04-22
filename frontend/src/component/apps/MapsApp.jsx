import React, { memo, useCallback, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2, Minus, Map as MapIcon } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import useScreenSize from "../../hooks/useScreenSize";

const MapsApp = ({ windowId, metadata }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  const getWindowSize = () => {
    if (isMobile) {
      return { width: "100vw", height: "calc(100vh - 32px)", top: "32px", left: "0px" };
    }
    if (isTablet) {
      return { width: "min(700px, 92vw)", height: "min(500px, 80vh)", top: "40px", left: "4vw" };
    }
    return { width: "800px", height: "550px", top: "50px", left: "10%" };
  };

  const windowSize = getWindowSize();
  const forceFullscreen = isMobile;

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 0 : 50 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: forceFullscreen || isMaximized ? "100vw" : windowSize.width,
        height: forceFullscreen || isMaximized ? "calc(100vh - 32px)" : windowSize.height,
        top: forceFullscreen || isMaximized ? "32px" : windowSize.top,
        left: forceFullscreen || isMaximized ? "0px" : windowSize.left,
        x: forceFullscreen || isMaximized ? 0 : undefined,
        y: forceFullscreen || isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      <div
        onPointerDown={(e) => !forceFullscreen && dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[46px] select-none"
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <MapIcon size={16} className="text-white/70" />
          <span className="text-xs font-semibold text-white/90">
            {metadata.title || "Maps"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <>
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
            </>
          )}
          <button
            onClick={handleClose}
            className="p-1 px-3 text-white transition-colors rounded-md bg-red-500/80 hover:bg-red-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 w-full h-full bg-[#e5e3df]">
        <iframe
          title="Delhi Map"
          src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004978802!2d77.04417109553139!3d28.527218143224976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1714417056088!5m2!1sen!2sin'}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
};

export default memo(MapsApp);
