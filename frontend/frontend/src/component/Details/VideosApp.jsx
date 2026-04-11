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

  // Filter only videos from global media context
  const videoFiles = capturedMedia.filter((item) => item.type === "video");

  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0, x: 180, y: 120 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: isMaximized ? "100vw" : "800px",
        height: isMaximized ? "calc(100vh - 32px)" : "550px",
        top: isMaximized ? "32px" : "0px",
        left: isMaximized ? "0px" : "15%",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${isMaximized ? "rounded-none" : "rounded-xl"}`}
    >
      {/* Header Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[48px] z-20 select-none"
      >
        <div className="flex items-center gap-4">
          {selectedVideo && (
            <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-2 p-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-semibold text-white/90">
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <span className="text-xs font-semibold text-white/90 truncate max-w-[250px] pointer-events-none">
            {selectedVideo ? selectedVideo.title : "Videos"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => minimizeWindow(windowId)} className="p-1 px-3 text-white/40 hover:bg-white/5 rounded-md"><Minus size={14} /></button>
          <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 px-3 text-white/40 hover:bg-white/5 rounded-md">
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button onClick={handleClose} className="p-1 px-3 text-white bg-red-500/80 hover:bg-red-500 rounded-md"><X size={14} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar bg-[#121212]">
        <AnimatePresence mode="wait">
          {!selectedVideo ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {videoFiles.length > 0 ? (
                videoFiles.map((video) => (
                  <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
                ))
              ) : (
                <div className="col-span-full h-64 flex flex-col items-center justify-center text-white/20 gap-4">
                   <div className="p-6 bg-white/5 rounded-full"><Film size={48} /></div>
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
                <div className="flex-1 w-full flex items-center justify-center p-4">
                   <video src={selectedVideo.url} controls autoPlay className="max-w-full max-h-full rounded-lg shadow-2xl" />
                </div>

                <div className="h-[60px] px-8 flex items-center justify-between bg-white/5 backdrop-blur-md border-t border-white/5">
                    <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{selectedVideo.date}</span>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-white/40 hover:text-white transition-colors"><Share2 size={18}/></button>
                        <button className="p-2 text-white/40 hover:text-white transition-colors"><Info size={18}/></button>
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <button 
                          onClick={() => { deleteMedia(selectedVideo.id); setSelectedVideo(null); }}
                          className="p-2 text-red-500/80 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18}/>
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
    className="aspect-video relative group bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-white/5 shadow-2xl"
  >
    <div className="w-full h-full flex items-center justify-center bg-black/40">
       <div className="w-14 h-14 bg-white/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-black/40">
          <PlayCircle size={32} className="text-white fill-white ml-0.5" />
       </div>
    </div>
    
    <div className="absolute top-3 right-3 px-2 py-0.5 bg-red-600 rounded text-[9px] font-black text-white uppercase tracking-tighter shadow-lg">REC</div>

    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
      <span className="text-xs font-bold text-white truncate block">{video.title}</span>
      <span className="text-[10px] text-white/30">{video.date}</span>
    </div>
  </motion.div>
));

export default memo(VideosApp);
