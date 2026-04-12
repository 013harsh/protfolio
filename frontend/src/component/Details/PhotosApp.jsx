import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Minus,
  ChevronLeft,
  ZoomIn,
  Share2,
  Trash2,
  Info,
} from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import { useMediaContext } from "../../context/MediaContext";
import useScreenSize from "../../hooks/useScreenSize";

/**
 * Photos Gallery
 * Now refined to only show image captures and static demo photos.
 */

const DEMO_PHOTOS = [
  { id: "demo-1", type: "image", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", title: "Coding Setup", date: "Oct 12, 2023" },
  { id: "demo-2", type: "image", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", title: "Architecture", date: "Sep 28, 2023" },
  { id: "demo-3", type: "image", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", title: "Frontend Review", date: "Aug 15, 2023" },
  { id: "demo-4", type: "image", url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800", title: "Dark Workplace", date: "Jul 02, 2023" },
];

const PhotosApp = ({ windowId }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const { capturedMedia, deleteMedia } = useMediaContext();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();
  const forceFullscreen = isMobile;

  const getWindowSize = () => {
    if (isMobile) return { width: "100vw", height: "calc(100vh - 32px)", top: "32px", left: "0px" };
    if (isTablet) return { width: "min(860px, 96vw)", height: "min(600px, 88vh)", top: "36px", left: "2vw" };
    return { width: "860px", height: "600px", top: "0px", left: "10%" };
  };
  const windowSize = getWindowSize();

  // Filter only images from both demo and captured media
  const allImages = [
    ...capturedMedia.filter((item) => item.type === "image"),
    ...DEMO_PHOTOS,
  ];

  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
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
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"}`}
    >
      {/* Header Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[48px] z-20 select-none"
      >
        <div className="flex items-center gap-4">
          {selectedPhoto && (
            <button onClick={() => setSelectedPhoto(null)} className="flex items-center gap-2 p-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-semibold text-white/90">
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <span className="text-xs font-semibold text-white/90 truncate max-w-[200px] pointer-events-none">
            {selectedPhoto ? selectedPhoto.title : "Photos"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isMobile && (
            <button onClick={() => minimizeWindow(windowId)} className="p-1 px-3 text-white/40 hover:bg-white/5 rounded-md"><Minus size={14} /></button>
          )}
          {!isMobile && (
            <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 px-3 text-white/40 hover:bg-white/5 rounded-md">
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
          <button onClick={handleClose} className="p-1 px-3 text-white bg-red-500/80 hover:bg-red-500 rounded-md"><X size={14} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#121212]">
        <AnimatePresence mode="wait">
          {!selectedPhoto ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {allImages.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onClick={() => setSelectedPhoto(photo)} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
               key="viewer"
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="absolute inset-0 flex items-center justify-center p-8 bg-black/90"
            >
                <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" />
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                    <button className="p-3 text-white/60 hover:text-white transition-colors" title="Zoom"><ZoomIn size={20}/></button>
                    <button className="p-3 text-white/60 hover:text-white transition-colors" title="Share"><Share2 size={20}/></button>
                    <button className="p-3 text-white/60 hover:text-white transition-colors" title="Info"><Info size={20}/></button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <button 
                      onClick={() => { deleteMedia(selectedPhoto.id); setSelectedPhoto(null); }}
                      className="p-3 text-red-500/80 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20}/>
                    </button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PhotoCard = memo(({ photo, onClick }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="aspect-square relative group bg-white/5 rounded-lg overflow-hidden cursor-pointer border border-white/5 shadow-lg"
  >
    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
      <span className="text-[11px] font-semibold text-white truncate">{photo.title}</span>
      <span className="text-[10px] text-white/50">{photo.date}</span>
    </div>
  </motion.div>
));

export default memo(PhotosApp);
