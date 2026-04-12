import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Minus,
  ChevronLeft,
  PlayCircle,
  Share2,
  Trash2,
  Info,
  Film,
} from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import { useMediaContext } from "../../context/MediaContext";
import useScreenSize from "../../hooks/useScreenSize";

/**
 * Videos Application
 * Specialized for viewing captured recordings.
 */

const VideosApp = ({ windowId }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const { capturedMedia, deleteMedia } = useMediaContext();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();
  const forceFullscreen = isMobile;

  const getWindowSize = () => {
    if (isMobile)
      return {
        width: "100vw",
        height: "calc(100vh - 32px)",
        top: "32px",
        left: "0px",
      };
    if (isTablet)
      return {
        width: "min(800px, 96vw)",
        height: "min(550px, 88vh)",
        top: "36px",
        left: "2vw",
      };
    return { width: "800px", height: "550px", top: "0px", left: "15%" };
  };
  const windowSize = getWindowSize();

  // Filter only videos from global media context
  const videoFiles = capturedMedia.filter((item) => item.type === "video");

  const handleClose = useCallback(
    () => closeWindow(windowId),
    [closeWindow, windowId],
  );

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{
        scale: 0.95,
        opacity: 0,
        x: isMobile ? 0 : 180,
        y: isMobile ? 0 : 120,
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
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"}`}
    >
      {/* Header Bar */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[48px] z-20 select-none"
      >
        <div className="flex items-center gap-4">
          {selectedVideo && (
            <button
              onClick={() => setSelectedVideo(null)}
              className="flex items-center gap-2 p-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-semibold text-white/90"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <span className="text-xs font-semibold text-white/90 truncate max-w-[250px] pointer-events-none">
            {selectedVideo ? selectedVideo.title : "Videos"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={() => minimizeWindow(windowId)}
              className="p-1 px-3 rounded-md text-white/40 hover:bg-white/5"
            >
              <Minus size={14} />
            </button>
          )}
          {!isMobile && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 px-3 rounded-md text-white/40 hover:bg-white/5"
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1 px-3 text-white rounded-md bg-red-500/80 hover:bg-red-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar bg-[#121212]">
        <AnimatePresence mode="wait">
          {!selectedVideo ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 gap-4 p-4 sm:p-6 sm:grid-cols-2 md:grid-cols-3 sm:gap-6"
            >
              {videoFiles.length > 0 ? (
                videoFiles.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-4 col-span-full text-white/20">
                  <div className="p-6 rounded-full bg-white/5">
                    <Film size={48} />
                  </div>
                  <p className="text-sm font-medium">No video recordings yet</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col bg-black"
            >
              <div className="flex items-center justify-center flex-1 w-full p-4">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg shadow-2xl"
                />
              </div>

              <div className="h-[60px] px-8 flex items-center justify-between bg-white/5 backdrop-blur-md border-t border-white/5">
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  {selectedVideo.date}
                </span>
                <div className="flex items-center gap-4">
                  <button className="p-2 transition-colors text-white/40 hover:text-white">
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 transition-colors text-white/40 hover:text-white">
                    <Info size={18} />
                  </button>
                  <div className="w-px h-6 mx-2 bg-white/10" />
                  <button
                    onClick={() => {
                      deleteMedia(selectedVideo.id);
                      setSelectedVideo(null);
                    }}
                    className="p-2 transition-colors text-red-500/80 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const VideoCard = memo(({ video, onClick }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative overflow-hidden border shadow-2xl cursor-pointer aspect-video group bg-white/5 rounded-xl border-white/5"
  >
    <div className="flex items-center justify-center w-full h-full bg-black/40">
      <div className="flex items-center justify-center transition-transform border rounded-full shadow-2xl w-14 h-14 bg-white/20 backdrop-blur-xl border-white/10 group-hover:scale-110 shadow-black/40">
        <PlayCircle size={32} className="text-white fill-white ml-0.5" />
      </div>
    </div>

    <div className="absolute top-3 right-3 px-2 py-0.5 bg-red-600 rounded text-[9px] font-black text-white uppercase tracking-tighter shadow-lg">
      REC
    </div>

    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
      <span className="block text-xs font-bold text-white truncate">
        {video.title}
      </span>
      <span className="text-[10px] text-white/30">{video.date}</span>
    </div>
  </motion.div>
));

export default memo(VideosApp);
