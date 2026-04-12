import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  Camera,
  RefreshCw,
  Maximize2,
  Minimize2,
  Minus,
  Settings,
  Circle,
  Square,
  Video,
} from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import { useMediaContext } from "../../context/MediaContext";
import useScreenSize from "../../hooks/useScreenSize";

/**
 * Advanced Camera Application with Video Recording
 * Supports capturing photos and recording videos, syncing them globally.
 */

// --- Sub-components ---

const TitleBar = memo(({ isMaximized, isMobile, onMinimize, onMaximize, onClose, dragControls }) => (
  <div
    onPointerDown={(e) => !isMobile && dragControls.start(e)}
    className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[46px] z-20 select-none"
  >
    <div className="flex items-center gap-2 pointer-events-none">
      <Camera size={16} className="text-white/70" />
      <span className="text-xs font-semibold text-white/90">Camera</span>
    </div>
    <div className="flex items-center gap-2">
      {!isMobile && (
        <button onClick={onMinimize} className="p-1 px-3 text-white/40 hover:bg-white/5 rounded-md">
          <Minus size={14} />
        </button>
      )}
      <button onClick={onMaximize} className="p-1 px-3 text-white/40 hover:bg-white/5 rounded-md">
        {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      </button>
      <button onClick={onClose} className="p-1 px-3 text-white bg-red-500/80 hover:bg-red-500 rounded-md">
        <X size={14} />
      </button>
    </div>
  </div>
));

const CameraControls = memo(({
  mode,
  setMode,
  isRecording,
  onCapture,
  onToggleRecording,
  onSwitchCamera
}) => (
  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 pb-8 z-20 bg-gradient-to-t from-black/60 to-transparent pt-10">
    {/* Mode Selector */}
    {!isRecording && (
      <div className="flex items-center gap-6 px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 mb-2">
        <button
          onClick={() => setMode("photo")}
          className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${mode === "photo" ? "text-white" : "text-white/40 hover:text-white/60"}`}
        >
          Photo
        </button>
        <button
          onClick={() => setMode("video")}
          className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${mode === "video" ? "text-red-500" : "text-white/40 hover:text-white/60"}`}
        >
          Video
        </button>
      </div>
    )}

    {/* Primary Controls */}
    <div className="flex items-center gap-10">
      <button onClick={onSwitchCamera} disabled={isRecording} className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all active:scale-90 disabled:opacity-0">
        <RefreshCw size={24} />
      </button>

      {mode === "photo" ? (
        <button onClick={onCapture} className="p-1 bg-white rounded-full transition-transform active:scale-90">
          <div className="w-16 h-16 border-4 border-black/10 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white border border-black/5 rounded-full shadow-inner" />
          </div>
        </button>
      ) : (
        <button onClick={onToggleRecording} className="relative p-1 bg-white/10 rounded-full border-2 border-white/40 active:scale-95 transition-all">
          <div className={`transition-all duration-300 flex items-center justify-center ${isRecording ? "w-16 h-16" : "w-16 h-16"}`}>
            {isRecording ? (
              <div className="w-8 h-8 bg-red-600 rounded-lg shadow-2xl animate-pulse" />
            ) : (
              <div className="w-12 h-12 bg-red-600 rounded-full shadow-2xl" />
            )}
          </div>
        </button>
      )}

      <div className="w-[56px]" /> {/* Balance */}
    </div>
  </div>
));

// --- Main App ---

const CameraApp = ({ windowId }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const { addMedia } = useMediaContext();
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // State
  const [mode, setMode] = useState("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(false);

  const forceFullscreen = isMobile;

  // Helper: Timer for recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Please allow camera and microphone access.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => streamRef.current?.getTracks().forEach(t => t.stop());
  }, [startCamera]);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, -canvas.width, 0);

    const url = canvas.toDataURL("image/jpeg");
    addMedia({ type: "image", url, title: `Photo_${Date.now()}` });
  };

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      chunksRef.current = [];
      const options = { mimeType: "video/webm;codecs=vp9,opus" };
      const recorder = new MediaRecorder(streamRef.current, options);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        addMedia({ type: "video", url, title: `Recording_${Date.now()}` });
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getWindowSize = () => {
    if (isMobile) {
      return { width: "100vw", height: "calc(100vh - 32px)", top: "32px", left: "0px" };
    }
    if (isTablet) {
      return { width: "min(800px, 96vw)", height: "min(600px, 88vh)", top: "36px", left: "2vw" };
    }
    return { width: "800px", height: "600px", top: "0px", left: "10%" };
  };

  const windowSize = getWindowSize();

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      initial={{ scale: 0.95, opacity: 0, x: isMobile ? 0 : 200, y: isMobile ? 0 : 100 }}
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
      className={`absolute z-50 pointer-events-auto bg-black shadow-2xl border border-white/10 overflow-hidden flex flex-col ${forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"}`}
    >
      <TitleBar
        isMaximized={isMaximized}
        isMobile={isMobile}
        onMinimize={() => minimizeWindow(windowId)}
        onMaximize={() => setIsMaximized(!isMaximized)}
        onClose={() => { streamRef.current?.getTracks().forEach(t => t.stop()); closeWindow(windowId); }}
        dragControls={dragControls}
      />

      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover -scale-x-100"
        />

        {/* Flash Effect */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-30"
            />
          )}
        </AnimatePresence>

        {/* Recording Overlay */}
        {isRecording && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full font-bold text-[10px] text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            {formatTime(recordingTime)}
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-8 text-center gap-4 z-40">
            <div className="p-4 bg-red-500/20 rounded-full text-red-500"><Settings size={32} /></div>
            <p className="text-white/60 max-w-[200px]">{error}</p>
            <button onClick={startCamera} className="px-6 py-2 bg-blue-600 rounded-lg text-white font-medium">Retry</button>
          </div>
        )}

        <CameraControls
          mode={mode}
          setMode={setMode}
          isRecording={isRecording}
          onCapture={capturePhoto}
          onToggleRecording={toggleRecording}
          onSwitchCamera={() => {}}
        />
      </div>
    </motion.div>
  );
};

export default memo(CameraApp);
