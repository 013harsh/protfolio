import React, { memo, useCallback, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2, Minus, Settings, Monitor, Wifi, Bluetooth, Battery, Moon, Bell } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import useScreenSize from "../../hooks/useScreenSize";

const SettingsApp = ({ windowId, metadata }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();
  const [activeTab, setActiveTab] = useState("Display");

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  const getWindowSize = () => {
    if (isMobile) {
      return { width: "100vw", height: "calc(100vh - 32px)", top: "32px", left: "0px" };
    }
    return { width: "700px", height: "500px", top: "50px", left: "15%" };
  };

  const windowSize = getWindowSize();
  const forceFullscreen = isMobile;

  const tabs = [
    { name: "Wi-Fi", icon: <Wifi size={16} /> },
    { name: "Bluetooth", icon: <Bluetooth size={16} /> },
    { name: "Display", icon: <Monitor size={16} /> },
    { name: "Appearance", icon: <Moon size={16} /> },
    { name: "Notifications", icon: <Bell size={16} /> },
    { name: "Power", icon: <Battery size={16} /> },
  ];

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
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
          <Settings size={16} className="text-white/70" />
          <span className="text-xs font-semibold text-white/90">
            {metadata.title || "Settings"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <>
              <button onClick={toggleMinimize} className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5">
                <Minus size={14} />
              </button>
              <button onClick={toggleMaximize} className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5">
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </>
          )}
          <button onClick={handleClose} className="p-1 px-3 text-white transition-colors rounded-md bg-red-500/80 hover:bg-red-500">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!isMobile && (
          <div className="w-[180px] bg-[#242424] border-r border-white/5 py-4 flex flex-col shrink-0 overflow-y-auto">
            <div className="px-5 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">Device</div>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors text-left ${
                  activeTab === tab.name ? "bg-blue-500/20 text-blue-400" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 md:p-10 bg-[#1e1e1e] overflow-y-auto w-[1px]">
          {/* Mobile Tab Selector */}
          {isMobile && (
            <div className="mb-6 overflow-x-auto no-scrollbar flex gap-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 px-4 py-2 shrink-0 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab.name ? "bg-blue-500 text-white" : "bg-white/5 text-white/60"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          )}

          <h2 className="text-2xl font-semibold text-white mb-8">{activeTab}</h2>

          {activeTab === "Display" && (
            <div className="flex flex-col gap-6 max-w-lg">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80">Brightness</label>
                <input type="range" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Night Light</span>
                  <span className="text-xs text-white/50">Reduces blue light at night</span>
                </div>
                <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "Display" && (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
              <Settings size={48} className="text-white/10 mb-4" />
              <h3 className="text-lg font-medium text-white/50">Settings for {activeTab}</h3>
              <p className="text-sm text-white/30 max-w-sm mt-2">
                This is a mock settings panel. Options here are not functional in this portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(SettingsApp);
